import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import sliderIMG from "@/assets/slider-1.png";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Mint Arena · Malia" },
      { name: "description", content: "Open-air tropical bar, neon nights, craft cocktails. The Mint Arena experience." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { tr } = useLang();

  const sections = [
    { n: "01", title: tr("expp_1_title"), text: tr("expp_1_text"), accent: "#7B2FFF" },
    { n: "02", title: tr("expp_2_title"), text: tr("expp_2_text"), accent: "#FF2D9B" },
    { n: "03", title: tr("expp_3_title"), text: tr("expp_3_text"), accent: "#39FF14" },
  ];

  return (
    <>
      <section className="relative py-28 md:py-36 px-6 radial-night-strong text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-display text-5xl md:text-8xl uppercase leading-[0.9]"
        >
          <span className="text-white">The </span>
          <span className="neon-mint pulse-mint">Mint Arena</span>
          <br />
          <span className="text-white">Experience</span>
        </motion.h1>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-24">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className="md:col-span-5 [direction:ltr]">
              <div
                className="font-display text-[8rem] md:text-[12rem] leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `2px ${s.accent}`,
                  textShadow: `0 0 30px ${s.accent}66`,
                }}
              >
                {s.n}
              </div>
            </div>
            <div className="md:col-span-7 [direction:ltr]">
              <h2 className="font-display text-4xl md:text-6xl uppercase text-white">
                {s.title}
              </h2>
              <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-xl">
                {s.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="relative py-32 px-6 radial-night-strong text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-7xl uppercase">
            <span className="neon-mint">{tr("expp_cta")}</span>
          </h2>
          <Link to="/contact" className="btn-neon mt-10 inline-flex">
            {tr("expp_cta_btn")}
          </Link>
        </motion.div>
      </section>
    </>
  );
}
