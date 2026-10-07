export type Accent = "sage" | "blush" | "lav" | "butter" | "sky";

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  priceNote: string;
  img: string;
  accent: Accent;
  icon: string;
  duration: string;
  intro: string[];
  includes: string[];
  goodFor: string[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const ACCENTS: Record<
  Accent,
  { soft: string; deep: string; solid: string }
> = {
  sage: { soft: "bg-sage-soft", deep: "text-sage-deep", solid: "bg-sage" },
  blush: { soft: "bg-blush-soft", deep: "text-blush-deep", solid: "bg-blush" },
  lav: { soft: "bg-lav-soft", deep: "text-lav-deep", solid: "bg-lav" },
  butter: { soft: "bg-butter-soft", deep: "text-butter-deep", solid: "bg-butter" },
  sky: { soft: "bg-sky-soft", deep: "text-sky-deep", solid: "bg-sky" },
};

export const SERVICES: Service[] = [
  {
    slug: "hemstading",
    name: "Hemstädning",
    short: "Din vardagsstädning – planerad, löpande eller enskild.",
    tagline: "Kamma hem och ta helgen. Vi städar, du får tiden tillbaka.",
    priceNote: "312,25 kr/tim eller 45 kr/m² med RUT",
    img: "https://images.pexels.com/photos/7641347/pexels-photo-7641347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "sage",
    icon: "home",
    duration: "1–3 h per städning",
    intro: [
      "Vår hemstädning är den tjänst allra flest av våra kunder börjar med. En eller två utbildade städare kommer med eget material och maskiner och går igenom hela hemmet enligt vår detaljerade checkliste – från dammtorkning och dammsugning till disk, duschväggar och toaletter.",
      "Beställ en enskild städning inför en fest eller sätt upp en löpande rutin som passar ditt liv. Vid löpande städning får du samma städlag, fasta tider och samma transparenta pris per timme eller kvadratmeter.",
    ],
    includes: [
      "Dammsugning & dammtorkning av alla ytor",
      "Disk & diskbänk, spishäll & köksarbetsytor",
      "Duschväggar, toalett & handfat",
      "Städning av kalla ytor i kök & badrum",
      "Golvstvädning i vått rum",
      "Sömgodkännande – du kan kolla genom efteråt",
    ],
    goodFor: ["Vardagslyft", "Löpande rutin", "Förfest & -kväll", "Hyresavlämning"],
    process: [
      "Vi bokar en tid som passar dig",
      "Städlaget kommer med allt material",
      "Vi städar enligt checklistan, rum för rum",
      "Du godkänner – 7 dagars garanti gäller",
    ],
    faqs: [
      {
        q: "Måste jag vara hemma under städningen?",
        a: "Nej. De flesta av våra kunder väljer färdigkod eller utlämnar nyckel. Du får en bekräftelse med städlagets namn och bild innan besöket så du alltid vet vem som kommer.",
      },
      {
        q: "Vilka städmedel använder ni?",
        a: "Vi städar med certifierade, miljömärkta produkter. Har du egna medel eller vill du ha en extra doft i hemmet – säg till, vi tar med det.",
      },
      {
        q: "Hur lång tid tar en städning av tvåa eller trea?",
        a: "En tvåa tar oftast cirka 1,5 timmar och en trea runt 2–2,5 timmar, beroende på tillstånd. Vid första städningen kan det ta lite längre om hemmet behöver ett grundläggande lyft.",
      },
    ],
  },
  {
    slug: "kontorstading",
    name: "Kontorstädning",
    short: "Rens arbetsplats med fast schema – kvällar, nätter eller dagtid.",
    tagline: "Ett fräscht kontor får ditt team att må bättre. Vi fixar rytmen.",
    priceNote: "624,50 kr/tim eller 90 kr/m² utan RUT",
    img: "https://images.pexels.com/photos/36303748/pexels-photo-36303748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "sky",
    icon: "office",
    duration: "2–4 h per tillfälle",
    intro: [
      "Vi städar allt från enstaka hemmakontor till kontorsvåningar och lokaler. Skicket lägger vi upp tillsammans med dig: skrivbord och möten i skuggan av personalen, toaletter och disk på kvällen eller natten – hur som passar din verksamhet.",
      "För företag ger vi faktura med dragrätt och fast pris per tillfälle, så du slipser budgetöverraskningar. Vi tar även hand om entréer, hissar och gemensamma utrymmen om ni har ett gemensamt avtal med fastighetsägaren.",
    ],
    includes: [
      "Skrivbord, fönsterbrädor & arbetsytor",
      "Toaletter & kök: rengöring & påfyllning",
      "Dammsugning av mattor & kargolv",
      "Skyltar, dörrar & knoppar",
      "Kylskåpskontroll & sopsortering",
      "Rapporter & checklista per tillfälle",
    ],
    goodFor: ["Kontor & byråer", "Butiker & lokaler", "Skolor & förskolor", "Vård & rehab"],
    process: [
      "Genomgång av lokalen & önskemål",
      "Fast pris & schema som passar er",
      "Städning enligt er checklista",
      "Månadlig uppföljning & justering",
    ],
    faqs: [
      {
        q: "Kan ni städa utanför kontorstid?",
        a: "Absolut – det är oftast det som fungerar bäst. Vi städar kvällar, nätter och helger med färdigkod eller nyckelförvaring. Larm anpassas efter era regler.",
      },
      {
        q: "Hur snabbt kan vi komma igång?",
        a: "De flesta nya kunder är igång inom 3–5 arbetsdagar. Behöver det gå snabbare kan vi ofta lösa det – hör av dig.",
      },
      {
        q: "Får vi faktura med dragrätt?",
        a: "Ja, alltid. Vi skickar faktura med dragrätt och löpande avtal, och ni kan säga upp med 30 dagars varsel.",
      },
    ],
  },
  {
    slug: "fonsterputsning",
    name: "Fönsterputsning",
    short: "Inga spår, inga droppar – bara ljus.",
    tagline: "Ljuset tillbaka i hemmet. Vi putsar glas, ramar och brädor.",
    priceNote: "312,25 kr/tim eller 45 kr/m² med RUT",
    img: "https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "lav",
    icon: "window",
    duration: "1–2 h per bostad",
    intro: [
      "Rena fönster förändrar hela rummet. Vi putsar alla utrymmesglas, karmar, brädor och ramar – baksidan med fönsterputsar och framsidan med mjukduk, för en spårfri yta.",
      "Tjänsten passar utmärkt som tillägg till en hemstädning eller som egentillfälle inför sommaren. Vid löpande hemstädning ingår en fri fönsterputsning per år.",
    ],
    includes: [
      "Utrymmesglas, framsida & baksida",
      "Fönsterkarmar, ramar & brädor",
      "Dörrglas & speglar i våtrum",
      "Inga spår – vi kontrollerar varje ruta",
      "Kombinera enkelt med hemstädning i samma offert",
      "Fri putsning ingår i löpande hemstädpaket",
    ],
    goodFor: ["Bostad & villa", "Butiksfasader", "Kontor", "Föreningar"],
    process: [
      "Vi bokar en tid – gärna med hemstädning",
      "Vi börjar uppe och arbetar oss ner",
      "Ramar & brädor rengörs noggrant",
      "Slutkontroll i dagsljus, ruta för ruta",
    ],
    faqs: [
      {
        q: "Putsar ni även utvändigt?",
        a: "För villor med trädgårdssida och butiker med fasadglas erbjuder vi utvändig putsning med stång och vatten – pris efter höjd och glasarea.",
      },
      {
        q: "Vad kostar putsning av en vanlig tvåa?",
        a: "Priset beräknas i formuläret: 312,25 kr per timme eller 45 kr per m² med RUT. Utan RUT är priset exakt det dubbla.",
      },
      {
        q: "Fungerar det även med flyttglas och spegelglas?",
        a: "Ja, vi hanterar flyttglas, spegelglas och karmar i aluminium och trä. Specialglas markerar vi i förväg.",
      },
    ],
  },
  {
    slug: "flyttningsstading",
    name: "Flyttningsstädning",
    short: "Bostaden i skick för nyckel – och depositumet säkrat.",
    tagline: "Flyttar du? Vi städar så att nyckeln – och depositionen – landar hos dig.",
    priceNote: "312,25 kr/tim eller 45 kr/m² med RUT",
    img: "https://images.pexels.com/photos/4498122/pexels-photo-4498122.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "butter",
    icon: "box",
    duration: "3–5 h beroende på storlek",
    intro: [
      "Efter en flytt kräver bostaden en ordentlig grundstädning – inuti skåp och ugn, bakom spis, bakom handfat och i hörnen som vardagen aldrig når. Vår flyttningsstädning gör bostaden fotogen och redo för nyckel.",
      "Arbetet utförs enligt vår 60-punktarschecklista och vi lämnar en städbeskrivning som du kan visa upp vid överlåtelse. Har din hyresvärd egna krav – skicka dem till oss så tar vi med dem.",
    ],
    includes: [
      "Inuti skåp, ugn & kyl (tomt innehåll)",
      "Bakom spis, handfat & tvättmaskin",
      "Alla väggar, lister & fönster",
      "Golv: dammsug & städa i vått rum",
      "Toalett & handfat – kalk & beläggning bort",
      "Städbeskrivning för överlämning",
    ],
    goodFor: ["Hyresavlämning", "Nyckelväska", "Samma-dagsflytt", "Försäljning av bostad"],
    process: [
      "Du berättar bostadens storlek & skick",
      "Fast pris & tid – ofta inom 48 h",
      "Vi städar enligt 60-punkterschecklista",
      "Städbeskrivning + 7 dagars garanti",
    ],
    faqs: [
      {
        q: "Hinner ni städa om vi flyttar imorgon?",
        a: "Ofta ja. Ring eller skicka en meddelande på morgonen – vi har flexibla tider och kan oftast boka in samma dag eller nästa dag.",
      },
      {
        q: "Måste allting vara bortpackat?",
        a: "Bästa resultatet får vi med en tom bostad, men vi städar även med resterande möbler – vi flyttar på det vi behöver.",
      },
      {
        q: "Vad kostar det för en trea på 60 m²?",
        a: "Ange bostadens yta och välj prismodell i formuläret. Priset är 45 kr per m² eller 312,25 kr per timme med RUT, och exakt det dubbla utan RUT.",
      },
    ],
  },
  {
    slug: "stortstading",
    name: "Stortstädning",
    short: "Hos oss – grundputsning av allt, från taklist till golv.",
    tagline: "En storstädning ger hemmet – och hjärnan – ett nytt startläge.",
    priceNote: "312,25 kr/tim eller 45 kr/m² med RUT",
    img: "https://images.pexels.com/photos/4098925/pexels-photo-4098925.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "blush",
    icon: "deep",
    duration: "3–6 h beroende på storlek",
    intro: [
      "En storstädning går betydligt djupare än en vanlig städning. Vi tar bort kalk i badrumsrummet, rengör inuti skåp och ugn, städar bakom möblerna och ger taklister och väggarna ett fräsch utseende.",
      "Många av våra kunder beställer en storstädning inför jul, sommarnöje eller som första steg innan löpande hemstädning. Resultatet: ett hem som känns nytt – utan att du behöver röra en mopp.",
    ],
    includes: [
      "Kalk & beläggning ur dusch & handfat",
      "Ugn, kyl & skåp inuti",
      "Väggar, lister, tak & fönster",
      "Golv: grundputsning & maskin på begäran",
      "Skorsten & ventilation",
      "Batterier, ventiler & ljusarmaturer",
    ],
    goodFor: ["Inför jul", "Sommarnöje", "Före löpande avtal", "Våra bostäder"],
    process: [
      "Skicka bostadsuppgifter – vi räknar priset",
      "Bokar en tid med 2–3 städare",
      "Grundputsning enligt checklistan",
      "Går igenom med dig – garanti 7 dagar",
    ],
    faqs: [
      {
        q: "Vad är skillnaden mot hemstädning?",
        a: "Hemstädning underhåller, storstädning renoverar. Vi rengör ytor som sällan nås – inuti skåp, bakom ugnen, kalk i badrumsrummet – och jobbar med 2–3 personer för ett effektivt resultat.",
      },
      {
        q: "Kan ni maskinrengöra mattor och golv?",
        a: "Ja, vi har maskiner för mattor, möbler och hårda golv. Lägg till maskinrengöring i formuläret så tar vi med omfattningen i den skriftliga bekräftelsen.",
      },
      {
        q: "Hur ofta bör jag storstäda?",
        a: "1–2 gånger per år räcker för de flesta hushåll. Börja inför jul eller vår – så håller hemmet skicket mellan städningarna.",
      },
    ],
  },
  {
    slug: "byggstading",
    name: "Bygg- & renoveringsstädning",
    short: "Efter bygget – före nyckeln. Ståltorra ytor, dammfria hörn.",
    tagline: "Bygget är klart. Nu gör vi så att bostaden kan flyttas in i.",
    priceNote: "624,50 kr/tim eller 90 kr/m² utan RUT",
    img: "https://images.pexels.com/photos/4098322/pexels-photo-4098322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "sage",
    icon: "helmet",
    duration: "4–8 h per omgång",
    intro: [
      "Efter en renovering ligger det damm i varje spricka – cementfläckar, gips, spackel och byggskräp. Vår byggstädning ger bostaden en grundläge för inflyttning: vi städar i två omgångar och tar det sista dammet som syns i snedljus.",
      "Vi samarbetar även med hantverkare och fastighetsägare som behöver byggröjning och slutstädning. Kontakta oss gärna för offert med fast pris.",
    ],
    includes: [
      "Byggsopning & dammfångning i två pass",
      "Golv: rengöring av cement & gipsrester",
      "Fönster, karmar & arbetsytor",
      "Inuti skåp, ugn & handfat",
      "Städning av trapphus & entré på begäran",
      "Slutkontroll med dammduk-provet",
    ],
    goodFor: ["Efter renovering", "Nytt bygg", "Fastighetsägare", "Hantverkare"],
    process: [
      "Besiktning av byggnadens skick",
      "Omgång 1: byggröjning & grundputsning",
      "Omgång 2: detaljrens & dammfångning",
      "Slutkontroll – klart för nyckeln",
    ],
    faqs: [
      {
        q: "Vad är skillnaden mot flyttningsstädning?",
        a: "Ett byggt objekt har damm i alla lager – golv, fönster, ventilation och inuti skåp. Därför städar vi i två pass med dammsugare med HEPA-filter. En flyttningsstädning handlar om ett boende hem.",
      },
      {
        q: "Tar ni även byggavfall?",
        a: "Vi tar småavfall och damm. Större byggsopor hanterar du eller byggherren – men vi kan tipsa om en godkänd entreprenör om ni önskar.",
      },
      {
        q: "Vad kostar byggstädning av en trea?",
        a: "Byggstädning beräknas till 624,50 kr per timme eller 90 kr per m² utan RUT. Exakt omfattning bekräftas efter genomgång av bostaden.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string | undefined) =>
  SERVICES.find((s) => s.slug === slug);

/* ---------- Transparent RUT pricing used by every form ---------- */
export type PriceBasis = "hour" | "sqm";

export const PRICING = {
  withRut: {
    hour: 312.25,
    sqm: 45,
  },
  withoutRut: {
    hour: 624.5,
    sqm: 90,
  },
} as const;

export function calculatePrice(basis: PriceBasis, quantity: number, rutEligible: boolean) {
  const safeQuantity = Math.max(0, quantity || 0);
  const withRut = safeQuantity * PRICING.withRut[basis];
  const withoutRut = safeQuantity * PRICING.withoutRut[basis];

  return {
    basis,
    quantity: safeQuantity,
    rateWithRut: PRICING.withRut[basis],
    rateWithoutRut: PRICING.withoutRut[basis],
    withRut,
    withoutRut,
    rutDeduction: withoutRut - withRut,
    due: rutEligible ? withRut : withoutRut,
  };
}

export const fmtKr = (n: number) =>
  n
    .toLocaleString("sv-SE", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    })
    .replace(/\u00a0/g, "\u2009") + " kr";
