import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ACCENTS, SERVICES, serviceBySlug } from "../data/services";
import { GUARANTEE, PAYMENT_METHODS, SERVICE_EXTRA } from "../data/serviceContent";
import Reveal from "../components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconShield,
  IconSparkleSmall,
  IconTag,
  SERVICE_ICONS,
} from "../components/Icons";
import { cn } from "../utils/cn";

export default function ServicePage() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  if (!service) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-32 text-center">
        <p className="font-display text-6xl font-medium">Hm…</p>
        <p className="mt-4 max-w-md text-ink-soft">Den här tjänsten finns inte (längre). Men vi har sex andra som vi är stolta av.</p>
        <Link to="/" className="glass-btn mt-8">Till startsidan</Link>
      </div>
    );
  }

  const a = ACCENTS[service.accent];
  const Icon = SERVICE_ICONS[service.icon];
  const extra = SERVICE_EXTRA[service.slug];
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="relative overflow-hidden pt-32 pb-24">
      <div className={cn("pointer-events-none absolute inset-0 -z-10", a.soft, "opacity-60")} aria-hidden>
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cream/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="flex items-center gap-2 text-[0.82rem] text-ink-soft" aria-label="Brödsmulor">
            <Link to="/" className="transition hover:text-ink">Hem</Link>
            <span aria-hidden>/</span>
            <Link to="/#tjanster" className="transition hover:text-ink">Tjänster</Link>
            <span aria-hidden>/</span>
            <span className="font-semibold text-ink">{service.name}</span>
          </nav>
        </Reveal>

        {/* Hero */}
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className={cn("glass-chip", a.deep)}>
                <Icon className="h-4.5 w-4.5" />
                {service.duration}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl lg:text-[3.4rem]">
                {service.name}
                <span className={cn("mt-2 block font-script text-4xl italic sm:text-5xl", a.deep)}>{service.tagline.split("–")[0]}</span>
              </h1>
            </Reveal>
            <Reveal delay={170}>
              <div className="mt-6 space-y-4">
                {service.intro.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[1.02rem] leading-relaxed text-ink-soft">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="glass mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-6 py-4">
                <p>
                  <span className="font-display text-xl font-semibold text-ink">Pris enligt offert – med RUT-avdrag</span>
                </p>
                <p className="max-w-[16rem] text-[0.85rem] text-ink-soft">
                  Vi räknar fram en tydlig uppskattning enligt vald tim- eller kvadratmeterprissättning. Privatpersoner ser priset med RUT direkt i offerten.
                </p>
                <IconShield className="ml-auto h-8 w-8 text-sage-deep" />
              </div>
            </Reveal>
            <Reveal delay={300} className="mt-8 flex flex-wrap gap-4">
              <Link to={`/bokning?service=${service.slug}`} className="glass-btn-solid">
                Boka {service.name.toLowerCase()} <IconArrow className="h-4.5 w-4.5" />
              </Link>
              <Link to={`/offert?service=${service.slug}`} className="glass-btn">
                <IconTag className="h-4.5 w-4.5" /> Räkna ut ditt pris
              </Link>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-[2.2rem] shadow-soft">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={service.img} alt={service.name} className="animate-kenburns h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="glass absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl px-5 py-3.5">
              <IconClock className="h-6 w-6 text-sage-deep" />
              <div className="leading-tight">
                <p className="text-[0.72rem] font-medium tracking-wide text-ink-soft uppercase">Bokas inom</p>
                <p className="font-display text-lg font-semibold text-ink">oftast 48 timmar</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Includes + good for */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-medium">
              Vad ingår i <span className={cn("font-script text-3xl italic", a.deep)}>{service.name.toLowerCase()}?</span>
            </h2>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {service.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/55 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-card">
                  <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-cream", a.deep === "text-butter-deep" ? "bg-butter-deep" : a.deep === "text-blush-deep" ? "bg-blush-deep" : a.deep === "text-lav-deep" ? "bg-lav-deep" : a.deep === "text-sky-deep" ? "bg-sky-deep" : "bg-sage-deep")}>
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.95rem] font-medium">{inc}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className={cn("h-full rounded-[2rem] p-8", a.soft, "border border-white/60")}>
              <h3 className="font-display text-2xl font-semibold">Perfekt för</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {service.goodFor.map((g) => (
                  <span key={g} className="glass-chip bg-white/75">{g}</span>
                ))}
              </div>
              <h3 className="mt-9 font-display text-2xl font-semibold">Så går det till</h3>
              <ol className="mt-5 space-y-4">
                {service.process.map((p, i) => (
                  <li key={p} className="flex gap-3.5">
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-cream", a.deep === "text-butter-deep" ? "bg-butter-deep" : a.deep === "text-blush-deep" ? "bg-blush-deep" : a.deep === "text-lav-deep" ? "bg-lav-deep" : a.deep === "text-sky-deep" ? "bg-sky-deep" : "bg-sage-deep")}>
                      {i + 1}
                    </span>
                    <span className="pt-1 text-[0.95rem] leading-snug">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Editorial content */}
        <div className="mt-24 grid gap-10 lg:grid-cols-3">
          {extra.sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <article className="h-full rounded-[1.8rem] border border-white/60 bg-white/55 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                <p className={cn("font-display text-3xl font-semibold", a.deep)}>0{i + 1}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Checklist + not included */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className={cn("h-full rounded-[1.8rem] p-8", a.soft, "border border-white/60")}>
              <h2 className="font-display text-2xl font-semibold">Det här gör vi – varje gång</h2>
              <ul className="mt-5 space-y-3">
                {extra.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-cream", a.deep === "text-butter-deep" ? "bg-butter-deep" : a.deep === "text-blush-deep" ? "bg-blush-deep" : a.deep === "text-lav-deep" ? "bg-lav-deep" : a.deep === "text-sky-deep" ? "bg-sky-deep" : "bg-sage-deep")}>
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-[1.8rem] border border-white/60 bg-white/55 p-8">
              <h2 className="font-display text-2xl font-semibold">Det här ingår inte</h2>
              <p className="mt-2 text-[0.92rem] text-ink-soft">Så att du vet exakt vad som ingår – och vad som kan bokas separat.</p>
              <ul className="mt-5 space-y-3">
                {extra.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={cn("mt-6 rounded-2xl px-5 py-4", a.soft)}>
                <p className="flex items-start gap-2.5 text-[0.92rem] leading-relaxed">
                  <IconSparkleSmall className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", a.deep)} />
                  <span><strong className="text-ink">Tips:</strong> {extra.tip}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Guarantee + payments */}
        <Reveal delay={100} className="mt-16">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex items-start gap-5 rounded-[1.8rem] bg-sage-dark px-8 py-8 text-cream">
              <IconShield className="h-11 w-11 shrink-0 text-butter" />
              <div>
                <h2 className="font-display text-2xl font-semibold">{GUARANTEE.title}</h2>
                <p className="mt-2 leading-relaxed text-cream/75">{GUARANTEE.body}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.85rem] font-semibold">
                  <IconSparkleSmall className="h-4 w-4 text-butter" /> {extra.promise}
                </p>
              </div>
            </div>
            <div className="glass rounded-[1.8rem] p-8">
              <p className="text-[0.78rem] font-semibold tracking-[0.25em] text-ink-soft uppercase">Betala enkelt</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {PAYMENT_METHODS.map((m) => (
                  <span key={m.name} title={m.note} className="glass-chip bg-white/70 font-semibold">{m.name}</span>
                ))}
              </div>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
                Betala med Swish, Klarna, American Express, kort eller faktura. Företag får faktura med dragrätt.
              </p>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <Reveal className="text-center">
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-ink-soft uppercase">Vanliga frågor</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Bra att veta innan du bokar</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {service.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <div className={cn("glass overflow-hidden rounded-2xl transition-all", faqOpen === i && "bg-white/80")}>
                  <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                    <span className="font-display text-lg font-medium">{f.q}</span>
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-dark transition-transform duration-300", faqOpen === i && "rotate-45")}>+</span>
                  </button>
                  <div className={cn("grid transition-all duration-500", faqOpen === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="min-h-0">
                      <p className="px-6 pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-24">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium">
              Kanske också intressant: <span className={cn("font-script text-3xl italic", a.deep)}>andra tjänster.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((s, i) => {
              const RIcon = SERVICE_ICONS[s.icon];
              const ra = ACCENTS[s.accent];
              return (
                <Reveal key={s.slug} delay={i * 90}>
                  <Link to={`/tjanster/${s.slug}`} className={cn("group block h-full rounded-[1.6rem] border border-white/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft", ra.soft)}>
                    <span className={cn("glass flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:-rotate-6", ra.deep)}>
                      <RIcon className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold">{s.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[0.88rem] text-ink-soft">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-ink transition-all group-hover:gap-2.5 group-hover:text-sage-dark">
                      Läs mer <IconArrow className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={120} className="mt-24">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-sage-dark px-8 py-14 text-center text-cream sm:px-16">
            <div className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-sage/20 blur-3xl" aria-hidden />
            <IconSparkleSmall className="animate-twinkle pointer-events-none absolute top-8 left-[12%] h-5 w-5 text-butter/70" aria-hidden />
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Redo för {service.name.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/75">
              Bokningen tar två minuter och går på fyra enkla steg. Fast pris med RUT-avdrag, försäkrade städare och 7 dagars garanti – alltid.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to={`/bokning?service=${service.slug}`} className="glass-btn border-white/35 bg-white/15 text-cream hover:bg-white/25">
                Boka {service.name.toLowerCase()} <IconArrow className="h-4.5 w-4.5" />
              </Link>
              <Link to="/kontakt" className="glass-btn border-white/25 bg-transparent text-cream hover:bg-white/10">
                Ställ en fråga först
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
