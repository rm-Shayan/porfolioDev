import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../App/Hooks';
import { gsap } from 'gsap';
import {
  Briefcase,
  GraduationCap,
  Code,
  Download,
  Feather,
  GitBranch,
  Smile,
  Zap,
  Server,
  Database,
  Cloud,
  Shield,
} from 'lucide-react';
import img from "../assets/mine.jpg"

const skillsData = [
  { name: 'React', icon: <Zap className="text-blue-500" /> },
  { name: 'Next.js', icon: <Feather className="text-gray-900 dark:text-gray-200" /> },
  { name: 'Tailwind CSS', icon: <Code className="text-sky-400" /> },
  { name: 'Firebase', icon: <GitBranch className="text-yellow-500" /> },
  { name: 'Node.js', icon: <Briefcase className="text-green-600" /> },
  { name: 'Express.js', icon: <Server className="text-green-600" /> },
  { name: 'MongoDB', icon: <Database className="text-emerald-500" /> },
  { name: 'JWT', icon: <Shield className="text-orange-500" /> },
  { name: 'MERN Stack', icon: <Cloud className="text-gray-500 dark:text-gray-200" /> },
  { name: 'GSAP', icon: <Zap className="text-green-500" /> },
  { name: 'Git', icon: <GitBranch className="text-red-500" /> },
  { name: 'Redux', icon: <Smile className="text-purple-500" /> },
];

const About = () => {
  // useAppSelector hook ka upyog karke current theme prapt karein
  const theme = useAppSelector((state) => state.theme.mode) as 'light' | 'dark';

  // Animations ke liye useRef hooks ka upyog
  const aboutRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  sectionsRef.current = [];

  // Yeh function har section reference ko array mein add karta hai
  const addToSectionsRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP animations ko context ke andar define karein taaki woh component unmount hone par saaf ho jaayein
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Hero section ke liye animation
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );

      // Baki sections ke liye animation
      sectionsRef.current.forEach((section, index) => {
        tl.fromTo(
          section,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 },
          `+=0.${index * 2}` // Har section ke liye staggered animation
        );
      });
    }, aboutRef); // aboutRef context scope define karta hai

    return () => ctx.revert(); // Component unmount hone par saare animations ko revert karein
  }, []);

  // Text-based gradients ke liye ek reusable Tailwind CSS class define karein
  const textGradient =
    "font-bold animate-gradient-reverse bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent";

  // Skill cards ke liye dynamic styling class
  const cardClasses = `
    relative flex flex-col items-center p-4 rounded-xl shadow-md transition-all duration-300 transform
    hover:scale-105 hover:shadow-xl
    ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-gray-100 border border-gray-200'}
  `;

  return (
    // Responsive padding aur spacing ke saath about page content ke liye main container
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16">
      {/* Padhne mein aasaani ke liye max width ke saath center mein main content block ka container */}
      <div className="w-full max-w-4xl space-y-12">
        {/* Profile image aur ek chote se introduction ke saath hero jaisa section */}
        <section ref={aboutRef} className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Introduction ke liye text content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {/* Special gradient styling ke saath name */}
              <div className={`${textGradient} text-xl sm:text-2xl md:text-3xl lg:text-4xl`}>
                <NavLink to="/">Rao Muhammad Shayan</NavLink>
              </div>
            </h1>
            <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              A Passionate MERN Stack Developer
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Hi, I'm Rao Muhammad Shayan — a passionate FullStack Web Developer with a knack for creating visually appealing and functional websites. I specialize in React, Tailwind CSS, and Firebase, and I'm driven by a mission to build elegant and efficient digital experiences.
            </p>
          </div>
          {/* Profile image container */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden shadow-lg border-4 border-gray-200 dark:border-gray-700">
            {/* Abhi ke liye ek placeholder image ka upyog, aapko is URL ko badalna chahiye */}
            <img
              src={img}
              alt="Rao Muhammad Shayan Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Theme-based color ke saath separator line */}
        <hr className="border-t-2 border-gray-200 dark:border-gray-800" />

        {/* Education ke liye Section */}
        <section ref={addToSectionsRef} className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <GraduationCap className="w-8 h-8 text-indigo-500" />
            Education
          </h2>
          <ul className={`list-none space-y-4 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
            <li>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                - Intermediate in Computer Science
              </span>{' '}
              — Superior Science College (2024)
            </li>
            <li>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                - Frontend Web Development
              </span>{' '}
              — Saylani Mass IT Training Program (2025)
            </li>
          </ul>
        </section>

        {/* Separator line */}
        <hr className="border-t-2 border-gray-200 dark:border-gray-800" />

        {/* Experience ke liye Section */}
        <section ref={addToSectionsRef} className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Briefcase className="w-8 h-8 text-green-500" />
            Experience
          </h2>
          <ul className={`list-none space-y-4 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
            <li>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                - 6 months teaching Physics
              </span>
            </li>
            <li>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                - Built multiple full-stack web apps
              </span>{' '}
              (chat app, blog system, inventory management)
            </li>
          </ul>
        </section>

        {/* Separator line */}
        <hr className="border-t-2 border-gray-200 dark:border-gray-800" />

        {/* Skills ke liye Section */}
        <section ref={addToSectionsRef} className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Code className="w-8 h-8 text-sky-500" />
            Skills
          </h2>
          {/* Icons aur names ke saath skills ke liye ek grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                className={cardClasses}
              >
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-xl blur-sm opacity-50
                  ${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' : 'hidden'}`}
                ></div>
                <div className="text-4xl mb-2 z-10">{skill.icon}</div>
                <span className={`${textGradient} font-medium text-lg z-10`}>
                  {skill.name}
                </span>
                {/* Add a subtle glow on hover for both themes */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100
                  ${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md' : 'shadow-[0_0px_20px_0px_rgba(236,72,153,0.3),_0_0px_20px_0px_rgba(168,85,247,0.3),_0_0px_20px_0px_rgba(99,102,241,0.3)]'}`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Separator line */}
        <hr className="border-t-2 border-gray-200 dark:border-gray-800" />

        {/* "What Makes You Different" ke liye Section */}
        <section ref={addToSectionsRef} className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Feather className="w-8 h-8 text-purple-500" />
            What Makes You Different
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
            I approach every project with a growth mindset, constantly seeking new challenges and opportunities to learn. I'm excited by projects that push the boundaries of design and functionality, and I find joy in solving complex problems to create seamless user experiences.
          </p>
        </section>

        {/* Separator line */}
        <hr className="border-t-2 border-gray-200 dark:border-gray-800" />

        {/* Download resume button ke saath call-to-action section */}
        <section ref={addToSectionsRef} className="flex flex-col items-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to learn more?</h3>
          <a
            href="/cv (1).pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
