import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import mintLogo from "@/assets/mint-logo.png";

export function Navbar() {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: tr("nav_home") },
    { to: "/menu", label: tr("nav_menu") },
    { to: "/experience", label: tr("nav_experience") },
    { to: "/contact", label: tr("nav_contact") },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        backgroundColor: scrolled ? "rgba(8,8,8,0.78)" : "rgba(8,8,8,0.45)",
        borderBottom: scrolled ? "1px solid rgba(57,255,20,0.18)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">

        {/* Logo — left */}
        <Link to="/" className="flex items-center select-none shrink-0">
          <img
            src={mintLogo}
            alt="Mint Arena — Cocktails · Malia"
            className="h-14 md:h-25 w-auto object-contain"
            style={{
              filter:
                "brightness(1.35) saturate(1.4) drop-shadow(0 0 10px rgba(57,255,20,0.55)) drop-shadow(0 0 22px rgba(57,255,20,0.3))",
            }}
          />
        </Link>

        {/* Desktop nav — all links + toggle on the right */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm tracking-[0.22em] text-white/85 hover:text-mint transition-colors uppercase"
              activeProps={{
                className:
                  "font-display text-sm tracking-[0.22em] neon-mint-soft uppercase",
              }}
            >
              {l.label}
            </Link>
          ))}
          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden text-mint"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[78%] max-w-sm bg-[#0a0a0a] border-l border-mint/30 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ boxShadow: "-20px 0 60px rgba(57,255,20,0.08)" }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <img
              src={mintLogo}
              alt="Mint Arena"
              className="h-9 w-auto"
              style={{
                filter:
                  "brightness(1.35) saturate(1.4) drop-shadow(0 0 8px rgba(57,255,20,0.5))",
              }}
            />
            <button onClick={() => setOpen(false)} className="text-white">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl tracking-widest text-white hover:text-mint transition-colors uppercase"
                activeProps={{
                  className:
                    "font-display text-3xl tracking-widest neon-mint-soft uppercase",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}

function LangToggle({
  lang,
  setLang,
}: {
  lang: "en" | "el";
  setLang: (l: "en" | "el") => void;
}) {
  return (
    <div className="inline-flex items-center border border-mint/50 rounded-full overflow-hidden font-display tracking-widest text-xs">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition-colors ${
          lang === "en" ? "bg-mint text-black" : "text-white/80 hover:text-mint"
        }`}
      >
        EN
      </button>
      <span className="text-mint/40">|</span>
      <button
        onClick={() => setLang("el")}
        className={`px-3 py-1.5 transition-colors ${
          lang === "el" ? "bg-mint text-black" : "text-white/80 hover:text-mint"
        }`}
      >
        ΕΛ
      </button>
    </div>
  );
}