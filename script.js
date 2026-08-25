document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =========================================================
       Z-STYLE NAME
       NEW GENERATOR
       PART 1 — CORE ENGINE
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


    function capitalize(value) {

        value = String(value || "");

        return value.charAt(0).toUpperCase() +
            value.slice(1);

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


    const sansBoldUpper = [
        "𝗔","𝗕","𝗖","𝗗","𝗘","𝗙","𝗚","𝗛","𝗜","𝗝",
        "𝗞","𝗟","𝗠","𝗡","𝗢","𝗣","𝗤","𝗥","𝗦","𝗧",
        "𝗨","𝗩","𝗪","𝗫","𝗬","𝗭"
    ];

    const sansBoldLower = [
        "𝗮","𝗯","𝗰","𝗱","𝗲","𝗳","𝗴","𝗵","𝗶","𝗷",
        "𝗸","𝗹","𝗺","𝗻","𝗼","𝗽","𝗾","𝗿","𝘀","𝘁",
        "𝘂","𝘃","𝘄","𝘅","𝘆","𝘇"
    ];


    const sansItalicUpper = [
        "𝘈","𝘉","𝘊","𝘋","𝘌","𝘍","𝘎","𝘏","𝘐","𝘑",
        "𝘒","𝘓","𝘔","𝘕","𝘖","𝘗","𝘘","𝘙","𝘚","𝘛",
        "𝘜","𝘝","𝘞","𝘟","𝘠","𝘡"
    ];

    const sansItalicLower = [
        "𝘢","𝘣","𝘤","𝘥","𝘦","𝘧","𝘨","𝘩","𝘪","𝘫",
        "𝘬","𝘭","𝘮","𝘯","𝘰","𝘱","𝘲","𝘳","𝘴","𝘵",
        "𝘶","𝘷","𝘸","𝘹","𝘺","𝘻"
    ];


    const fullUpper = [
        "Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ",
        "Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ",
        "Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ"
    ];

    const fullLower = [
        "ａ","ｂ","ｃ","ｄ","ｅ","ｆ","ｇ","ｈ","ｉ","ｊ",
        "ｋ","ｌ","ｍ","ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ",
        "ｕ","ｖ","ｗ","ｘ","ｙ","ｚ"
    ];


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


    /* =========================================================
       FONT CONVERTER
       ========================================================= */

    function convertFont(
        text,
        upperMap,
        lowerMap
    ) {

        return String(text)
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


    function toSansBold(text) {

        return convertFont(
            text,
            sansBoldUpper,
            sansBoldLower
        );

    }


    function toSansItalic(text) {

        return convertFont(
            text,
            sansItalicUpper,
            sansItalicLower
        );

    }


    function toFullWidth(text) {

        return convertFont(
            text,
            fullUpper,
            fullLower
        );

    }


    function toSmallCaps(text) {

        return String(text)
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
       TEXT EFFECTS
       ========================================================= */

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


    function addDoubleUnderline(text) {

        return String(text)
            .split("")
            .map(function (character) {

                return character + "̳";

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


    function starSpaced(text) {

        return String(text)
            .split("")
            .join("★");

    }


    function slashSpaced(text) {

        return String(text)
            .split("")
            .join("乂");

    }


    /* =========================================================
       STYLE STORAGE
       ========================================================= */

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
       CORE FANCY FONT STYLES
       ========================================================= */

    function createFancyStyles(name) {

        addStyle(
            "fancy",
            "𝐁𝐨𝐥𝐝",
            toBold(name)
        );

        addStyle(
            "fancy",
            "𝑰𝒕𝒂𝒍𝒊𝒄",
            toItalic(name)
        );

        addStyle(
            "fancy",
            "𝙼𝚘𝚗𝚘",
            toMono(name)
        );

        addStyle(
            "fancy",
            "𝔻𝕠𝕦𝕓𝕝𝕖",
            toDouble(name)
        );

        addStyle(
            "fancy",
            "𝓢𝓬𝓻𝓲𝓹𝓽",
            toScript(name)
        );

        addStyle(
            "fancy",
            "𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱",
            toSansBold(name)
        );

        addStyle(
            "fancy",
            "𝘚𝘢𝘯𝘴 𝘐𝘵𝘢𝘭𝘪𝘤",
            toSansItalic(name)
        );

        addStyle(
            "fancy",
            "Ｆｕｌｌｗｉｄｔｈ",
            toFullWidth(name)
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
            "Bold Dotted",
            toBold(dotted(name))
        );

        addStyle(
            "fancy",
            "Bold Underline",
            addUnderline(toBold(name))
        );

        addStyle(
            "fancy",
            "Bold Double Underline",
            addDoubleUnderline(toBold(name))
        );

        addStyle(
            "fancy",
            "Italic Underline",
            addUnderline(toItalic(name))
        );

        addStyle(
            "fancy",
            "Double Underline",
            addDoubleUnderline(toDouble(name))
        );

        addStyle(
            "fancy",
            "Strike Bold",
            addStrike(toBold(name))
        );

        addStyle(
            "fancy",
            "Strike Script",
            addStrike(toScript(name))
        );

        addStyle(
            "fancy",
            "Small Caps Spaced",
            spaced(toSmallCaps(name))
        );

    }


    /* =========================================================
       FANCY MIXED STYLES
       ========================================================= */

    function createMixedFancyStyles(name) {

        const styles = [

            toBold(name) + " ✦",

            "✦ " + toBold(name),

            toBold(name) + " ★",

            "★ " + toBold(name),

            toScript(name) + " ✧",

            "✧ " + toScript(name),

            toDouble(name) + " ❖",

            "❖ " + toDouble(name),

            toSansBold(name) + " ⚡",

            "⚡ " + toSansBold(name),

            toItalic(name) + " ✯",

            "✯ " + toItalic(name),

            toMono(name) + " ⟡",

            "⟡ " + toMono(name),

            toSmallCaps(name) + " 亗",

            "亗 " + toSmallCaps(name),

            "★彡 " + toBold(name) + " 彡★",

            "✦彡 " + toScript(name) + " 彡✦",

            "亗 " + toDouble(name) + " 亗",

            "⚡ " + toBold(name) + " ⚡",

            "♛ " + toScript(name) + " ♛",

            "♡ " + toScript(name) + " ♡",

            "☠ " + toDouble(name) + " ☠",

            "༒ " + toBold(name) + " ༒",

            "꧁ " + toScript(name) + " ꧂",

            "『 " + toDouble(name) + " 』",

            "【 " + toBold(name) + " 】",

            "〆 " + toSansBold(name) + " 〆",

            "乂 " + toDouble(name) + " 乂",

            "ツ " + toScript(name) + " ツ",

            "彡 " + toBold(name) + " 彡"

        ];

        styles.forEach(
            function (value, index) {

                addStyle(
                    "fancy",
                    "Premium Fancy " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       DUPLICATE PROTECTION
       ========================================================= */

    function removeDuplicateStyles() {

        const seen = new Set();

        generatedStyles =
            generatedStyles.filter(
                function (style) {

                    if (
                        seen.has(style.value)
                    ) {

                        return false;

                    }

                    seen.add(style.value);

                    return true;

                }
            );

    }


    /* =========================================================
       PART 1 END
       
       IMPORTANT:
       DO NOT ADD ANYTHING AFTER THIS.
       DO NOT ADD "});"
       
       PART 2 WILL CONTINUE DIRECTLY HERE.
       =========================================================
        /* =========================================================
       SYMBOL DECORATION SETS
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
        ["࿐", "࿐"]

    ];


    /* =========================================================
       BOX AND FRAME SETS
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
        ["⫷", "⫸"],
        ["⧼", "⧽"],
        ["⟪", "⟫"],
        ["⦗", "⦘"],
        ["⟬", "⟭"],
        ["⸢", "⸣"]

    ];


    /* =========================================================
       CREATE DECORATION STYLES
       ========================================================= */

    function createDecorationStyles(name) {

        decorations.forEach(
            function (pair, index) {

                addStyle(
                    "symbols",
                    "Decorated " + (index + 1),
                    pair[0] +
                    " " +
                    toBold(name) +
                    " " +
                    pair[1]
                );

            }
        );

    }


    /* =========================================================
       CREATE FRAME STYLES
       ========================================================= */

    function createBoxStyles(name) {

        boxes.forEach(
            function (pair, index) {

                const fontVersions = [

                    toBold(name),
                    toScript(name),
                    toDouble(name),
                    toSansBold(name)

                ];

                const styledName =
                    fontVersions[
                        index %
                        fontVersions.length
                    ];

                addStyle(
                    "symbols",
                    "Frame " + (index + 1),
                    pair[0] +
                    " " +
                    styledName +
                    " " +
                    pair[1]
                );

            }
        );

    }


    /* =========================================================
       GAMING STYLES
       ========================================================= */

    function createGamingStyles(name) {

        const gaming = [

            "亗 " + toBold(name) + " 亗",
            "乂 " + toBold(name) + " 乂",
            "〆 " + toBold(name) + " 〆",
            "么 " + toBold(name) + " 么",
            "メ " + toBold(name) + " メ",
            "シ " + toBold(name) + " シ",
            "ツ " + toBold(name) + " ツ",
            "彡 " + toBold(name) + " 彡",
            "乛 " + toBold(name) + " 乛",
            "々 " + toBold(name) + " 々",
            "⚔ " + toDouble(name) + " ⚔",
            "☠ " + toDouble(name) + " ☠",
            "♠ " + toBold(name) + " ♠",
            "⚡ " + toBold(name) + " ⚡",
            "🔥 " + toBold(name) + " 🔥",
            "🎯 " + toBold(name) + " 🎯",
            "👑 " + toBold(name) + " 👑",
            "☢ " + toDouble(name) + " ☢",
            "☣ " + toDouble(name) + " ☣",
            "༒ " + toBold(name) + " ༒",
            "꧁༺ " + toBold(name) + " ༻꧂",
            "『 " + toBold(name) + " 』",
            "【 " + toBold(name) + " 】",
            "◥ " + toBold(name) + " ◤",
            "╰ " + toBold(name) + " ╯",
            "亗『 " + toDouble(name) + " 』亗",
            "乂【 " + toBold(name) + " 】乂",
            "⚡亗 " + toBold(name) + " 亗⚡",
            "☠亗 " + toDouble(name) + " 亗☠",
            "༒亗 " + toBold(name) + " 亗༒",
            "彡乂 " + toBold(name) + " 乂彡",
            "メ〆 " + toDouble(name) + " 〆メ",
            "꧁乂 " + toBold(name) + " 乂꧂",
            "꧁亗 " + toDouble(name) + " 亗꧂",
            "『⚔ " + toBold(name) + " ⚔』",
            "【☠ " + toDouble(name) + " ☠】",
            "◥⚡ " + toBold(name) + " ⚡◤",
            "༺⚔ " + toBold(name) + " ⚔༻",
            "亗⚡ " + toBold(name) + " ⚡亗",
            "乂☠ " + toDouble(name) + " ☠乂"

        ];

        gaming.forEach(
            function (value, index) {

                addStyle(
                    "gaming",
                    "Gaming " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       ATTITUDE STYLES
       ========================================================= */

    function createAttitudeStyles(name) {

        const attitude = [

            "★彡 " + toBold(name) + " 彡★",
            "乂 " + toBold(name) + " 乂",
            "么 " + toDouble(name) + " 么",
            "⚡ " + toBold(name) + " ⚡",
            "☠ " + toDouble(name) + " ☠",
            "♛ " + toScript(name) + " ♛",
            "👑 " + toBold(name) + " 👑",
            "亗 " + toBold(name) + " 亗",
            "『 " + toDouble(name) + " 』",
            "【 " + toBold(name) + " 】",
            "〆 " + toBold(name) + " 〆",
            "メ " + toDouble(name) + " メ",
            "彡 " + toBold(name) + " 彡",
            "ツ " + toBold(name) + " ツ",
            "༒ " + toDouble(name) + " ༒",
            "⚔ " + toBold(name) + " ⚔",
            "🔥 " + toBold(name) + " 🔥",
            "☢ " + toDouble(name) + " ☢",
            "☣ " + toDouble(name) + " ☣",
            "♠ " + toBold(name) + " ♠",
            "♣ " + toBold(name) + " ♣",
            "♦ " + toBold(name) + " ♦",
            "★ " + toBold(name) + " ★",
            "✦ " + toScript(name) + " ✦",
            "✯ " + toDouble(name) + " ✯",
            "❖ " + toBold(name) + " ❖",
            "∞ " + toBold(name) + " ∞",
            "⚜ " + toScript(name) + " ⚜",
            "☯ " + toDouble(name) + " ☯",
            "☮ " + toBold(name) + " ☮",
            "꧁༺ " + toBold(name) + " ༻꧂",
            "『亗 " + toBold(name) + " 亗』",
            "【乂 " + toDouble(name) + " 乂】",
            "★亗 " + toBold(name) + " 亗★",
            "⚡亗 " + toBold(name) + " 亗⚡",
            "☠亗 " + toDouble(name) + " 亗☠",
            "♛亗 " + toScript(name) + " 亗♛",
            "༒亗 " + toBold(name) + " 亗༒",
            "彡乂 " + toBold(name) + " 乂彡",
            "メ〆 " + toDouble(name) + " 〆メ"

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
       ROYAL STYLES
       ========================================================= */

    function createRoyalStyles(name) {

        const royal = [

            "♛ " + toBold(name) + " ♛",
            "♕ " + toScript(name) + " ♕",
            "♔ " + toBold(name) + " ♔",
            "♚ " + toDouble(name) + " ♚",
            "👑 " + toBold(name) + " 👑",
            "♛༺ " + toBold(name) + " ༻♛",
            "꧁♛ " + toScript(name) + " ♛꧂",
            "꧁♕ " + toBold(name) + " ♕꧂",
            "『♛ " + toDouble(name) + " ♛』",
            "【♔ " + toBold(name) + " ♔】",
            "亗♛ " + toBold(name) + " ♛亗",
            "༺♛ " + toScript(name) + " ♛༻",
            "⚜ " + toBold(name) + " ⚜",
            "⚜♛ " + toBold(name) + " ♛⚜",
            "♛★ " + toBold(name) + " ★♛",
            "♕✦ " + toScript(name) + " ✦♕",
            "👑亗 " + toBold(name) + " 亗👑",
            "♔༒ " + toDouble(name) + " ༒♔",
            "♚⚡ " + toBold(name) + " ⚡♚",
            "꧁༺♛ " + toBold(name) + " ♛༻꧂",
            "╰♛ " + toScript(name) + " ♛╯",
            "╭♕ " + toScript(name) + " ♕╮",
            "『👑 " + toBold(name) + " 👑』",
            "【👑 " + toBold(name) + " 👑】",
            "★♛ " + toBold(name) + " ♛★",
            "✦♕ " + toScript(name) + " ♕✦",
            "❖♛ " + toDouble(name) + " ♛❖",
            "༒♚ " + toBold(name) + " ♚༒",
            "亗👑 " + toBold(name) + " 👑亗",
            "♛∞ " + toScript(name) + " ∞♛"

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

            "♡ " + toScript(name) + " ♡",
            "♥ " + toBold(name) + " ♥",
            "❤ " + toBold(name) + " ❤",
            "💕 " + toScript(name) + " 💕",
            "💖 " + toBold(name) + " 💖",
            "💗 " + toScript(name) + " 💗",
            "💘 " + toBold(name) + " 💘",
            "💝 " + toScript(name) + " 💝",
            "❣ " + toBold(name) + " ❣",
            "ღ " + toScript(name) + " ღ",
            "♡彡 " + toScript(name) + " 彡♡",
            "♥彡 " + toBold(name) + " 彡♥",
            "꧁♡ " + toScript(name) + " ♡꧂",
            "꧁♥ " + toBold(name) + " ♥꧂",
            "『♡ " + toScript(name) + " ♡』",
            "【♥ " + toBold(name) + " ♥】",
            "♡亗 " + toBold(name) + " 亗♡",
            "♥亗 " + toScript(name) + " 亗♥",
            "༺♡ " + toScript(name) + " ♡༻",
            "༺♥ " + toBold(name) + " ♥༻",
            "★♡ " + toBold(name) + " ♡★",
            "✦♥ " + toScript(name) + " ♥✦",
            "❖♡ " + toBold(name) + " ♡❖",
            "🌸♡ " + toScript(name) + " ♡🌸",
            "🌹 " + toScript(name) + " 🌹",
            "💞 " + toBold(name) + " 💞",
            "💓 " + toScript(name) + " 💓",
            "💟 " + toBold(name) + " 💟",
            "💌 " + toScript(name) + " 💌",
            "💕♡ " + toBold(name) + " ♡💕"

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

            "★ " + toBold(name) + " ★",
            "☆ " + toScript(name) + " ☆",
            "✦ " + toBold(name) + " ✦",
            "✧ " + toScript(name) + " ✧",
            "✯ " + toDouble(name) + " ✯",
            "✰ " + toBold(name) + " ✰",
            "❖ " + toDouble(name) + " ❖",
            "◆ " + toBold(name) + " ◆",
            "◇ " + toScript(name) + " ◇",
            "⚡ " + toBold(name) + " ⚡",
            "∞ " + toDouble(name) + " ∞",
            "☯ " + toBold(name) + " ☯",
            "☮ " + toScript(name) + " ☮",
            "⚜ " + toBold(name) + " ⚜",
            "亗 " + toBold(name) + " 亗",
            "乂 " + toDouble(name) + " 乂",
            "ツ " + toBold(name) + " ツ",
            "彡 " + toScript(name) + " 彡",
            "メ " + toBold(name) + " メ",
            "〆 " + toDouble(name) + " 〆",
            "么 " + toBold(name) + " 么",
            "々 " + toScript(name) + " 々",
            "★彡 " + toBold(name) + " 彡★",
            "✦彡 " + toScript(name) + " 彡✦",
            "亗★ " + toBold(name) + " ★亗",
            "⚡亗 " + toBold(name) + " 亗⚡",
            "❖亗 " + toDouble(name) + " 亗❖",
            "꧁ " + toScript(name) + " ꧂",
            "༺ " + toBold(name) + " ༻",
            "『 " + toDouble(name) + " 』"

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

            "☠ " + toDouble(name) + " ☠",
            "💀 " + toDouble(name) + " 💀",
            "☣ " + toDouble(name) + " ☣",
            "☢ " + toBold(name) + " ☢",
            "༒ " + toBold(name) + " ༒",
            "♠ " + toDouble(name) + " ♠",
            "♤ " + toBold(name) + " ♤",
            "⚔ " + toBold(name) + " ⚔",
            "🖤 " + toScript(name) + " 🖤",
            "☾ " + toScript(name) + " ☽",
            "☽ " + toScript(name) + " ☾",
            "亗☠ " + toDouble(name) + " ☠亗",
            "꧁☠ " + toDouble(name) + " ☠꧂",
            "꧁༒ " + toBold(name) + " ༒꧂",
            "『☠ " + toDouble(name) + " ☠』",
            "【☠ " + toDouble(name) + " ☠】",
            "༺☠ " + toDouble(name) + " ☠༻",
            "༺༒ " + toBold(name) + " ༒༻",
            "★☠ " + toDouble(name) + " ☠★",
            "✦☠ " + toBold(name) + " ☠✦",
            "⚔亗 " + toBold(name) + " 亗⚔",
            "☢亗 " + toDouble(name) + " 亗☢",
            "☣亗 " + toDouble(name) + " 亗☣",
            "♠༒ " + toBold(name) + " ༒♠",
            "☾༒ " + toScript(name) + " ༒☽"

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

            "🌸 " + toScript(name) + " 🌸",
            "🌷 " + toScript(name) + " 🌷",
            "🌺 " + toScript(name) + " 🌺",
            "🌼 " + toScript(name) + " 🌼",
            "🦋 " + toScript(name) + " 🦋",
            "🐰 " + toBold(name) + " 🐰",
            "🐻 " + toBold(name) + " 🐻",
            "🐼 " + toBold(name) + " 🐼",
            "🐨 " + toBold(name) + " 🐨",
            "♡ " + toScript(name) + " ♡",
            "ღ " + toScript(name) + " ღ",
            "꒰ " + toScript(name) + " ꒱",
            "꒰ა " + toScript(name) + " ໒꒱",
            "୨♡୧ " + toScript(name) + " ୨♡୧",
            "꧁♡ " + toScript(name) + " ♡꧂",
            "『🌸 " + toScript(name) + " 🌸』",
            "【🦋 " + toScript(name) + " 🦋】",
            "♡彡 " + toScript(name) + " 彡♡",
            "🌸彡 " + toScript(name) + " 彡🌸",
            "🦋彡 " + toScript(name) + " 彡🦋",
            "✿ " + toScript(name) + " ✿",
            "❀ " + toScript(name) + " ❀",
            "❁ " + toScript(name) + " ❁",
            "✾ " + toScript(name) + " ✾",
            "💗 " + toScript(name) + " 💗"

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
       EXTRA PREMIUM STYLES
       ========================================================= */

    function createPremiumStyles(name) {

        const premium = [

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
            "乂 " + toDouble(name) + " 乂",
            "꧁༒ " + toBold(name) + " ༒꧂",
            "『亗 " + toBold(name) + " 亗』",
            "【⚡ " + toBold(name) + " ⚡】",
            "༺♛ " + toScript(name) + " ♛༻",
            "★♛ " + toBold(name) + " ♛★",
            "✦☠ " + toDouble(name) + " ☠✦",
            "亗♡ " + toScript(name) + " ♡亗",
            "⚡彡 " + toBold(name) + " 彡⚡",
            "꧁👑 " + toBold(name) + " 👑꧂"

        ];

        premium.forEach(
            function (value, index) {

                addStyle(
                    "fancy",
                    "Premium Design " + (index + 1),
                    value
                );

            }
        );

    }


    /* =========================================================
       PART 2 END
       
       IMPORTANT:
       DO NOT ADD "});"
       PART 3 WILL CONTINUE DIRECTLY BELOW.
       =========================================================
    /* =========================================================
   PART 3 — EVENTS + COPY + FILTERS + MENU + FINAL
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

            if (event.key === "Enter") {

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

            clearName.hidden = true;

            currentName = "";

            generatedStyles = [];

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

        }
    );

}


/* =========================================================
   COPY RESULT BUTTONS
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

            const original =
                button.innerHTML;

            button.innerHTML =
                "✓ Copied!";

            button.classList.add(
                "copied"
            );

            setTimeout(
                function () {

                    button.innerHTML =
                        original;

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

            const filter =
                button.dataset.filter;

            if (!filter) {
                return;
            }

            activeFilter =
                filter;

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

                if (generatedStyles.length) {

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

                if (!nameInput) {
                    return;
                }

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

    if (!mobileMenu) {
        return;
    }

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
        function (event) {

            event.stopPropagation();

            toggleMobileMenu();

        }
    );

}


/* =========================================================
   CLOSE MENU OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!mobileMenu) {
            return;
        }

        const insideMenu =
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
            !insideMenu &&
            !menuButton &&
            !bottomButton
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

        if (event.key === "Escape") {

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

        let target = null;

        try {

            target =
                document.querySelector(
                    href
                );

        } catch (error) {

            return;

        }

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

    previewSection.hidden = true;

}


if (resultsSection) {

    resultsSection.hidden = true;

}


activeFilter = "all";

updateFilterButtons();


/* =========================================================
   PUBLIC API
   ========================================================= */

window.ZNameStyle = {

    generate: function () {

        generateNames();

    },

    copy: function (text) {

        return copyText(text);

    },

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
    "Z-Name Style Generator Ready"
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */

});
