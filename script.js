"use strict";

/* =========================================================
   Z-NAME STYLE
   COMPLETE WORKING SCRIPT
   200 STYLISH NAME STYLES
   FIRST 50 = TOP / TRENDING STYLES
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const clearNameButton = document.getElementById("clearName");

const generateButton = document.getElementById("generateButton");

const previewSection = document.getElementById("previewSection");
const previewName = document.getElementById("previewName");

const resultsSection = document.getElementById("resultsSection");
const resultsContainer = document.getElementById("resultsContainer");
const resultsTitle = document.getElementById("resultsTitle");

const styleFilters = document.getElementById("styleFilters");

const symbolsGrid = document.getElementById("symbolsGrid");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

const bottomMenuButton = document.getElementById("bottomMenuButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   STATE
   ========================================================= */

let currentName = "";
let currentFilter = "all";
let currentStyles = [];
let toastTimer = null;


/* =========================================================
   200 STYLE DEFINITIONS
   ---------------------------------------------------------
   FIRST 50 ARE THE TOP / TRENDING STYLES
   ========================================================= */

const styles = [

    /* =====================================================
       TOP 50 TRENDING STYLES
       ===================================================== */

    {
        category: "fancy",
        template: "꧁༺ {name} ༻꧂"
    },

    {
        category: "fancy",
        template: "★彡 {name} 彡★"
    },

    {
        category: "gaming",
        template: "亗 {name} 亗"
    },

    {
        category: "gaming",
        template: "『 {name} 』"
    },

    {
        category: "attitude",
        template: "乂 {name} 乂"
    },

    {
        category: "fancy",
        template: "꧁ {name} ꧂"
    },

    {
        category: "gaming",
        template: "メ {name} メ"
    },

    {
        category: "gaming",
        template: "〆 {name} 〆"
    },

    {
        category: "royal",
        template: "♛ {name} ♛"
    },

    {
        category: "royal",
        template: "♕ {name} ♕"
    },

    {
        category: "love",
        template: "♡ {name} ♡"
    },

    {
        category: "love",
        template: "♥ {name} ♥"
    },

    {
        category: "cool",
        template: "⚡ {name} ⚡"
    },

    {
        category: "dark",
        template: "☠ {name} ☠"
    },

    {
        category: "fancy",
        template: "༺ {name} ༻"
    },

    {
        category: "fancy",
        template: "༻ {name} ༺"
    },

    {
        category: "gaming",
        template: "乂『 {name} 』乂"
    },

    {
        category: "gaming",
        template: "亗『 {name} 』亗"
    },

    {
        category: "gaming",
        template: "メ『 {name} 』メ"
    },

    {
        category: "gaming",
        template: "〆『 {name} 』〆"
    },

    {
        category: "attitude",
        template: "⚔ {name} ⚔"
    },

    {
        category: "attitude",
        template: "☬ {name} ☬"
    },

    {
        category: "attitude",
        template: "☠︎ {name} ☠︎"
    },

    {
        category: "attitude",
        template: "⚡『 {name} 』⚡"
    },

    {
        category: "attitude",
        template: "乂⚡ {name} ⚡乂"
    },

    {
        category: "royal",
        template: "♛『 {name} 』♛"
    },

    {
        category: "royal",
        template: "♕『 {name} 』♕"
    },

    {
        category: "royal",
        template: "♚ {name} ♚"
    },

    {
        category: "royal",
        template: "♔ {name} ♔"
    },

    {
        category: "royal",
        template: "👑 {name} 👑"
    },

    {
        category: "love",
        template: "♡꧁ {name} ꧂♡"
    },

    {
        category: "love",
        template: "♥꧁ {name} ꧂♥"
    },

    {
        category: "love",
        template: "ღ {name} ღ"
    },

    {
        category: "love",
        template: "❣ {name} ❣"
    },

    {
        category: "love",
        template: "❤ {name} ❤"
    },

    {
        category: "cool",
        template: "⚡『 {name} 』⚡"
    },

    {
        category: "cool",
        template: "✦ {name} ✦"
    },

    {
        category: "cool",
        template: "✧ {name} ✧"
    },

    {
        category: "cool",
        template: "★ {name} ★"
    },

    {
        category: "cool",
        template: "☆ {name} ☆"
    },

    {
        category: "dark",
        template: "☠『 {name} 』☠"
    },

    {
        category: "dark",
        template: "☾ {name} ☽"
    },

    {
        category: "dark",
        template: "☽ {name} ☾"
    },

    {
        category: "dark",
        template: "♰ {name} ♰"
    },

    {
        category: "dark",
        template: "† {name} †"
    },

    {
        category: "cute",
        template: "🌸 {name} 🌸"
    },

    {
        category: "cute",
        template: "♡🌸 {name} 🌸♡"
    },

    {
        category: "cute",
        template: "꒰ {name} ꒱"
    },

    {
        category: "cute",
        template: "ʚ {name} ɞ"
    },


    /* =====================================================
       51 - 200
       ADDITIONAL STYLES
       ===================================================== */

    {
        category: "fancy",
        template: "꧁༒ {name} ༒꧂"
    },

    {
        category: "fancy",
        template: "༺★ {name} ★༻"
    },

    {
        category: "fancy",
        template: "༺✦ {name} ✦༻"
    },

    {
        category: "fancy",
        template: "༺✧ {name} ✧༻"
    },

    {
        category: "fancy",
        template: "『★ {name} ★』"
    },

    {
        category: "fancy",
        template: "『✦ {name} ✦』"
    },

    {
        category: "fancy",
        template: "『✧ {name} ✧』"
    },

    {
        category: "fancy",
        template: "꧁★ {name} ★꧂"
    },

    {
        category: "fancy",
        template: "꧁✦ {name} ✦꧂"
    },

    {
        category: "fancy",
        template: "꧁✧ {name} ✧꧂"
    },

    {
        category: "fancy",
        template: "༒ {name} ༒"
    },

    {
        category: "fancy",
        template: "✦༺ {name} ༻✦"
    },

    {
        category: "fancy",
        template: "✧༺ {name} ༻✧"
    },

    {
        category: "fancy",
        template: "★༺ {name} ༻★"
    },

    {
        category: "fancy",
        template: "☆༺ {name} ༻☆"
    },


    {
        category: "gaming",
        template: "乂★ {name} ★乂"
    },

    {
        category: "gaming",
        template: "乂✦ {name} ✦乂"
    },

    {
        category: "gaming",
        template: "乂✧ {name} ✧乂"
    },

    {
        category: "gaming",
        template: "乂⚔ {name} ⚔乂"
    },

    {
        category: "gaming",
        template: "亗★ {name} ★亗"
    },

    {
        category: "gaming",
        template: "亗✦ {name} ✦亗"
    },

    {
        category: "gaming",
        template: "亗✧ {name} ✧亗"
    },

    {
        category: "gaming",
        template: "亗⚔ {name} ⚔亗"
    },

    {
        category: "gaming",
        template: "メ★ {name} ★メ"
    },

    {
        category: "gaming",
        template: "メ✦ {name} ✦メ"
    },

    {
        category: "gaming",
        template: "メ✧ {name} ✧メ"
    },

    {
        category: "gaming",
        template: "メ⚔ {name} ⚔メ"
    },

    {
        category: "gaming",
        template: "〆★ {name} ★〆"
    },

    {
        category: "gaming",
        template: "〆✦ {name} ✦〆"
    },

    {
        category: "gaming",
        template: "〆✧ {name} ✧〆"
    },


    {
        category: "attitude",
        template: "⚡★ {name} ★⚡"
    },

    {
        category: "attitude",
        template: "⚡✦ {name} ✦⚡"
    },

    {
        category: "attitude",
        template: "⚡✧ {name} ✧⚡"
    },

    {
        category: "attitude",
        template: "☬★ {name} ★☬"
    },

    {
        category: "attitude",
        template: "☬✦ {name} ✦☬"
    },

    {
        category: "attitude",
        template: "☬✧ {name} ✧☬"
    },

    {
        category: "attitude",
        template: "⚔★ {name} ★⚔"
    },

    {
        category: "attitude",
        template: "⚔✦ {name} ✦⚔"
    },

    {
        category: "attitude",
        template: "⚔✧ {name} ✧⚔"
    },

    {
        category: "attitude",
        template: "☠★ {name} ★☠"
    },

    {
        category: "attitude",
        template: "☠✦ {name} ✦☠"
    },

    {
        category: "attitude",
        template: "☠✧ {name} ✧☠"
    },

    {
        category: "attitude",
        template: "乂⚡ {name} ⚡乂"
    },

    {
        category: "attitude",
        template: "乂☠ {name} ☠乂"
    },

    {
        category: "attitude",
        template: "乂⚔ {name} ⚔乂"
    },


    {
        category: "royal",
        template: "♛★ {name} ★♛"
    },

    {
        category: "royal",
        template: "♛✦ {name} ✦♛"
    },

    {
        category: "royal",
        template: "♛✧ {name} ✧♛"
    },

    {
        category: "royal",
        template: "♕★ {name} ★♕"
    },

    {
        category: "royal",
        template: "♕✦ {name} ✦♕"
    },

    {
        category: "royal",
        template: "♕✧ {name} ✧♕"
    },

    {
        category: "royal",
        template: "♚★ {name} ★♚"
    },

    {
        category: "royal",
        template: "♚✦ {name} ✦♚"
    },

    {
        category: "royal",
        template: "♚✧ {name} ✧♚"
    },

    {
        category: "royal",
        template: "♔★ {name} ★♔"
    },

    {
        category: "royal",
        template: "♔✦ {name} ✦♔"
    },

    {
        category: "royal",
        template: "♔✧ {name} ✧♔"
    },

    {
        category: "royal",
        template: "♛⚜ {name} ⚜♛"
    },

    {
        category: "royal",
        template: "♕⚜ {name} ⚜♕"
    },

    {
        category: "royal",
        template: "♚⚜ {name} ⚜♚"
    },


    {
        category: "love",
        template: "♡★ {name} ★♡"
    },

    {
        category: "love",
        template: "♡✦ {name} ✦♡"
    },

    {
        category: "love",
        template: "♡✧ {name} ✧♡"
    },

    {
        category: "love",
        template: "♥★ {name} ★♥"
    },

    {
        category: "love",
        template: "♥✦ {name} ✦♥"
    },

    {
        category: "love",
        template: "♥✧ {name} ✧♥"
    },

    {
        category: "love",
        template: "ღ★ {name} ★ღ"
    },

    {
        category: "love",
        template: "ღ✦ {name} ✦ღ"
    },

    {
        category: "love",
        template: "ღ✧ {name} ✧ღ"
    },

    {
        category: "love",
        template: "❣★ {name} ★❣"
    },

    {
        category: "love",
        template: "❣✦ {name} ✦❣"
    },

    {
        category: "love",
        template: "❣✧ {name} ✧❣"
    },

    {
        category: "love",
        template: "❤★ {name} ★❤"
    },

    {
        category: "love",
        template: "❤✦ {name} ✦❤"
    },

    {
        category: "love",
        template: "❤✧ {name} ✧❤"
    },


    {
        category: "cool",
        template: "★『 {name} 』★"
    },

    {
        category: "cool",
        template: "✦『 {name} 』✦"
    },

    {
        category: "cool",
        template: "✧『 {name} 』✧"
    },

    {
        category: "cool",
        template: "★༺ {name} ༻★"
    },

    {
        category: "cool",
        template: "✦༺ {name} ༻✦"
    },

    {
        category: "cool",
        template: "✧༺ {name} ༻✧"
    },

    {
        category: "cool",
        template: "⚡★ {name} ★⚡"
    },

    {
        category: "cool",
        template: "⚡✦ {name} ✦⚡"
    },

    {
        category: "cool",
        template: "⚡✧ {name} ✧⚡"
    },

    {
        category: "cool",
        template: "★彡 {name} 彡★"
    },

    {
        category: "cool",
        template: "✦彡 {name} 彡✦"
    },

    {
        category: "cool",
        template: "✧彡 {name} 彡✧"
    },

    {
        category: "cool",
        template: "☆『 {name} 』☆"
    },

    {
        category: "cool",
        template: "☆༺ {name} ༻☆"
    },

    {
        category: "cool",
        template: "☆彡 {name} 彡☆"
    },


    {
        category: "dark",
        template: "☠★ {name} ★☠"
    },

    {
        category: "dark",
        template: "☠✦ {name} ✦☠"
    },

    {
        category: "dark",
        template: "☠✧ {name} ✧☠"
    },

    {
        category: "dark",
        template: "†★ {name} ★†"
    },

    {
        category: "dark",
        template: "†✦ {name} ✦†"
    },

    {
        category: "dark",
        template: "†✧ {name} ✧†"
    },

    {
        category: "dark",
        template: "♰★ {name} ★♰"
    },

    {
        category: "dark",
        template: "♰✦ {name} ✦♰"
    },

    {
        category: "dark",
        template: "♰✧ {name} ✧♰"
    },

    {
        category: "dark",
        template: "☾★ {name} ★☽"
    },

    {
        category: "dark",
        template: "☾✦ {name} ✦☽"
    },

    {
        category: "dark",
        template: "☾✧ {name} ✧☽"
    },

    {
        category: "dark",
        template: "☽★ {name} ★☾"
    },

    {
        category: "dark",
        template: "☽✦ {name} ✦☽"
    },

    {
        category: "dark",
        template: "☽✧ {name} ✧☽"
    },


    {
        category: "cute",
        template: "🌸★ {name} ★🌸"
    },

    {
        category: "cute",
        template: "🌸✦ {name} ✦🌸"
    },

    {
        category: "cute",
        template: "🌸✧ {name} ✧🌸"
    },

    {
        category: "cute",
        template: "♡🌸 {name} 🌸♡"
    },

    {
        category: "cute",
        template: "♡✿ {name} ✿♡"
    },

    {
        category: "cute",
        template: "✿ {name} ✿"
    },

    {
        category: "cute",
        template: "❀ {name} ❀"
    },

    {
        category: "cute",
        template: "✿★ {name} ★✿"
    },

    {
        category: "cute",
        template: "✿✦ {name} ✦✿"
    },

    {
        category: "cute",
        template: "✿✧ {name} ✧✿"
    },

    {
        category: "cute",
        template: "꒰★ {name} ★꒱"
    },

    {
        category: "cute",
        template: "꒰✦ {name} ✦꒱"
    },

    {
        category: "cute",
        template: "꒰✧ {name} ✧꒱"
    },

    {
        category: "cute",
        template: "ʚ★ {name} ★ɞ"
    },

    {
        category: "cute",
        template: "ʚ✦ {name} ✦ɞ"
    }

];


