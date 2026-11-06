# Acodal.cz — Website Audit, Content Inventory & Revamp Guidelines

## 1. Executive Summary & Current State Audit

### About the Business
**A CO DÁL, s.r.o.** (along with sister entity **A co dál – centrum rozvoje, z.ú.**) is a Czech training, coaching, and consulting company based in Ostrava, operating nationwide and internationally (offering sessions in Czech, English, and German).
They specialize in **experiential learning ("učení prožitkem")**, **applied neuroscience**, **Structogram® & Triogram®** personality/biostructural analysis (accredited by MPSV & MŠMT), soft skills, leadership, team building, and school strategic development for:
1. **Corporations & Businesses** (manufacturing, retail, services, finance)
2. **Public Administration & Municipalities** (ministries, regional authorities, cities, MAS)
3. **Schools & Educational Institutions** (principals, teaching staff, students)

---

### Technical & UX Audit of the Legacy WordPress Site (`https://acodal.cz`)
Exploring the current website via the browser revealed several critical technical, visual, and UX issues that make a static/SPA revamp highly beneficial:

1. **Broken Server Assets & Dead Staging Links:**
   - **Broken Fonts & Icons (`HTTP 400 Bad Request`):** Local font files (`MaterialIcons-Regular.woff2`, `fontawesome-webfont.woff2`, `Roboto-Regular.woff2`, `open-sans-v14-latin-ext_latin-600.woff2`) fail to load on every page. As a result, icons render as raw ligature text (e.g., `keyboard_arrow_down`, `keyboard_arrow_up`) or broken glyphs.
   - **Dead Staging Server Images (`ERR_CONNECTION_CLOSED`):** On `/jak-to-probiha/`, all 5 circular step illustrations point to a dead staging domain (`https://acodal.neptun.dotys.cz/...`) and fail to load in the browser. *(Note: During our audit, we verified that those exact 5 image files still exist on the production path `https://acodal.cz/wp-content/themes/acodal/media/uploads/...` and can be recovered!)*
   - **Mixed Content (`http://` vs `https://`):** Dozens of inline images and client logos are hardcoded with `http://acodal.cz/...` URLs.
2. **Abandoned / Empty Sections:**
   - The **Aktuálně** (`/aktualne/`) page in the main navigation is completely empty ("Co se u nás právě děje?" followed by blank space).
   - Unlinked legacy pages exist in WordPress (`/petra/`, `/zdenek/`, `/strategicky-rozvoj-skol/`). Notably, `/strategicky-rozvoj-skol/` has valuable content for schools that isn't linked from the main `/co-delame/` list!
3. **Navigation & Information Architecture Issues:**
   - The main navigation is hidden behind an inconspicuous top-right hamburger icon even on wide desktop screens, where the icon font is broken.
   - **12+ separate micro-pages for courses:** On `/co-delame/`, clicking any of the 12 training areas opens a separate full page that only contains a hero image, 1 heading, and 5–8 bullet points. In a modern SPA/static site, this causes unnecessary page loads and fragmentation—this is ideal for interactive cards, tabs, modals, or expandable drawers.
   - **Duplicate / Fragmented Team Bios:** `/o-nas/` shows short bios for 4 team members, with "více o mně" links for only 2 of them (`/magda/`, `/lenka/`), which lead to nearly identical text with just one extra paragraph.
   - **Footer Clutter:** Contains a broken `+ menu` item and a public `EDIT` link pointing to `/wp-admin/`.
4. **Heavy & Outdated Stack:**
   - Runs WordPress 4.9.35 with a 2017 custom theme (`hem` / Materialize CSS) loading 9 separate Google Font families and multiple carousel/tooltip plugins just to render static text and a logo grid.

---

## 2. Visual Identity & Brand Guidelines

### Brand Personality & Tone of Voice
- **Name Meaning:** *"A co dál?"* ("And what next?") — implies continuous growth, follow-through after training, curiosity, and forward momentum.
- **Tone:** Warm, empathetic, partner-like, uplifting, professional yet personal (*"Super holky!"*, *"Jsme kreativní parta. Vyznáváme spolehlivost a férovost."*).
- **Visual Metaphors:** Nature, warm sunlight, autumn leaves, coastal cliffs, personal connection, smiling real photos of the 4 female team members (taken in a park setting), and the 3-color **Structogram®** model (Green, Red, Blue — representing the triune brain).

