import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { BroomMark } from "../components/Logo";
import {
  IconArrow,
  IconLeaf,
  IconShield,
  IconSparkle,
  IconStar,
  IconTag,
} from "../components/Icons";

const VALUES = [
  {
    icon: IconSparkle,
    title: "Omsorg i detaljerna",
    text: "Vi städar inte 'ganska rent'. Vi städar till den sista listfogen, den sista karmen och den sista hörnan – med checklista och slutkontroll.",
    soft: "bg-sage-soft",
    deep: "text-sage-deep",
    solid: "bg-sage-deep",
  },
  {
    icon: IconTag,
    title: "Tydliga, fasta priser",
    text: "Du vet vad du betalar innan vi börjar. Material och resan ingår, priset kan aldrig öka i efterhand. Enkelt och ärligt.",
    soft: "bg-butter-soft",
    deep: "text-butter-deep",
    solid: "bg-butter-deep",
  },
  {
    icon: IconLeaf,
    title: "Hållbart i praktiken",
    text: "Miljömärkta medel, elektriska tjänstebilar och korta resvägar. God städning ska inte gå ut över luften vi andas.",
    soft: "bg-sky-soft",
    deep: "text-sky-deep",
    solid: "bg-sky-deep",
  },
  {
    icon: IconShield,
    title: "Trygghet först",
    text: "Alla våra städare är anställda, utbildade och försäkrade. Du får alltid veta exakt vem som kommer – med namn och bild i förväg.",
    soft: "bg-blush-soft",
    deep: "text-blush-deep",
    solid: "bg-blush-deep",
  },
];

const TEAM = [
  { name: "Elin Aro", role: "VD & grundare", init: "EA", color: "bg-sage" },
  { name: "Maja Lindgren", role: "Huvudstäderska", init: "ML", color: "bg-blush" },
  { name: "Oskar Bergström", role: "Företagsansvarig", init: "OB", color: "bg-lav" },
  { name: "Yasmin Kaya", role: "Kundansvarig", init: "YK", color: "bg-butter" },
];

const MILESTONES = [
  { year: "2025", text: "Elin startar Abelia med en mopp, en bil och engagerade vänner i Borås." },
  { year: "2026", text: "Expansion till Ulricehamn, Alingsås, Skene och Göteborg med fasta, försäkrade städlag." },
];

