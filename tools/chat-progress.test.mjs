import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/config.mjs';
import { thinkingMotionProposal, thinkingTrackGeometry, bindThinkingTrack } from '../docs/agent-hub/design/components/AgentHubChatHeader/motion-example.mjs';

test('Thinking motion proposals stay separate from Figma observations and clear both track ends at any width', () => {
  const reference = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/agent-hub/design/references/chat-progress.figma.json'), 'utf8'));
  const proposal = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/agent-hub/design/references/chat-progress.motion.proposal.json'), 'utf8'));
  assert.equal(reference.status, 'figma-reference');
  assert.equal(proposal.status, 'proposal');
  assert.equal(proposal.sourceContext.timingEasingDirectionLoopMeasured, false);
  assert.equal(proposal.header.defaultMode, 'static');
  assert.equal(proposal.header.businessCompletionFromAnimation, false);
  assert.equal(proposal.thinkingStatus.componentCreatesTimer, false);
  for (const key of ['durationMs', 'delayMs', 'easing', 'direction', 'iterations']) assert.equal(thinkingMotionProposal[key], proposal.header[key], key);
  for (const width of [0.25, 120, 240.5, 325, 640, 1560, 4096]) {
    const plan = thinkingTrackGeometry(width);
    assert.equal(plan.bandWidth, Math.min(325, width));
    assert.equal(plan.fromX + plan.bandWidth, 0, 'band starts entirely outside left edge');
    assert.equal(plan.toX, width, 'band ends entirely outside right edge');
    const midpoint = (plan.fromX + plan.toX) / 2;
    assert(Math.abs(midpoint + plan.bandWidth / 2 - width / 2) < 1e-10, 'linear midpoint crosses track center');
  }
  for (const width of [0, -1, NaN, Infinity, undefined, '1560']) assert.equal(thinkingTrackGeometry(width), null);
});

test('Thinking track binding measures layout pixels and releases observers across hidden, resize and stale callbacks', () => {
  const attributes = new Map();
  const properties = new Map();
  const track = {
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: key => attributes.delete(key),
    style: { setProperty: (key, value) => properties.set(key, value), removeProperty: key => properties.delete(key) },
  };
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; this.disconnected = 0; }
    observe(element) { assert.equal(element, track); }
    disconnect() { this.disconnected++; }
    emit(width, target = track) { this.callback([{ target, contentRect: { width } }]); }
  }
  const cleanup = bindThinkingTrack(track, { ResizeObserver: Observer });
  assert.equal(attributes.has('data-motion-ready'), false, 'static before measurement');
  observer.emit(1560);
  assert.equal(properties.get('--hub-thinking-track-width'), '1560px');
  assert.equal(attributes.get('data-motion-ready'), 'true');
  observer.emit(240.5);
  assert.equal(properties.get('--hub-thinking-track-width'), '240.5px', 'fractional layout pixels remain exact');
  observer.emit(0);
  assert.equal(attributes.size, 0, 'hidden-width track stops animating');
  assert.equal(properties.size, 0);
  observer.emit(120);
  observer.emit(999, {});
  assert.equal(properties.get('--hub-thinking-track-width'), '120px', 'unrelated entry is ignored');
  cleanup(); cleanup();
  assert.equal(observer.disconnected, 1, 'idempotent teardown');
  observer.emit(1560);
  assert.equal(attributes.size, 0, 'late callback cannot restart removed track');
  assert.equal(properties.size, 0);
  const fallbackCleanup = bindThinkingTrack(track, { ResizeObserver: null });
  fallbackCleanup();
  assert.equal(attributes.size, 0, 'unsupported observer leaves static fallback');
});