### Color Palette (Extracted from Theme & Brand Assets)
| Role | Hex | Preview / Usage in Current Site | Recommendation for Revamp |
| :--- | :--- | :--- | :--- |
| **Primary Brand Orange** | `#E77817` / `#E77A1A` | Primary CTA buttons, highlights, icon circles, active links | Keep as primary accent & CTA color; warm and energetic |
| **Dark Orange / Ochre** | `#BB6316` / `#984A02` | Button hover states, deeper accents | Great for hover states and subtle warm gradients |
| **Warm Sand / Cream** | `#ECDED1` | Soft background tint | Ideal for alternating section backgrounds instead of stark white |
| **Deep Charcoal** | `#171717` / `#272727` | Footer background, dark overlays | Use for primary headings and dark footer |
| **Body Text Gray** | `#353535` / `#585858` | Main body copy and lists | Upgrade to a warm slate/charcoal for crisp readability |
| **Muted Slate / Blue-Gray**| `#8B9CAB` / `#97A6B4` | Secondary borders and muted UI elements | Good complementary cool neutral to balance the warm orange |
| **Structogram Tri-Colors**| Green, Red, Blue | Referenced in "Barevné učení" & "Structogram" | Subtle visual nods (e.g., 3-color accents on Structogram cards) |

### Typography
- **Current Fonts:**
  - Headings: `Enriqueta` (slab serif) and `Saira Semi Condensed`
  - Body: `Open Sans` and `Roboto`
- **Guideline for New Site:**
  - The current site loads 9 font stylesheets, slowing down rendering.
  - **Recommendation:** Consolidate to a clean 2-font system with full **Czech diacritics (`latin-ext`)** support:
    - **Headings:** A warm, approachable serif or humanist display font (e.g., *Lora*, *Merriweather*, *Playfair Display*, or *Plus Jakarta Sans* bold) to preserve the human/editorial warmth of `Enriqueta`.
    - **Body & UI:** A clean, modern sans-serif (e.g., *Inter*, *Plus Jakarta Sans*, or *DM Sans*) replacing `Open Sans`/`Roboto`.

---

## 3. Complete Content Inventory (All Pages & Copy)

### 3.1 Main Navigation Structure
1. **Úvod** (`/`) — Hero, Value Proposition, Featured Case Study (ZŠ Hlučín - Rovniny), Participant Quotes, 47 Client Logos
2. **Aktuálně** (`/aktualne/`) — *Currently empty ("Co se u nás právě děje?")*
3. **Co děláme** (`/co-delame/`) — Intro to neuroscience/Structogram, 12 Training Areas (links to subpages), Forms of Cooperation
4. **Jak to probíhá** (`/jak-to-probiha/`) — 5-Step Process timeline
5. **O nás** (`/o-nas/`) — Team intro, 4 Core Team Profiles (+ Magda & Lenka subpages), 3 External Lecturers, Founding Story
6. **Kontakty** (`/kontakty/`) — Direct personal contacts for the 4 partners, Billing Info for both `s.r.o.` and `z.ú.`

---

### 3.2 Page-by-Page Copy

#### A. Úvodní stránka (`/`)
- **Hero:**
  - **H1:** Školíme týmy i jednotlivce.
  - **H3:** *Jsme tu s vámi pro úspěch ve vzdělávání.*
  - **H3:** *A co dál?*
- **Intro Section:**
  - **H4:** Jste firma, instituce, úřad? Dopřejte svému týmu prožitek.
  - **Text:** Souhra v týmu přináší pracovní pohodu a lepší výsledky. Spolu s námi tvoříte a realizujete strategii dlouhodobého rozvoje týmů i osobnosti v oblasti vedení lidí, osobního rozvoje, komunikace a work-life balance.
  - **Text:** O sobě i svém týmu můžete vědět více, a tím vědomě růst. Poskytujeme poradenství, konzultujeme a školíme s osobním zaujetím, individuální péčí a profesionálně.
  - **CTA:** Co s námi získáte (`/co-delame`)
- **Featured Case Study (Příběh našeho klienta):**
  - **H1:** Příběh našeho klienta
  - **H3:** Ohlédnutí za zážitkovým kurzem úspěšné komunikace
  - **H4:** Jak to probíhalo a co to přineslo
  - **Quote Author:** **Miroslav Všetečka, ředitel ZŠ Hlučín - Rovniny:**
  - **Quote:** „Vždy, když připravuji výjezdní dvoudenní školení celé naší sborovny (52 pedagogů), cítím velkou zodpovědnost. Vybrat zajímavé téma, kvalitní lektory, příjemné místo… Po mnoha zkušenostech jsme všichni hodně nároční. Naším společným cílem je, abychom se především hodně naučili a přitom si to i užili, lépe se poznali a utužili vztahy v našem týmu. Jsme učitelé a víme, že se potřebujeme učit prožitkem, zažít emoce, podporu, důvěru a bezpečí. Jedině pak je učení trvalé. Vyšlo to lépe, než jsem doufal. Tady jsou postřehy mých kolegů:“
