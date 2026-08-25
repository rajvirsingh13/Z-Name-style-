document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =========================================================
       Z-NAME STYLE
       SCRIPT.JS
       PART 1 — CORE SETUP + NAME STYLES
       ========================================================= */


    /* =========================================================
       DOM ELEMENTS
       ========================================================= */

    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const clearName = document.getElementById("clearName");
    const generateButton = document.getElementById("generateButton");

    const previewSection =
        document.getElementById("previewSection");

    const previewName =
        document.getElementById("previewName");

    const resultsSection =
        document.getElementById("resultsSection");

    const resultsContainer =
        document.getElementById("resultsContainer");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const styleFilters =
        document.getElementById("styleFilters");

    const symbolsGrid =
        document.getElementById("symbolsGrid");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const bottomMenuButton =
        document.getElementById("bottomMenuButton");


    /* =========================================================
       APPLICATION STATE
       ========================================================= */

    let currentName = "";
    let currentFilter = "all";
    let toastTimer = null;


    /* =========================================================
       NAME CLEANING
       ========================================================= */

    function cleanName(value) {

        return String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 30);

    }


    /* =========================================================
       HTML ESCAPE
       ========================================================= */

    function escapeHTML(value) {

        const element =
            document.createElement("div");

        element.textContent = value;

        return element.innerHTML;

    }


    /* =========================================================
       UNICODE FANCY FONT — SCRIPT
       ========================================================= */

    const scriptUpper = [
        "𝒜","ℬ","𝒞","𝒟","ℰ","ℱ","𝒢","ℋ","ℐ","𝒥",
        "𝒦","ℒ","ℳ","𝒩","𝒪","𝒫","𝒬","ℛ","𝒮","𝒯",
        "𝒰","𝒱","𝒲","𝒳","𝒴","𝒵"
    ];

    const scriptLower = [
        "𝒶","𝒷","𝒸","𝒹","ℯ","𝒻","ℊ","𝒽","𝒾","𝒿",
        "𝓀","𝓁","𝓂","𝓃","ℴ","𝓅","𝓆","𝓇","𝓈","𝓉",
        "𝓊","𝓋","𝓌","𝓍","𝓎","𝓏"
    ];


    function toScript(text) {

        return text
            .split("")
            .map(function (character) {

                const code =
                    character.charCodeAt(0);

                if (
                    code >= 65 &&
                    code <= 90
                ) {

                    return scriptUpper[code - 65];

                }

                if (
                    code >= 97 &&
                    code <= 122
                ) {

                    return scriptLower[code - 97];

                }

                return character;

            })
            .join("");

    }


    /* =========================================================
       UNICODE FANCY FONT — MATHEMATICAL SCRIPT
       ========================================================= */

    const fancyUpper = [
        "𝓐","𝓑","𝓒","𝓓","𝓔","𝓕","𝓖","𝓗","𝓘","𝓙",
        "𝓚","𝓛","𝓜","𝓝","𝓞","𝓟","𝓠","𝓡","𝓢","𝓣",
        "𝓤","𝓥","𝓦","𝓧","𝓨","𝓩"
    ];

    const fancyLower = [
        "𝓪","𝓫","𝓬","𝓭","𝓮","𝓯","𝓰","𝓱","𝓲","𝓳",
        "𝓴","𝓵","𝓶","𝓷","𝓸","𝓹","𝓺","𝓻","𝓼","𝓽",
        "𝓾","𝓿","𝔀","𝔁","𝔂","𝔃"
    ];


    function toFancy(text) {

        return text
            .split("")
            .map(function (character) {

                const code =
                    character.charCodeAt(0);

                if (
                    code >= 65 &&
                    code <= 90
                ) {

                    return fancyUpper[code - 65];

                }

                if (
                    code >= 97 &&
                    code <= 122
                ) {

                    return fancyLower[code - 97];

                }

                return character;

            })
            .join("");

    }


    /* =========================================================
       BOLD FONT
       ========================================================= */

    const boldUpper = [
        "𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉",
        "𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐐","𝐑","𝐒","𝐓",
        "𝐔","𝐕","𝐖","𝐗","𝐘","𝐙"
    ];

    const boldLower = [
        "𝐚","𝐛","𝐜","𝐝","𝐞","𝐟","𝐠","𝐡","𝐢","𝐣",
        "𝐤","𝐥","𝐦","𝐧","𝐨","𝐩","𝐪","𝐫","𝐬","𝐭",
        "𝐮","𝐯","𝐰","𝐱","𝐲","𝐳"
    ];


    function toBold(text) {

        return text
            .split("")
            .map(function (character) {

                const code =
                    character.charCodeAt(0);

                if (
                    code >= 65 &&
                    code <= 90
                ) {

                    return boldUpper[code - 65];

                }

                if (
                    code >= 97 &&
                    code <= 122
                ) {

                    return boldLower[code - 97];

                }

                return character;

            })
            .join("");

    }


    /* =========================================================
       MONOSPACE FONT
       ========================================================= */

    const monoUpper = [
        "𝙰","𝙱","𝙲","𝙳","𝙴","𝙵","𝙶","𝙷","𝙸","𝙹",
        "𝙺","𝙻","𝙼","𝙽","𝙾","𝙿","𝚀","𝚁","𝚂","𝚃",
        "𝚄","𝚅","𝚆","𝚇","𝚈","𝚉"
    ];

    const monoLower = [
        "𝚊","𝚋","𝚌","𝚍","𝚎","𝚏","𝚐","𝚑","𝚒","𝚓",
        "𝚔","𝚕","𝚖","𝚗","𝚘","𝚙","𝚚","𝚛","𝚜","𝚝",
        "𝚞","𝚟","𝚠","𝚡","𝚢","𝚣"
    ];


    function toMono(text) {

        return text
            .split("")
            .map(function (character) {

                const code =
                    character.charCodeAt(0);

                if (
                    code >= 65 &&
                    code <= 90
                ) {

                    return monoUpper[code - 65];

                }

                if (
                    code >= 97 &&
                    code <= 122
                ) {

                    return monoLower[code - 97];

                }

                return character;

            })
            .join("");

    }


    /* =========================================================
       SMALL CAPS
       ========================================================= */

    const smallCapsMap = {

        a: "ᴀ",
        b: "ʙ",
        c: "ᴄ",
        d: "ᴅ",
        e: "ᴇ",
        f: "ғ",
        g: "ɢ",
        h: "ʜ",
        i: "ɪ",
        j: "ᴊ",
        k: "ᴋ",
        l: "ʟ",
        m: "ᴍ",
        n: "ɴ",
        o: "ᴏ",
        p: "ᴘ",
        q: "ǫ",
        r: "ʀ",
        s: "s",
        t: "ᴛ",
        u: "ᴜ",
        v: "ᴠ",
        w: "ᴡ",
        x: "x",
        y: "ʏ",
        z: "ᴢ"

    };


    function toSmallCaps(text) {

        return text
            .toLowerCase()
            .split("")
            .map(function (character) {

                return (
                    smallCapsMap[character] ||
                    character
                );

            })
            .join("");

    }


    /* =========================================================
       STYLE TEMPLATE BUILDER
       ========================================================= */

    function buildStyles(name) {

        return [

            {
                category: "fancy",
                title: "Fancy Script",
                value: toFancy(name)
            },

            {
                category: "fancy",
                title: "Elegant",
                value: toScript(name)
            },

            {
                category: "fancy",
                title: "Bold",
                value: toBold(name)
            },

            {
                category: "fancy",
                title: "Monospace",
                value: toMono(name)
            },

            {
                category: "fancy",
                title: "Small Caps",
                value: toSmallCaps(name)
            },

            {
                category: "gaming",
                title: "Gaming Pro",
                value: "亗 " + name + " 亗"
            },

            {
                category: "gaming",
                title: "Warrior",
                value: "乂 " + name + " 乂"
            },

            {
                category: "gaming",
                title: "Elite",
                value: "『" + name + "』"
            },

            {
                category: "gaming",
                title: "Pro Player",
                value: "〆 " + name + " 〆"
            },

            {
                category: "attitude",
                title: "Attitude",
                value: "★彡 " + name + " 彡★"
            },

            {
                category: "attitude",
                title: "Savage",
                value: "么 " + name + " 么"
            },

            {
                category: "attitude",
                title: "Boss",
                value: "⚡ " + name + " ⚡"
            },

            {
                category: "attitude",
                title: "Danger",
                value: "☠ " + name + " ☠"
            },

            {
                category: "royal",
                title: "Royal King",
                value: "♛ " + name + " ♛"
            },

            {
                category: "royal",
                title: "Royal Queen",
                value: "♕ " + name + " ♕"
            },

            {
                category: "love",
                title: "Love",
                value: "♡ " + name + " ♡"
            },

            {
                category: "love",
                title: "Heart",
                value: "♥ " + name + " ♥"
            },

            {
                category: "cool",
                title: "Cool",
                value: "ツ " + name + " ツ"
            },

            {
                category: "cool",
                title: "Electric",
                value: "⚡ " + name + " ⚡"
            },

            {
                category: "dark",
                title: "Dark Soul",
                value: "☾ " + name + " ☽"
            },

            {
                category: "dark",
                title: "Dark",
                value: "☠ " + name + " ☠"
            },

            {
                category: "symbols",
                title: "Decorated",
                value: "꧁༺ " + name + " ༻꧂"
            },

            {
                category: "symbols",
                title: "Star",
                value: "★ " + name + " ★"
            },

            {
                category: "symbols",
                title: "Symbol",
                value: "彡 " + name + " 彡"
            },

            {
                category: "symbols",
                title: "Classic",
                value: "『 " + name + " 』"
            }

        ];

    }


    /* =========================================================
       INPUT LIVE PREVIEW
       ========================================================= */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                currentName =
                    cleanName(nameInput.value);

                if (clearName) {

                    clearName.hidden =
                        currentName.length === 0;

                }

                if (
                    previewName &&
                    currentName.length > 0
                ) {

                    previewName.textContent =
                        currentName;

                }

            }
        );

    }


    /* =========================================================
       CLEAR BUTTON
       ========================================================= */

    if (clearName) {

        clearName.addEventListener(
            "click",
            function () {

                if (nameInput) {
                    nameInput.value = "";
                    nameInput.focus();
                }

                currentName = "";

                clearName.hidden = true;

                if (previewName) {
                    previewName.textContent =
                        "Your Name";
                }

            }
        );

    }


    /* =========================================================
       TOAST FUNCTION
       ========================================================= */

    function showToast(message) {

        if (!toast) {
            return;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(
            function () {

                toast.classList.remove("show");

            },
            1800
        );

    }


    /* =========================================================
       COPY FUNCTION
       ========================================================= */

    function copyText(text) {

        if (!text) {
            return;
        }

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(text)
                .then(function () {

                    showToast("Copied!");

                })
                .catch(function () {

                    fallbackCopy(text);

                });

        } else {

            fallbackCopy(text);

        }

    }


    function fallbackCopy(text) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {

            document.execCommand("copy");

            showToast("Copied!");

        } catch (error) {

            showToast("Copy failed");

        }

        document.body.removeChild(textarea);

    }


    /* =========================================================
       PART 1 END
       ========================================================= */

});
document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =========================================================
       Z-NAME STYLE
       SCRIPT.JS
       PART 2 — GENERATOR + RESULTS + FILTERS
       ========================================================= */


    /* =========================================================
       DOM ELEMENTS
       ========================================================= */

    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");

    const previewSection =
        document.getElementById("previewSection");

    const previewName =
        document.getElementById("previewName");

    const resultsSection =
        document.getElementById("resultsSection");

    const resultsContainer =
        document.getElementById("resultsContainer");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const styleFilters =
        document.getElementById("styleFilters");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =========================================================
       STATE
       ========================================================= */

    let generatedName = "";
    let activeFilter = "all";


    /* =========================================================
       CLEAN NAME
       ========================================================= */

    function getName() {

        if (!nameInput) {
            return "";
        }

        return nameInput.value
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 30);

    }


    /* =========================================================
       ESCAPE HTML
       ========================================================= */

    function safeHTML(value) {

        const element =
            document.createElement("div");

        element.textContent = value;

        return element.innerHTML;

    }


    /* =========================================================
       TOAST
       ========================================================= */

    function notify(message) {

        if (!toast) {
            return;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 1800);

    }


    /* =========================================================
       COPY
       ========================================================= */

    function copyName(text) {

        if (!text) {
            return;
        }

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(text)
                .then(function () {

                    notify("Copied!");

                })
                .catch(function () {

                    oldCopy(text);

                });

        } else {

            oldCopy(text);

        }

    }


    function oldCopy(text) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {

            document.execCommand("copy");

            notify("Copied!");

        } catch (error) {

            notify("Copy failed");

        }

        document.body.removeChild(textarea);

    }


    /* =========================================================
       CREATE ALL RESULTS
       ========================================================= */

    function createResults(name) {

        return [

            {
                category: "fancy",
                title: "Fancy Script",
                value: toFancy(name)
            },

            {
                category: "fancy",
                title: "Elegant",
                value: toScript(name)
            },

            {
                category: "fancy",
                title: "Bold",
                value: toBold(name)
            },

            {
                category: "fancy",
                title: "Monospace",
                value: toMono(name)
            },

            {
                category: "fancy",
                title: "Small Caps",
                value: toSmallCaps(name)
            },

            {
                category: "gaming",
                title: "Gaming Pro",
                value: "亗 " + name + " 亗"
            },

            {
                category: "gaming",
                title: "Warrior",
                value: "乂 " + name + " 乂"
            },

            {
                category: "gaming",
                title: "Elite",
                value: "『" + name + "』"
            },

            {
                category: "gaming",
                title: "Pro Player",
                value: "〆 " + name + " 〆"
            },

            {
                category: "attitude",
                title: "Attitude",
                value: "★彡 " + name + " 彡★"
            },

            {
                category: "attitude",
                title: "Savage",
                value: "么 " + name + " 么"
            },

            {
                category: "attitude",
                title: "Boss",
                value: "⚡ " + name + " ⚡"
            },

            {
                category: "attitude",
                title: "Danger",
                value: "☠ " + name + " ☠"
            },

            {
                category: "royal",
                title: "Royal King",
                value: "♛ " + name + " ♛"
            },

            {
                category: "royal",
                title: "Royal Queen",
                value: "♕ " + name + " ♕"
            },

            {
                category: "love",
                title: "Love",
                value: "♡ " + name + " ♡"
            },

            {
                category: "love",
                title: "Heart",
                value: "♥ " + name + " ♥"
            },

            {
                category: "cool",
                title: "Cool",
                value: "ツ " + name + " ツ"
            },

            {
                category: "cool",
                title: "Electric",
                value: "⚡ " + name + " ⚡"
            },

            {
                category: "dark",
                title: "Dark Soul",
                value: "☾ " + name + " ☽"
            },

            {
                category: "dark",
                title: "Dark",
                value: "☠ " + name + " ☠"
            },

            {
                category: "symbols",
                title: "Decorated",
                value: "꧁༺ " + name + " ༻꧂"
            },

            {
                category: "symbols",
                title: "Star",
                value: "★ " + name + " ★"
            },

            {
                category: "symbols",
                title: "Symbol",
                value: "彡 " + name + " 彡"
            },

            {
                category: "symbols",
                title: "Classic",
                value: "『 " + name + " 』"
            }

        ];

    }


    /* =========================================================
       RENDER RESULTS
       ========================================================= */

    function renderResults() {

        if (!resultsContainer) {
            return;
        }

        if (!generatedName) {
            return;
        }

        let results =
            createResults(generatedName);

        if (activeFilter !== "all") {

            results =
                results.filter(function (item) {

                    return (
                        item.category ===
                        activeFilter
                    );

                });

        }

        resultsContainer.innerHTML = "";


        /* =====================================================
           NO RESULTS
           ===================================================== */

        if (results.length === 0) {

            resultsContainer.innerHTML = `
                <div class="result-card">
                    <div class="result-name">
                        No styles found.
                    </div>
                </div>
            `;

            return;

        }


        /* =====================================================
           CREATE RESULT CARDS
           ===================================================== */

        results.forEach(function (item) {

            const card =
                document.createElement("div");

            card.className = "result-card";

            card.innerHTML = `
                <div class="result-card-top">

                    <span class="result-category">
                        ${safeHTML(
                            item.category
                        )}
                    </span>

                    <span class="result-style">
                        ${safeHTML(
                            item.title
                        )}
                    </span>

                </div>

                <div class="result-name">
                    ${safeHTML(
                        item.value
                    )}
                </div>

                <button
                    type="button"
                    class="copy-result-button"
                >
                    📋 Copy
                </button>
            `;


            const copyButton =
                card.querySelector(
                    ".copy-result-button"
                );


            if (copyButton) {

                copyButton.addEventListener(
                    "click",
                    function () {

                        copyName(item.value);

                    }
                );

            }


            resultsContainer.appendChild(card);

        });


        /* =====================================================
           SHOW RESULTS
           ===================================================== */

        if (resultsSection) {

            resultsSection.hidden = false;

        }


        /* =====================================================
           RESULTS TITLE
           ===================================================== */

        if (resultsTitle) {

            if (activeFilter === "all") {

                resultsTitle.textContent =
                    "Stylish Names for " +
                    generatedName;

            } else {

                const firstLetter =
                    activeFilter
                        .charAt(0)
                        .toUpperCase();

                const rest =
                    activeFilter.slice(1);

                resultsTitle.textContent =
                    firstLetter +
                    rest +
                    " Names for " +
                    generatedName;

            }

        }

    }


    /* =========================================================
       GENERATE BUTTON / FORM
       ========================================================= */

    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const value = getName();


                /* =============================================
                   EMPTY INPUT
                   ============================================= */

                if (!value) {

                    if (nameInput) {
                        nameInput.focus();
                    }

                    notify(
                        "Please enter your name"
                    );

                    return;

                }


                /* =============================================
                   SAVE NAME
                   ============================================= */

                generatedName = value;

                activeFilter = "all";


                /* =============================================
                   PREVIEW
                   ============================================= */

                if (previewSection) {

                    previewSection.hidden =
                        false;

                }


                if (previewName) {

                    previewName.textContent =
                        generatedName;

                }


                /* =============================================
                   RESET FILTER BUTTON
                   ============================================= */

                if (styleFilters) {

                    const buttons =
                        styleFilters.querySelectorAll(
                            ".filter-button"
                        );

                    buttons.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );

                            if (
                                button.dataset.filter ===
                                "all"
                            ) {

                                button.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }


                /* =============================================
                   GENERATE RESULTS
                   ============================================= */

                renderResults();

            }
        );

    }


    /* =========================================================
       FILTER BUTTONS
       ========================================================= */

    if (styleFilters) {

        const filterButtons =
            styleFilters.querySelectorAll(
                ".filter-button"
            );


        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const filter =
                            button.dataset.filter ||
                            "all";


                        activeFilter =
                            filter;


                        filterButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        if (generatedName) {

                            renderResults();

                        }

                    }
                );

            }
        );

    }


    /* =========================================================
       CATEGORY CARDS
       ========================================================= */

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card.dataset.category;


                    if (!category) {
                        return;
                    }


                    const value =
                        getName();


                    if (!value) {

                        if (nameInput) {
                            nameInput.focus();
                        }

                        notify(
                            "Enter your name first"
                        );

                        return;

                    }


                    generatedName =
                        value;

                    activeFilter =
                        category;


                    if (previewSection) {

                        previewSection.hidden =
                            false;

                    }


                    if (previewName) {

                        previewName.textContent =
                            generatedName;

                    }


                    renderResults();


                    /* =========================================
                       UPDATE FILTER BUTTON
                       ========================================= */

                    if (styleFilters) {

                        styleFilters
                            .querySelectorAll(
                                ".filter-button"
                            )
                            .forEach(
                                function (button) {

                                    button.classList.remove(
                                        "active"
                                    );

                                    if (
                                        button.dataset.filter ===
                                        category
                                    ) {

                                        button.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                    }

                }
            );

        }
    );


    /* =========================================================
       SMOOTH SCROLL AFTER GENERATION
       ========================================================= */

    function scrollToResults() {

        if (!resultsSection) {
            return;
        }

        setTimeout(
            function () {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            120
        );

    }


    /* =========================================================
       REPLACE RENDER FUNCTION WITH SCROLL
       ========================================================= */

    const originalRenderResults =
        renderResults;


    /* =========================================================
       GENERATION OBSERVER
       ========================================================= */

    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            function () {

                if (generatedName) {

                    scrollToResults();

                }

            }
        );

    }


    /* =========================================================
       PART 2 END
       ========================================================= */

});
/* =========================================================
   Z-NAME STYLE
   SCRIPT.JS
   PART 3 — FINAL FUNCTIONS + SYMBOLS + TRENDING + MENU
   ========================================================= */


