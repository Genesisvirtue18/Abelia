import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ACCENTS, PRICING, SERVICES, calculatePrice, fmtKr, serviceBySlug, type PriceBasis } from "../data/services";
import { CONTACT } from "../data/contact";
import Reveal from "../components/Reveal";
import {
  IconArrow,
  IconCalendar,
  IconCheck,
  IconSparkle,
  IconSparkleSmall,
  SERVICE_ICONS,
} from "../components/Icons";
import { cn } from "../utils/cn";

const STEPLABELS = ["Välj tjänst", "Ange detaljer", "Datum & tid", "Bekräfta"];

const HOUSING = {
  privat: ["Lägenhet", "Bostadsrätt", "Villa", "Annat"],
  foretag: ["Kontor", "Butik / butiker", "Skola / förskola", "Andra lokaler"],
};

const EXTRAS = [
  { id: "fonster", label: "Fönster & ramar", desc: "Glas, karmar och brädor – spårfria", rate: "fonsterputsning" },
  { id: "maskin", label: "Maskinrengöring av matta", desc: "Egen maskin, extra fräscha golv", flat: 490 },
  { id: "entre", label: "Entré & trapphus", desc: "För bostadsrätter", flat: 290 },
  { id: "hiss", label: "Hiss & gemensamma utrymmen", desc: "För kontors- & fastighetsavtal", flat: 350 },
];

const SLOTS = ["08–10", "10–12", "12–14", "14–16", "16–18", "18–20"];

type FormData = {
  service: string | null;
  type: "privat" | "foretag";
  bostad: string;
  sqm: number;
  rooms: number;
  kitchens: number;
  toilets: string;
  priceBasis: PriceBasis;
  hours: number;
  addGarage: boolean;
  garageSqm: number;
  addBasement: boolean;
  basementSqm: number;
  otherPlace: string;
  otherPlaceSqm: number;
  extras: string[];
  frequency: "enskild" | "varannan" | "veckovis";
  date: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  consent: boolean;
};

const today = () => new Date().toISOString().split("T")[0];