- **Participant Testimonials (Postřehy kolegů):**
  - *„…zcela nové obzory v poznání druhých. Příjemné vystupování, příhody ze života, pro mě lepší zapamatování. Super holky!“*
  - *„….radost, štěstí, smutek vzniká v našem mozku, svět vnímáme prostřednictvím našeho mozku, Díky…“*
  - *„…další utvrzení v tom, že všichni jsme jedineční a jde o to, jak k ostatním přistupujeme tak, abychom se posouvali dál. Ať už k úspěchu nebo k pohodovému soužití s ostatními. Děkuji, byly jste skvělé.“*
  - *„…že nám to druzí nedělají schválně. Větší pochopení potřeb lidí kolem mne. Moc děkuji, čas s vámi běžel neuvěřitelně rychle.“*
  - *„…uvědomění, jaký typ osobnosti jsem, konečně se začnu více chápat a více si rozumět. Děkuji vám za příjemné a přátelské prostředí, které jste vytvořili, a také za srozumitelné a zajímavé informace, které jistě využiji v praxi.“*
  - *„…že jsme každý jiný a bez tolerance a pochopení by nebylo možné existovat. A ta pestrost mě baví! Budu se učit tolerovat i sebe.“*

---

#### B. Co děláme (`/co-delame/`) & Training Subpages
- **Hero:**
  - **H1:** Můžeme vás podpořit
  - **H3:** Jsme partnery ve vzdělávání a rozvoji.
  - **Subtitle:** Také v anglickém a německém jazyce.
- **Main Text:**
  - **H4:** Spolupráce s námi vám přinese skutečné výsledky.
  - **Text:** Přístup, který funguje, je podporující, pozitivní a partnerský. Při práci využíváme a aplikujeme moderní poznatky neurovědy. Exkluzivně nabízíme tréninkový systém **Structogram** (akreditováno MPSV a MŠMT), opakovaně zvolený firmou Microsoft nejúspěšnějším školením roku. Z dalších technik používáme například neurolingvistické programování (NLP), mozkový jogging či principy mindfulness. A to v oblastech soft skills pro výrobní, obchodní, sociální i samosprávní sféru.
- **Banner Callout:**
  - **H1:** Bude vás to bavit
  - **Text:** Zmapujeme potenciál vašich pracovníků a společně dosáhneme potřebné změny.
  - **CTA:** Více o průběhu spolupráce (`/jak-to-probiha`)
- **Formy spolupráce na míru:**
  - Působíme formou kurzů, seminářů a workshopů. Naší specialitou je výcvik na pracovišti, spojený s tréninkem dovedností a auditem pracovních procesů. Pomáháme s výběrem zaměstnanců a jejich umisťováním na optimální pozice. Našim klientům nabízíme také prémiové služby jako koučink klíčových pracovníků, konzultace, poradenství a mentoring.

##### All 13 Training Topics (12 linked + 1 hidden page `/strategicky-rozvoj-skol/`):

1. **Structogram® a Triogram** (`/structogram/`)
   - *Subtitle:* Klíč ke sebepoznání a klíč k poznání druhých. Biostrukturální analýza trojjediného mozku.
   - *Accreditations:* AKREDITACE MPSV č. A2017/0551-SP/PC/VP | AKREDITACE MŠMT č.j.: MSMT – 15543/2018-3
   - *Format:* Dvoudenní tréninkový seminář
   - *Points:*
     - Získáte klíč ke změření vlivu trojjediného mozku na potenciál své osobnosti a provedete si vlastní biostrukturální analýzu
     - Porozumíte tomu, do jaké míry mají výsledky vliv na projevy chování a jak s nimi lze vědomě pracovat především na úrovni vztahů s ostatními lidmi
     - Budete schopni definovat své možnosti a hranice v souladu se svou osobností
     - Naučíte se používat rychlou analýzu druhých lidí včetně dovednosti předpovídat jejich chování a reakce, a tím se vyhnout případným konfliktům
     - Zvýšíte efektivitu jednání s klienty v osobním, telefonickém i písemném styku
     - Lépe porozumíte svým kolegům v práci, nadřízeným i podřízeným, snáze si získáte jejich důvěru

2. **Barevné učení** (`/barevne-uceni/`)
   - *Subtitle:* Seminář navazující na barevnou typologii Struktogram – Triogram pro zkvalitnění výuky prostřednictvím cílené individualizace
   - *Accreditation:* AKREDITACE MŠMT č.j.: MSMT – 21338/2020-4-434
   - *Format:* Jednodenní workshop
   - *Points:*
     - Prohloubíte sebepoznání díky reflexi vlastních potřeb v procesu učení.
     - Pomůžeme vám hledat a nacházet konkrétní strategie, metody a formy práce odpovídající potřebám jednotlivých typů barevné typologie.
     - Budete mít možnost vidět pestrost potřeb jednotlivců z hlediska procesu učení.
     - Odnesete si nejen nápady, ale především konkrétní plán, jak v případě potřeby výuku přizpůsobit jednotlivým typům tak, aby více respektovala jejich potřeby.

