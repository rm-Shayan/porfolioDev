import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useAppSelector } from "../../../App/Hooks";

// Custom CSS for the 3D cube loader and its animation
const customStyles = `
  .cube-container {
    perspective: 800px;
  }
  .cube {
    width: 60px;
    height: 60px;
    position: relative;
    transform-style: preserve-3d;
  }
  .cube-face {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
  .cube .front  { transform: rotateY(0deg) translateZ(30px); }
  .cube .back   { transform: rotateX(180deg) translateZ(30px); }
  .cube .right  { transform: rotateY(90deg) translateZ(30px); }
  .cube .left   { transform: rotateY(-90deg) translateZ(30px); }
  .cube .top    { transform: rotateX(90deg) translateZ(30px); }
  .cube .bottom { transform: rotateX(-90deg) translateZ(30px); }
`;

export const PageLoader = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // 3D cube animation
    const tl = gsap.timeline({ repeat: -1 });

    if (cubeRef.current) {
      tl.to(cubeRef.current, {
        duration: 4,
        rotationX: 360,
        rotationY: 360,
        ease: "power2.inOut",
      });
    }

    // Auto-dismiss logic with exit animation
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setShowLoader(false);
          },
        });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <>
      <style>{customStyles}</style>
      <div
        ref={containerRef}
        className={`min-h-screen flex items-center justify-center transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#1a132f] via-[#3a1f78] to-[#0e0e1a] text-white"
              : "bg-white text-gray-800"
          }
        `}
      >
        <div className="cube-container">
          <div ref={cubeRef} className="cube">
            {/* Cube Faces */}
            <div className={`cube-face front ${theme === "dark" ? "bg-indigo-600/70" : "bg-indigo-400/70"}`}></div>
            <div className={`cube-face back ${theme === "dark" ? "bg-purple-600/70" : "bg-purple-400/70"}`}></div>
            <div className={`cube-face right ${theme === "dark" ? "bg-pink-600/70" : "bg-pink-400/70"}`}></div>
            <div className={`cube-face left ${theme === "dark" ? "bg-teal-600/70" : "bg-teal-400/70"}`}></div>
            <div className={`cube-face top ${theme === "dark" ? "bg-cyan-600/70" : "bg-cyan-400/70"}`}></div>
            <div className={`cube-face bottom ${theme === "dark" ? "bg-fuchsia-600/70" : "bg-fuchsia-400/70"}`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLoader;
