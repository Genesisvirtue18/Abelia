import { Link, useParams } from "react-router-dom";
import { POSTS, postBySlug } from "../data/blog";
import Reveal from "../components/Reveal";
import { IconArrow, IconCheck, IconSparkleSmall } from "../components/Icons";

export default function BlogPost() {
  const { slug } = useParams();
  const post = postBySlug(slug);

  if (!post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-32 text-center">
        <p className="font-display text-6xl font-medium">Hm…</p>
        <p className="mt-4 max-w-md text-ink-soft">Artikeln verkar ha dammats av. Kika istället i vår övriga läsning.</p>
        <Link to="/blogg" className="glass-btn mt-8">Till bloggen</Link>
      </div>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-sage-soft blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <nav className="flex items-center gap-2 text-[0.82rem] text-ink-soft" aria-label="Brödsmulor">
            <Link to="/" className="transition hover:text-ink">Hem</Link>
            <span aria-hidden>/</span>
            <Link to="/blogg" className="transition hover:text-ink">Blogg</Link>
            <span aria-hidden>/</span>
            <span className="max-w-[16rem] truncate font-semibold text-ink">{post.title}</span>
          </nav>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-[0.82rem] text-ink-soft">
            <span className="glass-chip py-1 text-[0.72rem] text-sage-dark">{post.category}</span>
            <span>{post.date}</span>
            <span>· Lästid {post.readTime}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink-soft italic">{post.excerpt}</p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={post.img} alt={post.title} className="animate-kenburns h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>

        <article className="mt-12 space-y-6">
          {post.content.map((b, i) => {
            if (b.type === "h2")
              return (
                <Reveal key={i} delay={40}>
                  <h2 className="pt-4 font-display text-3xl font-semibold">{b.text}</h2>
                </Reveal>
              );
            if (b.type === "ul")
              return (
                <Reveal key={i} delay={40}>
                  <ul className="space-y-3 rounded-[1.4rem] bg-sage-soft/70 p-6">
                    {b.items.map((li) => (
                      <li key={li} className="flex items-start gap-3 text-[1rem] leading-relaxed">
                        <span className="mt-1 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-sage-deep text-cream">
                          <IconCheck className="h-3 w-3" />
                        </span>
                        {li}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <Reveal key={i} delay={40}>
                <p className="text-[1.05rem] leading-[1.85] text-ink/85">{b.text}</p>
              </Reveal>
            );
          })}
        </article>

        {/* Author */}
        <Reveal delay={80} className="mt-14">
          <div className="glass flex flex-wrap items-center gap-5 rounded-[1.6rem] p-7">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lav font-display text-xl font-semibold text-ink/70">
              {post.author.split(" ").map((w) => w[0]).join("")}
            </span>
            <div className="flex-1">
              <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-ink-soft uppercase">Skriven av</p>
              <p className="font-display text-xl font-semibold">{post.author}</p>
              <p className="text-[0.9rem] text-ink-soft">{post.role} hos Abelia</p>
            </div>
            <Link to="/om-oss" className="glass-chip py-2 text-sage-dark transition hover:scale-105">
              Läs mer om oss
            </Link>
          </div>
        </Reveal>

        {/* Related */}
        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-3xl font-medium">
              Läs mer <span className="font-script text-3xl text-blush-deep italic">här.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link to={`/blogg/${p.slug}`} className="group block h-full">
                  <div className="overflow-hidden rounded-[1.6rem]">
                    <img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-snug font-semibold transition-colors group-hover:text-sage-dark">{p.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] text-ink-soft">{p.date} · {p.readTime}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={100} className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-sage-dark px-8 py-10 text-center text-cream">
            <IconSparkleSmall className="animate-twinkle absolute top-6 right-10 h-5 w-5 text-butter/70" aria-hidden />
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Klar att slippa städa själv?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-cream/75">Boka på fyra steg – eller skicka en offertförfrågan så återkommer vi inom 24 timmar.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/bokning" className="glass-btn border-white/35 bg-white/15 text-cream hover:bg-white/25">
                Boka en städning <IconArrow className="h-4 w-4" />
              </Link>
              <Link to="/offert" className="glass-btn border-white/25 bg-transparent text-cream hover:bg-white/10">
                Få offert
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