3. **Structogram® Choice of Profession** (`/choice-of-profession/`)
   - *Subtitle:* Program pro studenty, který využívá švýcarskou metodu Structogram®
   - *Format:* Jednodenní tréninkový seminář
   - *Points:*
     - Odkryjete své osobnostní silné stránky a talent, také svá osobnostní rizika a omezení
     - Lépe porozumíte důvodům a způsobům svého chování a jednání
     - Odhalíte, jaký způsob učení je pro vás nejefektivnější
     - Dozvíte se, co může být vaše „konkurenční výhoda“ na trhu práce a naopak, čeho se vyvarovat
     - Vytipujete si oblasti/obory/profese, které nejvíce odpovídají vaší osobnosti a kde budete moci nejvíce rozvinout svůj potenciál a talent – to je předpoklad pro to, aby vás vaše budoucí práce bavila

4. **Komunikace ve všech jejích podobách** (`/komunikace/`)
   - *Subtitle:* Asertivita, komunikace v souladu s fungováním mozku, vyjednávání, barevná komunikace, zvládání emocí a konfliktů.
   - *Points (Společně s námi):*
     - Pochopíte, jak mozek zpracovává informace, jak si lépe vzájemně rozumět a eliminovat nedorozumění.
     - Porozumíte nedoceněné neverbální komunikaci.
     - Identifikujete a vylepšíte si osobní komunikační styl.
     - Osvojíte si asertivní přístup.
     - Procvičíte si praktické komunikační techniky.
     - Seznámíte se s technikami a styly vyjednávání vedoucími k dosažení stanoveného cíle.
     - Naučíte se dívat pozitivně na konflikt a vhodně jej řešit.
     - Zvládnete lépe vlastní emoce i emoce ostatních.

5. **Trénink paměti** (`/trenink-pameti/`)
   - *Subtitle:* Mozkový jogging s trenérkami paměti III. stupně
   - *Points (Společně s námi):*
     - Zlepšíte si svou paměť a podpoříte celkovou činnost mozku tím, že vytváří tzv. kognitivní rezervu. Zvýšíte svou myšlenkovou aktivitu, kreativitu a výkonnost.
     - Seznámíte se s novými poznatky neurovědy o fungování lidského mozku. Naučíte se používat nejznámější mnemotechniky a vyzkoušíte si mnohá praktická cvičení.
     - Získáte informace o životním stylu, který prospívá zdravému vývoji mozku.

6. **Osobní rozvoj** (`/osobni-rozvoj/`)
   - *Subtitle:* Sebepoznání, sebepojetí a sebehodnocení, rozvinutí osobního potenciálu, sebekoučovací techniky, rozpoznání návyků a jejich změny, stanovování cílů.
   - *Points (Společně s námi):*
     - Poznáte sami sebe a díky tomu lépe porozumíte i druhým.
     - Porozumíte svým vnitřním konfliktům a omezením, které vám brání být produktivními.
     - Rozvinete svou emoční inteligenci a své stěžejní dovednosti.
     - Dozvíte se, jak naplno využít vnitřní kapacitu a dosáhnout optimálního výkonu.
     - Naučíte se, jak se „přeprogramovat“, aby vše běželo tak, jak chcete.
     - Podpoříte své sebevědomí a sebedůvěru.
     - Naučíte se stanovovat cíle tak, abyste jich skutečně dosáhli.

7. **Prezentační dovednosti** (`/prezentacni-dovednosti/`)
   - *Subtitle:* Nácvik prezentačních dovedností, interaktivní cílená prezentace, zvládání obtížných situací při prezentacích.
   - *Points (Společně s námi):*
     - Dokážete připravit prezentaci tak, aby splnila svůj účel.
     - Získáte návod jak zaujmout pozornost posluchačů, jak zasáhnout jejich emoce a inspirovat je.
     - Pochopíte, jaký má význam příběh při prezentaci.
     - Naučíte se zvládat trému.
     - Zvládnete námitky a negativní emoce svých posluchačů.
     - Procvičíte rétoriku a neverbální komunikaci.

8. **Prodejní dovednosti** (`/prodejni-dovednosti/`)
   - *Subtitle:* Úspěšný prodej, orientace na zákazníka, zvládání námitek a argumentace.
   - *Points (Společně s námi):*
     - Seznámíte se s barevnou obchodní komunikací vedoucí k obchodním výsledkům a dobrým vztahům.
     - Naučíte se snáze oslovovat nové klienty.
     - Zvýšíte svou vnitřní sebedůvěru a sebeúctu při obchodování.
     - Zbavíte se strachu z odmítnutí a pocitu studu z neúspěchu.
     - Osvojíte si postoje vedoucí ke zvýšení prodeje.
     - Pochopíte význam otázky při obchodním rozhovoru.
     - Osvojíte si, jak v sobě a v klientovi vyvolat pozitivní emoce a obrazy.
     - Naučíte se vytvářet optimální vztahy se zákazníky a jak o ně pečovat.