/* =========================================================
   FANCY FONT FUNCTIONS
   These are global so Part 2 can use them.
   ========================================================= */

const zScriptUpper = [
    "𝒜","ℬ","𝒞","𝒟","ℰ","ℱ","𝒢","ℋ","ℐ","𝒥",
    "𝒦","ℒ","ℳ","𝒩","𝒪","𝒫","𝒬","ℛ","𝒮","𝒯",
    "𝒰","𝒱","𝒲","𝒳","𝒴","𝒵"
];

const zScriptLower = [
    "𝒶","𝒷","𝒸","𝒹","ℯ","𝒻","ℊ","𝒽","𝒾","𝒿",
    "𝓀","𝓁","𝓂","𝓃","ℴ","𝓅","𝓆","𝓇","𝓈","𝓉",
    "𝓊","𝓋","𝓌","𝓍","𝓎","𝓏"
];


function toScript(text) {

    return text.split("").map(function (character) {

        const code = character.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return zScriptUpper[code - 65];
        }

        if (code >= 97 && code <= 122) {
            return zScriptLower[code - 97];
        }

        return character;

    }).join("");

}


/* =========================================================
   FANCY
   ========================================================= */

const zFancyUpper = [
    "𝓐","𝓑","𝓒","𝓓","𝓔","𝓕","𝓖","𝓗","𝓘","𝓙",
    "𝓚","𝓛","𝓜","𝓝","𝓞","𝓟","𝓠","𝓡","𝓢","𝓣",
    "𝓤","𝓥","𝓦","𝓧","𝓨","𝓩"
];

