import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n";
import Reveal from "../components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconMail,
  IconPin,
  IconSparkleSmall,
  IconTag,
} from "../components/Icons";

const MAP_SRC =
  "https://www.google.com/maps?q=Bor%C3%A5s%2C%20Sweden&z=13&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Bor%C3%A5s%2C%20Sweden";

export default function Contact() {
  const { copy, language } = useLanguage();
  const c = copy.contact;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<string>(c.subjects[0]);
  const [quote, setQuote] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSubject(c.subjects[0]);
    setError("");
  }, [c.subjects, language]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError(c.errorName);
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError(c.errorEmail);
    if (message.trim().length < 5) return setError(c.errorMessage);
    setError("");
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cards = [
    { icon: IconMail, title: c.emailTitle, lines: [CONTACT.email, c.emailDetail], href: CONTACT.emailHref, cta: c.emailAction },
    { icon: IconPin, title: c.areaTitle, lines: [CONTACT.serviceArea, c.areaDetail], href: MAP_LINK, cta: c.areaAction },
    { icon: IconTag, title: c.servicesTitle, lines: [CONTACT.services.join(" · "), c.servicesDetail], href: "#/", cta: c.servicesAction },
  ];

  return (
    <div className="page-arrive relative overflow-x-clip pt-36 pb-24">
      <div className="ambient-drift pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-sky-soft blur-3xl" aria-hidden />
      <div className="ambient-drift pointer-events-none absolute top-2/3 -left-32 h-96 w-96 rounded-full bg-butter-soft blur-3xl [animation-delay:-7s]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sky-deep uppercase">{c.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-6xl">
            {c.title} <span className="font-script text-4xl text-sky-deep italic sm:text-6xl">{c.script}</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">{c.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass group flex items-center gap-4 rounded-[1.4rem] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-soft text-sky-deep transition-transform duration-500 group-hover:-rotate-6">
                    <card.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold">{card.title}</span>
                    <span className="block break-words text-[0.9rem] font-medium text-ink">{card.lines[0]}</span>
                    <span className="block text-[0.8rem] text-ink-soft">{card.lines[1]}</span>
                  </span>
                  <span className="glass-chip shrink-0 py-1.5 text-[0.78rem] transition group-hover:scale-105">{card.cta}</span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={260}>
              <div className="flex items-center gap-3 rounded-[1.4rem] bg-sage-soft px-5 py-4 text-[0.88rem] text-sage-dark">
                <IconSparkleSmall className="h-5 w-5 shrink-0" />
                <span>{c.hoursDetail}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-[2rem] p-10 text-center">
                <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-sage-deep text-cream">
                  <IconCheck className="h-10 w-10" />
                </div>
                <h2 className="mt-6 font-display text-3xl font-medium">
                  {c.successTitle} <span className="font-script text-3xl text-sage-deep italic">{c.successScript}</span>
                </h2>
                <p className="mt-3 max-w-md text-ink-soft">
                  {c.successBody.replace("{name}", name).replace("{email}", email).replace("{time}", quote ? c.successQuote : c.successNormal)}
                </p>
                <button className="glass-btn mt-8" onClick={() => { setSent(false); setName(""); setEmail(""); setPhone(""); setMessage(""); }}>
                  {c.again}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="glass rounded-[2rem] p-7 sm:p-10">
                <h2 className="font-display text-2xl font-semibold">{c.formTitle}</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">{c.name} *</span>
                    <input className="field" placeholder={c.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">{c.phone}</span>
                    <input className="field" type="tel" placeholder={c.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">{c.email} *</span>
                    <input className="field" type="email" placeholder={c.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">{c.subject}</span>
                    <select className="field" value={subject} onChange={(e) => setSubject(e.target.value)}>
                      {c.subjects.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">{c.message} *</span>
                    <textarea className="field min-h-[120px] resize-y" placeholder={c.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
                  </label>
                </div>
                <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl bg-blush-soft px-5 py-4">
                  <input type="checkbox" checked={quote} onChange={(e) => setQuote(e.target.checked)} className="h-5 w-5 accent-[#55554f]" />
                  <span className="text-[0.95rem]"><strong>{c.quote}</strong> {c.quoteText}</span>
                </label>
                {error && <p className="mt-5 rounded-2xl border border-blush-deep/30 bg-blush-soft px-5 py-3 font-medium text-blush-deep">{error}</p>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button type="submit" className="glass-btn-solid">
                    {quote ? c.submitQuote : c.submitMessage} <IconArrow className="h-4.5 w-4.5" />
                  </button>
                  <p className="text-[0.8rem] text-ink-soft"><Link to="/integritetspolicy" className="underline">{copy.shared.privacy}</Link></p>
                </div>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-soft">
            <iframe
              title={`${copy.shared.map} – ${CONTACT.serviceArea}`}
              src={MAP_SRC}
              className="pointer-events-none h-[440px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
            <div className="glass absolute bottom-5 left-5 max-w-[290px] rounded-2xl p-5">
              <p className="flex items-center gap-2 font-display text-lg font-semibold"><IconPin className="h-5 w-5 text-sage-deep" /> {c.mapTitle}</p>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{c.mapBody}</p>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-sage-dark hover:underline">
                {c.mapLink} <IconArrow className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}