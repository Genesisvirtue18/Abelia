import { useState } from "react";
import { Link } from "react-router-dom";
import { ACCENTS, SERVICES } from "../data/services";
import { GUARANTEE, PAYMENT_METHODS } from "../data/serviceContent";
import { POSTS } from "../data/blog";
import Reveal from "../components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconLeaf,
  IconShield,
  IconSparkle,
  IconSparkleSmall,
  IconStar,
  IconTag,
  SERVICE_ICONS,
} from "../components/Icons";
import { cn } from "../utils/cn";

const STEPS = [
  {
    n: "01",
    title: "Välj tjänst",
    text: "Hemstädning, fönsterputsning, flytt eller kontoret – börja med vad hemmet behöver.",
    accent: "sage" as const,
  },
  {
    n: "02",
    title: "Ange detaljer",
    text: "Privat eller företag, ytan i m² och eventuella tillägg. Vi räknar ut ett fast pris direkt.",
    accent: "lav" as const,
  },
  {
    n: "03",
    title: "Välj datum & tid",
    text: "Plocka ett tidfönster som passar – vi kan oftast boka in inom 48 timmar.",
    accent: "blush" as const,
  },
  {
    n: "04",
    title: "Bekräfta & slappna av",
    text: "Du får ett bekräftelsemeddelande med städlagets namn och bild. Vi städar, du godkänner.",
    accent: "butter" as const,
  },
];

const TESTIMONIALS = [
  {
    name: "Sara Lindqvist",
    area: "Borås",
    service: "Löpande hemstädning",
    text: "Tredje året med Abelia och fortfarande samma lag, samma glädje. Hemmet luktar rent och fönstren är spotfria varje gång. Det här är tjänst som håller.",
  },
  {
    name: "Johan & Petra Ek",
    area: "Ulricehamn",
    service: "Flyttningsstädning",
    text: "Vi flyttade på lördag och bokat på torsdag. Dags vid nyckel hade de lämnat en städbeskrivning med – depositionen kom tillbaka utan ett enda påhäll.",
  },
  {
    name: "Mikael Sørensen",
    area: "Kontor, Göteborg",
    service: "Kontorstädning",
    text: "Fasta tider, fast pris och faktura med dragrätt. Team märker skillnaden – toalettpapper påfyllt, bord rensat, fönsterblanka. Det bästa städföretaget vi haft.",
  },
  {
    name: "Amina Hussein",
    area: "Alingsås",
    service: "Stortstädning",
    text: "Jag trodde inte kalcen i duschen gick att få bort. Den var som ny. Två tjejer, fyra timmar, och hemmet känns som en helt ny bostad.",
  },
];

const AREAS = [
  "Borås",
  "Ulricehamn",
  "Alingsås",
  "Skene",
  "Göteborg",
];

const FAQS = [
  {
    q: "Hur snabbt kan jag boka in en städning?",
    a: "De flesta bokningar sker inom 48 timmar, och i högsäsong (juls och flyttdagar) försöker vi lösa det även samman dag. Använd bokningen i fyra steg – du får bekräftelse inom två timmar på vardagar.",
  },
  {
    q: "Måste jag vara hemma när ni städar?",
    a: "Nej. De flesta av våra kunder använder färdigkod eller nyckellåda. Du får alltid städlagets namn och bild innan besöket, och vi är fullt försäkrade. Vill du vara hemma fungerar det också utmärkt.",
  },
  {
    q: "Vad kostar en hemstädning?",
    a: "Priset är 312,25 kr per timme eller 45 kr per m² med RUT. Utan RUT är priserna exakt dubbla: 624,50 kr per timme eller 90 kr per m². Du väljer prismodell och ser en uppskattning direkt i formuläret.",
  },
  {
    q: "Använder ni miljömärkta städmedel?",
    a: "Ja, vi städar standardmässigt med certifierade miljömärkta produkter. Vill du ha egna medel, en specifik doft eller allergivenliga alternativ – säg till vid bokningen.",
  },
  {
    q: "Finns det någon garanti?",
    a: "Ja, vi ger 7 dagars garanti. Upptäcker du något inom 7 dagar som inte stämmer med avtalet, kommer vi tillbaka och åtgärdar anmärkningen helt utan kostnad – oftast inom 48 timmar.",
  },
  {
    q: "Tillbyder ni faktura med dragrätt för företag?",
    a: "Absolut. Alla företagskunder får faktura med dragrätt, fast pris per tillfälle och löpande avtal utan bindningstid – uppsägning med 30 dagar.",
  },
];

