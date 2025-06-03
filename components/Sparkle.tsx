"use client";

import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";

const Sparkle = () => {
  const splineRef = useRef(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  function onLoad(spline: any) {
    splineRef.current = spline;
  }

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
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting) {
          setHasEntered(true);
          if (splineRef.current) {
            splineRef.current.emitEvent("start", "Sphere");
          }
        } else {
          if (
            splineRef.current &&
            typeof splineRef.current.stop === "function"
          ) {
            splineRef.current.stop();
          }
        }
      },
      { root: null, threshold: 0.1 },
    );

    observer.observe(splineWrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute w-screen h-screen -z-10 overflow-hidden"
      ref={splineWrapperRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hasEntered && (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            pointerEvents: isVisible ? "auto" : "none",
          }}
          className="absolute w-screen h-screen"
        >
          {!isMobile ? (
            <Spline
              scene="https://prod.spline.design/X8yMwV2twUVUqdvk/scene.splinecode"
              className="absolute opacity-50 object-cover w-screen h-screen"
              style={{
                width: "150vw",
                height: "150vh",
                transform: "translate(-25vw, -25vh)",
              }}
              onLoad={onLoad}
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
