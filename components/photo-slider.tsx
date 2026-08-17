"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="w-full">

      {/* =====================================================
          IMAGE
      ====================================================== */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#E6DED3]">

        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current
                ? "opacity-100"
                : "opacity-0"
            }`}
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

      </div>


      {/* =====================================================
          INFO
      ====================================================== */}
      <div className="mt-5">

        <div className="flex items-center justify-between gap-4">

          {/* TITLE */}
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
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-5 bg-[#8B7355]"
                    : "w-1.5 bg-[#CDBDAA]"
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