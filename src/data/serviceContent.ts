export type ServiceExtra = {
  promise: string;
  sections: { title: string; body: string }[];
  checklist: string[];
  notIncluded: string[];
  tip: string;
};

export const SERVICE_EXTRA: Record<string, ServiceExtra> = {
  hemstading: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "En vardag som faktiskt fungerar",
        body: "De flesta av våra kunder börjar med hemstädning för att de vill få tillbaka helgen. Efter ett par tillfällen känner städlaget ditt hem utantill – var det dammar, vilka ytor som behöver extra tid och vilket städmedel du föredrar. Resultatet är en städning som går snabbare, blir bättre och aldrig kräver att du förklarar samma sak igen.",
      },
      {
        title: "Material, maskiner och metoder ingår",
        body: "Vi kommer med allt som behövs: miljömärkta städmedel, mikrofiberdukar för varje typ av yta, dammsugare med HEPA-filter och egen avloppsrens för våtrum. Har du egna medel, allergier eller husdjur anpassar vi rutinen efter det – utan extra kostnad.",
      },
      {
        title: "Samma lag, fasta tider, full flexibilitet",
        body: "Vid löpande avtal får du samma städlag och samma tid varje gång. Behöver du byta dag räcker ett meddelande 24 timmar innan. Du kan pausa avtalet vid semestern och börja igen när du kommer hem – ingen bindningstid, bara en uppsägningstid på 30 dagar.",
      },
    ],
    checklist: [
      "Dammsugning av alla golv, mattor och under möbler",
      "Dammtorkning av lister, fönsterbrädor, hyllor och belysning",
      "Disk, diskbänk, spishäll och köksarbetsytor",
      "Torkning av mikro, utsida av ugn och kylskåpsdörr",
      "Rengöring av dusch, handfat, toalett och spegel",
      "Golvtvätt i våtrum och avtorkning av kalla ytor",
    ],
    notIncluded: [
      "Fönsterputsning utifrån (bokas separat eller som tillägg)",
      "Inuti ugn, kylskåp och skåp (ingår i storstädning)",
      "Tvätt, strykning och städning av personliga föremål",
    ],
    tip: "Vill du ha ett jämnt resultat över hela året? Boka hemstädning varannan vecka – då hinner inget damm eller kalk bygga upp sig mellan tillfällena.",
  },
  kontorstading: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "Städning som följer er arbetsdag",
        body: "Vi städar när det passar er – tidigt på morgonen, under lunchen eller efter att sista personen gått hem. Med tydliga checklistor och en fast kontaktperson vet ni exakt vad som görs varje tillfälle och vad nästa avtal omfattar.",
      },
      {
        title: "Frisk arbetsmiljö, färre sjukdagar",
        body: "Handtag, dörrknoppar, gemensamma kök och toaletter är där bakterierna samlas. Vi desinficerar de ytorna varje tillfälle och fyller på förbrukningsmaterial, så att kontoret känns fräscht även på fredagseftermiddagen.",
      },
      {
        title: "En faktura, inga överraskningar",
        body: "Fasta priser per tillfälle, faktura med dragrätt och månadsvis uppföljning. Behöver ni städa extra inför kundbesök, flytt eller större möten löser vi det på kort varsel – utan att byta avtal.",
      },
    ],
    checklist: [
      "Skrivbord, bordsskivor och stolar torkas av",
      "Toaletter rengörs och förbrukningsmaterial fylls på",
      "Kök, pentry och mikrovågsugn rengörs",
      "Dammsugning av mattor och avtorkning av kargolv",
      "Sopor töms och papper/byggavfall sorteras",
      "Gemensamma ytor: entré, hiss och trapphus vid behov",
    ],
    notIncluded: [
      "Fönsterputsning i höga höjder utan stång (erbjuds separat)",
      "Industriell golvvård och maskinpolering",
      "IT-utrustning och personliga skrivbordsföremål",
    ],
    tip: "Börja med två tillfällen per vecka i en månad – sedan justerar vi frekvensen efter hur kontoret faktiskt används.",
  },
  fonsterputsning: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "Ljus är hemmets billigaste lyft",
        body: "Rena fönster förändrar hur hela bostaden upplevs – färgerna kommer tillbaka, rummen känns större och du slipper den grå hinna som byggts upp under hösten. Vi putsar båda sidor av glaset, inklusive karmar, brädor och ramar.",
      },
      {
        title: "Rätt teknik för rätt yta",
        body: "På höga fönster använder vi teleskopstång och rentvattenssystem som lämnar glaset helt fläckfritt utan att nå behöver klättra. För butiksglas och entréer putsar vi före öppning så att kunder möts av kristallklara ytor.",
      },
      {
        title: "Inga droppar, inga spår",
        body: "Vi arbetar uppifrån och ner, torkar av varje ram och lämnar inga vattenlinjer på listerna. Självklart städar vi upp efter oss – inga hinkar, inga droppar på golvet, inget lämnat utom den ljusa utsikten.",
      },
    ],
    checklist: [
      "Alla fönsterglas, både utsida och insida",
      "Fönsterkarmar, ramar och fönsterbrädor",
      "Dörrglas, speglar och glaspartier i entré",
      "Torkning av lister runt fönstren",
      "Kontroll i dagsljus ruta för ruta",
      "Borttagning av spindelväv runt fönstren",
    ],
    notIncluded: [
      "Fönster som är spruckna eller skadade före putsning",
      "Renovering av inbränd smuts eller cementfläckar",
      "Höghusputsning med klättrare (vi rekommenderar specialpartner)",
    ],
    tip: "Kombinera fönsterputsning med hemstädning – då rengörs fönstrens innanmäte samtidigt som vi redan är på plats.",
  },
  flyttningsstading: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "Redo för nyckeln – och depositionen",
        body: "Vid avlämning granskas bostaden mot hyresvärdens eller bostadsrättsföreningens checklista. Vår flyttningsstädning följer den strukturen, och vi lämnar en skriftlig städbeskrivning som du kan visa upp vid överlämningen.",
      },
      {
        title: "Ingen missar ugnen",
        body: "Det är detaljerna som avgör: inuti ugnen, bakom spisen, under handfatet, golvbrunnen, ventilationen och taklister. Vi rengör skåp, garderober och vitvaror – givetvis på utsidan och insidan när de är tömda.",
      },
      {
        title: "Snabb hjälp när det brådskar",
        body: "Flyttdatum kan ändras i sista stund. Vi har flexibla tider och kan ofta boka in flyttningsstädning inom 48 timmar – ibland samma dag. Behöver du hjälp med flyttstäd och bärhjälp samman dag fixar vi det med våra partners.",
      },
    ],
    checklist: [
      "Inuti ugn, kylskåp och frys (vid tomma apparater)",
      "Bakom spis, tvättmaskin och torktumlare",
      "Alla skåp, garderober och hyllor rengörs inuti",
      "Kalkborttagning i dusch, badkar och handfat",
      "Golvbrunn, ventilation och taklister rengörs",
      "Alla fönster putsas och en städbeskrivning lämnas",
    ],
    notIncluded: [
      "Bortforsling av möbler och större avfall",
      "Flytt av möbler som väger mer än 25 kg per person",
      "Målning, tapetsering och snickeriarbeten",
    ],
    tip: "Töm bostaden helt innan städningen – då når vi varje hörn och du slipper att något pockas bort vid granskningen.",
  },
  stortstading: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "Ett hem som känns nytt",
        body: "Storstädning är vårt djupaste uppdrag. Vi börjar uppe och arbetar oss ner: taklister, väggar, fönster, skåp, ugn, kalk i badrum och golv som fått sig en ordentlig omgång. Det tar tid – men resultatet syns direkt.",
      },
      {
        title: "Maskiner när händer inte räcker",
        body: "Vid behov tar vi med golvmaskin, mattvättmaskin och ångrengörare. Kalk, fett och inbränd smuts löses upp med professionella medel som får verka – inte med armbågsfett och hopp.",
      },
      {
        title: "Perfekt inför högtid eller ny säsongsstart",
        body: "Många beställer storstädning inför jul, påsk eller när sommarstugan ska öppnas. Andra gör den till en vana en gång per år och låter hemstädningen hålla skicket däremellan. Vi hjälper dig att hitta rätt rytm.",
      },
    ],
    checklist: [
      "Kalk och beläggning rensas ur dusch, badkar och handfat",
      "Ugn, mikro, kyl och frys rengörs inuti",
      "Alla skåp, lådor och hyllor torkas inuti och utvändigt",
      "Väggar, taklister, lister och fönster rengörs",
      "Möbler dammtorkas och golv får en grundputsning",
      "Ljusarmaturer, ventiler och dörrhandtag torkas av",
    ],
    notIncluded: [
      "Målning, snickeri och renoveringsarbeten",
      "Städning av vind, källare och förråd utan avtal",
      "Bortforsling av större föremål",
    ],
    tip: "Boka storstädning på morgonen – då hinner hemmet torka ordentligt innan kvällen och resultatet känns ännu fräschare.",
  },
  byggstading: {
    promise: "Anmärkningar inom 7 dagar åtgärdas alltid kostnadsfritt.",
    sections: [
      {
        title: "Två pass, ett felfritt resultat",
        body: "Byggdamm lägger sig i lager på lager. Därför städar vi i två omgångar: först byggstädning med borttagning av spackel, gips och cementrester, sedan en slutstädning när dammet lagt sig. Då blir bostaden verkligen redo för inflyttning.",
      },
      {
        title: "HEPA-filter som fångar det finaste dammet",
        body: "Vanlig dammsugare blåser bara tillbaka de finaste partiklarna. Vi arbetar med HEPA-filter, våta metoder och dammduk för att fånga det som syns i snedljus – så att dammet inte hamnar i dina lungor eller på nylackerade ytor.",
      },
      {
        title: "Vi samarbetar med hantverkare",
        body: "För byggföretag och fastighetsägare erbjuder vi löpande byggavtal: avlämningsstäd, mellanstädning och slutstädning efter tidplanen. Ni får en fast kontaktperson, tydliga checklistor och faktura per projekt.",
      },
    ],
    checklist: [
      "Byggsopning och borttagning av spackel- och gipsrester",
      "Dammsugning med HEPA-filter i två omgångar",
      "Fönster, karmar och arbetsytor rengörs",
      "Golv rengörs från cement, färg och tejp",
      "Inuti skåp, ugn, handfat och ventilationsgaller",
      "Slutkontroll med dammduk-provet i snedljus",
    ],
    notIncluded: [
      "Bortforsling av större byggavfall och containrar",
      "Skadesanering, mögelsanering och asbestsanering",
      "Byggnation, målning och montering",
    ],
    tip: "Vänta 24–48 timmar efter att bygget avslutats innan slutstädningen – då hinner det finaste dammet att lägga sig så vi kan ta bort det.",
  },
};

export const GUARANTEE = {
  days: 7,
  title: "7 dagars garanti – anmärkningar åtgärdas kostnadsfritt",
  body: "Upptäcker du något inom 7 dagar efter städningen som inte stämmer med avtalet? Hör av dig så kommer vi tillbaka och åtgärdar anmärkningen helt utan kostnad – oftast inom 48 timmar.",
  short: "Anmärkningar åtgärdas kostnadsfritt inom 7 dagar",
};

export const PAYMENT_METHODS = [
  { name: "Swish", note: "Betala direkt med mobilen" },
  { name: "Klarna", note: "Dela upp betalningen" },
  { name: "American Express", note: "Kreditkort" },
  { name: "Visa & Mastercard", note: "Kredit- och betalkort" },
  { name: "Faktura", note: "Med dragrätt för företag" },
];
