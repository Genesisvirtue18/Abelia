import { Link } from "react-router-dom";
import { CONTACT } from "../data/contact";
import Reveal from "../components/Reveal";
import { IconSparkleSmall } from "../components/Icons";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Vem är datansvarig?",
    body: (
      <p>
        Datansvarig är Abelia Städ &amp; Service. Vid frågor
        om hur vi hanterar dina personuppgifter kontakta{" "}
        <a href={CONTACT.emailHref} className="font-semibold text-sage-dark underline">
          {CONTACT.email}
        </a>
        .
      </p>
    ),
  },
  {
    title: "2. Vilka personuppgifter samlar vi in?",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Kontaktuppgifter: namn, e-postadress, telefonnummer och adress (vid bokningar och offertförfrågningar).</li>
        <li>Bokningsuppgifter: vald tjänst, datum, tid, yta och ev. särskilda instruktioner.</li>
        <li>
          Företagsuppgifter: företagsnamn och organisationnummer, endast vid bokningar av typen företag.
        </li>
        <li>Tekniska uppgifter: IP-adress, webbläsare och besöksdata, insamlad via cookies och analysverktyg.</li>
      </ul>
    ),
  },
  {
    title: "3. Varför behandlar vi dina uppgifter?",
    body: (
      <p>
        Vi behandlar dina personuppgifter för att utföra avtal med dig (bokningar, städtjänster och support), för att
        besvara dina förfrågningar och offertbegär, samt – med ditt samtycke – för att skicka nyheter och relevanta
        erbjudanden. Vi behandlar uppgifterna i enlighet med GDPR:s grundprinciper: rättsmässighet, ändamålsbeskränkning,
        datapåliggande, korrekthet, tidsbegränsning och integritet.
      </p>
    ),
  },
  {
    title: "4. Vem delar vi uppgifterna med?",
    body: (
      <p>
        Vi säljer aldrig dina personuppgifter. Uppgifterna delas endast med tjänsteleverantörer som hjälper oss att
        driva verksamheten, exempelvis bokningssystem, bokföring och IT-drift. Alla dessa aktörer är skyldiga att
        hantera uppgifterna konfidentiellt. Uppgifterna kan även lämnas över till behöriga myndigheter om det krävs
        enligt lag.
      </p>
    ),
  },
  {
    title: "5. Hur länge sparar vi uppgifterna?",
    body: (
      <p>
        Kund- och bokningsuppgifter sparas under pågående avtal samt under den skattetid som gäller (sju år för
        transaktionsuppgifter). Kontaktuppgifter från offerter som inte leder till avtal raderas efter tolv månader,
        om du inte begärt eller bekräftat kontakt på nytt.
      </p>
    ),
  },
  {
    title: "6. Dina rättigheter",
    body: (
      <p>
        Du har rätt att ta del av, rätta, ta bort och begränsa behandlingen av dina personuppgifter, samt rätt att
        invända mot behandlingen och att få ut dina uppgifter i masseinläsbar form. Du har även rätt att klaga
        till Integritetsskyddsmyndigheten (IMY) om du anser att vi bryter mot GDPR. Skicka en förfrågan till{" "}
        <a href={CONTACT.emailHref} className="font-semibold text-sage-dark underline">
          {CONTACT.email}
        </a>{" "}
        – vi återkommer inom en månad.
      </p>
    ),
  },
  {
    title: "7. Cookies & liknande teknik",
    body: (
      <p>
        Vi använder nödvändiga cookies för att sajten ska fungera, samt analytiska cookies (med samtycke) för att
        förstå hur besökare använder webbplatsen. Du kan när som helst ändra dina cookieinställningar i webbläsaren.
        Sajten fungerar lika bra utan valfria cookies.
      </p>
    ),
  },
  {
    title: "8. Säkerhet",
    body: (
      <p>
        Vi arbetar med både tekniska och organisatoriska säkerhetsåtgärder: TLS-krypterad trafik, begränsad
        behörighet, lösenordsskydd och rutiner för incidenthantering. Ingen metod är hundra procent säker, men vi
        gör allt vi kan för att dina uppgifter ska vara i gott förvar.
      </p>
    ),
  },
  {
    title: "9. Betalningar och betalleverantörer",
    body: (
      <p>
        Du kan betala med Swish, Klarna, American Express, kredit- och betalkort eller faktura. När du väljer en
        betalningsmetod delas nödvändiga uppgifter (belopp, namn, e-post och transaktions-ID) med den aktuella
        betalleverantören – Swish, Klarna, American Express respektive vårt kortbetalningsinstitut. Kortnummer lagras
        aldrig av oss utan hanteras krypterat av betalningsleverantören enligt PCI DSS. Betalningsuppgifter sparas
        under den tid som krävs för redovisning och bokföring, enligt svensk lag.
      </p>
    ),
  },
  {
    title: "10. Sociala medier",
    body: (
      <p>
        Vår webbplats länkar till våra profiler på Instagram, Facebook och TikTok. När du klickar på en sådan länk
        lämnar du vår webbplats och gäller då respektive plattforms integritetspolicy. Vi använder inte sociala
        media-spårare på vår egen webbplats utan ditt samtycke.
      </p>
    ),
  },
  {
    title: "11. Garanti och klagomål",
    body: (
      <p>
        Om något inte blev som avtalat har du rätt att påpeka det inom 7 dagar efter genomförd städning. Vi åtgärdar
        då anmärkningen kostnadsfritt. Vill du klaga gör du det till{" "}
        <a href={CONTACT.emailHref} className="font-semibold text-sage-dark underline">
          {CONTACT.email}
        </a>{" "}
        – vi svarar inom 5 arbetsdagar.
      </p>
    ),
  },
  {
    title: "12. Ändringar av policyn",
    body: (
      <p>
        Vi kan uppdatera denna policy från tid till annan, exempelvis vid nya tjänster eller ändrade lagkrav.
        Senaste ändringdatum anges under sidan. Vid större ändringar meddelar vi dig via e-post om du har ett
        pågående avtal med oss.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-lav-soft blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-[0.75rem] font-semibold tracking-[0.3em] text-lav-deep uppercase">Juridiskt</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
            Integritets-<span className="font-script text-4xl text-lav-deep italic sm:text-5xl">policy.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Kort, ärligt och på svenska: här står vad vi samlar in, varför, och vilka rättigheter du har.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 40, 200)}>
              <section className="glass rounded-[1.6rem] p-7 sm:p-9">
                <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
                <div className="mt-3 leading-relaxed text-ink-soft">{s.body}</div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-sage-soft px-6 py-5 text-[0.92rem] text-sage-dark">
          <p>
            <strong>Senast uppdaterad:</strong> 30 mars 2026
          </p>
            <Link to="/kontakt" className="glass-chip py-2 transition hover:scale-105">
              Fråga om uppgifter →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-16 text-center">
          <p className="font-script text-5xl text-sage-deep">Tack för förtroendet.</p>
          <p className="mt-3 text-ink-soft">Frågor? Skicka en e-post till {CONTACT.email}.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/" className="glass-btn">
              <IconSparkleSmall className="h-4 w-4 text-sage-deep" /> Till startsidan
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
