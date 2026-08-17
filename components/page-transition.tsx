"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    setIsLeaving(true);
    setIsEntering(false);

    const enterTimer = setTimeout(() => {
      setIsLeaving(false);
      setIsEntering(true);
    }, 250);

    return () => clearTimeout(enterTimer);
  }, [pathname]);

  return (
    <div className="relative overflow-hidden">
      {/* PAGE CONTENT */}
      <div
        className={`
          transition-all
          duration-[900ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isEntering
              ? "translate-y-0 scale-100 opacity-100 blur-0"
              : "translate-y-4 scale-[0.985] opacity-0 blur-[6px]"
          }
        `}
      >
        {children}
      </div>

      {/* GRADIENT LIGHT SWEEP */}
      <div
        className={`
          pointer-events-none
          fixed
          inset-0
          z-[100]
          overflow-hidden
          transition-opacity
          duration-500
          ${isLeaving ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className={`
            absolute
            -left-[40%]
            top-0
            h-full
            w-[80%]
            rotate-[8deg]
            bg-gradient-to-r
            from-transparent
            via-[#E8DCC8]/25
            to-transparent
            blur-2xl
            transition-transform
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isLeaving
                ? "translate-x-[180%]"
                : "-translate-x-[20%]"
            }
          `}
        />

        {/* SOFT WARM GLOW */}
        <div
          className={`
            absolute
            left-1/2
            top-1/2
            h-[30rem]
            w-[30rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C7A77B]/10
            blur-[100px]
            transition-all
            duration-[1000ms]
            ${
              isLeaving
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }
          `}
        />
      </div>
    </div>
  );
}