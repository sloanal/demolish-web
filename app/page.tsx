"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Background3D from "@/components/Background3D";
import Logo from "./assets/logo.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse position for aberration
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main ref={containerRef} className="relative min-h-[200vh] flex flex-col items-center overflow-hidden selection:bg-[#00f0ff] selection:text-black">
      {/* 3D Background */}
      <Background3D />

      <Hero mouseX={mouseX} mouseY={mouseY} />
      <Description mouseX={mouseX} />
      <Showcase />
      <CTA />
      <Footer />
    </main>
  );
}

function Hero({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  // Aberration intensity increases with scroll or simple movement
  const aberrationX = useTransform(mouseX, [-1, 1], ["-5px", "5px"]);
  const aberrationY = useTransform(mouseY, [-1, 1], ["-5px", "5px"]);
  
  // Create a spring for smoother movement
  const springX = useSpring(aberrationX, { stiffness: 150, damping: 15 });
  const springY = useSpring(aberrationY, { stiffness: 150, damping: 15 });

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center px-4 md:px-10 z-10 perspective-[1000px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="mb-8"
      >
        <Image
          src={Logo}
          alt="Demolish Logo"
          width={120}
          height={120}
          className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="relative flex flex-col md:flex-row items-baseline justify-center select-none"
        style={{
          // @ts-ignore
          "--aberration-x": springX,
          "--aberration-y": springY,
        }}
      >
        <h1 
          className="chromatic-text text-[15vw] md:text-[12vw] font-[family-name:var(--font-syncopate)] font-bold tracking-tighter leading-[0.8] text-white"
          data-text="DEMO"
        >
          DEMO
        </h1>
        <h1 className="text-[15vw] md:text-[12vw] font-[family-name:var(--font-pinyon)] font-normal text-[#00f0ff] leading-[0.8] ml-[-2vw] md:ml-[-1vw] z-10 -rotate-6 transform translate-y-4 md:translate-y-8 glass-text drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          lish
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-20 md:bottom-32 left-0 right-0 text-center"
      >
        <p className="font-[family-name:var(--font-syncopate)] text-xs md:text-sm tracking-[0.5em] uppercase opacity-50 text-[#00f0ff]">
          Scroll to Demolish
        </p>
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-4 flex justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Description({ mouseX }: { mouseX: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="w-full py-24 md:py-48 flex flex-col items-center justify-center text-center px-6 md:px-20 z-10">
      <motion.div 
        style={{ opacity }}
        className="glass-panel p-12 rounded-[2rem] max-w-5xl border border-white/5"
      >
        <h2 className="text-4xl md:text-7xl font-[family-name:var(--font-inter)] font-light mb-12">
          A <span className="font-[family-name:var(--font-pinyon)] text-[#00f0ff] text-5xl md:text-8xl mx-2 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">delicious</span> tool for demoing.
        </h2>

        <motion.p 
          style={{ x }}
          className="text-lg md:text-2xl font-[family-name:var(--font-inter)] font-light text-gray-300 max-w-3xl leading-relaxed mx-auto"
        >
          Users no longer need one incognito window open with one regular window open while awkwardly sharing their entire screen to demo collaboration actions.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="w-full min-h-screen py-24 flex items-center justify-center px-4">
      <motion.div 
        style={{ scale, y }}
        className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden group shadow-[0_0_100px_rgba(0,240,255,0.05)]"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/app-screenshot.png`}
          alt="Demolish App Interface"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section className="w-full py-32 flex flex-col items-center justify-center text-center px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-[40rem] h-[40rem] bg-gradient-to-b from-[#00f0ff] to-[#4f46e5] rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative group z-10 flex flex-col items-center"
      >
        <p className="mb-12 text-xl md:text-3xl font-[family-name:var(--font-inter)] font-normal text-white max-w-2xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
           Demolish is a tool purpose built for demoing collaborative software.
        </p>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#4f46e5] rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
          <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/demolish-game.zip`} download className="relative px-16 py-8 bg-black/90 backdrop-blur-xl rounded-full leading-none flex items-center divide-x divide-white/10 border border-white/10 group-hover:border-white/30 transition-all">
            <div className="pr-8 flex items-center gap-6">
              <Image
                src={Logo}
                alt="Demolish Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="text-white text-3xl font-[family-name:var(--font-syncopate)] font-bold group-hover:text-[#00f0ff] transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Download
              </span>
            </div>
            <span className="pl-8 text-gray-400 group-hover:text-white transition-colors font-mono">
              macOS
            </span>
          </a>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-xs text-gray-500 tracking-widest">v1.0-beta</span>
        <a href="https://linear.app/integrate/project/demolish-d2986f28b3dc" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-gray-600 hover:text-[#00f0ff] transition-colors">
          View Known Issues
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 flex justify-center items-center border-t border-white/5 bg-black z-10 relative">
      <p className="font-[family-name:var(--font-inter)] text-sm text-gray-600 flex items-center gap-2 mix-blend-plus-lighter">
        Made with <span className="text-[#00f0ff] animate-pulse">❤</span> by <a href="https://integrate.co" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-400 hover:text-white transition-colors">Integrate</a>
      </p>
    </footer>
  );
}
