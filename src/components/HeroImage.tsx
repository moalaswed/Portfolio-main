"use client";

import { Code2 } from "lucide-react";
import { animate } from "animejs";
import { useEffect, useRef } from "react";

const HeroImage = () => {
  const symbolRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const symbol = symbolRef.current;
    if (!symbol || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const animation = animate(symbol, {
      scale: [1, 1.045],
      rotate: [-1, 1],
      duration: 2600,
      ease: "inOutSine",
      alternate: true,
      loop: true,
    });

    return () => {
      animation.cancel();
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <Code2
        ref={symbolRef}
        className="h-56 w-56 text-[#2f7df4] drop-shadow-[0_12px_28px_rgba(47,125,244,0.22)] sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        strokeWidth={1.35}
        aria-label="Code"
      />
    </div>
  );
};

export default HeroImage;
