import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ACCENTS, PRICING, SERVICES, calculatePrice, fmtKr, type PriceBasis } from "../data/services";
import { GUARANTEE, PAYMENT_METHODS } from "../data/serviceContent";
import Reveal from "../components/Reveal";
import { IconArrow, IconCheck, IconShield, IconSparkleSmall, IconTag, SERVICE_ICONS } from "../components/Icons";
import { cn } from "../utils/cn";

const PROPERTY_TYPES = [
  { id: "lagenhet", label: "Lägenhet" },
  { id: "radhus", label: "Radhus" },
  { id: "villa", label: "Villa" },
  { id: "lokal", label: "Lokal/Kontor" },
];

const TOILETS = [
  { id: "0", label: "Ingen toalett" },
  { id: "1", label: "1 toalett" },
  { id: "2", label: "2 toaletter" },
  { id: "3", label: "3 toaletter" },
  { id: "4", label: "Fler än 3 toaletter" },
];

export default function Quote() {
  const [params] = useSearchParams();
  const pre = params.get("service");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const formTopRef = useRef<HTMLDivElement>(null);

  // Property
  const [types, setTypes] = useState<string[]>([]);
  const [sqm, setSqm] = useState(60);
  const [rooms, setRooms] = useState(3);
  const [kitchens, setKitchens] = useState(1);
  const [toilets, setToilets] = useState("1");
  const [addGarage, setAddGarage] = useState(false);
  const [garageSqm, setGarageSqm] = useState(15);
  const [addBasement, setAddBasement] = useState(false);
  const [basementSqm, setBasementSqm] = useState(20);
  const [otherPlace, setOtherPlace] = useState("");
  const [otherPlaceSqm, setOtherPlaceSqm] = useState(0);
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0].id);
  const [priceBasis, setPriceBasis] = useState<PriceBasis>("sqm");
  const [hours, setHours] = useState(3);

  // Services
  const [sel, setSel] = useState<string[]>(pre && SERVICES.some((s) => s.slug === pre) ? [pre] : []);
  const [type, setType] = useState<"privat" | "foretag">("privat");

  // Contact
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (step === 1) return;
    window.requestAnimationFrame(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [step]);

  const estimate = useMemo(() => {
    if (!sel.length) return null;
    const billableSqm =
      sqm +
      (addGarage ? garageSqm : 0) +
      (addBasement ? basementSqm : 0) +
      (otherPlace.trim() ? otherPlaceSqm : 0);
    const quantity = priceBasis === "sqm" ? billableSqm : hours;
    return {
      ...calculatePrice(priceBasis, quantity, type === "privat"),
      billableSqm,
    };
  }, [
    sel,
    sqm,
    addGarage,
    garageSqm,
    addBasement,
    basementSqm,
    otherPlace,
    otherPlaceSqm,
    priceBasis,
    hours,
    type,
  ]);

  const validate = (s: number) => {
    if (s === 1 && !types.length) return "Välj minst en typ av bostad eller lokal.";
    if (s === 1 && (!sqm || sqm < 10)) return "Ange en storlek på minst 10 m².";
    if (s === 1 && rooms < 1) return "Ange antal rum.";
    if (s === 2 && !sel.length) return "Välj minst en tjänst.";
    if (s === 3) {
      if (!name.trim()) return "Fyll i ditt fullständiga namn.";
      if (!address.trim()) return "Fyll i adress.";
      if (!/^\d{3}\s?\d{2}$/.test(zip.trim())) return "Ange ett giltigt postnummer (t.ex. 503 30).";
      if (!city.trim()) return "Fyll i ort.";
      if (!/^\S+@\S+\.\S+$/.test(email)) return "Ange en giltig e-postadress.";
      if (phone.replace(/\D/g, "").length < 7) return "Ange ett telefonnummer.";
      if (!consent) return "Du behöver godkänna villkoren och integritetspolicyn.";
    }
    return "";
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError("");
    if (step === 3) return setDone(true);
    setStep((s) => s + 1);
  };

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  if (done) {
    return (
      <div className="page-arrive relative overflow-hidden pt-40 pb-24">
        <div className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-lav-soft blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="animate-pop glass mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-deep text-cream">
            <IconTag className="h-11 w-11" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium sm:text-5xl">
            Offertförfrågan <span className="font-script text-4xl text-lav-deep italic sm:text-5xl">skickad!</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Tack, <strong className="text-ink">{name}</strong>! Vi går igenom underlaget och återkommer med en skriftlig
            offert till <strong className="text-ink">{email}</strong> inom 24 timmar.
          </p>
          {estimate && (
            <div className="glass mx-auto mt-8 max-w-md rounded-3xl p-6 text-left">
              <p className="text-[0.8rem] font-semibold tracking-wider text-ink-soft uppercase">Din uppskattning</p>
              <dl className="mt-3 space-y-1.5 text-[0.95rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Underlag</dt>
                  <dd className="font-semibold">{estimate.quantity} {estimate.basis === "sqm" ? "m²" : "tim"}</dd>
                </div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">Utan RUT</dt><dd className="font-semibold">{fmtKr(estimate.withoutRut)}</dd></div>
                {type === "privat" && (
                  <div className="flex justify-between gap-4 text-sage-dark"><dt>RUT-avdrag</dt><dd className="font-semibold">−{fmtKr(estimate.rutDeduction)}</dd></div>
                )}
                <div className="mt-2 flex justify-between gap-4 border-t border-ink/10 pt-2">
                  <dt className="font-semibold">Att betala {type === "privat" ? "med RUT" : "utan RUT"}</dt>
                  <dd className="font-display text-2xl font-semibold text-sage-dark">{fmtKr(estimate.due)}</dd>
                </div>
              </dl>
            </div>
          )}
          <div className="glass mx-auto mt-6 max-w-md rounded-2xl p-5 text-left">
            <p className="flex items-start gap-2.5 text-[0.92rem] text-ink-soft">
              <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-sage-deep" />
              <span><strong className="text-ink">{GUARANTEE.title}.</strong> {GUARANTEE.body}</span>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/bokning" className="glass-btn-solid">Boka direkt istället</Link>
            <Link to="/kontakt" className="glass-btn">Kontakta oss</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-arrive relative overflow-x-clip pt-36 pb-24">
      <div className="pointer-events-none absolute -top-24 -left-32 h-96 w-96 rounded-full bg-butter-soft blur-3xl" aria-hidden />
      <div className="ambient-drift pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sage-soft blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-butter-deep uppercase">Kostnadsfri offert</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
            Fyll i formuläret – <span className="font-script text-4xl text-butter-deep italic sm:text-5xl">vi gör resten.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Svara på några frågor om bostaden eller lokalen så räknar vi fram ett pris. Du får ett skriftligt svar inom
            24 timmar – kostnadsfritt och utan förpliktelser.
          </p>
        </Reveal>

        {/* Progress */}
        <Reveal delay={100} className="mt-10 scroll-mt-28" >
          <div ref={formTopRef} className="absolute -translate-y-28" aria-hidden />
          <div className="glass flex flex-wrap items-center gap-2 rounded-full p-2">
            {["Bostaden", "Tjänster", "Uppgifter"].map((label, i) => {
              const n = i + 1;
              return (
                <button
                  key={label}
                  onClick={() => n < step && setStep(n)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold transition-all",
                    step === n ? "bg-sage-deep text-cream shadow-card" : n < step ? "bg-sage-soft text-sage-dark" : "text-ink-soft"
                  )}
                >
                  <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[0.75rem]", step === n ? "bg-white/25" : "bg-white/60")}>{n}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <form
          onSubmit={(e) => { e.preventDefault(); next(); }}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_370px]"
        >
          <div className="space-y-8">
            {/* STEP 1 – property */}
            {step === 1 && (
              <div className="animate-pop space-y-8">
                <fieldset>
                  <legend className="font-display text-2xl font-semibold">Typ av objekt</legend>
                  <p className="mt-1 text-sm text-ink-soft">Välj en eller flera – det hjälper oss att matcha rätt städlag.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {PROPERTY_TYPES.map((p) => {
                      const on = types.includes(p.id);
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => toggle(types, setTypes, p.id)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-full border-2 px-5 py-2.5 text-[0.95rem] font-medium transition-all",
                            on ? "border-sage-deep bg-white shadow-card" : "border-transparent bg-white/50 hover:bg-white/80"
                          )}
                          aria-pressed={on}
                        >
                          <span className={cn("flex h-5 w-5 items-center justify-center rounded-md border-2", on ? "border-sage-deep bg-sage-deep text-cream" : "border-ink/25 bg-white")}>
                            {on && <IconCheck className="h-3 w-3" />}
                          </span>
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-display text-xl font-semibold">Huvudtyp för prisberäkningen</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-4">
                    {PROPERTY_TYPES.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPropertyType(p.id)}
                        className={cn(
                          "rounded-2xl border-2 px-4 py-2.5 text-[0.9rem] font-semibold transition-all",
                          propertyType === p.id ? "border-sage-deep bg-sage-soft text-sage-dark" : "border-transparent bg-white/45 hover:bg-white/80"
                        )}
                        aria-pressed={propertyType === p.id}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-display text-xl font-semibold">Välj prismodell</legend>
                  <p className="mt-1 text-sm text-ink-soft">Samma tydliga pris gäller för alla tjänster. Utan RUT är priset exakt det dubbla.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPriceBasis("sqm")}
                      className={cn(
                        "pricing-choice rounded-2xl border-2 p-5 text-left transition-all",
                        priceBasis === "sqm" ? "is-active border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                      )}
                      aria-pressed={priceBasis === "sqm"}
                    >
                      <span className="block font-display text-xl font-semibold">Pris per m²</span>
                      <span className="mt-1 block text-[0.9rem] text-sage-dark"><strong>{fmtKr(PRICING.withRut.sqm)}/m²</strong> med RUT</span>
                      <span className="block text-[0.8rem] text-ink-soft">{fmtKr(PRICING.withoutRut.sqm)}/m² utan RUT</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriceBasis("hour")}
                      className={cn(
                        "pricing-choice rounded-2xl border-2 p-5 text-left transition-all",
                        priceBasis === "hour" ? "is-active border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                      )}
                      aria-pressed={priceBasis === "hour"}
                    >
                      <span className="block font-display text-xl font-semibold">Timpris</span>
                      <span className="mt-1 block text-[0.9rem] text-sage-dark"><strong>{fmtKr(PRICING.withRut.hour)}/tim</strong> med RUT</span>
                      <span className="block text-[0.8rem] text-ink-soft">{fmtKr(PRICING.withoutRut.hour)}/tim utan RUT</span>
                    </button>
                  </div>
                  {priceBasis === "hour" && (
                    <label className="mt-4 block max-w-xs animate-pop">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Uppskattat antal timmar</span>
                      <input
                        type="number"
                        min={1}
                        step={0.5}
                        className="field"
                        value={hours}
                        onChange={(event) => setHours(Math.max(0, Number(event.target.value)))}
                      />
                    </label>
                  )}
                </fieldset>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Storlek i kvadratmeter (m²)</span>
                    <input
                      type="number"
                      min={10}
                      max={5000}
                      className="field"
                      placeholder="Storlek i kvadratmeter (m²)"
                      value={sqm}
                      onChange={(e) => setSqm(Number(e.target.value) || 0)}
                    />
                    <input
                      type="range"
                      min={10}
                      max={2000}
                      step={10}
                      value={sqm}
                      onChange={(e) => setSqm(Number(e.target.value))}
                      className="slider mt-4"
                      style={{ ["--fill" as string]: `${((sqm - 10) / 1990) * 100}%` }}
                      aria-label="Storlek i kvadratmeter"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal rum</span>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      className="field"
                      placeholder="Antal rum"
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value) || 0)}
                    />
                    <p className="mt-2 text-[0.8rem] text-ink-soft">Antal rum i bostaden / lokalen.</p>
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal kök</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="field"
                      placeholder="Antal kök"
                      value={kitchens}
                      onChange={(e) => setKitchens(Number(e.target.value) || 1)}
                    />
                    <p className="mt-2 text-[0.8rem] text-ink-soft">De flesta har 1 kök.</p>
                  </label>

                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-ink-soft uppercase tracking-wider">Antal badrum / WC</legend>
                    <select
                      className="field"
                      value={toilets}
                      onChange={(e) => setToilets(e.target.value)}
                    >
                      {TOILETS.map((t) => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </fieldset>
                </div>

                <fieldset>
                  <legend className="font-display text-xl font-semibold">Tilläggsytor att städa</legend>
                  <p className="mt-1 text-sm text-ink-soft">Välj om du vill lägga till extra utrymmen.</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/40 border border-white/60 p-4 transition hover:bg-white/70">
                      <input
                        type="checkbox"
                        checked={addGarage}
                        onChange={(e) => setAddGarage(e.target.checked)}
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
                        checked={addBasement}
                        onChange={(e) => setAddBasement(e.target.checked)}
                        className="mt-1 h-5 w-5 accent-[#55554f]"
                      />
                      <div>
                        <span className="block font-semibold">Städa källare</span>
                        <span className="block text-[0.8rem] text-ink-soft">Läggs till i städytan</span>
                      </div>
                    </label>
                  </div>
                  {(addGarage || addBasement) && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 animate-pop">
                      {addGarage && (
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-ink-soft uppercase tracking-wider">Garage, m²</span>
                          <input type="number" min={1} className="field" value={garageSqm} onChange={(event) => setGarageSqm(Math.max(0, Number(event.target.value)))} />
                        </label>
                      )}
                      {addBasement && (
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-ink-soft uppercase tracking-wider">Källare, m²</span>
                          <input type="number" min={1} className="field" value={basementSqm} onChange={(event) => setBasementSqm(Math.max(0, Number(event.target.value)))} />
                        </label>
                      )}
                    </div>
                  )}
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Annan yta eller plats</span>
                    <input
                      className="field"
                      placeholder="T.ex. uterum, balkong, förråd..."
                      value={otherPlace}
                      onChange={(e) => setOtherPlace(e.target.value)}
                    />
                  </label>
                  {otherPlace.trim() && (
                    <label className="block animate-pop">
                      <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Yta, m²</span>
                      <input type="number" min={0} className="field" value={otherPlaceSqm} onChange={(event) => setOtherPlaceSqm(Math.max(0, Number(event.target.value)))} />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 – services */}
            {step === 2 && (
              <div className="animate-pop">
                <fieldset>
                  <legend className="font-display text-2xl font-semibold">Vilka tjänster behöver du?</legend>
                  <p className="mt-1 text-sm text-ink-soft">Välj en eller flera. Priset räknas fram direkt i rutan till höger.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {SERVICES.map((s) => {
                      const Icon = SERVICE_ICONS[s.icon];
                      const a = ACCENTS[s.accent];
                      const on = sel.includes(s.slug);
                      return (
                        <button
                          type="button"
                          key={s.slug}
                          onClick={() => toggle(sel, setSel, s.slug)}
                          className={cn(
                            "flex items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition-all",
                            on ? "border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                          )}
                          aria-pressed={on}
                        >
                          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/90 shadow-sm", a.deep)}>
                            <Icon className="h-5.5 w-5.5" />
                          </span>
                          <span className="flex-1">
                            <span className="block font-semibold">{s.name}</span>
                            <span className="block text-[0.82rem] leading-relaxed text-ink-soft">{s.short}</span>
                          </span>
                          <span className={cn("mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2", on ? "border-sage-deep bg-sage-deep text-cream" : "border-ink/25 bg-white")}>
                            {on && <IconCheck className="h-3.5 w-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="font-display text-xl font-semibold">Är du privatperson eller företag?</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {([["privat", "Privatperson", "Pris med RUT visas direkt"], ["foretag", "Företag", "Pris utan RUT visas direkt"]] as const).map(([id, label, note]) => (
                      <button
                        type="button"
                        key={id}
                        onClick={() => setType(id)}
                        className={cn(
                          "rounded-2xl border-2 px-5 py-4 text-left transition-all",
                          type === id ? "border-sage-deep bg-white shadow-card" : "border-transparent bg-white/45 hover:bg-white/80"
                        )}
                        aria-pressed={type === id}
                      >
                        <span className="block font-display text-lg font-semibold">{label}</span>
                        <span className="mt-0.5 block text-[0.85rem] text-ink-soft">{note}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* STEP 3 – contact */}
            {step === 3 && (
              <div className="animate-pop">
                <h2 className="font-display text-2xl font-semibold">Kontaktuppgifter</h2>
                <p className="mt-1 text-sm text-ink-soft">Vi svarar inom 24 timmar med en skriftlig offert.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Fullständigt namn *</span>
                    <input className="field" placeholder="Fullständigt namn" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Adress *</span>
                    <input className="field" placeholder="Gata och nummer" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Postnummer *</span>
                    <input className="field" inputMode="numeric" placeholder="Postnummer" value={zip} onChange={(e) => setZip(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Ort *</span>
                    <input className="field" placeholder="Ort" value={city} onChange={(e) => setCity(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Telefon *</span>
                    <input className="field" type="tel" placeholder="Telefonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">E-post *</span>
                    <input className="field" type="email" placeholder="E-postadress" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Önskat datum</span>
                    <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-ink-soft uppercase tracking-wider">Meddelande (valfritt)</span>
                    <textarea
                      className="field min-h-[110px] resize-y"
                      placeholder="Till exempel våningsplan, hiss, husdjur eller särskilda önskemål…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 accent-[#55554f]" />
                  <span className="text-[0.92rem] text-ink-soft">
                    Jag godkänner att Abelia behandlar mina uppgifter enligt <Link to="/integritetspolicy" className="underline">integritetspolicyn</Link> och att ni kontaktar mig om offerten. *
                  </span>
                </label>
              </div>
            )}

            {error && (
              <p className="rounded-2xl border border-blush-deep/30 bg-blush-soft px-5 py-3.5 font-medium text-blush-deep">{error}</p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className={cn("glass-btn", step === 1 && "invisible")}>
                ← Föregående
              </button>
              <button type="submit" className="glass-btn-solid">
                {step === 3 ? "Skicka in offertförfrågan" : "Nästa"} <IconArrow className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="glass rounded-2xl p-5">
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                <strong className="text-ink">Så räknar vi.</strong> Välj mellan 312,25 kr/timme eller 45 kr/m² med RUT.
                Utan RUT är priserna exakt dubbla: 624,50 kr/timme eller 90 kr/m². Din valda yta inkluderar de
                tilläggsytor du fyller i. Slutpriset bekräftas skriftligt inom 24 timmar.
              </p>
            </div>
          </div>

          {/* Estimate */}
          <Reveal delay={80}>
            <aside className="space-y-4 lg:sticky lg:top-28">
              <div className="glass rounded-[2rem] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-butter text-butter-deep">
                    <IconTag className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">Din prisuppskattning</h2>
                    <p className="text-[0.78rem] text-ink-soft">Uppdateras direkt när du fyller i</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-[0.88rem]">
                  <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                    <span className="text-ink-soft">Objekt</span>
                    <span className="font-medium">{PROPERTY_TYPES.find((p) => p.id === propertyType)?.label} · {sqm} m² · {rooms} rum</span>
                  </li>
                  <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                    <span className="text-ink-soft">Kök</span>
                    <span className="font-medium">{kitchens} st</span>
                  </li>
                  <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                    <span className="text-ink-soft">Badrum / WC</span>
                    <span className="font-medium">{TOILETS.find((t) => t.id === toilets)?.label}</span>
                  </li>
                  {addGarage && (
                    <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                      <span className="text-ink-soft">Garage</span>
                      <span className="font-medium">{garageSqm} m²</span>
                    </li>
                  )}
                  {addBasement && (
                    <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                      <span className="text-ink-soft">Källare</span>
                      <span className="font-medium">{basementSqm} m²</span>
                    </li>
                  )}
                  {otherPlace.trim() && (
                    <li className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                      <span className="text-ink-soft">Övrig yta</span>
                      <span className="font-medium truncate max-w-[140px]" title={otherPlace}>{otherPlace} · {otherPlaceSqm} m²</span>
                    </li>
                  )}
                  {sel.map((slug) => (
                    <li key={slug} className="flex justify-between gap-3 rounded-xl bg-white/55 px-4 py-2.5">
                      <span className="font-medium">{SERVICES.find((x) => x.slug === slug)?.name}</span>
                      <IconCheck className="h-4 w-4 text-sage-deep" />
                    </li>
                  ))}
                </ul>

                {estimate ? (
                  <div key={`${estimate.basis}-${estimate.due}`} className="estimate-price-pop mt-5 rounded-2xl bg-sage-soft px-5 py-4">
                    <div className="flex justify-between text-[0.9rem]">
                      <span className="text-ink-soft">Prisgrund</span>
                      <span className="font-semibold">{estimate.quantity} {estimate.basis === "sqm" ? "m²" : "tim"}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-[0.9rem]">
                      <span className="text-ink-soft">Utan RUT ({fmtKr(estimate.rateWithoutRut)}/{estimate.basis === "sqm" ? "m²" : "tim"})</span>
                      <span className="font-semibold">{fmtKr(estimate.withoutRut)}</span>
                    </div>
                    {type === "privat" && (
                      <div className="mt-1 flex justify-between text-[0.9rem] text-sage-dark">
                        <span>RUT-avdrag</span>
                        <span className="font-semibold">−{fmtKr(estimate.rutDeduction)}</span>
                      </div>
                    )}
                    <div className="mt-3 flex items-end justify-between border-t border-sage-deep/20 pt-3">
                      <span className="text-[0.85rem] font-semibold text-sage-dark">Att betala {type === "privat" ? "med RUT" : "utan RUT"}</span>
                      <span className="font-display text-[1.85rem] leading-none font-semibold text-sage-dark">
                        {fmtKr(estimate.due)}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.76rem] text-ink-soft">
                      Ren uppskattning enligt vald prismodell. Slutlig omfattning bekräftas skriftligt inom 24 h.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-butter-soft px-5 py-4 text-[0.85rem] text-butter-deep">
                    <p className="flex items-start gap-2">
                      <IconSparkleSmall className="mt-0.5 h-4 w-4 shrink-0" />
                      Välj minst en tjänst så dyker prisuppskattningen upp här – med RUT-avdraget inräknat.
                    </p>
                  </div>
                )}

                <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-white/55 px-4 py-3 text-[0.82rem] text-ink-soft">
                  <IconShield className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sage-deep" />
                  <span><strong className="text-ink">{GUARANTEE.title}.</strong> {GUARANTEE.short}.</span>
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <p className="text-[0.82rem] font-semibold tracking-wider text-ink-soft uppercase">Betalsätt</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <span key={m.name} title={m.note} className="glass-chip bg-white/70 text-[0.78rem] font-semibold">{m.name}</span>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </form>
      </div>
    </div>
  );
}
