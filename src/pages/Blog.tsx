import { useState } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data/blog";
import Reveal from "../components/Reveal";
import { IconArrow, IconSparkleSmall } from "../components/Icons";

export default function Blog() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blush-soft blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-lav-soft blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-blush-deep uppercase">Bloggen</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-6xl">
            Städinspiration, <span className="font-script text-4xl text-blush-deep italic sm:text-6xl">ärliga tips &amp; funderingar.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Skrivet av våra städhjärtor – utan fluff, utan jargong. Bara det vi faktiskt lär oss på fältet, hem för hem.
          </p>
        </Reveal>

        {/* Featured */}
        <Reveal delay={120} className="mt-14">
          <Link to={`/blogg/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft lg:grid-cols-2">
            <div className="overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-3 text-[0.8rem] text-ink-soft">
                <span className="glass-chip py-1 text-[0.72rem] text-sage-dark">{featured.category}</span>
                <span>{featured.date}</span>
                <span>· Lästid {featured.readTime}</span>
              </div>
              <h2 className="mt-4 font-display text-3xl leading-snug font-semibold transition-colors group-hover:text-sage-dark sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sage-dark transition-all group-hover:gap-3.5">
                Läs artikeln <IconArrow className="h-4.5 w-4.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Rest */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
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
                <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Newsletter */}
        <Reveal delay={140} className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-lav-soft px-8 py-12 sm:px-14">
            <IconSparkleSmall className="animate-twinkle absolute top-6 right-10 h-6 w-6 text-lav-deep/50" aria-hidden />
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display text-3xl font-medium">
                  Ett städtips i <span className="font-script text-3xl text-lav-deep italic">månaden.</span>
                </h2>
                <p className="mt-2 text-ink-soft">Ingen spam, ingen sälj. Bara det bästa från bloggen – en gång i månaden.</p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
        <IconSparkleSmall className="h-4 w-4 text-lav-deep" /> Tack! Du är anmäld.
      </p>
    );
  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="din@email.se"
        className="field rounded-full bg-white/80"
        aria-label="E-postadress för nyhetsbrev"
      />
      <button className="glass-btn-solid shrink-0 px-6" type="submit">
        Anmäl dig
      </button>
    </form>
  );
}
