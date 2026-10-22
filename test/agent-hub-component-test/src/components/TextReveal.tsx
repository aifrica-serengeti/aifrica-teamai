import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import "./TextReveal.css";

/** Visual only: the complete text/value is committed before the mask runs. */
export function useTextRevealMotion(
  target: RefObject<HTMLElement | null>,
  revision: string | number | undefined,
  onComplete?: () => void,
) {
  const running = useRef<Animation | null>(null);
  const complete = useRef(onComplete);
  complete.current = onComplete;
  const cancel = useCallback(() => {
    const animation = running.current;
    running.current = null;
    animation?.cancel();
    target.current?.removeAttribute("data-text-revealing");
    target.current?.style.removeProperty("--ah-text-reveal-mask-size");
  }, [target]);

  useLayoutEffect(() => {
    const element = target.current;
    if (!element || revision === undefined) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    if (
      reduced.matches ||
      forced.matches ||
      !element.animate ||
      !CSS.supports("mask-image", "linear-gradient(#000, transparent)")
    ) {
      complete.current?.();
      return;
    }
    let fromPosition = "100% 0";
    if (element instanceof HTMLTextAreaElement) {
      const context = document.createElement("canvas").getContext("2d");
      if (context) {
        const style = getComputedStyle(element);
        context.font = style.font;
        const spacing = Number.parseFloat(style.letterSpacing) || 0;
        const measured = Math.max(
          1,
          ...element.value
            .split("\n")
            .map(
              (line) => context.measureText(line).width + spacing * line.length,
            ),
        );
        const width = Math.min(
          measured,
          element.clientWidth -
            Number.parseFloat(style.paddingLeft) -
            Number.parseFloat(style.paddingRight),
        );
        if (width > 0) {
          // Short prompts use their text width, not the empty editor's width.
          element.style.setProperty(
            "--ah-text-reveal-mask-size",
            `${width * 2.5}px 100%`,
          );
          fromPosition = `${-width * 1.5}px 0`;
        }
      }
    }
    element.dataset.textRevealing = "true";
    const animation = element.animate(
      [{ maskPosition: fromPosition }, { maskPosition: "0px 0" }],
      { duration: 400, easing: "ease-out", fill: "none" },
    );
    running.current = animation;
    animation.onfinish = () => {
      if (running.current !== animation) return;
      cancel();
      complete.current?.();
    };
    const stopForPreference = () => {
      if (!reduced.matches && !forced.matches) return;
      cancel();
      complete.current?.();
    };
    reduced.addEventListener("change", stopForPreference);
    forced.addEventListener("change", stopForPreference);
    return () => {
      animation.onfinish = null;
      reduced.removeEventListener("change", stopForPreference);
      forced.removeEventListener("change", stopForPreference);
      cancel();
    };
  }, [cancel, revision, target]);
  return cancel;
}

type Piece = { id: number; text: string; reveal: boolean };
function mergeFinishedPrefix(pieces: Piece[]) {
  const firstMoving = pieces.findIndex((piece) => piece.reveal);
  const count = firstMoving < 0 ? pieces.length : firstMoving;
  if (count < 2) return pieces;
  return [
    {
      ...pieces[0],
      text: pieces
        .slice(0, count)
        .map((piece) => piece.text)
        .join(""),
    },
    ...pieces.slice(count),
  ];
}
function TextPiece({
  piece,
  onComplete,
}: {
  piece: Piece;
  onComplete: (id: number) => void;
}) {
  const target = useRef<HTMLSpanElement>(null);
  useTextRevealMotion(target, piece.reveal ? piece.id : undefined, () =>
    onComplete(piece.id),
  );
  return <span ref={target}>{piece.text}</span>;
}

/** Shared by externally supplied message bodies, including appended AI chunks. */
export function AgentHubTextReveal({
  text,
  motion = "static",
  revision,
}: {
  text: string;
  motion?: "static" | "reveal";
  revision?: string | number;
}) {
  const [snapshot, setSnapshot] = useState(() => ({
    text,
    revision,
    motion,
    serial: 1,
    pieces: [{ id: 1, text, reveal: motion === "reveal" }] as Piece[],
  }));
  // Derive the next visual chunks during render, before any old text can paint.
  if (
    text !== snapshot.text ||
    revision !== snapshot.revision ||
    motion !== snapshot.motion
  ) {
    const append =
      motion === "reveal" &&
      snapshot.motion === motion &&
      revision === snapshot.revision &&
      text !== snapshot.text &&
      text.startsWith(snapshot.text);
    const serial = snapshot.serial + 1;
    const pieces = append ? mergeFinishedPrefix(snapshot.pieces) : [];
    setSnapshot({
      text,
      revision,
      motion,
      serial,
      pieces: [
        ...pieces,
        {
          id: serial,
          text: append ? text.slice(snapshot.text.length) : text,
          reveal: motion === "reveal",
        },
      ],
    });
  }
  const finishPiece = useCallback((id: number) => {
    setSnapshot((current) => ({
      ...current,
      pieces: mergeFinishedPrefix(
        current.pieces.map((piece) =>
          piece.id === id ? { ...piece, reveal: false } : piece,
        ),
      ),
    }));
  }, []);
  return (
    <span className="ah-text-reveal" data-text-motion={motion}>
      {snapshot.pieces.map((piece) => (
        <TextPiece key={piece.id} piece={piece} onComplete={finishPiece} />
      ))}
    </span>
  );
}
