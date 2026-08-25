/* =========================================================
   Z-NAME STYLE
   Main JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const clearName = document.getElementById("clearName");

const generateButton = document.getElementById("generateButton");

const previewSection = document.getElementById("previewSection");
const previewName = document.getElementById("previewName");

const resultsSection = document.getElementById("resultsSection");
const resultsContainer = document.getElementById("resultsContainer");
const resultsTitle = document.getElementById("resultsTitle");

const styleFilters = document.getElementById("styleFilters");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

const bottomMenuButton = document.getElementById("bottomMenuButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let currentName = "";
let currentResults = [];
let activeFilter = "all";
let selectedTemplate = null;

let toastTimer = null;


/* =========================================================
   FANCY UNICODE LETTER MAPS
   ========================================================= */

const unicodeStyles = {

    bold: {
        uppercase: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
        lowercase: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
        numbers: "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
    },

    italic: {
        uppercase: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
        lowercase: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
        numbers: "0123456789"
    },

    boldItalic: {
        uppercase: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
        lowercase: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
        numbers: "0123456789"
    },

    double: {
        uppercase: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
        lowercase: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
        numbers: "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
    },

    fraktur: {
        uppercase: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
        lowercase: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
        numbers: "0123456789"
    },

    monospace: {
        uppercase: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
        lowercase: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
        numbers: "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
    },

    smallCaps: {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ",
        numbers: "0123456789"
    }

};


/* =========================================================
   CONVERT TEXT TO UNICODE STYLE
   ========================================================= */

function convertText(text, style) {

    const map = unicodeStyles[style];

    if (!map) {
        return text;
    }

    const normalUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const normalLower = "abcdefghijklmnopqrstuvwxyz";
    const normalNumbers = "0123456789";

    return [...text].map(character => {

        const upperIndex = normalUpper.indexOf(character);

        if (upperIndex !== -1) {
            return [...map.uppercase][upperIndex] || character;
        }

        const lowerIndex = normalLower.indexOf(character);

        if (lowerIndex !== -1) {
            return [...map.lowercase][lowerIndex] || character;
        }

        const numberIndex = normalNumbers.indexOf(character);

        if (numberIndex !== -1) {
            return [...map.numbers][numberIndex] || character;
        }

        return character;

    }).join("");

}


/* =========================================================
   STYLE DEFINITIONS
   ========================================================= */

const styleDefinitions = [

    {
        name: "Bold",
        category: "fancy",
        icon: "𝗔",
        create: name => convertText(name, "bold")
    },

    {
        name: "Italic",
        category: "fancy",
        icon: "𝘈",
        create: name => convertText(name, "italic")
    },

    {
        name: "Bold Italic",
        category: "fancy",
        icon: "𝑨",
        create: name => convertText(name, "boldItalic")
    },

    {
        name: "Double",
        category: "fancy",
        icon: "𝔸",
        create: name => convertText(name, "double")
    },

    {
        name: "Fraktur",
        category: "fancy",
        icon: "𝔄",
        create: name => convertText(name, "fraktur")
    },

    {
        name: "Monospace",
        category: "fancy",
        icon: "𝙰",
        create: name => convertText(name, "monospace")
    },

    {
        name: "Small Caps",
        category: "cool",
        icon: "ᴀ",
        create: name => convertText(name, "smallCaps")
    },

    {
        name: "Gaming",
        category: "gaming",
        icon: "🎮",
        create: name => `亗 ${name} 亗`
    },

    {
        name: "Pro Gamer",
        category: "gaming",
        icon: "⚔️",
        create: name => `乂 ${name} 乂`
    },

    {
        name: "Warrior",
        category: "gaming",
        icon: "⚔",
        create: name => `『${name}』`
    },

    {
        name: "Royal",
        category: "royal",
        icon: "♛",
        create: name => `♛ ${name} ♛`
    },

    {
        name: "King",
        category: "royal",
        icon: "👑",
        create: name => `꧁༺ ${name} ༻꧂`
    },

    {
        name: "Attitude",
        category: "attitude",
        icon: "😎",
        create: name => `★彡 ${name} 彡★`
    },

    {
        name: "Savage",
        category: "attitude",
        icon: "🔥",
        create: name => `乂 ${name} 乂`
    },

    {
        name: "Dark",
        category: "dark",
        icon: "💀",
        create: name => `☠︎ ${name} ☠︎`
    },

    {
        name: "Shadow",
        category: "dark",
        icon: "🌑",
        create: name => `『☠ ${name} ☠』`
    },

    {
        name: "Love",
        category: "love",
        icon: "❤️",
        create: name => `♡ ${name} ♡`
    },

    {
        name: "Heart",
        category: "love",
        icon: "💗",
        create: name => `♥ ${name} ♥`
    },

    {
        name: "Cute",
        category: "cute",
        icon: "🌸",
        create: name => `꒰ ${name} ꒱`
    },

    {
        name: "Flower",
        category: "cute",
        icon: "🌸",
        create: name => `✿ ${name} ✿`
    },

    {
        name: "Cool",
        category: "cool",
        icon: "⚡",
        create: name => `ツ ${name} ツ`
    },

    {
        name: "Star",
        category: "symbols",
        icon: "★",
        create: name => `★ ${name} ★`
    },

    {
        name: "Symbol",
        category: "symbols",
        icon: "彡",
        create: name => `彡 ${name} 彡`
    }

];


