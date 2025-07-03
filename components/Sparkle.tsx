"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const Sparkle = () => {
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMob =
      /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    setIsMobile(isMob);

    if (!isMob) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShouldRenderSpline(entry.isIntersecting);
        },
        { threshold: 0.1 },
      );

      const ref = splineWrapperRef.current;
      if (ref) observer.observe(ref);

      return () => {
        if (ref) observer.unobserve(ref);
      };
    }
  }, []);

  return (
    <div
      ref={splineWrapperRef}
      className="absolute w-screen h-screen -z-10 overflow-hidden flex items-center justify-center"
    >
      <div
        className="absolute w-screen h-screen"
        style={{
          opacity: 1,
          transition: "opacity 0.5s ease-in-out",
          pointerEvents: "auto",
          scale: 1.3,
        }}
      >
        {!isMobile && shouldRenderSpline ? (
          <Spline
            scene="https://prod.spline.design/X8yMwV2twUVUqdvk/scene.splinecode"
            className="absolute opacity-50 w-screen h-screen"
          />
        ) : (
          <img
            src="/planet.jpg"
            alt="World Map"
            className="absolute opacity-50 object-cover w-screen h-screen"
            style={{ objectPosition: "center" }}
          />
        )}
      </div>
    </div>
  );
};

export default Sparkle;
