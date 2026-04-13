"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "./assets/logo.png";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden selection:bg-[#CDFF00] selection:text-black">
      <Hero />
      <Marquee />
      <Statement />
      <Showcase />
      <CTA />
      <Footer />
    </main>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 md:px-12 pt-8 pb-12 z-10">
      {/* ambient glow — native radial gradient, no blur filter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(205,255,0,0.03)_0%,transparent_70%)]" />
      </div>

      {/* top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-3 relative z-10"
      >
        <Image
          src={Logo}
          alt="Demolish Logo"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#6B6560] font-[family-name:var(--font-syne)] font-medium">
          Demolish
        </span>
      </motion.div>

      {/* wordmark */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 my-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col md:flex-row md:items-baseline md:justify-center select-none w-full"
        >
          <h1
            className="chromatic-text text-[18vw] md:text-[14vw] font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.06em] leading-[0.75] text-white"
            data-text="DEMO"
          >
            DEMO
          </h1>
          <h1 className="text-[16vw] md:text-[12vw] font-[family-name:var(--font-instrument)] italic text-[#CDFF00] leading-[0.75] self-end md:self-auto -mt-[3vw] md:mt-0 md:ml-[-1.5vw] -rotate-3">
            lish
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="w-8 h-px bg-[#CDFF00]/40 mx-auto mb-5" />
          <p className="font-[family-name:var(--font-syne)] text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#6B6560]">
            purpose-built for demoing collaborative software
          </p>
        </motion.div>
      </div>

      {/* scroll indicator — CSS animation, no Framer Motion RAF loop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center relative z-10"
      >
        <div className="flex justify-center animate-bounce-arrow">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CDFF00"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────── Marquee ────────────────────────────── */

function Marquee() {
  return (
    <div className="w-full py-6 md:py-8 overflow-hidden border-y border-white/[0.06] z-10 relative">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="text-[10vw] md:text-[6vw] font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.02em] text-outline mx-[2vw] shrink-0 select-none"
            aria-hidden={i > 0}
          >
            DEMOLISH
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── Statement ───────────────────────────── */

function Statement() {
  return (
    <section className="w-full py-32 md:py-48 lg:py-64 px-6 md:px-12 lg:px-20 z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl"
      >
        <h2 className="text-[11vw] md:text-[7vw] lg:text-[5.5vw] font-[family-name:var(--font-inter)] font-extralight leading-[1.1] tracking-[-0.03em] text-[#F0EDE8]">
          A{" "}
          <span className="font-[family-name:var(--font-instrument)] italic text-[#CDFF00]">
            delicious
          </span>{" "}
          tool
          <br className="hidden md:block" />
          {" "}for demoing.
        </h2>

        <p className="mt-10 md:mt-16 text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-inter)] font-light text-[#9E9A92] max-w-2xl leading-relaxed">
          Users no longer need one incognito window open with one regular window
          open while awkwardly sharing their entire screen to demo collaboration
          actions.
        </p>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────── Showcase ────────────────────────────── */

function Showcase() {
  return (
    <section className="w-full py-12 md:py-20 flex items-center justify-center px-4 md:px-8 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative w-full max-w-6xl aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.06]"
      >
        <Image
          src="/app-screenshot.png"
          alt="Demolish App Interface"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────── CTA ──────────────────────────────── */

function CTA() {
  return (
    <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center text-center px-6 relative z-10">
      {/* gradient glow — radial gradients, no blur filter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle,rgba(205,255,0,0.06)_0%,transparent_60%)]" />
        <div className="absolute w-[60rem] h-[60rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06)_0%,transparent_60%)] translate-y-24" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-inter)] font-extralight tracking-[-0.02em] text-[#F0EDE8] max-w-3xl leading-[1.15] mb-14 md:mb-20">
          Stop sharing your entire screen.{" "}
          <span className="text-[#6B6560]">Start demolishing.</span>
        </h3>

        <a
          href="/Demolish.zip"
          download
          className="group relative inline-flex items-center gap-4 px-10 py-5 md:px-14 md:py-6 bg-[#CDFF00] text-[#080808] rounded-full font-[family-name:var(--font-syne)] font-bold text-lg md:text-xl tracking-tight hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CDFF00]"
        >
          <Image
            src={Logo}
            alt="Demolish Logo"
            width={32}
            height={32}
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
          />
          <span>Download for macOS</span>
        </a>

        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[10px] text-[#4A4540] tracking-widest">
            v1.4
          </span>
          <span className="text-[#2A2520]" aria-hidden>
            ·
          </span>
          <a
            href="https://linear.app/integrate/project/demolish-d2986f28b3dc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#4A4540] hover:text-[#CDFF00] transition-colors duration-200"
          >
            Known Issues
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────── Footer ─────────────────────────────── */

function Footer() {
  return (
    <footer className="w-full py-10 flex justify-center items-center border-t border-white/[0.04] z-10 relative">
      <p className="font-[family-name:var(--font-inter)] text-xs text-[#3A3530] flex items-center gap-1.5 tracking-wide">
        Made with <span className="text-[#CDFF00]">❤</span> by{" "}
        <a
          href="https://integrate.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5A5550] hover:text-[#CDFF00] transition-colors duration-200"
        >
          Integrate
        </a>
      </p>
    </footer>
  );
}