/* =========================================================
   SANITIZE USER NAME
   ========================================================= */

function cleanName(value) {

    return value
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30);

}


/* =========================================================
   GENERATE RESULTS
   ========================================================= */

function generateResults(name) {

    currentName = cleanName(name);

    if (!currentName) {
        showToast("Please enter your name.");
        nameInput.focus();
        return;
    }

    currentResults = styleDefinitions.map((style, index) => {

        return {
            id: index,
            name: style.name,
            category: style.category,
            icon: style.icon,
            text: style.create(currentName)
        };

    });

    activeFilter = "all";

    updateFilterButtons();

    updatePreview();

    renderResults();

    resultsSection.hidden = false;
    previewSection.hidden = false;

    setTimeout(() => {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults() {

    if (!resultsContainer) {
        return;
    }

    let filteredResults = currentResults;

    if (activeFilter !== "all") {

        filteredResults = currentResults.filter(
            result => result.category === activeFilter
        );

    }

    resultsContainer.innerHTML = "";

    if (filteredResults.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty-results">
                <div class="empty-results-icon">✨</div>
                <h3>No styles found</h3>
                <p>Try another category.</p>
            </div>
        `;

        return;
    }


    filteredResults.forEach(result => {

        const card = document.createElement("article");

        card.className = "result-card";

        card.dataset.category = result.category;


        card.innerHTML = `
            <div class="result-card-top">
                <div class="result-style-info">
                    <span class="result-style-icon">
                        ${escapeHTML(result.icon)}
                    </span>

                    <div>
                        <span class="result-style-name">
                            ${escapeHTML(result.name)}
                        </span>

                        <small>
                            ${escapeHTML(capitalize(result.category))}
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    class="copy-result-button"
                    aria-label="Copy ${escapeAttribute(result.text)}"
                    data-copy-text="${escapeAttribute(result.text)}"
                >
                    📋
                    <span>Copy</span>
                </button>
            </div>

            <div class="result-name">
                ${escapeHTML(result.text)}
            </div>
        `;


        resultsContainer.appendChild(card);

    });

}


/* =========================================================
   UPDATE LIVE PREVIEW
   ========================================================= */

function updatePreview() {

    if (!previewName) {
        return;
    }

    if (!currentName) {

        previewName.textContent = "Your Name";
        return;

    }

    previewName.textContent = currentName;

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function updateFilterButtons() {

    if (!styleFilters) {
        return;
    }

    const buttons = styleFilters.querySelectorAll(
        ".filter-button"
    );

    buttons.forEach(button => {

        const isActive =
            button.dataset.filter === activeFilter;

        button.classList.toggle("active", isActive);

    });

}


/* =========================================================
   FILTER EVENT
   ========================================================= */

function handleFilter(filter) {

    activeFilter = filter;

    updateFilterButtons();

    renderResults();

}


/* =========================================================
   CATEGORY CARDS
   ========================================================= */

function handleCategory(category) {

    if (!currentName) {

        nameInput.focus();

        showToast("Enter your name first.");

        return;

    }

    activeFilter = category;

    updateFilterButtons();

    renderResults();

    if (resultsSection.hidden) {
        resultsSection.hidden = false;
    }

    setTimeout(() => {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);

}


/* =========================================================
   COPY TEXT
   ========================================================= */

async function copyText(text) {

    if (!text) {
        return false;
    }


    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(text);

            return true;

        }

    } catch (error) {

        console.warn(
            "Clipboard API failed:",
            error
        );

    }


    return fallbackCopy(text);

}


/* =========================================================
   FALLBACK COPY
   ========================================================= */

function fallbackCopy(text) {

    const textarea =
        document.createElement("textarea");

    textarea.value = text;

    textarea.setAttribute(
        "readonly",
        ""
    );

    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(
        0,
        textarea.value.length
    );

    let successful = false;

    try {

        successful =
            document.execCommand("copy");

    } catch (error) {

        console.warn(
            "Fallback copy failed:",
            error
        );

    }

    textarea.remove();

    return successful;

}


/* =========================================================
   COPY RESULT BUTTON
   ========================================================= */

async function handleResultCopy(button) {

    const text =
        button.dataset.copyText || "";

    if (!text) {
        return;
    }

    const originalHTML =
        button.innerHTML;

    const copied =
        await copyText(text);

    if (copied) {

        button.classList.add("copied");

        button.innerHTML = `
            ✓
            <span>Copied</span>
        `;

        showToast("Name copied!");

        setTimeout(() => {

            button.classList.remove("copied");

            button.innerHTML =
                originalHTML;

        }, 1500);

    } else {

        showToast(
            "Copy failed. Please copy manually."
        );

    }

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

async function handleSymbolCopy(button) {

    const symbol =
        button.dataset.symbol || "";

    if (!symbol) {
        return;
    }

    const copied =
        await copyText(symbol);

    if (copied) {

        button.classList.add("copied");

        const small =
            button.querySelector("small");

        if (small) {

            const originalText =
                small.textContent;

            small.textContent = "Copied!";

            setTimeout(() => {

                small.textContent =
                    originalText;

                button.classList.remove(
                    "copied"
                );

            }, 1200);

        }

        showToast(`Copied: ${symbol}`);

    } else {

        showToast(
            "Copy failed. Please try again."
        );

    }

}


/* =========================================================
   TRENDING STYLE
   ========================================================= */

function useTrendingStyle(template) {

    if (!template) {
        return;
    }

    selectedTemplate = template;

    if (!currentName) {

        nameInput.focus();

        showToast("Enter your name first.");

        return;

    }

    const result =
        template.replace(
            /\{name\}/gi,
            currentName
        );

    copyText(result).then(success => {

        if (success) {

            showToast(
                "Stylish name copied!"
            );

        } else {

            showToast(
                "Copy failed. Please try again."
            );

        }

    });

}


/* =========================================================
   CLEAR NAME
   ========================================================= */

function clearInput() {

    nameInput.value = "";

    currentName = "";

    currentResults = [];

    selectedTemplate = null;

    if (clearName) {
        clearName.hidden = true;
    }

    if (previewSection) {
        previewSection.hidden = true;
    }

    if (resultsSection) {
        resultsSection.hidden = true;
    }

    updatePreview();

    nameInput.focus();

}


/* =========================================================
   UPDATE CLEAR BUTTON
   ========================================================= */

function updateClearButton() {

    if (!clearName) {
        return;
    }

    clearName.hidden =
        nameInput.value.length === 0;

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.add("open");

    mobileMenuButton.classList.add("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    mobileMenuButton.setAttribute(
        "aria-label",
        "Close menu"
    );

}


function closeMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.remove("open");

    mobileMenuButton.classList.remove("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenuButton.setAttribute(
        "aria-label",
        "Open menu"
    );

}


function toggleMobileMenu() {

    if (!mobileMenu) {
        return;
    }

    const isOpen =
        mobileMenu.classList.contains("open");

    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

function handleBottomMenu() {

    toggleMobileMenu();

    if (mobileMenu && mobileMenu.classList.contains("open")) {

        setTimeout(() => {

            mobileMenu.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 50);

    }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ESCAPE ATTRIBUTE
   ========================================================= */

function escapeAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


/* =========================================================
   CAPITALIZE
   ========================================================= */

function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function smoothScrollToTarget(target) {

    if (!target) {
        return;
    }

    const element =
        document.querySelector(target);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation(targetId) {

    const allNavLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-nav-link"
        );

    allNavLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${targetId}`
        );

    });


    const bottomItems =
        document.querySelectorAll(
            ".bottom-nav-item"
        );

    bottomItems.forEach(item => {

        const href =
            item.getAttribute("href");

        if (!href) {
            return;
        }

        item.classList.toggle(
            "active",
            href === `#${targetId}`
        );

    });

}


/* =========================================================
   NAVIGATION LINKS
   ========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href === "#0"
                ) {

                    if (href === "#") {

                        event.preventDefault();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }

                    return;

                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                updateActiveNavigation(
                    href.substring(1)
                );

                closeMobileMenu();

            }
        );

    });

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */


/* Name form */

if (nameForm) {

    nameForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            generateResults(
                nameInput.value
            );

        }
    );

}