9. **Manažerské dovednosti** (`/manazerske-dovednosti/`)
   - *Subtitle:* Vedení lidí, situační vedení, hodnotící a motivační rozhovory, vytýkací a propouštěcí pohovory. Význam zpětné vazby a jak ji poskytovat a přijímat. Komunikace změny, vedení porad, leadership, neuroleadership.
   - *Points (Společně s námi):*
     - Poznáte a vylepšíte svůj manažerský styl.
     - Pochopíte principy manažerského rozhodování.
     - Zlepšíte své schopnosti delegovat.
     - Naučíte se, jak vést podřízené a rozvíjet jejich potenciál.
     - Dozvíte se vše o motivaci a zpětné vazbě a jak s nimi v praxi nakládat pro dosažení cílů.
     - Osvojíte si vedení obtížných rozhovorů.
     - Naučíte se efektivně vést porady a správně zadávat i kontrolovat úkoly.
     - Naučíte se uplatňovat vliv a přesvědčit své podřízené ke změně.
     - Stanete se leaderem svého týmu.
     - Seznámíte se s poznatky z oblasti neurovědy a principy fungování mozku při vedení lidí.

10. **Personalistika** (`/personalistika/`)
    - *Subtitle:* Optimalizace firemní kultury i hodnotících a odměňovacích systémů, nábor a výběr zaměstnanců, Assessment centrum a psychodiagnostika, behaviorální rozhovor, hodnocení 360° HR manažera jako business partnera.
    - *Points (Společně s námi):*
      - Dozvíte se proč a jak tvořit firemní kulturu.
      - Nastavíte si hodnotící a odměňovací systémy, které se projeví ve výkonu, kvalitě i atmosféře firmy.
      - Sestavíte program Assessment centra, včetně psychodiagnostiky.
      - Naučíte se vést behaviorální a další personální rozhovory.
      - Osvojíte si roli HR manažera jako business partnera vedení firmy.

11. **Work life balance** (`/work-life-balance/`)
    - *Subtitle:* Jak sladit všechny složky života a být spokojení, time management IV. generace, stress management, stav FLOW a jak ho dosáhnout, sebemotivace.
    - *Points (Společně s námi):*
      - Pochopíte, jak důležité je žít v souladu se sebou i okolím a jak si vytvořit podmínky pro spokojený život.
      - Naučíte se, jak se stát tím, kdo řídí váš čas.
      - Podíváte se na stres z jiného úhlu pohledu a dozvíte se, jak si z něj udělat pomocníka.
      - Osvojíte si principy sebemotivace a jak čerpat vnitřní energii.
      - Dozvíte se, jak žít tady a teď.
      - Podpoříte svůj FLOW stav.

12. **Využití vlastního potenciálu** (`/vyuziti-vlastniho-potencialu/`)
    - *Subtitle:* Kreativita a představivost, myšlenkové mapy, kritické myšlení, mozkový jogging, trénink paměti, pozitivní změna a jak ji dosáhnout.
    - *Points (Společně s námi):*
      - Naučíte se, jak rozvíjet svou kreativitu a představivost.
      - Dozvíte se, co je kritické myšlení, jak si ho osvojit a rozvíjet.
      - Naučíte se pracovat s myšlenkovou mapou.
      - Osvojíte si techniky k rozvíjení mozkové činnosti.
      - Zlepšíte své soustředění.
      - Pochopíte, jak pracuje naše paměť, jak ji posilovat a rozvíjet.
      - Naučíte se vnímat změnu jako příležitost, nebát se jí a vytěžit z ní maximum.

13. **Strategický rozvoj škol** (`/strategicky-rozvoj-skol/` — *unlinked in current UI, discovered via WP API*)
    - *Subtitle:* Vize školy, strategický plán rozvoje, standard kvality výuky, kolegiální podpora.
    - *Points (Společně s námi):*
      - Získáte průvodce ve vašem dlouhodobém rozvoji
      - Sestavíte se svým týmem vizi školy, ke které chcete společně směřovat
      - Uvědomíte si hodnoty a kvality, které jsou ve vaší škole přítomny
      - Stanovíte si oblasti rozvoje vaší školy
      - Vytvoříte plán, který vám cestu k cíli usnadní
      - Stanovíte si akční kroky a posílíte spolupráci při jejich naplňování
      - Rozvinete a posílíte kolegiální podporu v týmu
      - Zvýšíte kvalitu výuky a zacílíte svůj profesní rozvoj

---

#### C. Jak to probíhá (`/jak-to-probiha/`)
- **Hero:**
  - **H1:** Průběh spolupráce
  - **H3:** *Jak to probíhá – krok za krokem*
