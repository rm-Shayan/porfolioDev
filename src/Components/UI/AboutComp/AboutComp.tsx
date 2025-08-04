import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  theme: "light" | "dark";
};

export const AboutMePreview = ({ theme }: Props) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        });
      }

      if (paraRef.current && buttonRef.current) {
        gsap.from([paraRef.current, buttonRef.current], {
          x: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 text-center">
      <div ref={aboutRef}>
        <h2
          ref={headingRef}
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          About Me
        </h2>
        <p
          ref={paraRef}
          className={`text-lg max-w-3xl mx-auto leading-relaxed ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
      I'm a Full Stack Web Developer skilled in building modern, responsive, and scalable web applications using the MERN stack (MongoDB, Express, React, Node). I enjoy turning ideas into reality with clean code and smooth user experiences. Passionate about both frontend and backend development, I'm always learning and exploring new technologies to improve my craft.
        </p>
    <Link
  to="/about"
  className={`mt-8 inline-block px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2
    ${
      theme === "dark"
        ? "border-fuchsia-600 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-fuchsia-600 hover:text-white hover:bg-clip-border"
        : "border-fuchsia-400 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-fuchsia-400 hover:text-white hover:bg-clip-border"
    }`}
>
  Read More
</Link>

      </div>
    </section>
  );
};