/* Input */

if (nameInput) {

    nameInput.addEventListener(
        "input",
        () => {

            updateClearButton();

            const value =
                cleanName(
                    nameInput.value
                );

            if (value) {

                currentName = value;

                updatePreview();

            } else {

                currentName = "";

                if (previewSection) {
                    previewSection.hidden = true;
                }

            }

        }
    );


    nameInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                if (nameForm) {
                    nameForm.requestSubmit();
                }

            }

            if (
                event.key === "Escape"
            ) {

                clearInput();

            }

        }
    );

}


/* Clear button */

if (clearName) {

    clearName.addEventListener(
        "click",
        clearInput
    );

}


/* Filters */

if (styleFilters) {

    styleFilters.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".filter-button"
                );

            if (!button) {
                return;
            }

            handleFilter(
                button.dataset.filter ||
                "all"
            );

        }
    );

}


/* Result copy buttons */

if (resultsContainer) {

    resultsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".copy-result-button"
                );

            if (!button) {
                return;
            }

            handleResultCopy(button);

        }
    );

}


/* Symbol buttons */

const symbolsGrid =
    document.getElementById(
        "symbolsGrid"
    );

if (symbolsGrid) {

    symbolsGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".symbol-card"
                );

            if (!button) {
                return;
            }

            handleSymbolCopy(button);

        }
    );

}


/* Category cards */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );

categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;

            if (category) {
                handleCategory(category);
            }

        }
    );

});


/* Trending buttons */

const trendingButtons =
    document.querySelectorAll(
        ".use-style-button"
    );

trendingButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const template =
                button.dataset.template;

            useTrendingStyle(template);

        }
    );

});


/* Mobile menu */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Mobile menu links */

if (mobileMenu) {

    mobileMenu
        .querySelectorAll(
            ".mobile-nav-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* Bottom More */

if (bottomMenuButton) {

    bottomMenuButton.addEventListener(
        "click",
        handleBottomMenu
    );

}


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* Resize */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeApp() {

    updateClearButton();

    updateFilterButtons();

    updatePreview();

    setupNavigation();

}


/* Start */

initializeApp();
          
