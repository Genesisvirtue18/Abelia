import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "sv" | "en" | "ar" | "fa";

export const LANGUAGES: { code: Language; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "sv", label: "Swedish", native: "Svenska", dir: "ltr" },
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "fa", label: "Dari", native: "دری (افغانستان)", dir: "rtl" },
];

const COPY = {
  sv: {
    nav: { home: "Hem", services: "Tjänster", about: "Om oss", blog: "Blogg", contact: "Kontakta oss", book: "Boka tid", menu: "Huvudmeny", open: "Öppna meny", close: "Stäng meny" },
    announcement: { before: "Mars:", strong: "fri fönsterputsning", after: "på alla nya löpande hemstädpaket", action: "Boka in" },
    contact: {
      eyebrow: "Kontakta oss", title: "Hör av dig –", script: "vi svarar snabbt.", intro: "Skriv till oss direkt eller använd formuläret nedan. Vill du ha en offert? Kryssa i rutan så återkommer vi med ett gratis, tydligt prisförslag.",
      emailTitle: "Skicka e-post", emailDetail: "Svar inom 24 h, oftast snabbare", emailAction: "E-posta oss", areaTitle: "Vårt serviceområde", areaDetail: "Städning och trädgårdsskötsel", areaAction: "Se på karta", servicesTitle: "Våra tjänster", servicesDetail: "För privatpersoner och företag", servicesAction: "Se tjänster", hoursTitle: "Kontakt", hoursDetail: "Använd e-post eller formuläret", hoursAction: "Skriv till oss",
      formTitle: "Skicka ett meddelande", name: "Namn", phone: "Telefon", email: "E-post", subject: "Ärende", message: "Meddelande", namePlaceholder: "Ditt namn", phonePlaceholder: "07x-xxx xx xx", emailPlaceholder: "namn@exempel.se", messagePlaceholder: "Berätta gärna kort om bostaden, lokalen eller ditt önskemål...", quote: "Jag vill ha en gratis offert.", quoteText: "Då räknar vi ut ett fast pris och skickar det till dig inom 24 h.", submitQuote: "Skicka förfrågan om offert", submitMessage: "Skicka meddelande", privacy: "Genom att skicka godkänner du vår integritetspolicy.",
      successTitle: "Meddelandet är", successScript: "skickat!", successBody: "Tack, {name}. Vi återkommer till {email} {time}.", successQuote: "med en skriftlig offert inom 24 timmar", successNormal: "inom 24 timmar", again: "Skicka ett till", mapTitle: "Abelia Städ & Service", mapBody: "Serviceområde: Borås, Ulricehamn, Alingsås, Skene och Göteborg", mapLink: "Öppna serviceområdet på karta", errorName: "Fyll i ditt namn.", errorEmail: "Ange en giltig e-postadress.", errorMessage: "Skriv gärna några ord till.", subjects: ["Fråga om tjänst", "Offertförfrågan", "Löpande avtal / företag", "Kundklagomål", "Annat"],
    },
    footer: { description: "Noggrann städning och service för privatpersoner och företag. Skriv till oss för en tydlig, kostnadsfri offert.", tips: "Städtips, månadsvis", subscribe: "Bli medlem", thankYou: "Tack! Du hör av oss inom kort.", services: "Tjänster", links: "Länkar", contact: "Kontakt", area: "Serviceområde", made: "Gjort med omsorg", rights: "Abelia Städ & Service" },
    shared: { language: "Språk", emailPlaceholder: "Din e-postadress", freeQuote: "Gratis offert", booking: "Boka tid", privacy: "Integritetspolicy", map: "Karta" },
  },
  en: {
    nav: { home: "Home", services: "Services", about: "About us", blog: "Blog", contact: "Contact", book: "Book now", menu: "Main menu", open: "Open menu", close: "Close menu" },
    announcement: { before: "March:", strong: "free window cleaning", after: "with every new recurring home-cleaning plan", action: "Book now" },
    contact: {
      eyebrow: "Contact us", title: "Get in touch –", script: "we reply quickly.", intro: "Write to us directly or use the form below. Want a quote? Tick the box and we will return with a free, clear proposal.",
      emailTitle: "Send an email", emailDetail: "Reply within 24 hours, often sooner", emailAction: "Email us", areaTitle: "Our service area", areaDetail: "Cleaning and garden care", areaAction: "View map", servicesTitle: "Our services", servicesDetail: "For households and businesses", servicesAction: "View services", hoursTitle: "Contact", hoursDetail: "Use email or the contact form", hoursAction: "Write to us",
      formTitle: "Send a message", name: "Name", phone: "Phone", email: "Email", subject: "Subject", message: "Message", namePlaceholder: "Your name", phonePlaceholder: "Phone number", emailPlaceholder: "name@example.com", messagePlaceholder: "Tell us briefly about your home, premises or request...", quote: "I would like a free quote.", quoteText: "We will calculate a fixed price and send it to you within 24 hours.", submitQuote: "Send quote request", submitMessage: "Send message", privacy: "By sending, you accept our privacy policy.",
      successTitle: "Your message is", successScript: "sent!", successBody: "Thank you, {name}. We will reply to {email} {time}.", successQuote: "with a written quote within 24 hours", successNormal: "within 24 hours", again: "Send another", mapTitle: "Abelia Städ & Service", mapBody: "Service area: Borås, Ulricehamn, Alingsås, Skene and Gothenburg", mapLink: "Open service area in map", errorName: "Please enter your name.", errorEmail: "Please enter a valid email address.", errorMessage: "Please write a few words.", subjects: ["Service question", "Quote request", "Recurring plan / business", "Customer complaint", "Other"],
    },
    footer: { description: "Careful cleaning and service for households and businesses. Write to us for a clear, free quote.", tips: "Cleaning tips, monthly", subscribe: "Subscribe", thankYou: "Thank you. You are on the list.", services: "Services", links: "Links", contact: "Contact", area: "Service area", made: "Made with care", rights: "Abelia Städ & Service" },
    shared: { language: "Language", emailPlaceholder: "Your email address", freeQuote: "Free quote", booking: "Book now", privacy: "Privacy policy", map: "Map" },
  },
  ar: {
    nav: { home: "الرئيسية", services: "الخدمات", about: "من نحن", blog: "المدونة", contact: "اتصل بنا", book: "احجز الآن", menu: "القائمة الرئيسية", open: "فتح القائمة", close: "إغلاق القائمة" },
    announcement: { before: "مارس:", strong: "تنظيف نوافذ مجاني", after: "مع كل خطة تنظيف منزلية دورية جديدة", action: "احجز الآن" },
    contact: {
      eyebrow: "اتصل بنا", title: "تواصل معنا –", script: "نرد بسرعة.", intro: "اكتب لنا مباشرة أو استخدم النموذج أدناه. هل تريد عرض سعر؟ فعّل المربع وسنعود إليك باقتراح واضح ومجاني.",
      emailTitle: "أرسل بريداً", emailDetail: "نرد خلال 24 ساعة وغالباً أسرع", emailAction: "راسلنا", areaTitle: "منطقة الخدمة", areaDetail: "التنظيف والعناية بالحدائق", areaAction: "عرض الخريطة", servicesTitle: "خدماتنا", servicesDetail: "للأفراد والشركات", servicesAction: "عرض الخدمات", hoursTitle: "التواصل", hoursDetail: "استخدم البريد أو نموذج الاتصال", hoursAction: "اكتب لنا",
      formTitle: "أرسل رسالة", name: "الاسم", phone: "الهاتف", email: "البريد الإلكتروني", subject: "الموضوع", message: "الرسالة", namePlaceholder: "اسمك", phonePlaceholder: "رقم الهاتف", emailPlaceholder: "name@example.com", messagePlaceholder: "أخبرنا باختصار عن منزلك أو مقر عملك أو طلبك...", quote: "أرغب في عرض سعر مجاني.", quoteText: "سنحسب سعراً ثابتاً ونرسله إليك خلال 24 ساعة.", submitQuote: "إرسال طلب عرض السعر", submitMessage: "إرسال الرسالة", privacy: "بإرسال النموذج، فإنك توافق على سياسة الخصوصية.",
      successTitle: "تم", successScript: "إرسال رسالتك!", successBody: "شكراً {name}. سنرد على {email} {time}.", successQuote: "بعرض سعر مكتوب خلال 24 ساعة", successNormal: "خلال 24 ساعة", again: "إرسال رسالة أخرى", mapTitle: "Abelia Städ & Service", mapBody: "منطقة الخدمة: بوروس، أولريسِهامن، ألينغسوس، سكينه وغوتنبرغ", mapLink: "افتح منطقة الخدمة على الخريطة", errorName: "يرجى إدخال الاسم.", errorEmail: "يرجى إدخال بريد إلكتروني صالح.", errorMessage: "يرجى كتابة بضع كلمات.", subjects: ["سؤال عن الخدمة", "طلب عرض سعر", "خطة دورية / شركة", "شكوى عميل", "أخرى"],
    },
    footer: { description: "تنظيف وخدمة دقيقة للأفراد والشركات. اكتب لنا للحصول على عرض سعر واضح ومجاني.", tips: "نصيحة تنظيف شهرية", subscribe: "اشترك", thankYou: "شكراً، تم تسجيلك.", services: "الخدمات", links: "الروابط", contact: "التواصل", area: "منطقة الخدمة", made: "صُنع بعناية", rights: "Abelia Städ & Service" },
    shared: { language: "اللغة", emailPlaceholder: "بريدك الإلكتروني", freeQuote: "عرض سعر مجاني", booking: "احجز الآن", privacy: "سياسة الخصوصية", map: "الخريطة" },
  },
  fa: {
    nav: { home: "خانه", services: "خدمات", about: "درباره ما", blog: "وبلاگ", contact: "تماس با ما", book: "اکنون رزرو کنید", menu: "فهرست اصلی", open: "باز کردن فهرست", close: "بستن فهرست" },
    announcement: { before: "مارچ:", strong: "شست‌وشوی رایگان پنجره", after: "با هر برنامه جدید نظافت دوره‌ای خانه", action: "اکنون رزرو کنید" },
    contact: {
      eyebrow: "تماس با ما", title: "با ما تماس بگیرید –", script: "زود پاسخ می‌دهیم.", intro: "مستقیماً برای ما بنویسید یا از فورم زیر استفاده کنید. اگر نرخ می‌خواهید، خانه را انتخاب کنید تا پیشنهاد روشن و رایگان برایتان بفرستیم.",
      emailTitle: "ایمیل بفرستید", emailDetail: "پاسخ در ۲۴ ساعت، معمولاً زودتر", emailAction: "ایمیل به ما", areaTitle: "ساحه خدمات", areaDetail: "نظافت و مراقبت باغ", areaAction: "دیدن نقشه", servicesTitle: "خدمات ما", servicesDetail: "برای خانواده‌ها و شرکت‌ها", servicesAction: "دیدن خدمات", hoursTitle: "تماس", hoursDetail: "از ایمیل یا فورم تماس استفاده کنید", hoursAction: "برای ما بنویسید",
      formTitle: "پیام بفرستید", name: "نام", phone: "تلفن", email: "ایمیل", subject: "موضوع", message: "پیام", namePlaceholder: "نام شما", phonePlaceholder: "شماره تلفن", emailPlaceholder: "name@example.com", messagePlaceholder: "در باره خانه، محل کار یا درخواست خود کوتاه بنویسید...", quote: "من نرخ رایگان می‌خواهم.", quoteText: "ما نرخ ثابت را محاسبه کرده و در ۲۴ ساعت برایتان می‌فرستیم.", submitQuote: "فرستادن درخواست نرخ", submitMessage: "فرستادن پیام", privacy: "با فرستادن، شما سیاست حریم خصوصی را می‌پذیرید.",
      successTitle: "پیام شما", successScript: "فرستاده شد!", successBody: "تشکر {name}. ما به {email} {time} پاسخ می‌دهیم.", successQuote: "با یک نرخ‌نامه کتبی در ۲۴ ساعت", successNormal: "در ۲۴ ساعت", again: "پیام دیگر بفرستید", mapTitle: "Abelia Städ & Service", mapBody: "ساحه خدمات: بوروس، اولریسهامن، آلینگسوس، سکینه و گوتنبرگ", mapLink: "باز کردن ساحه خدمات در نقشه", errorName: "لطفاً نام خود را وارد کنید.", errorEmail: "لطفاً یک ایمیل معتبر وارد کنید.", errorMessage: "لطفاً چند کلمه بنویسید.", subjects: ["پرسش خدمات", "درخواست نرخ", "برنامه دوره‌ای / شرکت", "شکایت مشتری", "سایر"],
    },
    footer: { description: "نظافت و خدمات دقیق برای خانواده‌ها و شرکت‌ها. برای دریافت نرخ روشن و رایگان به ما بنویسید.", tips: "نکته نظافت، ماهانه", subscribe: "اشتراک", thankYou: "تشکر، ثبت شدید.", services: "خدمات", links: "لینک‌ها", contact: "تماس", area: "ساحه خدمات", made: "با دقت ساخته شده", rights: "Abelia Städ & Service" },
    shared: { language: "زبان", emailPlaceholder: "ایمیل شما", freeQuote: "نرخ رایگان", booking: "اکنون رزرو کنید", privacy: "سیاست حریم خصوصی", map: "نقشه" },
  },
} as const;

type LocaleContextValue = {
  language: Language;
  copy: (typeof COPY)[Language];
  setLanguage: (language: Language) => void;
  languages: typeof LANGUAGES;
  dir: "ltr" | "rtl";
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("abelia-language") : null;
    return LANGUAGES.some((l) => l.code === saved) ? (saved as Language) : "sv";
  });
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language === "fa" ? "fa-AF" : language;
    document.documentElement.dir = current.dir;
    document.body.classList.toggle("rtl", current.dir === "rtl");
    window.localStorage.setItem("abelia-language", language);
  }, [current.dir, language]);

  const value = useMemo(() => ({ language, copy: COPY[language], setLanguage, languages: LANGUAGES, dir: current.dir }), [language, current.dir]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}