- **5-Step Timeline:**
  1. **Začínáme:** Od okamžiku, kdy projevíte zájem spolupracovat, jsme tady pro vás. Nejdříve si domluvíme schůzku. Věříme v dlouhodobou spolupráci založenou na osobním přístupu a kvalitních vztazích, v podporující atmosféru a profesionalitu.
  2. **Analyzujeme vaše potřeby:** Smyslem kvalitního rozvojového programu je změna. Analýza potřeb pomůže ujasnit, jakou změnu si pro sebe a svůj tým přejete. Máte mezinárodní tým? Školíme také anglicky či německy.
  3. **Tvoříme váš vzdělávací program:** V domluveném termínu od nás obdržíte možné alternativy a společně doladíme váš vzdělávací a rozvojový program. Následně připravíme zcela konkrétní návrh vzdělávací aktivity, její obsah a časový rozsah, studijní podklady, lektorské zajištění. Kompletní realizační servis dle přání klienta. V tuto chvíli také od nás obdržíte cenovou kalkulaci k odsouhlasení.
  4. **Realizujeme váš vzdělávací program:** Přípravy proběhly podle domluvy a jdeme na to. Při práci využíváme moderní certifikované metody jako je Structogram, neurolingvistické programování či certifikovaná psychodiagnostika. Jsme otevření také netradičním a inovativním technikám. Působíme na rozvoj celé osobnosti účastníků. Podporujeme zdravé návyky a dovednosti, sebevědomí a sebedůvěru.
  5. **A co dál?:** Vzdělávání proběhlo a vy od nás obdržíte hodnotící zprávu. Její samozřejmou součástí jsou doporučení pro další rozvoj. Rozvoj je proces a nastartovaná změna se u vás musí zabydlet. S časovým odstupem si můžeme společně vyhodnotit, jak konkrétně se vaše investice do vzdělání projevila. Ať už se jedná o prodej, kvalitu, produktivitu či oblast komunikace. Chcete nyní v nastoupené cestě rozvoje pokračovat? Pak jsme v tom rádi nadále s vámi.

---

#### D. O nás (`/o-nas/`)
- **Hero:**
  - **H1:** Náš tým
  - **Subtitle:** *Jsme kreativní parta. Vyznáváme spolehlivost a férovost.*
- **Intro:**
  - **H4:** Jak jsme se dali dohromady?
  - **Text:** Spojilo se přátelství, vzájemná úcta, respekt a důvěra. To vše posíleno společným úsilím.
- **Core Team Members:**
  1. **Magda Ožanová** — *Lektorka, konzultantka, kouč*
     - *Short bio:* Věřím, že hluboko v nás všech jsou vnitřní zdroje. Celoživotní schopnost učit se a růst, uzdravovat a proměňovat sebe sama. Je na každém z nás, jestli je vyneseme na povrch, napojíme se na ně a začneme z nich čerpat. Proto jsem ráda, že mohu být při tom, když lidé kolem mě hledají a rozvíjejí pozitivní, konstruktivní a transformující pohled na lidskou podstatu.
     - *Extended bio (from `/magda/`):* Cílem je být v souladu sám se sebou, dobře vycházet s druhými lidmi a být spokojený se svým příspěvkem celku. Tyto hodnoty jsou pro nás důležité v pracovním i osobním životě. V oblasti vzdělávání dospělých mám více než desetiletou praxi. Široký záběr znalostí a dovedností potřebných pro práci lektorky a konzultantky jsem získala mnohaletou manažerskou praxí v českých i zahraničních firmách. Baví mě předávat nabyté zkušenosti zasazené do rámce efektivních vzdělávacích metod a technik.
  2. **Lenka Hartmannová** — *Lektorka, kouč, mentor*
     - *Short bio:* Celý život se rozvíjet, vzdělávat a pracovat na sobě je moje záliba. Díky našemu týmu spojuji svou radost s prací. Tak ji mohu násobit a hlavně sdílet s dalšími lidmi. Věřím v růst, v to, že na svou životní spokojenost a úspěch máme zásadní vliv my sami. Bez ohledu na okolnosti a podmínky jsme to právě my, kdo rozhoduje, jak svět kolem vnímáme.
     - *Extended bio (from `/lenka/`):* V „A co dál“ jsem lektorkou rozvojových vzdělávacích programů a také koučkou a mentorkou. Věnovat se vám budu jak individuálně, tak spolu s vaším týmem. Mám dlouholeté zkušenosti se vzděláváním pestrých skupin různého věku či národností, mnoho let jsem strávila také v manažerských pozicích. Obojí mi nyní poskytuje pevnou oporu při práci s klienty. Pracuji laskavě a všímavě, s důvěrou v klienta. Každý z nás si v sobě nese řešení a odpovědi na své otázky. Při jejich hledání vás mohu provázet.
  3. **Tereza Ožanová** — *Lektorka, kouč*
     - *Bio:* Na lektorování mě baví potkávat se stále s novými tvářemi, to spoluvytváření a vzájemná interakce. Každý kurz je vždy jedinečný. Podstatné je pro mne se na účastníky naladit a pak může být naše společná práce efektivní. To jsou hlavní důvody, proč se na každý kurz a nové účastníky těším stejně jako poprvé před jedenácti lety.
  4. **Andrea Kubátová** — *Finanční a realizační manažerka*
     - *Bio:* Oblast vzdělávání a tým úžasných inspirativních osob kolem mne byl jasným signálem mé další cesty. Vystudovala jsem ekonomiku podniku a několik let strávila na půdě mezinárodní školy v roli finančního manažera a koordinátora vzdělávacích projektů. V „A co dál“ jsem připravena vám pomoci s finančními či organizačními dotazy na naši práci. Jsem zodpovědná za veškerou administraci společnosti, tak aby naši lektoři mohli s vámi nerušeně růst a spolupracovat.
