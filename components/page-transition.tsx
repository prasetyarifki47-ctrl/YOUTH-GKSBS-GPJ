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
    }, 180);

    return () => clearTimeout(enterTimer);
  }, [pathname]);

  return (
    <div className="relative overflow-hidden">

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}
      <div
        className={`
          transition-[transform,opacity]
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isEntering
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }
        `}
      >
        {children}
      </div>


      {/* =====================================================
          LIGHT SWEEP
      ====================================================== */}
      <div
        className={`
          pointer-events-none
          fixed
          inset-0
          z-[100]
          overflow-hidden
          transition-opacity
          duration-300
          ${
            isLeaving
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >

        <div
          className={`
            absolute
            -left-[30%]
            top-0
            h-full
            w-[55%]
            rotate-[8deg]
            bg-gradient-to-r
            from-transparent
            via-[#E8DCC8]/15
            to-transparent
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isLeaving
                ? "translate-x-[220%]"
                : "-translate-x-[20%]"
            }
          `}
        />

      </div>

    </div>
  );
}