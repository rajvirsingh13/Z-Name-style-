/* =========================================================
   Z-NAME STYLE
   COMPLETE WORKING SCRIPT.JS
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
let toastTimer = null;


/* =========================================================
   STYLISH FONT MAPS
   ========================================================= */

const fontStyles = {

    bold: {
        name: "Bold",
        category: "fancy",
        transform: text => convertMathText(text, "bold")
    },

    boldItalic: {
        name: "Bold Italic",
        category: "fancy",
        transform: text => convertMathText(text, "boldItalic")
    },

    italic: {
        name: "Italic",
        category: "fancy",
        transform: text => convertMathText(text, "italic")
    },

    script: {
        name: "Script",
        category: "fancy",
        transform: text => convertMathText(text, "script")
    },

    boldScript: {
        name: "Bold Script",
        category: "fancy",
        transform: text => convertMathText(text, "boldScript")
    },

    fraktur: {
        name: "Fraktur",
        category: "dark",
        transform: text => convertMathText(text, "fraktur")
    },

    boldFraktur: {
        name: "Bold Fraktur",
        category: "dark",
        transform: text => convertMathText(text, "boldFraktur")
    },

    doubleStruck: {
        name: "Double Struck",
        category: "cool",
        transform: text => convertMathText(text, "doubleStruck")
    },

    sans: {
        name: "Sans",
        category: "cool",
        transform: text => convertMathText(text, "sans")
    },

    sansBold: {
        name: "Sans Bold",
        category: "cool",
        transform: text => convertMathText(text, "sansBold")
    },

    sansItalic: {
        name: "Sans Italic",
        category: "cool",
        transform: text => convertMathText(text, "sansItalic")
    },

    sansBoldItalic: {
        name: "Sans Bold Italic",
        category: "cool",
        transform: text => convertMathText(text, "sansBoldItalic")
    },

    monospace: {
        name: "Monospace",
        category: "gaming",
        transform: text => convertMathText(text, "monospace")
    }

};


/* =========================================================
   UNICODE FONT CONVERTER
   ========================================================= */

const normalUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const normalLower = "abcdefghijklmnopqrstuvwxyz";
const normalNumbers = "0123456789";

