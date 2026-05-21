import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mint Arena · Malia" },
      { name: "description", content: "Cocktails, mocktails, shots, beer and more. Handcrafted by our mixologists." },
    ],
  }),
  component: MenuPage,
});

type Item = { en: string; el: string; desc_en: string; desc_el: string; price: string };

const cocktails: Item[] = [
  { en: "Mojito Classic", el: "Mojito Classic", desc_en: "White rum, fresh mint, lime, soda.", desc_el: "Λευκό ρούμι, φρέσκος δυόσμος, λάιμ, σόδα.", price: "€11" },
  { en: "Mint Mule", el: "Mint Mule", desc_en: "Vodka, ginger beer, mint, lime.", desc_el: "Βότκα, ginger beer, δυόσμος, λάιμ.", price: "€12" },
  { en: "Watermelon Breeze", el: "Αύρα Καρπουζιού", desc_en: "Vodka, fresh watermelon, basil, lime.", desc_el: "Βότκα, φρέσκο καρπούζι, βασιλικός, λάιμ.", price: "€12" },
  { en: "Passion Sunrise", el: "Passion Sunrise", desc_en: "Tequila, passionfruit, orange, grenadine.", desc_el: "Τεκίλα, passionfruit, πορτοκάλι, ροδιά.", price: "€13" },
  { en: "Blue Lagoon", el: "Γαλάζια Λιμνοθάλασσα", desc_en: "Vodka, blue curaçao, lemonade.", desc_el: "Βότκα, blue curaçao, λεμονάδα.", price: "€11" },
  { en: "Strawberry Daiquiri", el: "Strawberry Daiquiri", desc_en: "Rum, strawberry, lime, sugar.", desc_el: "Ρούμι, φράουλα, λάιμ, ζάχαρη.", price: "€12" },
  { en: "Espresso Martini", el: "Espresso Martini", desc_en: "Vodka, espresso, coffee liqueur.", desc_el: "Βότκα, espresso, λικέρ καφέ.", price: "€13" },
  { en: "Aperol Spritz", el: "Aperol Spritz", desc_en: "Aperol, prosecco, soda, orange.", desc_el: "Aperol, prosecco, σόδα, πορτοκάλι.", price: "€10" },
  { en: "Cosmopolitan", el: "Cosmopolitan", desc_en: "Vodka, triple sec, cranberry, lime.", desc_el: "Βότκα, triple sec, cranberry, λάιμ.", price: "€12" },
  { en: "Sex on the Beach", el: "Sex on the Beach", desc_en: "Vodka, peach, orange, cranberry.", desc_el: "Βότκα, ροδάκινο, πορτοκάλι, cranberry.", price: "€11" },
];

const mocktails: Item[] = [
  { en: "Virgin Mojito", el: "Virgin Mojito", desc_en: "Mint, lime, sugar, soda.", desc_el: "Δυόσμος, λάιμ, ζάχαρη, σόδα.", price: "€7" },
  { en: "Sunset Cooler", el: "Sunset Cooler", desc_en: "Orange, grenadine, lemon, soda.", desc_el: "Πορτοκάλι, ροδιά, λεμόνι, σόδα.", price: "€7" },
  { en: "Berry Lemonade", el: "Λεμονάδα Berry", desc_en: "Mixed berries, lemon, mint.", desc_el: "Berries, λεμόνι, δυόσμος.", price: "€8" },
  { en: "Tropical Twist", el: "Tropical Twist", desc_en: "Pineapple, mango, lime, coconut.", desc_el: "Ανανάς, μάνγκο, λάιμ, καρύδα.", price: "€8" },
];