export default function About() {
  return (
    <div className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-32 h-96 w-96 rounded-full bg-blush-soft blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sage-soft blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Om Abelia</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-6xl">
            Vi tror att städning är <span className="font-script text-4xl text-sage-deep italic sm:text-6xl">en form av respekt</span> – för hemmet, för tiden, för dig.
          </h1>
        </Reveal>

        {/* Story */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2.2rem] shadow-soft">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src="https://images.pexels.com/photos/8055206/pexels-photo-8055206.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                  alt="Manliga och kvinnliga städare i matchande uniformer"
                  className="animate-kenburns h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-6 text-cream">
                  <div className="flex items-center gap-3">
                    <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-cream bg-sage-deep">
                      <BroomMark className="h-6 w-6" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[0.72rem] font-bold uppercase tracking-wider text-cream/75">Abelia Arbetsuniform</p>
                      <p className="text-[0.88rem] font-semibold">Våra städare bär alltid profilkläder med broderad Abelia-logo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl px-5 py-3.5 sm:-right-6">
              <BroomMark className="h-9 w-9 text-sage-deep" />
              <div className="leading-tight">
                <p className="font-display text-lg font-semibold text-ink">Sedan 2025</p>
                <p className="text-[0.78rem] text-ink-soft">Borås med omnejd, gata för gata</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-snug font-medium sm:text-4xl">
                Startade i Borås. <span className="font-script text-3xl text-blush-deep italic">Här för dig.</span>
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
              <Reveal delay={80}>
                <p>
                  Abelia föddes 2025 ur en enkel frustration: städföretag med otydliga priser, krångliga avtal och
                  städare som aldrig blev desamma. Elin Aro startade bolaget med engagerade vänner, en bil och en
                  övertygelse – att man kan erbjuda städning med både högsta precision och genuint medmänskligt bemötande.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p>
                  Idag arbetar vi i Borås, Ulricehamn, Alingsås, Skene och Göteborg och har städat allt från
                  lägenheter och villor till kontor och verksamhetslokaler. Men grejen är densamma som första
                  dagen: fast pris innan vi börjar, samma lag varje gång och en garanti som faktisk gäller.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Varje städlag vet vem de städar för. Och varje kund vet exakt vem som kommer. Det lilla i sig
                  – men det är precis så man bygger ett företag man kan lita på.
                </p>
              </Reveal>
            </div>
            <Reveal delay={260} className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["5 orter", "serviceområde"],
                ["7 dagar", "kostnadsfri åtgärd"],
                ["24 h", "offertsvar"],
              ].map(([n, l]) => (
                <div key={l} className="glass rounded-2xl px-4 py-4 text-center">
                  <p className="font-display text-2xl font-semibold text-ink">{n}</p>
                  <p className="mt-0.5 text-[0.78rem] text-ink-soft">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <Reveal className="text-center">
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-lav-deep uppercase">Vägen hit</p>
            <h2 className="mt-3 font-display text-4xl font-medium">
              Vår <span className="font-script text-4xl text-lav-deep italic">berättelse.</span>
            </h2>
          </Reveal>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-lav sm:left-1/2" aria-hidden />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={i * 80} className={`relative flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:flex-row-reverse sm:pr-10 sm:text-right"}`}>
                  <span className={`absolute top-1 left-5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-lav-deep shadow sm:left-auto ${i % 2 ? "sm:-left-2" : "sm:-right-2 sm:left-auto"}`} aria-hidden />
                  <div className="glass ml-10 rounded-2xl px-6 py-4 sm:ml-0">
                    <p className="font-display text-2xl font-semibold text-lav-deep">{m.year}</p>
                    <p className="mt-1 text-[0.95rem] text-ink-soft">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-blush-deep uppercase">Våra värden</p>
            <h2 className="mt-3 font-display text-4xl font-medium">
              Fyra saker vi inte <span className="font-script text-4xl text-blush-deep italic">compromissar på.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 110}>
                <div className={`h-full rounded-[1.8rem] border border-white/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft ${v.soft}`}>
                  <span className={`flex h-13 w-13 items-center justify-center rounded-2xl text-cream ${v.solid}`}>
                    <v.icon className="h-6.5 w-6.5" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sky-deep uppercase">Människorna</p>
              <h2 className="mt-3 font-display text-4xl font-medium">
                Mött <span className="font-script text-4xl text-sky-deep italic">hjärnan bakom.</span>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              Bakom varje städlag finns en kundansvarig. Fråga oss om – du pratar med en människa, inte en chatbot.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="glass group rounded-[1.8rem] p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                  <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${t.color} font-display text-2xl font-semibold text-ink/70 transition-transform duration-500 group-hover:scale-110`}>
                    {t.init}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{t.name}</h3>
                  <p className="mt-0.5 text-[0.88rem] text-ink-soft">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={100} className="mt-28">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-sage-dark px-8 py-14 text-center text-cream sm:px-16">
            <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-sage/20 blur-3xl" aria-hidden />
            <IconSparkle className="animate-twinkle pointer-events-none absolute top-8 right-[12%] h-6 w-6 text-butter/70" aria-hidden />
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <span className="flex gap-1 text-butter">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-5 w-5" />
                ))}
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
                Bäst att höra på <span className="font-script text-4xl text-butter italic">resultatet.</span>
              </h2>
              <p className="mt-3 text-cream/75">Boka en städning och låt hemmet göra resten av argumentet.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/bokning" className="glass-btn border-white/35 bg-white/15 text-cream hover:bg-white/25">
                  Boka din tid <IconArrow className="h-4.5 w-4.5" />
                </Link>
                <Link to="/kontakt" className="glass-btn border-white/25 bg-transparent text-cream hover:bg-white/10">
                  Ring oss istället
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
