"use client";

import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";

const Sparkle = () => {
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile =
        /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(checkMobile);
    }
  }, []);

  useEffect(() => {
    if (!splineWrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { root: null, threshold: 0.1 },
    );

    observer.observe(splineWrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute w-screen h-screen -z-10" ref={splineWrapperRef}>
      {hasEntered && (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            pointerEvents: isVisible ? "auto" : "none",
          }}
          className="absolute w-screen h-screen"
        >
          {!isMobile ? (
            <Spline
              scene="https://prod.spline.design/GLp8btuF5tLoHIlE/scene.splinecode"
              className="absolute opacity-50 !h-screen lg:!h-[150vh] lg:top-[calc(-150vh/5)] top-0 left-0"
              style={{ width: "100vw", height: "100vh" }}
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
      )}
    </div>
  );
};

export default Sparkle;
