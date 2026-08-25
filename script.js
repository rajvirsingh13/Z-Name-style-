document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /*
     * ============================================================
     * Z-NAME STYLE
     * Complete script.js
     *
     * IMPORTANT:
     * Result cards intentionally contain ONLY:
     *     1. Stylish Name
     *     2. Copy button
     *
     * No number
     * No category name
     * No style title
     * No "A"
     * No "Bold Fancy"
     * No "Gaming"
     * ============================================================
     */


    /* ============================================================
       DOM ELEMENTS
       ============================================================ */

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


    /* ============================================================
       STATE
       ============================================================ */

    let currentName = "";
    let activeFilter = "all";
    let generatedStyles = [];


    /* ============================================================
       BASIC HELPERS
       ============================================================ */

    function cleanName(value) {
        return String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 30);
    }


    function uniquePush(list, category, value) {
        if (!value) return;

        const finalValue = String(value).trim();

        if (!finalValue) return;

        const exists = list.some(function (item) {
            return item.value === finalValue;
        });

        if (!exists) {
            list.push({
                category: category,
                value: finalValue
            });
        }
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


    /* ============================================================
       UNICODE FONTS
       ============================================================ */

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


    const sansBoldUpper =
        "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split("");

    const sansBoldLower =
        "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇".split("");


    const sansItalicUpper =
        "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡".split("");

    const sansItalicLower =
        "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻".split("");


    const sansUpper =
        "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹".split("");

    const sansLower =
        "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓".split("");


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

    function toSansBold(text) {
        return convertFont(text, sansBoldUpper, sansBoldLower);
    }

    function toSansItalic(text) {
        return convertFont(text, sansItalicUpper, sansItalicLower);
    }

    function toSans(text) {
        return convertFont(text, sansUpper, sansLower);
    }


    /* ============================================================
       SPECIAL TEXT STYLES
       ============================================================ */

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


    function strike(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̶";
            })
            .join("");
    }


    function underline(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̲";
            })
            .join("");
    }


    function overline(text) {
        return String(text)
            .split("")
            .map(function (character) {
                return character + "̅";
            })
            .join("");
    }


    function dotText(text) {
        return String(text).split("").join("・");
    }


    function spaced(text) {
        return String(text).split("").join(" ");
    }


    function bulletSpace(text) {
        return String(text).split("").join(" • ");
    }


    function slashSpace(text) {
        return String(text).split("").join(" / ");
    }


    function waveSpace(text) {
        return String(text).split("").join(" ~ ");
    }


    /* ============================================================
       DECORATION DATA
       ============================================================ */

    const decorations = [
        ["★", "★"],
        ["☆", "☆"],
        ["✦", "✦"],
        ["✧", "✧"],
        ["✯", "✯"],
        ["✰", "✰"],
        ["❖", "❖"],
        ["◆", "◆"],
        ["◇", "◇"],
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
        ["❀", "❀"],
        ["✿", "✿"],
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
        ["༒", "༒"],
        ["࿐", "࿐"],
        ["❣", "❣"],
        ["ღ", "ღ"],
        ["☘", "☘"],
        ["☀", "☀"]
    ];


    const frames = [
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


    /* ============================================================
       STYLE GENERATORS
       ============================================================ */

    function addFontStyles(name, output) {

        const fonts = [
            toBold(name),
            toItalic(name),
            toMono(name),
            toDouble(name),
            toScript(name),
            toFraktur(name),
            toSansBold(name),
            toSansItalic(name),
            toSans(name),
            toSmallCaps(name),

            underline(name),
            strike(name),
            overline(name),

            underline(toBold(name)),
            underline(toItalic(name)),
            underline(toScript(name)),
            underline(toDouble(name)),

            strike(toBold(name)),
            strike(toItalic(name)),
            strike(toScript(name)),

            overline(toBold(name)),
            overline(toItalic(name)),
            overline(toScript(name)),

            toBold(spaced(name)),
            toItalic(spaced(name)),
            toDouble(spaced(name)),
            toScript(spaced(name)),
            toFraktur(spaced(name)),

            toBold(dotText(name)),
            toItalic(dotText(name)),
            toDouble(dotText(name)),
            toScript(dotText(name)),

            toBold(bulletSpace(name)),
            toItalic(bulletSpace(name)),
            toDouble(bulletSpace(name)),

            toBold(slashSpace(name)),
            toItalic(slashSpace(name)),
            toDouble(slashSpace(name)),

            toBold(waveSpace(name)),
            toScript(waveSpace(name))
        ];


        fonts.forEach(function (value) {
            uniquePush(output, "fancy", value);
        });
    }


    function addSymbolStyles(name, output) {

        decorations.forEach(function (pair) {

            uniquePush(
                output,
                "symbols",
                pair[0] + " " + name + " " + pair[1]
            );

            uniquePush(
                output,
                "symbols",
                pair[0] + " " + toBold(name) + " " + pair[1]
            );

            uniquePush(
                output,
                "symbols",
                pair[0] + " " + toScript(name) + " " + pair[1]
            );

        });


        frames.forEach(function (pair) {

            uniquePush(
                output,
                "symbols",
                pair[0] + name + pair[1]
            );

            uniquePush(
                output,
                "symbols",
                pair[0] + toBold(name) + pair[1]
            );

            uniquePush(
                output,
                "symbols",
                pair[0] + toScript(name) + pair[1]
            );

        });
    }


    function addGamingStyles(name, output) {

        const gamingPairs = [
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
            ["★亗", "亗★"],
            ["⚡亗", "亗⚡"],
            ["☠亗", "亗☠"],
            ["彡乂", "乂彡"],
            ["メ〆", "〆メ"],
            ["༺༒", "༒༻"],
            ["꧁", "꧂"],
            ["『", "』"],
            ["【", "】"],
            ["◥", "◤"],
            ["╰", "╯"],
            ["♛", "♛"]
        ];


        gamingPairs.forEach(function (pair) {

            uniquePush(
                output,
                "gaming",
                pair[0] + " " + toBold(name) + " " + pair[1]
            );

            uniquePush(
                output,
                "gaming",
                pair[0] + " " + toDouble(name) + " " + pair[1]
            );

            uniquePush(
                output,
                "gaming",
                pair[0] + " " + toMono(name) + " " + pair[1]
            );

        });
    }


    function addAttitudeStyles(name, output) {

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


        attitude.forEach(function (template) {

            uniquePush(
                output,
                "attitude",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "attitude",
                template.replace("{name}", toDouble(name))
            );

        });
    }


    function addRoyalStyles(name, output) {

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


        royal.forEach(function (template) {

            uniquePush(
                output,
                "royal",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "royal",
                template.replace("{name}", toScript(name))
            );

        });
    }


    function addLoveStyles(name, output) {

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


        love.forEach(function (template) {

            uniquePush(
                output,
                "love",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "love",
                template.replace("{name}", toScript(name))
            );

        });
    }


    function addCoolStyles(name, output) {

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


        cool.forEach(function (template) {

            uniquePush(
                output,
                "cool",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "cool",
                template.replace("{name}", toScript(name))
            );

        });
    }


    function addDarkStyles(name, output) {

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


        dark.forEach(function (template) {

            uniquePush(
                output,
                "dark",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "dark",
                template.replace("{name}", toFraktur(name))
            );

        });
    }


    function addCuteStyles(name, output) {

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


        cute.forEach(function (template) {

            uniquePush(
                output,
                "cute",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "cute",
                template.replace("{name}", toScript(name))
            );

        });
    }


    function addSocialStyles(name, output) {

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


        social.forEach(function (template) {

            uniquePush(
                output,
                "social",
                template.replace("{name}", toBold(name))
            );

            uniquePush(
                output,
                "social",
                template.replace("{name}", toScript(name))
            );

        });
    }


    /* ============================================================
       GENERATE ALL
       ============================================================ */

    function generateAllStyles(name) {

        const output = [];

        addFontStyles(name, output);
        addSymbolStyles(name, output);
        addGamingStyles(name, output);
        addAttitudeStyles(name, output);
        addRoyalStyles(name, output);
        addLoveStyles(name, output);
        addCoolStyles(name, output);
        addDarkStyles(name, output);
        addCuteStyles(name, output);
        addSocialStyles(name, output);


        /*
         * Extra combinations.
         * These make the total comfortably 200+.
         */

        const extraLeft = [
            "★",
            "☆",
            "✦",
            "✧",
            "✯",
            "❖",
            "亗",
            "乂",
            "ツ",
            "彡",
            "⚡",
            "♛",
            "♕",
            "♡",
            "♥",
            "☠",
            "༒",
            "⚔"
        ];


        const extraRight = [
            "★",
            "☆",
            "✦",
            "✧",
            "✯",
            "❖",
            "亗",
            "乂",
            "ツ",
            "彡",
            "⚡",
            "♛",
            "♕",
            "♡",
            "♥",
            "☠",
            "༒",
            "⚔"
        ];


        const fontFunctions = [
            toBold,
            toScript,
            toDouble,
            toMono,
            toFraktur,
            toSansBold
        ];


        fontFunctions.forEach(function (fontFunction, fontIndex) {

            extraLeft.forEach(function (left, leftIndex) {

                if (leftIndex >= 18) return;

                const right =
                    extraRight[
                        (leftIndex + fontIndex + 3) %
                        extraRight.length
                    ];


                const styledName = fontFunction(name);


                uniquePush(
                    output,
                    "fancy",
                    left + " " + styledName + " " + right
                );


                if (fontIndex < 4) {

                    uniquePush(
                        output,
                        "fancy",
                        left + "•" + styledName + "•" + right
                    );

                    uniquePush(
                        output,
                        "fancy",
                        left + "〆" + styledName + "〆" + right
                    );
                }

            });

        });


        /*
         * More frame combinations.
         */

        frames.forEach(function (frame, index) {

            const font = fontFunctions[index % fontFunctions.length];

            uniquePush(
                output,
                "symbols",
                frame[0] + font(name) + frame[1]
            );

            uniquePush(
                output,
                "symbols",
                frame[0] + " " + font(name) + " " + frame[1]
            );

        });


        /*
         * Make sure we have at least 200 results.
         * The generators above normally produce far more.
         */

        if (output.length < 200) {

            const fallbackDecorations = [
                "★",
                "☆",
                "✦",
                "✧",
                "✯",
                "✰",
                "❖",
                "◆",
                "◇",
                "⚡",
                "亗",
                "乂",
                "ツ",
                "彡",
                "〆",
                "么",
                "メ",
                "♛",
                "♡",
                "♥",
                "☠",
                "⚔",
                "༒",
                "∞",
                "⚜"
            ];


            let counter = 0;

            while (output.length < 200 && counter < 1000) {

                const symbol =
                    fallbackDecorations[
                        counter %
                        fallbackDecorations.length
                    ];

                const second =
                    fallbackDecorations[
                        (counter * 3 + 5) %
                        fallbackDecorations.length
                    ];

                const font =
                    fontFunctions[
                        counter %
                        fontFunctions.length
                    ];


                uniquePush(
                    output,
                    "fancy",
                    symbol +
                    " " +
                    font(name) +
                    " " +
                    second
                );


                counter++;
            }
        }


        return output;
    }


    /* ============================================================
       FILTER
       ============================================================ */

    function getFilteredStyles() {

        if (activeFilter === "all") {
            return generatedStyles;
        }

        return generatedStyles.filter(function (style) {
            return style.category === activeFilter;
        });
    }


    /* ============================================================
       RESULT CARD
       ============================================================

       VERY IMPORTANT:

       Card contains ONLY:

           Stylish Name
           Copy

       Nothing else.
       ============================================================ */

    function createResultCard(style) {

        const card = document.createElement("article");

        card.className = "result-card";

        card.dataset.category = style.category;


        /*
         * Stylish name
         */

        const value = document.createElement("div");

        value.className = "result-value";

        value.textContent = style.value;


        /*
         * Copy button
         */

        const button = document.createElement("button");

        button.type = "button";

        button.className = "copy-result-button";

        button.dataset.copy = style.value;

        button.innerHTML = "<span>📋</span> Copy";


        /*
         * Append ONLY name + copy button
         */

        card.appendChild(value);

        card.appendChild(button);


        return card;
    }


    /* ============================================================
       RENDER RESULTS
       ============================================================ */

    function renderResults() {

        if (!resultsContainer) return;


        const styles = getFilteredStyles();


        resultsContainer.innerHTML = "";


        if (!styles.length) {

            const empty = document.createElement("div");

            empty.className = "no-results";

            empty.innerHTML =
                "<strong>No styles found</strong>" +
                "<p>Try another category.</p>";

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
         * Do NOT show category/style names inside cards.
         * Only heading changes.
         */

        if (resultsTitle) {

            if (activeFilter === "all") {

                resultsTitle.textContent =
                    "Stylish Names";

            } else {

                const names = {
                    fancy: "Stylish Names",
                    gaming: "Stylish Names",
                    attitude: "Stylish Names",
                    symbols: "Stylish Names",
                    royal: "Stylish Names",
                    love: "Stylish Names",
                    cool: "Stylish Names",
                    dark: "Stylish Names",
                    cute: "Stylish Names",
                    social: "Stylish Names"
                };


                resultsTitle.textContent =
                    names[activeFilter] ||
                    "Stylish Names";
            }
        }
    }


    /* ============================================================
       COPY
       ============================================================ */

    async function copyText(text) {

        text = String(text || "");

        if (!text) return false;


        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(text);

            } else {

                const textarea =
                    document.createElement("textarea");

                textarea.value = text;

                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                textarea.style.top = "0";

                document.body.appendChild(textarea);

                textarea.focus();
                textarea.select();

                document.execCommand("copy");

                textarea.remove();
            }


            return true;

        } catch (error) {

            return false;
        }
    }


    /* ============================================================
       FILTER BUTTONS
       ============================================================ */

    function updateFilterButtons() {

        if (!styleFilters) return;


        styleFilters
            .querySelectorAll(".filter-button")
            .forEach(function (button) {

                button.classList.toggle(
                    "active",
                    (button.dataset.filter || "all") ===
                    activeFilter
                );

            });
    }


    /* ============================================================
       GENERATE
       ============================================================ */

    function generateNames() {

        if (!nameInput) return;


        const name =
            cleanName(nameInput.value);


        if (!name) {

            showToast("Please enter your name.");

            nameInput.focus();

            return;
        }


        currentName = name;

        activeFilter = "all";


        generatedStyles =
            generateAllStyles(currentName);


        /*
         * Preview
         */

        if (previewName) {
            previewName.textContent =
                currentName;
        }


        if (previewSection) {
            previewSection.hidden = false;
        }


        /*
         * Results
         */

        if (resultsSection) {
            resultsSection.hidden = false;
        }


        /*
         * Clear button
         */

        if (clearName) {
            clearName.hidden = false;
        }


        updateFilterButtons();

        renderResults();


        /*
         * Scroll to results
         */

        if (resultsSection) {

            setTimeout(function () {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 80);
        }


        console.log(
            "Z-Name Style generated:",
            generatedStyles.length,
            "unique styles"
        );
    }


    /* ============================================================
       FORM
       ============================================================ */

    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                generateNames();
            }
        );
    }


    /* ============================================================
       INPUT
       ============================================================ */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                const value =
                    cleanName(nameInput.value);


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


    /* ============================================================
       CLEAR NAME
       ============================================================ */

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

                activeFilter = "all";


                clearName.hidden = true;


                if (previewName) {
                    previewName.textContent =
                        "Your Name";
                }


                if (previewSection) {
                    previewSection.hidden = true;
                }


                if (resultsSection) {
                    resultsSection.hidden = true;
                }


                if (resultsContainer) {
                    resultsContainer.innerHTML = "";
                }


                updateFilterButtons();
            }
        );
    }


    /* ============================================================
       RESULT COPY BUTTON
       ============================================================ */

    if (resultsContainer) {

        resultsContainer.addEventListener(
            "click",
            async function (event) {

                const button =
                    event.target.closest(
                        ".copy-result-button"
                    );


                if (!button) return;


                const text =
                    button.dataset.copy || "";


                if (!text) return;


                /*
                 * Prevent double click while copying
                 */

                if (
                    button.dataset.copying === "true"
                ) {
                    return;
                }


                button.dataset.copying = "true";


                const success =
                    await copyText(text);


                if (success) {

                    button.classList.add("copied");

                    button.innerHTML =
                        "<span>✓</span> Copied!";

                    showToast("Name copied!");

                } else {

                    button.classList.add("copy-error");

                    button.innerHTML =
                        "<span>!</span> Try Again";

                    showToast(
                        "Copy failed. Try again."
                    );
                }


                setTimeout(function () {

                    button.classList.remove(
                        "copied"
                    );

                    button.classList.remove(
                        "copy-error"
                    );

                    button.innerHTML =
                        "<span>📋</span> Copy";

                    button.dataset.copying =
                        "false";

                }, 1400);
            }
        );
    }


    /* ============================================================
       STYLE FILTERS
       ============================================================ */

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


    /* ============================================================
       POPULAR STYLE CATEGORY CARDS
       ============================================================ */

    document
        .querySelectorAll(".category-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card.dataset.category;


                    if (!category) return;


                    /*
                     * If no name has been generated yet,
                     * ask user for name.
                     */

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


                    /*
                     * Category cards can use categories
                     * that are not present in the top
                     * filter buttons.
                     */

                    activeFilter = category;


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


    /* ============================================================
       SYMBOL COPY
       ============================================================ */

    if (symbolsGrid) {

        symbolsGrid.addEventListener(
            "click",
            async function (event) {

                const button =
                    event.target.closest(
                        ".symbol-card"
                    );


                if (!button) return;


                const symbol =
                    button.dataset.symbol || "";


                if (!symbol) return;


                const success =
                    await copyText(symbol);


                if (!success) {

                    showToast(
                        "Copy failed. Try again."
                    );

                    return;
                }


                showToast(
                    "Symbol copied!"
                );


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


    /* ============================================================
       TRENDING STYLE BUTTONS
       ============================================================ */

    document
        .querySelectorAll(".use-style-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                async function () {

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


                    const success =
                        await copyText(styled);


                    if (success) {

                        showToast(
                            "Style copied!"
                        );

                    } else {

                        showToast(
                            "Copy failed. Try again."
                        );
                    }
                }
            );
        });


    /* ============================================================
       MOBILE MENU
       ============================================================ */

    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove("open");

        mobileMenu.classList.remove("active");


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    function toggleMobileMenu() {

        if (!mobileMenu) return;


        const isOpen =
            mobileMenu.classList.toggle(
                "open"
            );


        mobileMenu.classList.toggle(
            "active",
            isOpen
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


            const insideMenu =
                mobileMenu.contains(
                    event.target
                );


            const headerButton =
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
                !insideMenu &&
                !headerButton &&
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


    /* ============================================================
       SMOOTH INTERNAL LINKS
       ============================================================ */

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
                    document.querySelector(href);

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


    /* ============================================================
       INITIAL STATE
       ============================================================ */

    if (previewSection) {
        previewSection.hidden = true;
    }


    if (resultsSection) {
        resultsSection.hidden = true;
    }


    if (clearName) {

        clearName.hidden =
            !(
                nameInput &&
                nameInput.value.trim()
            );
    }


    activeFilter = "all";

    updateFilterButtons();


    /* ============================================================
       PUBLIC API
       ============================================================ */

    window.ZNameStyle = {

        generate: generateNames,

        copy: copyText,

        getStyles: function () {
            return generatedStyles.slice();
        },

        getCurrentName: function () {
            return currentName;
        },

        getStyleCount: function () {
            return generatedStyles.length;
        }
    };


    console.log(
        "Z-Name Style Generator Ready"
    );
});