- **Externí lektoři:**
  - Mgr. Saša Dobrovolná (`sasa.dobrovolna@gmail.com`, `+420 603 727 081`)
  - Mgr. Jarmila Polomská (`jarmila.polomska@zsrovniny.cz`, `+420 775 132 963`)
  - Mgr. Alena Pokorná (`aapokorni@gmail.com`, `+420 739 584 120`)
  - *(Note: Confirm whether external lecturers & their personal phone/emails should remain on the new site)*
- **Příběh, jak to celé vzniklo:**
  - „Čekám na začátek koučovacího výcviku a volá Tereza. ‚Tak jsme to probíraly s Magdou, Leni, měla bys chuť pomoct, že bychom se do toho pustily samy? A co Andrea, bez ní se neobejdeme, někdo nám to musí spočítat.‘ Pokládám telefon a jasně si uvědomuji ten moment, kdy k člověku přirozeně doplulo, po čem dávno toužil. A co nechce nechat odplynout. Tolik ve zkratce cesta dlouhého příběhu tvoření s radostí. Těšíme se, že budete i vy jeho součástí.“

---

#### E. Kontakty (`/kontakty/`)
- **Primary Contact:**
  - Telefon: `+420 604 392 543`
  - E-mail: `kontakt@acodal.cz`
- **Osobní kontakty:**
  - **Magda Ožanová:** `+420 736 734 809` | `magdalena.ozanova@acodal.cz`
  - **Tereza Ožanová:** `+420 604 392 543` | `tereza.ozanova@acodal.cz`
  - **Lenka Hartmannová:** `+420 777 230 090` | `lenka.hartmannova@acodal.cz`
  - **Andrea Kubátová:** `+420 777 052 267` | `kontakt@acodal.cz`
- **Fakturační údaje:**
  - **A CO DÁL, s.r.o.**
    - IČ: `01771264`
    - Sídlo: Holandská 865/11, 715 00 Ostrava-Michálkovice
    - Bankovní účet: `2701349538/2010` (Fio banka)
  - **A co dál – centrum rozvoje, z.ú.**
    - IČ: `09557181`
    - Sídlo: Křižíkova 2850/6, 702 00 Ostrava
    - Bankovní účet: `2301875387/2010` (Fio banka)
- **Social Links:**
  - Facebook: `https://www.facebook.com/acodal1/`
  - LinkedIn: `https://www.linkedin.com/company/a-co-dál-s-r-o/about`

---

## 4. Media & Asset Catalog (URLs for Downloading)

### 4.1 Brand & Team Photography (High-Value Original Assets)
- **Brand Logo (PNG):** `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926449963.png`
- **Home Hero Team Photo (4 women in park):** `https://acodal.cz/wp-content/uploads/2021/09/DSC_6819-Edit.jpg`
- **About Us Hero Team Photo:** `https://acodal.cz/wp-content/uploads/2021/09/tym.jpg`
- **Contacts Hero Team Photo:** `https://acodal.cz/wp-content/uploads/2021/09/DSC_7010-Edit-Edit.jpg`
- **Individual Portraits:**
  - **Magda Ožanová:** `https://acodal.cz/wp-content/uploads/2021/09/DSC_6958-2.jpg` & `https://acodal.cz/wp-content/uploads/2021/09/DSC_6958-Edit.jpg`
  - **Lenka Hartmannová:** `https://acodal.cz/wp-content/uploads/2021/09/DSC_6924-2.jpg` & `https://acodal.cz/wp-content/uploads/2021/09/DSC_6924-Edit.jpg`
  - **Tereza Ožanová:** `https://acodal.cz/wp-content/uploads/2021/09/DSC_6928.jpg`
  - **Andrea Kubátová:** `https://acodal.cz/wp-content/uploads/2021/09/DSC_6969.jpg`
  - *(Legacy portrait - Petra Kluzová):* `https://acodal.cz/wp-content/uploads/2019/06/DSC_3484-1.jpg`