const unicodeSets = {

    bold: {
        upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
        lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
        numbers: "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    },

    boldItalic: {
        upper: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
        lower: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
        numbers: "0123456789"
    },

    italic: {
        upper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
        lower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
        numbers: "0123456789"
    },

    script: {
        upper: "𝒜𝐵𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
        lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
        numbers: "0123456789"
    },

    boldScript: {
        upper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩".toUpperCase(),
        lower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃",
        numbers: "0123456789"
    },

    fraktur: {
        upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
        lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
        numbers: "0123456789"
    },

    boldFraktur: {
        upper: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅",
        lower: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟",
        numbers: "0123456789"
    },

    doubleStruck: {
        upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
        lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
        numbers: "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
    },

    sans: {
        upper: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹",
        lower: "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓",
        numbers: "0123456789"
    },

    sansBold: {
        upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
        lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
        numbers: "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
    },

    sansItalic: {
        upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
        lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
        numbers: "0123456789"
    },

    sansBoldItalic: {
        upper: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕",
        lower: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯",
        numbers: "0123456789"
    },

    monospace: {
        upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
        lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
        numbers: "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
    }

};


/* =========================================================
   CONVERT TEXT TO UNICODE STYLE
   ========================================================= */

function convertMathText(text, style) {

    const set = unicodeSets[style];

    if (!set) {
        return text;
    }

    let output = "";

    for (const character of text) {

        const upperIndex = normalUpper.indexOf(character);

        if (upperIndex !== -1) {
            output += set.upper[upperIndex] || character;
            continue;
        }

        const lowerIndex = normalLower.indexOf(character);

        if (lowerIndex !== -1) {
            output += set.lower[lowerIndex] || character;
            continue;
        }

        const numberIndex = normalNumbers.indexOf(character);

        if (numberIndex !== -1) {
            output += set.numbers[numberIndex] || character;
            continue;
        }

        output += character;
    }

    return output;
}


/* =========================================================
   EXTRA STYLE GENERATORS
   ========================================================= */

function createDecoratedStyles(name) {

    return [

        {
            text: `꧁༺ ${name} ༻꧂`,
            category: "symbols",
            label: "Royal Frame"
        },

        {
            text: `★彡 ${name} 彡★`,
            category: "gaming",
            label: "Star Gaming"
        },

        {
            text: `亗 ${name} 亗`,
            category: "gaming",
            label: "Warrior"
        },

        {
            text: `『${name}』`,
            category: "cool",
            label: "Box Style"
        },

        {
            text: `乂 ${name} 乂`,
            category: "gaming",
            label: "X Warrior"
        },

        {
            text: `ツ ${name} ツ`,
            category: "gaming",
            label: "Smile Gaming"
        },

        {
            text: `♛ ${name} ♛`,
            category: "royal",
            label: "King Style"
        },

        {
            text: `♡ ${name} ♡`,
            category: "love",
            label: "Love Style"
        },

        {
            text: `༺ ${name} ༻`,
            category: "fancy",
            label: "Elegant"
        },

        {
            text: `彡 ${name} 彡`,
            category: "cool",
            label: "Speed Style"
        },

        {
            text: `࿐ ${name} ࿐`,
            category: "fancy",
            label: "Classic"
        },

        {
            text: `☠︎ ${name} ☠︎`,
            category: "dark",
            label: "Dark Style"
        },

        {
            text: `⚡ ${name} ⚡`,
            category: "cool",
            label: "Electric"
        },

        {
            text: `♥ ${name} ♥`,
            category: "love",
            label: "Heart"
        },

        {
            text: `♚ ${name} ♚`,
            category: "royal",
            label: "Crown"
        },

        {
            text: `乂『${name}』乂`,
            category: "gaming",
            label: "Pro Gamer"
        },

        {
            text: `꧁${name}꧂`,
            category: "fancy",
            label: "Fancy Frame"
        },

        {
            text: `『亗 ${name} 亗』`,
            category: "gaming",
            label: "Elite"
        }

    ];
}


/* =========================================================
   CREATE ALL RESULTS
   ========================================================= */

function generateStyles(name) {

    const styles = [];

    Object.keys(fontStyles).forEach(key => {

        const style = fontStyles[key];

        styles.push({
            text: style.transform(name),
            category: style.category,
            label: style.name
        });

    });

    styles.push(...createDecoratedStyles(name));

    return styles;
}


/* =========================================================
   CATEGORY FILTER MATCHING
   ========================================================= */

function categoryMatches(item, filter) {

    if (filter === "all") {
        return true;
    }

    if (filter === "fancy") {
        return [
            "fancy",
            "cool",
            "royal"
        ].includes(item.category);
    }

    if (filter === "gaming") {
        return item.category === "gaming";
    }

    if (filter === "attitude") {
        return [
            "gaming",
            "dark",
            "cool"
        ].includes(item.category);
    }

    if (filter === "symbols") {
        return item.category === "symbols";
    }

    return item.category === filter;
}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults(styles, filter = "all") {

    if (!resultsContainer) {
        return;
    }

    resultsContainer.innerHTML = "";

    const filteredStyles = styles.filter(item =>
        categoryMatches(item, filter)
    );

    if (filteredStyles.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty-results">
                <div class="empty-results-icon">✨</div>
                <h3>No styles found</h3>
                <p>Try another category.</p>
            </div>
        `;

        return;
    }

    filteredStyles.forEach((item, index) => {

        const card = document.createElement("article");

        card.className = "result-card";

        card.dataset.category = item.category;

        card.innerHTML = `
            <div class="result-card-top">
                <span class="result-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="result-category">
                    ${escapeHTML(capitalize(item.category))}
                </span>
            </div>

            <div class="result-style-name">
                ${escapeHTML(item.text)}
            </div>

            <div class="result-card-bottom">

                <span class="result-style-label">
                    ${escapeHTML(item.label)}
                </span>

                <button
                    type="button"
                    class="copy-result-button"
                    data-copy="${escapeAttribute(item.text)}"
                >
                    <span>📋</span>
                    Copy
                </button>

            </div>
        `;

        resultsContainer.appendChild(card);
    });
}


/* =========================================================
   GENERATE NAME
   ========================================================= */

function generateName() {

    const value = nameInput.value.trim();

    if (!value) {

        showToast(
            "Please enter your name",
            "error"
        );

        nameInput.focus();

        return;
    }

    currentName = value;

    previewSection.hidden = false;

    previewName.textContent = value;

    resultsSection.hidden = false;

    const styles = generateStyles(value);

    currentFilter = "all";

    renderResults(styles, currentFilter);

    updateFilterButtons();

    if (resultsTitle) {
        resultsTitle.textContent = `Stylish Names for ${value}`;
    }

    setTimeout(() => {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (nameForm) {

    nameForm.addEventListener("submit", function(event) {

        event.preventDefault();

        generateName();

    });

}


/* =========================================================
   LIVE PREVIEW
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("input", function() {

        const value = this.value.trim();

        if (clearName) {
            clearName.hidden = value.length === 0;
        }

        if (previewSection && previewName) {

            if (value.length > 0) {

                previewSection.hidden = false;
                previewName.textContent = value;

            } else {

                previewSection.hidden = true;

            }

        }

    });

}


/* =========================================================
   CLEAR INPUT
   ========================================================= */

if (clearName) {

    clearName.addEventListener("click", function() {

        nameInput.value = "";

        clearName.hidden = true;

        if (previewSection) {
            previewSection.hidden = true;
        }

        nameInput.focus();

    });

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

        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );

    });

}


if (styleFilters) {

    styleFilters.addEventListener("click", function(event) {

        const button = event.target.closest(".filter-button");

        if (!button) {
            return;
        }

        currentFilter = button.dataset.filter || "all";

        updateFilterButtons();

        if (!currentName) {
            return;
        }

        const styles = generateStyles(currentName);

        renderResults(
            styles,
            currentFilter
        );

    });

}


/* =========================================================
   COPY GENERATED RESULT
   ========================================================= */

if (resultsContainer) {

    resultsContainer.addEventListener("click", function(event) {

        const button = event.target.closest(
            ".copy-result-button"
        );

        if (!button) {
            return;
        }

        const text = button.dataset.copy;

        if (!text) {
            return;
        }

        copyText(text);

        button.classList.add("copied");

        const originalHTML = button.innerHTML;

        button.innerHTML = `
            <span>✓</span>
            Copied
        `;

        setTimeout(() => {

            button.classList.remove("copied");

            button.innerHTML = originalHTML;

        }, 1500);

    });

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

if (symbolsGrid) {

    symbolsGrid.addEventListener("click", function(event) {

        const button = event.target.closest(
            ".symbol-card"
        );

        if (!button) {
            return;
        }

        const symbol = button.dataset.symbol;

        if (!symbol) {
            return;
        }

        copyText(symbol);

        button.classList.add("copied");

        setTimeout(() => {

            button.classList.remove("copied");

        }, 1200);

    });

}


/* =========================================================
   COPY FUNCTION
   ========================================================= */

async function copyText(text) {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(text);

        } else {

            fallbackCopy(text);

        }

        showToast(
            "Copied successfully!",
            "success"
        );

    } catch (error) {

        try {

            fallbackCopy(text);

            showToast(
                "Copied successfully!",
                "success"
            );

        } catch (fallbackError) {

            showToast(
                "Unable to copy",
                "error"
            );

        }

    }

}


/* =========================================================
   FALLBACK COPY
   ========================================================= */

function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";

    textarea.setAttribute("readonly", "");

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const successful = document.execCommand("copy");

    document.body.removeChild(textarea);

    if (!successful) {
        throw new Error("Copy failed");
    }

}


/* =========================================================
   TRENDING STYLE BUTTONS
   ========================================================= */

const useStyleButtons = document.querySelectorAll(
    ".use-style-button"
);

useStyleButtons.forEach(button => {

    button.addEventListener("click", function() {

        const template = this.dataset.template;

        if (!template) {
            return;
        }

        const name = nameInput.value.trim();

        if (!name) {

            nameInput.focus();

            showToast(
                "Enter your name first",
                "error"
            );

            return;
        }

        const styledName = template.replace(
            "{name}",
            name
        );

        copyText(styledName);

        previewSection.hidden = false;

        previewName.textContent = styledName;

    });

});


/* =========================================================
   CATEGORY CARDS
   ========================== */

const categoryCards = document.querySelectorAll(
    ".category-card"
);

categoryCards.forEach(card => {

    card.addEventListener("click", function() {

        const category = this.dataset.category;

        if (!category) {
            return;
        }

        if (!nameInput.value.trim()) {

            nameInput.focus();

            showToast(
                "Enter your name first",
                "error"
            );

            return;
        }

        currentName = nameInput.value.trim();

        previewSection.hidden = false;
        resultsSection.hidden = false;

        previewName.textContent = currentName;

        const styles = generateStyles(currentName);

        currentFilter = category;

        renderResults(
            styles,
            currentFilter
        );

        if (resultsTitle) {

            resultsTitle.textContent =
                `${capitalize(category)} Names for ${currentName}`;

        }

        if (styleFilters) {

            const matchingButton =
                styleFilters.querySelector(
                    `[data-filter="${category}"]`
                );

            if (matchingButton) {

                currentFilter = category;

                updateFilterButtons();

            }

        }

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    if (!mobileMenu) {
        return;
    }

    const isOpen =
        mobileMenu.classList.toggle("open");

    if (mobileMenuButton) {

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


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* =========================================================
   MOBILE MENU LINKS
   ========================================================= */

if (mobileMenu) {

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", function() {

                mobileMenu.classList.remove("open");

                if (mobileMenuButton) {

                    mobileMenuButton.classList.remove(
                        "active"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        });

}


/* =========================================================
   BOTTOM MORE MENU
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
   CLOSE MOBILE MENU OUTSIDE
   ========================================================= */

document.addEventListener("click", function(event) {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    const clickedInsideMenu =
        mobileMenu.contains(event.target);

    const clickedButton =
        mobileMenuButton.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedButton &&
        mobileMenu.classList.contains("open")
    ) {

        mobileMenu.classList.remove("open");

        mobileMenuButton.classList.remove(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message, type = "success") {

    if (!toast) {
        return;
    }

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.remove(
        "show",
        "success",
        "error"
    );

    toast.classList.add(type);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   FAQ IMPROVEMENT
   ========================================================= */

const faqItems = document.querySelectorAll(
    ".faq-item"
);

faqItems.forEach(item => {

    item.addEventListener("toggle", function() {

        if (!this.open) {
            return;
        }

        faqItems.forEach(otherItem => {

            if (
                otherItem !== this &&
                otherItem.open
            ) {

                otherItem.open = false;

            }

        });

    });

});


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", function(event) {

        const targetID =
            this.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navigationLinks = document.querySelectorAll(
    ".desktop-nav .nav-link"
);

const sections = document.querySelectorAll(
    "main section[id]"
);

if (
    navigationLinks.length > 0 &&
    sections.length > 0
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    navigationLinks.forEach(link => {

                        const href =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        document.activeElement === nameInput &&
        !event.shiftKey
    ) {

        event.preventDefault();

        generateName();

    }

    if (
        event.key === "Escape" &&
        mobileMenu &&
        mobileMenu.classList.contains("open")
    ) {

        mobileMenu.classList.remove("open");

        if (mobileMenuButton) {

            mobileMenuButton.classList.remove(
                "active"
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* =========================================================
   HTML ESCAPE HELPERS
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


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

    return value.charAt(0).toUpperCase() +
        value.slice(1);

}


/* =========================================================
   INITIAL SETUP
   ========================================================= */

function initializeApp() {

    if (clearName && nameInput) {

        clearName.hidden =
            nameInput.value.trim().length === 0;

    }

    updateFilterButtons();

    if (previewSection) {
        previewSection.hidden = true;
    }

    if (resultsSection) {
        resultsSection.hidden = true;
    }

}


/* =========================================================
   START APPLICATION
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}


/* =========================================================
   END OF SCRIPT
   ========================================================= */