export default function Booking() {
  const [params] = useSearchParams();
  const preselected = serviceBySlug(params.get("service") ?? undefined)?.slug ?? null;
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<FormData>({
    service: preselected,
    type: "privat",
    bostad: "",
    sqm: 60,
    rooms: 3,
    kitchens: 1,
    toilets: "1",
    priceBasis: "sqm",
    hours: 3,
    addGarage: false,
    garageSqm: 15,
    addBasement: false,
    basementSqm: 20,
    otherPlace: "",
    otherPlaceSqm: 0,
    extras: [],
    frequency: "enskild",
    date: "",
    slot: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    consent: false,
  });

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const est = useMemo(() => {
    if (!data.service || !data.sqm) return null;
    const billableSqm =
      data.sqm +
      (data.addGarage ? data.garageSqm : 0) +
      (data.addBasement ? data.basementSqm : 0) +
      (data.otherPlace.trim() ? data.otherPlaceSqm : 0);
    const quantity = data.priceBasis === "sqm" ? billableSqm : data.hours;
    return {
      ...calculatePrice(data.priceBasis, quantity, data.type === "privat"),
      billableSqm,
    };
  }, [data]);

  useEffect(() => {
    if (step === 0) return;
    window.requestAnimationFrame(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [step]);

  const validate = (s: number): string => {
    if (s === 0 && !data.service) return "Välj en tjänst för att fortsätta.";
    if (s === 1 && !data.bostad) return "Välj en bostadstyp.";
    if (s === 1 && (!data.sqm || data.sqm < 10)) return "Ange en yta på minst 10 m².";
    if (s === 2 && !data.date) return "Välj ett datum.";
    if (s === 2 && !data.slot) return "Välj ett tidfönster.";
    if (s === 3 && !data.name.trim()) return "Fyll i ditt namn.";
    if (s === 3 && !/^\S+@\S+\.\S+$/.test(data.email)) return "Ange en giltig e-postadress.";
    if (s === 3 && data.phone.replace(/\D/g, "").length < 7) return "Ange ett telefonnummer.";
    if (s === 3 && !data.address.trim()) return "Fyll i adress.";
    if (s === 3 && !data.consent) return "Du behöver godkänna villkoren.";
    return "";
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError("");
    if (step === 3) {
      setRef("AB-" + Math.floor(10000 + Math.random() * 89999));
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const service = serviceBySlug(data.service ?? undefined);

  /* ---------- Success ---------- */
  if (ref) {
    return (
      <div className="relative overflow-hidden pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-sage-soft blur-3xl" />
          <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-blush-soft blur-3xl" />
          <IconSparkle className="animate-twinkle absolute top-36 right-[20%] h-6 w-6 text-sage" />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="animate-pop glass mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-deep text-cream">
            <IconCheck className="h-12 w-12" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium sm:text-5xl">
            Bokningen är <span className="font-script text-4xl text-sage-deep italic sm:text-5xl">mottagen!</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Tack, <strong className="text-ink">{data.name}</strong>. Din referensnummer är
          </p>
          <p className="mx-auto mt-3 inline-block rounded-full bg-sage-soft px-6 py-2 font-display text-2xl font-semibold tracking-widest text-sage-dark">
            {ref}
          </p>
          <div className="glass mx-auto mt-8 max-w-md rounded-3xl p-6 text-left">
            <h2 className="font-display text-lg font-semibold">Din bokning i korthet</h2>
            <dl className="mt-4 space-y-2 text-[0.95rem]">
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Tjänst</dt><dd className="font-semibold">{service?.name}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Typ</dt><dd className="font-semibold">{data.type === "privat" ? "Privatperson" : "Företag"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Yta</dt><dd className="font-semibold">{data.sqm} m² · {data.bostad}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">När</dt><dd className="font-semibold">{data.date} · kl {data.slot}</dd></div>
              {data.extras.length > 0 && (
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">Tillägg</dt><dd className="text-right font-semibold">{data.extras.map((e) => EXTRAS.find((x) => x.id === e)?.label).join(", ")}</dd></div>
              )}
              {est && (
                <div className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                  <dt className="text-ink-soft">Uppskattat pris {data.type === "privat" ? "med RUT" : "utan RUT"}</dt>
                  <dd className="font-display text-xl font-semibold text-sage-dark">{fmtKr(est.due)}</dd>
                </div>
              )}
            </dl>
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Vi skickar en bekräftelse till <strong className="text-ink">{data.email}</strong> inom 2 timmar (vardagar) med
            städlagets namn och bild. Frågor? Skriv till <a className="font-semibold text-sage-dark underline" href={CONTACT.emailHref}>{CONTACT.email}</a>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="glass-btn">Till startsidan</Link>
            <Link to="/blogg" className="glass-btn-solid">Läs städtips medan du väntar</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-clip pt-36 pb-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -right-32 h-96 w-96 rounded-full bg-lav-soft blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-sage-soft blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-sage-deep uppercase">Boka din städning</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
            Fyra enkla steg – <span className="font-script text-4xl text-sage-deep italic sm:text-5xl">sen är det klart.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Välj 312,25 kr/timme eller 45 kr/m² med RUT. Utan RUT är priserna exakt dubbla. Ingen bindning – ändra eller avboka gratis upp till 24 h innan.
          </p>
        </Reveal>

        {/* Stepper */}
        <Reveal delay={120}>
          <ol className="mx-auto mt-12 flex max-w-3xl items-center">
            {STEPLABELS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={label} className={cn("flex items-center", i < STEPLABELS.length - 1 && "flex-1")}>
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={cn("group flex flex-col items-center", i < step ? "cursor-pointer" : "cursor-default")}
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-lg font-semibold transition-all duration-500",
                        done && "border-sage-deep bg-sage-deep text-cream",
                        active && "scale-110 border-sage-deep bg-white text-sage-deep shadow-card",
                        !done && !active && "border-ink/15 bg-white/50 text-ink/40"
                      )}
                    >
                      {done ? <IconCheck className="h-5 w-5" /> : i + 1}
                    </span>
                    <span className={cn("mt-2 hidden text-[0.8rem] font-semibold sm:block", active || done ? "text-ink" : "text-ink/40")}>
                      {label}
                    </span>
                  </button>
                  {i < STEPLABELS.length - 1 && (
                    <span className="mx-2 mb-0 h-0.5 flex-1 overflow-hidden rounded-full bg-ink/10 sm:mb-7">
                      <span className={cn("block h-full bg-sage-deep transition-all duration-700", done ? "w-full" : "w-0")} />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div ref={formTopRef} className="mt-12 grid scroll-mt-28 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Step panel */}
          <Reveal delay={180}>
            <div className="glass min-h-[480px] rounded-[2rem] p-6 sm:p-10">
              {step === 0 && (
                <div className="animate-pop">
                  <h2 className="font-display text-2xl font-semibold">Vilken tjänst behöver du?</h2>
                  <p className="mt-1 text-ink-soft">Du kan byta eller kombinera senare via offert.</p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {SERVICES.map((s) => {
                      const Icon = SERVICE_ICONS[s.icon];
                      const a = ACCENTS[s.accent];
                      const active = data.service === s.slug;
                      return (
                        <button
                          key={s.slug}
                          onClick={() => { set("service", s.slug); setError(""); }}
                          className={cn(
                            "group relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-300",
                            active ? "scale-[1.01] border-sage-deep bg-white shadow-card" : cn("border-transparent", a.soft, "hover:border-white hover:shadow-card")
                          )}
                          aria-pressed={active}
                        >
                          <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm transition-transform group-hover:-rotate-6", a.deep)}>
                            <Icon className="h-6 w-6" />
                          </span>
                           <span>
                            <span className="block font-semibold">{s.name}</span>
                            <span className="mt-0.5 block text-[0.82rem] text-ink-soft">{s.short}</span>
                          </span>
                          {active && (
                            <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-sage-deep text-cream">
                              <IconCheck className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="animate-pop space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">Berätta lite om städningen</h2>
                    <p className="mt-1 text-ink-soft">Så kan vi matcha rätt lag och rätta pris.</p>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-ink-soft uppercase tracking-wider">Är du privatperson eller företag?</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(["privat", "foretag"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => { set("type", t); set("bostad", ""); setError(""); }}
                          className={cn(
                            "rounded-2xl border-2 px-5 py-4 text-left transition-all",
                            data.type === t ? "border-sage-deep bg-white shadow-card" : "border-transparent bg-white/40 hover:bg-white/70"
                          )}
                          aria-pressed={data.type === t}
                        >
                          <span className="font-display text-lg font-semibold">{t === "privat" ? "Privatperson" : "Företag"}</span>
                          <span className="mt-1 block text-[0.85rem] text-ink-soft">
                            {t === "privat" ? "Pris med RUT visas direkt" : "Pris utan RUT visas direkt"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <fieldset>
                    <legend className="font-display text-xl font-semibold">Välj prismodell</legend>
                    <p className="mt-1 text-sm text-ink-soft">Utan RUT är priset exakt det dubbla.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => set("priceBasis", "sqm")}
                        className={cn(
                          "pricing-choice rounded-2xl border-2 p-5 text-left transition-all",
                          data.priceBasis === "sqm" ? "is-active border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                        )}
                        aria-pressed={data.priceBasis === "sqm"}
                      >
                        <span className="block font-display text-xl font-semibold">Pris per m²</span>
                        <span className="mt-1 block text-[0.9rem] text-sage-dark"><strong>{fmtKr(PRICING.withRut.sqm)}/m²</strong> med RUT</span>
                        <span className="block text-[0.8rem] text-ink-soft">{fmtKr(PRICING.withoutRut.sqm)}/m² utan RUT</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => set("priceBasis", "hour")}
                        className={cn(
                          "pricing-choice rounded-2xl border-2 p-5 text-left transition-all",
                          data.priceBasis === "hour" ? "is-active border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                        )}
                        aria-pressed={data.priceBasis === "hour"}
                      >
                        <span className="block font-display text-xl font-semibold">Timpris</span>
                        <span className="mt-1 block text-[0.9rem] text-sage-dark"><strong>{fmtKr(PRICING.withRut.hour)}/tim</strong> med RUT</span>
                        <span className="block text-[0.8rem] text-ink-soft">{fmtKr(PRICING.withoutRut.hour)}/tim utan RUT</span>
                      </button>
                    </div>
                    {data.priceBasis === "hour" && (
                      <label className="mt-4 block max-w-xs animate-pop">
                        <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Uppskattat antal timmar</span>
                        <input
                          type="number"
                          min={1}
                          step={0.5}
                          className="field"
                          value={data.hours}
                          onChange={(event) => set("hours", Math.max(0, Number(event.target.value)))}
                        />
                      </label>
                    )}
                  </fieldset>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Bostadstyp</span>
                      <select className="field" value={data.bostad} onChange={(e) => set("bostad", e.target.value)}>
                        <option value="">Välj…</option>
                        {HOUSING[data.type].map((h) => (
                          <option key={h}>{h}</option>
                        ))}
                      </select>
                    </label>
                    <div>
                      <span className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-soft uppercase tracking-wider">
                        Yta <span className="rounded-full bg-sage-soft px-2.5 py-0.5 text-[0.8rem] font-bold text-sage-dark normal-case">{data.sqm} m²</span>
                      </span>
                      <input
                        type="range"
                        min={15}
                        max={400}
                        step={5}
                        value={data.sqm}
                        onChange={(e) => set("sqm", Number(e.target.value))}
                        className="slider"
                        style={{ ["--fill" as string]: `${((data.sqm - 15) / 385) * 100}%` }}
                        aria-label="Yta i kvadratmeter"
                      />
                      <div className="mt-1 flex justify-between text-[0.7rem] text-ink-soft/70">
                        <span>15 m²</span><span>400 m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal rum</span>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        className="field"
                        placeholder="Antal rum"
                        value={data.rooms}
                        onChange={(e) => set("rooms", Number(e.target.value) || 1)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal kök</span>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        className="field"
                        placeholder="Antal kök"
                        value={data.kitchens}
                        onChange={(e) => set("kitchens", Number(e.target.value) || 1)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal badrum / WC</span>
                      <select
                        className="field"
                        value={data.toilets}
                        onChange={(e) => set("toilets", e.target.value)}
                      >
                        <option value="1">1 toalett</option>
                        <option value="2">2 toaletter</option>
                        <option value="3">3 toaletter</option>
                        <option value="4">Fler än 3 toaletter</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Annan yta eller plats</span>
                      <input
                        className="field"
                        placeholder="T.ex. uterum, balkong, förråd..."
                        value={data.otherPlace}
                        onChange={(e) => set("otherPlace", e.target.value)}
                      />
                      {data.otherPlace.trim() && (
                        <input
                          type="number"
                          min={0}
                          className="field mt-2 animate-pop"
                          aria-label="Annan yta i kvadratmeter"
                          placeholder="Yta i m²"
                          value={data.otherPlaceSqm}
                          onChange={(event) => set("otherPlaceSqm", Math.max(0, Number(event.target.value)))}
                        />
                      )}
                    </label>
                  </div>

                  <fieldset>
                    <legend className="font-display text-xl font-semibold">Tilläggsytor att städa</legend>
                    <p className="mt-1 text-sm text-ink-soft">Välj om du vill lägga till extra utrymmen.</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/40 border border-white/60 p-4 transition hover:bg-white/70">
                        <input
                          type="checkbox"
                          checked={data.addGarage}
                          onChange={(e) => set("addGarage", e.target.checked)}
                          className="mt-1 h-5 w-5 accent-[#55554f]"
                        />
                        <div>
                          <span className="block font-semibold">Städa garage</span>
                          <span className="block text-[0.8rem] text-ink-soft">Läggs till i städytan</span>
                        </div>
                      </label>

                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/40 border border-white/60 p-4 transition hover:bg-white/70">
                        <input
                          type="checkbox"
                          checked={data.addBasement}
                          onChange={(e) => set("addBasement", e.target.checked)}
                          className="mt-1 h-5 w-5 accent-[#55554f]"
                        />
                        <div>
                          <span className="block font-semibold">Städa källare</span>
                          <span className="block text-[0.8rem] text-ink-soft">Läggs till i städytan</span>
                        </div>
                      </label>
                    </div>
                    {(data.addGarage || data.addBasement) && (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2 animate-pop">
                        {data.addGarage && (
                          <label className="block">
                            <span className="mb-2 block text-xs font-semibold text-ink-soft uppercase tracking-wider">Garage, m²</span>
                            <input type="number" min={1} className="field" value={data.garageSqm} onChange={(event) => set("garageSqm", Math.max(0, Number(event.target.value)))} />
                          </label>
                        )}
                        {data.addBasement && (
                          <label className="block">
                            <span className="mb-2 block text-xs font-semibold text-ink-soft uppercase tracking-wider">Källare, m²</span>
                            <input type="number" min={1} className="field" value={data.basementSqm} onChange={(event) => set("basementSqm", Math.max(0, Number(event.target.value)))} />
                          </label>
                        )}
                      </div>
                    )}
                  </fieldset>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-ink-soft uppercase tracking-wider">Tillägg (valfritt)</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {EXTRAS.map((e) => {
                        const on = data.extras.includes(e.id);
                        return (
                          <button
                            key={e.id}
                            onClick={() => set("extras", on ? data.extras.filter((x) => x !== e.id) : [...data.extras, e.id])}
                            className={cn(
                              "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                              on ? "border-sage-deep bg-white shadow-card" : "border-transparent bg-white/40 hover:bg-white/70"
                            )}
                            aria-pressed={on}
                          >
                            <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition", on ? "border-sage-deep bg-sage-deep text-cream" : "border-ink/25 bg-white")}>
                              {on && <IconCheck className="h-3.5 w-3.5" />}
                            </span>
                            <span>
                              <span className="block text-[0.95rem] font-semibold">{e.label}</span>
                              <span className="block text-[0.78rem] text-ink-soft">{e.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-ink-soft uppercase tracking-wider">Hur ofta?</p>
                    <div className="flex flex-wrap gap-3">
                      {([
                        ["enskild", "Enskild städning"],
                        ["varannan", "Löpande · varannan vecka"],
                        ["veckovis", "Löpande · varje vecka"],
                      ] as const).map(([v, l]) => (
                        <button
                          key={v}
                          onClick={() => set("frequency", v)}
                          className={cn(
                            "rounded-full border-2 px-5 py-2.5 text-[0.9rem] font-semibold transition-all",
                            data.frequency === v ? "border-sage-deep bg-sage-deep text-cream shadow-card" : "border-transparent bg-white/50 hover:bg-white"
                          )}
                          aria-pressed={data.frequency === v}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-pop">
                  <h2 className="font-display text-2xl font-semibold">Välj datum &amp; tid</h2>
                  <p className="mt-1 text-ink-soft">Vi boka in tidfönster à 2 timmar. Du får exakt ankomsttid i bekräftelsen.</p>

                  <label className="mt-7 block max-w-xs">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-soft uppercase tracking-wider">
                      <IconCalendar className="h-4 w-4" /> Datum
                    </span>
                    <input
                      type="date"
                      min={today()}
                      max={new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0]}
                      className="field"
                      value={data.date}
                      onChange={(e) => { set("date", e.target.value); setError(""); }}
                    />
                  </label>

                  <p className="mt-7 mb-3 text-sm font-semibold text-ink-soft uppercase tracking-wider">Tidfönster</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => { set("slot", s); setError(""); }}
                        className={cn(
                          "rounded-2xl border-2 py-3.5 font-display text-lg font-semibold transition-all",
                          data.slot === s ? "scale-[1.02] border-sage-deep bg-sage-deep text-cream shadow-card" : "border-transparent bg-white/50 hover:bg-white"
                        )}
                        aria-pressed={data.slot === s}
                      >
                        kl {s}
                      </button>
                    ))}
                  </div>
                  <p className="mt-5 flex items-start gap-2 rounded-2xl bg-butter-soft px-4 py-3 text-[0.88rem] text-butter-deep">
                    <IconSparkleSmall className="mt-0.5 h-4 w-4 shrink-0" />
                    Behöver du kväll eller helg? Ange det i anteckningsfältet på nästa steg – vi fixar det oftast.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="animate-pop">
                  <h2 className="font-display text-2xl font-semibold">Sista steget – dina uppgifter</h2>
                  <p className="mt-1 text-ink-soft">Vi ringer aldrig utan att ha hört av oss via e-post först.</p>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Namn *</span>
                      <input className="field" placeholder="För- och efternamn" value={data.name} onChange={(e) => set("name", e.target.value)} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Telefon *</span>
                      <input className="field" type="tel" placeholder="07x-xxx xx xx" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">E-post *</span>
                      <input className="field" type="email" placeholder="namn@exempel.se" value={data.email} onChange={(e) => set("email", e.target.value)} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Adress *</span>
                      <input className="field" placeholder="Gata & nr" value={data.address} onChange={(e) => set("address", e.target.value)} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Postnummer & stad</span>
                      <input className="field" placeholder="503 30 Borås" value={data.city} onChange={(e) => set("city", e.target.value)} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Anteckningar (valfritt)</span>
                      <textarea
                        className="field min-h-[90px] resize-y"
                        placeholder="Bilnyckel i lådan, koden skickas per SMS, vi har en rävd hund…"
                        value={data.notes}
                        onChange={(e) => set("notes", e.target.value)}
                      />
                    </label>
                  </div>
                  <label className="mt-6 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#5f8269]"
                    />
                    <span className="text-[0.92rem] text-ink-soft">
                      Jag godkänner bokningsvillkoren och <Link to="/integritetspolicy" className="underline">integritetspolicyn</Link>. Jag förstår att jag kan ändra eller avboka gratis upp till 24 h innan städningen. *
                    </span>
                  </label>
                </div>
              )}

              {error && (
                <p className="mt-6 rounded-2xl border border-blush-deep/30 bg-blush-soft px-5 py-3.5 text-[0.95rem] font-medium text-blush-deep">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
                <button onClick={back} className={cn("glass-btn", step === 0 && "invisible")}>
                  ← Tillbaka
                </button>
                <button onClick={next} className="glass-btn-solid">
                  {step === 3 ? "Bekräfta bokning" : "Fortsätt"} <IconArrow className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Summary */}
          <Reveal delay={240}>
            <aside className="glass rounded-[2rem] p-7 lg:sticky lg:top-28">
              <h2 className="font-display text-xl font-semibold">Din bokning</h2>
              <dl className="mt-5 space-y-3 text-[0.95rem]">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Tjänst</dt>
                  <dd className="text-right font-semibold">{service ? service.name : "–"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Typ</dt>
                  <dd className="font-semibold">{data.type === "privat" ? "Privat" : "Företag"}</dd>
                </div>
                 <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Yta</dt>
                  <dd className="font-semibold">{data.bostad ? `${data.bostad} · ${data.sqm} m²` : `${data.sqm} m²`}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Rum</dt>
                  <dd className="font-semibold">{data.rooms} rum / {data.kitchens} kök</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Badrum</dt>
                  <dd className="font-semibold">{data.toilets === "1" ? "1 WC" : data.toilets === "2" ? "2 WC" : data.toilets === "3" ? "3 WC" : "Fler än 3"}</dd>
                </div>
                {(data.addGarage || data.addBasement || data.otherPlace.trim()) && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Utrymmen</dt>
                    <dd className="text-right font-semibold">
                      {[
                        data.addGarage && `Garage ${data.garageSqm} m²`,
                        data.addBasement && `Källare ${data.basementSqm} m²`,
                        data.otherPlace.trim() && `${data.otherPlace} ${data.otherPlaceSqm} m²`,
                      ].filter(Boolean).join(", ")}
                    </dd>
                  </div>
                )}
                {data.extras.length > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Tillägg</dt>
                    <dd className="text-right font-semibold">{data.extras.map((e) => EXTRAS.find((x) => x.id === e)?.label).join(", ")}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">När</dt>
                  <dd className="font-semibold">{data.date ? `${data.date} · kl ${data.slot || "–"}` : "–"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Frekvens</dt>
                  <dd className="font-semibold">
                    {data.frequency === "enskild" ? "Enskild" : data.frequency === "varannan" ? "Varannan vecka" : "Varje vecka"}
                  </dd>
                </div>
              </dl>
              {est && (
                <div key={`${est.basis}-${est.due}`} className="estimate-price-pop mt-6 rounded-2xl bg-sage-soft px-5 py-4">
                  <p className="text-[0.8rem] font-semibold tracking-wider text-sage-dark uppercase">Prisuppskattning</p>
                  <div className="mt-2 flex justify-between gap-3 text-[0.85rem] text-ink-soft">
                    <span>{est.quantity} {est.basis === "sqm" ? "m²" : "tim"}</span>
                    <span>{fmtKr(data.type === "privat" ? est.rateWithRut : est.rateWithoutRut)}/{est.basis === "sqm" ? "m²" : "tim"}</span>
                  </div>
                  <p className="mt-1 font-display text-3xl font-semibold text-sage-dark">{fmtKr(est.due)}</p>
                  {data.type === "privat" && (
                    <p className="mt-1 text-[0.78rem] text-ink-soft">Utan RUT: {fmtKr(est.withoutRut)} · RUT-avdrag: −{fmtKr(est.rutDeduction)}</p>
                  )}
                  <p className="mt-1 text-[0.78rem] text-ink-soft">Material ingår · omfattningen bekräftas i bokningsmejlet</p>
                </div>
              )}
              <div className="mt-5 flex items-start gap-2.5 text-[0.85rem] text-ink-soft">
                <IconSparkleSmall className="mt-0.5 h-4 w-4 shrink-0 text-blush-deep" />
                7 dagars garanti – anmärkningar åtgärdas kostnadsfritt.
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