### 4.2 Section & Banner Backgrounds
- **Home Case Study Parallax (Coastal Sunset):** `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926404657.jpeg`
- **Co děláme Hero (Autumn Leaves):** `https://acodal.cz/wp-content/uploads/2018/09/20171004114925912214-4.jpeg`
- **Co děláme Mid-Banner ("Bude vás to bavit"):** `https://acodal.cz/wp-content/uploads/2018/09/20171004114926606055.jpeg`
- **Jak to probíhá Hero:** `https://acodal.cz/wp-content/uploads/2018/09/20171004114926382288.jpeg`
- **Jak to probíhá 5 Step Illustrations (Recovered from production server):**
  1. Step 1: `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114925981837.jpeg`
  2. Step 2: `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926508432.jpeg`
  3. Step 3: `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926308371.jpeg`
  4. Step 4: `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926208190.jpeg`
  5. Step 5: `https://acodal.cz/wp-content/themes/acodal/media/uploads/20171004114926198070.jpeg`

### 4.3 Client Reference Logos (47 Organizations across 3 Sectors)
Can be grouped into 3 clear categories for a much cleaner presentation:
- **Firms & Corporations (15):** Tokoz, Kooperativa, Allianz, Alvaris, Veolia, ABB Ostrava, První Chodská, ASPEC, iMPS, Schott, Elektro-Projekce, ReadyMat, ZOO Hodonín, Teleperformance, Polovina Nebe.
- **Public Sector, Ministries & Municipalities (13):** MŠMT, Ministerstvo zemědělství, Moravskoslezský kraj, Kraj Vysočina, Ústecký kraj, Zlínský kraj, KVIC, MAS Rýmařovsko, MAS Opavsko, MAS Hlučínsko, Město Bílovec, Město Orlová, Město Hlučín, Město Kopřivnice, Domov pro seniory Třebíč.
- **Schools & Gymnázia (19):** Slezské Gymnázium Opava, SPŠE Havířov, ZŠ Hlučín Rovniny, ZŠ a MŠ Ludgeřovice, ZŠ Dr. Miroslava Tyrše, ZŠ Opava Havlíčkova, ZŠ Šenov, ZŠ a MŠ Píšť, ZŠ Porubská 832, MŠ Kopřivnice, ZŠ Nový svět, ZŠ Ostrčilova, ZŠ Klimkovice, ZŠJN Krnov, ZŠ Kpt. Vajdy, ZUŠ Frenštát p. Radhoštěm, MŠ Ukrajinská.

---

## 5. Design & Architecture Recommendations for the New Static / SPA Site

1. **Architecture — Single-Page Application (SPA) or Multi-Section Static Site:**
   - Since there is no need for a CMS, the entire site can be a fast, zero-maintenance static build (e.g., **Astro**, **Vite + React/Vue**, or **clean HTML/Tailwind/JS**) hosted for free on GitHub Pages, Cloudflare Pages, Azure Static Web Apps, or Netlify.
   - Instead of forcing users to click through **23 separate pages** (many of which only have 5 bullet points), we can consolidate the experience into a **rich, cohesive single-page flow** (or a 3–4 view SPA) with smooth anchor navigation and interactive topic drawers/tabs.

2. **Interactive "Co děláme" (Training Catalog) Showcase:**
   - Group the 13 training topics into 3 intuitive pillars with filter tabs or interactive cards:
     - **Vlajkové programy & Neurověda:** *Structogram® a Triogram, Barevné učení, Structogram® Choice of Profession, Trénink paměti*
     - **Rozvoj firem a týmů:** *Manažerské dovednosti, Komunikace, Prodejní dovednosti, Prezentační dovednosti, Personalistika*
     - **Osobní rozvoj & Školství:** *Osobní rozvoj, Work-life balance, Využití vlastního potenciálu, Strategický rozvoj škol*
   - Clicking any card reveals the full bullet points, accreditation badges (MPSV / MŠMT), and format (1-day / 2-day workshop) right in place without a slow page reload.

3. **Audience-Tailored Entry Points:**
   - Highlight the 3 target segments right below the hero: **Pro firmy**, **Pro školy a pedagogy**, **Pro úřady a instituce**, allowing visitors to immediately see relevant services and references.

4. **Consolidated Team & Story Section:**
   - Combine the short and extended bios for **Magda, Lenka, Tereza, and Andrea** into unified, well-balanced profile cards with their direct email/phone contact and the warm founding story (*"Jak to celé vzniklo"*).

5. **Categorized Client References:**
   - Replace the wall of 47 unevenly sized logos with a clean, categorized logo showcase (or subtle grayscale-to-color grid/marquee) split by *Firmy*, *Veřejná správa*, and *Školy*.
