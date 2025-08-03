import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

type ProjectsPreviewProps = {
  theme: "light" | "dark";
};

export const ProjectsPreview = ({ theme }: ProjectsPreviewProps) => {
  const projects = [
    {
      title: "Project Alpha",
      desc: "A modern e-commerce platform built with React and Firebase.",
      tags: ["React", "Firebase", "Tailwind"],
    },
    {
      title: "Project Beta",
      desc: "A data visualization dashboard using D3.js and TypeScript.",
      tags: ["D3.js", "TypeScript", "React"],
    },
    {
      title: "Project Gamma",
      desc: "A social media app clone with real-time chat functionality.",
      tags: ["React", "Node.js", "GSAP"],
    },
  ];

  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projectsRef.current) return;

    // Get all the project cards
    const projectCards = Array.from(projectsRef.current.children);

    // Set initial state of elements before the animation starts
    gsap.set(projectCards, { y: 50, opacity: 0 });

    // Animate the cards to their final position on scroll
    gsap.to(projectCards, {
      y: 0,
      opacity: 1,
      stagger: 0.2, // Stagger the animation for each card
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Featured Projects
      </h2>
      <div
        ref={projectsRef}
        className="grid md:grid-cols-3 gap-8 px-4 md:px-0"
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className={`p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white`}
          >
            <div
              className="w-full h-40 rounded-lg flex items-center justify-center mb-4 transition-colors duration-500 bg-white/10"
            >
              <span className="text-sm text-white/50">Project Thumbnail</span>
            </div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-gray-100">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white transition-colors duration-300 hover:bg-white/40`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
  <Link
  to="/about"
  className={`mt-8 inline-block px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2
    ${
      theme === "dark"
        ? "border-fuchsia-600 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-fuchsia-600 hover:text-white hover:bg-clip-border"
        : "border-fuchsia-400 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-fuchsia-400 hover:text-white hover:bg-clip-border"
    }`}
>
  Preview More
</Link>

      </div>
    </section>
  );
};
