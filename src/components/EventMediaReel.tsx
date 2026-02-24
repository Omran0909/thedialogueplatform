"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type EventMediaReelProps = {
  images: readonly string[];
  alt: string;
};

function wrapOffset(value: number, width: number) {
  if (width <= 0) {
    return 0;
  }
  return ((value % width) + width) % width;
}

export function EventMediaReel({ images, alt }: EventMediaReelProps) {
  const duplicatedImages = useMemo(() => [...images, ...images], [images]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cycleWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const applyOffset = (nextOffset: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const wrappedOffset = wrapOffset(nextOffset, cycleWidthRef.current);
    offsetRef.current = wrappedOffset;
    track.style.transform = `translate3d(${-wrappedOffset}px, 0, 0)`;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const measure = () => {
      cycleWidthRef.current = track.scrollWidth / 2;
      applyOffset(offsetRef.current);
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [duplicatedImages]);

  useEffect(() => {
    const step = (timestamp: number) => {
      const dragging = dragStateRef.current.active;
      const shouldPause = dragging;
      if (!shouldPause && cycleWidthRef.current > 0) {
        const lastFrame = lastFrameRef.current ?? timestamp;
        const delta = timestamp - lastFrame;
        const pixelsPerSecond = 10;
        const distance = (pixelsPerSecond * delta) / 1000;
        applyOffset(offsetRef.current + distance);
      }

      lastFrameRef.current = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const endDrag = () => {
    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <div className="event-reel mt-8 rounded-2xl border border-line/80 bg-surface/70 p-3">
      <div
        ref={viewportRef}
        className={`event-reel-viewport ${isDragging ? "is-dragging" : ""}`}
        onPointerLeave={() => {
          endDrag();
        }}
        onPointerDown={(event) => {
          dragStateRef.current.active = true;
          dragStateRef.current.startX = event.clientX;
          dragStateRef.current.startOffset = offsetRef.current;
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current.active) {
            return;
          }

          const deltaX = event.clientX - dragStateRef.current.startX;
          const nextOffset = dragStateRef.current.startOffset - deltaX;
          applyOffset(nextOffset);
        }}
        onPointerUp={(event) => {
          endDrag();
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => {
          endDrag();
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <div ref={trackRef} className="event-reel-track">
          {duplicatedImages.map((image, index) => (
            <figure key={`${image}-${index}`} className="event-reel-item">
              <Image src={image} alt={alt} width={320} height={210} className="h-[170px] w-[270px] object-cover" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
