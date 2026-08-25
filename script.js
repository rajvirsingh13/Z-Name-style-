/* =========================================================
   Z-NAME STYLE - COMPLETE SCRIPT
   220+ SAFE STYLES
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const cleanName = (value) => {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 60);
  };

  const escapeHTML = (value) => {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  /* ---------------------------------------------------------
     FIND IMPORTANT ELEMENTS
  --------------------------------------------------------- */

  function findNameInput() {
    return (
      $("#nameInput") ||
      $("#name-input") ||
      $("#name") ||
      $('input[name="name"]') ||
      $('input[type="text"]')
    );
  }

  function findGenerateButton() {
    return (
      $("#generateBtn") ||
      $("#generate-btn") ||
      $("#generateButton") ||
      $(".generate-btn") ||
      $(".generate-button") ||
      $('button[type="submit"]')
    );
  }

  function findResultsContainer() {
    return (
      $("#results") ||
      $("#resultsGrid") ||
      $("#results-grid") ||
      $("#styleResults") ||
      $("#style-results") ||
      $(".results-grid") ||
      $(".style-grid") ||
      $(".results") ||
      $(".generated-styles")
    );
  }

  function findPreview() {
    return (
      $("#livePreview") ||
      $("#live-preview") ||
      $(".live-preview") ||
      $(".preview-name") ||
      $(".preview-text")
    );
  }

  /* ---------------------------------------------------------
     STYLE DATA
     
     Category is ONLY used internally for filtering.
     It is NEVER shown inside the card.
  --------------------------------------------------------- */

  const styles = [];

  function addStyle(category, transform) {
    styles.push({
      id: styles.length + 1,
      category,
      transform
    });
  }

  /* ---------------------------------------------------------
     BASIC SAFE WRAPPERS
  --------------------------------------------------------- */

  const wrappers = [
    ["Fancy", "★ {n} ★"],
    ["Fancy", "☆ {n} ☆"],
    ["Fancy", "✦ {n} ✦"],
    ["Fancy", "✧ {n} ✧"],
    ["Fancy", "✪ {n} ✪"],
    ["Fancy", "✯ {n} ✯"],
    ["Fancy", "✰ {n} ✰"],
    ["Fancy", "❖ {n} ❖"],
    ["Fancy", "◆ {n} ◆"],
    ["Fancy", "◇ {n} ◇"],
    ["Fancy", "• {n} •"],
    ["Fancy", "◦ {n} ◦"],
    ["Fancy", "· {n} ·"],
    ["Fancy", "× {n} ×"],
    ["Fancy", "✕ {n} ✕"],
    ["Fancy", "✚ {n} ✚"],
    ["Fancy", "✧･ﾟ: {n} :･ﾟ✧"],
    ["Fancy", "✦･ﾟ: {n} :ﾟ･✦"],
    ["Fancy", "❖ {n} ❖"],
    ["Fancy", "『{n}』"],
    ["Fancy", "【{n}】"],
    ["Fancy", "〔{n}〕"],
    ["Fancy", "〖{n}〗"],
    ["Fancy", "〘{n}〙"],
    ["Fancy", "〚{n}〛"],
    ["Fancy", "〈{n}〉"],
    ["Fancy", "《{n}》"],
    ["Fancy", "「{n}」"],
    ["Fancy", "『{n}』"],
    ["Fancy", "〝{n}〞"],
    ["Fancy", "‹ {n} ›"],
    ["Fancy", "« {n} »"],
    ["Fancy", "‹‹ {n} ››"],
    ["Fancy", "«« {n} »»"],
    ["Fancy", "— {n} —"],
    ["Fancy", "– {n} –"],
    ["Fancy", "_ {n} _"],
    ["Fancy", "~ {n} ~"],
    ["Fancy", "≈ {n} ≈"],
    ["Fancy", "≋ {n} ≋"],
    ["Fancy", "⌁ {n} ⌁"],
    ["Fancy", "〰 {n} 〰"],
    ["Fancy", "•° {n} °•"],
    ["Fancy", "°• {n} •°"],
    ["Fancy", "｡･:* {n} *:･｡"],
    ["Fancy", "｡･ﾟ {n} ﾟ･｡"],
    ["Fancy", "･ﾟ✧ {n} ✧ﾟ･"],
    ["Fancy", "✧ﾟ･ {n} ･ﾟ✧"],
    ["Fancy", "⋆ {n} ⋆"],
    ["Fancy", "⋆｡ﾟ✶ {n} ✶ﾟ｡⋆"],
    ["Fancy", "｡ﾟ✶ {n} ✶ﾟ｡"],
    ["Fancy", "✶ {n} ✶"],
    ["Fancy", "✷ {n} ✷"],
    ["Fancy", "✸ {n} ✸"],
    ["Fancy", "✹ {n} ✹"],
    ["Fancy", "✺ {n} ✺"],
    ["Fancy", "✻ {n} ✻"],
    ["Fancy", "✼ {n} ✼"],
    ["Fancy", "✽ {n} ✽"],
    ["Fancy", "✾ {n} ✾"],
    ["Fancy", "❀ {n} ❀"],
    ["Fancy", "✿ {n} ✿"],
    ["Fancy", "❁ {n} ❁"],
    ["Fancy", "❃ {n} ❃"],
    ["Fancy", "❋ {n} ❋"],
    ["Fancy", "❊ {n} ❊"],
    ["Fancy", "✤ {n} ✤"],
    ["Fancy", "✥ {n} ✥"],
    ["Fancy", "✣ {n} ✣"],
    ["Fancy", "✢ {n} ✢"],
    ["Fancy", "✦ {n} ✦"],
    ["Fancy", "✧ {n} ✧"],
    ["Fancy", "★彡 {n} 彡★"],
    ["Fancy", "☆彡 {n} 彡☆"],
    ["Fancy", "✦彡 {n} 彡✦"],
    ["Fancy", "✧彡 {n} 彡✧"],
    ["Fancy", "★彡[{n}]彡★"],
    ["Fancy", "☆彡[{n}]彡☆"],
    ["Fancy", "✦・ {n} ・✦"],
    ["Fancy", "✧・ {n} ・✧"],
    ["Fancy", "✦━ {n} ━✦"],
    ["Fancy", "✧━ {n} ━✧"],
    ["Fancy", "★━ {n} ━★"],
    ["Fancy", "☆━ {n} ━☆"]
  ];

  wrappers.forEach(([category, pattern]) => {
    addStyle(category, (name) =>
      pattern.replace(/\{n\}/g, name)
    );
  });

  /* ---------------------------------------------------------
     GAMING STYLES
  --------------------------------------------------------- */

  const gamingPatterns = [
    "乂 {n} 乂",
    "メ {n} メ",
    "ツ {n} ツ",
    "シ {n} シ",
    "彡 {n} 彡",
    "乄 {n} 乄",
    "么 {n} 么",
    "亗 {n} 亗",
    "〆 {n} 〆",
    "々 {n} 々",
    "刃 {n} 刃",
    "⚔ {n} ⚔",
    "⚡ {n} ⚡",
    "☠ {n} ☠",
    "☯ {n} ☯",
    "♛ {n} ♛",
    "♕ {n} ♕",
    "♚ {n} ♚",
    "♔ {n} ♔",
    "★ {n} ★",
    "☆ {n} ☆",
    "✘ {n} ✘",
    "✖ {n} ✖",
    "✗ {n} ✗",
    "✦ {n} ✦",
    "✧ {n} ✧",
    "⚡ {n} ⚡",
    "☄ {n} ☄",
    "☢ {n} ☢",
    "☣ {n} ☣",
    "♠ {n} ♠",
    "♣ {n} ♣",
    "♥ {n} ♥",
    "♦ {n} ♦",
    "♤ {n} ♤",
    "♧ {n} ♧",
    "♡ {n} ♡",
    "♢ {n} ♢",
    "『乂 {n} 乂』",
    "『メ {n} メ』",
    "『ツ {n} ツ』",
    "『亗 {n} 亗』",
    "『〆 {n} 〆』",
    "【乂 {n} 乂】",
    "【メ {n} メ】",
    "【ツ {n} ツ】",
    "【亗 {n} 亗】",
    "【〆 {n} 〆】",
    "乂『{n}』乂",
    "メ『{n}』メ",
    "ツ『{n}』ツ",
    "亗『{n}』亗",
    "〆『{n}』〆",
    "乂• {n} •乂",
    "メ• {n} •メ",
    "ツ• {n} •ツ",
    "亗• {n} •亗",
    "〆• {n} •〆"
  ];

  gamingPatterns.forEach((pattern) => {
    addStyle("Gaming", (name) =>
      pattern.replace(/\{n\}/g, name)
    );
  });

  /* ---------------------------------------------------------
     ATTITUDE STYLES
  --------------------------------------------------------- */

  const attitudePatterns = [
    "♛ {n} ♛",
    "♕ {n} ♕",
    "♚ {n} ♚",
    "♔ {n} ♔",
    "👑 {n} 👑",
    "😎 {n} 😎",
    "🔥 {n} 🔥",
    "💀 {n} 💀",
    "⚡ {n} ⚡",
    "💎 {n} 💎",
    "👿 {n} 👿",
    "😈 {n} 😈",
    "☠ {n} ☠",
    "♠ {n} ♠",
    "♦ {n} ♦",
    "♣ {n} ♣",
    "♥ {n} ♥",
    "♛『{n}』♛",
    "♕『{n}』♕",
    "♚『{n}』♚",
    "♔『{n}』♔",
    "👑『{n}』👑",
    "😎『{n}』😎",
    "🔥『{n}』🔥",
    "💀『{n}』💀",
    "⚡『{n}』⚡",
    "💎『{n}』💎",
    "👿『{n}』👿",
    "😈『{n}』😈",
    "♛【{n}】♛",
    "♕【{n}】♕",
    "♚【{n}】♚",
    "♔【{n}】♔",
    "👑【{n}】👑",
    "😎【{n}】😎",
    "🔥【{n}】🔥",
    "💀【{n}】💀",
    "⚡【{n}】⚡",
    "💎【{n}】💎",
    "👿【{n}】👿",
    "😈【{n}】😈"
  ];

  attitudePatterns.forEach((pattern) => {
    addStyle("Attitude", (name) =>
      pattern.replace(/\{n\}/g, name)
    );
  });

  /* ---------------------------------------------------------
     SYMBOL STYLES
  --------------------------------------------------------- */

  const symbolPatterns = [
    "♡ {n} ♡",
    "♥ {n} ♥",
    "❥ {n} ❥",
    "ღ {n} ღ",
    "❣ {n} ❣",
    "✿ {n} ✿",
    "❀ {n} ❀",
    "❁ {n} ❁",
    "🌸 {n} 🌸",
    "🌺 {n} 🌺",
    "🌹 {n} 🌹",
    "🌷 {n} 🌷",
    "🌻 {n} 🌻",
    "☀ {n} ☀",
    "☾ {n} ☽",
    "☽ {n} ☾",
    "☁ {n} ☁",
    "☘ {n} ☘",
    "♧ {n} ♧",
    "⚜ {n} ⚜",
    "✥ {n} ✥",
    "✤ {n} ✤",
    "✣ {n} ✣",
    "❋ {n} ❋",
    "❊ {n} ❊",
    "❖ {n} ❖",
    "◇ {n} ◇",
    "◆ {n} ◆",
    "◈ {n} ◈",
    "◉ {n} ◉",
    "◎ {n} ◎",
    "○ {n} ○",
    "● {n} ●",
    "◌ {n} ◌",
    "◍ {n} ◍",
    "◐ {n} ◑",
    "☯ {n} ☯",
    "☮ {n} ☮",
    "☪ {n} ☪",
    "☀︎ {n} ☀︎",
    "☾ {n} ☾",
    "✈ {n} ✈",
    "☕ {n} ☕",
    "🎯 {n} 🎯",
    "🎮 {n} 🎮",
    "🎵 {n} 🎵",
    "🎧 {n} 🎧",
    "🎸 {n} 🎸",
    "🌟 {n} 🌟",
    "✨ {n} ✨",
    "💫 {n} 💫",
    "⭐ {n} ⭐",
    "🌙 {n} 🌙",
    "🌈 {n} 🌈",
    "🍀 {n} 🍀",
    "🦋 {n} 🦋",
    "🐉 {n} 🐉",
    "🪽 {n} 🪽",
    "☄ {n} ☄"
  ];

  symbolPatterns.forEach((pattern) => {
    addStyle("Symbols", (name) =>
      pattern.replace(/\{n\}/g, name)
    );
  });

  /* ---------------------------------------------------------
     TEXT / CASE STYLES
     
     These use normal Latin characters only.
     This avoids the broken � problem.
  --------------------------------------------------------- */

  addStyle("Fancy", (name) => name.toUpperCase());
  addStyle("Fancy", (name) => name.toLowerCase());

  addStyle("Fancy", (name) =>
    name
      .split("")
      .map((char, i) =>
        i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("")
  );

  addStyle("Fancy", (name) =>
    name
      .split("")
      .map((char, i) =>
        i % 2 !== 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" • ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" · ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join("  ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" | ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" / ")
  );

  addStyle("Fancy", (name) =>
    name.split("").join(" •")
  );

  addStyle("Fancy", (name) =>
    name.split("").join("~")
  );

  /* ---------------------------------------------------------
     MORE FANCY COMBINATIONS
  --------------------------------------------------------- */

  const leftRight = [
    ["✦", "✦"],
    ["✧", "✧"],
    ["★", "★"],
    ["☆", "☆"],
    ["✪", "✪"],
    ["✯", "✯"],
    ["❖", "❖"],
    ["◆", "◆"],
    ["◇", "◇"],
    ["❀", "❀"],
    ["✿", "✿"],
    ["❁", "❁"],
    ["✥", "✥"],
    ["✤", "✤"],
    ["✣", "✣"],
    ["❋", "❋"],
    ["❊", "❊"],
    ["☘", "☘"],
    ["☾", "☽"],
    ["♡", "♡"],
    ["♥", "♥"],
    ["ღ", "ღ"],
    ["⚜", "⚜"],
    ["⚡", "⚡"],
    ["♛", "♛"],
    ["♕", "♕"],
    ["♚", "♚"],
    ["♔", "♔"],
    ["♠", "♠"],
    ["♣", "♣"],
    ["♦", "♦"],
    ["♤", "♧"],
    ["🌸", "🌸"],
    ["🌹", "🌹"],
    ["🌺", "🌺"],
    ["🌟", "🌟"],
    ["✨", "✨"],
    ["💫", "💫"],
    ["⭐", "⭐"],
    ["🍀", "🍀"],
    ["🦋", "🦋"]
  ];

  leftRight.forEach(([left, right]) => {
    addStyle("Symbols", (name) => `${left} ${name} ${right}`);
    addStyle("Fancy", (name) => `${left}・${name}・${right}`);
    addStyle("Fancy", (name) => `${left} | ${name} | ${right}`);
  });

  /* ---------------------------------------------------------
     MAKE SURE WE HAVE 220+ STYLES
     
     Extra safe combinations are generated automatically.
  --------------------------------------------------------- */

  const safeDecorations = [
    ["✦", "✦"],
    ["✧", "✧"],
    ["★", "★"],
    ["☆", "☆"],
    ["❖", "❖"],
    ["◆", "◆"],
    ["◇", "◇"],
    ["✿", "✿"],
    ["❀", "❀"],
    ["❁", "❁"],
    ["♡", "♡"],
    ["♥", "♥"],
    ["ღ", "ღ"],
    ["⚡", "⚡"],
    ["♛", "♛"],
    ["♕", "♕"],
    ["♚", "♚"],
    ["♔", "♔"],
    ["♠", "♠"],
    ["♣", "♣"],
    ["♦", "♦"],
    ["☘", "☘"],
    ["☾", "☽"],
    ["☀", "☀"],
    ["☯", "☯"],
    ["⚜", "⚜"],
    ["✥", "✥"],
    ["✤", "✤"],
    ["✣", "✣"],
    ["❋", "❋"],
    ["❊", "❊"],
    ["⋆", "⋆"],
    ["✶", "✶"],
    ["✷", "✷"],
    ["✸", "✸"],
    ["✹", "✹"],
    ["✺", "✺"],
    ["✻", "✻"],
    ["✼", "✼"],
    ["✽", "✽"],
    ["✾", "✾"]
  ];

  const separators = [
    " ",
    " • ",
    " · ",
    " | ",
    " / ",
    " ~ ",
    " — ",
    " – ",
    "・",
    "━",
    "彡",
    "々"
  ];

  let combinationIndex = 0;

  while (styles.length < 240) {
    const decoration =
      safeDecorations[
        combinationIndex % safeDecorations.length
      ];

    const separator =
      separators[
        Math.floor(
          combinationIndex / safeDecorations.length
        ) % separators.length
      ];

    const variant =
      combinationIndex % 4;

    addStyle(
      variant === 0
        ? "Fancy"
        : variant === 1
        ? "Gaming"
        : variant === 2
        ? "Attitude"
        : "Symbols",
      (name) => {
        const [left, right] = decoration;

        if (variant === 0) {
          return `${left}${separator}${name}${separator}${right}`;
        }

        if (variant === 1) {
          return `『${left}${separator}${name}${separator}${right}』`;
        }

        if (variant === 2) {
          return `【${left}${separator}${name}${separator}${right}】`;
        }

        return `${left}${separator}${name}${separator}${right}`;
      }
    );

    combinationIndex++;
  }

  /* ---------------------------------------------------------
     REMOVE DUPLICATES
  --------------------------------------------------------- */

  function getUniqueStyles(name) {
    const seen = new Set();
    const output = [];

    for (const style of styles) {
      const value = cleanName(style.transform(name));

      if (!value) continue;

      if (!seen.has(value)) {
        seen.add(value);

        output.push({
          ...style,
          value
        });
      }
    }

    return output;
  }

  /* ---------------------------------------------------------
     CARD CREATION
     
     IMPORTANT:
     There is NO:
       A
       Bold Fancy
       Gaming
       Fancy
       Category
     
     Only:
       stylish name
       Copy button
  --------------------------------------------------------- */

  function createCard(style) {
    const card = document.createElement("article");

    card.className = "style-card";
    card.dataset.category = style.category;
    card.dataset.styleId = style.id;

    card.innerHTML = `
      <div class="style-output">${escapeHTML(style.value)}</div>

      <button
        type="button"
        class="copy-btn"
        data-copy="${escapeHTML(style.value)}"
        aria-label="Copy stylish name"
      >
        <span class="copy-icon">📋</span>
        <span class="copy-text">Copy</span>
      </button>
    `;

    return card;
  }

  /* ---------------------------------------------------------
     RENDER RESULTS
  --------------------------------------------------------- */

  let currentName = "";
  let currentStyles = [];
  let activeCategory = "All";

  function renderResults(name, category = "All") {
    const container = findResultsContainer();

    if (!container) {
      console.warn(
        "Z-Name: Results container not found."
      );
      return;
    }

    currentName = cleanName(name);
    activeCategory = category;

    if (!currentName) {
      container.innerHTML = "";
      return;
    }

    const allStyles = getUniqueStyles(currentName);

    currentStyles =
      category === "All"
        ? allStyles
        : allStyles.filter(
            (style) => style.category === category
          );

    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    currentStyles.forEach((style) => {
      fragment.appendChild(createCard(style));
    });

    container.appendChild(fragment);

    /* Helpful classes for CSS */
    container.classList.add("styles-generated");
    container.dataset.count = String(currentStyles.length);

    /*
      Re-trigger animation.
    */
    requestAnimationFrame(() => {
      $$(".style-card", container).forEach((card, index) => {
        card.style.animationDelay = `${Math.min(
          index * 20,
          500
        )}ms`;
      });
    });
  }

  /* ---------------------------------------------------------
     UPDATE LIVE PREVIEW
  --------------------------------------------------------- */

  function updatePreview(name) {
    const preview = findPreview();

    if (!preview) return;

    preview.textContent = cleanName(name);
  }

  /* ---------------------------------------------------------
     COPY FUNCTION
  --------------------------------------------------------- */

  async function copyText(text, button) {
    const value = String(text || "");

    if (!value) return;

    let success = false;

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(value);
        success = true;
      }
    } catch (error) {
      success = false;
    }

    /* Fallback for older Android browsers */
    if (!success) {
      try {
        const textarea =
          document.createElement("textarea");

        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(
          0,
          textarea.value.length
        );

        success = document.execCommand("copy");

        textarea.remove();
      } catch (error) {
        success = false;
      }
    }

    if (button) {
      const copyTextElement = $(
        ".copy-text",
        button
      );

      const icon = $(
        ".copy-icon",
        button
      );

      if (success) {
        if (copyTextElement) {
          copyTextElement.textContent = "Copied!";
        }

        if (icon) {
          icon.textContent = "✓";
        }

        button.classList.add("copied");

        setTimeout(() => {
          if (copyTextElement) {
            copyTextElement.textContent = "Copy";
          }

          if (icon) {
            icon.textContent = "📋";
          }

          button.classList.remove("copied");
        }, 1400);
      } else {
        if (copyTextElement) {
          copyTextElement.textContent = "Copy failed";
        }

        setTimeout(() => {
          if (copyTextElement) {
            copyTextElement.textContent = "Copy";
          }
        }, 1400);
      }
    }
  }

  /* ---------------------------------------------------------
     EVENT DELEGATION FOR COPY BUTTONS
  --------------------------------------------------------- */

  document.addEventListener("click", (event) => {
    const button =
      event.target.closest(".copy-btn");

    if (!button) return;

    const value =
      button.dataset.copy ||
      $(".style-output", button.parentElement)
        ?.textContent ||
      "";

    copyText(value, button);
  });

  /* ---------------------------------------------------------
     GENERATE
  --------------------------------------------------------- */

  function generate() {
    const input = findNameInput();

    if (!input) {
      console.warn(
        "Z-Name: Name input not found."
      );
      return;
    }

    const name = cleanName(input.value);

    if (!name) {
      input.focus();

      renderResults("", "All");
      updatePreview("");

      return;
    }

    updatePreview(name);
    renderResults(name, activeCategory);

    /* Smooth scroll only when button is intentionally used */
    const results = findResultsContainer();

    if (results) {
      setTimeout(() => {
        results.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 120);
    }
  }

  /* ---------------------------------------------------------
     INPUT LIVE PREVIEW
  --------------------------------------------------------- */

  document.addEventListener("input", (event) => {
    const input = findNameInput();

    if (!input) return;

    if (event.target !== input) return;

    const name = cleanName(input.value);

    updatePreview(name);
  });

  /* ---------------------------------------------------------
     GENERATE BUTTON
  --------------------------------------------------------- */

  document.addEventListener("click", (event) => {
    const button = event.target.closest(
      ".generate-btn, .generate-button, #generateBtn, #generate-btn, #generateButton"
    );

    if (!button) return;

    event.preventDefault();

    generate();
  });

  /* ---------------------------------------------------------
     FORM SUBMIT
  --------------------------------------------------------- */

  document.addEventListener("submit", (event) => {
    const form = event.target;

    if (!form) return;

    const input = findNameInput();

    if (!input) return;

    if (!form.contains(input)) return;

    event.preventDefault();

    generate();
  });

  /* ---------------------------------------------------------
     ENTER KEY
  --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const input = findNameInput();

    if (!input) return;

    if (document.activeElement !== input) return;

    event.preventDefault();

    generate();
  });

  /* ---------------------------------------------------------
     FILTER BUTTONS
     
     Text is used only to detect category.
     Category is NOT displayed on cards.
  --------------------------------------------------------- */

  function getCategoryFromButton(button) {
    if (button.dataset.category) {
      return button.dataset.category;
    }

    const text = cleanName(button.textContent);

    if (!text) return "All";

    const lower = text.toLowerCase();

    if (lower === "all") return "All";
    if (lower.includes("fancy")) return "Fancy";
    if (lower.includes("gaming")) return "Gaming";
    if (lower.includes("attitude")) return "Attitude";
    if (lower.includes("symbol")) return "Symbols";

    return "All";
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(
      ".filter-btn, .category-btn, .filter-button, [data-category]"
    );

    if (!button) return;

    /*
      Don't treat result cards as filters.
    */
    if (button.closest(".style-card")) {
      return;
    }

    const category =
      getCategoryFromButton(button);

    const input = findNameInput();

    if (!input) return;

    const name = cleanName(input.value);

    if (!name) return;

    $$(".filter-btn, .category-btn, .filter-button")
      .forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("aria-selected");
      });

    button.classList.add("active");
    button.setAttribute(
      "aria-selected",
      "true"
    );

    activeCategory = category;

    renderResults(name, category);
  });

  /* ---------------------------------------------------------
     MOBILE MENU
     
     Works with common menu selectors.
  --------------------------------------------------------- */

  function setupMobileMenu() {
    const menuButton =
      $("#menuBtn") ||
      $("#menu-btn") ||
      $(".menu-btn") ||
      $(".menu-toggle") ||
      $(".hamburger") ||
      $('[aria-label*="menu" i]');

    const mobileMenu =
      $("#mobileMenu") ||
      $("#mobile-menu") ||
      $(".mobile-menu") ||
      $(".nav-menu");

    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.addEventListener("click", () => {
      const isOpen =
        mobileMenu.classList.toggle("open");

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );
    });

    mobileMenu.addEventListener(
      "click",
      (event) => {
        const link =
          event.target.closest("a");

        if (!link) return;

        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );
      }
    );
  }

  /* ---------------------------------------------------------
     CLEAR INPUT BUTTON
  --------------------------------------------------------- */

  document.addEventListener("click", (event) => {
    const button = event.target.closest(
      ".clear-btn, .clear-input, [data-clear-input]"
    );

    if (!button) return;

    const input = findNameInput();

    if (!input) return;

    input.value = "";

    updatePreview("");

    const results = findResultsContainer();

    if (results) {
      results.innerHTML = "";
    }

    input.focus();
  });

  /* ---------------------------------------------------------
     INITIALIZATION
  --------------------------------------------------------- */

  function init() {
    setupMobileMenu();

    const input = findNameInput();

    if (input && input.value.trim()) {
      const name = cleanName(input.value);

      updatePreview(name);
      renderResults(name, "All");
    }

    /*
      Make sure filters have the correct active state.
    */
    const firstFilter =
      $(".filter-btn.active") ||
      $(".category-btn.active") ||
      $(".filter-button.active");

    if (firstFilter) {
      firstFilter.setAttribute(
        "aria-selected",
        "true"
      );
    }

    console.log(
      `Z-Name Style loaded: ${styles.length}+ styles available.`
    );
  }

  /* ---------------------------------------------------------
     START
  --------------------------------------------------------- */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
