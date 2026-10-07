import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BroomMark } from "./Logo";
import { CONTACT } from "../data/contact";
import { IconChat, IconMail, IconSend, IconWhatsApp, IconX } from "./Icons";
import { cn } from "../utils/cn";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  link?: string;
  linkLabel?: string;
};

function botReply(raw: string): Omit<Msg, "id" | "from"> {
  const t = raw.toLowerCase();
  if (/(pris|kostar|priser|budget|dyr)/.test(t))
    return {
      text: "Vår prissättning är enkel: 312,25 kr per timme eller 45 kr per m² med RUT. Utan RUT är priserna exakt dubbla: 624,50 kr per timme eller 90 kr per m². Välj prismodell i formuläret så ser du en uppskattning direkt.",
      link: "/offert",
      linkLabel: "Räkna ut ditt pris →",
    };
  if (/(omr[åa]de|områden|t[åa]cker|var bor|vart [åa]ker|bor[åa]s|ulricehamn|alings[åa]s|skene|g[öo]teborg)/.test(t))
    return {
      text: "Vi erbjuder städning i Borås, Ulricehamn, Alingsås, Skene och Göteborg. Är du osäker på om vi kan komma till din adress? Skicka ett mejl så hjälper vi dig.",
    };
  if (/(boka|bokning|ledig tid|boka tid|best[åa]ll)/.test(t))
    return {
      text: "Bokningen tar två minuter och går på 4 enkla steg: välj tjänst, ange detaljer, välj tid, bekräfta. Du får bekräftelse med städlagets namn inom 2 timmar (vardagar).",
      link: "/bokning",
      linkLabel: "Starta bokningen →",
    };
  if (/(offert|quote|skattard)/.test(t))
    return {
      text: "Gärna! Vår offertformulär är öppet för både privatpersoner och företag – du väljer tjänst, anger ytan i m² och får en uppskattning direkt. En skriftlig offert med fast pris kommer inom 24 timmar.",
      link: "/offert",
      linkLabel: "Skapa din offert →",
    };
  if (/[öo]ppen|öppettid|tider|n[åa]r [åa]r ni|senast|tidigast|l[åa]ngre/.test(t))
    return {
      text: "Vi är öppna måndag–fredag 07–19, lördag 09–17. På söndagar och kvällar bokar vi in efter förfrågan – särskilt inför jul och flyttdagar.",
    };
  if (/(f-?skatt|förs[åa]kring|försäkrade|lita|s[åa]ker|anst[åa]lld|sak)/.test(t))
    return {
      text: "För frågor om trygghet, försäkring eller villkor hjälper vårt team gärna till via e-post. Skriv till Abeliainfo1@gmail.com så återkommer vi med korrekt information för just din bokning.",
    };
  if (/(garanti|n[åo]jd|kommer tillbaka|om det inte)/.test(t))
    return {
      text: "Vi ger 7 dagars garanti. Upptäcker du något inom 7 dagar som inte stämmer med avtalet, åtgärdar vi anmärkningen helt utan kostnad – oftast inom 48 timmar.",
    };
  if (/(hemst[åa]d|hemmet|bostad|l[åa]gen|varje vecka)/.test(t))
    return {
      text: "Hemstädning kan beräknas till 312,25 kr per timme eller 45 kr per m² med RUT. Utan RUT är priset 624,50 kr per timme eller 90 kr per m². Tjänsten täcker dammsugning, kök, ytor och våtrum enligt checklistan.",
      link: "/tjanster/hemstading",
      linkLabel: "Läs mer om hemstädning →",
    };
  if (/(kontor|arbetsplats|lokal|butik)/.test(t))
    return {
      text: "Kontorstädning beräknas till 624,50 kr per timme eller 90 kr per m² utan RUT. Vi erbjuder faktura och anpassar schemat efter er verksamhet – kvällar, nätter eller dagtid.",
      link: "/tjanster/kontorstading",
      linkLabel: "Läs mer om kontorstädning →",
    };
  if (/(f[öo]nster|puts|glas|ruta)/.test(t))
    return {
      text: "Fönsterputsning beräknas med samma tydliga prismodell: 312,25 kr per timme eller 45 kr per m² med RUT, och det dubbla utan RUT. Glas, karmar, ramar och brädor kan ingå enligt vald omfattning.",
      link: "/tjanster/fonsterputsning",
      linkLabel: "Läs mer om fönsterputsning →",
    };
  if (/(flytt|nyckel|deposition|hyresv[åa]rd)/.test(t))
    return {
      text: "Flyttningsstädning beräknas till 45 kr per m² eller 312,25 kr per timme med RUT, och det dubbla utan RUT. Vi arbetar enligt en detaljerad checklista och lämnar en städbeskrivning för överlämningen.",
      link: "/tjanster/flyttningsstading",
      linkLabel: "Läs mer om flyttningsstädning →",
    };
  if (/(stortst[åa]d|grund|djup)/.test(t))
    return {
      text: "Storstädning beräknas till 45 kr per m² eller 312,25 kr per timme med RUT, och det dubbla utan RUT. Den går djupare: kalk ur dusch, inuti skåp och ugn, väggar och lister.",
      link: "/tjanster/stortstading",
      linkLabel: "Läs mer om stortstädning →",
    };
  if (/(bygg|renover|hantverk|gips|cement)/.test(t))
    return {
      text: "Bygg- och renoveringsstädning beräknas till 624,50 kr per timme eller 90 kr per m² utan RUT. Arbetet kan göras i två pass med HEPA-filter, klart för nyckel och inflyttning.",
      link: "/tjanster/byggstading",
      linkLabel: "Läs mer om byggstädning →",
    };
  if (/(hej|hei|hall[åo]|tjena|god dag|god morgon|god kv[åa]ll)/.test(t))
    return {
      text: "Hej! Kul att höra från dig. Jag kan hjälpa dig med priser, tider, områden, försäkringar och bokning. Fråga bara – eller tryck på en fråga nedan.",
    };
  if (/(tack|super|bra|mysigt|snyggt)/.test(t))
    return {
      text: "Tack! Hör du av dig fler frågor, så är jag här. Vill du ha hjälp med en bokning så hittar du den längst upp i sidmenyn.",
    };
  if (/(mat|medel|milj[öo]|ekologisk|doft)/.test(t))
    return {
      text: "Vi städar med certifierade, miljömärkta städmedel. Har du egna medel eller vill du ha en doft i hemmet – säg till, vi tar med det utan extra kostnad.",
    };
  if (/(hemma|nyckel|kod|fardigkod|las|saker|säker|trygg|nyckellåda)/.test(t))
    return {
      text: "De flesta av våra kunder väljer färdigkod eller nyckellåda. Du får alltid städlagets namn och bild innan besöket, och vi är försäkrade. Vill du vara hemma? Det fungerar också utmärkt.",
    };
  return {
      text: "Jag hjälper dig gärna! Fråga om priser, områden, försäkringar eller hjälp med en bokning – eller tryck på en av frågorna nedan. Föredrar du människa? Skriv till Abeliainfo1@gmail.com.",
  };
}