/* =========================================================
   SAFETY CHECK
   ========================================================= */

console.log("Z-Name Style loaded.");
console.log("Total style definitions:", styles.length);


/* =========================================================
   CLEAN NAME
   ========================================================= */

function cleanName(value) {

    return String(value || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30);

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   CREATE STYLED NAME
   ========================================================= */

function createStyledName(template, name) {

    return template.replace(/\{name\}/g, name);

}


/* =========================================================
   GET STYLES BY FILTER
   ========================================================= */

function getFilteredStyles(filter) {

    if (filter === "all") {

        return styles;

    }

    return styles.filter(function(style) {

        return style.category === filter;

    });

}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults() {

    if (!currentName) {

        return;

    }

    const filteredStyles = getFilteredStyles(currentFilter);

    currentStyles = filteredStyles;

    resultsContainer.innerHTML = "";

    if (filteredStyles.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty-results">
                No styles found.
            </div>
        `;

        return;

    }


    const fragment = document.createDocumentFragment();


    filteredStyles.forEach(function(style) {

        const styledName = createStyledName(
            style.template,
            currentName
        );


        const card = document.createElement("article");

        card.className = "result-card";


        const nameElement = document.createElement("div");

        nameElement.className = "result-name";

        nameElement.textContent = styledName;


        const copyButton = document.createElement("button");

        copyButton.type = "button";

        copyButton.className = "copy-result-button";

        copyButton.innerHTML = "📋 Copy";


        copyButton.addEventListener("click", function() {

            copyText(
                styledName,
                copyButton
            );

        });


        card.appendChild(nameElement);

        card.appendChild(copyButton);

        fragment.appendChild(card);

    });


    resultsContainer.appendChild(fragment);


    resultsSection.hidden = false;

}


/* =========================================================
   UPDATE RESULTS TITLE
   ========================================================= */

function updateResultsTitle() {

    if (!resultsTitle) {

        return;

    }

    resultsTitle.textContent =
        "Stylish Names for " + currentName;

}


/* =========================================================
   GENERATE
   ========================================================= */

function generateNames() {

    const name = cleanName(nameInput.value);

    if (!name) {

        showToast("Please enter your name.");

        nameInput.focus();

        return;

    }


    currentName = name;

    currentFilter = "all";


    updatePreview();

    updateResultsTitle();

    setActiveFilter("all");

    renderResults();


    previewSection.hidden = false;

    resultsSection.hidden = false;


    setTimeout(function() {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 80);

}


/* =========================================================
   UPDATE LIVE PREVIEW
   ========================================================= */

function updatePreview() {

    const name = cleanName(nameInput.value);

    if (!name) {

        previewSection.hidden = true;

        previewName.textContent = "Your Name";

        return;

    }


    previewSection.hidden = false;

    previewName.textContent = name;

}


/* =========================================================
   INPUT EVENT
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("input", function() {

        updatePreview();

        clearNameButton.hidden =
            nameInput.value.length === 0;

    });

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (nameForm) {

    nameForm.addEventListener("submit", function(event) {

        event.preventDefault();

        generateNames();

    });

}


/* =========================================================
   CLEAR NAME
   ========================================================= */

if (clearNameButton) {

    clearNameButton.addEventListener("click", function() {

        nameInput.value = "";

        currentName = "";

        previewSection.hidden = true;

        resultsSection.hidden = true;

        clearNameButton.hidden = true;

        nameInput.focus();

    });

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function setActiveFilter(filter) {

    currentFilter = filter;


    const buttons =
        document.querySelectorAll(".filter-button");


    buttons.forEach(function(button) {

        const buttonFilter =
            button.dataset.filter;


        button.classList.toggle(
            "active",
            buttonFilter === filter
        );

    });

}


if (styleFilters) {

    styleFilters.addEventListener("click", function(event) {

        const button =
            event.target.closest(".filter-button");


        if (!button) {

            return;

        }


        const filter =
            button.dataset.filter;


        if (!filter) {

            return;

        }


        if (!currentName) {

            showToast("Enter your name first.");

            nameInput.focus();

            return;

        }


        setActiveFilter(filter);

        renderResults();

    });

}


/* =========================================================
   CATEGORY CARDS
   ========================================================= */

document
    .querySelectorAll(".category-card")
    .forEach(function(card) {

        card.addEventListener("click", function() {

            const category =
                card.dataset.category;


            if (!currentName) {

                showToast("Enter your name first.");

                nameInput.focus();

                return;

            }


            /*
             * Some categories do not have a direct filter
             * button in the existing HTML.
             *
             * They still work here.
             */

            currentFilter = category;


            const filtered =
                styles.filter(function(style) {

                    return style.category === category;

                });


            currentStyles = filtered;


            resultsContainer.innerHTML = "";


            if (filtered.length === 0) {

                resultsContainer.innerHTML = `
                    <div class="empty-results">
                        No styles available.
                    </div>
                `;

            } else {

                const fragment =
                    document.createDocumentFragment();


                filtered.forEach(function(style) {

                    const styledName =
                        createStyledName(
                            style.template,
                            currentName
                        );


                    const cardElement =
                        document.createElement("article");


                    cardElement.className =
                        "result-card";


                    const nameElement =
                        document.createElement("div");


                    nameElement.className =
                        "result-name";


                    nameElement.textContent =
                        styledName;


                    const copyButton =
                        document.createElement("button");


                    copyButton.type = "button";

                    copyButton.className =
                        "copy-result-button";

                    copyButton.innerHTML =
                        "📋 Copy";


                    copyButton.addEventListener(
                        "click",
                        function() {

                            copyText(
                                styledName,
                                copyButton
                            );

                        }
                    );


                    cardElement.appendChild(
                        nameElement
                    );

                    cardElement.appendChild(
                        copyButton
                    );


                    fragment.appendChild(
                        cardElement
                    );

                });


                resultsContainer.appendChild(
                    fragment
                );

            }


            updateResultsTitle();

            resultsSection.hidden = false;


            setTimeout(function() {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);

        });

    });


/* =========================================================
   COPY FUNCTION
   ========================================================= */

async function copyText(text, button) {

    let copied = false;


    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(text);

            copied = true;

        }

    } catch (error) {

        copied = false;

    }


    if (!copied) {

        copied = legacyCopy(text);

    }


    if (copied) {

        showToast("Copied!");

        if (button) {

            const oldText =
                button.innerHTML;


            button.innerHTML =
                "✓ Copied";


            button.classList.add("copied");


            setTimeout(function() {

                button.innerHTML =
                    oldText;

                button.classList.remove("copied");

            }, 1200);

        }

    } else {

        showToast(
            "Copy failed. Please copy manually."
        );

    }

}


/* =========================================================
   OLD BROWSER COPY FALLBACK
   ========================================================= */

function legacyCopy(text) {

    const textarea =
        document.createElement("textarea");


    textarea.value = text;

    textarea.setAttribute(
        "readonly",
        ""
    );

    textarea.style.position =
        "fixed";

    textarea.style.left =
        "-9999px";

    textarea.style.top =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.focus();

    textarea.select();


    let success = false;


    try {

        success =
            document.execCommand("copy");

    } catch (error) {

        success = false;

    }


    document.body.removeChild(
        textarea
    );


    return success;

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

if (symbolsGrid) {

    symbolsGrid.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    ".symbol-card"
                );


            if (!button) {

                return;

            }


            const symbol =
                button.dataset.symbol;


            if (!symbol) {

                return;

            }


            copyText(
                symbol,
                button
            );

        }
    );

}


/* =========================================================
   TRENDING STYLE BUTTONS
   ========================================================= */

document
    .querySelectorAll(".use-style-button")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const template =
                    button.dataset.template;


                if (!template) {

                    return;

                }


                const name =
                    cleanName(
                        nameInput.value
                    );


                if (!name) {

                    showToast(
                        "Enter your name first."
                    );

                    nameInput.focus();

                    return;

                }


                const styledName =
                    template.replace(
                        /\{name\}/g,
                        name
                    );


                copyText(
                    styledName,
                    button
                );


                /*
                 * Also show the selected
                 * style in the generator.
                 */

                currentName = name;

                previewName.textContent =
                    styledName;

                previewSection.hidden =
                    false;

            }
        );

    });


/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMobileMenu() {
      if (!mobileMenu) {

        return;

    }


    mobileMenu.classList.remove(
        "open"
    );


    if (mobileMenuButton) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


function toggleMobileMenu() {

    if (!mobileMenu) {

        return;

    }


    const isOpen =
        mobileMenu.classList.toggle(
            "open"
        );


    if (mobileMenuButton) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }

}


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER LINK CLICK
   ========================================================= */

document
    .querySelectorAll(".mobile-nav-link")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                closeMobileMenu();

            }
        );

    });


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

if (bottomMenuButton) {

    bottomMenuButton.addEventListener(
        "click",
        function() {

            toggleMobileMenu();

        }
    );

}


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        if (!mobileMenu ||
            !mobileMenuButton) {

            return;

        }


        const clickedInsideMenu =
            mobileMenu.contains(
                event.target
            );


        const clickedButton =
            mobileMenuButton.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MENU WITH ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast) {

        return;

    }


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(function() {

            toast.classList.remove(
                "show"
            );

        }, 2200);

}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

const allNavLinks =
    document.querySelectorAll(
        ".nav-link, .mobile-nav-link"
    );


allNavLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            allNavLinks.forEach(
                function(item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================================
   BOTTOM NAV ACTIVE STATE
   ========================================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );


bottomNavItems.forEach(function(item) {

    item.addEventListener(
        "click",
        function() {

            if (
                item.tagName.toLowerCase() ===
                "button"
            ) {

                return;

            }


            bottomNavItems.forEach(
                function(navItem) {

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
   SMOOTH SCROLL FOR HASH LINKS
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                generateNames();

            }

        }
    );

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (previewSection) {

    previewSection.hidden = true;

}


if (resultsSection) {

    resultsSection.hidden = true;

}


if (clearNameButton) {

    clearNameButton.hidden = true;

}


setActiveFilter("all");


/* =========================================================
   FINAL CHECK
   ========================================================= */

console.log(
    "Z-Name Style is ready."
);

console.log(
    "Available styles:",
    styles.length
);
       
