import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

export const ContactCTA = ({ theme }: { theme: string }) => {
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Optional: Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={ctaRef}
      className={`py-20 text-center rounded-xl transition-colors duration-500 ${
        theme === "dark" ? "bg-fuchsia-900/30" : "bg-fuchsia-100/30"
      }`}
    >
      <h2 className="text-3xl font-bold mb-4">Let’s work together</h2>
      <p className="text-lg max-w-3xl mx-auto">
        I am available for freelance projects and full-time opportunities.
      </p>
      <a
        href="/contact"
        className={`mt-6 inline-block px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
          theme === "dark"
            ? "bg-fuchsia-600 hover:bg-fuchsia-700"
            : "bg-fuchsia-400 hover:bg-fuchsia-500"
        }`}
      >
        Contact Me
      </a>
    </section>
  );
};
