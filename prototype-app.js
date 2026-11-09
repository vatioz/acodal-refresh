// PROTOTYPE: Four radically different variants of the new Acodal.cz site, switchable via ?variant=A|B|C|D and the floating bottom switcher.
// Throwaway prototype code to help the owners evaluate layout, information hierarchy, and interactive behavior.

(function () {
  const DATA = window.ACODAL_DATA;

  const VARIANTS = [
    {
      key: "A1",
      name: "A1 · Warm Sand & Orange",
      czTitle: "Varianta A1: Písková & Oranžová (Vzdušná & soustředěná)",
      philosophy: "Soustředěná prezentace s přepínačem kapitol (Přehled / Kurzy / Příběh & Tým) a pravým vysouvacím panelem detailu kurzu.",
      primaryAffordance: "Stručný přehled 6 stěžejních témat (+ rozbalení všech 13) + pravý panel (drawer)"
    },
    {
      key: "A2",
      name: "A2 · Nordic Forest & Terracotta",
      czTitle: "Varianta A2: Severský les & Terakota (Vzdušná & soustředěná)",
      philosophy: "Stejné zjednodušené rozvržení s pravým vysouvacím panelem v klidné přírodní paletě šalvěje (#F2F6F4), borovice (#122A23) a terakoty (#C85232).",
      primaryAffordance: "Stručný přehled + přepínač kapitol + pravý panel detailu kurzu"
    },
    {
      key: "A3",
      name: "A3 · Royal Navy & Amber Gold",
      czTitle: "Varianta A3: Královská modř & Jantar (Vzdušná & soustředěná)",
      philosophy: "Stejné zjednodušené rozvržení s pravým vysouvacím panelem v akademické a korporátní paletě alabastru (#F4F7FB), indiga (#0F1E36) a jantaru (#D97706).",
      primaryAffordance: "Stručný přehled + přepínač kapitol + pravý panel detailu kurzu"
    },
    {
      key: "B",
      name: "Audience-First Hub",
      czTitle: "Rozcestník na míru cílové skupině",
      philosophy: "Návštěvník si hned nahoře zvolí, zda je Firma, Škola nebo Úřad. Celá stránka (témata, reference i formáty) se okamžitě přizpůsobí.",
      primaryAffordance: "Živý přepínač segmentů + dvousloupcový průzkumník kurzů"
    },
    {
      key: "C",
      name: "Swiss Architectural Grid",
      czTitle: "Švýcarská typografie & otevřený rejstřík (Bez karet)",
      philosophy: "Žádné zaoblené rámečky v rámečcích. Čistá švýcarská typografie, ostré dělící linky (1px), paleta lesní šalvěje, alabastru a vermilionu.",
      primaryAffordance: "Interaktivní typografický rejstřík (01–13) + Structogram® filtr rovnou v řádcích"
    },
    {
      key: "D",
      name: "Nordic Color-Block Canvas",
      czTitle: "Severské barevné plochy & živý konfigurátor (Bez rámečků)",
      philosophy: "Žádné vnořené karty ani ohraničení. Celá šířka obrazovky pracuje s kontrastními barevnými pásy (půlnoční modř, šalvěj, krémová) a velkou typografií.",
      primaryAffordance: "Plynulý větný konfigurátor („Jsme [Škola] a řešíme [Sebepoznání]…“) + otevřené barevné pásy"
    },
    {
      key: "E",
      name: "Botanical Magazine",
      czTitle: "Magazínový lookbook (Lesní zelená & len)",
      philosophy: "Vzhled tištěného skandinávského magazínu. Asymetrické dvousloupcové sazby, fotografie na spad, žádné UI krabičky, přírodní paleta lesa a lnu.",
      primaryAffordance: "Časopisecký rozcestník kapitol + rozbalování sylabu přímo v textu jako v knize"
    }
  ];

  // In-memory prototype state (surfaced in the prototype state inspector)
  const state = {
    variant: getInitialVariant(),
    // Variant A state (shared across A1, A2, A3 so switching color schemes keeps your open drawer/filter!)
    aDensity: "focused", // "focused" (Stručný přehled ~60% méně textu) | "full" (Plný obsah na 1 stránce)
    aView: "domu", // "domu" (Úvod & kurzy) | "jak" (Jak pracujeme & Příběh) | "onas" (Tým, reference & kontakt)
    aAudience: "all", // "all" | "firmy" | "skoly" | "urady"
    aShowAllCourses: false,
    aShowAllQuotes: false,
    aShowAllLogos: false,
    aPillar: "all",
    aDrawerTopicId: null,
    aClientTab: "firmy",
    aExpandedTeamId: null,
    // Variant B state
    bAudience: "skoly",
    bSelectedTopicId: "barevne-uceni",
    // Variant C state (Swiss Architectural Grid — zero nested rounded cards)
    cDensity: "focused", // "focused" (3 architektonické listy) | "full" (vše pod sebou)
    cView: "index", // "index" (01 Rejstřík témat) | "metodika" (02 Metodika & Data) | "tym" (03 Partnerky & Reference)
    cBrainColor: "all", // all | green | red | blue
    cOpenTopicId: null,
    cShowAllCourses: false,
    cExpandedTeamId: null,
    cShowAllLogos: false,
    cClientSector: "firmy",
    // Variant D state (Nordic Color-Block Canvas — sentence configurator, borderless bands)
    dQuiz: {
      q1: "skoly",
      q2: "neuro",
      q3: "workshop"
    },
    dExpandedTopicId: "barevne-uceni",
    // Variant E state (Botanical Magazine — editorial lookbook)
    eDensity: "focused", // "focused" (3 časopisecké dvoustrany) | "full" (celé číslo pod sebou)
    eView: "programy", // "programy" (I. Úvodník & Kapitoly) | "cesta" (II. Pět zastavení & Reportáž) | "autorky" (III. Autorky & Kolofon)
    ePillar: "all",
    eOpenTopicId: null,
    eShowAllCourses: false,
    eExpandedTeamId: null,
    eActiveStep: 1,
    // Switcher inspector visibility
    showStateHud: false,
    switcherMinimized: false,
    inquiryToast: null
  };

  function getInitialVariant() {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("variant") || "A1").toUpperCase();
    const v = raw === "A" ? "A1" : raw;
    return VARIANTS.some((item) => item.key === v) ? v : "A1";
  }

  function setVariant(newKey, pushUrl = true) {
    const normalized = newKey === "A" ? "A1" : newKey;
    const valid = VARIANTS.find((v) => v.key === normalized) ? normalized : "A1";
    const wasAFamily = state.variant.startsWith("A");
    const isAFamily = valid.startsWith("A");
    state.variant = valid;
    if (pushUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("variant", valid);
      window.history.replaceState({ variant: valid }, "", url.toString());
    }
    // Keep scroll position when comparing A1 / A2 / A3 side-by-side!
    if (!(wasAFamily && isAFamily)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    render();
  }

  window.addEventListener("popstate", () => {
    state.variant = getInitialVariant();
    render();
  });

  // Keyboard Left / Right arrow switching per UI.md spec
  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    const isEditable = tag === "input" || tag === "textarea" || tag === "select" || (e.target && e.target.isContentEditable);
    if (isEditable) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      cycleVariant(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      cycleVariant(1);
    } else if (e.key === "h" || e.key === "H") {
      state.switcherMinimized = !state.switcherMinimized;
      render();
    } else if (e.key === "Escape") {
      if (state.aDrawerTopicId || state.dModalTopicId) {
        state.aDrawerTopicId = null;
        state.dModalTopicId = null;
        render();
      }
    }
  });

  function cycleVariant(delta) {
    const idx = VARIANTS.findIndex((v) => v.key === state.variant);
    const nextIdx = (idx + delta + VARIANTS.length) % VARIANTS.length;
    setVariant(VARIANTS[nextIdx].key);
  }

  // Expose actions globally for inline handlers in this throwaway prototype
  window.PROTO = {
    setVariant,
    cycleVariant,
    toggleHud() {
      state.showStateHud = !state.showStateHud;
      render();
    },
    toggleSwitcher() {
      state.switcherMinimized = !state.switcherMinimized;
      render();
    },
    // Variant A actions
    setAAudience(aud) {
      state.aAudience = aud;
      render();
    },
    setAView(view) {
      state.aView = view;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    },
    toggleADensity() {
      state.aDensity = state.aDensity === "focused" ? "full" : "focused";
      render();
    },
    toggleAShowAllCourses() {
      state.aShowAllCourses = !state.aShowAllCourses;
      render();
    },
    toggleAShowAllQuotes() {
      state.aShowAllQuotes = !state.aShowAllQuotes;
      render();
    },
    toggleAShowAllLogos() {
      state.aShowAllLogos = !state.aShowAllLogos;
      render();
    },
    setAPillar(p) {
      state.aPillar = p;
      render();
    },
    openADrawer(topicId) {
      state.aDrawerTopicId = topicId;
      render();
    },
    closeADrawer() {
      state.aDrawerTopicId = null;
      render();
    },
    setAClientTab(tab) {
      state.aClientTab = tab;
      state.aShowAllLogos = false;
      render();
    },
    toggleATeam(id) {
      state.aExpandedTeamId = state.aExpandedTeamId === id ? null : id;
      render();
    },
    // Variant B actions
    setBAudience(audId) {
      state.bAudience = audId;
      const aud = DATA.audiences.find((a) => a.id === audId);
      if (aud && aud.featuredTopics.length > 0) {
        state.bSelectedTopicId = aud.featuredTopics[0];
      }
      render();
    },
    setBTopic(topicId) {
      state.bSelectedTopicId = topicId;
      render();
    },
    // Variant C actions (Swiss Architectural Grid)
    setCView(view) {
      state.cView = view;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    },
    toggleCDensity() {
      state.cDensity = state.cDensity === "focused" ? "full" : "focused";
      render();
    },
    setCBrainColor(color) {
      state.cBrainColor = color;
      render();
    },
    selectCTopic(topicId) {
      state.cOpenTopicId = state.cOpenTopicId === topicId ? null : topicId;
      render();
    },
    toggleCShowAllCourses() {
      state.cShowAllCourses = !state.cShowAllCourses;
      render();
    },
    toggleCTeam(id) {
      state.cExpandedTeamId = state.cExpandedTeamId === id ? null : id;
      render();
    },
    toggleCShowAllLogos() {
      state.cShowAllLogos = !state.cShowAllLogos;
      render();
    },
    setCClientSector(sector) {
      state.cClientSector = sector;
      state.cShowAllLogos = false;
      render();
    },
    // Variant D actions (Nordic Color-Block Canvas)
    setDQuizAnswer(qKey, optionId) {
      state.dQuiz[qKey] = optionId;
      render();
    },
    toggleDTopic(topicId) {
      state.dExpandedTopicId = state.dExpandedTopicId === topicId ? null : topicId;
      render();
    },
    // Variant E actions (Botanical Magazine Lookbook)
    setEView(view) {
      state.eView = view;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    },
    toggleEDensity() {
      state.eDensity = state.eDensity === "focused" ? "full" : "focused";
      render();
    },
    setEPillar(pillar) {
      state.ePillar = pillar;
      render();
    },
    toggleETopic(topicId) {
      state.eOpenTopicId = state.eOpenTopicId === topicId ? null : topicId;
      render();
    },
    toggleEShowAllCourses() {
      state.eShowAllCourses = !state.eShowAllCourses;
      render();
    },
    toggleETeam(id) {
      state.eExpandedTeamId = state.eExpandedTeamId === id ? null : id;
      render();
    },
    setEStep(stepNum) {
      state.eActiveStep = stepNum;
      render();
    },
    // Stub inquiry submission
    triggerInquiry(contextLabel) {
      state.inquiryToast = `Poptávka připravena (PROTOTYP): „${contextLabel}“ → kontakt@acodal.cz`;
      render();
      setTimeout(() => {
        state.inquiryToast = null;
        render();
      }, 4000);
    }
  };

  // Helper: Pillar badge styling
  function getPillarBadge(pillar) {
    if (pillar === "neuro") return { bg: "bg-[#FDF1E6]", text: "text-[#B8570A]", border: "border-[#F5D0B1]", label: "Structogram® & Neurověda" };
    if (pillar === "teams") return { bg: "bg-[#E9F5EF]", text: "text-[#1F6346]", border: "border-[#BDE2CF]", label: "Lidé, Týmy & Byznys" };
    return { bg: "bg-[#EBF2F8]", text: "text-[#224C70]", border: "border-[#C1D8EC]", label: "Osobní růst & Školství" };
  }

  function getAudienceBadges(audList) {
    const map = {
      firmy: "Firmy",
      skoly: "Školy",
      urady: "Úřady"
    };
    return audList.map((a) => map[a] || a);
  }

  // ============================================================================
  // VARIANT A PALETTES: A1 (Warm Sand & Orange), A2 (Nordic Forest & Terracotta), A3 (Royal Navy & Amber Gold)
  // ============================================================================
  const A_THEMES = {
    A1: {
      key: "A1",
      label: "A1 · Písková & Oranžová",
      swatch: ["#FAF6F1", "#1F1C19", "#E77817"],
      pageBg: "bg-[#FAF6F1]",
      pageText: "text-[#23201D]",
      selection: "selection:bg-[#E77817] selection:text-white",
      ribbonBg: "bg-[#1F1C19]",
      ribbonText: "text-[#ECDED1]",
      ribbonMuted: "text-[#D5C7B8]",
      headerBg: "bg-[#FAF6F1]/95",
      border: "border-[#E5D9CC]",
      borderSoft: "border-[#E5D9CC]/80",
      heading: "text-[#171717]",
      bodyMuted: "text-[#58514A]",
      subMuted: "text-[#786D63]",
      accentText: "text-[#E77817]",
      accentHoverText: "hover:text-[#E77817]",
      groupHoverAccentText: "group-hover:text-[#E77817]",
      hoverBorderAccent: "hover:border-[#E77817]",
      accentBg: "bg-[#E77817]",
      accentBtn: "bg-[#E77817] hover:bg-[#BB6316] text-white",
      pillActive: "bg-[#171717] text-white shadow-sm",
      pillInactive: "bg-[#FAF6F1] text-[#4A433C] hover:bg-[#ECDED1] border border-[#E5D9CC]",
      heroBadge: "bg-[#ECDED1] text-[#8C4507]",
      cardBg: "bg-[#FAF6F1] hover:bg-white",
      darkSectionBg: "bg-[#1F1C19]",
      darkHighlight: "text-[#F5B073]",
      darkBadge: "bg-[#E77817]/20 text-[#F5B073]",
      darkBody: "text-[#EAE0D5]",
      storyBox: "bg-[#ECDED1]/60 border-[#DFCBB8]",
      storyTag: "text-[#8C4507]",
      footerBg: "bg-[#171717]",
      drawerHeaderBg: "bg-[#FAF6F1]",
      drawerCheck: "bg-[#E77817]/15 text-[#E77817]"
    },
    A2: {
      key: "A2",
      label: "A2 · Severský les & Terakota",
      swatch: ["#F2F6F4", "#122A23", "#C85232"],
      pageBg: "bg-[#F2F6F4]",
      pageText: "text-[#162620]",
      selection: "selection:bg-[#1B5E49] selection:text-white",
      ribbonBg: "bg-[#0E221C]",
      ribbonText: "text-[#D9E8E2]",
      ribbonMuted: "text-[#A7C4B8]",
      headerBg: "bg-[#F2F6F4]/95",
      border: "border-[#D3E0DA]",
      borderSoft: "border-[#D3E0DA]/80",
      heading: "text-[#0F241D]",
      bodyMuted: "text-[#425950]",
      subMuted: "text-[#5E786E]",
      accentText: "text-[#C85232]",
      accentHoverText: "hover:text-[#C85232]",
      groupHoverAccentText: "group-hover:text-[#1B5E49]",
      hoverBorderAccent: "hover:border-[#1B5E49]",
      accentBg: "bg-[#1B5E49]",
      accentBtn: "bg-[#1B5E49] hover:bg-[#134636] text-white",
      pillActive: "bg-[#122A23] text-white shadow-sm",
      pillInactive: "bg-[#F2F6F4] text-[#2F473E] hover:bg-[#E1ECE7] border border-[#D3E0DA]",
      heroBadge: "bg-[#E0EDE7] text-[#154D3B]",
      cardBg: "bg-[#F2F6F4] hover:bg-white",
      darkSectionBg: "bg-[#122A23]",
      darkHighlight: "text-[#7CE0B8]",
      darkBadge: "bg-[#2A7B60]/30 text-[#8DF0C8]",
      darkBody: "text-[#D7E8E1]",
      storyBox: "bg-[#E1ECE7]/75 border-[#C4D8CE]",
      storyTag: "text-[#154D3B]",
      footerBg: "bg-[#0B1B16]",
      drawerHeaderBg: "bg-[#F2F6F4]",
      drawerCheck: "bg-[#1B5E49]/15 text-[#1B5E49]"
    },
    A3: {
      key: "A3",
      label: "A3 · Královská modř & Jantar",
      swatch: ["#F4F7FB", "#0F1E36", "#D97706"],
      pageBg: "bg-[#F4F7FB]",
      pageText: "text-[#152238]",
      selection: "selection:bg-[#1D4ED8] selection:text-white",
      ribbonBg: "bg-[#0B1629]",
      ribbonText: "text-[#DCE6F5]",
      ribbonMuted: "text-[#9EB3D1]",
      headerBg: "bg-[#F4F7FB]/95",
      border: "border-[#D6E0EE]",
      borderSoft: "border-[#D6E0EE]/80",
      heading: "text-[#0F1E36]",
      bodyMuted: "text-[#43546E]",
      subMuted: "text-[#647691]",
      accentText: "text-[#1D4ED8]",
      accentHoverText: "hover:text-[#1D4ED8]",
      groupHoverAccentText: "group-hover:text-[#1D4ED8]",
      hoverBorderAccent: "hover:border-[#1D4ED8]",
      accentBg: "bg-[#D97706]",
      accentBtn: "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white",
      pillActive: "bg-[#0F1E36] text-white shadow-sm",
      pillInactive: "bg-[#F4F7FB] text-[#334563] hover:bg-[#E4ECF7] border border-[#D6E0EE]",
      heroBadge: "bg-[#E3ECFA] text-[#1E40AF]",
      cardBg: "bg-[#F4F7FB] hover:bg-white",
      darkSectionBg: "bg-[#0F1E36]",
      darkHighlight: "text-[#FBBF24]",
      darkBadge: "bg-[#F59E0B]/20 text-[#FCD34D]",
      darkBody: "text-[#DCE6F5]",
      storyBox: "bg-[#E4ECF7]/75 border-[#C7D6EB]",
      storyTag: "text-[#1E40AF]",
      footerBg: "bg-[#091324]",
      drawerHeaderBg: "bg-[#F4F7FB]",
      drawerCheck: "bg-[#1D4ED8]/15 text-[#1D4ED8]"
    }
  };

  // ============================================================================
  // VARIANT A: WARM EDITORIAL STORY ("Vzdušný přehled s přepínačem kapitol & pravým panelem")
  // ============================================================================
  function renderVariantA(themeKey = "A1") {
    const T = A_THEMES[themeKey] || A_THEMES.A1;
    const isFocused = state.aDensity === "focused";
    const view = state.aView || "domu"; // "domu" | "jak" | "onas"

    // Filter topics by audience OR pillar
    let filteredTopics = DATA.topics;
    if (state.aAudience !== "all") {
      filteredTopics = filteredTopics.filter((t) => t.audiences.includes(state.aAudience));
    }
    if (state.aPillar !== "all") {
      filteredTopics = filteredTopics.filter((t) => t.pillar === state.aPillar);
    }

    // In Focused mode, show top 6 courses first unless expanded
    const visibleTopics = (isFocused && !state.aShowAllCourses && state.aPillar === "all" && state.aAudience === "all")
      ? filteredTopics.slice(0, 6)
      : filteredTopics;
    const hiddenTopicsCount = filteredTopics.length - visibleTopics.length;

    const activeTopic = state.aDrawerTopicId
      ? DATA.topics.find((t) => t.id === state.aDrawerTopicId)
      : null;

    const currentClients = DATA.clients[state.aClientTab] || DATA.clients.firmy;
    const visibleClients = (isFocused && !state.aShowAllLogos)
      ? currentClients.slice(0, 6)
      : currentClients;

    const visibleQuotes = (isFocused && !state.aShowAllQuotes)
      ? DATA.caseStudy.testimonials.slice(0, 2)
      : DATA.caseStudy.testimonials;

    // Show sections depending on whether user is in Focused 3-Tab mode or Full Single-Page mode
    const showDomu = !isFocused || view === "domu";
    const showJak = !isFocused || view === "jak";
    const showOnas = !isFocused || view === "onas";

    return `
      <div class="min-h-screen ${T.pageBg} ${T.pageText} font-sans pb-32 ${T.selection} transition-colors duration-300">
        <!-- Top Ribbon: Palette Switcher + Focused vs. Full Density Switch -->
        <div class="${T.ribbonBg} ${T.ribbonText} text-xs py-2 px-4 sm:px-8 border-b border-white/10">
          <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 font-medium text-white">
                <span class="w-2 h-2 rounded-full ${T.accentBg}"></span>
                Akreditace MPSV & MŠMT • Structogram®
              </span>
              <span class="hidden md:inline opacity-40">|</span>
              <span class="hidden md:inline ${T.ribbonMuted}">ČJ / AJ / NJ</span>
            </div>

            <!-- Controls: Color Palette (A1/A2/A3) + Density Toggle (Focused vs. Full) -->
            <div class="flex flex-wrap items-center gap-2">
              <div class="inline-flex items-center bg-white/10 p-0.5 rounded-full border border-white/15">
                ${Object.values(A_THEMES).map((thm) => {
                  const isCurrent = thm.key === T.key;
                  return `
                    <button
                      onclick="PROTO.setVariant('${thm.key}')"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        isCurrent ? "bg-white text-zinc-900 shadow-xs" : "text-white/80 hover:text-white hover:bg-white/10"
                      }"
                    >
                      <span class="inline-flex items-center -space-x-1">
                        <span class="w-2.5 h-2.5 rounded-full border border-black/20" style="background:${thm.swatch[1]}"></span>
                        <span class="w-2.5 h-2.5 rounded-full border border-black/20" style="background:${thm.swatch[2]}"></span>
                      </span>
                      <span>${thm.key}</span>
                    </button>
                  `;
                }).join("")}
              </div>

              <!-- Density Toggle -->
              <button
                onclick="PROTO.toggleADensity()"
                title="Přepnout mezi stručným webem rozděleným do 3 kapitol a dlouhou stránkou se vším najednou"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                  isFocused
                    ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/30"
                    : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                }"
              >
                <span>${isFocused ? "✨ Režim: Stručný a čistý (3 podstránky)" : "📜 Režim: Vše na jedné dlouhé stránce"}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Sticky Header with Clean 3-Page Navigation -->
        <header class="sticky top-0 z-30 ${T.headerBg} backdrop-blur-md border-b ${T.border}">
          <div class="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
            <a href="#top" onclick="PROTO.setAView('domu'); return false;" class="flex items-center gap-3 group shrink-0">
              <img src="${DATA.brand.logo}" alt="A co dál logo" class="h-10 w-auto object-contain" />
              <div class="hidden sm:block">
                <span class="block font-serif text-lg font-bold tracking-tight ${T.heading} leading-none">A CO DÁL</span>
                <span class="block text-[11px] ${T.subMuted} tracking-wider uppercase mt-1">Vzdělávání prožitkem</span>
              </div>
            </a>

            ${isFocused ? `
              <!-- Clean 3-Section Switcher (No endless scrolling!) -->
              <nav class="flex items-center bg-white/80 p-1 rounded-full border ${T.border} shadow-2xs">
                <button
                  onclick="PROTO.setAView('domu')"
                  class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    view === "domu" ? T.pillActive : T.bodyMuted + " hover:text-black"
                  }"
                >
                  1. Kurzy a témata
                </button>
                <button
                  onclick="PROTO.setAView('jak')"
                  class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    view === "jak" ? T.pillActive : T.bodyMuted + " hover:text-black"
                  }"
                >
                  2. Jak pracujeme & Příběh z praxe
                </button>
                <button
                  onclick="PROTO.setAView('onas')"
                  class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    view === "onas" ? T.pillActive : T.bodyMuted + " hover:text-black"
                  }"
                >
                  3. Náš tým & Reference
                </button>
              </nav>
            ` : `
              <nav class="hidden lg:flex items-center gap-6 text-sm font-medium ${T.bodyMuted}">
                <a href="#co-delame" class="${T.accentHoverText} transition-colors">Témata (13)</a>
                <a href="#jak-to-probiha" class="${T.accentHoverText} transition-colors">5 kroků</a>
                <a href="#pribeh-klienta" class="${T.accentHoverText} transition-colors">Příběh z praxe</a>
                <a href="#nas-tym" class="${T.accentHoverText} transition-colors">Tým (4)</a>
                <a href="#reference" class="${T.accentHoverText} transition-colors">Reference</a>
              </nav>
            `}

            <div class="flex items-center gap-3 shrink-0">
              <button onclick="PROTO.triggerInquiry('Nezávazná konzultace (${T.label})')" class="${T.accentBtn} text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer">
                Domluvit schůzku
              </button>
            </div>
          </div>
        </header>

        ${showDomu ? `
          <!-- CONCISE HERO: Short, scannable, human -->
          <section id="top" class="pt-10 pb-14 lg:py-16 px-4 sm:px-8">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-7 space-y-5">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${T.heroBadge} text-xs font-semibold tracking-wide">
                  <span>Pro firmy, sborovny škol a veřejnou správu</span>
                </div>

                <h1 class="font-serif text-4xl sm:text-5xl font-bold ${T.heading} leading-[1.12] tracking-tight">
                  Školíme týmy i&nbsp;jednotlivce. <br />
                  <span class="${T.accentText} italic font-normal">Prakticky a prožitkem.</span>
                </h1>

                <p class="text-base sm:text-lg ${T.bodyMuted} leading-relaxed max-w-xl">
                  Žádné nudné přednášky. Pomáháme lídrům, učitelům i týmům lépe komunikovat, pochopit vlastní osobnost díky metodě <strong>Structogram®</strong> a předcházet vyhoření.
                </p>

                <!-- Quick Audience Filter Pills right in the Hero -->
                <div class="pt-2">
                  <div class="text-xs font-bold uppercase tracking-wider ${T.subMuted} mb-2.5">Pro koho hledáte rozvoj? (Kliknutím vyfiltrujete kurzy níže):</div>
                  <div class="flex flex-wrap gap-2">
                    ${[
                      { id: "all", label: "Všechny programy (13)" },
                      { id: "firmy", label: "🏢 Pro firmy a lídry" },
                      { id: "skoly", label: "🎓 Pro školy a sborovny" },
                      { id: "urady", label: "🏛️ Pro úřady a instituce" }
                    ].map((aud) => {
                      const active = state.aAudience === aud.id;
                      return `
                        <button
                          onclick="PROTO.setAAudience('${aud.id}')"
                          class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            active ? T.pillActive : "bg-white " + T.bodyMuted + " border " + T.border + " " + T.hoverBorderAccent
                          }"
                        >
                          ${aud.label}
                        </button>
                      `;
                    }).join("")}
                  </div>
                </div>
              </div>

              <!-- Right Hero Photo (Clean, no heavy text overlay covering faces) -->
              <div class="lg:col-span-5">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                  <img src="${DATA.photos.heroHome}" alt="Lektorky A co dál — Magda, Lenka, Tereza a Andrea" class="w-full h-full object-cover" />
                </div>
                <div class="mt-3 flex items-center justify-between text-xs ${T.subMuted} px-1">
                  <span>Lektorský tým A CO DÁL (Ostrava & celá ČR)</span>
                  <button onclick="PROTO.setAView('onas')" class="font-semibold ${T.accentText} hover:underline cursor-pointer">Poznat náš tým →</button>
                </div>
              </div>
            </div>
          </section>

          <!-- FOCUSED COURSE CATALOG: Scannable cards + Slide-over Right Panel -->
          <section id="co-delame" class="py-14 px-4 sm:px-8 bg-white border-y ${T.border}">
            <div class="max-w-6xl mx-auto">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest ${T.accentText}">Nabídka programů</span>
                  <h2 class="font-serif text-2xl sm:text-3xl font-bold ${T.heading} mt-1">
                    Klikněte na téma pro zobrazení osnovy v pravém panelu
                  </h2>
                </div>

                <!-- 3 Pillar Filter Pills -->
                <div class="flex flex-wrap gap-1.5">
                  ${DATA.pillars.map((p) => {
                    const active = state.aPillar === p.id;
                    return `
                      <button
                        onclick="PROTO.setAPillar('${p.id}')"
                        class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          active ? T.pillActive : T.pillInactive
                        }"
                      >
                        ${p.label}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- Clean, Compact Course Cards (1-line summary, click opens right drawer) -->
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${visibleTopics.map((topic) => {
                  const badge = getPillarBadge(topic.pillar);
                  const isSelected = state.aDrawerTopicId === topic.id;
                  return `
                    <article
                      onclick="PROTO.openADrawer('${topic.id}')"
                      class="group rounded-xl ${T.cardBg} p-5 border ${isSelected ? "ring-2 ring-offset-2 border-transparent" : T.border} ${T.hoverBorderAccent} transition-all duration-150 shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-3">
                          <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}">
                            ${topic.pillarLabel}
                          </span>
                          ${topic.triColors ? `
                            <span class="inline-flex items-center gap-1" title="Metoda Structogram®">
                              <span class="w-2.5 h-2.5 rounded-full bg-[#3A8E58]"></span>
                              <span class="w-2.5 h-2.5 rounded-full bg-[#D6453D]"></span>
                              <span class="w-2.5 h-2.5 rounded-full bg-[#2E6DA4]"></span>
                            </span>
                          ` : `<span class="font-mono text-[11px] ${T.subMuted}">#${topic.number}</span>`}
                        </div>

                        <h3 class="font-serif text-lg font-bold ${T.heading} ${T.groupHoverAccentText} transition-colors">
                          ${topic.title}
                        </h3>
                        <p class="text-xs sm:text-sm ${T.bodyMuted} mt-1.5 line-clamp-2 leading-relaxed">
                          ${topic.subtitle}
                        </p>
                      </div>

                      <div class="mt-4 pt-3 border-t ${T.borderSoft} flex items-center justify-between text-xs">
                        <span class="${T.subMuted}">${getAudienceBadges(topic.audiences).join(" • ")}</span>
                        <span class="font-bold ${T.accentText} group-hover:translate-x-0.5 transition-transform">
                          Detail →
                        </span>
                      </div>
                    </article>
                  `;
                }).join("")}
              </div>

              <!-- Progressive Disclosure Button for remaining courses -->
              ${isFocused && state.aPillar === "all" && state.aAudience === "all" ? `
                <div class="mt-8 text-center">
                  <button
                    onclick="PROTO.toggleAShowAllCourses()"
                    class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border ${T.border} bg-white ${T.heading} ${T.hoverBorderAccent} shadow-2xs cursor-pointer transition-all"
                  >
                    ${state.aShowAllCourses
                      ? "Zobrazit jen 6 hlavních témat ↑"
                      : `Zobrazit všech ${filteredTopics.length} témat (+${hiddenTopicsCount} dalších) ↓`
                    }
                  </button>
                </div>
              ` : ""}

              ${isFocused ? `
                <!-- Gentle Next-Tab Prompt at bottom of Tab 1 -->
                <div class="mt-12 pt-8 border-t ${T.border} flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="text-sm ${T.bodyMuted}">
                    Chcete vědět, jak příprava školení probíhá a jak hodnotí kurzy účastníci?
                  </div>
                  <button onclick="PROTO.setAView('jak')" class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold ${T.pillInactive} cursor-pointer">
                    Přejít na: 2. Jak pracujeme & Příběh z praxe →
                  </button>
                </div>
              ` : ""}
            </div>
          </section>
        ` : ""}

        ${showJak ? `
          <!-- COMPACT 5 STEPS: Short, visual strip instead of 5 text-heavy paragraphs -->
          <section id="jak-to-probiha" class="py-14 px-4 sm:px-8 ${T.pageBg}">
            <div class="max-w-6xl mx-auto">
              <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest ${T.accentText}">Jak pracujeme</span>
                  <h2 class="font-serif text-2xl sm:text-3xl font-bold ${T.heading} mt-1">
                    5 kroků od prvního kafe po reálnou změnu v týmu
                  </h2>
                </div>
                <span class="text-xs ${T.subMuted}">Výcvik přímo na pracovišti, seminář i koučink</span>
              </div>

              <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
                ${DATA.steps.map((s) => `
                  <div class="bg-white rounded-xl p-5 border ${T.border} flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between mb-3">
                        <span class="w-7 h-7 rounded-full ${T.accentBg} text-white font-bold text-xs flex items-center justify-center">
                          ${s.step}
                        </span>
                        <img src="${s.image}" alt="${s.title}" class="w-12 h-12 rounded-full object-cover border ${T.border}" />
                      </div>
                      <h3 class="font-serif text-base font-bold ${T.heading}">${s.title}</h3>
                      <p class="text-xs font-semibold ${T.accentText} mt-0.5">${s.subtitle}</p>
                      ${!isFocused ? `
                        <p class="text-xs ${T.bodyMuted} mt-2 leading-relaxed">${s.text}</p>
                      ` : ""}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </section>

          <!-- CONCISE CASE STUDY: 1 main quote + 2 short highlights (expandable) -->
          <section id="pribeh-klienta" class="py-16 px-4 sm:px-8 ${T.darkSectionBg} text-white">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-6 space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${T.darkBadge} text-xs font-semibold">
                  Ověřeno v praxi • ${DATA.caseStudy.school} (52 pedagogů)
                </div>
                <h2 class="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                  „Seminář předčil mé očekávání. Oceňuji praktické pojetí a okamžité využití v praxi.“
                </h2>
                <div class="flex items-center gap-3 pt-2">
                  <img src="${DATA.caseStudy.logo}" alt="ZŠ Hlučín Rovniny" class="w-12 h-12 rounded-lg bg-white p-1 object-contain" />
                  <div>
                    <div class="font-bold text-sm text-white">${DATA.caseStudy.author}</div>
                    <div class="text-xs opacity-75">${DATA.caseStudy.role}</div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-6 space-y-3">
                <div class="text-xs uppercase tracking-wider ${T.darkHighlight} font-semibold">
                  Z ohlasů účastníků:
                </div>
                <div class="grid sm:grid-cols-2 gap-3">
                  ${visibleQuotes.map((t) => `
                    <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <p class="text-xs sm:text-sm ${T.darkBody} leading-relaxed">${t.text}</p>
                      <span class="inline-block mt-3 text-[11px] font-semibold ${T.darkHighlight}">• ${t.tag}</span>
                    </div>
                  `).join("")}
                </div>
                ${isFocused ? `
                  <button
                    onclick="PROTO.toggleAShowAllQuotes()"
                    class="text-xs font-semibold ${T.darkHighlight} hover:underline cursor-pointer pt-1"
                  >
                    ${state.aShowAllQuotes
                      ? "Zobrazit méně ohlasů ↑"
                      : `Přečíst dalších ${DATA.caseStudy.testimonials.length - 2} ohlasů účastníků ↓`
                    }
                  </button>
                ` : ""}
              </div>
            </div>

            ${isFocused ? `
              <div class="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex justify-end">
                <button onclick="PROTO.setAView('onas')" class="px-5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                  Pokračovat na: 3. Náš tým & Reference →
                </button>
              </div>
            ` : ""}
          </section>
        ` : ""}

        ${showOnas ? `
          <!-- COMPACT TEAM: Clean cards, bio on demand -->
          <section id="nas-tym" class="py-16 px-4 sm:px-8 bg-white border-b ${T.border}">
            <div class="max-w-6xl mx-auto">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest ${T.accentText}">Náš tým</span>
                  <h2 class="font-serif text-2xl sm:text-3xl font-bold ${T.heading} mt-1">
                    Čtyři lektorky s více než 10 lety praxe
                  </h2>
                </div>
                <p class="text-xs sm:text-sm ${T.bodyMuted} max-w-md">
                  Spojilo nás přátelství, férovost a chuť dělat vzdělávání jinak.
                </p>
              </div>

              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                ${DATA.team.map((member) => {
                  const isExpanded = state.aExpandedTeamId === member.id;
                  return `
                    <div class="rounded-xl ${T.pageBg} border ${T.border} overflow-hidden flex flex-col justify-between">
                      <div>
                        <div class="aspect-[4/4] overflow-hidden bg-black/5">
                          <img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover object-top" />
                        </div>
                        <div class="p-4">
                          <h3 class="font-serif text-lg font-bold ${T.heading}">${member.name}</h3>
                          <p class="text-xs font-semibold ${T.accentText} mt-0.5">${member.role}</p>
                          ${isExpanded || !isFocused ? `
                            <p class="text-xs ${T.bodyMuted} leading-relaxed mt-2.5 pt-2.5 border-t ${T.border}">
                              ${member.shortBio}
                            </p>
                          ` : ""}
                          <button
                            onclick="PROTO.toggleATeam('${member.id}')"
                            class="mt-2 text-xs font-bold ${T.accentText} hover:underline cursor-pointer"
                          >
                            ${isExpanded ? "Skrýt medailonek ↑" : "Krátký medailonek ↓"}
                          </button>
                        </div>
                      </div>
                      <div class="px-4 py-3 bg-white border-t ${T.border} text-xs flex flex-col gap-0.5">
                        <a href="tel:${member.phone.replace(/\s+/g, '')}" class="font-semibold ${T.heading} ${T.accentHoverText}">${member.phone}</a>
                        <a href="mailto:${member.email}" class="${T.subMuted} ${T.accentHoverText} truncate">${member.email}</a>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          </section>

          <!-- COMPACT CLIENT LOGOS: Top 6 per category + Expand button -->
          <section id="reference" class="py-14 px-4 sm:px-8 ${T.pageBg}">
            <div class="max-w-6xl mx-auto">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest ${T.accentText}">Reference • 47 organizací</span>
                  <h2 class="font-serif text-2xl font-bold ${T.heading} mt-1">Kdo už s námi spolupracuje</h2>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button onclick="PROTO.setAClientTab('firmy')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${state.aClientTab === 'firmy' ? T.pillActive : 'bg-white ' + T.bodyMuted + ' border ' + T.border}">
                    Firmy (${DATA.clients.firmy.length})
                  </button>
                  <button onclick="PROTO.setAClientTab('urady')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${state.aClientTab === 'urady' ? T.pillActive : 'bg-white ' + T.bodyMuted + ' border ' + T.border}">
                    Úřady a kraje (${DATA.clients.urady.length})
                  </button>
                  <button onclick="PROTO.setAClientTab('skoly')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${state.aClientTab === 'skoly' ? T.pillActive : 'bg-white ' + T.bodyMuted + ' border ' + T.border}">
                    Školy (${DATA.clients.skoly.length})
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                ${visibleClients.map((c) => `
                  <div class="bg-white rounded-xl p-3 border ${T.border} flex flex-col items-center justify-center h-24 ${T.hoverBorderAccent} transition-colors">
                    <img src="${c.logo}" alt="${c.name}" class="max-h-10 max-w-[110px] object-contain opacity-85" />
                    <span class="text-[10px] ${T.subMuted} mt-1.5 text-center font-medium line-clamp-1">${c.name}</span>
                  </div>
                `).join("")}
              </div>

              ${isFocused && currentClients.length > 6 ? `
                <div class="mt-6 text-center">
                  <button
                    onclick="PROTO.toggleAShowAllLogos()"
                    class="text-xs font-semibold ${T.accentText} hover:underline cursor-pointer"
                  >
                    ${state.aShowAllLogos
                      ? "Zobrazit jen vybraných 6 log ↑"
                      : `Zobrazit všech ${currentClients.length} organizací v této kategorii ↓`
                    }
                  </button>
                </div>
              ` : ""}
            </div>
          </section>
        ` : ""}

        <!-- Clean, Lightweight Footer -->
        <footer id="kontakty" class="${T.footerBg} ${T.ribbonMuted} py-12 px-4 sm:px-8">
          <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <img src="${DATA.brand.logo}" alt="A co dál" class="h-9 w-auto bg-white px-2.5 py-1 rounded-md" />
                <span class="font-serif text-lg font-bold text-white">Pojďme naplánovat další krok</span>
              </div>
              <div class="text-xs sm:text-sm flex flex-wrap gap-x-6 gap-y-1 pt-1">
                <span>Tel: <a href="tel:+420604392543" class="text-white font-bold hover:underline">${DATA.brand.phone}</a></span>
                <span>E-mail: <a href="mailto:kontakt@acodal.cz" class="${T.darkHighlight} font-bold hover:underline">${DATA.brand.email}</a></span>
                <span class="opacity-70">Ostrava & celá ČR</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-6 text-xs opacity-80">
              ${DATA.brand.entities.map((ent) => `
                <div>
                  <strong class="text-white block">${ent.name}</strong>
                  <span>IČ: ${ent.ic} • ${ent.address}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </footer>

        <!-- Slide-over Right Drawer for Selected Training Topic -->
        ${activeTopic ? `
          <div class="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn" onclick="PROTO.closeADrawer()">
            <div class="relative w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col justify-between" onclick="event.stopPropagation()">
              <div>
                <!-- Colored Header Band in Right Drawer -->
                <div class="${T.darkSectionBg} text-white p-6 sm:p-8">
                  <div class="flex items-center justify-between gap-2 mb-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${T.darkBadge}">
                      ${activeTopic.pillarLabel} • Kurz #${activeTopic.number}
                    </span>
                    <button onclick="PROTO.closeADrawer()" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center cursor-pointer">
                      ×
                    </button>
                  </div>

                  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white">${activeTopic.title}</h2>
                  <p class="${T.darkBody} text-sm sm:text-base mt-2 leading-relaxed">${activeTopic.subtitle}</p>

                  <!-- Quick Color Theme Switcher right inside the Drawer so the user can compare the panel too! -->
                  <div class="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span class="opacity-75">Barevné schéma detailu:</span>
                    <div class="flex items-center gap-1.5">
                      ${Object.values(A_THEMES).map((thm) => `
                        <button
                          onclick="PROTO.setVariant('${thm.key}')"
                          class="px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all ${
                            thm.key === T.key ? "bg-white text-zinc-900" : "bg-white/10 text-white/80 hover:bg-white/20"
                          }"
                        >
                          ${thm.key}
                        </button>
                      `).join("")}
                    </div>
                  </div>
                </div>

                <div class="p-6 sm:p-8">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1.5 rounded-full ${T.pageBg} border ${T.border} text-xs font-semibold ${T.heading}">
                      ⏱️ ${activeTopic.format}
                    </span>
                    ${activeTopic.accreditation ? `
                      <span class="px-3 py-1.5 rounded-full ${T.heroBadge} text-xs font-semibold">
                        🏅 ${activeTopic.accreditation}
                      </span>
                    ` : ""}
                  </div>

                  <div class="mt-7">
                    <h4 class="text-xs font-bold uppercase tracking-widest ${T.subMuted} mb-4">Co vám program přinese:</h4>
                    <ul class="space-y-3">
                      ${activeTopic.points.map((pt) => `
                        <li class="flex items-start gap-3 text-sm sm:text-base ${T.pageText}">
                          <span class="w-5 h-5 rounded-full ${T.drawerCheck} font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                          <span>${pt}</span>
                        </li>
                      `).join("")}
                    </ul>
                  </div>

                  <!-- Prev / Next Course Navigation right inside the right panel -->
                  <div class="mt-8 pt-5 border-t ${T.border} flex items-center justify-between gap-2">
                    ${(() => {
                      const currIdx = DATA.topics.findIndex((t) => t.id === activeTopic.id);
                      const prevTopic = DATA.topics[(currIdx - 1 + DATA.topics.length) % DATA.topics.length];
                      const nextTopic = DATA.topics[(currIdx + 1) % DATA.topics.length];
                      return `
                        <button onclick="PROTO.openADrawer('${prevTopic.id}')" class="text-xs font-semibold ${T.bodyMuted} ${T.accentHoverText} cursor-pointer text-left">
                          ← #${prevTopic.number} ${prevTopic.title}
                        </button>
                        <button onclick="PROTO.openADrawer('${nextTopic.id}')" class="text-xs font-semibold ${T.bodyMuted} ${T.accentHoverText} cursor-pointer text-right">
                          #${nextTopic.number} ${nextTopic.title} →
                        </button>
                      `;
                    })()}
                  </div>
                </div>
              </div>

              <div class="p-6 sm:p-8 ${T.pageBg} border-t ${T.border} flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-xs ${T.bodyMuted}">
                  Přizpůsobíme na míru vašemu týmu (ČJ, AJ, NJ).
                </div>
                <button
                  onclick="PROTO.triggerInquiry('Poptávka kurzu: ${activeTopic.title} (${T.key})')"
                  class="w-full sm:w-auto shrink-0 ${T.accentBtn} font-semibold px-6 py-3 rounded-full text-sm cursor-pointer shadow-sm"
                >
                  Poptat toto téma →
                </button>
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  // ============================================================================
  // VARIANT B: AUDIENCE-FIRST B2B / SCHOOL HUB ("Rozcestník na míru cílové skupině")
  // ============================================================================
  function renderVariantB() {
    const activeAud = DATA.audiences.find((a) => a.id === state.bAudience) || DATA.audiences[0];
    const audTopics = DATA.topics.filter((t) => t.audiences.includes(activeAud.id));
    const selectedTopic = audTopics.find((t) => t.id === state.bSelectedTopicId) || audTopics[0];
    const audClients = DATA.clients[activeAud.id] || DATA.clients.firmy;

    return `
      <div class="min-h-screen bg-[#F4F6F8] text-[#172026] font-sans pb-32">
        <!-- Modern App-Style Header with Integrated Segment Switcher -->
        <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <img src="${DATA.brand.logo}" alt="A co dál" class="h-10 w-auto" />
              <div class="border-l border-slate-200 pl-3">
                <div class="font-bold text-sm text-slate-900">A CO DÁL — Vzdělávací & rozvojový portál</div>
                <div class="text-[11px] text-slate-500">Vyberte svůj sektor pro zobrazení programů a referencí na míru</div>
              </div>
            </div>

            <!-- Primary Affordance: Live Audience Segment Switcher -->
            <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              ${DATA.audiences.map((aud) => {
                const isSelected = aud.id === activeAud.id;
                return `
                  <button
                    onclick="PROTO.setBAudience('${aud.id}')"
                    class="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#E77817] text-white shadow-xs"
                        : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                    }"
                  >
                    ${aud.shortLabel}
                  </button>
                `;
              }).join("")}
            </div>

            <div class="hidden xl:flex items-center gap-3 text-xs font-semibold">
              <span class="px-2.5 py-1 rounded bg-slate-100 text-slate-700">CZ / EN / DE</span>
              <a href="mailto:kontakt@acodal.cz" class="text-[#E77817] hover:underline">kontakt@acodal.cz</a>
            </div>
          </div>
        </header>

        <!-- Dynamic Audience Hero Banner -->
        <section class="bg-[#18222B] text-white py-12 px-4 sm:px-8 border-b border-slate-800">
          <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E77817]/20 border border-[#E77817]/40 text-[#F8A962] text-xs font-bold uppercase tracking-wider">
                Režim zobrazení: ${activeAud.label} • ${activeAud.stats}
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                ${activeAud.headline}
              </h1>
              <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                ${activeAud.description}
              </p>
              <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-amber-200 italic">
                💡 ${activeAud.quote}
              </div>
            </div>

            <div class="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div class="text-xs font-bold uppercase tracking-wider text-[#F8A962]">Jak v tomto segmentu nejčastěji působíme:</div>
              <ul class="space-y-2.5 text-sm text-slate-200">
                ${activeAud.formats.map((f) => `
                  <li class="flex items-start gap-2.5">
                    <span class="text-[#E77817] font-bold">▸</span>
                    <span>${f}</span>
                  </li>
                `).join("")}
              </ul>
              <button
                onclick="PROTO.triggerInquiry('Konzultace pro segment: ${activeAud.label}')"
                class="w-full mt-2 bg-[#E77817] hover:bg-[#BB6316] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Poptat řešení (${activeAud.shortLabel}) →
              </button>
            </div>
          </div>
        </section>

        <!-- Master-Detail Interactive Course Explorer (No Modals, No Page Reloads) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#E77817]">Doporučené programy pro: ${activeAud.label}</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Interaktivní katalog témat (${audTopics.length} z 13 programů)
              </h2>
            </div>
            <div class="text-xs text-slate-500">
              Klikněte na téma vlevo pro okamžité zobrazení osnovy a přínosů vpravo
            </div>
          </div>

          <div class="grid lg:grid-cols-12 gap-6 items-start">
            <!-- Left Column: Master Topic List -->
            <div class="lg:col-span-5 space-y-2.5">
              ${audTopics.map((t) => {
                const isSelected = selectedTopic && selectedTopic.id === t.id;
                return `
                  <button
                    onclick="PROTO.setBTopic('${t.id}')"
                    class="w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-white border-[#E77817] ring-2 ring-[#E77817]/20 shadow-md"
                        : "bg-white/70 hover:bg-white border-slate-200 text-slate-700"
                    }"
                  >
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-mono text-xs font-bold ${isSelected ? 'text-[#E77817]' : 'text-slate-400'}">${t.number}</span>
                        <span class="font-bold text-sm sm:text-base text-slate-900">${t.title}</span>
                      </div>
                      <div class="text-xs text-slate-500 mt-1 line-clamp-1">${t.subtitle}</div>
                    </div>
                    <span class="text-lg font-bold ${isSelected ? 'text-[#E77817]' : 'text-slate-300'}">→</span>
                  </button>
                `;
              }).join("")}
            </div>

            <!-- Right Column: Sticky Live Detail Panel -->
            <div class="lg:col-span-7 lg:sticky lg:top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-10">
              ${selectedTopic ? `
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <span class="px-3 py-1 rounded-md bg-orange-50 text-[#B8570A] text-xs font-bold border border-orange-200">
                    ${selectedTopic.pillarLabel}
                  </span>
                  <span class="text-xs font-semibold text-slate-500">Formát: <strong class="text-slate-800">${selectedTopic.format}</strong></span>
                </div>

                <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-5">${selectedTopic.title}</h3>
                <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">${selectedTopic.subtitle}</p>

                ${selectedTopic.accreditation ? `
                  <div class="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-semibold text-amber-900">
                    🏅 ${selectedTopic.accreditation}
                  </div>
                ` : ""}

                <div class="mt-6">
                  <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Co konkrétně si účastníci odnesou do praxe:</div>
                  <div class="grid gap-2.5">
                    ${selectedTopic.points.map((pt, idx) => `
                      <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-sm text-slate-800">
                        <span class="w-6 h-6 rounded-lg bg-[#E77817] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                        <span>${pt}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${DATA.team[0].photo}" alt="Magda" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <img src="${DATA.team[1].photo}" alt="Lenka" class="w-10 h-10 rounded-full object-cover border border-slate-200 -ml-4" />
                    <img src="${DATA.team[2].photo}" alt="Tereza" class="w-10 h-10 rounded-full object-cover border border-slate-200 -ml-4" />
                    <div class="text-xs text-slate-600">
                      <strong class="text-slate-900 block">Garantují lektorky A co dál</strong>
                      Přizpůsobíme pro: ${activeAud.shortLabel}
                    </div>
                  </div>
                  <button
                    onclick="PROTO.triggerInquiry('${selectedTopic.title} (${activeAud.shortLabel})')"
                    class="bg-slate-900 hover:bg-[#E77817] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Nezávazně poptat téma →
                  </button>
                </div>
              ` : ""}
            </div>
          </div>
        </section>

        <!-- Filtered Sector Logos & Case Study Proof -->
        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-lg font-extrabold text-slate-900">Reference v segmentu: ${activeAud.label} (${audClients.length} organizací)</h3>
                <p class="text-xs text-slate-500">Při přepnutí cílové skupiny v horní liště se automaticky vyfiltrují i relevantní reference.</p>
              </div>
              <div class="flex gap-2">
                ${DATA.audiences.map((a) => `
                  <button onclick="PROTO.setBAudience('${a.id}')" class="text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${a.id === activeAud.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}">
                    ${a.shortLabel} (${(DATA.clients[a.id] || []).length})
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              ${audClients.map((c) => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center h-24">
                  <img src="${c.logo}" alt="${c.name}" class="max-h-10 max-w-[110px] object-contain" />
                  <span class="text-[10px] text-slate-500 mt-1.5 text-center line-clamp-1">${c.name}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- Compact Process + Direct Team Contact Cards -->
        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid lg:grid-cols-12 gap-6">
          <div class="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <span class="text-xs font-bold uppercase tracking-wider text-[#E77817]">Jak spolupráce probíhá</span>
            <h3 class="text-xl font-extrabold text-slate-900 mt-1 mb-6">5 kroků k trvalé změně</h3>
            <div class="space-y-4">
              ${DATA.steps.map((s) => `
                <div class="flex items-start gap-4">
                  <img src="${s.image}" alt="${s.title}" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div>
                    <div class="font-bold text-sm text-slate-900">${s.step}. ${s.title} <span class="text-xs font-normal text-[#E77817]">— ${s.subtitle}</span></div>
                    <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${s.text}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#E77817]">Přímý kontakt na partnerky</span>
              <h3 class="text-xl font-extrabold text-slate-900 mt-1 mb-6">Spojte se přímo s lektorkami a vedením</h3>
              <div class="grid sm:grid-cols-2 gap-4">
                ${DATA.team.map((m) => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
                    <img src="${m.photo}" alt="${m.name}" class="w-14 h-14 rounded-full object-cover shrink-0" />
                    <div class="min-w-0">
                      <div class="font-bold text-sm text-slate-900 truncate">${m.name}</div>
                      <div class="text-[11px] text-[#E77817] font-medium truncate">${m.role}</div>
                      <a href="tel:${m.phone.replace(/\s+/g, '')}" class="block text-xs font-bold text-slate-700 mt-1 hover:text-[#E77817]">${m.phone}</a>
                      <a href="mailto:${m.email}" class="block text-[11px] text-slate-500 truncate hover:underline">${m.email}</a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
              <span><strong>A CO DÁL, s.r.o.</strong> (IČ: 01771264)</span>
              <span><strong>A co dál – centrum rozvoje, z.ú.</strong> (IČ: 09557181)</span>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // ============================================================================
  // VARIANT C: SWISS ARCHITECTURAL GRID & OPEN TYPOGRAPHIC INDEX (ZERO CARDS)
  // Palette: Warm Newsprint Alabaster (#F3F0EA), Deep Forest Ink (#11221C),
  //          Vermilion Accent (#D13B27), Cobalt (#1D4ED8), Emerald (#0F766E)
  // Structure: 0px border-radius anywhere. Exposed 1px architectural hairlines.
  // ============================================================================
  function renderVariantC() {
    const isFocused = state.cDensity === "focused";
    const view = state.cView || "index"; // "index" | "metodika" | "tym"

    const brainFilterMeta = {
      all: {
        label: "VŠECH 13 PROGRAMŮ",
        desc: "Kliknutím na řádek rozbalíte sylabus přímo v osnově.",
        accentHex: "#11221C",
        recommendedIds: DATA.topics.map((t) => t.id)
      },
      green: {
        label: "ZELENÁ • KMENOVÝ MOZEK (VZTAHY & EMPATIE)",
        desc: "Empatie, přirozený kontakt s lidmi, budování důvěry a bezpečné atmosféry v týmu či sborovně.",
        accentHex: "#0F766E",
        recommendedIds: ["structogram", "barevne-uceni", "komunikace", "work-life-balance", "osobni-rozvoj"]
      },
      red: {
        label: "ČERVENÁ • MEZIMOZEK (AKCE & DYNAMIKA)",
        desc: "Energie, tah na branku, vedení lidí, přesvědčivá prezentace a obchodní situace.",
        accentHex: "#D13B27",
        recommendedIds: ["structogram", "manazerske-dovednosti", "prodejni-dovednosti", "prezentacni-dovednosti", "choice-of-profession"]
      },
      blue: {
        label: "MODRÁ • KONCOVÝ MOZEK (LOGIKA & STRATEGIE)",
        desc: "Analýza, struktura, kognitivní rezerva, audit procesů a strategická vize školy nebo firmy.",
        accentHex: "#1D4ED8",
        recommendedIds: ["structogram", "trenink-pameti", "strategicky-rozvoj-skol", "personalistika", "vyuziti-vlastniho-potencialu"]
      }
    };

    const currentBrain = brainFilterMeta[state.cBrainColor] || brainFilterMeta.all;
    const filteredTopics = state.cBrainColor === "all"
      ? DATA.topics
      : DATA.topics.filter((t) => currentBrain.recommendedIds.includes(t.id));

    const visibleTopics = (isFocused && !state.cShowAllCourses && state.cBrainColor === "all")
      ? filteredTopics.slice(0, 6)
      : filteredTopics;
    const hiddenTopicsCount = filteredTopics.length - visibleTopics.length;

    const sectorClients = DATA.clients[state.cClientSector] || DATA.clients.firmy;
    const visibleClients = (isFocused && !state.cShowAllLogos)
      ? sectorClients.slice(0, 6)
      : sectorClients;

    const showIndex = !isFocused || view === "index";
    const showMetodika = !isFocused || view === "metodika";
    const showTym = !isFocused || view === "tym";

    return `
      <div class="min-h-screen bg-[#F3F0EA] text-[#11221C] font-grotesk pb-32 selection:bg-[#D13B27] selection:text-white">
        <!-- Exposed Architectural Top Ledger Bar (Zero rounded corners) -->
        <header class="sticky top-0 z-30 bg-[#F3F0EA]/95 backdrop-blur-md border-b border-[#11221C]">
          <div class="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-12">
            <a
              href="#top"
              onclick="PROTO.setCView('index'); return false;"
              class="col-span-1 lg:col-span-3 px-5 py-4 border-r border-[#11221C] flex items-center gap-3 cursor-pointer"
            >
              <img src="${DATA.brand.logo}" alt="A co dál" class="h-8 w-auto" />
              <span class="font-mono text-[11px] uppercase tracking-widest text-[#11221C]/70 hidden sm:inline">INDEX // OSTRAVA</span>
            </a>

            ${isFocused ? `
              <!-- 3-Sheet Architectural Switcher -->
              <div class="hidden lg:grid lg:col-span-6 grid-cols-3 border-r border-[#11221C] font-mono text-xs uppercase tracking-wider">
                ${[
                  { id: "index", label: "01 / REJSTŘÍK TÉMAT" },
                  { id: "metodika", label: "02 / METODIKA & DATA" },
                  { id: "tym", label: "03 / PARTNERKY & KLIENTI" }
                ].map((tab) => {
                  const active = view === tab.id;
                  return `
                    <button
                      onclick="PROTO.setCView('${tab.id}')"
                      class="px-4 py-4 border-r last:border-r-0 border-[#11221C] text-left transition-colors cursor-pointer flex items-center justify-between ${
                        active ? "bg-[#11221C] text-[#F3F0EA] font-bold" : "hover:bg-[#11221C]/5 text-[#11221C]"
                      }"
                    >
                      <span>${tab.label}</span>
                      <span class="w-2 h-2 ${active ? "bg-[#D13B27]" : "bg-transparent"}"></span>
                    </button>
                  `;
                }).join("")}
              </div>
            ` : `
              <div class="hidden lg:flex lg:col-span-6 px-6 py-4 border-r border-[#11221C] items-center justify-between font-mono text-xs uppercase tracking-wider">
                <a href="#c-index" class="hover:text-[#D13B27] transition-colors">01 / REJSTŘÍK (13)</a>
                <a href="#c-proces" class="hover:text-[#D13B27] transition-colors">02 / METODIKA (5)</a>
                <a href="#c-studie" class="hover:text-[#D13B27] transition-colors">03 / DATA</a>
                <a href="#c-tym" class="hover:text-[#D13B27] transition-colors">04 / TÝM (4)</a>
              </div>
            `}

            <div class="col-span-1 lg:col-span-3 flex items-center justify-between">
              <button
                onclick="PROTO.toggleCDensity()"
                title="Přepnout mezi stručným 3-listovým rejstříkem a dlouhou stránkou"
                class="px-3 py-4 font-mono text-[11px] uppercase tracking-wider hover:text-[#D13B27] cursor-pointer truncate"
              >
                ${isFocused ? "[ ✨ 3 LISTY ]" : "[ 📜 1 DLOUHÁ ]"}
              </button>
              <button
                onclick="PROTO.triggerInquiry('Švýcarský rejstřík — rychlá poptávka')"
                class="h-full px-5 py-4 bg-[#11221C] hover:bg-[#D13B27] text-[#F3F0EA] font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer ml-auto shrink-0"
              >
                KONZULTOVAT →
              </button>
            </div>
          </div>

          ${isFocused ? `
            <!-- Mobile 3-Sheet Bar -->
            <div class="grid grid-cols-3 lg:hidden border-t border-[#11221C] font-mono text-[11px] uppercase">
              <button onclick="PROTO.setCView('index')" class="py-2.5 px-2 border-r border-[#11221C] ${view === 'index' ? 'bg-[#11221C] text-white font-bold' : ''}">01 / Témata</button>
              <button onclick="PROTO.setCView('metodika')" class="py-2.5 px-2 border-r border-[#11221C] ${view === 'metodika' ? 'bg-[#11221C] text-white font-bold' : ''}">02 / Metodika</button>
              <button onclick="PROTO.setCView('tym')" class="py-2.5 px-2 ${view === 'tym' ? 'bg-[#11221C] text-white font-bold' : ''}">03 / Tým</button>
            </div>
          ` : ""}
        </header>

        ${showIndex ? `
          <!-- Compact Architectural Split Hero (Exposed 1px Grid Lines, Crisp & Short) -->
          <section class="border-b border-[#11221C]">
            <div class="max-w-[1440px] mx-auto grid lg:grid-cols-12">
              <!-- Left 8 Cols: Monumental Typography -->
              <div class="lg:col-span-8 p-6 sm:p-10 lg:p-12 lg:border-r border-[#11221C] flex flex-col justify-between">
                <div>
                  <div class="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#D13B27] pb-4 border-b border-[#11221C]/20">
                    <span>[ AKREDITACE MŠMT & MPSV ]</span>
                    <span>•</span>
                    <span>LICENCE STRUCTOGRAM® ČR</span>
                    <span>•</span>
                    <span>ČJ / AJ / NJ</span>
                  </div>

                  <h1 class="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight leading-[1.0] mt-6 text-[#11221C]">
                    VĚDA O MOZKU.<br />
                    PRAXE V TÝMU.<br />
                    <span class="font-editorial italic font-normal text-[#D13B27]">A co dál?</span>
                  </h1>

                  <p class="mt-5 text-base sm:text-lg text-[#11221C]/80 max-w-xl leading-relaxed font-sans">
                    Praktické tréninky pro firmy, sborovny škol a úřady. Kombinujeme biostrukturální analýzu <strong>Structogram®</strong>, neurovědu a koučink přímo na pracovišti.
                  </p>
                </div>

                <!-- Sharp Architectural KPI Strip (No cards, just vertical 1px dividers) -->
                <div class="grid grid-cols-3 border-t border-[#11221C] mt-8 pt-6 gap-4">
                  <div>
                    <div class="font-mono text-[11px] uppercase tracking-widest text-[#11221C]/60">OBLASTI</div>
                    <div class="text-3xl sm:text-4xl font-bold mt-0.5">13</div>
                  </div>
                  <div class="border-l border-[#11221C]/30 pl-4">
                    <div class="font-mono text-[11px] uppercase tracking-widest text-[#11221C]/60">KLIENTI</div>
                    <div class="text-3xl sm:text-4xl font-bold mt-0.5">47+</div>
                  </div>
                  <div class="border-l border-[#11221C]/30 pl-4">
                    <div class="font-mono text-[11px] uppercase tracking-widest text-[#D13B27]">GARANCE</div>
                    <div class="text-2xl sm:text-3xl font-bold mt-1 leading-tight">4 lektorky</div>
                  </div>
                </div>
              </div>

              <!-- Right 4 Cols: Full-bleed unboxed photography -->
              <div class="lg:col-span-4 flex flex-col justify-between bg-[#E6E1D6]">
                <div class="relative aspect-4/3 lg:aspect-auto lg:flex-1 overflow-hidden border-b border-[#11221C]">
                  <img src="${DATA.photos.heroHome}" alt="Seminář A co dál" class="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 transition-all duration-500" />
                  <div class="absolute bottom-0 left-0 bg-[#11221C] text-[#F3F0EA] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest">
                    OBR. 01 // LEKTORSKÝ TÝM OSTRAVA
                  </div>
                </div>
                <div class="px-6 py-4 flex items-center justify-between font-mono text-xs">
                  <span>ZALOŽENO V OSTRAVĚ</span>
                  <button onclick="PROTO.setCView('tym')" class="underline hover:text-[#D13B27] cursor-pointer">POZNAT 4 PARTNERKY →</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Structogram Tri-Brain Architectural Filter Bar -->
          <section id="c-index" class="border-b border-[#11221C] bg-[#EAE5DA]">
            <div class="max-w-[1440px] mx-auto">
              <div class="grid lg:grid-cols-12 border-b border-[#11221C]">
                <div class="lg:col-span-4 p-5 sm:px-8 sm:py-6 lg:border-r border-[#11221C] flex flex-col justify-center">
                  <div class="font-mono text-[11px] uppercase tracking-widest text-[#D13B27]">01 // REJSTŘÍK PROGRAMŮ</div>
                  <h2 class="text-xl sm:text-2xl font-bold mt-1">Filtr podle složky mozku (Structogram®)</h2>
                </div>
                <div class="lg:col-span-8 grid sm:grid-cols-4">
                  ${[
                    { id: "all", code: "00", title: "Všechna témata", sub: "13 oblastí", activeBg: "bg-[#11221C] text-[#F3F0EA]", dot: "bg-[#F3F0EA]" },
                    { id: "green", code: "01", title: "Zelená složka", sub: "Vztahy & Empatie", activeBg: "bg-[#0F766E] text-white", dot: "bg-[#34D399]" },
                    { id: "red", code: "02", title: "Červená složka", sub: "Akce & Vedení", activeBg: "bg-[#D13B27] text-white", dot: "bg-[#FCA5A5]" },
                    { id: "blue", code: "03", title: "Modrá složka", sub: "Systém & Paměť", activeBg: "bg-[#1D4ED8] text-white", dot: "bg-[#93C5FD]" }
                  ].map((b) => {
                    const active = state.cBrainColor === b.id;
                    return `
                      <button
                        onclick="PROTO.setCBrainColor('${b.id}')"
                        class="p-5 text-left border-t sm:border-t-0 sm:border-r last:border-r-0 border-[#11221C] transition-colors cursor-pointer flex flex-col justify-between ${
                          active ? b.activeBg : "bg-transparent hover:bg-[#11221C]/5 text-[#11221C]"
                        }"
                      >
                        <div class="flex items-center justify-between w-full font-mono text-xs">
                          <span>[${b.code}]</span>
                          <span class="w-2.5 h-2.5 ${active ? b.dot : 'bg-[#11221C]/30'}"></span>
                        </div>
                        <div class="mt-4">
                          <div class="font-bold text-sm sm:text-base">${b.title}</div>
                          <div class="text-xs opacity-80 mt-0.5 font-sans">${b.sub}</div>
                        </div>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- Active Filter Status Strip -->
              <div class="px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs bg-[#F3F0EA]">
                <div>
                  <strong class="uppercase">${currentBrain.label}:</strong>
                  <span class="font-sans text-[#11221C]/80 ml-2">${currentBrain.desc}</span>
                </div>
                <div class="shrink-0">ZOBRAZENO: <strong>${visibleTopics.length} / ${filteredTopics.length}</strong></div>
              </div>
            </div>
          </section>

          <!-- Open Typographic Index of Programs (Zero cards, pure horizontal hairlines & inline expansion) -->
          <section class="border-b border-[#11221C]">
            <div class="max-w-[1440px] mx-auto divide-y divide-[#11221C]">
              ${visibleTopics.map((t) => {
                const isOpen = state.cOpenTopicId === t.id;
                return `
                  <div class="transition-colors ${isOpen ? 'bg-[#11221C] text-[#F3F0EA]' : 'hover:bg-[#E8E3D9]'}">
                    <!-- Main Index Row -->
                    <button
                      onclick="PROTO.selectCTopic('${t.id}')"
                      class="w-full text-left px-6 sm:px-8 py-5 grid lg:grid-cols-12 gap-3 items-baseline cursor-pointer"
                    >
                      <div class="lg:col-span-1 font-mono text-xl sm:text-2xl font-bold ${isOpen ? 'text-[#D13B27]' : 'text-[#11221C]/40'}">
                        ${t.number}
                      </div>
                      <div class="lg:col-span-4">
                        <h3 class="text-xl sm:text-2xl font-bold tracking-tight">${t.title}</h3>
                        <div class="font-mono text-[10px] uppercase tracking-widest mt-0.5 ${isOpen ? 'text-[#F3F0EA]/70' : 'text-[#D13B27]'}">
                          ${t.pillarLabel}
                        </div>
                      </div>
                      <div class="lg:col-span-5 text-sm font-sans line-clamp-1 ${isOpen ? 'text-[#F3F0EA]/85' : 'text-[#11221C]/75'}">
                        ${t.subtitle}
                      </div>
                      <div class="lg:col-span-2 flex items-center lg:justify-end gap-4 font-mono text-xs uppercase tracking-widest">
                        <span>${isOpen ? 'ZAVŘÍT [−]' : 'SYLABUS [+]'}</span>
                      </div>
                    </button>

                    <!-- Inline Unboxed Architectural Expansion -->
                    ${isOpen ? `
                      <div class="px-6 sm:px-8 pb-8 pt-4 border-t border-[#F3F0EA]/20 grid lg:grid-cols-12 gap-8">
                        <div class="lg:col-span-4 space-y-3">
                          <div class="font-mono text-xs uppercase tracking-widest text-[#D13B27]">PARAMETRY PROGRAMU</div>
                          <div class="text-xs sm:text-sm font-sans text-[#F3F0EA]/90 leading-relaxed space-y-1">
                            <div><strong>Formát:</strong> ${t.format}</div>
                            ${t.accreditation ? `<div class="text-amber-300"><strong>Akreditace:</strong> ${t.accreditation}</div>` : ""}
                            <div><strong>Jazyk:</strong> ČJ / AJ / NJ</div>
                          </div>
                          <div class="pt-3">
                            <button
                              onclick="PROTO.triggerInquiry('${t.title}')"
                              class="px-5 py-3 bg-[#D13B27] hover:bg-white hover:text-[#11221C] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
                            >
                              POPTAT TENTO PROGRAM →
                            </button>
                          </div>
                        </div>

                        <div class="lg:col-span-8 border-l border-[#F3F0EA]/20 pl-0 lg:pl-8">
                          <div class="font-mono text-xs uppercase tracking-widest text-[#F3F0EA]/60 mb-3">
                            PŘÍNOSY PRO TÝM (${t.points.length} BODŮ):
                          </div>
                          <div class="divide-y divide-[#F3F0EA]/15 border-t border-b border-[#F3F0EA]/15">
                            ${t.points.map((pt, idx) => `
                              <div class="py-2.5 flex items-start gap-4 text-sm font-sans">
                                <span class="font-mono text-xs text-[#D13B27] mt-0.5">0${idx + 1}</span>
                                <span>${pt}</span>
                              </div>
                            `).join("")}
                          </div>
                        </div>
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>

            ${isFocused && state.cBrainColor === "all" ? `
              <div class="max-w-[1440px] mx-auto border-t border-[#11221C] bg-[#EAE5DA] px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  onclick="PROTO.toggleCShowAllCourses()"
                  class="font-mono text-xs uppercase tracking-widest font-bold text-[#11221C] hover:text-[#D13B27] cursor-pointer"
                >
                  ${state.cShowAllCourses
                    ? "[ − ZOBRAZIT JEN 6 STĚŽEJNÍCH PROGRAMŮ ↑ ]"
                    : `[ + ROZBALIT VŠECH 13 PROGRAMŮ (+${hiddenTopicsCount} DALŠÍCH) ↓ ]`
                  }
                </button>
                <button
                  onclick="PROTO.setCView('metodika')"
                  class="font-mono text-xs uppercase tracking-widest bg-[#11221C] text-[#F3F0EA] px-4 py-2 hover:bg-[#D13B27] transition-colors cursor-pointer"
                >
                  POKRAČOVAT NA: 02 / METODIKA & DATA →
                </button>
              </div>
            ` : ""}
          </section>
        ` : ""}

        ${showMetodika ? `
          <!-- 5 Steps as an Open Architectural Strip (Concise titles & subtitles in Focused Mode) -->
          <section id="c-proces" class="border-b border-[#11221C] bg-[#EAE5DA]">
            <div class="max-w-[1440px] mx-auto">
              <div class="px-6 sm:px-8 py-6 border-b border-[#11221C] flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span class="font-mono text-xs uppercase tracking-widest text-[#D13B27]">02 // METODIKA SPOLUPRÁCE</span>
                  <h2 class="text-2xl sm:text-3xl font-bold mt-1">Pět fází od diagnostiky po vyhodnocení</h2>
                </div>
                <span class="font-mono text-xs text-[#11221C]/70">VÝCVIK NA PRACOVIŠTI • SEMINÁŘ • KOUČINK</span>
              </div>

              <div class="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#11221C]">
                ${DATA.steps.map((s) => `
                  <div class="p-6 flex flex-col justify-between bg-[#F3F0EA] hover:bg-white transition-colors">
                    <div>
                      <div class="flex items-center justify-between font-mono text-xs text-[#D13B27] pb-3 border-b border-[#11221C]/20">
                        <span>FÁZE 0${s.step}</span>
                        <span>//</span>
                      </div>
                      <div class="mt-4 flex items-center gap-3.5">
                        <img src="${s.image}" alt="${s.title}" class="w-12 h-12 object-cover grayscale contrast-125 border border-[#11221C]" />
                        <div>
                          <h3 class="font-bold text-base leading-tight">${s.title}</h3>
                          <div class="font-mono text-[11px] text-[#11221C]/65 mt-0.5">${s.subtitle}</div>
                        </div>
                      </div>
                      ${!isFocused ? `
                        <p class="text-xs font-sans text-[#11221C]/80 leading-relaxed mt-3">${s.text}</p>
                      ` : ""}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </section>

          <!-- Full-Bleed Deep Forest Band: ZŠ Hlučín Case Study (Concise 2 quotes in Focused Mode) -->
          <section id="c-studie" class="bg-[#11221C] text-[#F3F0EA] border-b border-[#11221C]">
            <div class="max-w-[1440px] mx-auto grid lg:grid-cols-12">
              <div class="lg:col-span-5 p-8 sm:p-10 lg:border-r border-[#F3F0EA]/20 flex flex-col justify-between">
                <div>
                  <div class="font-mono text-xs uppercase tracking-widest text-[#D13B27]">03 // PŘÍPADOVÁ STUDIE</div>
                  <h2 class="text-2xl sm:text-4xl font-bold mt-2 leading-tight">${DATA.caseStudy.school}</h2>
                  <p class="font-editorial italic text-lg text-[#F3F0EA]/90 mt-3 leading-relaxed">
                    „Seminář předčil mé očekávání. Oceňuji praktické pojetí a okamžité využití v praxi.“
                  </p>
                  <div class="font-mono text-xs text-[#F3F0EA]/60 mt-2">— ${DATA.caseStudy.author}, ${DATA.caseStudy.role}</div>
                </div>

                <div class="mt-8 pt-6 border-t border-[#F3F0EA]/20 grid grid-cols-2 gap-6">
                  <div>
                    <div class="text-4xl font-bold text-[#D13B27]">52</div>
                    <div class="font-mono text-[11px] uppercase tracking-wider text-[#F3F0EA]/70 mt-1">Pedagogů v týmu</div>
                  </div>
                  <div>
                    <div class="text-4xl font-bold text-[#F3F0EA]">1,08</div>
                    <div class="font-mono text-[11px] uppercase tracking-wider text-[#F3F0EA]/70 mt-1">Hodnocení přínosu</div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div class="font-mono text-xs uppercase tracking-widest text-[#F3F0EA]/60 mb-4">
                    VYBRANÉ OHLASY ÚČASTNÍKŮ:
                  </div>
                  <div class="divide-y divide-[#F3F0EA]/20 border-t border-b border-[#F3F0EA]/20">
                    ${DATA.caseStudy.testimonials.slice(0, isFocused ? 2 : 4).map((q) => `
                      <div class="py-4 grid sm:grid-cols-12 gap-3 items-baseline">
                        <div class="sm:col-span-8 font-editorial italic text-base sm:text-lg text-white">
                          ${q.text}
                        </div>
                        <div class="sm:col-span-4 font-mono text-xs text-[#D13B27] sm:text-right">
                          [ ${q.tag} ]
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>

                ${isFocused ? `
                  <div class="mt-6 flex justify-end">
                    <button
                      onclick="PROTO.setCView('tym')"
                      class="font-mono text-xs uppercase tracking-widest bg-[#D13B27] text-white px-5 py-2.5 hover:bg-white hover:text-[#11221C] transition-colors cursor-pointer"
                    >
                      POKRAČOVAT NA: 03 / PARTNERKY & KLIENTI →
                    </button>
                  </div>
                ` : ""}
              </div>
            </div>
          </section>
        ` : ""}

        ${showTym ? `
          <!-- 4 Partners Architectural Portrait Columns (Bio on Demand in Focused Mode) -->
          <section id="c-tym" class="border-b border-[#11221C]">
            <div class="max-w-[1440px] mx-auto">
              <div class="px-6 sm:px-8 py-6 border-b border-[#11221C] flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span class="font-mono text-xs uppercase tracking-widest text-[#D13B27]">04 // VEDENÍ & LEKTORKY</span>
                  <h2 class="text-2xl sm:text-3xl font-bold mt-1">Čtyři partnerky A CO DÁL</h2>
                </div>
                <span class="font-mono text-xs">PŘÍMÉ KONTAKTY BEZ RECEPCE</span>
              </div>

              <div class="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#11221C]">
                ${DATA.team.map((m, idx) => {
                  const isExpanded = state.cExpandedTeamId === m.id;
                  return `
                    <div class="flex flex-col justify-between">
                      <div>
                        <div class="aspect-4/4 overflow-hidden border-b border-[#11221C] bg-[#E6E1D6]">
                          <img src="${m.photo}" alt="${m.name}" class="w-full h-full object-cover object-top" />
                        </div>
                        <div class="p-5">
                          <div class="font-mono text-[11px] text-[#D13B27]">PARTNERKA 0${idx + 1}</div>
                          <h3 class="text-xl font-bold mt-0.5">${m.name}</h3>
                          <div class="text-xs font-mono text-[#11221C]/70 mt-0.5">${m.role}</div>
                          ${isExpanded || !isFocused ? `
                            <p class="text-xs sm:text-sm font-sans text-[#11221C]/80 mt-3 pt-3 border-t border-[#11221C]/20 leading-relaxed">${m.shortBio}</p>
                          ` : ""}
                          <button
                            onclick="PROTO.toggleCTeam('${m.id}')"
                            class="mt-2 font-mono text-[11px] uppercase tracking-wider text-[#D13B27] hover:underline cursor-pointer"
                          >
                            ${isExpanded ? "[ − SKRÝT PROFIL ]" : "[ + PROFIL LEKTORKY ]"}
                          </button>
                        </div>
                      </div>
                      <div class="p-5 pt-3 border-t border-[#11221C]/20 font-mono text-xs space-y-1 bg-white/50">
                        <a href="tel:${m.phone.replace(/\s+/g, '')}" class="block font-bold hover:text-[#D13B27]">${m.phone}</a>
                        <a href="mailto:${m.email}" class="block text-[#11221C]/70 hover:underline truncate">${m.email}</a>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          </section>

          <!-- Client Logo Ledger (Top 6 in Focused Mode + Expand Button) -->
          <section class="max-w-[1440px] mx-auto px-6 sm:px-8 py-10 border-b border-[#11221C]">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#11221C]">
              <div class="font-mono text-xs uppercase tracking-widest">
                05 // VYBRANÉ REFERENCE (47 ORGANIZACÍ)
              </div>
              <div class="flex gap-6 font-mono text-xs uppercase">
                ${[
                  { id: "firmy", label: `FIRMY (${DATA.clients.firmy.length})` },
                  { id: "urady", label: `ÚŘADY (${DATA.clients.urady.length})` },
                  { id: "skoly", label: `ŠKOLY (${DATA.clients.skoly.length})` }
                ].map((tab) => `
                  <button
                    onclick="PROTO.setCClientSector('${tab.id}')"
                    class="pb-1 cursor-pointer ${state.cClientSector === tab.id ? 'border-b-2 border-[#D13B27] font-bold text-[#D13B27]' : 'text-[#11221C]/60 hover:text-[#11221C]'}"
                  >
                    ${tab.label}
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-6 py-6 items-center">
              ${visibleClients.map((c) => `
                <div class="flex flex-col items-center text-center group">
                  <img src="${c.logo}" alt="${c.name}" class="h-10 max-w-[110px] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                  <span class="font-mono text-[10px] text-[#11221C]/60 mt-1.5 line-clamp-1">${c.name}</span>
                </div>
              `).join("")}
            </div>

            ${isFocused && sectorClients.length > 6 ? `
              <div class="pt-2 text-center">
                <button
                  onclick="PROTO.toggleCShowAllLogos()"
                  class="font-mono text-xs uppercase tracking-widest text-[#D13B27] hover:underline cursor-pointer"
                >
                  ${state.cShowAllLogos
                    ? "[ − ZOBRAZIT JEN 6 VYBRANÝCH LOG ↑ ]"
                    : `[ + ZOBRAZIT VŠECH ${sectorClients.length} ORGANIZACÍ V SEKTORU ↓ ]`
                  }
                </button>
              </div>
            ` : ""}
          </section>
        ` : ""}

        <!-- Minimal Architectural Footer Band -->
        <footer class="max-w-[1440px] mx-auto px-6 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#11221C]/70">
          <div>
            <strong class="text-[#11221C]">A CO DÁL, s.r.o.</strong> (IČ: 01771264) • <strong class="text-[#11221C]">A co dál – centrum rozvoje, z.ú.</strong> (IČ: 09557181)
          </div>
          <div class="flex gap-6">
            <a href="tel:+420604392543" class="text-[#11221C] font-bold hover:text-[#D13B27]">${DATA.brand.phone}</a>
            <a href="mailto:kontakt@acodal.cz" class="text-[#D13B27] font-bold hover:underline">${DATA.brand.email}</a>
          </div>
        </footer>
      </div>
    `;
  }

  // ============================================================================
  // VARIANT D: NORDIC COLOR-BLOCK CANVAS & NATURAL SENTENCE CONFIGURATOR
  // Palette: Deep Midnight Indigo (#0F1E2E), Warm Ochre Gold (#E09F3E),
  //          Soft Sage Mist (#DCE5DF), Warm Linen (#F7F4EE), Terracotta (#C85A32)
  // Structure: ZERO nested boxes/borders! Full-bleed horizontal color-blocked
  //            sections and an interactive Mad-Libs style sentence builder.
  // ============================================================================
  function renderVariantD() {
    const qAudience = state.dQuiz.q1;
    const qPillar = state.dQuiz.q2;
    const matchedTopics = DATA.topics.filter(
      (t) => t.audiences.includes(qAudience) && (t.pillar === qPillar || t.id === "structogram")
    );

    const formatDescriptions = {
      workshop: "intenzivní 1–2denní zážitkový seminář (např. výjezdní sborovna nebo firemní trénink)",
      workplace: "výcvik a trénink dovedností přímo na pracovišti s auditem procesů",
      coaching: "individuální koučink, mentoring vedení a cílené konzultace"
    };

    return `
      <div class="min-h-screen bg-[#0F1E2E] text-[#F7F4EE] font-sans pb-32">
        <!-- Minimal Floating Transparent Header (No borders, no boxes) -->
        <header class="max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <img src="${DATA.brand.logo}" alt="A co dál" class="h-10 w-auto bg-[#F7F4EE] px-3 py-1" />
            <span class="text-xs tracking-widest uppercase text-[#94A8B8]">Ostrava • Neurověda, Structogram® & Rozvoj</span>
          </div>
          <div class="flex items-center gap-8 text-sm text-[#CBD5E1]">
            <a href="#d-katalog" class="hover:text-[#E09F3E] transition-colors">Všech 13 témat</a>
            <a href="#d-proces" class="hover:text-[#E09F3E] transition-colors">5 kroků</a>
            <a href="#d-tym" class="hover:text-[#E09F3E] transition-colors">Lektorky</a>
            <a href="tel:+420604392543" class="text-[#E09F3E] font-bold">+420 604 392 543</a>
          </div>
        </header>

        <!-- BAND 1: Deep Midnight Indigo — Interactive Natural-Language Sentence Configurator (No boxes!) -->
        <section class="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
          <div class="text-xs font-mono uppercase tracking-widest text-[#E09F3E] mb-6">
            INTERAKTIVNÍ ROZCESTNÍK — KLIKNĚTE NA PODTRŽENÁ SLOVA VE VĚTĚ
          </div>

          <!-- Giant Interactive Sentence ("Mad-Libs" Typography instead of 3 boxes inside a box) -->
          <div class="font-editorial text-3xl sm:text-5xl lg:text-[54px] leading-[1.28] text-[#F7F4EE] max-w-6xl">
            <span>Jsme </span>
            <span class="inline-flex flex-wrap gap-2 items-baseline mx-1">
              ${[
                { id: "skoly", label: "škola / sborovna" },
                { id: "firmy", label: "firma / korporace" },
                { id: "urady", label: "úřad / instituce" }
              ].map((opt) => `
                <button
                  onclick="PROTO.setDQuizAnswer('q1', '${opt.id}')"
                  class="cursor-pointer transition-all px-2 pb-1 border-b-4 ${
                    state.dQuiz.q1 === opt.id
                      ? "border-[#E09F3E] text-[#E09F3E] font-bold bg-white/5"
                      : "border-white/20 text-white/45 hover:text-white/80 text-2xl sm:text-4xl"
                  }"
                >
                  ${opt.label}
                </button>
              `).join("")}
            </span>
            <span>, naším hlavním cílem je </span>
            <span class="inline-flex flex-wrap gap-2 items-baseline mx-1">
              ${[
                { id: "neuro", label: "sebepoznání & neurověda" },
                { id: "teams", label: "vedení lidí & komunikace" },
                { id: "growth", label: "prevence vyhoření & vize" }
              ].map((opt) => `
                <button
                  onclick="PROTO.setDQuizAnswer('q2', '${opt.id}')"
                  class="cursor-pointer transition-all px-2 pb-1 border-b-4 ${
                    state.dQuiz.q2 === opt.id
                      ? "border-[#38BDF8] text-[#38BDF8] font-bold bg-white/5"
                      : "border-white/20 text-white/45 hover:text-white/80 text-2xl sm:text-4xl"
                  }"
                >
                  ${opt.label}
                </button>
              `).join("")}
            </span>
            <span> a preferujeme </span>
            <span class="inline-flex flex-wrap gap-2 items-baseline mx-1">
              ${[
                { id: "workshop", label: "zážitkový seminář" },
                { id: "workplace", label: "výcvik na pracovišti" },
                { id: "coaching", label: "individuální koučink" }
              ].map((opt) => `
                <button
                  onclick="PROTO.setDQuizAnswer('q3', '${opt.id}')"
                  class="cursor-pointer transition-all px-2 pb-1 border-b-4 ${
                    state.dQuiz.q3 === opt.id
                      ? "border-[#34D399] text-[#34D399] font-bold bg-white/5"
                      : "border-white/20 text-white/45 hover:text-white/80 text-2xl sm:text-4xl"
                  }"
                >
                  ${opt.label}
                </button>
              `).join("")}
            </span>.
          </div>

          <!-- Open Typographic Results Stream (No cards — clean horizontal rows with gold numerals) -->
          <div class="mt-16 pt-12 border-t border-white/15">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div class="text-xs font-mono uppercase tracking-widest text-[#34D399]">
                  DOPORUČENÁ KOMBINACE NA MÍRU (${matchedTopics.length} PROGRAMY)
                </div>
                <h2 class="text-2xl sm:text-3xl font-bold mt-2">
                  Navrhujeme ${formatDescriptions[state.dQuiz.q3]}:
                </h2>
              </div>
              <button
                onclick="PROTO.triggerInquiry('Větný konfigurátor: ${state.dQuiz.q1} / ${state.dQuiz.q2} / ${state.dQuiz.q3}')"
                class="self-start sm:self-auto bg-[#E09F3E] hover:bg-[#c98929] text-[#0F1E2E] font-bold px-7 py-4 text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                Nezávazně poptat toto řešení →
              </button>
            </div>

            <div class="divide-y divide-white/15">
              ${matchedTopics.map((t) => {
                const isExp = state.dExpandedTopicId === t.id;
                return `
                  <div class="py-8">
                    <div
                      onclick="PROTO.toggleDTopic('${t.id}')"
                      class="grid lg:grid-cols-12 gap-4 items-baseline cursor-pointer group"
                    >
                      <div class="lg:col-span-1 font-editorial italic text-3xl text-[#E09F3E]">
                        #${t.number}
                      </div>
                      <div class="lg:col-span-4">
                        <h3 class="text-2xl sm:text-3xl font-bold group-hover:text-[#E09F3E] transition-colors">
                          ${t.title}
                        </h3>
                        <span class="text-xs font-mono uppercase tracking-wider text-[#38BDF8]">${t.pillarLabel}</span>
                      </div>
                      <div class="lg:col-span-5 text-base text-[#CBD5E1] leading-relaxed">
                        ${t.subtitle}
                      </div>
                      <div class="lg:col-span-2 lg:text-right font-mono text-xs uppercase tracking-widest text-[#E09F3E]">
                        ${isExp ? "Skrýt body ↑" : `Zobrazit ${t.points.length} přínosů ↓`}
                      </div>
                    </div>

                    ${isExp ? `
                      <div class="mt-8 lg:ml-[8.333%] pl-6 border-l-2 border-[#E09F3E] space-y-3 max-w-3xl">
                        ${t.accreditation ? `<div class="text-xs font-mono uppercase text-[#E09F3E]">🏅 ${t.accreditation}</div>` : ""}
                        ${t.points.map((pt) => `
                          <p class="text-sm sm:text-base text-white/90 leading-relaxed">— ${pt}</p>
                        `).join("")}
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </section>

        <!-- BAND 2: Soft Nordic Sage Mist (#DCE5DF) — Open 5-Step Process Ribbon (No boxes) -->
        <section id="d-proces" class="bg-[#DCE5DF] text-[#132A23] py-20 px-6 sm:px-12">
          <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div class="lg:col-span-7">
                <div class="text-xs font-mono uppercase tracking-widest text-[#C85A32]">JAK SPOLUPRÁCE PROBÍHÁ</div>
                <h2 class="font-editorial text-4xl sm:text-5xl mt-2 leading-tight">
                  Pět plynulých kroků od prvního setkání po dlouhodobý efekt
                </h2>
              </div>
              <p class="lg:col-span-5 text-base text-[#132A23]/80 leading-relaxed">
                Každý program začíná pochopením vaší reality přímo ve firmě, sborovně nebo instituci. Nepoužíváme univerzální šablony.
              </p>
            </div>

            <!-- 5 Open Columns without borders or backgrounds -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
              ${DATA.steps.map((s) => `
                <div class="space-y-4">
                  <div class="flex items-center gap-4">
                    <span class="font-editorial italic text-5xl text-[#C85A32]">0${s.step}</span>
                    <img src="${s.image}" alt="${s.title}" class="w-14 h-14 rounded-full object-cover" />
                  </div>
                  <h3 class="text-xl font-bold text-[#132A23]">${s.title}</h3>
                  <div class="text-xs font-mono uppercase tracking-wider text-[#C85A32]">${s.subtitle}</div>
                  <p class="text-sm text-[#132A23]/80 leading-relaxed">${s.text}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- BAND 3: Warm Linen (#F7F4EE) — Complete 13-Topic Open Two-Column Directory -->
        <section id="d-katalog" class="bg-[#F7F4EE] text-[#17212B] py-20 px-6 sm:px-12">
          <div class="max-w-7xl mx-auto">
            <div class="max-w-3xl mb-14">
              <div class="text-xs font-mono uppercase tracking-widest text-[#C85A32]">KOMPLETNÍ PŘEHLED</div>
              <h2 class="font-editorial text-4xl sm:text-5xl mt-2">Všech 13 oblastí rozvoje na jednom místě</h2>
              <p class="text-base text-[#17212B]/70 mt-3">
                Kliknutím na libovolný řádek zobrazíte podrobnou náplň kurzu přímo v textu — bez vyskakovacích oken a bez rámečků.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-x-16 divide-y divide-[#17212B]/15 border-t border-b border-[#17212B]/15">
              ${DATA.topics.map((t) => {
                const open = state.dExpandedTopicId === t.id;
                return `
                  <div class="py-6">
                    <button
                      onclick="PROTO.toggleDTopic('${t.id}')"
                      class="w-full text-left flex items-baseline justify-between gap-4 cursor-pointer group"
                    >
                      <div class="flex items-baseline gap-4">
                        <span class="font-mono text-xs text-[#C85A32] font-bold">${t.number}</span>
                        <div>
                          <h3 class="text-xl font-bold group-hover:text-[#C85A32] transition-colors">${t.title}</h3>
                          <p class="text-xs text-[#17212B]/65 mt-1">${t.subtitle}</p>
                        </div>
                      </div>
                      <span class="font-mono text-lg text-[#C85A32] shrink-0">${open ? "−" : "+"}</span>
                    </button>

                    ${open ? `
                      <div class="mt-4 pl-8 space-y-2 border-l-2 border-[#C85A32]">
                        <div class="text-xs font-mono text-[#C85A32]">${t.format} ${t.accreditation ? `• ${t.accreditation}` : ""}</div>
                        <ul class="space-y-1.5 text-sm text-[#17212B]/85 pt-1">
                          ${t.points.map((pt) => `<li>• ${pt}</li>`).join("")}
                        </ul>
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </section>

        <!-- BAND 4: Terracotta Clay (#C85A32) — Unboxed Editorial Team & Direct Contact -->
        <section id="d-tym" class="bg-[#231915] text-[#F7F4EE] py-20 px-6 sm:px-12">
          <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-12 gap-12 mb-16 items-end">
              <div class="lg:col-span-6">
                <div class="text-xs font-mono uppercase tracking-widest text-[#E09F3E]">NÁŠ TÝM & PŘÍBĚH</div>
                <h2 class="font-editorial text-4xl sm:text-5xl mt-2">Kreativní parta z Ostravy</h2>
              </div>
              <blockquote class="lg:col-span-6 font-editorial italic text-xl text-[#F7F4EE]/85 leading-relaxed">
                ${DATA.foundingStory.quote}
              </blockquote>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              ${DATA.team.map((m) => `
                <div class="space-y-4">
                  <img src="${m.photo}" alt="${m.name}" class="w-full aspect-4/4 object-cover object-top" />
                  <div>
                    <h3 class="font-editorial text-2xl">${m.name}</h3>
                    <div class="text-xs font-mono uppercase tracking-wider text-[#E09F3E] mt-1">${m.role}</div>
                    <p class="text-sm text-[#F7F4EE]/75 mt-3 leading-relaxed">${m.shortBio}</p>
                    <div class="mt-4 pt-3 border-t border-white/15 text-xs font-mono space-y-1">
                      <a href="tel:${m.phone.replace(/\s+/g, '')}" class="block text-[#E09F3E] font-bold">${m.phone}</a>
                      <a href="mailto:${m.email}" class="block text-white/70 hover:underline">${m.email}</a>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // ============================================================================
  // VARIANT E: BOTANICAL MAGAZINE LOOKBOOK (Editorial Print Aesthetic — Zero Boxes)
  // Palette: Warm Flax Linen (#F6F3EC), Deep Botanical Pine (#142822),
  //          Burnt Sienna (#C85232), Soft Olive Moss (#6B7D73)
  // Structure: Reads like a Kinfolk / Monocle print magazine. Asymmetrical two-column
  //            spreads, drop-caps, Roman numerals, unboxed photos, flowing prose.
  // ============================================================================
  function renderVariantE() {
    const isFocused = state.eDensity === "focused";
    const view = state.eView || "programy"; // "programy" | "cesta" | "autorky"

    const filteredTopics = state.ePillar === "all"
      ? DATA.topics
      : DATA.topics.filter((t) => t.pillar === state.ePillar);

    const visibleTopics = (isFocused && !state.eShowAllCourses && state.ePillar === "all")
      ? filteredTopics.slice(0, 6)
      : filteredTopics;
    const hiddenTopicsCount = filteredTopics.length - visibleTopics.length;

    const activeStepObj = DATA.steps.find((s) => s.step === state.eActiveStep) || DATA.steps[0];

    const showProgramy = !isFocused || view === "programy";
    const showCesta = !isFocused || view === "cesta";
    const showAutorky = !isFocused || view === "autorky";

    return `
      <div class="min-h-screen bg-[#F6F3EC] text-[#142822] font-sans pb-32 selection:bg-[#142822] selection:text-[#F6F3EC]">
        <!-- Print Magazine Masthead -->
        <header class="max-w-6xl mx-auto px-6 sm:px-12 pt-8 pb-5 border-b-2 border-[#142822]">
          <div class="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-widest text-[#6B7D73] pb-3 border-b border-[#142822]/15">
            <span>VYDÁNÍ 2025 // OSTRAVA, ČESKÁ REPUBLIKA</span>
            <span class="hidden md:inline">APLIKOVANÁ NEUROVĚDA • STRUCTOGRAM® • KOUČINK</span>
            <button
              onclick="PROTO.toggleEDensity()"
              class="text-[#C85232] font-bold hover:underline cursor-pointer"
            >
              ${isFocused ? "✨ REŽIM: 3 ČASOPISECKÉ DVOJSTRANY" : "📜 REŽIM: CELÉ ČÍSLO POD SEBOU"}
            </button>
          </div>

          <div class="pt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <a href="#top" onclick="PROTO.setEView('programy'); return false;" class="flex items-center gap-4 cursor-pointer">
              <img src="${DATA.brand.logo}" alt="A co dál" class="h-11 w-auto" />
              <div>
                <div class="font-editorial text-3xl sm:text-4xl tracking-tight text-[#142822]">A CO DÁL</div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#C85232] mt-0.5">Rozvoj lidí, firem a škol s respektem k mozku</div>
              </div>
            </a>

            ${isFocused ? `
              <!-- Clean 3-Spread Magazine Switcher -->
              <nav class="flex flex-wrap gap-5 sm:gap-8 text-sm sm:text-base font-editorial">
                ${[
                  { id: "programy", label: "I. Úvodník & Kapitoly" },
                  { id: "cesta", label: "II. Pět zastavení & Praxe" },
                  { id: "autorky", label: "III. Autorky & Kolofon" }
                ].map((tab) => {
                  const active = view === tab.id;
                  return `
                    <button
                      onclick="PROTO.setEView('${tab.id}')"
                      class="pb-1 cursor-pointer transition-all ${
                        active
                          ? "border-b-2 border-[#C85232] text-[#142822] font-bold"
                          : "italic text-[#6B7D73] hover:text-[#142822]"
                      }"
                    >
                      ${tab.label}
                    </button>
                  `;
                }).join("")}
              </nav>
            ` : `
              <nav class="flex flex-wrap gap-6 text-sm font-editorial italic text-[#142822]">
                <a href="#e-uvodnik" class="hover:text-[#C85232]">I. Úvodník</a>
                <a href="#e-rejstrik" class="hover:text-[#C85232]">II. Kapitoly (13)</a>
                <a href="#e-cesta" class="hover:text-[#C85232]">III. Pět zastavení</a>
                <a href="#e-studie" class="hover:text-[#C85232]">IV. Reportáž</a>
                <a href="#e-autorky" class="hover:text-[#C85232]">V. Autorky</a>
              </nav>
            `}
          </div>
        </header>

        ${showProgramy ? `
          <!-- CHAPTER I: Concise Editorial Spread Hero -->
          <section id="e-uvodnik" class="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-14 border-b border-[#142822]/20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-7 space-y-5">
                <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">KAPITOLA I. — FILOZOFIE VZDĚLÁVÁNÍ</div>
                <h1 class="font-editorial text-4xl sm:text-5xl leading-[1.1] font-normal text-[#142822]">
                  Každý mozek je originál. Když pochopíte jeho genetický kód, <em class="text-[#C85232]">přestanete bojovat s větrnými mlýny.</em>
                </h1>
                <p class="text-base sm:text-lg text-[#142822]/80 leading-relaxed">
                  Vzděláváme prožitkem. Spojujeme biostrukturální analýzu <strong>Structogram®</strong>, trénink paměti a strategické provázení sboroven i firemních týmů.
                </p>
                <div class="pt-2 flex flex-wrap items-center gap-8">
                  <button
                    onclick="PROTO.triggerInquiry('Magazínový lookbook — domluvit setkání u kávy')"
                    class="border-b-2 border-[#C85232] pb-1 font-editorial italic text-xl text-[#C85232] hover:text-[#142822] hover:border-[#142822] transition-colors cursor-pointer"
                  >
                    Domluvit nezávazné setkání u kávy →
                  </button>
                  <span class="text-xs font-mono uppercase tracking-wider text-[#6B7D73]">Akreditace MŠMT & MPSV</span>
                </div>
              </div>

              <div class="lg:col-span-5">
                <img src="${DATA.photos.heroOnas}" alt="Seminář A co dál" class="w-full aspect-4/3 object-cover" />
                <div class="flex justify-between text-[11px] font-mono text-[#6B7D73] pt-2">
                  <span>ARCHIV A CO DÁL</span>
                  <button onclick="PROTO.setEView('autorky')" class="text-[#C85232] hover:underline cursor-pointer">POZNAT 4 AUTORKY →</button>
                </div>
              </div>
            </div>
          </section>

          <!-- CHAPTER II: Book-Style Table of Contents for Programs (6 Flagship First + Progressive Disclosure) -->
          <section id="e-rejstrik" class="max-w-6xl mx-auto px-6 sm:px-12 py-14 border-b border-[#142822]/20">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">OBSAH STUDIJNÍCH PROGRAMŮ</div>
                <h2 class="font-editorial text-3xl sm:text-4xl mt-1">Tematické okruhy (Kliknutím otevřete kapitolu)</h2>
              </div>

              <!-- Minimalist Underline Filter Tabs -->
              <div class="flex flex-wrap gap-5 text-xs sm:text-sm">
                ${DATA.pillars.map((p) => {
                  const active = state.ePillar === p.id;
                  return `
                    <button
                      onclick="PROTO.setEPillar('${p.id}')"
                      class="pb-1 cursor-pointer transition-colors ${
                        active
                          ? "border-b-2 border-[#C85232] font-bold text-[#142822]"
                          : "text-[#6B7D73] hover:text-[#142822]"
                      }"
                    >
                      ${p.label} (${p.count})
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Editorial Index Lines -->
            <div class="divide-y divide-[#142822]/15 border-t border-b border-[#142822]/15">
              ${visibleTopics.map((t) => {
                const isOpen = state.eOpenTopicId === t.id;
                return `
                  <article class="py-4 sm:py-5">
                    <div
                      onclick="PROTO.toggleETopic('${t.id}')"
                      class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 cursor-pointer group"
                    >
                      <div class="flex items-baseline gap-4">
                        <span class="font-editorial italic text-xl text-[#C85232] w-7 shrink-0">${t.number}.</span>
                        <div>
                          <h3 class="font-editorial text-xl sm:text-2xl group-hover:text-[#C85232] transition-colors">
                            ${t.title}
                          </h3>
                          <p class="text-xs sm:text-sm text-[#6B7D73] mt-0.5 line-clamp-1">${t.subtitle}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4 sm:pl-4 shrink-0 font-mono text-[11px] uppercase tracking-widest text-[#142822]/70">
                        <span class="hidden md:inline">${t.pillarLabel}</span>
                        <span class="text-[#C85232] font-bold">${isOpen ? "[ Zavřít − ]" : "[ Sylabus + ]"}</span>
                      </div>
                    </div>

                    ${isOpen ? `
                      <div class="mt-5 sm:ml-11 pt-5 border-t border-[#142822]/15 grid md:grid-cols-12 gap-6">
                        <div class="md:col-span-4 space-y-2 text-xs font-mono text-[#6B7D73]">
                          <div class="text-[#142822] font-bold uppercase">Specifikace kapitoly</div>
                          <div>FORMÁT: ${t.format}</div>
                          ${t.accreditation ? `<div class="text-[#C85232]">AKREDITACE: ${t.accreditation}</div>` : ""}
                          <div class="pt-2">
                            <button
                              onclick="PROTO.triggerInquiry('Kapitola ${t.number}: ${t.title}')"
                              class="underline text-[#C85232] font-bold uppercase tracking-widest cursor-pointer"
                            >
                              Poptat tuto kapitolu →
                            </button>
                          </div>
                        </div>
                        <div class="md:col-span-8 space-y-2 text-sm sm:text-base text-[#142822]/90">
                          <div class="font-editorial italic text-base text-[#142822] mb-1">Co vám tato kapitola přinese:</div>
                          ${t.points.map((pt) => `
                            <p class="leading-relaxed">— ${pt}</p>
                          `).join("")}
                        </div>
                      </div>
                    ` : ""}
                  </article>
                `;
              }).join("")}
            </div>

            ${isFocused && state.ePillar === "all" ? `
              <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
                <button
                  onclick="PROTO.toggleEShowAllCourses()"
                  class="font-editorial italic text-lg text-[#C85232] hover:text-[#142822] underline underline-offset-4 cursor-pointer"
                >
                  ${state.eShowAllCourses
                    ? "Zobrazit pouze 6 hlavních kapitol ↑"
                    : `Listovat všemi 13 kapitolami (+${hiddenTopicsCount} dalších) ↓`
                  }
                </button>
                <button
                  onclick="PROTO.setEView('cesta')"
                  class="font-mono text-xs uppercase tracking-widest text-[#142822] border-b border-[#142822] pb-1 hover:text-[#C85232] hover:border-[#C85232] cursor-pointer"
                >
                  Číst dál: II. Pět zastavení & Praxe →
                </button>
              </div>
            ` : ""}
          </section>
        ` : ""}

        ${showCesta ? `
          <!-- CHAPTER III: Interactive 5-Step Editorial Storyboard -->
          <section id="e-cesta" class="max-w-6xl mx-auto px-6 sm:px-12 py-14 border-b border-[#142822]/20">
            <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">KAPITOLA II. — PRŮBĚH SPOLUPRÁCE</div>
            <h2 class="font-editorial text-3xl sm:text-4xl mt-1 mb-8">Pět zastavení na společné cestě (Klikněte na krok)</h2>

            <!-- Horizontal Roman Numeral Step Selector (No boxes, just typographic tabs) -->
            <div class="grid grid-cols-5 border-b border-[#142822]/20 pb-4 mb-8 gap-4">
              ${DATA.steps.map((s) => {
                const active = state.eActiveStep === s.step;
                return `
                  <button
                    onclick="PROTO.setEStep(${s.step})"
                    class="text-left cursor-pointer group ${active ? 'text-[#C85232]' : 'text-[#6B7D73] hover:text-[#142822]'}"
                  >
                    <div class="font-editorial italic text-2xl">0${s.step}</div>
                    <div class="text-xs sm:text-sm font-bold mt-0.5 ${active ? 'underline underline-offset-8' : ''}">${s.title}</div>
                  </button>
                `;
              }).join("")}
            </div>

            <!-- Active Step Editorial Spread -->
            <div class="grid md:grid-cols-12 gap-8 items-center">
              <div class="md:col-span-5 flex items-center gap-5">
                <img src="${activeStepObj.image}" alt="${activeStepObj.title}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover" />
                <div>
                  <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">ZASTAVENÍ 0${activeStepObj.step} / 05</div>
                  <div class="font-editorial text-2xl sm:text-3xl mt-1">${activeStepObj.title}</div>
                  <div class="text-xs text-[#6B7D73] mt-0.5">${activeStepObj.subtitle}</div>
                </div>
              </div>
              <div class="md:col-span-7">
                <p class="font-editorial text-xl sm:text-2xl leading-relaxed text-[#142822]">
                  „${activeStepObj.text}“
                </p>
              </div>
            </div>
          </section>

          <!-- CHAPTER IV: Concise Reportáž ze sborovny ZŠ Hlučín - Rovniny -->
          <section id="e-studie" class="max-w-6xl mx-auto px-6 sm:px-12 py-14 border-b border-[#142822]/20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-6">
                <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">REPORTÁŽ Z PRAXE • 52 PEDAGOGŮ</div>
                <h2 class="font-editorial text-3xl sm:text-4xl mt-2 leading-tight">${DATA.caseStudy.school}</h2>
                <blockquote class="font-editorial italic text-xl text-[#142822]/90 mt-4 leading-relaxed">
                  „Seminář předčil mé očekávání. Oceňuji praktické pojetí a okamžité využití v praxi.“
                </blockquote>
                <div class="text-xs font-mono uppercase tracking-wider text-[#6B7D73] mt-2">
                  — ${DATA.caseStudy.author}, ${DATA.caseStudy.role}
                </div>
              </div>

              <div class="lg:col-span-6 space-y-5 border-t lg:border-t-0 lg:border-l border-[#142822]/15 pt-6 lg:pt-0 lg:pl-10">
                <div class="font-mono text-xs uppercase tracking-widest text-[#6B7D73]">ZÁPISKY ÚČASTNÍKŮ ZE SBOROVNY:</div>
                ${DATA.caseStudy.testimonials.slice(0, 2).map((q) => `
                  <blockquote class="pb-4 border-b border-[#142822]/15 last:border-b-0 last:pb-0">
                    <p class="font-editorial italic text-lg text-[#142822]">${q.text}</p>
                    <footer class="text-[11px] font-mono uppercase tracking-wider text-[#C85232] mt-1">• ${q.tag}</footer>
                  </blockquote>
                `).join("")}
              </div>
            </div>

            ${isFocused ? `
              <div class="mt-10 pt-6 border-t border-[#142822]/15 flex justify-end">
                <button
                  onclick="PROTO.setEView('autorky')"
                  class="font-mono text-xs uppercase tracking-widest text-[#142822] border-b border-[#142822] pb-1 hover:text-[#C85232] hover:border-[#C85232] cursor-pointer"
                >
                  Číst dál: III. Autorky & Kolofon →
                </button>
              </div>
            ` : ""}
          </section>
        ` : ""}

        ${showAutorky ? `
          <!-- CHAPTER V: Autorky & Kolofon (Concise with Expandable Bios) -->
          <section id="e-autorky" class="max-w-6xl mx-auto px-6 sm:px-12 py-14 border-b border-[#142822]/20">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div class="font-mono text-xs uppercase tracking-widest text-[#C85232]">KAPITOLA III. — AUTORKY PROJEKTU</div>
                <h2 class="font-editorial text-3xl sm:text-4xl mt-1">Osobní garance čtyř lektorek</h2>
              </div>
              <p class="font-editorial italic text-base text-[#6B7D73] max-w-md">
                „Spojilo se přátelství, vzájemná úcta, respekt a důvěra.“
              </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              ${DATA.team.map((m) => {
                const isExpanded = state.eExpandedTeamId === m.id;
                return `
                  <div class="flex flex-col justify-between">
                    <div>
                      <img src="${m.photo}" alt="${m.name}" class="w-full aspect-4/4 object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
                      <h3 class="font-editorial text-2xl mt-3">${m.name}</h3>
                      <div class="text-xs font-mono uppercase text-[#C85232] mt-0.5">${m.role}</div>
                      ${isExpanded || !isFocused ? `
                        <p class="text-xs sm:text-sm text-[#142822]/80 mt-2.5 pt-2.5 border-t border-[#142822]/15 leading-relaxed">${m.shortBio}</p>
                      ` : ""}
                      <button
                        onclick="PROTO.toggleETeam('${m.id}')"
                        class="mt-2 font-editorial italic text-sm text-[#C85232] hover:underline cursor-pointer"
                      >
                        ${isExpanded ? "Skrýt medailonek ↑" : "Číst medailonek ↓"}
                      </button>
                    </div>
                    <div class="mt-4 pt-3 border-t border-[#142822]/15 font-mono text-xs space-y-0.5">
                      <a href="tel:${m.phone.replace(/\s+/g, '')}" class="block font-bold">${m.phone}</a>
                      <a href="mailto:${m.email}" class="block text-[#6B7D73] hover:underline truncate">${m.email}</a>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Selected Clients Strip inside Autorky & Kolofon -->
            <div class="mt-14 pt-10 border-t border-[#142822]/20">
              <div class="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <div class="font-mono text-xs uppercase tracking-widest text-[#6B7D73]">
                  VYBRANÉ ORGANIZACE, KTERÉ S NÁMI ROSTOU (CELKEM 47 KLIENTŮ):
                </div>
                <span class="font-editorial italic text-sm text-[#6B7D73]">Firmy • Školy • Veřejná správa</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
                ${DATA.clients.firmy.slice(0, 6).map((c) => `
                  <div class="flex flex-col items-center text-center">
                    <img src="${c.logo}" alt="${c.name}" class="h-9 max-w-[100px] object-contain grayscale opacity-75" />
                    <span class="font-mono text-[10px] text-[#6B7D73] mt-1.5 line-clamp-1">${c.name}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </section>
        ` : ""}

        <!-- Magazine Colophon Footer -->
        <footer class="max-w-6xl mx-auto px-6 sm:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#6B7D73]">
          <div>
            <strong class="text-[#142822]">A CO DÁL, s.r.o.</strong> (IČ: 01771264) • <strong class="text-[#142822]">A co dál – centrum rozvoje, z.ú.</strong> (IČ: 09557181)
          </div>
          <div class="flex gap-6">
            <a href="tel:+420604392543" class="text-[#142822] font-bold hover:text-[#C85232]">${DATA.brand.phone}</a>
            <a href="mailto:kontakt@acodal.cz" class="text-[#C85232] font-bold hover:underline">${DATA.brand.email}</a>
          </div>
        </footer>
      </div>
    `;
  }

  // ============================================================================
  // FLOATING PROTOTYPE SWITCHER & STATE INSPECTOR (Required by UI.md & SKILL.md)
  // ============================================================================
  function renderPrototypeSwitcher() {
    const currentObj = VARIANTS.find((v) => v.key === state.variant) || VARIANTS[0];

    // Surface current active state summary per Rule #5 ("Surface the state")
    let activeStateText = "";
    if (state.variant.startsWith("A")) {
      activeStateText = `Paleta: ${state.variant} | Režim: ${state.aDensity === "focused" ? `Stručný (Sekce: ${state.aView})` : "Vše pod sebou"} | Detail: ${state.aDrawerTopicId || "zavřený"}`;
    } else if (state.variant === "B") {
      activeStateText = `Cílová skupina: ${state.bAudience.toUpperCase()} | Vybraný kurz: ${state.bSelectedTopicId}`;
    } else if (state.variant === "C") {
      activeStateText = `Režim: ${state.cDensity === "focused" ? `3 listy (${state.cView})` : "Plný"} | Mozek: ${state.cBrainColor.toUpperCase()} | Řádek: ${state.cOpenTopicId || "žádný"}`;
    } else if (state.variant === "D") {
      activeStateText = `Věta: [${state.dQuiz.q1}, ${state.dQuiz.q2}, ${state.dQuiz.q3}] | Detail: ${state.dExpandedTopicId || "žádný"}`;
    } else if (state.variant === "E") {
      activeStateText = `Režim: ${state.eDensity === "focused" ? `3 dvojstrany (${state.eView})` : "Plný"} | Okruh: ${state.ePillar} | Kapitola: ${state.eOpenTopicId || "žádná"}`;
    }

    return `
      <!-- Inquiry Stub Toast -->
      ${state.inquiryToast ? `
        <div class="fixed top-5 right-5 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs sm:text-sm font-semibold flex items-center gap-3">
          <span>✅ ${state.inquiryToast}</span>
        </div>
      ` : ""}

      ${state.switcherMinimized ? `
        <!-- Minimized Corner Pill -->
        <div class="fixed bottom-4 right-4 z-50 flex items-center gap-1 bg-zinc-950/90 text-white backdrop-blur-xl border border-white/20 rounded-full shadow-2xl px-2.5 py-1.5 text-xs">
          <button
            onclick="PROTO.cycleVariant(-1)"
            title="Předchozí varianta (←)"
            class="w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center font-bold cursor-pointer"
          >
            ←
          </button>
          <button
            onclick="PROTO.toggleSwitcher()"
            title="Rozbalit přepínač variant (klávesa H)"
            class="px-2 py-0.5 font-bold flex items-center gap-1.5 hover:text-[#E77817] transition-colors cursor-pointer"
          >
            <span class="text-[#E77817]">${currentObj.key}</span>
            <span class="hidden sm:inline text-zinc-300">${currentObj.name.split("·")[0].trim()}</span>
            <span class="text-[10px] text-zinc-400 ml-0.5">▲</span>
          </button>
          <button
            onclick="PROTO.cycleVariant(1)"
            title="Další varianta (→)"
            class="w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center font-bold cursor-pointer"
          >
            →
          </button>
        </div>
      ` : `
        <!-- Floating Bottom-Center Switcher Bar -->
        <div class="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] pointer-events-none">
          <div class="pointer-events-auto bg-zinc-950/95 text-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-3.5 py-2">
            ${state.showStateHud ? `
              <div class="pb-2 mb-2 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] max-w-4xl">
                <div class="text-zinc-300">
                  <span class="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono font-bold mr-1.5">PROTOTYPE</span>
                  <strong>${currentObj.czTitle}:</strong> <span class="text-zinc-400">${currentObj.philosophy}</span>
                </div>
                <div class="font-mono text-[10px] text-emerald-400 shrink-0">
                  Stav: ${activeStateText}
                </div>
              </div>
            ` : ""}

            <div class="flex flex-wrap items-center justify-between gap-2">
              <!-- Left Arrow + Variant Label + Right Arrow -->
              <div class="flex items-center gap-1.5">
                <button
                  onclick="PROTO.cycleVariant(-1)"
                  title="Předchozí varianta (šipka vlevo ←)"
                  class="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E77817] text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  ←
                </button>

                <div class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold whitespace-nowrap">
                  <span class="text-[#E77817]">${currentObj.key}</span>
                  <span class="hidden md:inline text-zinc-300 font-normal ml-1">${currentObj.czTitle.split("(")[0].trim()}</span>
                </div>

                <button
                  onclick="PROTO.cycleVariant(1)"
                  title="Další varianta (šipka vpravo →)"
                  class="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E77817] text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>

              <!-- Direct Variant Pill Buttons -->
              <div class="flex flex-wrap items-center gap-1">
                ${VARIANTS.map((v) => {
                  const isCurr = v.key === state.variant;
                  const tooltip = `${v.key}: ${v.name} — ${v.czTitle}`;
                  return `
                    <button
                      onclick="PROTO.setVariant('${v.key}')"
                      title="${tooltip}"
                      class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurr
                          ? "bg-[#E77817] text-white shadow-xs"
                          : "bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white"
                      }"
                    >
                      ${v.key.startsWith("A") ? v.key : `${v.key}: ${v.name.split(" ")[0]}`}
                    </button>
                  `;
                }).join("")}
              </div>

              <!-- Toggle Info HUD & Hide Controls -->
              <div class="flex items-center gap-1">
                <button
                  onclick="PROTO.toggleHud()"
                  title="Zobrazit/skrýt popis varianty"
                  class="text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  ${state.showStateHud ? "Info ↓" : "Info ↑"}
                </button>
                <button
                  onclick="PROTO.toggleSwitcher()"
                  title="Minimalizovat lištu do rohu (klávesa H)"
                  class="text-[11px] font-mono text-zinc-300 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-[#E77817] transition-colors cursor-pointer"
                >
                  Skrýt lištu ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      `}
    `;
  }

  function render() {
    const root = document.getElementById("prototype-root");
    if (!root) return;

    let variantHtml = "";
    if (state.variant.startsWith("A")) variantHtml = renderVariantA(state.variant);
    else if (state.variant === "B") variantHtml = renderVariantB();
    else if (state.variant === "C") variantHtml = renderVariantC();
    else if (state.variant === "D") variantHtml = renderVariantD();
    else if (state.variant === "E") variantHtml = renderVariantE();

    root.innerHTML = variantHtml + renderPrototypeSwitcher();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
