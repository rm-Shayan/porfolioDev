// src/utils/animations.ts
import { gsap, ScrollTrigger } from "./Utilities"; // local utility
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const fadeUp = (target: gsap.TweenTarget, delay = 0.2) => {
  gsap.from(target, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power2.out",
  });
};

export const slideFromLeft = (target: gsap.TweenTarget, delay = 0.2) => {
  gsap.from(target, {
    x: -100,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power2.out",
  });
};

export const scrollFadeUp = (target: gsap.TweenTarget) => {
  gsap.from(target, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start: "top 80%",
      toggleActions: "play none none reverse",
    } as ScrollTrigger.Vars,
  } as gsap.TweenVars & { scrollTrigger: ScrollTrigger.Vars });
};

export const staggerReveal = (
  target: gsap.TweenTarget,
  delay = 0.1,
  stagger = 0.2
) => {
  gsap.from(target, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay,
    stagger,
    ease: "power2.out",
  });
};
