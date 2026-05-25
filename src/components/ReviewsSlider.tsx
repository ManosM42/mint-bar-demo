import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



const reviews = [
  {
    name: "Alyssa Trautmann",
    text: "Delicious and pretty cocktails and a very delicious Watermelon Fishbowl — I can only recommend. The staff was very nice and gave us shots on the house and even slices of watermelon for free.",
    stars: 5,
  },
  {
    name: "Ketan Sikotra",
    text: "One of the best places to go for drinks!! If you are going make sure you get the watermelon fishbowl, you cannot get it anywhere else and they are huge! Great service from the staff.",
    stars: 5,
  },
  {
    name: "Fair Wesen",
    text: "People nice and the music good. Live DJ plays well. A great vibe from the moment you arrive — keep you up to date all night long.",
    stars: 4,
  },
  {
    name: "Kailey Aston",
    text: "This bar has the best pop music — 80s to 2020. Amazing staff. Ask for Larissa and Pavlos and you will get the best service. 100/10 cocktails. Amazing detail to drinks. Igloo chairs are amazing.",
    stars: 5,
  },
  {
    name: "Eamon Needham",
    text: "Great little bar, more relaxed than the other places around it. Good for hanging out before the clubs. Good cocktails too for the strip. Also have the swing seats which are nice for chilling on.",
    stars: 4,
  },
  {
    name: "El En",
    text: "There is no better place in the center of Malia. The cocktails were great and delicious. The service was the best — nice and friendly people. The best place to enjoy your time from afternoon to evening.",
    stars: 5,
  },
  {
    name: "Γαβριέλα Γαβριηλίδου",
    text: "Cocktails were incredible, the strawberry daiquiri was the best I've ever tasted! The service was exceptional, especially Giannis was the best waiter and the funniest person I've met!!!",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#39FF14" : "none"}
          stroke={i < count ? "#39FF14" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.5"
          style={{ filter: i < count ? "drop-shadow(0 0 4px #39FF14aa)" : "none" }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// Avatar initials circle
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #39FF1422, #7B2FFF33)",
        border: "1px solid rgba(57,255,20,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display, sans-serif)",
        fontSize: 15,
        color: "#39FF14",
        letterSpacing: "0.05em",
        flexShrink: 0,
        boxShadow: "0 0 12px rgba(57,255,20,0.15)",
      }}
    >
      {initials}
    </div>
  );
}

export function ReviewsSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const N = reviews.length;

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + N) % N);
  };

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((i) => (i + 1) % N);
    }, 4500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  // Google rating display
  const rating = 4.4;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-mint uppercase mb-3">
            — verified google reviews
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase">
            <span className="text-white">What Our </span>
            <span className="neon-mint">Visitors</span>
            <span className="text-white"> Say</span>
          </h2>

          {/* Google rating badge */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(57,255,20,0.18)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < fullStars;
                const half = !filled && i === fullStars && hasHalf;
                return (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24"
                    fill={filled ? "#39FF14" : "none"}
                    stroke={filled || half ? "#39FF14" : "rgba(255,255,255,0.2)"}
                    strokeWidth="1.5"
                    style={{ filter: filled ? "drop-shadow(0 0 3px #39FF14)" : "none" }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                );
              })}
            </div>
            <span className="font-display text-sm text-white/80 tracking-wider">
              {rating} / 5 · 384 reviews
            </span>
          </div>
        </motion.div>

        {/* Card */}
        <div className="relative" style={{ minHeight: 240 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0"
            >
              <div
                className="h-full rounded-2xl p-8 md:p-10 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(57,255,20,0.15)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0 40px rgba(57,255,20,0.05), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="font-display text-7xl leading-none mb-4 select-none"
                  style={{ color: "rgba(57,255,20,0.18)", lineHeight: 0.8 }}
                >
                  "
                </div>

                <p className="font-body text-lg md:text-xl text-white/85 leading-relaxed flex-1">
                  {reviews[current].text}
                </p>

                <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={reviews[current].name} />
                    <div>
                      <div className="font-display text-sm tracking-[0.12em] text-white uppercase">
                        {reviews[current].name}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5 tracking-wider">Google Review</div>
                    </div>
                  </div>
                  <Stars count={reviews[current].stars} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => { go(current - 1, -1); startAuto(); }}
            aria-label="Previous review"
            className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(57,255,20,0.25)",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { go(i, i > current ? 1 : -1); startAuto(); }}
                aria-label={`Review ${i + 1}`}
                className="rounded-full transition-all duration-500"
                style={{
                  height: 4,
                  width: i === current ? "2.5rem" : "0.5rem",
                  background: i === current ? "#39FF14" : "rgba(255,255,255,0.25)",
                  boxShadow: i === current ? "0 0 8px #39FF14" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => { go(current + 1, 1); startAuto(); }}
            aria-label="Next review"
            className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(57,255,20,0.25)",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}