const zFancyLower = [
    "𝓪","𝓫","𝓬","𝓭","𝓮","𝓯","𝓰","𝓱","𝓲","𝓳",
    "𝓴","𝓵","𝓶","𝓷","𝓸","𝓹","𝓺","𝓻","𝓼","𝓽",
    "𝓾","𝓿","𝔀","𝔁","𝔂","𝔃"
];


function toFancy(text) {

    return text.split("").map(function (character) {

        const code = character.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return zFancyUpper[code - 65];
        }

        if (code >= 97 && code <= 122) {
            return zFancyLower[code - 97];
        }

        return character;

    }).join("");

}


/* =========================================================
   BOLD
   ========================================================= */

const zBoldUpper = [
    "𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉",
    "𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐐","𝐑","𝐒","𝐓",
    "𝐔","𝐕","𝐖","𝐗","𝐘","𝐙"
];

const zBoldLower = [
    "𝐚","𝐛","𝐜","𝐝","𝐞","𝐟","𝐠","𝐡","𝐢","𝐣",
    "𝐤","𝐥","𝐦","𝐧","𝐨","𝐩","𝐪","𝐫","𝐬","𝐭",
    "𝐮","𝐯","𝐰","𝐱","𝐲","𝐳"
];


function toBold(text) {

    return text.split("").map(function (character) {

        const code = character.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return zBoldUpper[code - 65];
        }

        if (code >= 97 && code <= 122) {
            return zBoldLower[code - 97];
        }

        return character;

    }).join("");

}


