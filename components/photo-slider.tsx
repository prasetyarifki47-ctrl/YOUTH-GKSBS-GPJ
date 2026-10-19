
"use client";

import Image from "next/image";
import { useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

type PhotoSliderProps = {
  photos: Photo[];
  title: string;
};

export default function PhotoSlider({
  photos,
  title,
}: PhotoSliderProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null || photos.length <= 1) return;

    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        setCurrent((prev) => (prev + 1) % photos.length);
      } else {
        setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
      }
    }

    setTouchStart(null);
  }

  return (
    <div className="w-full">
      {/* IMAGE */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#E6DED3] touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== current}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}

        {/* PREVIOUS BUTTON */}
        {photos.length > 1 && (
          <button
            type="button"
            aria-label="Foto sebelumnya"
            onClick={() =>
              setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
            }
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ‹
          </button>
        )}

        {/* NEXT BUTTON */}
        {photos.length > 1 && (
          <button
            type="button"
            aria-label="Foto berikutnya"
            onClick={() =>
              setCurrent((prev) => (prev + 1) % photos.length)
            }
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ›
          </button>
        )}
      </div>

      {/* INFO */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-heading text-2xl text-[#2E2A26] sm:text-3xl">
            {title}
          </h3>

          {/* INDICATOR */}
          <div className="flex shrink-0 items-center gap-1.5">
            {photos.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Lihat foto ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-5 bg-[#8B7355]"
                    : "w-1.5 bg-[#CDBDAA] hover:bg-[#A9967E]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* FOTO KE */}
        <p className="mt-2 text-xs text-[#8B7355]">
          Foto {current + 1} dari {photos.length}
        </p>
      </div>
    </div>
  );
}