const QUICK = ["Vad kostar det?", "Vilka områden täcker ni?", "Boka en tid", "Öppettider", "F-skatt & försäkring"];

export default function FloatingDock() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      from: "bot",
      text: "Hej! Jag är Abelia Assistent. Fråga mig om priser, tider, områden eller hjälp att boka din städning.",
    },
  ]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMsgs((m) => [...m, { id: idRef.current++, from: "user", text: clean }]);
    setInput("");
    setTyping(true);
    const reply = botReply(clean);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: idRef.current++, from: "bot", ...reply }]);
    }, 850 + Math.random() * 500);
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={cn(
          "fixed right-4 bottom-28 z-50 flex w-[min(92vw,375px)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/60 bg-cream/90 shadow-soft backdrop-blur-2xl transition-all duration-300 sm:right-6",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ height: "min(600px, calc(100dvh - 190px))" }}
        role="dialog"
        aria-label="Abelia Assistent"
        aria-hidden={!open}
      >
        <div className="flex items-center gap-3 bg-sage-deep px-4 py-3.5 text-cream">
          <BroomMark className="h-9 w-9 text-sage-soft" />
          <div className="flex-1 leading-tight">
            <p className="font-display text-[1.05rem] font-semibold">Abelia Assistent</p>
            <p className="flex items-center gap-1.5 text-[0.72rem] text-cream/75">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9fe0a2]" />
              Svarar omedelbart · 24/7
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-1.5 transition hover:bg-white/15" aria-label="Stäng chatten">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {msgs.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9rem] leading-relaxed",
                  m.from === "user"
                    ? "rounded-br-md bg-sage-deep text-cream"
                    : "rounded-bl-md border border-white/70 bg-white/75 text-ink shadow-sm"
                )}
              >
                {m.text}
                {m.link && (
                  <Link
                    to={m.link}
                    onClick={() => setOpen(false)}
                    className="mt-2 block font-semibold text-sage-deep underline decoration-sage/60 underline-offset-4 hover:text-sage-dark"
                  >
                    {m.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/70 bg-white/75 px-4 py-3 shadow-sm">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/60 bg-white/40 px-3 py-3">
          <div className="mb-2.5 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="shrink-0 rounded-full border border-sage/60 bg-sage-soft px-3 py-1.5 text-[0.75rem] font-medium text-sage-dark transition hover:bg-sage"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv din fråga…"
              className="field rounded-full py-2.5 text-[0.9rem]"
              aria-label="Din fråga till Assistenten"
            />
            <button
              type="submit"
              className="glass-btn-solid rounded-full p-3"
              aria-label="Skicka meddelande"
            >
              <IconSend className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Buttons */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <button
          onClick={() => {
            setOpen((o) => !o);
            setUnread(false);
          }}
          className="glass relative rounded-full p-4 text-ink transition hover:scale-105"
          aria-label={open ? "Stäng Abelia Assistent" : "Öppna Abelia Assistent"}
        >
          {open ? <IconX className="h-6 w-6" /> : <IconChat className="h-6 w-6" />}
          {unread && !open && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-deep opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-cream bg-blush-deep" />
            </span>
          )}
        </button>

        <a
          href="https://wa.me/46701234567?text=Hej%20Abelia!%20Jag%20vill%20veta%20mer%20om%20ert%20stadservice."
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#25d366] text-white shadow-[0_12px_28px_-10px_rgb(37_211_102/0.7)] transition hover:scale-105 hover:shadow-[0_16px_34px_-10px_rgb(37_211_102/0.8)]"
          aria-label="Skicka ett WhatsApp-meddelande"
        >
          <IconWhatsApp className="h-7 w-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-medium text-cream opacity-0 transition group-hover:opacity-100 sm:block">
            Chatta på WhatsApp
          </span>
        </a>

        <a
          href={CONTACT.emailHref}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-sage-dark text-cream shadow-[0_12px_28px_-10px_rgb(30_30_28/0.62)] transition hover:scale-105 hover:bg-ink"
          aria-label="Skicka e-post till Abelia Städ & Service"
        >
          <IconMail className="h-6.5 w-6.5" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-medium text-cream opacity-0 transition group-hover:opacity-100 sm:block">
            Skriv till Abelia
          </span>
        </a>
      </div>
    </>
  );
}
