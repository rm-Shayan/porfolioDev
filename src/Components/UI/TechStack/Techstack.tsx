import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedinIn,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiFirebase,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiRedux,
  SiVite,
  SiPostman,
  SiTailwindcss,
} from "react-icons/si";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Define the props for the component, specifically the theme.

// The main TechStack component.
export const TechStack = () => {
  // Create a ref to access the DOM element for the tech stack container.
  const techStackRef = useRef<HTMLDivElement | null>(null);

  // The useEffect hook runs the animation logic once after the component mounts.
  useEffect(() => {
    // Check that the ref is available before running the animation.
    if (!techStackRef.current) return;

    // Get all the child elements (the tech icons) of the tech stack container.
    const children = Array.from(techStackRef.current.children);

    // Initial state: set all children to be hidden and slightly below their final position.
    gsap.set(children, { y: 50, opacity: 0 });

    // Animate the children into view as the user scrolls.
    gsap.to(children, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: techStackRef.current,
        start: "top 80%", // Animation starts when the top of the section is 80% from the top of the viewport.
        end: "bottom 20%", // Animation ends when the bottom of the section is 20% from the top of the viewport.
        scrub: true, // Links the animation progress to the scroll position.
        // markers: true, // Uncomment this line to see the ScrollTrigger markers for debugging.
      },
    });
  }, []);

  // List of technologies with their names and icons.
  const techs = [
    { name: "React", icon: <FaReact size={48} /> },
    { name: "Next.js", icon: <SiNextdotjs size={48} /> },
    { name: "Node.js", icon: <FaNodeJs size={48} /> },
    { name: "Express.js", icon: <SiExpress size={48} /> },
    { name: "MongoDB", icon: <SiMongodb size={48} /> },
    { name: "Firebase", icon: <SiFirebase size={48} /> },
    { name: "TypeScript", icon: <SiTypescript size={48} /> },
    { name: "JavaScript", icon: <FaJs size={48} /> },
    { name: "Redux", icon: <SiRedux size={48} /> },
    { name: "Vite", icon: <SiVite size={48} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={48} /> },
    { name: "HTML5", icon: <FaHtml5 size={48} /> },
    { name: "CSS3", icon: <FaCss3Alt size={48} /> },
    { name: "Git", icon: <FaGitAlt size={48} /> },
    { name: "Postman", icon: <SiPostman size={48} /> },
    { name: "GitHub", icon: <FaGithub size={48} /> },
    { name: "LinkedIn", icon: <FaLinkedinIn size={48} /> },
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient-reverse">
        My Tech Stack
      </h2>
      <div
        ref={techStackRef}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8"
      >
        {techs.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-110
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
          >
            {/* The icon is now visible with white color */}
            <span className="text-white">
              {tech.icon}
            </span>
            <p className="mt-2 text-sm font-medium">
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
