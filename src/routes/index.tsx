import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import mintLogo from "@/assets/mint-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mint Arena — Cocktail Bar in Malia, Crete" },
      { name: "description", content: "Open-air craft cocktail bar in Malia, Crete. One night, infinite vibes." },
    ],
  }),
  component: Home,
});

const signatures = [
  { name_en: "Mint Mule", name_el: "Mint Mule", desc_en: "Vodka, fresh mint, ginger beer, lime.", desc_el: "Βότκα, φρέσκος δυόσμος, ginger beer, λάιμ.", price: "€12" },
  { name_en: "Passion Sunrise", name_el: "Passion Sunrise", desc_en: "Tequila, passionfruit, orange, grenadine.", desc_el: "Τεκίλα, passionfruit, πορτοκάλι, ροδιά.", price: "€13" },
  { name_en: "Neon Spritz", name_el: "Neon Spritz", desc_en: "Aperol, prosecco, soda, electric twist.", desc_el: "Aperol, prosecco, σόδα, ηλεκτρική νότα.", price: "€11" },
];

import slide1 from "@/assets/slider-1.jpg";
import slide2 from "@/assets/slider-2.jpg";
import slide3 from "@/assets/slider-3.jpg";
import slide4 from "@/assets/slider-4.jpg";

const slides = [slide1, slide2, slide3, slide4];
const FRAME_COUNT = 41;

function padded(n: number) {
  return String(n).padStart(3, "0");
}

function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slides[idx]} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, #7B2FFF22 0%, #FF2D9B18 40%, transparent 70%)" }}
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === idx ? "2.5rem" : "0.5rem",
              background: i === idx ? "#39FF14" : "rgba(255,255,255,0.35)",
              boxShadow: i === idx ? "0 0 8px #39FF14" : "none",
            }}
          />
        ))}
      </div>
    </>
  );
}

function FrameAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(-1);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const stRef = useRef<any>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !container || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();

    function drawBitmap(index: number) {
      const bmp = bitmapsRef.current[index];
      if (!bmp || !canvas || !ctx) return;
      const scale = Math.max(canvas.width / bmp.width, canvas.height / bmp.height);
      const w = bmp.width * scale;
      const h = bmp.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bmp, x, y, w, h);
    }

    const handleResize = () => {
      setCanvasSize();
      if (currentFrameRef.current >= 0) drawBitmap(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    async function preloadAll() {
      const bitmaps: ImageBitmap[] = new Array(FRAME_COUNT);
      let loaded = 0;

      await Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, i) =>
          fetch(`/mint-framer_000/mint-framer_${padded(i)}.jpg`)
            .then((r) => r.blob())
            .then((blob) => createImageBitmap(blob))
            .then((bmp) => {
              bitmaps[i] = bmp;
              loaded++;
              if (!destroyed) setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
            })
        )
      );

      if (destroyed) return;

      bitmapsRef.current = bitmaps;
      currentFrameRef.current = 0;
      drawBitmap(0);
      setReady(true);

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (destroyed) return;

      if (text1Ref.current) {
        text1Ref.current.style.opacity = "0";
        text1Ref.current.style.transform = "translateX(-60px)";
      }
      if (text2Ref.current) {
        text2Ref.current.style.opacity = "0";
        text2Ref.current.style.transform = "translateX(-60px)";
      }

      // Pin the WRAPPER (stable outer div React doesn't move)
      // but use the inner container as the visual element
      stRef.current = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=250%",
        pin: container, // pin the INNER div, not the wrapper
        pinSpacing: true,
        scrub: 0.15,
        onUpdate: (self) => {
          if (destroyed) return;
          const p = self.progress;

          const frameIndex = Math.min(Math.round(p * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawBitmap(frameIndex));
          }

          if (text1Ref.current) {
            let o = 0, x = -60;
            if (p >= 0.28 && p < 0.38) { const t = (p - 0.28) / 0.1; o = t; x = -60 + 60 * t; }
            else if (p >= 0.38 && p < 0.52) { o = 1; x = 0; }
            else if (p >= 0.52 && p < 0.62) { const t = (p - 0.52) / 0.1; o = 1 - t; x = -60 * t; }
            text1Ref.current.style.opacity = String(o);
            text1Ref.current.style.transform = `translateX(${x}px)`;
          }

          if (text2Ref.current) {
            let o = 0, x = -60;
            if (p >= 0.62 && p < 0.72) { const t = (p - 0.62) / 0.1; o = t; x = -60 + 60 * t; }
            else if (p >= 0.72 && p < 0.88) { o = 1; x = 0; }
            else if (p >= 0.88 && p < 0.98) { const t = (p - 0.88) / 0.1; o = 1 - t; x = -60 * t; }
            text2Ref.current.style.opacity = String(o);
            text2Ref.current.style.transform = `translateX(${x}px)`;
          }
        },
      });
    }

    preloadAll();

    return () => {
      destroyed = true;

      // Kill ScrollTrigger and revert pin BEFORE React unmounts
      if (stRef.current) {
        stRef.current.kill(true);
        stRef.current = null;
      }

      // Manually put container back inside wrapper if GSAP moved it
      if (container && wrapper && container.parentNode !== wrapper) {
        try {
          wrapper.appendChild(container);
        } catch (_) {}
      }

      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      bitmapsRef.current.forEach((b) => b?.close());
      bitmapsRef.current = [];
    };
  }, []);

  return (
    // Outer wrapper — React owns this, never moved by GSAP
    <div ref={wrapperRef} style={{ height: "350vh", position: "relative" }}>
      {/* Inner container — GSAP pins this */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-[#080808]"
        style={{ height: "100vh" }}
      >
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4">
            <div className="h-px bg-mint/30 w-48 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-mint transition-all duration-200"
                style={{ width: `${loadProgress}%`, boxShadow: "0 0 8px #39FF14" }}
              />
            </div>
            <p className="font-display text-xs tracking-[0.4em] text-mint/60 uppercase">
              {loadProgress}%
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, #39FF1408 0%, transparent 70%)" }}
        />

        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 pointer-events-none z-10">
          <div
            ref={text1Ref}
            style={{ opacity: 0, transform: "translateX(-60px)", willChange: "opacity, transform" }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-mint uppercase mb-2">— our</p>
            <h2
              className="font-display uppercase leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", color: "#ffffff", textShadow: "0 0 40px rgba(57,255,20,0.25)" }}
            >
              SIGNA<br />
              <span style={{ color: "#39FF14", textShadow: "0 0 30px #39FF14, 0 0 60px #39FF1466" }}>TURES</span>
            </h2>
          </div>

          <div
            ref={text2Ref}
            className="mt-6"
            style={{ opacity: 0, transform: "translateX(-60px)", willChange: "opacity, transform" }}
          >
            <h2
              className="font-display uppercase leading-none"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                color: "rgba(255,255,255,0.15)",
                WebkitTextStroke: "1px rgba(57,255,20,0.6)",
                textShadow: "0 0 40px rgba(57,255,20,0.1)",
              }}
            >
              COCKTAILS
            </h2>
            <p className="mt-4 text-white/50 font-body text-sm md:text-base tracking-widest uppercase">
              Handcrafted by our mixologists
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-10" />
      </div>
    </div>
  );
}

