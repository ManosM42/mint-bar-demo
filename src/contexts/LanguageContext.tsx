import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "el";

type Dict = Record<string, { en: string; el: string }>;

export const t: Dict = {
  // nav
  nav_home: { en: "Home", el: "Αρχική" },
  nav_menu: { en: "Menu", el: "Μενού" },
  nav_experience: { en: "Experience", el: "Εμπειρία" },
  nav_contact: { en: "Contact", el: "Επικοινωνία" },
  nav_location: { en: "Malia · Crete", el: "Μάλια · Κρήτη" },

  // hero
  hero_tagline: { en: "One Night. Infinite Vibes.", el: "Μία Νύχτα. Άπειρες Στιγμές." },
  hero_explore: { en: "Explore Menu", el: "Δες το Μενού" },
  hero_experience: { en: "Our Experience", el: "Η Εμπειρία μας" },

  // about strip
  stat_cocktails: { en: "Cocktails", el: "Κοκτέιλ" },
  stat_since: { en: "Open Since 2016", el: "Από το 2016" },
  stat_best: { en: "Malia's #1 Bar", el: "Το No1 Bar στα Μάλια" },

  // signature
  sig_heading: { en: "Signature Sips", el: "Υπογραφές μας" },
  sig_cta: { en: "View Full Menu →", el: "Δες όλο το Μενού →" },

  // map
  map_heading: { en: "Find Us in Malia", el: "Βρες μας στα Μάλια" },
  map_address: { en: "Malia, Heraklion, Crete", el: "Μάλια, Ηράκλειο, Κρήτη" },
  map_phone: { en: "+30 2897 000000", el: "+30 2897 000000" },
  map_hours: { en: "Daily 20:00 – 04:00", el: "Καθημερινά 20:00 – 04:00" },

  // experience teaser
  exp_heading: { en: "The Mint Experience", el: "Η Εμπειρία Mint" },
  exp_sub: {
    en: "Open-air, neon-lit, tropical. A summer night that doesn't end.",
    el: "Υπαίθριο, με νέον φώτα, τροπικό. Μία καλοκαιρινή νύχτα που δεν τελειώνει.",
  },
  exp_cta: { en: "Step Inside", el: "Μπες μέσα" },

  // menu page
  menu_hero_1: { en: "One Cocktail.", el: "Ένα Κοκτέιλ." },
  menu_hero_2: { en: "Endless Vibes.", el: "Άπειρη Διάθεση." },
  menu_hero_sub: {
    en: "Handcrafted cocktails by our expert mixologists.",
    el: "Χειροποίητα κοκτέιλ από τους ειδικούς μας mixologists.",
  },

  cat_cocktails: { en: "Cocktails", el: "Κοκτέιλ" },
  cat_mocktails: { en: "Mocktails", el: "Mocktails" },
  cat_shots: { en: "Shots", el: "Shots" },
  cat_beer: { en: "Beer", el: "Μπύρες" },
  cat_soft: { en: "Soft Drinks", el: "Αναψυκτικά" },

  // experience page
  expp_hero: { en: "The Mint Arena Experience", el: "Η Εμπειρία Mint Arena" },
  expp_1_title: { en: "The Atmosphere", el: "Η Ατμόσφαιρα" },
  expp_1_text: {
    en: "An open-air tropical garden under the Cretan sky. Palm trees wrapped in fairy lights, neon signs throbbing in pink and violet, columns dressed in vines. The whole bar breathes summer.",
    el: "Ένας υπαίθριος τροπικός κήπος κάτω από τον κρητικό ουρανό. Φοίνικες στολισμένοι με φωτάκια, νέον επιγραφές σε ροζ και βιολετί, κίονες ντυμένοι με κισσούς. Όλο το μπαρ αναπνέει καλοκαίρι.",
  },
  expp_2_title: { en: "The Cocktails", el: "Τα Κοκτέιλ" },
  expp_2_text: {
    en: "A craft cocktail program built around fresh Cretan herbs, citrus, and premium spirits. Our mixologists treat every drink like a small ritual — shaken, stirred, smoked, and served with theatre.",
    el: "Ένα craft πρόγραμμα κοκτέιλ με φρέσκα κρητικά βότανα, εσπεριδοειδή και premium ποτά. Οι mixologists μας μετατρέπουν κάθε ποτό σε μικρή τελετουργία — shaken, stirred, smoked, με θεαματικό σερβίρισμα.",
  },
  expp_3_title: { en: "The Nights", el: "Οι Νύχτες" },
  expp_3_text: {
    en: "Deep house at sunset, harder beats by midnight. A young, international crowd, packed dance floor, and that Malia electricity you only get in the heart of summer.",
    el: "Deep house στο ηλιοβασίλεμα, πιο δυνατά beats τα μεσάνυχτα. Νεανικός, διεθνής κόσμος, γεμάτη πίστα, και η ηλεκτρισμένη ενέργεια των Μαλίων εν μέσω καλοκαιριού.",
  },
  expp_cta: { en: "Ready For Your Night?", el: "Έτοιμος για τη Νύχτα σου;" },
  expp_cta_btn: { en: "Plan Your Visit", el: "Κλείσε την Επίσκεψη" },

  // contact
  contact_heading: { en: "Find Us", el: "Βρες μας" },
  contact_address_label: { en: "Address", el: "Διεύθυνση" },
  contact_phone_label: { en: "Phone", el: "Τηλέφωνο" },
  contact_email_label: { en: "Email", el: "Email" },
  contact_hours_label: { en: "Opening Hours", el: "Ώρες Λειτουργίας" },
  contact_hours_value: { en: "Monday – Sunday · 20:00 – 04:00", el: "Δευτέρα – Κυριακή · 20:00 – 04:00" },
  contact_address_value: {
    en: "Malia, Heraklion, Crete, Greece",
    el: "Μάλια, Ηράκλειο, Κρήτη, Ελλάδα",
  },
  contact_quote: {
    en: "“Some nights are written in neon — yours starts here.”",
    el: "«Κάποιες νύχτες γράφονται με νέον — η δική σου ξεκινάει εδώ.»",
  },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const tr = (key: keyof typeof t) => t[key]?.[lang] ?? String(key);
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