function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-butter-deep" aria-label={`${n} av 5 stjärnor`}>
      {Array.from({ length: n }).map((_, i) => (
        <IconStar key={i} className={className} />
      ))}
    </span>
  );
}

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-20 -left-32 h-[34rem] w-[34rem] rounded-full bg-sage-soft blur-3xl" />
          <div className="absolute top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-blush-soft blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-lav-soft blur-3xl" />
          <IconSparkle className="animate-twinkle absolute top-36 left-[12%] h-6 w-6 text-sage" />
          <IconSparkleSmall className="animate-twinkle absolute top-56 left-[46%] h-4 w-4 text-blush-deep/50 [animation-delay:0.8s]" />
          <IconSparkle className="animate-twinkle absolute right-[8%] bottom-24 h-5 w-5 text-lav-deep/40 [animation-delay:1.6s]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="glass-chip text-sage-dark">
                <IconLeaf className="h-4 w-4" />
                Städ &amp; service i Borås med omnejd sedan 2025
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[2.7rem] leading-[1.05] font-medium text-ink sm:text-6xl lg:text-[4.2rem]">
                Första klassens städning,
                <span className="mt-2 block font-script text-sage-deep italic">med lite extra omsorg.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Fasta priser med RUT-avdrag, försäkrade städare och 7 dagars garanti. Boka hem-, kontors- eller
                flyttningsstädning i fyra enkla steg – vi städar, du får tiden tillbaka.
              </p>
            </Reveal>
            <Reveal delay={260} className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/bokning" className="glass-btn-solid text-base">
                Boka din städning <IconArrow className="h-4.5 w-4.5" />
              </Link>
              <Link to="/offert" className="glass-btn text-base">
                <IconTag className="h-4.5 w-4.5" /> Räkna ut ditt pris
              </Link>
            </Reveal>
            <Reveal delay={340} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <Stars />
                <p className="mt-1 text-sm text-ink-soft">
                  <strong className="text-ink">4,9 / 5</strong> · 1 240 omdömen på Google
                </p>
              </div>
              <div className="h-10 w-px bg-ink/10" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold text-ink">12 000+</p>
                <p className="text-sm text-ink-soft">genomförda städningar</p>
              </div>
              <div className="h-10 w-px bg-ink/10" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold text-ink">100 %</p>
                <p className="text-sm text-ink-soft">F-skatt &amp; försäkrade</p>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <Reveal delay={200} className="relative">
              <div className="relative overflow-hidden rounded-[2.2rem] shadow-soft">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7513163/pexels-photo-7513163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                    alt="Städare som mappar golv i en ljus, skandinavisk bostad"
                    className="animate-kenburns h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" aria-hidden />
              </div>

              <div className="animate-float glass absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-deep text-cream">
                  <IconCheck className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.72rem] font-medium tracking-wide text-ink-soft uppercase">Nästa lediga tid</p>
                  <p className="font-display text-lg font-semibold text-ink">Idag · kl 15:00</p>
                </div>
              </div>

              <div className="animate-float-slow glass absolute -top-5 right-4 hidden items-center gap-2 rounded-2xl px-4 py-2.5 sm:flex">
                <IconShield className="h-5 w-5 text-sage-deep" />
                <p className="text-[0.85rem] font-semibold text-ink">F-skatt &amp; försäkrade</p>
              </div>

              <div className="absolute -right-3 bottom-24 hidden -rotate-6 lg:block">
                <div className="w-44 rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-soft transition-transform duration-500 hover:rotate-0">
                  <img
                    src="https://images.pexels.com/photos/9565787/pexels-photo-9565787.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                    alt="Ljust skandinaviskt vardagsrum efter städning"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="border-y border-sage/25 bg-sage-soft/70 py-3.5" aria-hidden>
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap">
                <span className="text-[0.95rem] font-semibold tracking-[0.18em] text-sage-dark uppercase">{s.name}</span>
                <IconSparkleSmall className="h-3.5 w-3.5 text-sage-deep/60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ============ SERVICES ============ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-xl">
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Våra tjänster</p>
            <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
              Allt hemmet behöver – <span className="font-script text-2xl text-blush-deep italic sm:text-3xl">under ett tak.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/kontakt" className="group inline-flex items-center gap-2 font-semibold text-sage-dark">
              Behöver du något annat? Kontakta oss
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            const a = ACCENTS[s.accent];
            return (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <Link
                  to={`/tjanster/${s.slug}`}
                  className={cn(
                    "group relative block h-full overflow-hidden rounded-[1.8rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft",
                    a.soft,
                    "border border-white/60"
                  )}
                >
                  <div className={cn("pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-100", a.solid)} aria-hidden />
                  <span className={cn("glass relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110", a.deep)}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-6 font-display text-2xl font-semibold">{s.name}</h3>
                  <p className="relative mt-2 min-h-[3.2rem] text-[0.95rem] leading-relaxed text-ink-soft">{s.short}</p>
                  <div className="relative mt-6 flex items-center justify-between">
                      <p className={cn("text-sm font-bold", a.deep)}>
                      Pris enligt offert · RUT
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink transition-all group-hover:gap-2.5 group-hover:text-sage-dark">
                      Läs mer <IconArrow className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ 4 STEPS ============ */}
      <section className="relative overflow-hidden bg-cream-deep/60 py-24">
        <div className="pointer-events-none absolute top-10 right-10 opacity-40" aria-hidden>
          <IconSparkle className="animate-twinkle h-8 w-8 text-blush-deep/50" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Boka på 4 steg</p>
            <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
              Bokningen tar två minuter. <span className="font-script text-2xl text-lav-deep italic sm:text-3xl">Vi tar på oss resten.</span>
            </h2>
            <p className="mt-4 text-ink-soft">
              Inga telefonköer, inga oklara priser. Du styr själv hela vägen – och ser ditt fast pris innan du bekräftar.
            </p>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute top-10 right-[12%] left-[12%] hidden border-t-2 border-dashed border-sage/50 lg:block" aria-hidden />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((st, i) => {
                const a = ACCENTS[st.accent];
                return (
                  <Reveal key={st.n} delay={i * 120} className="relative text-center lg:text-left">
                    <div
                      className={cn(
                        "relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/70 shadow-card transition-transform duration-500 hover:scale-110 lg:mx-0",
                        a.solid
                      )}
                    >
                      <span className="font-display text-3xl font-semibold text-ink/80">{st.n}</span>
                      <span className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream">
                        <IconSparkleSmall className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{st.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{st.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={200} className="mt-14 text-center">
            <Link to="/bokning" className="glass-btn-solid text-base">
              Starta en bokning – 4 enkla steg <IconArrow className="h-4.5 w-4.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY ABELIA ============ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2.2rem] shadow-soft">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/36777855/pexels-photo-36777855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                  alt="Ljust, rent hem med natur ljus"
                  className="animate-kenburns h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="glass absolute -right-3 -bottom-8 w-48 rounded-2xl px-5 py-4 sm:-right-8">
              <p className="font-display text-4xl font-semibold text-sage-dark">5 orter</p>
              <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">från Borås till Göteborg</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-blush-deep uppercase">Varför Abelia</p>
              <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
                Ett städföretag du faktiskt <span className="font-script text-3xl text-sage-deep italic sm:text-4xl">kan lita på.</span>
              </h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {[
                { t: "Fast pris innan vi börjar", d: "Du ser exakt vad du betalar innan du bekräftar. Material och resan ingår alltid." },
                { t: "Försäkrade, utbildade anställda", d: "Inga 'uppdragstagare'. Alla våra städare är anställda hos Abelia med F-skatt och full försäkring." },
                { t: "7 dagars garanti", d: "Anmärkningar inom 7 dagar åtgärdas kostnadsfritt – vi kommer tillbaka, oftast inom 48 timmar." },
                { t: "Miljömärkta städmedel som standard", d: "Certifierade produkter som skapar en frisk doft – utan att slita på ytor eller luft." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 90} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-cream">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.t}</p>
                    <p className="mt-0.5 text-[0.95rem] text-ink-soft">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
             <Reveal delay={300} className="mt-9 grid grid-cols-3 gap-4">
              {[
                ["Sedan 2025", "lokalt företag"],
                ["Personligt", "samma kontakt"],
                ["Inom 2 h", "snabb bekräftelse"],
              ].map(([n, l]) => (
                <div key={l} className="glass rounded-2xl px-4 py-3 text-center">
                  <p className="font-display text-2xl font-semibold text-ink">{n}</p>
                  <p className="text-[0.78rem] text-ink-soft">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ QUOTE BAND ============ */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blush-soft via-cream to-sage-soft" aria-hidden />
        <IconSparkle className="animate-twinkle pointer-events-none absolute top-12 left-[10%] h-6 w-6 text-blush-deep/40" aria-hidden />
        <IconSparkle className="animate-twinkle pointer-events-none absolute right-[12%] bottom-12 h-5 w-5 text-sage/70 [animation-delay:1.2s]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="glass rounded-[2rem] px-8 py-10 sm:px-14">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="max-w-lg">
                  <h2 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
                    Få din skräddarsydda offert på <span className="font-script text-4xl text-blush-deep italic">två minuter.</span>
                  </h2>
                  <ul className="mt-5 space-y-2 text-[0.95rem] text-ink-soft">
                    {[
                      "Privat eller företag – båda välkomna",
                      "Ange ytan i m² så räknar vi ut priset",
                      "Välj tjänster – eller kombinera flera",
                    ].map((li) => (
                      <li key={li} className="flex items-center gap-2.5">
                        <IconSparkleSmall className="h-3.5 w-3.5 text-sage-deep" /> {li}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Link to="/offert" className="glass-btn-solid">
                    Skapa din offert <IconArrow className="h-4.5 w-4.5" />
                  </Link>
                  <p className="text-sm text-ink-soft">Gratis &amp; obindande</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-lav-deep uppercase">Från våra kunder</p>
          <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
            Hem och kontor som städats <span className="font-script text-3xl text-lav-deep italic sm:text-4xl">med oss.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 110}>
              <figure className="glass flex h-full flex-col rounded-[1.8rem] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-ink-soft">{t.area}</p>
                  </div>
                  <span className="glass-chip py-1 text-[0.75rem] text-sage-dark">{t.service}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ AREAS ============ */}
      <section className="bg-sky-soft/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sky-deep uppercase">Hos oss där ni bor</p>
              <h2 className="mt-3 font-display text-4xl leading-tight font-medium">
                Borås till Göteborg – <span className="font-script text-3xl text-sky-deep italic">vi finns nära dig.</span>
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">
                Våra städlag bor nära dig, vilket betyder kortare resvägar, snabbare tider och lägre kostnader. Saker du
                bor utanför listan? Vi åker ofta längre.
              </p>
            </Reveal>
            <Reveal delay={140} className="flex flex-wrap gap-2.5">
              {AREAS.map((a) => (
                <span
                  key={a}
                  className="glass-chip cursor-default bg-white/70 transition-all duration-300 hover:scale-105 hover:bg-white"
                >
                  {a}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <Reveal className="text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Vanliga frågor</p>
          <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
            Gilla? <span className="font-script text-3xl text-sage-deep italic sm:text-4xl">Säg bara till.</span>
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div className={cn("glass overflow-hidden rounded-2xl transition-all", faqOpen === i && "bg-white/80")}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-display text-lg font-medium">{f.q}</span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-dark transition-transform duration-300",
                      faqOpen === i && "rotate-45"
                    )}
                  >
                    +
                  </span>
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
      </section>

      {/* ============ BLOG PREVIEW ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-blush-deep uppercase">Från bloggen</p>
            <h2 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
              Städinspiration <span className="font-script text-3xl text-blush-deep italic sm:text-4xl">&amp; smarta tips.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/blogg" className="group inline-flex items-center gap-2 font-semibold text-sage-dark">
              Alla artiklar <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link to={`/blogg/${p.slug}`} className="group block h-full">
                <div className="overflow-hidden rounded-[1.6rem]">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[0.78rem] text-ink-soft">
                  <span className="glass-chip py-1 text-[0.72rem] text-sage-dark">{p.category}</span>
                  <span>{p.date}</span>
                  <span>· {p.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug font-semibold transition-colors group-hover:text-sage-dark">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[0.95rem] text-ink-soft">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PAYMENTS & GUARANTEE ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-[2rem] p-8 sm:p-10">
              <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Betala enkelt &amp; tryggt</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-medium sm:text-4xl">
                Swish, Klarna, kort eller <span className="font-script text-3xl text-sage-deep italic sm:text-4xl">faktura.</span>
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {PAYMENT_METHODS.map((m) => (
                  <span key={m.name} title={m.note} className="glass-chip bg-white/70 font-semibold">
                    {m.name}
                    <span className="text-[0.72rem] font-normal text-ink-soft">{m.note}</span>
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">
                Privatpersoner ser priset <strong className="text-ink">med RUT direkt</strong> i offerten. Utan RUT är
                priset exakt det dubbla. Företag betalar enkelt med faktura – eller kort och Swish.
              </p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="flex h-full flex-col justify-center rounded-[2rem] bg-sage-dark p-8 text-cream sm:p-10">
              <IconShield className="h-11 w-11 text-butter" />
              <h2 className="mt-5 font-display text-3xl leading-tight font-medium">{GUARANTEE.title}</h2>
              <p className="mt-3 leading-relaxed text-cream/75">{GUARANTEE.body}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/offert" className="glass-btn border-white/30 bg-white/15 text-cream hover:bg-white/25">
                  Räkna ut ditt pris <IconArrow className="h-4.5 w-4.5" />
                </Link>
                <Link to="/integritetspolicy" className="glass-btn border-white/25 bg-transparent text-cream hover:bg-white/10">
                  Villkor &amp; integritet
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-sage-dark py-24 text-cream">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-sage/20 blur-3xl" aria-hidden />
        <IconSparkle className="animate-twinkle pointer-events-none absolute top-10 right-[15%] h-7 w-7 text-butter/60" aria-hidden />
        <IconSparkle className="animate-twinkle pointer-events-none absolute bottom-10 left-[10%] h-5 w-5 text-blush/50 [animation-delay:1.4s]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-script text-5xl text-butter sm:text-6xl">Slappna av.</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-medium sm:text-4xl">
              Hemmet fixar vi. Du hinner med det som faktiskt betyder något.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link to="/bokning" className="glass-btn border-white/40 bg-white/15 text-cream hover:bg-white/25">
                Boka din tid <IconArrow className="h-4.5 w-4.5" />
              </Link>
              <Link to="/kontakt" className="glass-btn border-white/25 bg-transparent text-cream hover:bg-white/10">
                Kontakta oss
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
