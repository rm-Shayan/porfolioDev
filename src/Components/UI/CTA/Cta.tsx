import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const ContactCTA = ({ theme }: { theme: string }) => {
 const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add a slight delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      const element = ctaRef.current;

      if (element) {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);


  return (
    <section
      id="contact"
      ref={ctaRef}
      className={`py-20 px-4 text-center rounded-xl transition-colors duration-500 mx-4 sm:mx-8 md:mx-16 my-20

      `}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl  font-bold mb-4 py-4 animate-gradient-reverse bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Let’s work together
      </h2>

      <p
        className={`text-lg max-w-3xl mx-auto  ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        I am available for freelance projects and full-time opportunities.
      </p>

    <Link
  to="/contact"
  className={`mt-8 inline-block px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2
    ${
      theme === "dark"
        ? "border-fuchsia-600 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-fuchsia-600 hover:text-white hover:bg-clip-border"
        : "border-fuchsia-400 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-fuchsia-400 hover:text-white hover:bg-clip-border"
    }`}
>
  Preview More
</Link>
    </section>
  );
};