function Home() {
  const { lang, tr } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="orb absolute top-1/4 left-1/4 w-40 h-40 rounded-full"
            style={{ background: "radial-gradient(circle, #7B2FFF55, transparent 70%)", filter: "blur(24px)" }} />
          <div className="orb absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, #FF2D9B44, transparent 70%)", filter: "blur(32px)", animationDelay: "2s" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="relative z-20 text-center px-6"
        >
    <Link to="/" className="flex items-center select-none shrink-0">
          <img
            src={mintLogo}
            alt="Mint Arena — Cocktails · Malia"
            className="h-auto md:h-auto max-w-full"
            style={{
              filter:
                "brightness(1.35) saturate(1.4) drop-shadow(0 0 10px rgba(57,255,20,0.55)) drop-shadow(0 0 22px rgba(57,255,20,0.3))",
            }}
          />
        </Link>
          <p className="mt-6 italic text-lg md:text-2xl text-white/85 font-body">{tr("hero_tagline")}</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/menu" className="btn-neon">{tr("hero_explore")}</Link>
            <Link to="/experience" className="btn-neon btn-neon-pink">{tr("hero_experience")}</Link>
          </div>
        </motion.div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-20" />
      </section>

      {/* ABOUT STRIP */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { num: "100+", label: tr("stat_cocktails") },
            { num: "2018", label: tr("stat_since") },
            { num: "#1", label: tr("stat_best") },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="font-display text-6xl md:text-7xl neon-mint">{s.num}</div>
              <div className="font-display tracking-[0.3em] text-sm text-white/80 mt-2 uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GSAP FRAME ANIMATION */}
      <FrameAnimation />

      {/* SIGNATURE SIPS */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="font-display text-5xl md:text-7xl text-center uppercase">
            <span className="text-white">{tr("sig_heading").split(" ")[0]}</span>{" "}
            <span className="btn-neon-pink">{tr("sig_heading").split(" ").slice(1).join(" ")}</span>
          </motion.h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {signatures.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glow-box-mint-hover bg-[#111] border border-white/10 rounded-md p-7">
                <h3 className="font-display text-3xl text-mint tracking-wider">
                  {lang === "en" ? c.name_en : c.name_el}
                </h3>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">
                  {lang === "en" ? c.desc_en : c.desc_el}
                </p>
                <div className="mt-6 font-display text-2xl text-white">{c.price}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu" className="font-display tracking-[0.25em] text-mint hover:text-white transition-colors uppercase">
              {tr("sig_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="font-display text-4xl md:text-6xl text-center uppercase text-white">
            {tr("map_heading")}
          </motion.h2>
          <div className="mt-12 rounded-xl overflow-hidden glow-box-mint">
            <iframe
              title="Mint Arena Malia map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.7458734239267!2d25.45936307516088!3d35.28744407271684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149a65015c61cd0f%3A0xc17d565ea8cc68d5!2sMint%20Cocktail%20Bar%20Malia!5e0!3m2!1sel!2sgr!4v1779361409024!5m2!1sel!2sgr"
              width="100%" height={400} style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <div className="font-display text-xs tracking-[0.3em] text-mint uppercase">{tr("contact_address_label")}</div>
              <div className="text-white/85 mt-1">{tr("contact_address_value")}</div>
            </div>
            <div>
              <div className="font-display text-xs tracking-[0.3em] text-mint uppercase">{tr("contact_phone_label")}</div>
              <div className="text-white/85 mt-1">{tr("map_phone")}</div>
            </div>
            <div>
              <div className="font-display text-xs tracking-[0.3em] text-mint uppercase">{tr("contact_hours_label")}</div>
              <div className="text-white/85 mt-1">{tr("map_hours")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TEASER */}
      <section className="relative py-32 px-6 overflow-hidden radial-night-strong border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-8xl uppercase">
            <span className="text-white">The </span>
            <span className="neon-mint">Mint</span>
            <span className="btn-neon-pink"> Experience</span>
          </h2>
          <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto">{tr("exp_sub")}</p>
          <Link to="/experience" className="btn-neon mt-10 inline-flex">{tr("exp_cta")}</Link>
        </motion.div>
      </section>
    </>
  );
}