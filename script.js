document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================================
       Z-NAME STYLE - COMPLETE SCRIPT
       ========================================================= */

    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const clearName = document.getElementById("clearName");

    const previewSection = document.getElementById("previewSection");
    const previewName = document.getElementById("previewName");

    const resultsSection = document.getElementById("resultsSection");
    const resultsContainer = document.getElementById("resultsContainer");
    const resultsTitle = document.getElementById("resultsTitle");
    const styleFilters = document.getElementById("styleFilters");

    const symbolsGrid = document.getElementById("symbolsGrid");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const bottomMenuButton =
        document.getElementById("bottomMenuButton");

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

    function showToast(message) {
        if (!toast) return;

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(function () {
            toast.classList.remove("show");
        }, 1800);
    }


    /* =========================================================
       FONT MAPS
       ========================================================= */

    const boldUpper =
        "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙".split("");

    const boldLower =
        "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳".split("");


    const italicUpper =
        "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍".split("");

    const italicLower =
        "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧".split("");


    const monoUpper =
        "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉".split("");

    const monoLower =
        "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣".split("");


    const doubleUpper =
        "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ".split("");

    const doubleLower =
        "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫".split("");


    const scriptUpper =
        "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵".split("");

    const scriptLower =
        "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏".split("");


    const frakturUpper =
        "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ".split("");

    const frakturLower =
        "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷".split("");


    function convertFont(text, upper, lower) {
        return String(text)
            .split("")
            .map(function (character) {

                const code = character.charCodeAt(0);

                if (code >= 65 && code <= 90) {
                    return upper[code - 65] || character;
                }

                if (code >= 97 && code <= 122) {
                    return lower[code - 97] || character;
                }

                return character;
            })
            .join("");
    }


    function toBold(text) {
        return convertFont(text, boldUpper, boldLower);
    }

    function toItalic(text) {
        return convertFont(text, italicUpper, italicLower);
    }

    function toMono(text) {
        return convertFont(text, monoUpper, monoLower);
    }

    function toDouble(text) {
        return convertFont(text, doubleUpper, doubleLower);
    }

    function toScript(text) {
        return convertFont(text, scriptUpper, scriptLower);
    }

    function toFraktur(text) {
        return convertFont(text, frakturUpper, frakturLower);
    }


    /* =========================================================
       SMALL CAPS
       ========================================================= */

    const smallCaps = {
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
        return String(text)
            .toLowerCase()
            .split("")
            .map(function (character) {
                return smallCaps[character] || character;
            })
            .join("");
    }


    function addStrike(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̶";
            })
            .join("");
    }


    function addUnderline(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̲";
            })
            .join("");
    }


    function addOverline(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̅";
            })
            .join("");
    }


    function spaced(text) {
        return String(text)
            .split("")
            .join(" ");
    }


    function dotted(text) {
        return String(text)
            .split("")
            .join("・");
    }


    function slashSpaced(text) {
        return String(text)
            .split("")
            .join(" / ");
    }


    function dotSpaced(text) {
        return String(text)
            .split("")
            .join(" • ");
    }


    /* =========================================================
       STYLE STORAGE
       ========================================================= */

    function addStyle(category, title, value) {

        if (!value) return;

        generatedStyles.push({
            category: category,
            title: title,
            value: value
        });
    }


    /* =========================================================
       SYMBOLS
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
        ["☯", "☯"],
        ["☮", "☮"],
        ["∞", "∞"],
        ["⚜", "⚜"],
        ["༺", "༻"],
        ["༒", "༒"],
        ["࿐", "࿐"],
        ["❣", "❣"],
        ["ღ", "ღ"],
        ["☘", "☘"],
        ["☀", "☀"]
    ];


    const boxes = [

        ["『", "』"],
        ["【", "】"],
        ["〖", "〗"],
        ["〘", "〙"],
        ["〚", "〛"],
        ["〈", "〉"],
        ["《", "》"],
        ["「", "」"],
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
        ["◢", "◣"],
        ["⟪", "⟫"],
        ["⟮", "⟯"],
        ["﹝", "﹞"],
        ["﹙", "﹚"],
        ["⦅", "⦆"],
        ["⟬", "⟭"]
    ];


    /* =========================================================
       FANCY STYLES
       ========================================================= */

    function createFancyStyles(name) {

        const styles = [

            ["Bold", toBold(name)],
            ["Italic", toItalic(name)],
            ["Monospace", toMono(name)],
            ["Double", toDouble(name)],
            ["Script", toScript(name)],
            ["Fraktur", toFraktur(name)],
            ["Small Caps", toSmallCaps(name)],

            ["Bold Spaced", toBold(spaced(name))],
            ["Italic Spaced", toItalic(spaced(name))],
            ["Bold Dotted", toBold(dotted(name))],
            ["Double Spaced", toDouble(spaced(name))],
            ["Script Spaced", toScript(spaced(name))],
            ["Underline", addUnderline(name)],
            ["Strike", addStrike(name)],
            ["Overline", addOverline(name)],

            ["Bold Underline", addUnderline(toBold(name))],
            ["Italic Underline", addUnderline(toItalic(name))],
            ["Bold Dotted Space", toBold(dotSpaced(name))],
            ["Script Dotted", toScript(dotted(name))],
            ["Fraktur Spaced", toFraktur(spaced(name))],
            ["Bold Slash", toBold(slashSpaced(name))],
            ["Double Dotted", toDouble(dotted(name))],
            ["Small Caps Spaced", spaced(toSmallCaps(name))],
            ["Script Underline", addUnderline(toScript(name))],
            ["Double Underline", addUnderline(toDouble(name))],
            ["Fraktur Underline", addUnderline(toFraktur(name))]
        ];


        styles.forEach(function (item) {
            addStyle("fancy", item[0], item[1]);
        });
    }


    /* =========================================================
       DECORATION STYLES
       ========================================================= */

    function createDecorationStyles(name) {

        decorations.forEach(function (pair, index) {

            addStyle(
                "symbols",
                "Symbol " + (index + 1),
                pair[0] + " " + name + " " + pair[1]
            );

        });


        decorations.forEach(function (pair, index) {

            addStyle(
                "symbols",
                "Bold Symbol " + (index + 1),
                pair[0] + " " + toBold(name) + " " + pair[1]
            );

        });
    }


    /* =========================================================
       BOX STYLES
       ========================================================= */

    function createBoxStyles(name) {

        boxes.forEach(function (pair, index) {

            addStyle(
                "symbols",
                "Frame " + (index + 1),
                pair[0] + name + pair[1]
            );

        });


        boxes.forEach(function (pair, index) {

            addStyle(
                "symbols",
                "Bold Frame " + (index + 1),
                pair[0] + toBold(name) + pair[1]
            );

        });
    }


    /* =========================================================
       GAMING STYLES
       ========================================================= */

    function createGamingStyles(name) {

        const gaming = [

            ["亗", "亗"],
            ["乂", "乂"],
            ["〆", "〆"],
            ["么", "么"],
            ["メ", "メ"],
            ["シ", "シ"],
            ["ツ", "ツ"],
            ["彡", "彡"],
            ["乛", "乛"],
            ["々", "々"],
            ["⚔", "⚔"],
            ["☠", "☠"],
            ["♠", "♠"],
            ["⚡", "⚡"],
            ["🔥", "🔥"],
            ["🎯", "🎯"],
            ["👑", "👑"],
            ["☢", "☢"],
            ["☣", "☣"],
            ["༒", "༒"],
            ["꧁༺", "༻꧂"],
            ["『", "』"],
            ["【", "】"],
            ["◥", "◤"],
            ["╰", "╯"],
            ["♛", "♛"],
            ["★亗", "亗★"],
            ["⚡亗", "亗⚡"],
            ["☠亗", "亗☠"],
            ["彡乂", "乂彡"],
            ["メ〆", "〆メ"],
            ["༺༒", "༒༻"],
            ["꧁", "꧂"]
        ];


        gaming.forEach(function (pair, index) {

            addStyle(
                "gaming",
                "Gaming " + (index + 1),
                pair[0] + " " + toBold(name) + " " + pair[1]
            );

        });


        gaming.forEach(function (pair, index) {

            addStyle(
                "gaming",
                "Pro Gaming " + (index + 1),
                pair[0] + " " + toDouble(name) + " " + pair[1]
            );

        });
    }


    /* =========================================================
       ATTITUDE
       ========================================================= */

    function createAttitudeStyles(name) {

        const attitude = [

            "★彡 {name} 彡★",
            "乂 {name} 乂",
            "么 {name} 么",
            "⚡ {name} ⚡",
            "☠ {name} ☠",
            "♛ {name} ♛",
            "👑 {name} 👑",
            "亗 {name} 亗",
            "『 {name} 』",
            "【 {name} 】",
            "〆 {name} 〆",
            "メ {name} メ",
            "彡 {name} 彡",
            "ツ {name} ツ",
            "༒ {name} ༒",
            "⚔ {name} ⚔",
            "🔥 {name} 🔥",
            "☢ {name} ☢",
            "☣ {name} ☣",
            "♠ {name} ♠",
            "★ {name} ★",
            "✦ {name} ✦",
            "✯ {name} ✯",
            "❖ {name} ❖",
            "∞ {name} ∞",
            "⚜ {name} ⚜",
            "☯ {name} ☯",
            "☮ {name} ☮",
            "꧁༺ {name} ༻꧂",
            "『亗 {name} 亗』",
            "【乂 {name} 乂】",
            "★亗 {name} 亗★",
            "⚡亗 {name} 亗⚡",
            "☠亗 {name} 亗☠",
            "♛亗 {name} 亗♛",
            "༒亗 {name} 亗༒",
            "彡乂 {name} 乂彡",
            "メ〆 {name} 〆メ",
            "꧁ {name} ꧂",
            "༺ {name} ༻"
        ];


        attitude.forEach(function (template, index) {

            addStyle(
                "attitude",
                "Attitude " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        attitude.forEach(function (template, index) {

            addStyle(
                "attitude",
                "Attitude Fancy " + (index + 1),
                template.replace("{name}", toDouble(name))
            );

        });
    }


    /* =========================================================
       ROYAL
       ========================================================= */

    function createRoyalStyles(name) {

        const royal = [

            "♛ {name} ♛",
            "♕ {name} ♕",
            "♔ {name} ♔",
            "♚ {name} ♚",
            "👑 {name} 👑",
            "♛༺ {name} ༻♛",
            "꧁♛ {name} ♛꧂",
            "꧁♕ {name} ♕꧂",
            "『♛ {name} ♛』",
            "【♔ {name} ♔】",
            "亗♛ {name} ♛亗",
            "༺♛ {name} ♛༻",
            "⚜ {name} ⚜",
            "⚜♛ {name} ♛⚜",
            "♛★ {name} ★♛",
            "♕✦ {name} ✦♕",
            "👑亗 {name} 亗👑",
            "♔༒ {name} ༒♔",
            "♚⚡ {name} ⚡♚",
            "꧁༺♛ {name} ♛༻꧂",
            "╰♛ {name} ♛╯",
            "╭♕ {name} ♕╮",
            "『👑 {name} 👑』",
            "【👑 {name} 👑】",
            "★♛ {name} ♛★",
            "✦♕ {name} ♕✦",
            "❖♛ {name} ♛❖",
            "༒♚ {name} ♚༒",
            "亗👑 {name} 👑亗",
            "♛∞ {name} ∞♛"
        ];


        royal.forEach(function (template, index) {

            addStyle(
                "royal",
                "Royal " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        royal.forEach(function (template, index) {

            addStyle(
                "royal",
                "Royal Script " + (index + 1),
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* =========================================================
       LOVE
       ========================================================= */

    function createLoveStyles(name) {

        const love = [

            "♡ {name} ♡",
            "♥ {name} ♥",
            "❤ {name} ❤",
            "💕 {name} 💕",
            "💖 {name} 💖",
            "💗 {name} 💗",
            "💘 {name} 💘",
            "💝 {name} 💝",
            "❣ {name} ❣",
            "ღ {name} ღ",
            "♡彡 {name} 彡♡",
            "♥彡 {name} 彡♥",
            "꧁♡ {name} ♡꧂",
            "꧁♥ {name} ♥꧂",
            "『♡ {name} ♡』",
            "【♥ {name} ♥】",
            "♡亗 {name} 亗♡",
            "♥亗 {name} 亗♥",
            "༺♡ {name} ♡༻",
            "༺♥ {name} ♥༻",
            "★♡ {name} ♡★",
            "✦♥ {name} ♥✦",
            "❖♡ {name} ♡❖",
            "🌸♡ {name} ♡🌸",
            "🌹 {name} 🌹",
            "💞 {name} 💞",
            "💓 {name} 💓",
            "💟 {name} 💟",
            "💌 {name} 💌",
            "💕♡ {name} ♡💕"
        ];


        love.forEach(function (template, index) {

            addStyle(
                "love",
                "Love " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        love.forEach(function (template, index) {

            addStyle(
                "love",
                "Love Script " + (index + 1),
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* =========================================================
       COOL
       ========================================================= */

    function createCoolStyles(name) {

        const cool = [

            "★ {name} ★",
            "☆ {name} ☆",
            "✦ {name} ✦",
            "✧ {name} ✧",
            "✯ {name} ✯",
            "✰ {name} ✰",
            "❖ {name} ❖",
            "◆ {name} ◆",
            "◇ {name} ◇",
            "⚡ {name} ⚡",
            "∞ {name} ∞",
            "☯ {name} ☯",
            "☮ {name} ☮",
            "⚜ {name} ⚜",
            "亗 {name} 亗",
            "乂 {name} 乂",
            "ツ {name} ツ",
            "彡 {name} 彡",
            "メ {name} メ",
            "〆 {name} 〆",
            "么 {name} 么",
            "々 {name} 々",
            "★彡 {name} 彡★",
            "✦彡 {name} 彡✦",
            "亗★ {name} ★亗",
            "⚡亗 {name} 亗⚡",
            "❖亗 {name} 亗❖",
            "꧁ {name} ꧂",
            "༺ {name} ༻",
            "『 {name} 』"
        ];


        cool.forEach(function (template, index) {

            addStyle(
                "cool",
                "Cool " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        cool.forEach(function (template, index) {

            addStyle(
                "cool",
                "Cool Script " + (index + 1),
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* =========================================================
       DARK
       ========================================================= */

    function createDarkStyles(name) {

        const dark = [

            "☠ {name} ☠",
            "💀 {name} 💀",
            "☣ {name} ☣",
            "☢ {name} ☢",
            "༒ {name} ༒",
            "♠ {name} ♠",
            "♤ {name} ♤",
            "⚔ {name} ⚔",
            "🖤 {name} 🖤",
            "☾ {name} ☽",
            "☽ {name} ☾",
            "亗☠ {name} ☠亗",
            "꧁☠ {name} ☠꧂",
            "꧁༒ {name} ༒꧂",
            "『☠ {name} ☠』",
            "【☠ {name} ☠】",
            "༺☠ {name} ☠༻",
            "༺༒ {name} ༒༻",
            "★☠ {name} ☠★",
            "✦☠ {name} ☠✦",
            "⚔亗 {name} 亗⚔",
            "☢亗 {name} 亗☢",
            "☣亗 {name} 亗☣",
            "♠༒ {name} ༒♠",
            "☾༒ {name} ༒☽"
        ];


        dark.forEach(function (template, index) {

            addStyle(
                "dark",
                "Dark " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        dark.forEach(function (template, index) {

            addStyle(
                "dark",
                "Dark Fraktur " + (index + 1),
                template.replace("{name}", toFraktur(name))
            );

        });
    }


    /* =========================================================
       CUTE
       ========================================================= */

    function createCuteStyles(name) {

        const cute = [

            "🌸 {name} 🌸",
            "🌷 {name} 🌷",
            "🌺 {name} 🌺",
            "🌼 {name} 🌼",
            "🦋 {name} 🦋",
            "🐰 {name} 🐰",
            "🐻 {name} 🐻",
            "🐼 {name} 🐼",
            "🐨 {name} 🐨",
            "♡ {name} ♡",
            "ღ {name} ღ",
            "꒰ {name} ꒱",
            "꒰ა {name} ໒꒱",
            "୨♡୧ {name} ୨♡୧",
            "꧁♡ {name} ♡꧂",
            "『🌸 {name} 🌸』",
            "【🦋 {name} 🦋】",
            "♡彡 {name} 彡♡",
            "🌸彡 {name} 彡🌸",
            "🦋彡 {name} 彡🦋",
            "✿ {name} ✿",
            "❀ {name} ❀",
            "❁ {name} ❁",
            "✾ {name} ✾",
            "💗 {name} 💗"
        ];


        cute.forEach(function (template, index) {

            addStyle(
                "cute",
                "Cute " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        cute.forEach(function (template, index) {

            addStyle(
                "cute",
                "Cute Script " + (index + 1),
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* =========================================================
       SOCIAL
       ========================================================= */

    function createSocialStyles(name) {

        const social = [

            "• {name} •",
            "× {name} ×",
            "— {name} —",
            "_ {name} _",
            "~ {name} ~",
            "| {name} |",
            "《 {name} 》",
            "「 {name} 」",
            "『 {name} 』",
            "【 {name} 】",
            "〈 {name} 〉",
            "✦ {name} ✦",
            "♡ {name} ♡",
            "☆ {name} ☆",
            "•° {name} °•",
            "°• {name} •°",
            "×͜× {name} ×͜×",
            "ツ {name} ツ",
            "彡 {name} 彡",
            "亗 {name} 亗"
        ];


        social.forEach(function (template, index) {

            addStyle(
                "social",
                "Social " + (index + 1),
                template.replace("{name}", toBold(name))
            );

        });


        social.forEach(function (template, index) {

            addStyle(
                "social",
                "Social Script " + (index + 1),
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* =========================================================
       EXTRA FANCY
       ========================================================= */

    function createExtraFancyStyles(name) {

        const styles = [

            ["꧁༺ " + toBold(name) + " ༻꧂", "Fancy Royal"],
            ["꧁༺ " + toScript(name) + " ༻꧂", "Fancy Script"],
            ["꧁༺ " + toDouble(name) + " ༻꧂", "Fancy Double"],

            ["★彡 " + toBold(name) + " 彡★", "Star Bold"],
            ["★彡 " + toScript(name) + " 彡★", "Star Script"],

            ["✦ " + toDouble(name) + " ✦", "Double Star"],
            ["亗 " + toBold(name) + " 亗", "Warrior Bold"],
            ["『 " + toScript(name) + " 』", "Frame Script"],
            ["【 " + toDouble(name) + " 】", "Frame Double"],
            ["༺ " + toBold(name) + " ༻", "Royal Bold"],
            ["༒ " + toBold(name) + " ༒", "Dark Bold"],
            ["♛ " + toScript(name) + " ♛", "King Script"],
            ["♡ " + toScript(name) + " ♡", "Love Script"],
            ["⚡ " + toBold(name) + " ⚡", "Lightning Bold"],
            ["☠ " + toDouble(name) + " ☠", "Skull Double"],
            ["✯ " + toScript(name) + " ✯", "Star Script"],
            ["❖ " + toDouble(name) + " ❖", "Diamond Double"],
            ["彡 " + toBold(name) + " 彡", "Anime Bold"],
            ["ツ " + toScript(name) + " ツ", "Anime Script"],
            ["乂 " + toDouble(name) + " 乂", "Battle Double"]
        ];


        styles.forEach(function (item, index) {

            addStyle(
                "fancy",
                item[1] + " " + (index + 1),
                item[0]
            );

        });
    }


    /* =========================================================
       GENERATE 250+ STYLES
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
        createSocialStyles(name);
        createExtraFancyStyles(name);


        /*
         * Safety net:
         * Minimum 250 styles.
         */

        const seed = generatedStyles.slice();

        let variantIndex = 1;

        while (generatedStyles.length < 250 && seed.length) {

            seed.forEach(function (style) {

                if (generatedStyles.length >= 250) {
                    return;
                }

                const variants = [

                    "✦ " + style.value + " ✦",
                    "★ " + style.value + " ★",
                    "『 " + style.value + " 』",
                    "亗 " + style.value + " 亗",
                    "༺ " + style.value + " ༻"

                ];


                variants.forEach(function (value) {

                    if (generatedStyles.length < 250) {

                        addStyle(
                            style.category,
                            "Generated " + variantIndex++,
                            value
                        );

                    }

                });

            });
        }

        return generatedStyles;
    }


    /* =========================================================
       FILTER
       ========================================================= */

    function getFilteredStyles() {

        if (activeFilter === "all") {
            return generatedStyles;
        }

        return generatedStyles.filter(function (style) {
            return style.category === activeFilter;
        });
    }


    function updateFilterButtons() {

        if (!styleFilters) return;

        styleFilters
            .querySelectorAll(".filter-button")
            .forEach(function (button) {

                button.classList.toggle(
                    "active",
                    (button.dataset.filter || "all") === activeFilter
                );

            });
    }


    /* =========================================================
       RESULT CARD
       =========================================================
       
       IMPORTANT:
       Card ke andar sirf:

              Styled Name

              📋 Copy

       Koi A / Bold Fancy / Gaming / number nahi.
       ========================================================= */

    function createResultCard(style) {

        const card = document.createElement("article");

        card.className = "result-card";


        /* ONLY STYLED NAME */

        const value = document.createElement("div");

        value.className = "result-value";

        value.textContent = style.value;

        value.setAttribute(
            "aria-label",
            "Stylish name"
        );


        /* COPY BUTTON */

        const button = document.createElement("button");

        button.type = "button";

        button.className =
            "copy-result-button";

        button.textContent =
            "📋 Copy";

        button.dataset.copy =
            style.value;

        button.setAttribute(
            "aria-label",
            "Copy stylish name"
        );


        card.appendChild(value);
        card.appendChild(button);

        return card;
    }


    /* =========================================================
       RENDER RESULTS
       ========================================================= */

    function renderResults() {

        if (!resultsContainer) return;

        const styles =
            getFilteredStyles();

        resultsContainer.innerHTML = "";


        if (!styles.length) {

            const empty =
                document.createElement("div");

            empty.className =
                "no-results";


            const strong =
                document.createElement("strong");

            strong.textContent =
                "No styles found";


            const p =
                document.createElement("p");

            p.textContent =
                "Try another category.";


            empty.appendChild(strong);
            empty.appendChild(p);

            resultsContainer.appendChild(empty);

            return;
        }


        const fragment =
            document.createDocumentFragment();


        styles.forEach(function (style) {

            fragment.appendChild(
                createResultCard(style)
            );

        });


        resultsContainer.appendChild(fragment);


        /*
         * Section heading stays:
         * Stylish Names
         */

        if (resultsTitle) {
            resultsTitle.textContent =
                "Stylish Names";
        }
    }


    /* =========================================================
       COPY
       ========================================================= */

    async function copyText(text) {

        text = String(text || "");

        if (!text) return;


        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(text);

            } else {

                const textarea =
                    document.createElement("textarea");

                textarea.value =
                    text;

                textarea.style.position =
                    "fixed";

                textarea.style.left =
                    "-9999px";

                document.body.appendChild(
                    textarea
                );

                textarea.focus();
                textarea.select();

                document.execCommand("copy");

                textarea.remove();
            }


            showToast("Name copied!");

        } catch (error) {

            showToast(
                "Copy failed. Try again."
            );
        }
    }


    /* =========================================================
       GENERATE
       ========================================================= */

    function generateNames() {

        if (!nameInput) return;


        const name =
            cleanName(nameInput.value);


        if (!name) {

            showToast(
                "Please enter your name."
            );

            nameInput.focus();

            return;
        }


        currentName =
            name;

        activeFilter =
            "all";


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


        if (clearName) {

            clearName.hidden =
                false;
        }


        updateFilterButtons();

        renderResults();


        if (resultsSection) {

            setTimeout(function () {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 80);
        }
    }


    /* =========================================================
       FORM
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
       INPUT
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

                if (event.key === "Enter") {

                    event.preventDefault();

                    generateNames();
                }
            }
        );
    }


    /* =========================================================
       CLEAR
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

                generatedStyles = [];


                clearName.hidden =
                    true;


                if (previewName) {

                    previewName.textContent =
                        "Your Name";
                }


                if (previewSection) {

                    previewSection.hidden =
                        true;
                }


                if (resultsSection) {

                    resultsSection.hidden =
                        true;
                }
            }
        );
    }


    /* =========================================================
       RESULT COPY BUTTON
       ========================================================= */

    if (resultsContainer) {

        resultsContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".copy-result-button"
                    );


                if (!button) return;


                const text =
                    button.dataset.copy || "";


                if (!text) return;


                copyText(text);


                button.textContent =
                    "✓ Copied!";

                button.classList.add(
                    "copied"
                );


                setTimeout(
                    function () {

                        button.textContent =
                            "📋 Copy";

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


                if (!button) return;


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

    document
        .querySelectorAll(".category-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card.dataset.category;


                    if (!category) {
                        return;
                    }


                    if (!generatedStyles.length) {

                        if (
                            nameInput &&
                            nameInput.value.trim()
                        ) {

                            generateNames();

                        } else {

                            if (nameInput) {
                                nameInput.focus();
                            }

                            showToast(
                                "Enter your name first."
                            );

                            return;
                        }
                    }


                    activeFilter =
                        category;


                    updateFilterButtons();

                    renderResults();


                    if (resultsSection) {

                        resultsSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            );
        });


    /* =========================================================
       SYMBOL GRID
       ========================================================= */

    if (symbolsGrid) {

        symbolsGrid.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".symbol-card"
                    );


                if (!button) return;


                const symbol =
                    button.dataset.symbol ||
                    "";


                if (!symbol) return;


                copyText(symbol);


                const small =
                    button.querySelector("small");


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
       USE STYLE BUTTONS
       ========================================================= */

    document
        .querySelectorAll(".use-style-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const template =
                        button.dataset.template ||
                        "";


                    if (!template) return;

                    if (!nameInput) return;


                    const name =
                        cleanName(
                            nameInput.value
                        );


                    if (!name) {

                        nameInput.focus();

                        showToast(
                            "Enter your name first."
                        );

                        return;
                    }


                    const styled =
                        template.replace(
                            /\{name\}/gi,
                            name
                        );


                    copyText(styled);
                }
            );
        });


    /* =========================================================
       REMOVE TOP STYLES + TOOLS
       ========================================================= */

    function removeStylesAndTools() {

        document
            .querySelectorAll(
                "a, button"
            )
            .forEach(function (item) {

                const text =
                    item.textContent
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase();


                if (
                    text === "styles" ||
                    text === "tools"
                ) {

                    item.remove();
                }
            });
    }


    /* =========================================================
       REMOVE POPULAR STYLES SECTION
       ========================================================= */

    function removePopularStyles() {

        document
            .querySelectorAll(
                "section, .section, .popular-styles, .styles-section"
            )
            .forEach(function (section) {

                const heading =
                    section.querySelector(
                        "h1, h2, h3, .section-title, .section-heading"
                    );


                if (!heading) return;


                const text =
                    heading.textContent
                        .trim()
                        .toLowerCase();


                if (
                    text ===
                    "popular styles"
                ) {

                    section.remove();
                }
            });
    }


    /* =========================================================
       FINAL RESULT CARD CSS
       ========================================================= */

    function applyResultCardCSS() {

        if (
            document.getElementById(
                "zname-result-card-fixes"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "zname-result-card-fixes";


        style.textContent = `

            /* RESULT GRID */

            #resultsContainer {
                display: grid;
                grid-template-columns:
                    repeat(2, minmax(0, 1fr));
                gap: 14px;
            }


            /* RESULT CARD */

            #resultsContainer .result-card {

                min-width: 0;

                display: flex !important;

                flex-direction:
                    column !important;

                align-items:
                    center !important;

                justify-content:
                    center !important;

                gap: 18px !important;

                padding: 24px !important;

                background:
                    #ffffff !important;

                border:
                    1px solid #e7e4ef !important;

                border-radius:
                    18px !important;

                box-sizing:
                    border-box !important;

                overflow:
                    hidden;
            }


            /* ONLY NAME */

            #resultsContainer .result-value {

                width: 100%;

                min-height: 52px;

                display: flex !important;

                align-items:
                    center !important;

                justify-content:
                    center !important;

                text-align:
                    center !important;

                font-size:
                    clamp(20px, 3vw, 28px) !important;

                line-height:
                    1.35 !important;

                font-weight:
                    600 !important;

                color:
                    #202033 !important;

                overflow-wrap:
                    anywhere;

                word-break:
                    break-word;
            }


            /* COPY BUTTON */

            #resultsContainer
            .copy-result-button {

                width:
                    100% !important;

                min-height:
                    58px !important;

                display:
                    flex !important;

                align-items:
                    center !important;

                justify-content:
                    center !important;

                gap:
                    7px !important;

                border:
                    1px solid #e1dcf5 !important;

                border-radius:
                    16px !important;

                background:
                    #f3f0ff !important;

                color:
                    #7358df !important;

                font: inherit !important;

                font-weight:
                    700 !important;

                font-size:
                    16px !important;

                cursor:
                    pointer !important;

                transition:
                    transform .18s ease,
                    background .18s ease,
                    box-shadow .18s ease !important;
            }


            #resultsContainer
            .copy-result-button:hover {

                background:
                    #ebe6ff !important;

                box-shadow:
                    0 8px 20px
                    rgba(115, 88, 223, .12)
                    !important;

                transform:
                    translateY(-1px);
            }


            #resultsContainer
            .copy-result-button:active {

                transform:
                    scale(.98);
            }


            #resultsContainer
            .copy-result-button.copied {

                background:
                    #ece9ff !important;
            }


            /* MOBILE */

            @media (max-width: 700px) {

                #resultsContainer {

                    grid-template-columns:
                        1fr;

                    gap:
                        14px;
                }


                #resultsContainer
                .result-card {

                    padding:
                        22px 16px !important;

                    gap:
                        16px !important;
                }


                #resultsContainer
                .result-value {

                    min-height:
                        48px;

                    font-size:
                        22px !important;
                }


                #resultsContainer
                .copy-result-button {

                    min-height:
                        56px !important;
                }
            }

        `;


        document.head.appendChild(style);
    }


    /* =========================================================
       MOBILE MENU
       ========================================================= */

    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove(
            "open"
        );

        mobileMenu.classList.remove(
            "active"
        );


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    function toggleMobileMenu() {

        if (!mobileMenu) return;


        const open =
            mobileMenu.classList.toggle(
                "open"
            );


        mobileMenu.classList.toggle(
            "active",
            open
        );


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(open)
            );
        }
    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMobileMenu();
            }
        );
    }


    if (bottomMenuButton) {

        bottomMenuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMobileMenu();
            }
        );
    }


    document
        .querySelectorAll(".mobile-nav-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });


    document.addEventListener(
        "click",
        function (event) {

            if (!mobileMenu) return;


            const inside =
                mobileMenu.contains(
                    event.target
                );


            const menuButton =
                mobileMenuButton &&
                mobileMenuButton.contains(
                    event.target
                );


            const bottomButton =
                bottomMenuButton &&
                bottomMenuButton.contains(
                    event.target
                );


            if (
                !inside &&
                !menuButton &&
                !bottomButton
            ) {

                closeMobileMenu();
            }
        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();
            }
        }
    );


    /* =========================================================
       SMOOTH INTERNAL LINKS
       ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    'a[href^="#"]'
                );


            if (!link) return;


            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#"
            ) {
                return;
            }


            let target;


            try {

                target =
                    document.querySelector(
                        href
                    );

            } catch (error) {

                return;
            }


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            closeMobileMenu();
        }
    );


    /* =========================================================
       STARTUP
       ========================================================= */

    removeStylesAndTools();

    removePopularStyles();

    applyResultCardCSS();


    if (previewSection) {

        previewSection.hidden =
            true;
    }


    if (resultsSection) {

        resultsSection.hidden =
            true;
    }


    if (clearName) {

        clearName.hidden =
            !(
                nameInput &&
                nameInput.value.trim()
            );
    }


    activeFilter =
        "all";


    updateFilterButtons();


    /* =========================================================
       PUBLIC API
       ========================================================= */

    window.ZNameStyle = {

        generate:
            generateNames,

        copy:
            copyText,

        getStyles:
            function () {
                return generatedStyles.slice();
            },

        getCurrentName:
            function () {
                return currentName;
            }
    };


    console.log(
        "Z-Name Style Generator Ready"
    );

});
