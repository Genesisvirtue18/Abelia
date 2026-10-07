import { useState } from "react";
import { Link } from "react-router-dom";
import { BroomMark } from "./Logo";
import { SERVICES } from "../data/services";
import { CONTACT } from "../data/contact";
import { PAYMENT_METHODS } from "../data/serviceContent";
import { useLanguage } from "../i18n";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPin,
  IconSparkleSmall,
  IconTikTok,
} from "./Icons";

const SOCIALS = [
  { href: "https://www.instagram.com/abeliastadochservice", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.facebook.com/abeliastadochservice", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.tiktok.com/@abeliastadochservice", label: "TikTok", Icon: IconTikTok },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const { copy } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-sage-dark text-cream/85">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blush/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <BroomMark className="h-12 w-12 text-sage" />
              <div className="leading-none">
                <span className="font-script text-[2.4rem] text-cream">Abelia</span>
                <p className="mt-1 text-[0.55rem] font-semibold tracking-[0.42em] text-cream/60 uppercase">Städ &amp; Service</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
              {copy.footer.description}
            </p>
            <div className="mt-6">
              <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-cream/50 uppercase">{copy.footer.tips}</p>
              {subscribed ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                  <IconSparkleSmall className="h-4 w-4 text-butter" /> {copy.footer.thankYou}
                </p>
              ) : (
                <form
                  className="mt-3 flex max-w-sm gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder={copy.shared.emailPlaceholder}
                    className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-sage"
                  />
                  <button className="glass-btn border-white/30 bg-white/15 px-5 text-cream hover:bg-white/25" type="submit">
                    {copy.footer.subscribe}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-7">
              <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-cream/50 uppercase">Följ oss</p>
              <div className="mt-3 flex gap-2.5">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/20"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <nav aria-label="Tjänster">
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-cream/50 uppercase">{copy.footer.services}</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/tjanster/${s.slug}`} className="text-[0.95rem] text-cream/75 transition hover:text-cream">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={copy.footer.links}>
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-cream/50 uppercase">{copy.footer.links}</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { to: "/bokning", label: copy.shared.booking },
                { to: "/offert", label: copy.shared.freeQuote },
                { to: "/om-oss", label: copy.nav.about },
                { to: "/blogg", label: copy.nav.blog },
                { to: "/kontakt", label: copy.nav.contact },
                { to: "/integritetspolicy", label: copy.shared.privacy },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[0.95rem] text-cream/75 transition hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-cream/50 uppercase">{copy.footer.contact}</p>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-cream/75">
              <li className="flex items-start gap-3">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sage" />
                {copy.footer.area}: {CONTACT.serviceArea}
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-4.5 w-4.5 shrink-0 text-sage" />
                <a href={CONTACT.emailHref} className="break-all transition hover:text-cream">{CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
          <span className="mr-1 text-[0.72rem] font-semibold tracking-[0.2em] text-cream/50 uppercase">Vi tar emot</span>
          {PAYMENT_METHODS.map((m) => (
            <span key={m.name} title={m.note} className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-semibold text-cream/80">
              {m.name}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[0.8rem] text-cream/50 sm:flex-row">
          <p>© 2026 {copy.footer.rights}</p>
          <p className="flex items-center gap-1.5">
            <IconSparkleSmall className="h-3.5 w-3.5 text-butter/70" />
            {copy.footer.made}
          </p>
        </div>
      </div>
    </footer>
  );
}
