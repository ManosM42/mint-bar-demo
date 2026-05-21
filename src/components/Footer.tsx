import { useLang } from "@/contexts/LanguageContext";

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="border-t border-white/10 mt-24 py-10 px-6 text-center">
      <div className="font-display text-2xl neon-mint">MINT ARENA</div>
      <div className="font-display text-xs tracking-[0.35em] text-white/60 mt-1">
        {tr("nav_location")}
      </div>
      <div className="text-xs text-white/40 mt-4 font-body">
        © {new Date().getFullYear()} Mint Arena · All rights reserved.
      </div>
    </footer>
  );
}