const shots: Item[] = [
  { en: "Tequila", el: "Τεκίλα", desc_en: "Salt. Lime. Go.", desc_el: "Αλάτι. Λάιμ. Πάμε.", price: "€5" },
  { en: "Sambuca", el: "Sambuca", desc_en: "Anise, flamed.", desc_el: "Γλυκάνισος, φλόγα.", price: "€5" },
  { en: "Jägermeister", el: "Jägermeister", desc_en: "Ice cold, herbal.", desc_el: "Παγωμένο, βοτανικό.", price: "€5" },
  { en: "B52", el: "B52", desc_en: "Kahlúa, Baileys, Grand Marnier.", desc_el: "Kahlúa, Baileys, Grand Marnier.", price: "€5" },
  { en: "Kamikaze", el: "Kamikaze", desc_en: "Vodka, triple sec, lime.", desc_el: "Βότκα, triple sec, λάιμ.", price: "€4" },
];

const beers: Item[] = [
  { en: "Mythos", el: "Μύθος", desc_en: "Greek lager, crisp.", desc_el: "Ελληνική lager, δροσερή.", price: "€4" },
  { en: "Heineken", el: "Heineken", desc_en: "Pilsner, classic.", desc_el: "Pilsner, κλασική.", price: "€5" },
  { en: "Corona", el: "Corona", desc_en: "Mexican lager, lime.", desc_el: "Μεξικάνικη lager, λάιμ.", price: "€5" },
  { en: "Alfa", el: "Άλφα", desc_en: "Greek lager, smooth.", desc_el: "Ελληνική lager, απαλή.", price: "€4" },
];

const soft: Item[] = [
  { en: "Coca-Cola", el: "Coca-Cola", desc_en: "330ml.", desc_el: "330ml.", price: "€3" },
  { en: "Sprite", el: "Sprite", desc_en: "330ml.", desc_el: "330ml.", price: "€3" },
  { en: "Fanta", el: "Fanta", desc_en: "330ml.", desc_el: "330ml.", price: "€3" },
  { en: "Water", el: "Νερό", desc_en: "Still / sparkling.", desc_el: "Φυσικό / αεριούχο.", price: "€2" },
  { en: "Fresh Orange Juice", el: "Φρέσκος Χυμός Πορτοκάλι", desc_en: "Squeezed to order.", desc_el: "Στιγμιαία στυμμένος.", price: "€4" },
];

function MenuPage() {
  const { lang, tr } = useLang();
  const [active, setActive] = useState<"cocktails" | "mocktails" | "shots" | "beer" | "soft">("cocktails");

  const cats = [
    { key: "cocktails", label: tr("cat_cocktails"), items: cocktails },
    { key: "mocktails", label: tr("cat_mocktails"), items: mocktails },
    { key: "shots", label: tr("cat_shots"), items: shots },
    { key: "beer", label: tr("cat_beer"), items: beers },
    { key: "soft", label: tr("cat_soft"), items: soft },
  ] as const;

  const activeItems = cats.find((c) => c.key === active)?.items ?? [];

  return (
    <>
      {/* HERO */}
      <section className="relative py-24 md:py-32 px-6 radial-night-strong overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.9]">
            <span className="text-white">{tr("menu_hero_1")}</span>
            <br />
            <span className="neon-mint pulse-mint">{tr("menu_hero_2")}</span>
          </h1>
          <p className="mt-6 text-white/75 text-lg max-w-2xl mx-auto">{tr("menu_hero_sub")}</p>
        </motion.div>
      </section>

      {/* STICKY CATEGORY TABS */}
      <div className="sticky top-[72px] z-30 bg-[#080808]/90 backdrop-blur-md border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`shrink-0 font-display text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all ${
                active === c.key
                  ? "bg-mint text-black border-mint"
                  : "border-white/15 text-white/85 hover:border-mint hover:text-mint"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ITEMS */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeItems.map((item, i) => (
            <motion.div
              key={`${active}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glow-box-mint-hover bg-[#0f0f0f] border border-white/10 rounded-md p-5 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <h3 className="font-bold text-white text-lg">
                  {lang === "en" ? item.en : item.el}
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  {lang === "en" ? item.desc_en : item.desc_el}
                </p>
              </div>
              <div className="font-display text-2xl text-mint shrink-0">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
