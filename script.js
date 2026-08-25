document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =========================================================
       Z-NAME STYLE
       NEW SCRIPT.JS
       300+ DYNAMIC NAME STYLES
       PART 1 — CORE + STYLE ENGINE
       ========================================================= */


    /* =========================================================
       DOM ELEMENTS
       ========================================================= */

    const nameForm =
        document.getElementById("nameForm");

    const nameInput =
        document.getElementById("nameInput");

    const clearName =
        document.getElementById("clearName");

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
       STATE
       ========================================================= */

    let currentName = "";

    let activeFilter = "all";

    let generatedStyles = [];


    /* =========================================================
       BASIC HELPERS
       ========================================================= */

    function cleanName(value) {

        return String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 30);

    }


    function escapeHTML(value) {

        const element =
            document.createElement("div");

        element.textContent = value;

        return element.innerHTML;

    }


    /* =========================================================
       UNICODE FONT MAPS
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


    const italicUpper = [
        "𝐴","𝐵","𝐶","𝐷","𝐸","𝐹","𝐺","𝐻","𝐼","𝐽",
        "𝐾","𝐿","𝑀","𝑁","𝑂","𝑃","𝑄","𝑅","𝑆","𝑇",
        "𝑈","𝑉","𝑊","𝑋","𝑌","𝑍"
    ];

    const italicLower = [
        "𝑎","𝑏","𝑐","𝑑","𝑒","𝑓","𝑔","ℎ","𝑖","𝑗",
        "𝑘","𝑙","𝑚","𝑛","𝑜","𝑝","𝑞","𝑟","𝑠","𝑡",
        "𝑢","𝑣","𝑤","𝑥","𝑦","𝑧"
    ];


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


    const doubleUpper = [
        "𝔸","𝔹","ℂ","𝔻","𝔼","𝔽","𝔾","ℍ","𝕀","𝕁",
        "𝕂","𝕃","𝕄","ℕ","𝕆","ℙ","ℚ","ℝ","𝕊","𝕋",
        "𝕌","𝕍","𝕎","𝕏","𝕐","ℤ"
    ];

    const doubleLower = [
        "𝕒","𝕓","𝕔","𝕕","𝕖","𝕗","𝕘","𝕙","𝕚","𝕛",
        "𝕜","𝕝","𝕞","𝕟","𝕠","𝕡","𝕢","𝕣","𝕤","𝕥",
        "𝕦","𝕧","𝕨","𝕩","𝕪","𝕫"
    ];


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


    /* =========================================================
       FONT CONVERTER
       ========================================================= */

    function convertFont(text, upperMap, lowerMap) {

        return text
            .split("")
            .map(function (character) {

                const code =
                    character.charCodeAt(0);

                if (
                    code >= 65 &&
                    code <= 90
                ) {

                    return upperMap[code - 65];

                }

                if (
                    code >= 97 &&
                    code <= 122
                ) {

                    return lowerMap[code - 97];

                }

                return character;

            })
            .join("");

    }


    function toBold(text) {

        return convertFont(
            text,
            boldUpper,
            boldLower
        );

    }


    function toItalic(text) {

        return convertFont(
            text,
            italicUpper,
            italicLower
        );

    }


    function toMono(text) {

        return convertFont(
            text,
            monoUpper,
            monoLower
        );

    }


    function toDouble(text) {

        return convertFont(
            text,
            doubleUpper,
            doubleLower
        );

    }


    function toScript(text) {

        return convertFont(
            text,
            scriptUpper,
            scriptLower
        );

    }


    /* =========================================================
       SMALL CAPS
       ========================================================= */

    const smallCaps = {

        a:"ᴀ",
        b:"ʙ",
        c:"ᴄ",
        d:"ᴅ",
        e:"ᴇ",
        f:"ғ",
        g:"ɢ",
        h:"ʜ",
        i:"ɪ",
        j:"ᴊ",
        k:"ᴋ",
        l:"ʟ",
        m:"ᴍ",
        n:"ɴ",
        o:"ᴏ",
        p:"ᴘ",
        q:"ǫ",
        r:"ʀ",
        s:"s",
        t:"ᴛ",
        u:"ᴜ",
        v:"ᴠ",
        w:"ᴡ",
        x:"x",
        y:"ʏ",
        z:"ᴢ"

    };


    function toSmallCaps(text) {

        return text
            .toLowerCase()
            .split("")
            .map(function (character) {

                return (
                    smallCaps[character] ||
                    character
                );

            })
            .join("");

    }


    /* =========================================================
       STRIKE / UNDERLINE / SPACING
       ========================================================= */

    function addStrike(text) {

        return text
            .split("")
            .map(function (character) {

                return character + "̶";

            })
            .join("");

    }


    function addUnderline(text) {

        return text
            .split("")
            .map(function (character) {

                return character + "̲";

            })
            .join("");

    }


    function spaced(text) {

        return text
            .split("")
            .join(" ");

    }


    function dotted(text) {

        return text
            .split("")
            .join("・");

    }


    function starSpaced(text) {

        return text
            .split("")
            .join("★");

    }


    /* =========================================================
       STYLE COLLECTION
       ========================================================= */

    generatedStyles = [];


    function addStyle(
        category,
        title,
        value
    ) {

        if (!value) {
            return;
        }

        generatedStyles.push({

            category: category,

            title: title,

            value: value

        });

    }


    /* =========================================================
       FANCY FONT STYLES
       ========================================================= */

    function createFancyStyles(name) {

        addStyle(
            "fancy",
            "Bold",
            toBold(name)
        );

        addStyle(
            "fancy",
            "Italic",
            toItalic(name)
        );

        addStyle(
            "fancy",
            "Monospace",
            toMono(name)
        );

        addStyle(
            "fancy",
            "Double",
            toDouble(name)
        );

        addStyle(
            "fancy",
            "Elegant Script",
            toScript(name)
        );

        addStyle(
            "fancy",
            "Small Caps",
            toSmallCaps(name)
        );

        addStyle(
            "fancy",
            "Bold Spaced",
            toBold(spaced(name))
        );

        addStyle(
            "fancy",
            "Italic Spaced",
            toItalic(spaced(name))
        );

        addStyle(
            "fancy",
            "Bold Dotted",
            toBold(dotted(name))
        );

        addStyle(
            "fancy",
            "Double Spaced",
            toDouble(spaced(name))
        );

        addStyle(
            "fancy",
            "Script Spaced",
            toScript(spaced(name))
        );

        addStyle(
            "fancy",
            "Underline",
            addUnderline(name)
        );

        addStyle(
            "fancy",
            "Strike",
            addStrike(name)
        );

        addStyle(
            "fancy",
            "Bold Underline",
            addUnderline(toBold(name))
        );

        addStyle(
            "fancy",
            "Italic Underline",
            addUnderline(toItalic(name))
        );

    }


    /* =========================================================
       DECORATION SETS
       ========================================================= */

    const decorations = [

        ["★", "★"],
        ["☆", "☆"],
        ["✦", "✦"],
        ["✧", "✧"],
        ["✪", "✪"],
        ["✯", "✯"],
        ["✰", "✰"],
        ["⚡", "⚡"],
        ["亗", "亗"],
        ["乂", "乂"],
        ["ツ", "ツ"],
        ["彡", "彡"],
        ["〆", "〆"],
        ["么", "么"],
        ["々", "々"],
        ["メ", "メ"],
        ["シ", "シ"],
        ["乛", "乛"],
        ["♛", "♛"],
        ["♕", "♕"],
        ["♔", "♔"],
        ["♚", "♚"],
        ["♡", "♡"],
        ["♥", "♥"],
        ["☠", "☠"],
        ["☾", "☽"],
        ["☽", "☾"],
        ["❖", "❖"],
        ["◆", "◆"],
        ["◇", "◇"],
        ["●", "●"],
        ["○", "○"],
        ["✿", "✿"],
        ["❀", "❀"],
        ["❁", "❁"],
        ["🌸", "🌸"],
        ["🔥", "🔥"],
        ["👑", "👑"],
        ["⚔", "⚔"],
        ["♠", "♠"],
        ["♣", "♣"],
        ["♦", "♦"],
        ["♠️", "♠️"],
        ["☯", "☯"],
        ["☮", "☮"],
        ["☪", "☪"],
        ["∞", "∞"],
        ["⚜", "⚜"],
        ["༺", "༻"],
        ["༒", "༒"],
        ["࿐", "࿐"]

    ];


    /* =========================================================
       DECORATED STYLES
       ========================================================= */

    function createDecorationStyles(name) {

        decorations.forEach(
            function (pair, index) {

                addStyle(
                    "symbols",
                    "Decorated " + (index + 1),
                    pair[0] +
                    " " +
                    name +
                    " " +
                    pair[1]
                );

            }
        );

    }


    /* =========================================================
       BOX STYLES
       ========================================================= */

    const boxes = [

        ["『", "』"],
        ["【", "】"],
        ["〖", "〗"],
        ["〘", "〙"],
        ["〚", "〛"],
        ["〈", "〉"],
        ["《", "》"],
        ["「", "」"],
        ["『", "』"],
        ["〔", "〕"],
        ["〝", "〞"],
        ["⟦", "⟧"],
        ["⟨", "⟩"],
        ["❲", "❳"],
        ["❬", "❭"],
        ["꧁", "꧂"],
        ["༺", "༻"],
        ["༼", "༽"],
        ["╰", "╯"],
        ["╭", "╮"],
        ["╔", "╗"],
        ["╚", "╝"],
        ["▌", "▐"],
        ["◥", "◤"],
        ["◢", "◣"]

    ];


    function createBoxStyles(name) {

        boxes.forEach(
            function (pair, index) {

                addStyle(
                    "symbols",
                    "Frame " + (index + 1),
                    pair[0] +
                    name +
                    pair[1]
                );

            }
        );

    }


    /* =========================================================
       GAMING STYLES
       ========================================================= */

    function createGamingStyles(name) {

        const gamingPrefixes = [

            "亗 ",
            "乂 ",
            "〆 ",
            "么 ",
            "メ ",
            "シ ",
            "ツ ",
            "彡 ",
            "乛 ",
            "々 ",
            "⚔ ",
            "☠ ",
            "♠ ",
            "⚡ ",
            "🔥 ",
            "🎯 ",
            "👑 ",
            "☢ ",
            "☣ ",
            "༒ ",
            "꧁༺ ",
            "『 ",
            "【 ",
            "◥ ",
            "╰ "

        ];

        const gamingSuffixes = [

            " 亗",
            " 乂",
            " 〆",
            " 么",
            " メ",
            " シ",
            " ツ",
            " 彡",
            " 乛",
            " 々",
            " ⚔",
            " ☠",
            " ♠",
            " ⚡",
            " 🔥",
            " 🎯",
            " 👑",
            " ☢",
            " ☣",
            " ༒",
            " ༻꧂",
            " 』",
            " 】",
            " ◤",
            " ╯"

        ];


        for (
            let i = 0;
            i < gamingPrefixes.length;
            i++
        ) {

            addStyle(
                "gaming",
                "Gaming " + (i + 1),
                gamingPrefixes[i] +
                name +
                gamingSuffixes[i]
            );

        }

    }


    /* =========================================================
       ATTITUDE STYLES
       ========================================================= */

    function createAttitudeStyles(name) {

        const attitude = [

            "★彡 " + name + " 彡★",
            "乂 " + name + " 乂",
            "么 " + name + " 么",
            "⚡ " + name + " ⚡",
            "☠ " + name + " ☠",
            "♛ " + name + " ♛",
            "👑 " + name + " 👑",
            "亗 " + name + " 亗",
            "『 " + name + " 』",
            "【 " + name + " 】",
            "〆 " + name + " 〆",
            "メ " + name + " メ",
            "彡 " + name + " 彡",
            "ツ " + name + " ツ",
            "༒ " + name + " ༒",
            "⚔ " + name + " ⚔",
            "🔥 " + name + " 🔥",
            "☢ " + name + " ☢",
            "☣ " + name + " ☣",
            "♠ " + name + " ♠",
            "♣ " + name + " ♣",
            "♦ " + name + " ♦",
            "★ " + name + " ★",
            "✦ " + name + " ✦",
            "✯ " + name + " ✯",
            "❖ " + name + " ❖",
            "∞ " + name + " ∞",
            "⚜ " + name + " ⚜",
            "☯ " + name + " ☯",
            "☮ " + name + " ☮",
            "꧁༺ " + name + " ༻꧂",
            "『亗 " + name + " 亗』",
            "【乂 " + name + " 乂】",
            "★亗 " + name + " 亗★",
            "⚡亗 " + name + " 亗⚡",
            "☠亗 " + name + " 亗☠",
            "♛亗 " + name + " 亗♛",
            "༒亗 " + name + " 亗༒",
            "彡乂 " + name + " 乂彡",
            "メ〆 " + name + " 〆メ"

        ];


        attitude.forEach(
            function (value, index) {

                addStyle(
                    "attitude",
                    "Attitude " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       PART 1 CONTINUES IN PART 2
       =========================================================
       
       IMPORTANT:
       Do not add another <script> tag.
       Part 2 will continue this same file.
       
       ========================================================= */

});
    /* =========================================================
       ROYAL STYLES
       ========================================================= */

    function createRoyalStyles(name) {

        const royal = [

            "♛ " + name + " ♛",
            "♕ " + name + " ♕",
            "♔ " + name + " ♔",
            "♚ " + name + " ♚",
            "👑 " + name + " 👑",
            "♛༺ " + name + " ༻♛",
            "꧁♛ " + name + " ♛꧂",
            "꧁♕ " + name + " ♕꧂",
            "『♛ " + name + " ♛』",
            "【♔ " + name + " ♔】",
            "亗♛ " + name + " ♛亗",
            "༺♛ " + name + " ♛༻",
            "⚜ " + name + " ⚜",
            "⚜♛ " + name + " ♛⚜",
            "♛★ " + name + " ★♛",
            "♕✦ " + name + " ✦♕",
            "👑亗 " + name + " 亗👑",
            "♔༒ " + name + " ༒♔",
            "♚⚡ " + name + " ⚡♚",
            "꧁༺♛ " + name + " ♛༻꧂",
            "╰♛ " + name + " ♛╯",
            "╭♕ " + name + " ♕╮",
            "『👑 " + name + " 👑』",
            "【👑 " + name + " 👑】",
            "★♛ " + name + " ♛★",
            "✦♕ " + name + " ♕✦",
            "❖♛ " + name + " ♛❖",
            "༒♚ " + name + " ♚༒",
            "亗👑 " + name + " 👑亗",
            "♛∞ " + name + " ∞♛"

        ];

        royal.forEach(
            function (value, index) {

                addStyle(
                    "royal",
                    "Royal " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       LOVE STYLES
       ========================================================= */

    function createLoveStyles(name) {

        const love = [

            "♡ " + name + " ♡",
            "♥ " + name + " ♥",
            "❤ " + name + " ❤",
            "💕 " + name + " 💕",
            "💖 " + name + " 💖",
            "💗 " + name + " 💗",
            "💘 " + name + " 💘",
            "💝 " + name + " 💝",
            "❣ " + name + " ❣",
            "ღ " + name + " ღ",
            "♡彡 " + name + " 彡♡",
            "♥彡 " + name + " 彡♥",
            "꧁♡ " + name + " ♡꧂",
            "꧁♥ " + name + " ♥꧂",
            "『♡ " + name + " ♡』",
            "【♥ " + name + " ♥】",
            "♡亗 " + name + " 亗♡",
            "♥亗 " + name + " 亗♥",
            "༺♡ " + name + " ♡༻",
            "༺♥ " + name + " ♥༻",
            "★♡ " + name + " ♡★",
            "✦♥ " + name + " ♥✦",
            "❖♡ " + name + " ♡❖",
            "🌸♡ " + name + " ♡🌸",
            "🌹 " + name + " 🌹",
            "💞 " + name + " 💞",
            "💓 " + name + " 💓",
            "💟 " + name + " 💟",
            "💌 " + name + " 💌",
            "💕♡ " + name + " ♡💕"

        ];

        love.forEach(
            function (value, index) {

                addStyle(
                    "love",
                    "Love " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       COOL STYLES
       ========================================================= */

    function createCoolStyles(name) {

        const cool = [

            "★ " + name + " ★",
            "☆ " + name + " ☆",
            "✦ " + name + " ✦",
            "✧ " + name + " ✧",
            "✯ " + name + " ✯",
            "✰ " + name + " ✰",
            "❖ " + name + " ❖",
            "◆ " + name + " ◆",
            "◇ " + name + " ◇",
            "⚡ " + name + " ⚡",
            "∞ " + name + " ∞",
            "☯ " + name + " ☯",
            "☮ " + name + " ☮",
            "⚜ " + name + " ⚜",
            "亗 " + name + " 亗",
            "乂 " + name + " 乂",
            "ツ " + name + " ツ",
            "彡 " + name + " 彡",
            "メ " + name + " メ",
            "〆 " + name + " 〆",
            "么 " + name + " 么",
            "々 " + name + " 々",
            "★彡 " + name + " 彡★",
            "✦彡 " + name + " 彡✦",
            "亗★ " + name + " ★亗",
            "⚡亗 " + name + " 亗⚡",
            "❖亗 " + name + " 亗❖",
            "꧁ " + name + " ꧂",
            "༺ " + name + " ༻",
            "『 " + name + " 』"

        ];

        cool.forEach(
            function (value, index) {

                addStyle(
                    "cool",
                    "Cool " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       DARK STYLES
       ========================================================= */

    function createDarkStyles(name) {

        const dark = [

            "☠ " + name + " ☠",
            "💀 " + name + " 💀",
            "☣ " + name + " ☣",
            "☢ " + name + " ☢",
            "༒ " + name + " ༒",
            "♠ " + name + " ♠",
            "♤ " + name + " ♤",
            "⚔ " + name + " ⚔",
            "🖤 " + name + " 🖤",
            "☾ " + name + " ☽",
            "☽ " + name + " ☾",
            "亗☠ " + name + " ☠亗",
            "꧁☠ " + name + " ☠꧂",
            "꧁༒ " + name + " ༒꧂",
            "『☠ " + name + " ☠』",
            "【☠ " + name + " ☠】",
            "༺☠ " + name + " ☠༻",
            "༺༒ " + name + " ༒༻",
            "★☠ " + name + " ☠★",
            "✦☠ " + name + " ☠✦",
            "⚔亗 " + name + " 亗⚔",
            "☢亗 " + name + " 亗☢",
            "☣亗 " + name + " 亗☣",
            "♠༒ " + name + " ༒♠",
            "☾༒ " + name + " ༒☽"

        ];

        dark.forEach(
            function (value, index) {

                addStyle(
                    "dark",
                    "Dark " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       CUTE STYLES
       ========================================================= */

    function createCuteStyles(name) {

        const cute = [

            "🌸 " + name + " 🌸",
            "🌷 " + name + " 🌷",
            "🌺 " + name + " 🌺",
            "🌼 " + name + " 🌼",
            "🦋 " + name + " 🦋",
            "🐰 " + name + " 🐰",
            "🐻 " + name + " 🐻",
            "🐼 " + name + " 🐼",
            "🐨 " + name + " 🐨",
            "♡ " + name + " ♡",
            "ღ " + name + " ღ",
            "꒰ " + name + " ꒱",
            "꒰ა " + name + " ໒꒱",
            "୨♡୧ " + name + " ୨♡୧",
            "꧁♡ " + name + " ♡꧂",
            "『🌸 " + name + " 🌸』",
            "【🦋 " + name + " 🦋】",
            "♡彡 " + name + " 彡♡",
            "🌸彡 " + name + " 彡🌸",
            "🦋彡 " + name + " 彡🦋",
            "✿ " + name + " ✿",
            "❀ " + name + " ❀",
            "❁ " + name + " ❁",
            "✾ " + name + " ✾",
            "💗 " + name + " 💗"

        ];

        cute.forEach(
            function (value, index) {

                addStyle(
                    "cute",
                    "Cute " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       EXTRA FANCY DECORATION COMBINATIONS
       ========================================================= */

    function createExtraFancyStyles(name) {

        const fancyDecorations = [

            "꧁༺ " + toBold(name) + " ༻꧂",
            "꧁༺ " + toScript(name) + " ༻꧂",
            "꧁༺ " + toDouble(name) + " ༻꧂",
            "★彡 " + toBold(name) + " 彡★",
            "★彡 " + toScript(name) + " 彡★",
            "✦ " + toDouble(name) + " ✦",
            "亗 " + toBold(name) + " 亗",
            "『 " + toScript(name) + " 』",
            "【 " + toDouble(name) + " 】",
            "༺ " + toBold(name) + " ༻",
            "༒ " + toBold(name) + " ༒",
            "♛ " + toScript(name) + " ♛",
            "♡ " + toScript(name) + " ♡",
            "⚡ " + toBold(name) + " ⚡",
            "☠ " + toDouble(name) + " ☠",
            "✯ " + toScript(name) + " ✯",
            "❖ " + toDouble(name) + " ❖",
            "彡 " + toBold(name) + " 彡",
            "ツ " + toScript(name) + " ツ",
            "乂 " + toDouble(name) + " 乂"

        ];

        fancyDecorations.forEach(
            function (value, index) {

                addStyle(
                    "fancy",
                    "Fancy Design " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       GENERATE ALL STYLES
       ========================================================= */

    function generateAllStyles(name) {

        generatedStyles = [];

        createFancyStyles(name);

        createDecorationStyles(name);

        createBoxStyles(name);

        createGamingStyles(name);

        createAttitudeStyles(name);

        createRoyalStyles(name);

        createLoveStyles(name);

        createCoolStyles(name);

        createDarkStyles(name);

        createCuteStyles(name);

        createExtraFancyStyles(name);

        return generatedStyles;

    }


    /* =========================================================
       FILTER HELPERS
       ========================================================= */

    function getFilteredStyles() {

        if (activeFilter === "all") {

            return generatedStyles;

        }

        return generatedStyles.filter(
            function (style) {

                return style.category === activeFilter;

            }
        );

    }


    /* =========================================================
       RESULT CARD
       ========================================================= */

    function createResultCard(style, index) {

        const card =
            document.createElement("article");

        card.className =
            "result-card";

        card.dataset.category =
            style.category;

        card.innerHTML = `

            <div class="result-card-top">

                <span class="result-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="result-category">
                    ${escapeHTML(style.category)}
                </span>

            </div>

            <div class="result-style-name">
                ${escapeHTML(style.title)}
            </div>

            <div class="result-value">
                ${escapeHTML(style.value)}
            </div>

            <button
                type="button"
                class="copy-result-button"
                data-copy="${escapeHTML(style.value)}"
            >
                📋 Copy
            </button>

        `;

        return card;

    }


    /* =========================================================
       RENDER RESULTS
       ========================================================= */

    function renderResults() {

        if (!resultsContainer) {
            return;
        }

        const styles =
            getFilteredStyles();

        resultsContainer.innerHTML = "";

        if (!styles.length) {

            resultsContainer.innerHTML = `

                <div class="no-results">

                    <strong>No styles found</strong>

                    <p>
                        Try another category.
                    </p>

                </div>

            `;

            return;

        }

        const fragment =
            document.createDocumentFragment();

        styles.forEach(
            function (style, index) {

                fragment.appendChild(
                    createResultCard(
                        style,
                        index
                    )
                );

            }
        );

        resultsContainer.appendChild(
            fragment
        );

        if (resultsTitle) {

            resultsTitle.textContent =
                activeFilter === "all"
                    ? "Stylish Names"
                    : capitalize(
                        activeFilter
                    ) + " Names";

        }

    }


    /* =========================================================
       CAPITALIZE
       ========================================================= */

    function capitalize(value) {

        return String(value)
            .charAt(0)
            .toUpperCase() +
            String(value).slice(1);

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

                await navigator.clipboard.writeText(
                    text
                );

            } else {

                const textarea =
                    document.createElement("textarea");

                textarea.value = text;

                textarea.style.position =
                    "fixed";

                textarea.style.opacity =
                    "0";

                document.body.appendChild(
                    textarea
                );

                textarea.focus();

                textarea.select();

                document.execCommand(
                    "copy"
                );

                textarea.remove();

            }

            showToast(
                "Name copied!"
            );

        } catch (error) {

            showToast(
                "Copy failed. Try again."
            );

        }

    }


    /* =========================================================
       TOAST
       ========================================================= */

    let toastTimer = null;

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
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                1800
            );

    }


    /* =========================================================
       GENERATOR
       ========================================================= */

    function generateNames() {

        const name =
            cleanName(
                nameInput
                    ? nameInput.value
                    : ""
            );

        if (!name) {

            showToast(
                "Please enter your name."
            );

            if (nameInput) {
                nameInput.focus();
            }

            return;

        }

        currentName = name;

        activeFilter = "all";

        generateAllStyles(
            currentName
        );

        if (previewName) {

            previewName.textContent =
                currentName;

        }

        if (previewSection) {

            previewSection.hidden =
                false;

        }

        if (resultsSection) {

            resultsSection.hidden =
                false;

        }

        updateFilterButtons();

        renderResults();

        if (resultsSection) {

            setTimeout(
                function () {

                    resultsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                80
            );

        }

    }


    /* =========================================================
       FILTER BUTTON STATE
       ========================================================= */

    function updateFilterButtons() {

        if (!styleFilters) {
            return;
        }

        const buttons =
            styleFilters.querySelectorAll(
                ".filter-button"
            );

        buttons.forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.filter ===
                    activeFilter
                );

            }
        );

    }


    /* =========================================================
       PART 2 END
       =========================================================

       PART 3 will add:
       - Form events
       - Copy events
       - Symbol copy
       - Trending style buttons
       - Clear button
       - Mobile menu
       - Bottom menu
       - Final safety checks

       ========================================================= */
    /* =========================================================
       FORM SUBMIT
       ========================================================= */

    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                generateNames();

            }
        );

    }


    /* =========================================================
       INPUT EVENTS
       ========================================================= */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                const value =
                    cleanName(
                        nameInput.value
                    );

                if (clearName) {

                    clearName.hidden =
                        value.length === 0;

                }

            }
        );


        nameInput.addEventListener(
            "keydown",
            function (event) {

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
       CLEAR NAME
       ========================================================= */

    if (clearName) {

        clearName.addEventListener(
            "click",
            function () {

                if (nameInput) {

                    nameInput.value = "";

                    nameInput.focus();

                }

                clearName.hidden =
                    true;

                if (previewName) {

                    previewName.textContent =
                        "Your Name";

                }

            }
        );

    }


    /* =========================================================
       RESULT COPY BUTTONS
       ========================================================= */

    if (resultsContainer) {

        resultsContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".copy-result-button"
                    );

                if (!button) {
                    return;
                }

                const text =
                    button.dataset.copy || "";

                if (!text) {
                    return;
                }

                copyText(text);

                const originalText =
                    button.innerHTML;

                button.innerHTML =
                    "✓ Copied!";

                button.classList.add(
                    "copied"
                );

                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;

                        button.classList.remove(
                            "copied"
                        );

                    },
                    1400
                );

            }
        );

    }


    /* =========================================================
       FILTER BUTTONS
       ========================================================= */

    if (styleFilters) {

        styleFilters.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".filter-button"
                    );

                if (!button) {
                    return;
                }

                activeFilter =
                    button.dataset.filter ||
                    "all";

                updateFilterButtons();

                renderResults();

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

                    activeFilter =
                        category;

                    if (
                        !generatedStyles.length &&
                        nameInput &&
                        nameInput.value.trim()
                    ) {

                        generateNames();

                    }

                    if (
                        generatedStyles.length
                    ) {

                        updateFilterButtons();

                        renderResults();

                        if (resultsSection) {

                            resultsSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    } else {

                        if (nameInput) {

                            nameInput.focus();

                            nameInput.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }

                        showToast(
                            "Enter your name first."
                        );

                    }

                }
            );

        }
    );


    /* =========================================================
       SYMBOL COPY
       ========================================================= */

    if (symbolsGrid) {

        symbolsGrid.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".symbol-card"
                    );

                if (!button) {
                    return;
                }

                const symbol =
                    button.dataset.symbol || "";

                if (!symbol) {
                    return;
                }

                copyText(symbol);

                const small =
                    button.querySelector(
                        "small"
                    );

                if (small) {

                    const original =
                        small.textContent;

                    small.textContent =
                        "Copied!";

                    setTimeout(
                        function () {

                            small.textContent =
                                original;

                        },
                        1200
                    );

                }

            }
        );

    }


    /* =========================================================
       TRENDING STYLE BUTTONS
       ========================================================= */

    const useStyleButtons =
        document.querySelectorAll(
            ".use-style-button"
        );


    useStyleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const template =
                        button.dataset.template || "";

                    if (!template) {
                        return;
                    }

                    if (nameInput) {

                        const name =
                            cleanName(
                                nameInput.value
                            );

                        if (!name) {

                            nameInput.focus();

                            nameInput.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                            showToast(
                                "Enter your name first."
                            );

                            return;

                        }

                        const styled =
                            template.replace(
                                "{name}",
                                name
                            );

                        copyText(styled);

                        showToast(
                            "Style copied!"
                        );

                        return;

                    }

                }
            );

        }
    );


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
            function () {

                toggleMobileMenu();

            }
        );

    }


    /* =========================================================
       MOBILE NAV LINKS
       ========================================================= */

    const mobileNavLinks =
        document.querySelectorAll(
            ".mobile-nav-link"
        );


    mobileNavLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );


    /* =========================================================
       BOTTOM MENU
       ========================================================= */

    if (bottomMenuButton) {

        bottomMenuButton.addEventListener(
            "click",
            function () {

                toggleMobileMenu();

            }
        );

    }


    /* =========================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (!mobileMenu) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );

            const clickedMenuButton =
                mobileMenuButton &&
                mobileMenuButton.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =========================================================
       ESC KEY
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =========================================================
       SMOOTH ANCHOR SCROLL
       ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    'a[href^="#"]'
                );

            if (!link) {
                return;
            }

            const href =
                link.getAttribute(
                    "href"
                );

            if (
                !href ||
                href === "#"
            ) {

                return;

            }

            const target =
                document.querySelector(
                    href
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMobileMenu();

        }
    );


    /* =========================================================
       INITIAL STATE
       ========================================================= */

    if (clearName) {

        clearName.hidden =
            !(
                nameInput &&
                nameInput.value.trim()
            );

    }


    if (previewSection) {

        previewSection.hidden =
            true;

    }


    if (resultsSection) {

        resultsSection.hidden =
            true;

    }


    /* =========================================================
       INITIAL FILTER
       ========================================================= */

    activeFilter =
        "all";

    updateFilterButtons();


    /* =========================================================
       FINAL SAFETY CHECK
       ========================================================= */

    window.ZNameStyle = {

        generate: generateNames,

        copy: copyText,

        getStyles: function () {

            return generatedStyles.slice();

        },

        getCurrentName: function () {

            return currentName;

        }

    };


    /* =========================================================
       SCRIPT READY
       ========================================================= */

    console.log(
        "Z-Name Style: Generator ready."
    );

});
