// PROTOTYPEDATA — Real content & local asset catalog for Acodal.cz UI Prototype
// Throwaway prototype data layer

window.ACODAL_DATA = {
  brand: {
    name: "A CO DÁL",
    tagline: "Školíme týmy i jednotlivce.",
    subTagline: "Jsme tu s vámi pro úspěch ve vzdělávání. A co dál?",
    languages: ["Čeština", "English", "Deutsch"],
    accreditations: [
      { code: "MPSV", ref: "č. A2017/0551-SP/PC/VP", label: "Akreditace MPSV" },
      { code: "MŠMT", ref: "č.j.: MSMT – 15543/2018-3 & 21338/2020-4-434", label: "Akreditace MŠMT" }
    ],
    logo: "assets/original/brand/logo-acodal.png",
    phone: "+420 604 392 543",
    email: "kontakt@acodal.cz",
    socials: {
      facebook: "https://www.facebook.com/acodal1/",
      linkedin: "https://www.linkedin.com/company/a-co-dál-s-r-o/about"
    },
    entities: [
      {
        name: "A CO DÁL, s.r.o.",
        ic: "01771264",
        address: "Holandská 865/11, 715 00 Ostrava-Michálkovice",
        bank: "2701349538/2010 (Fio banka)"
      },
      {
        name: "A co dál – centrum rozvoje, z.ú.",
        ic: "09557181",
        address: "Křižíkova 2850/6, 702 00 Ostrava",
        bank: "2301875387/2010 (Fio banka)"
      }
    ]
  },

  photos: {
    heroHome: "assets/original/team/hero-home-team.jpg",
    heroOnas: "assets/original/team/hero-onas-team.jpg",
    heroKontakty: "assets/original/team/hero-kontakty-team.jpg",
    classroom: "assets/original/team/hero-home-team.jpg",
    bgCaseStudy: "assets/original/backgrounds/home-case-study.jpeg",
    bgCoDelameHero: "assets/original/backgrounds/co-delame-hero.jpeg",
    bgCoDelameBanner: "assets/original/backgrounds/co-delame-banner.jpeg",
    bgJakToProbiha: "assets/original/backgrounds/jak-to-probiha-hero.jpeg",
    bgSkoly: "assets/original/backgrounds/strategicky-rozvoj-skol.jpg"
  },

  audiences: [
    {
      id: "firmy",
      label: "Pro firmy a korporace",
      shortLabel: "Firmy & Byznys",
      icon: "building",
      headline: "Souhra v týmu přináší pracovní pohodu a měřitelné výsledky",
      description: "Pomáháme výrobním, obchodním i servisním firmám rozvíjet lídry, obchodníky a týmy přímo na pracovišti. Od biostrukturální analýzy Structogram® přes manažerské dovednosti až po audit procesů a výběr lidí na správné pozice.",
      stats: "15+ významných firemních klientů",
      featuredTopics: ["structogram", "manazerske-dovednosti", "prodejni-dovednosti", "komunikace", "personalistika", "prezentacni-dovednosti"],
      quote: "Opakovaně zvoleno firmou Microsoft nejúspěšnějším školením roku (systém Structogram®).",
      formats: ["Trénink na pracovišti & audit procesů", "Dvoudenní a jednodenní workshopy", "Koučink klíčových manažerů & HR poradenství", "Školení v ČJ, AJ i NJ pro mezinárodní týmy"]
    },
    {
      id: "skoly",
      label: "Pro školy a pedagogy",
      shortLabel: "Školy & Sborovny",
      icon: "graduation",
      headline: "Učení prožitkem pro sborovny, ředitele i studenty",
      description: "Víme, že učitelé se potřebují učit prožitkem, zažít emoce, podporu, důvěru a bezpečí. Provázíme celé sborovny výjezdními semináři, pomáháme s barevnou typologií ve výuce i dlouhodobou strategií školy.",
      stats: "19+ ZŠ, SŠ, gymnázií a MŠ",
      featuredTopics: ["barevne-uceni", "strategicky-rozvoj-skol", "choice-of-profession", "structogram", "komunikace", "work-life-balance"],
      quote: "„Vyšlo to lépe, než jsem doufal. Zažili jsme emoce, podporu, důvěru a bezpečí.“ — Miroslav Všetečka, ředitel ZŠ Hlučín - Rovniny (52 pedagogů)",
      formats: ["Výjezdní dvoudenní školení celých sboroven", "Akreditované semináře MŠMT", "Dlouhodobý strategický rozvoj vize školy", "Kariérní program Choice of Profession pro studenty"]
    },
    {
      id: "urady",
      label: "Pro veřejnou správu a instituce",
      shortLabel: "Úřady & Instituce",
      icon: "landmark",
      headline: "Profesionální komunikace, odolnost a kultura ve veřejné správě",
      description: "Spolupracujeme s ministerstvy, krajskými úřady, městy, místními akčními skupinami (MAS) i sociálními službami. Posilujeme zvládání náročných situací s klienty, prevenci vyhoření a efektivní týmovou spolupráci.",
      stats: "13+ ministerstev, krajů, měst a MAS",
      featuredTopics: ["komunikace", "work-life-balance", "osobni-rozvoj", "trenink-pameti", "structogram", "manazerske-dovednosti"],
      quote: "Akreditováno MPSV (č. A2017/0551-SP/PC/VP) pro sociální a samosprávní sféru.",
      formats: ["Akreditované kurzy MPSV", "Trénink klientské a asertivní komunikace", "Prevence stresu, vyhoření a mozkový jogging", "Konzultace a rozvoj vedoucích úředníků"]
    }
  ],

  pillars: [
    { id: "all", label: "Všech 13 oblastí", count: 13 },
    { id: "neuro", label: "Structogram® & Neurověda", count: 4, color: "#E77817" },
    { id: "teams", label: "Lidé, Týmy & Byznys", count: 5, color: "#2E7D5B" },
    { id: "growth", label: "Osobní růst & Školství", count: 4, color: "#2B5B84" }
  ],

  topics: [
    {
      id: "structogram",
      number: "01",
      title: "Structogram® a Triogram",
      subtitle: "Klíč k sebepoznání a klíč k poznání druhých. Biostrukturální analýza trojjediného mozku.",
      pillar: "neuro",
      pillarLabel: "Vlajkový program • Neurověda",
      audiences: ["firmy", "skoly", "urady"],
      format: "Dvoudenní tréninkový seminář",
      accreditation: "AKREDITACE MPSV č. A2017/0551-SP/PC/VP | AKREDITACE MŠMT č.j.: MSMT – 15543/2018-3",
      featured: true,
      triColors: ["#3A8E58", "#D6453D", "#2E6DA4"],
      points: [
        "Získáte klíč ke změření vlivu trojjediného mozku na potenciál své osobnosti a provedete si vlastní biostrukturální analýzu.",
        "Porozumíte tomu, do jaké míry mají výsledky vliv na projevy chování a jak s nimi lze vědomě pracovat především na úrovni vztahů s ostatními lidmi.",
        "Budete schopni definovat své možnosti a hranice v souladu se svou osobností.",
        "Naučíte se používat rychlou analýzu druhých lidí včetně dovednosti předpovídat jejich chování a reakce, a tím se vyhnout případným konfliktům.",
        "Zvýšíte efektivitu jednání s klienty v osobním, telefonickém i písemném styku.",
        "Lépe porozumíte svým kolegům v práci, nadřízeným i podřízeným, snáze si získáte jejich důvěru."
      ]
    },
    {
      id: "barevne-uceni",
      number: "02",
      title: "Barevné učení",
      subtitle: "Seminář navazující na barevnou typologii Struktogram – Triogram pro zkvalitnění výuky prostřednictvím cílené individualizace.",
      pillar: "neuro",
      pillarLabel: "Structogram® ve výuce",
      audiences: ["skoly"],
      format: "Jednodenní workshop",
      accreditation: "AKREDITACE MŠMT č.j.: MSMT – 21338/2020-4-434",
      featured: true,
      triColors: ["#3A8E58", "#D6453D", "#2E6DA4"],
      points: [
        "Prohloubíte sebepoznání díky reflexi vlastních potřeb v procesu učení.",
        "Pomůžeme vám hledat a nacházet konkrétní strategie, metody a formy práce odpovídající potřebám jednotlivých typů barevné typologie.",
        "Budete mít možnost vidět pestrost potřeb jednotlivců z hlediska procesu učení.",
        "Odnesete si nejen nápady, ale především konkrétní plán, jak v případě potřeby výuku přizpůsobit jednotlivým typům tak, aby více respektovala jejich potřeby."
      ]
    },
    {
      id: "choice-of-profession",
      number: "03",
      title: "Structogram® Choice of Profession",
      subtitle: "Program pro studenty, který využívá švýcarskou metodu Structogram® pro volbu budoucího povolání.",
      pillar: "neuro",
      pillarLabel: "Pro studenty • Kariéra",
      audiences: ["skoly"],
      format: "Jednodenní tréninkový seminář",
      accreditation: "Švýcarská licencovaná metoda Structogram®",
      featured: false,
      triColors: ["#3A8E58", "#D6453D", "#2E6DA4"],
      points: [
        "Odkryjete své osobnostní silné stránky a talent, také svá osobnostní rizika a omezení.",
        "Lépe porozumíte důvodům a způsobům svého chování a jednání.",
        "Odhalíte, jaký způsob učení je pro vás nejefektivnější.",
        "Dozvíte se, co může být vaše „konkurenční výhoda“ na trhu práce a naopak, čeho se vyvarovat.",
        "Vytipujete si oblasti/obory/profese, které nejvíce odpovídají vaší osobnosti a kde budete moci nejvíce rozvinout svůj potenciál a talent."
      ]
    },
    {
      id: "komunikace",
      number: "04",
      title: "Komunikace ve všech jejích podobách",
      subtitle: "Asertivita, komunikace v souladu s fungováním mozku, vyjednávání, barevná komunikace, zvládání emocí a konfliktů.",
      pillar: "teams",
      pillarLabel: "Týmová & Klientská komunikace",
      audiences: ["firmy", "skoly", "urady"],
      format: "Interaktivní trénink na míru",
      accreditation: null,
      featured: true,
      points: [
        "Pochopíte, jak mozek zpracovává informace, jak si lépe vzájemně rozumět a eliminovat nedorozumění.",
        "Porozumíte nedoceněné neverbální komunikaci.",
        "Identifikujete a vylepšíte si osobní komunikační styl a osvojíte si asertivní přístup.",
        "Procvičíte si praktické komunikační techniky a seznámíte se se styly vyjednávání vedoucími k cíli.",
        "Naučíte se dívat pozitivně na konflikt a vhodně jej řešit.",
        "Zvládnete lépe vlastní emoce i emoce ostatních."
      ]
    },
    {
      id: "trenink-pameti",
      number: "05",
      title: "Trénink paměti & Mozkový jogging",
      subtitle: "Mozkový jogging s certifikovanými trenérkami paměti III. stupně a aplikovaná neurověda v praxi.",
      pillar: "neuro",
      pillarLabel: "Neurověda • Kognitivní rezerva",
      audiences: ["firmy", "skoly", "urady"],
      format: "Praktický workshop",
      accreditation: "Trenérky paměti III. stupně",
      featured: false,
      points: [
        "Zlepšíte si svou paměť a podpoříte celkovou činnost mozku tím, že vytváříte tzv. kognitivní rezervu.",
        "Zvýšíte svou myšlenkovou aktivitu, kreativitu a výkonnost.",
        "Seznámíte se s novými poznatky neurovědy o fungování lidského mozku.",
        "Naučíte se používat nejznámější mnemotechniky a vyzkoušíte si mnohá praktická cvičení.",
        "Získáte informace o životním stylu, který prospívá zdravému vývoji mozku."
      ]
    },
    {
      id: "osobni-rozvoj",
      number: "06",
      title: "Osobní rozvoj",
      subtitle: "Sebepoznání, sebepojetí a sebehodnocení, rozvinutí osobního potenciálu, sebekoučovací techniky, rozpoznání návyků a stanovování cílů.",
      pillar: "growth",
      pillarLabel: "Sebepoznání & Sebekoučink",
      audiences: ["firmy", "skoly", "urady"],
      format: "Rozvojový seminář / Koučink",
      accreditation: null,
      featured: false,
      points: [
        "Poznáte sami sebe a díky tomu lépe porozumíte i druhým.",
        "Porozumíte svým vnitřním konfliktům a omezením, které vám brání být produktivními.",
        "Rozvinete svou emoční inteligenci a své stěžejní dovednosti.",
        "Dozvíte se, jak naplno využít vnitřní kapacitu a dosáhnout optimálního výkonu.",
        "Naučíte se, jak se „přeprogramovat“, aby vše běželo tak, jak chcete.",
        "Podpoříte své sebevědomí a sebedůvěru a naučíte se stanovovat cíle tak, abyste jich skutečně dosáhli."
      ]
    },
    {
      id: "prezentacni-dovednosti",
      number: "07",
      title: "Prezentační dovednosti",
      subtitle: "Nácvik prezentačních dovedností, interaktivní cílená prezentace, storytelling a zvládání obtížných situací při prezentacích.",
      pillar: "teams",
      pillarLabel: "Rétorika & Vystupování",
      audiences: ["firmy", "urady"],
      format: "Praktický trénink s nácvikem",
      accreditation: null,
      featured: false,
      points: [
        "Dokážete připravit prezentaci tak, aby splnila svůj účel.",
        "Získáte návod, jak zaujmout pozornost posluchačů, zasáhnout jejich emoce a inspirovat je.",
        "Pochopíte, jaký má význam příběh (storytelling) při prezentaci.",
        "Naučíte se zvládat trému, námitky a negativní emoce svých posluchačů.",
        "Procvičíte rétoriku a neverbální komunikaci."
      ]
    },
    {
      id: "prodejni-dovednosti",
      number: "08",
      title: "Prodejní dovednosti",
      subtitle: "Úspěšný prodej, barevná obchodní komunikace, orientace na zákazníka, zvládání námitek a argumentace.",
      pillar: "teams",
      pillarLabel: "Obchod & Zákaznická péče",
      audiences: ["firmy"],
      format: "Obchodní trénink & praxe",
      accreditation: null,
      featured: false,
      points: [
        "Seznámíte se s barevnou obchodní komunikací vedoucí k obchodním výsledkům a dobrým vztahům.",
        "Naučíte se snáze oslovovat nové klienty a zvýšíte svou vnitřní sebedůvěru při obchodování.",
        "Zbavíte se strachu z odmítnutí a pocitu studu z neúspěchu.",
        "Osvojíte si postoje vedoucí ke zvýšení prodeje a pochopíte význam otázky při obchodním rozhovoru.",
        "Osvojíte si, jak v sobě a v klientovi vyvolat pozitivní emoce a obrazy.",
        "Naučíte se vytvářet optimální vztahy se zákazníky a dlouhodobě o ně pečovat."
      ]
    },
    {
      id: "manazerske-dovednosti",
      number: "09",
      title: "Manažerské dovednosti & Neuroleadership",
      subtitle: "Vedení lidí, situační vedení, hodnotící a motivační rozhovory, zpětná vazba, komunikace změny, vedení porad a neuroleadership.",
      pillar: "teams",
      pillarLabel: "Leadership & Vedení lidí",
      audiences: ["firmy", "skoly", "urady"],
      format: "Manažerská akademie / Trénink",
      accreditation: null,
      featured: true,
      points: [
        "Poznáte a vylepšíte svůj manažerský styl a pochopíte principy manažerského rozhodování.",
        "Zlepšíte své schopnosti delegovat, vést podřízené a rozvíjet jejich potenciál.",
        "Dozvíte se vše o motivaci a zpětné vazbě a jak s nimi v praxi nakládat pro dosažení cílů.",
        "Osvojíte si vedení obtížných, hodnotících i vytýkacích rozhovorů.",
        "Naučíte se efektivně vést porady, uplatňovat vliv a přesvědčit tým ke změně.",
        "Seznámíte se s poznatky neurovědy a principy fungování mozku při vedení lidí (Neuroleadership)."
      ]
    },
    {
      id: "personalistika",
      number: "10",
      title: "Personalistika a firemní kultura",
      subtitle: "Optimalizace firemní kultury, hodnotících a odměňovacích systémů, nábor, Assessment centrum, psychodiagnostika a HR Business Partnering.",
      pillar: "teams",
      pillarLabel: "HR • Výběr & Kultura",
      audiences: ["firmy", "urady"],
      format: "HR Konzultace & Workshop",
      accreditation: null,
      featured: false,
      points: [
        "Dozvíte se, proč a jak vědomě tvořit firemní kulturu.",
        "Nastavíte si hodnotící a odměňovací systémy, které se projeví ve výkonu, kvalitě i atmosféře firmy.",
        "Sestavíte program Assessment centra, včetně certifikované psychodiagnostiky.",
        "Naučíte se vést behaviorální a další personální rozhovory.",
        "Osvojíte si roli HR manažera jako strategického business partnera vedení firmy."
      ]
    },
    {
      id: "work-life-balance",
      number: "11",
      title: "Work-Life Balance & Stav FLOW",
      subtitle: "Jak sladit všechny složky života a být spokojení, time management IV. generace, stress management, stav FLOW a sebemotivace.",
      pillar: "growth",
      pillarLabel: "Energie • Prevence vyhoření",
      audiences: ["firmy", "skoly", "urady"],
      format: "Zážitkový workshop",
      accreditation: null,
      featured: false,
      points: [
        "Pochopíte, jak důležité je žít v souladu se sebou i okolím a jak si vytvořit podmínky pro spokojený život.",
        "Naučíte se, jak se stát tím, kdo řídí váš čas (time management IV. generace).",
        "Podíváte se na stres z jiného úhlu pohledu a dozvíte se, jak si z něj udělat pomocníka.",
        "Osvojíte si principy sebemotivace, mindfulness a jak čerpat vnitřní energii.",
        "Dozvíte se, jak žít tady a teď a podpoříte svůj stav FLOW."
      ]
    },
    {
      id: "vyuziti-vlastniho-potencialu",
      number: "12",
      title: "Využití vlastního potenciálu",
      subtitle: "Kreativita a představivost, myšlenkové mapy, kritické myšlení, mozkový jogging, trénink paměti a pozitivní změna.",
      pillar: "growth",
      pillarLabel: "Kreativita & Kritické myšlení",
      audiences: ["firmy", "skoly", "urady"],
      format: "Rozvojový workshop",
      accreditation: null,
      featured: false,
      points: [
        "Naučíte se, jak rozvíjet svou kreativitu a představivost.",
        "Dozvíte se, co je kritické myšlení, jak si ho osvojit a rozvíjet.",
        "Naučíte se prakticky pracovat s myšlenkovou mapou.",
        "Osvojíte si techniky k rozvíjení mozkové činnosti a zlepšíte své soustředění.",
        "Naučíte se vnímat změnu jako příležitost, nebát se jí a vytěžit z ní maximum."
      ]
    },
    {
      id: "strategicky-rozvoj-skol",
      number: "13",
      title: "Strategický rozvoj škol",
      subtitle: "Vize školy, strategický plán rozvoje, standard kvality výuky a kolegiální podpora pedagogického sboru.",
      pillar: "growth",
      pillarLabel: "Speciální program pro vedení škol",
      audiences: ["skoly"],
      format: "Dlouhodobé provázení & facilitace",
      accreditation: "Obnovený program (dříve skrytá sekce webu)",
      featured: true,
      points: [
        "Získáte zkušeného průvodce ve vašem dlouhodobém rozvoji školy.",
        "Sestavíte se svým týmem živou vizi školy, ke které chcete společně směřovat.",
        "Uvědomíte si hodnoty a kvality, které jsou ve vaší škole přítomny, a stanovíte si oblasti rozvoje.",
        "Vytvoříte srozumitelný plán a akční kroky, které vám cestu k cíli usnadní.",
        "Rozvinete a posílíte kolegiální podporu v pedagogickém týmu.",
        "Zvýšíte kvalitu výuky a zacílíte profesní rozvoj učitelů."
      ]
    }
  ],

  steps: [
    {
      step: 1,
      title: "Začínáme osobně",
      subtitle: "Nezávazná schůzka a naladění",
      image: "assets/original/steps/step-1-zaciname.jpeg",
      text: "Od okamžiku, kdy projevíte zájem spolupracovat, jsme tady pro vás. Nejdříve si domluvíme schůzku. Věříme v dlouhodobou spolupráci založenou na osobním přístupu a kvalitních vztazích, v podporující atmosféru a profesionalitu."
    },
    {
      step: 2,
      title: "Analyzujeme vaše potřeby",
      subtitle: "Pojmenování žádoucí změny (ČJ / AJ / NJ)",
      image: "assets/original/steps/step-2-analyzujeme.jpeg",
      text: "Smyslem kvalitního rozvojového programu je změna. Analýza potřeb pomůže ujasnit, jakou změnu si pro sebe a svůj tým přejete. Máte mezinárodní tým? Školíme také anglicky či německy."
    },
    {
      step: 3,
      title: "Tvoříme program na míru",
      subtitle: "Alternativy, obsah, servis a kalkulace",
      image: "assets/original/steps/step-3-tvorime.jpeg",
      text: "V domluveném termínu od nás obdržíte možné alternativy a společně doladíme váš vzdělávací a rozvojový program. Připravíme konkrétní návrh aktivity, časový rozsah, studijní podklady, lektorské zajištění i kompletní realizační servis a cenovou kalkulaci."
    },
    {
      step: 4,
      title: "Realizujeme prožitkem",
      subtitle: "Structogram®, NLP, psychodiagnostika v praxi",
      image: "assets/original/steps/step-4-realizujeme.jpeg",
      text: "Přípravy proběhly podle domluvy a jdeme na to. Využíváme moderní certifikované metody jako je Structogram®, neurolingvistické programování či certifikovaná psychodiagnostika. Působíme na rozvoj celé osobnosti účastníků a podporujeme zdravé návyky."
    },
    {
      step: 5,
      title: "A co dál?",
      subtitle: "Hodnotící zpráva a ukotvení změny v praxi",
      image: "assets/original/steps/step-5-a-co-dal.jpeg",
      text: "Vzdělávání proběhlo a vy od nás obdržíte hodnotící zprávu včetně doporučení pro další rozvoj. Rozvoj je proces a nastartovaná změna se u vás musí zabydlet. S časovým odstupem společně vyhodnotíme, jak se investice projevila v prodeji, kvalitě, produktivitě či komunikaci."
    }
  ],

  caseStudy: {
    title: "Příběh našeho klienta",
    subtitle: "Ohlédnutí za zážitkovým kurzem úspěšné komunikace",
    school: "ZŠ Hlučín - Rovniny",
    author: "Miroslav Všetečka",
    role: "ředitel ZŠ Hlučín - Rovniny (výjezdní školení 52 pedagogů)",
    logo: "assets/original/logos/e_rovniny_3.png",
    quote: "„Vždy, když připravuji výjezdní dvoudenní školení celé naší sborovny (52 pedagogů), cítím velkou zodpovědnost. Vybrat zajímavé téma, kvalitní lektory, příjemné místo… Po mnoha zkušenostech jsme všichni hodně nároční. Naším společným cílem je, abychom se především hodně naučili a přitom si to i užili, lépe se poznali a utužili vztahy v našem týmu. Jsme učitelé a víme, že se potřebujeme učit prožitkem, zažít emoce, podporu, důvěru a bezpečí. Jedině pak je učení trvalé. Vyšlo to lépe, než jsem doufal.“",
    summary: "„Vždy, když připravuji výjezdní dvoudenní školení celé naší sborovny (52 pedagogů), cítím velkou zodpovědnost… Jsme učitelé a víme, že se potřebujeme učit prožitkem, zažít emoce, podporu, důvěru a bezpečí. Jedině pak je učení trvalé. Vyšlo to lépe, než jsem doufal.“ — Miroslav Všetečka, ředitel školy",
    testimonials: [
      {
        text: "„…zcela nové obzory v poznání druhých. Příjemné vystupování, příhody ze života, pro mě lepší zapamatování. Super holky!“",
        quote: "…zcela nové obzory v poznání druhých. Příjemné vystupování, příhody ze života, pro mě lepší zapamatování. Super holky!",
        tag: "Poznání druhých",
        author: "Poznání druhých • ZŠ Hlučín - Rovniny"
      },
      {
        text: "„…že nám to druzí nedělají schválně. Větší pochopení potřeb lidí kolem mne. Moc děkuji, čas s vámi běžel neuvěřitelně rychle.“",
        quote: "…že nám to druzí nedělají schválně. Větší pochopení potřeb lidí kolem mne. Moc děkuji, čas s vámi běžel neuvěřitelně rychle.",
        tag: "Pochopení & Empatie",
        author: "Pochopení & Empatie • ZŠ Hlučín - Rovniny"
      },
      {
        text: "„…uvědomění, jaký typ osobnosti jsem, konečně se začnu více chápat a více si rozumět. Děkuji vám za příjemné a přátelské prostředí a srozumitelné informace pro praxi.“",
        quote: "…uvědomění, jaký typ osobnosti jsem, konečně se začnu více chápat a více si rozumět. Děkuji vám za příjemné a přátelské prostředí a srozumitelné informace pro praxi.",
        tag: "Sebepoznání v praxi",
        author: "Sebepoznání v praxi • ZŠ Hlučín - Rovniny"
      },
      {
        text: "„…že jsme každý jiný a bez tolerance a pochopení by nebylo možné existovat. A ta pestrost mě baví! Budu se učit tolerovat i sebe.“",
        quote: "…že jsme každý jiný a bez tolerance a pochopení by nebylo možné existovat. A ta pestrost mě baví! Budu se učit tolerovat i sebe.",
        tag: "Tolerance & Pestrost",
        author: "Tolerance & Pestrost • ZŠ Hlučín - Rovniny"
      },
      {
        text: "„…další utvrzení v tom, že všichni jsme jedineční a jde o to, jak k ostatním přistupujeme tak, abychom se posouvali dál. Ať už k úspěchu nebo k pohodovému soužití.“",
        quote: "…další utvrzení v tom, že všichni jsme jedineční a jde o to, jak k ostatním přistupujeme tak, abychom se posouvali dál. Ať už k úspěchu nebo k pohodovému soužití.",
        tag: "Týmový posun",
        author: "Týmový posun • ZŠ Hlučín - Rovniny"
      },
      {
        text: "„…radost, štěstí, smutek vzniká v našem mozku, svět vnímáme prostřednictvím našeho mozku. Díky…“",
        quote: "…radost, štěstí, smutek vzniká v našem mozku, svět vnímáme prostřednictvím našeho mozku. Díky…",
        tag: "Aplikovaná neurověda",
        author: "Aplikovaná neurověda • ZŠ Hlučín - Rovniny"
      }
    ]
  },

  team: [
    {
      id: "magda",
      name: "Magda Ožanová",
      role: "Lektorka, konzultantka, kouč",
      photo: "assets/original/team/magda-ozanova-1.jpg",
      photoAlt: "assets/original/team/magda-ozanova-2.jpg",
      phone: "+420 736 734 809",
      email: "magdalena.ozanova@acodal.cz",
      shortBio: "Věřím, že hluboko v nás všech jsou vnitřní zdroje — celoživotní schopnost učit se a růst, uzdravovat a proměňovat sebe sama. Je na každém z nás, jestli je vyneseme na povrch a začneme z nich čerpat.",
      extendedBio: "Cílem je být v souladu sám se sebou, dobře vycházet s druhými lidmi a být spokojený se svým příspěvkem celku. V oblasti vzdělávání dospělých mám více než desetiletou praxi. Široký záběr znalostí a dovedností jsem získala mnohaletou manažerskou praxí v českých i zahraničních firmách."
    },
    {
      id: "lenka",
      name: "Lenka Hartmannová",
      role: "Lektorka, kouč, mentor",
      photo: "assets/original/team/lenka-hartmannova-1.jpg",
      photoAlt: "assets/original/team/lenka-hartmannova-2.jpg",
      phone: "+420 777 230 090",
      email: "lenka.hartmannova@acodal.cz",
      shortBio: "Celý život se rozvíjet, vzdělávat a pracovat na sobě je moje záliba. Díky našemu týmu spojuji svou radost s prací. Věřím, že na svou životní spokojenost a úspěch máme zásadní vliv my sami.",
      extendedBio: "Věnovat se vám budu jak individuálně, tak spolu s vaším týmem. Mám dlouholeté zkušenosti se vzděláváním pestrých skupin různého věku či národností, mnoho let jsem strávila také v manažerských pozicích. Pracuji laskavě a všímavě, s důvěrou v klienta."
    },
    {
      id: "tereza",
      name: "Tereza Ožanová",
      role: "Lektorka, kouč",
      photo: "assets/original/team/tereza-ozanova.jpg",
      photoAlt: "assets/original/team/tereza-ozanova.jpg",
      phone: "+420 604 392 543",
      email: "tereza.ozanova@acodal.cz",
      shortBio: "Na lektorování mě baví potkávat se stále s novými tvářemi, to spoluvytváření a vzájemná interakce. Každý kurz je vždy jedinečný. Podstatné je pro mne se na účastníky naladit a pak může být naše společná práce efektivní.",
      extendedBio: "To jsou hlavní důvody, proč se na každý kurz a nové účastníky těším stejně jako poprvé před více než jedenácti lety."
    },
    {
      id: "andrea",
      name: "Andrea Kubátová",
      role: "Finanční a realizační manažerka",
      photo: "assets/original/team/andrea-kubatova.jpg",
      photoAlt: "assets/original/team/andrea-kubatova.jpg",
      phone: "+420 777 052 267",
      email: "kontakt@acodal.cz",
      shortBio: "Vystudovala jsem ekonomiku podniku a několik let strávila na půdě mezinárodní školy v roli finančního manažera a koordinátora vzdělávacích projektů.",
      extendedBio: "V „A co dál“ jsem připravena vám pomoci s finančními či organizačními dotazy. Jsem zodpovědná za veškerou administraci společnosti, tak aby naši lektoři mohli s vámi nerušeně růst a spolupracovat."
    }
  ],

  foundingStory: {
    title: "Příběh, jak to celé vzniklo",
    subtitle: "Spojilo se přátelství, vzájemná úcta, respekt a důvěra.",
    quote: "„Čekám na začátek koučovacího výcviku a volá Tereza. ‚Tak jsme to probíraly s Magdou, Leni, měla bys chuť pomoct, že bychom se do toho pustily samy? A co Andrea, bez ní se neobejdeme, někdo nám to musí spočítat.‘ Pokládám telefon a jasně si uvědomuji ten moment, kdy k člověku přirozeně doplulo, po čem dávno toužil. A co nechce nechat odplynout. Tolik ve zkratce cesta dlouhého příběhu tvoření s radostí. Těšíme se, že budete i vy jeho součástí.“"
  },

  clients: {
    firmy: [
      { name: "ABB Ostrava", logo: "assets/original/logos/e_abb.png" },
      { name: "Allianz", logo: "assets/original/logos/e_allianz.png" },
      { name: "Kooperativa", logo: "assets/original/logos/e_kooperativa.png" },
      { name: "Veolia", logo: "assets/original/logos/e_veolia.png" },
      { name: "Tokoz", logo: "assets/original/logos/e_tokoz.jpg" },
      { name: "Schott", logo: "assets/original/logos/e_schott.png" },
      { name: "Teleperformance", logo: "assets/original/logos/e_tele.jpg" },
      { name: "První Chodská", logo: "assets/original/logos/e_chodska_1.png" },
      { name: "Alvaris", logo: "assets/original/logos/e_alvaris.png" },
      { name: "ASPEC", logo: "assets/original/logos/e_aspec.png" },
      { name: "iMPS", logo: "assets/original/logos/e_IMPS.jpg" },
      { name: "Elektro-Projekce", logo: "assets/original/logos/e_elektroprojekce-1.png" },
      { name: "ReadyMat", logo: "assets/original/logos/e_readymat.png" },
      { name: "ZOO Hodonín", logo: "assets/original/logos/e_zoohodonin_1.jpg" },
      { name: "Polovina Nebe", logo: "assets/original/logos/e_polovinanebe.jpg" }
    ],
    urady: [
      { name: "MŠMT", logo: "assets/original/logos/e_msmt.jpg" },
      { name: "Ministerstvo zemědělství", logo: "assets/original/logos/e_mz.jpg" },
      { name: "Moravskoslezský kraj", logo: "assets/original/logos/e_msk.png" },
      { name: "Kraj Vysočina", logo: "assets/original/logos/e_vysocina.gif" },
      { name: "Ústecký kraj", logo: "assets/original/logos/e_ustecky.jpg" },
      { name: "Zlínský kraj", logo: "assets/original/logos/e_zlin.jpg" },
      { name: "KVIC", logo: "assets/original/logos/e_kvic2.png" },
      { name: "Město Hlučín", logo: "assets/original/logos/e_hlucin.png" },
      { name: "Město Kopřivnice", logo: "assets/original/logos/e_mestokoprivnice.png" },
      { name: "Město Bílovec", logo: "assets/original/logos/e_bilovec.png" },
      { name: "Město Orlová", logo: "assets/original/logos/e_orlova.png" },
      { name: "MAS Hlučínsko", logo: "assets/original/logos/e_mashlucinsko.png" },
      { name: "MAS Opavsko", logo: "assets/original/logos/e_opavsko.png" },
      { name: "MAS Rýmařovsko", logo: "assets/original/logos/e_rymarovsko.png" },
      { name: "Domov pro seniory Třebíč", logo: "assets/original/logos/e_domovtrebic.png" }
    ],
    skoly: [
      { name: "ZŠ Hlučín - Rovniny", logo: "assets/original/logos/e_rovniny_3.png" },
      { name: "Slezské Gymnázium Opava", logo: "assets/original/logos/e_sgo_1.jpg" },
      { name: "SPŠE Havířov", logo: "assets/original/logos/e_spsehavirov_1.jpg" },
      { name: "ZŠ a MŠ Ludgeřovice", logo: "assets/original/logos/e_zsludgerovice_1.jpg" },
      { name: "ZŠ Dr. Miroslava Tyrše", logo: "assets/original/logos/e_zsmt_1.png" },
      { name: "ZŠ Opava Havlíčkova", logo: "assets/original/logos/e_zsopava_1.jpg" },
      { name: "ZŠ Šenov", logo: "assets/original/logos/e_zssenov_1.png" },
      { name: "ZŠ a MŠ Píšť", logo: "assets/original/logos/e_zspist.png" },
      { name: "ZŠ Porubská 832", logo: "assets/original/logos/e_zsporubska_1.png" },
      { name: "ZŠ Nový svět", logo: "assets/original/logos/e_novy_svet.png" },
      { name: "ZŠ Ostrčilova", logo: "assets/original/logos/e_zs_ostrcilova.png" },
      { name: "ZŠ Klimkovice", logo: "assets/original/logos/e_zs_klimkovice.png" },
      { name: "ZŠJN Krnov", logo: "assets/original/logos/e_zsjn-krnov-logo.png" },
      { name: "ZŠ Kpt. Vajdy", logo: "assets/original/logos/e_zsvajdy.png" },
      { name: "ZUŠ Frenštát p. Radhoštěm", logo: "assets/original/logos/e_zusfrenstat.jpg" },
      { name: "MŠ Kopřivnice", logo: "assets/original/logos/e_ms_koprivnice.png" },
      { name: "MŠ Ukrajinská", logo: "assets/original/logos/e_msukrajinska.png" }
    ]
  },

  quizQuestions: [
    {
      id: "q1",
      stepLabel: "1. Kdo jste?",
      question: "Pro koho hledáte vzdělávání nebo rozvoj?",
      options: [
        { id: "firmy", label: "Firma / Korporace", desc: "Výroba, obchod, služby, management, HR", icon: "🏢" },
        { id: "skoly", label: "Škola / Pedagogický sbor", desc: "ZŠ, SŠ, MŠ, ředitelé, sborovny i studenti", icon: "🎓" },
        { id: "urady", label: "Úřad / Veřejná instituce", desc: "Ministerstva, kraje, města, MAS, sociální služby", icon: "🏛️" }
      ]
    },
    {
      id: "q2",
      stepLabel: "2. Co právě řešíte?",
      question: "Jaká změna nebo téma je pro vás teď nejdůležitější?",
      options: [
        { id: "neuro", label: "Sebepoznání, typologie osobnosti & Structogram®", desc: "Pochopit rozdíly v týmu, předcházet konfliktům, barevné učení", icon: "🧠" },
        { id: "teams", label: "Vedení lidí, komunikace nebo obchod", desc: "Manažerské dovednosti, asertivita, vyjednávání, prodej, HR", icon: "🤝" },
        { id: "growth", label: "Prevence vyhoření, potenciál nebo vize školy", desc: "Work-life balance, FLOW, trénink paměti, strategický rozvoj škol", icon: "🌱" }
      ]
    },
    {
      id: "q3",
      stepLabel: "3. Jakou formu preferujete?",
      question: "Jak si spolupráci ideálně představujete?",
      options: [
        { id: "workshop", label: "Intenzivní 1–2denní zážitkový workshop", desc: "Např. akreditovaný seminář Structogram® nebo výjezdní sborovna", icon: "⚡" },
        { id: "workplace", label: "Dlouhodobý rozvoj / výcvik přímo na pracovišti", desc: "Trénink v praxi spojený s auditem procesů či strategií", icon: "🧭" },
        { id: "coaching", label: "Individuální koučink, mentoring nebo konzultace", desc: "Podpora klíčových lidí, ředitelů a manažerů", icon: "💬" }
      ]
    }
  ]
};
