import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { SERVICES } from "../data/services";
import { CONTACT } from "../data/contact";
import { useLanguage } from "../i18n";
import { cn } from "../utils/cn";
import { IconMail, IconMenu, IconSparkleSmall, IconX } from "./Icons";
import LanguageSelect from "./LanguageSelect";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { copy } = useLanguage();
  const links = [
    { to: "/", label: copy.nav.home },
    { to: "/om-oss", label: copy.nav.about },
    { to: "/blogg", label: copy.nav.blog },
    { to: "/kontakt", label: copy.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-sage-dark text-cream/90">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-[0.78rem] tracking-wide">
          <IconSparkleSmall className="h-3.5 w-3.5 text-butter-deep" />
          <span>
            {copy.announcement.before} <strong className="font-semibold">{copy.announcement.strong}</strong> {copy.announcement.after}
          </span>
          <Link to="/offert" className="underline decoration-cream/40 underline-offset-2 transition hover:text-cream">
            {copy.announcement.action} →
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-white/60 bg-cream/80 shadow-[0_8px_30px_-18px_rgb(46_42_38/0.35)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo compact={scrolled} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Huvudinnehåll">
            {links.slice(0, 1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                    isActive ? "text-sage-dark" : "text-ink-soft hover:text-ink"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}

            {/* Services dropdown */}
            <div className="group relative">
              <button
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                  location.pathname.startsWith("/tjanster") ? "text-sage-dark" : "text-ink-soft hover:text-ink"
                )}
              >
                {copy.nav.services}
                <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="glass overflow-hidden rounded-3xl p-2">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/tjanster/${s.slug}`}
                      className="group/item flex items-center justify-between rounded-2xl px-4 py-2.5 transition hover:bg-white/70"
                    >
                      <span>
                        <span className="block text-[0.95rem] font-semibold text-ink">{s.name}</span>
                        <span className="block text-[0.78rem] text-ink-soft">Pris enligt offert · RUT</span>
                      </span>
                      <span className="text-sage-deep opacity-0 transition group-hover/item:translate-x-1 group-hover/item:opacity-100">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {links.slice(1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                    isActive ? "text-sage-dark" : "text-ink-soft hover:text-ink"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={CONTACT.emailHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.86rem] font-semibold text-sage-dark transition hover:text-sage-dark/80 xl:inline-flex">
              <IconMail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            <LanguageSelect className="hidden lg:inline-flex" />
            <Link to="/bokning" className="glass-btn hidden px-5 py-2.5 sm:inline-flex">
              {copy.nav.book}
            </Link>
            <LanguageSelect className="inline-flex lg:hidden" />
            <button
              className="glass rounded-2xl p-2.5 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? copy.nav.close : copy.nav.open}
              aria-expanded={open}
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-500 lg:hidden",
            open ? "grid-rows-[1fr] border-t border-white/50 bg-cream/95 backdrop-blur-xl" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0">
            <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobilmeny">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-2xl px-4 py-3 text-[1.05rem] font-medium",
                      isActive ? "bg-sage-soft text-sage-dark" : "text-ink-soft hover:bg-white/60"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <p className="px-4 pt-3 pb-1 text-[0.7rem] font-semibold tracking-[0.25em] text-ink-soft uppercase">{copy.nav.services}</p>
              {SERVICES.map((s) => (
                <Link key={s.slug} to={`/tjanster/${s.slug}`} className="block rounded-2xl px-4 py-2.5 text-[0.98rem] text-ink-soft hover:bg-white/60">
                  {s.name}
                </Link>
              ))}
              <Link to="/bokning" className="glass-btn mt-3 w-full">
                {copy.nav.book} – 4 enkla steg
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
