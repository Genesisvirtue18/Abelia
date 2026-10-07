export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  img: string;
  author: string;
  role: string;
  content: BlogBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "checklista-flyttningsstading",
    title: "Checklista: flyttningsstädning från A till Ö",
    excerpt:
      "Nyckeln ska lämna, depositionen ska komma tillbaka. Här är den exakta checklista vi går igenom – och vad hyresvärden oftast kollar efter.",
    date: "12 mars 2026",
    category: "Tips & guider",
    readTime: "6 min",
    img: "https://images.pexels.com/photos/4498122/pexels-photo-4498122.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    author: "Abelia Team",
    role: "Städexperter",
    content: [
      {
        type: "p",
        text: "Ett tomt hem efter en flytt ser ofta bättre ut än det faktiskt är. Damm ligger i hörnen, kalk har satts i duschen och klistertållar har stannat på fönsterkarmarna. Hyresvärden eller nyckeltjänsten har oftast en egen checklista – och den består sällan av 'det ser fint ut'. Här är vad som faktiskt kollar efter, och hur du gör att det går fort.",
      },
      { type: "h2", text: "1. Börja uppe – avsluta nere" },
      {
        type: "p",
        text: "All dammtorkning börjar högst upp i varje rum: taklister, lampor, väggöverskar och karmar. Då landar dammet på golvet och du undviker att städa två gånger. Många som städar själva glömmer listerna – det är en av de tre saker som syns först i en överlåtelse.",
      },
      { type: "h2", text: "2. Badrummet är avgörande" },
      {
        type: "p",
        text: "Kalkbeläggningar i duschen, vid handfatet och runt toaletten är den vanligaste anledningen till att en städning godkänns inte. Använd ett kalkmedel som får sitta i minst fem minuter innan du rensar. Kika även bakom handfatet och under kranen – där växlar beläggningar sig snabbast.",
      },
      { type: "h2", text: "3. Köket: inuti och bakom" },
      {
        type: "p",
        text: "Hyresvärden öppnar skåp. Det betyder att det syns: inuti dörren, på hyllorna och under skåpet. Ugnen städas med ett ugnmedel som får verka över natten om det är rejält. Spisen bakom, fläktens fält och kylskåpets baksida får inte heller glömmas.",
      },
      { type: "h2", text: "4. Fönster & golv – sista steget" },
      {
        type: "p",
        text: "Fönstren putsas allra sist, och golven sveps eller moppas efter att allt damm fallit ner. Dammsug mattan även mot listerna – det är där det sista dammet samlas. I sista laget: en dammduk på ett bord i dagsljus. Syns dammet på den, syns det för alla.",
      },
      { type: "h2", text: "5. Dokumentera resultatet" },
      {
        type: "p",
        text: "Fotografera bostaden rum för rum – tomt och städat. Vid överlämning har du då ett kvitto på skicket, och om du anlitar oss lämnar vi dessutom en skriftlig städbeskrivning som du kan lämnar till hyresvärden eller nyckeltjänsten.",
      },
      {
        type: "ul",
        items: [
          "Boka 48 h före nyckel – det ger både er och oss en bra tid.",
          "Kör ut all bostadsinventarier så syns dammet bäst.",
          "Ha en dammduk redo för slutprovet i snedljus.",
          "Spara städbeskrivningen tills depositionen kommit tillbaka.",
        ],
      },
    ],
  },
  {
    slug: "tecken-hemmet-behover-en-storstading",
    title: "5 tecken på att hemmet behöver en ordentlig storstädning",
    excerpt:
      "Vardagsstädningen håller ytan. Men det finns signaler som säger att det är dags att gå djupare. Så upptäcker du att hemmet behöver ett grundläggande lyft.",
    date: "28 februari 2026",
    category: "Städtips",
    readTime: "4 min",
    img: "https://images.pexels.com/photos/4098925/pexels-photo-4098925.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    author: "Maja Lindgren",
    role: "Huvudstäderska",
    content: [
      {
        type: "p",
        text: "En vanlig hemstädning underhåller. Men varje hem har en punkt där 'renovering' inte längre räcker – då behöver man en storstädning. Efter tusentals hem som vi städat kan vi känna igen signalerna snabbt. Här är de fem vanligaste.",
      },
      { type: "h2", text: "1. Duschväggen har 'milkatja'" },
      {
        type: "p",
        text: "Den gråa, matta filmen på glas och kakel är kalk som sätter sig lager på lager. Efter ett par år sitter den så pass hårt att den inte kan torkas – den måste renoveras bort med medel som får verka. När tvålspön torkar in till en film under en timme: det är dags.",
      },
      { type: "h2", text: "2. Golvet glansar även efter dammsugning" },
      {
        type: "p",
        text: "Finns det en dammring vid listerna och en grå skugga under soffan även direkt efter dammsugning, är det dags för en golvgodgörare eller en maskinrensning. Det lagret sitter djupare än vad någon städmopp når vardagligen.",
      },
      { type: "h2", text: "3. Köksskåpen luktar" },
      {
        type: "p",
        text: "Doften kommer oftast från hyllbotten, inuti dörren och under diskbänken. När du öppnar ugnen och ser det som låg kvar från i fjol, har ugnen också sagt sitt. Inuti ytor är precis det som ingår i vår storstädning – och sällan i en hemstädning.",
      },
      { type: "h2", text: "4. Ljuset känns grått" },
      {
        type: "p",
        text: "Lyser ljuset genom fönstret men rummet känns ändå trött, är det oftast fönstren, lamporna och listerna som filterat in dammet. Ett hem med rutschade fönster och dammfria lister ljusnar märkbart – ibland behöver man inte ens byta gardiner.",
      },
      { type: "h2", text: "5. Du städar snabbare för att det inte känns 'rätt'" },
      {
        type: "p",
        text: "Det är tecknet vi gillar bäst: din egen känsla. När du börjar skippa hörnen och städar i cirkel istället för i rum, vet hemmets invånare redan att det behöver ett grundläggande lyft.",
      },
      {
        type: "p",
        text: "Vår rekommendation: storstäda 1–2 gånger per år, gärna inför jul och vår. Sedan håller en löpande hemstädning eller egen vardagsrutin resultatet hela året.",
      },
    ],
  },
  {
    slug: "sa-valjer-du-ett-stadforetag",
    title: "Så väljer du ett städföretag du kan lita på",
    excerpt:
      "Lågt pris på Facebook, oklara avtal och städare som aldrig blir desamma. Fem frågor som sorterar bort riskerna – innan du bokat.",
    date: "14 februari 2026",
    category: "Råd",
    readTime: "5 min",
    img: "https://images.pexels.com/photos/6197121/pexels-photo-6197121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    author: "Elin Aro",
    role: "VD & grundare",
    content: [
      {
        type: "p",
        text: "Det finns många städföretag i Borås och Göteborg, och priserna skiljer sig mycket. Skillnaden mellan 200 kr och 500 kr för en hemstädning handlar sällan om 'fler mopp'. Det handlar om försäkring, skatter, utbildning och hur mycket som ingår i priset. Här är frågorna vi själva skulle ställa.",
      },
      { type: "h2", text: "1. Har företaget F-skatt och hur ser arbetsmodellen ut?" },
      {
        type: "p",
        text: "Be om att få se F-skattsedel eller org.nr på bolaget som fakturor – inte på 'partnern som utför jobbet'. Många billiga aktörer är i praktiken privatpersoner som jobbar utan avdrag för arbetsgivaravgifter. Det är en risk för både dig och samhället.",
      },
      { type: "h2", text: "2. Vad ingår exakt i priset?" },
      {
        type: "p",
        text: "Material, resan, skåp – ingår det? 'Pris exkl. material' kan snabbt dubbla den totala kostnaden. Vid oss är priset alltid fast och material ingår – du får ett pris du kan lita på, inte en uppskattning som växer vid kassan.",
      },
      { type: "h2", text: "3. Är städarna försäkrade och utbildade?" },
      {
        type: "p",
        text: "Rensar du nyckeln och städaren skadar ett fönster? Då vill du att företaget har en ansvarsförsäkring och att städaren är anställd – inte en 'uppdragstagare' som försvinner. Fråga rakt ut, och be ett skriftligt svar.",
      },
      { type: "h2", text: "4. Finns det en rutin kring kvalitet?" },
      {
        type: "p",
        text: "Bra företag jobbar med checklista och har en enkel väg att åtgärda. Fråga: 'Om det inte blev som tänkt – vad händer?' Hos oss åtgärdas anmärkningar kostnadsfritt inom 7 dagar – vi kommer tillbaka och rättar till.",
      },
      { type: "h2", text: "5. Känner du igen dig i kontakten?" },
      {
        type: "p",
        text: "Om förfrågan tar tre dagar och svaren är vagt, bli det sällan bättre. Ett företag du kan lita på svarar inom ett par timmar, ger fast pris och berättar vem som kommer med bild och namn. Det ligger i grunden – i allt annat medföljer.",
      },
      {
        type: "p",
        text: "Och kom ihåg: billigast är oftast dyrast. Räkna inte bara med priset per städning – räkna med försäkring, garanti och trygghet som en del av kostnaden.",
      },
    ],
  },
  {
    slug: "loopande-stading-sa-planerar-du-rutinen",
    title: "Löpande städning: så planerar du rutinen som passar ditt hem",
    excerpt:
      "Varje vecka eller varannan? Samma städlag, fasta tider och rabatt – så tänker du fram en rutin som faktiskt håller över tid.",
    date: "31 januari 2026",
    category: "Inspiration",
    readTime: "5 min",
    img: "https://images.pexels.com/photos/7513158/pexels-photo-7513158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    author: "Maja Lindgren",
    role: "Huvudstäderska",
    content: [
      {
        type: "p",
        text: "Den bästa städrutinen är den som håller. Inte den mest effektiva, inte den billigaste – den som fortfarande fungerar efter tolv månader. Det handlar om frekvens, tider och att ha samma lag som lär sig ditt hem.",
      },
      { type: "h2", text: "Välj frekvens efter hushåll – inte efter kalender" },
      {
        type: "ul",
        items: [
          "En person / tvåa: varannan vecka räcker oftast.",
          "Två personer / trea: varannan vecka, gärna med maskinrensning kvartalsvis.",
          "Familj med barn och/eller husdjur: varje vecka ger bäst resultat.",
          "Kontor: oftast 1–3 gånger per vecka beroende på antal medarbetare.",
        ],
      },
      { type: "h2", text: "Fasta tider, samma lag" },
      {
        type: "p",
        text: "Vid löpande städning får du alltid samma städlag. Efter tre tillfällen känner lag ditt hem: var det dammar, vad som irriterar dig, vilka medel som fungerar bäst. Resultatet blir snabbare och bättre – och du slipper förklara från början varje gång.",
      },
      { type: "h2", text: "Tiden spelar roll" },
      {
        type: "p",
        text: "Boka gärna ett tidfönster som blir samma varje gång. Många kunder väljer morgon – hemmet är rent innan dagen börjar – medan andra föredrar kväll efter barnen somnat. Vill du inte vara hemma? Vi arbetar med färdigkod och skickar städlagets namn och bild i förväg.",
      },
      { type: "h2", text: "Vad ger löpande avtal hos oss?" },
      {
        type: "ul",
        items: [
          "Samma tydliga pris vid varje tillfälle",
          "Samma städlag och fasta tider",
          "En fri fönsterputsning per år",
          "Prioriterad tidsbokning och flexibel ändring med 24 h",
          "Ingen bindningstid – säg upp med 30 dagar",
        ],
      },
      {
        type: "p",
        text: "Vår bästa regel: börja med en enskild städning, testa rytmen och gå därefter över till löpande om det känns rätt. Då vet du exakt vad du får – innan du bokar in det löpande.",
      },
    ],
  },
];

export const postBySlug = (slug: string | undefined) =>
  POSTS.find((p) => p.slug === slug);
