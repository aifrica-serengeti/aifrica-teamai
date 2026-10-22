// Executable documentation example: proposed implementation, not a verified product export.
export const thinkingMotionProposal = Object.freeze({
  provenance: 'implementation-proposal-not-figma-measurement',
  durationMs: 1800,
  delayMs: 0,
  easing: 'linear',
  direction: 'left-to-right',
  iterations: 'infinite',
  preferredBandWidthPx: 325,
});

export function thinkingTrackGeometry(width) {
  if (!Number.isFinite(width) || width <= 0) return null;
  const bandWidth = Math.min(thinkingMotionProposal.preferredBandWidthPx, width);
  return { trackWidth: width, bandWidth, fromX: -bandWidth, toX: width };
}

// One binding per dedicated thinking track. The caller owns phase/request identity and unmounting.
// CSS handles reduced motion; no timer, request mutation, or animation-completion callback is added.
export function bindThinkingTrack(track, { ResizeObserver: Observer = globalThis.ResizeObserver } = {}) {
  let disposed = false;
  const reset = () => {
    track.removeAttribute('data-motion-ready');
    track.style.removeProperty('--hub-thinking-track-width');
  };
  reset();
  if (typeof Observer !== 'function') return reset;
  const observer = new Observer(entries => {
    if (disposed) return;
    const entry = entries.find(item => item.target === track);
    if (!entry) return;
    // contentRect uses layout CSS pixels, preserving fractional widths and avoiding ancestor scale.
    const geometry = thinkingTrackGeometry(entry.contentRect.width);
    if (!geometry) { reset(); return; }
    track.style.setProperty('--hub-thinking-track-width', `${geometry.trackWidth}px`);
    track.setAttribute('data-motion-ready', 'true');
  });
  observer.observe(track);
  return () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    reset();
  };
}