/* =========================================================
   MONOSPACE
   ========================================================= */

const zMonoUpper = [
    "𝙰","𝙱","𝙲","𝙳","𝙴","𝙵","𝙶","𝙷","𝙸","𝙹",
    "𝙺","𝙻","𝙼","𝙽","𝙾","𝙿","𝚀","𝚁","𝚂","𝚃",
    "𝚄","𝚅","𝚆","𝚇","𝚈","𝚉"
];

const zMonoLower = [
    "𝚊","𝚋","𝚌","𝚍","𝚎","𝚏","𝚐","𝚑","𝚒","𝚓",
    "𝚔","𝚕","𝚖","𝚗","𝚘","𝚙","𝚚","𝚛","𝚜","𝚝",
    "𝚞","𝚟","𝚠","𝚡","𝚢","𝚣"
];


function toMono(text) {

    return text.split("").map(function (character) {

        const code = character.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return zMonoUpper[code - 65];
        }

        if (code >= 97 && code <= 122) {
            return zMonoLower[code - 97];
        }

        return character;

    }).join("");

}


/* =========================================================
   SMALL CAPS
   ========================================================= */

const zSmallCaps = {

    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ғ",
    g: "ɢ",
    h: "ʜ",
    i: "ɪ",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "ǫ",
    r: "ʀ",
    s: "s",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ"

};


