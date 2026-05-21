import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mint Arena · Malia" },
      { name: "description", content: "Visit Mint Arena in Malia, Crete. Address, phone, opening hours and map." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { tr } = useLang();

  return (
    <>
      <section className="relative py-24 md:py-28 px-6 radial-night-strong text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl md:text-9xl uppercase"
        >
          <span className="neon-mint pulse-mint">{tr("contact_heading")}</span>
        </motion.h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 space-y-7"
        >
          {[
            { Icon: MapPin, label: tr("contact_address_label"), value: tr("contact_address_value") },
            { Icon: Phone, label: tr("contact_phone_label"), value: "+30 2897 000000" },
            { Icon: Mail, label: tr("contact_email_label"), value: "info@mintarena.gr" },
            { Icon: Clock, label: tr("contact_hours_label"), value: tr("contact_hours_value") },
          ].map(({ Icon, label, value }, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="shrink-0 mt-1 p-2 rounded-md border border-mint/40" style={{ boxShadow: "0 0 16px #39FF1433" }}>
                <Icon size={20} className="text-mint" />
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] text-mint uppercase">{label}</div>
                <div className="text-white/90 mt-1">{value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden glow-box-mint"
        >
          <iframe
            title="Mint Arena Malia map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.7458734239267!2d25.45936307516088!3d35.28744407271684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149a65015c61cd0f%3A0xc17d565ea8cc68d5!2sMint%20Cocktail%20Bar%20Malia!5e0!3m2!1sel!2sgr!4v1779361409024!5m2!1sel!2sgr"
            width="100%"
            height={450}
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>

      <section className="relative py-28 px-6 radial-night-strong mt-12 border-t border-white/5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center max-w-4xl mx-auto leading-snug uppercase"
        >
          <span className="text-white/90">{tr("contact_quote")}</span>
        </motion.p>
      </section>
    </>
  );
}
