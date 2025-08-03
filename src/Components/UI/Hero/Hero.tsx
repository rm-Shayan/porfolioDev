

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LuFileSignature } from "react-icons/lu";
import { TypeAnimation } from "react-type-animation";

// Define the props for the component, specifically the theme.
interface HeroSectionProps {
  theme: "dark" | "light";
}

// The main HeroSection component.
export const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
  // Create refs to access the DOM elements for animation.
  const mainTitleRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // The useEffect hook runs the animation logic once after the component mounts.
  useEffect(() => {
    // GSAP Timeline for orchestrating the animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Check that all refs are available before running the animation.
    if (
      mainTitleRef.current &&
      taglineRef.current &&
      ctaRef.current &&
      imageRef.current
    ) {
      // Set initial state of elements to be hidden. This ensures they don't appear before the animation.
      gsap.set(
        [
          mainTitleRef.current,
          taglineRef.current,
          ...ctaRef.current.children,
          imageRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      // Animate the image div in first.
      tl.to(imageRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(mainTitleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(
          ctaRef.current.children,
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
          "-=0.5"
        );

      // Add a continuous, subtle pulsing animation to the image after the main animations are complete.
      tl.to(imageRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  // The component's JSX structure. It uses Tailwind CSS for styling and responsiveness.
  return (
    <section className="py-20 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left gap-12">
      {/* Add custom CSS for the gradient animation */}
      <style>{`
        @keyframes gradient-reverse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 5s ease infinite;
        }
      `}</style>
      {/* Left Side */}
      <div className="md:w-1/2 space-y-6">
        <h1
          ref={mainTitleRef}
          className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient-reverse"
        >
          Rao Muhammad Shayan
        </h1>

        <div className="text-2xl md:text-4xl font-semibold h-12 md:h-14">
          <TypeAnimation
            sequence={[
              "Full Stack Web Developer",
              2000,
              "MERN Stack Engineer",
              2000,
              "React & Node.js Specialist",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
          />
        </div>

        <p
          ref={taglineRef}
          className={`text-lg md:text-xl max-w-lg mx-auto md:mx-0 ${
            theme === "dark" ? "text-gray-100" : "text-gray-700"
          }`}
        >
          I build modern web applications using <strong>React</strong>,{" "}
          <strong>Node.js</strong>, <strong>Firebase</strong>,{" "}
          <strong>MongoDB</strong>, and <strong>TypeScript</strong>. Let's bring your product to life.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6"
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          >
            <LuFileSignature className="inline mr-2" />
            Hire Me
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-full font-semibold border-2 transition-all duration-300 hover:scale-105
            text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center items-center">
        <div
          ref={imageRef}
          className={`w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-fuchsia-500 flex items-center justify-center relative overflow-hidden p-2
            before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-fuchsia-400 before:to-pink-600 before:opacity-20 before:rounded-full
            ${
              theme === "dark" ? "bg-fuchsia-900/20" : "bg-fuchsia-100/20"
            }`}
        >
          <span className="text-sm z-10 text-gray-600 dark:text-gray-300">
            [ Your Image / Lottie / Canvas ]
          </span>
        </div>
      </div>
    </section>
  );
};