function toSmallCaps(text) {

    return text.toLowerCase().split("").map(function (character) {

        return zSmallCaps[character] || character;

    }).join("");

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const symbolsGrid =
        document.getElementById("symbolsGrid");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    function showFinalToast(message) {

        if (!toast) {
            return;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(
            window.zNameToastTimer
        );

        window.zNameToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 1800);

    }


    function copyFinalText(text) {

        if (!text) {
            return;
        }


        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(text)
                .then(function () {

                    showFinalToast("Copied!");

                })
                .catch(function () {

                    fallbackFinalCopy(text);

                });

        } else {

            fallbackFinalCopy(text);

        }

    }


    function fallbackFinalCopy(text) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {

            document.execCommand("copy");

            showFinalToast("Copied!");

        } catch (error) {

            showFinalToast("Copy failed");

        }

        document.body.removeChild(textarea);

    }


    /* =====================================================
       SYMBOL BUTTONS
       ===================================================== */

    if (symbolsGrid) {

        const symbolButtons =
            symbolsGrid.querySelectorAll(
                ".symbol-card"
            );


        symbolButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const symbol =
                        button.dataset.symbol ||
                        button.querySelector("span")?.textContent ||
                        "";


                    if (!symbol) {
                        return;
                    }


                    copyFinalText(symbol);


                    button.classList.add(
                        "copied"
                    );


                    setTimeout(function () {

                        button.classList.remove(
                            "copied"
                        );

                    }, 700);

                }
            );

        });

    }


    /* =========================================================
       TRENDING STYLE BUTTONS
       ========================================================= */

    const styleButtons =
        document.querySelectorAll(
            ".use-style-button"
        );


    styleButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const template =
                    button.dataset.template ||
                    "";


                const nameInput =
                    document.getElementById(
                        "nameInput"
                    );


                const generator =
                    document.getElementById(
                        "generator"
                    );


                if (!nameInput) {
                    return;
                }


                let currentName =
                    nameInput.value
                        .replace(/\s+/g, " ")
                        .trim();


                if (!currentName) {

                    nameInput.focus();

                    showFinalToast(
                        "Enter your name first"
                    );

                    return;

                }


                const finalName =
                    template.replace(
                        "{name}",
                        currentName
                    );


                copyFinalText(finalName);

            }
        );

    });


    /* =========================================================
       MOBILE MENU
       ========================================================= */

    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        mobileMenuButton &&
        mobileMenu
    ) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );


                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                mobileMenuButton.classList.toggle(
                    "active",
                    isOpen
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    mobileMenuButton.classList.remove(
                        "active"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =========================================================
       MOBILE BOTTOM MORE BUTTON
       ========================================================= */

    const bottomMenuButton =
        document.getElementById(
            "bottomMenuButton"
        );


    if (bottomMenuButton) {

        bottomMenuButton.addEventListener(
            "click",
            function () {

                if (
                    mobileMenuButton &&
                    mobileMenu
                ) {

                    const isOpen =
                        mobileMenu.classList.toggle(
                            "open"
                        );


                    mobileMenuButton.classList.toggle(
                        "active",
                        isOpen
                    );


                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                }

            }
        );

    }


    /* =========================================================
       BOTTOM NAV ACTIVE STATE
       ========================================================= */

    const bottomNavItems =
        document.querySelectorAll(
            ".bottom-nav-item"
        );


    bottomNavItems.forEach(function (item) {

        if (item.tagName.toLowerCase() === "button") {
            return;
        }


        item.addEventListener(
            "click",
            function () {

                bottomNavItems.forEach(
                    function (navItem) {

                        navItem.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    });


    /* =========================================================
       ESC KEY — CLOSE MOBILE MENU
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                mobileMenuButton
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                mobileMenuButton.classList.remove(
                    "active"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =========================================================
       GENERATOR LINK FROM TRENDING
       ========================================================= */

    styleButtons.forEach(function (button) {

        button.addEventListener(
            "dblclick",
            function () {

                const generator =
                    document.getElementById(
                        "generator"
                    );

                if (generator) {

                    generator.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =========================================================
       FINAL INITIALIZATION
       ========================================================= */

    const nameInput =
        document.getElementById(
            "nameInput"
        );


    if (nameInput) {

        nameInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    const form =
                        document.getElementById(
                            "nameForm"
                        );

                    if (form) {

                        form.requestSubmit();

                    }

                }

            }
        );

    }


    /* =========================================================
       PART 3 COMPLETE
       ========================================================= */

});
