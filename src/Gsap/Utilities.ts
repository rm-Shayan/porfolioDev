// src/utils/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin ONCE here
gsap.registerPlugin(ScrollTrigger);

// Export both for use
export { gsap, ScrollTrigger };
