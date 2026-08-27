/* =========================================================
   Z-NAME STYLE
   Main JavaScript
   300+ Stylish Name Generator
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
const resultsTitle = document.getElementById("resultsTitle");
const resultsContainer = document.getElementById("resultsContainer");

const styleFilters = document.getElementById("styleFilters");
const symbolsGrid = document.getElementById("symbolsGrid");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const bottomMenuButton = document.getElementById("bottomMenuButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let currentName = "";
let currentFilter = "all";
let toastTimer = null;


/* =========================================================
   STYLE DATABASE
   =========================================================
   Every style contains:
   - name     = internal style name
   - category = filter category
   - template = function which receives user's name
   ========================================================= */

const styles = [];


/* =========================================================
   HELPER
   ========================================================= */

function addStyle(category, template) {
    styles.push({
        category: category,
        template: template
    });
}


/* =========================================================
   BASIC DECORATIVE STYLES
   ========================================================= */

const decorativeStyles = [
    ["fancy", "꧁༺ {name} ༻꧂"],
    ["fancy", "꧁༺ {name} ༻꧂"],
    ["fancy", "꧁ {name} ꧂"],
    ["fancy", "『 {name} 』"],
    ["fancy", "『{name}』"],
    ["fancy", "【 {name} 】"],
    ["fancy", "【{name}】"],
    ["fancy", "〖 {name} 〗"],
    ["fancy", "〘 {name} 〙"],
    ["fancy", "〚 {name} 〛"],
    ["fancy", "《 {name} 》"],
    ["fancy", "〈 {name} 〉"],
    ["fancy", "「 {name} 」"],
    ["fancy", "『 {name} 』"],
    ["fancy", "╰☆☆ {name} ☆☆╮"],
    ["fancy", "╰┈➤ {name}"],
    ["fancy", "╰☆☆ {name} ☆☆╮"],
    ["fancy", "•°¯`•• {name} ••´¯°•"],
    ["fancy", "•´¯`•. {name} .•´¯`•"],
    ["fancy", "¸,ø¤º°`°º¤ø,¸ {name} ¸,ø¤º°`°º¤ø,¸"],
    ["fancy", "°°°·.°·..·°¯°·..· {name} ·..·°¯°·.°·..·°°°"],
    ["fancy", "◦•●◉✿ {name} ✿◉●•◦"],
    ["fancy", "✿ {name} ✿"],
    ["fancy", "❀ {name} ❀"],
    ["fancy", "✾ {name} ✾"],
    ["fancy", "❁ {name} ❁"],
    ["fancy", "✽ {name} ✽"],
    ["fancy", "✼ {name} ✼"],
    ["fancy", "✺ {name} ✺"],
    ["fancy", "✹ {name} ✹"],
    ["fancy", "✷ {name} ✷"],
    ["fancy", "✶ {name} ✶"],
    ["fancy", "✦ {name} ✦"],
    ["fancy", "✧ {name} ✧"],
    ["fancy", "★ {name} ★"],
    ["fancy", "☆ {name} ☆"],
    ["fancy", "★★ {name} ★★"],
    ["fancy", "☆☆ {name} ☆☆"],
    ["fancy", "✰ {name} ✰"],
    ["fancy", "✪ {name} ✪"],
    ["fancy", "✫ {name} ✫"],
    ["fancy", "✬ {name} ✬"],
    ["fancy", "✭ {name} ✭"],
    ["fancy", "✮ {name} ✮"],
    ["fancy", "✯ {name} ✯"],
    ["fancy", "✰✰ {name} ✰✰"],
    ["fancy", "★彡 {name} 彡★"],
    ["fancy", "☆彡 {name} 彡☆"],
    ["fancy", "彡★ {name} ★彡"],
    ["fancy", "彡☆ {name} ☆彡"]
];

decorativeStyles.forEach(([category, template]) => {
    addStyle(category, name => template.replace("{name}", name));
});


/* =========================================================
   GAMING STYLES
   ========================================================= */

const gamingTemplates = [
    "亗 {name} 亗",
    "乂 {name} 乂",
    "乂• {name} •乂",
    "乂 {name} メ",
    "メ {name} 乂",
    "〆 {name} 〆",
    "々 {name} 々",
    "彡 {name} 彡",
    "ツ {name} ツ",
    "シ {name} シ",
    "么 {name} 么",
    "ฬ {name} ฬ",
    "乛 {name} 乛",
    "乄 {name} 乄",
    "乂丨 {name} 丨乂",
    "『亗』{name}『亗』",
    "『乂』{name}『乂』",
    "『ツ』{name}『ツ』",
    "亗丨{name}丨亗",
    "乂丨{name}丨乂",
    "〆丨{name}丨〆",
    "メ丨{name}丨メ",
    "々丨{name}丨々",
    "⚡ {name} ⚡",
    "⚔ {name} ⚔",
    "☠ {name} ☠",
    "☠︎ {name} ☠︎",
    "♛ {name} ♛",
    "♚ {name} ♚",
    "♜ {name} ♜",
    "⚡︎ {name} ⚡︎",
    "☯ {name} ☯",
    "☣ {name} ☣",
    "☢ {name} ☢",
    "⛧ {name} ⛧",
    "✘ {name} ✘",
    "✖ {name} ✖",
    "❌ {name} ❌",
    "✓ {name} ✓",
    "✔ {name} ✔",
    "⫷ {name} ⫸",
    "⟦ {name} ⟧",
    "⟬ {name} ⟭",
    "⟪ {name} ⟫",
    "⟮ {name} ⟯",
    "⧼ {name} ⧽",
    "◥ {name} ◤",
    "◢ {name} ◣",
    "◤ {name} ◥",
    "◣ {name} ◢",
    "╰‿╯ {name} ╰‿╯",
    "乂⚡ {name} ⚡乂",
    "亗⚡ {name} ⚡亗",
    "〆⚔ {name} ⚔〆",
    "メ☠ {name} ☠メ",
    "ツ彡 {name} 彡ツ",
    "乂彡 {name} 彡乂",
    "亗彡 {name} 彡亗",
    "么彡 {name} 彡么",
    "『⚡』{name}『⚡』",
    "『☠』{name}『☠』",
    "『♛』{name}『♛』",
    "『亗』{name}『亗』",
    "《亗》{name}《亗》",
    "【亗】{name}【亗】",
    "【乂】{name}【乂】",
    "【⚡】{name}【⚡】",
    "〘亗〙{name}〘亗〙",
    "〘乂〙{name}〘乂〙",
    "༺⚔ {name} ⚔༻",
    "༺☠ {name} ☠༻",
    "༺亗 {name} 亗༻",
    "乂༺ {name} ༻乂",
    "亗༺ {name} ༻亗"
];

gamingTemplates.forEach(template => {
    addStyle("gaming", name => template.replace("{name}", name));
});


/* =========================================================
   ATTITUDE STYLES
   ========================================================= */

const attitudeTemplates = [
    "😎 {name} 😎",
    "😈 {name} 😈",
    "👑 {name} 👑",
    "💀 {name} 💀",
    "🔥 {name} 🔥",
    "⚡ {name} ⚡",
    "💯 {name} 💯",
    "🖤 {name} 🖤",
    "😎🔥 {name} 🔥😎",
    "👑🔥 {name} 🔥👑",
    "😈🔥 {name} 🔥😈",
    "💀🔥 {name} 🔥💀",
    "⚡😎 {name} 😎⚡",
    "☠️ {name} ☠️",
    "👿 {name} 👿",
    "😏 {name} 😏",
    "🗿 {name} 🗿",
    "🖤⚡ {name} ⚡🖤",
    "🔥⚡ {name} ⚡🔥",
    "👑⚡ {name} ⚡👑",
    "💀⚡ {name} ⚡💀",
    "😈⚡ {name} ⚡😈",
    "💥 {name} 💥",
    "⚔️ {name} ⚔️",
    "🏆 {name} 🏆",
    "🥶 {name} 🥶",
    "🦁 {name} 🦁",
    "🐯 {name} 🐯",
    "🐺 {name} 🐺",
    "🦅 {name} 🦅",
    "👑 {name} ♛",
    "♛ {name} 👑",
    "♚ {name} ♚",
    "♛ {name} ♛",
    "☬ {name} ☬",
    "⚜ {name} ⚜",
    "⚜️ {name} ⚜️",
    "♠ {name} ♠",
    "♠️ {name} ♠️",
    "♣ {name} ♣",
    "♦ {name} ♦",
    "♥ {name} ♥",
    "🖤👑 {name} 👑🖤",
    "🔥👑 {name} 👑🔥",
    "😈👑 {name} 👑😈",
    "💀👑 {name} 👑💀",
    "⚡👑 {name} 👑⚡",
    "☠️👑 {name} 👑☠️",
    "🦁👑 {name} 👑🦁",
    "🐺🔥 {name} 🔥🐺",
    "🦅⚡ {name} ⚡🦅",
    "😎✌ {name} ✌😎",
    "😎☠ {name} ☠😎",
    "😈☠ {name} ☠😈",
    "💀☠ {name} ☠💀",
    "🔥☠ {name} ☠🔥",
    "👑☠ {name} ☠👑",
    "⚡☠ {name} ☠⚡",
    "🖤☠ {name} ☠🖤",
    "❖ {name} ❖",
    "◆ {name} ◆",
    "◇ {name} ◇",
    "◈ {name} ◈",
    "◉ {name} ◉",
    "● {name} ●",
    "◐ {name} ◐",
    "◑ {name} ◑",
    "◒ {name} ◒",
    "◓ {name} ◓"
];

attitudeTemplates.forEach(template => {
    addStyle("attitude", name => template.replace("{name}", name));
});


/* =========================================================
   SYMBOL STYLES
   ========================================================= */

const symbolTemplates = [
    "★ {name} ★",
    "☆ {name} ☆",
    "✦ {name} ✦",
    "✧ {name} ✧",
    "✪ {name} ✪",
    "✫ {name} ✫",
    "✬ {name} ✬",
    "✭ {name} ✭",
    "✮ {name} ✮",
    "✯ {name} ✯",
    "✰ {name} ✰",
    "✵ {name} ✵",
    "✶ {name} ✶",
    "✷ {name} ✷",
    "✸ {name} ✸",
    "✹ {name} ✹",
    "✺ {name} ✺",
    "✻ {name} ✻",
    "✼ {name} ✼",
    "✽ {name} ✽",
    "✾ {name} ✾",
    "❀ {name} ❀",
    "❁ {name} ❁",
    "❂ {name} ❂",
    "❃ {name} ❃",
    "❈ {name} ❈",
    "❉ {name} ❉",
    "❊ {name} ❊",
    "❋ {name} ❋",
    "❖ {name} ❖",
    "◆ {name} ◆",
    "◇ {name} ◇",
    "◈ {name} ◈",
    "◉ {name} ◉",
    "● {name} ●",
    "○ {name} ○",
    "◎ {name} ◎",
    "◌ {name} ◌",
    "◍ {name} ◍",
    "◐ {name} ◐",
    "◑ {name} ◑",
    "◒ {name} ◒",
    "◓ {name} ◓",
    "☀ {name} ☀",
    "☾ {name} ☾",
    "☽ {name} ☽",
    "☯ {name} ☯",
    "☮ {name} ☮",
    "☘ {name} ☘",
    "☠ {name} ☠",
    "⚜ {name} ⚜",
    "⚡ {name} ⚡",
    "⚔ {name} ⚔",
    "♛ {name} ♛",
    "♕ {name} ♕",
    "♚ {name} ♚",
    "♔ {name} ♔",
    "♜ {name} ♜",
    "♞ {name} ♞",
    "♟ {name} ♟",
    "♥ {name} ♥",
    "♡ {name} ♡",
    "❤ {name} ❤",
    "❣ {name} ❣",
    "ღ {name} ღ",
    "ツ {name} ツ",
    "シ {name} シ",
    "彡 {name} 彡",
    "々 {name} 々",
    "〆 {name} 〆",
    "乂 {name} 乂",
    "亗 {name} 亗",
    "么 {name} 么",
    "メ {name} メ"
];

symbolTemplates.forEach(template => {
    addStyle("symbols", name => template.replace("{name}", name));
});


/* =========================================================
   UNICODE FONTS
   =========================================================
   These functions convert normal Latin letters into Unicode
   mathematical characters.
   ========================================================= */

const normalUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const normalLower = "abcdefghijklmnopqrstuvwxyz";

const unicodeFonts = [

    {
        category: "fancy",
        upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
        lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳"
    },

    {
        category: "fancy",
        upper: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
        lower: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛"
    },

    {
        category: "fancy",
        upper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩",
        lower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"
    },

    {
        category: "fancy",
        upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
        lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
    },

    {
        category: "fancy",
        upper: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅",
        lower: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"
    },

    {
        category: "fancy",
        upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
        lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"
    },

    {
        category: "gaming",
        upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
        lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"
    }

];


/* =========================================================
   UNICODE CONVERTER
   ========================================================= */

function convertUnicode(text, upper, lower) {

    let output = "";

    for (const char of text) {

        const upperIndex = normalUpper.indexOf(char);

        if (upperIndex !== -1) {
            output += Array.from(upper)[upperIndex] || char;
            continue;
        }

        const lowerIndex = normalLower.indexOf(char);

        if (lowerIndex !== -1) {
            output += Array.from(lower)[lowerIndex] || char;
            continue;
        }

        output += char;
    }

    return output;
}


/* =========================================================
   ADD UNICODE FONT STYLES
   ========================================================= */

unicodeFonts.forEach(font => {

    addStyle(
        font.category,
        name => convertUnicode(name, font.upper, font.lower)
    );

    addStyle(
        font.category,
        name => "★ " + convertUnicode(name, font.upper, font.lower) + " ★"
    );

    addStyle(
        font.category,
        name => "『" + convertUnicode(name, font.upper, font.lower) + "』"
    );

    addStyle(
        font.category,
        name => "亗 " + convertUnicode(name, font.upper, font.lower) + " 亗"
    );

    addStyle(
        font.category,
        name => "꧁" + convertUnicode(name, font.upper, font.lower) + "꧂"
    );

    addStyle(
        font.category,
        name => "彡" + convertUnicode(name, font.upper, font.lower) + "彡"
    );

});


/* =========================================================
   SPECIAL CHARACTER STYLES
   ========================================================= */

const specialStyles = [

    {
        category: "fancy",
        fn: name => addCombining(name, "\u0305")
    },

    {
        category: "fancy",
        fn: name => addCombining(name, "\u0336")
    },

    {
        category: "fancy",
        fn: name => addCombining(name, "\u0332")
    },

    {
        category: "fancy",
        fn: name => addCombining(name, "\u035E")
    },

    {
        category: "symbols",
        fn: name => addCombining(name, "\u0308")
    },

    {
        category: "symbols",
        fn: name => addCombining(name, "\u0307")
    },

    {
        category: "symbols",
        fn: name => addCombining(name, "\u0323")
    }

];


function addCombining(text, mark) {

    return Array.from(text)
        .map(char => {

            if (char === " ") {
                return " ";
            }

            return char + mark;
        })
        .join("");

}


specialStyles.forEach(style => {
    addStyle(style.category, style.fn);
});


/* =========================================================
   EXTRA PREFIX / SUFFIX STYLES
   ========================================================= */

const prefixSuffix = [

    ["fancy", "×", "×"],
    ["fancy", "•", "•"],
    ["fancy", "·", "·"],
    ["fancy", "°", "°"],
    ["fancy", "˙", "˙"],
    ["fancy", "｡", "｡"],
    ["fancy", "﹏", "﹏"],
    ["fancy", "〜", "〜"],
    ["fancy", "〰", "〰"],
    ["fancy", "≛", "≛"],
    ["fancy", "⊱", "⊰"],
    ["fancy", "⊰", "⊱"],
    ["fancy", "༺", "༻"],
    ["fancy", "༼", "༽"],
    ["fancy", "乂", "乂"],
    ["gaming", "亗", "亗"],
    ["gaming", "乂", "乂"],
    ["gaming", "メ", "メ"],
    ["gaming", "ツ", "ツ"],
    ["gaming", "〆", "〆"],
    ["gaming", "々", "々"],
    ["gaming", "彡", "彡"],
    ["gaming", "么", "么"],
    ["attitude", "👑", "👑"],
    ["attitude", "😎", "😎"],
    ["attitude", "😈", "😈"],
    ["attitude", "🔥", "🔥"],
    ["attitude", "💀", "💀"],
    ["attitude", "⚡", "⚡"],
    ["attitude", "🖤", "🖤"],
    ["attitude", "💯", "💯"],
    ["symbols", "★", "★"],
    ["symbols", "☆", "☆"],
    ["symbols", "✦", "✦"],
    ["symbols", "✧", "✧"],
    ["symbols", "❖", "❖"],
    ["symbols", "◆", "◆"],
    ["symbols", "◇", "◇"],
    ["symbols", "♡", "♡"],
    ["symbols", "♥", "♥"],
    ["symbols", "♛", "♛"],
    ["symbols", "♚", "♚"],
    ["symbols", "⚜", "⚜"],
    ["symbols", "☯", "☯"],
    ["symbols", "☮", "☮"]
];


prefixSuffix.forEach(([category, prefix, suffix]) => {

    addStyle(
        category,
        name => `${prefix} ${name} ${suffix}`
    );

});


/* =========================================================
   MAKE SURE WE HAVE 300+ STYLES
   ========================================================= */

function buildAdditionalStyles() {

    const patterns = [

        ["fancy", "꧁༺ {name} ༻꧂"],
        ["fancy", "★彡 {name} 彡★"],
        ["fancy", "☆彡 {name} 彡☆"],
        ["fancy", "『 {name} 』"],
        ["fancy", "【 {name} 】"],
        ["fancy", "《 {name} 》"],
        ["fancy", "〈 {name} 〉"],
        ["fancy", "「 {name} 」"],
        ["fancy", "〖 {name} 〗"],
        ["fancy", "〘 {name} 〙"],

        ["gaming", "亗 {name} 亗"],
        ["gaming", "乂 {name} 乂"],
        ["gaming", "〆 {name} 〆"],
        ["gaming", "メ {name} メ"],
        ["gaming", "ツ {name} ツ"],
        ["gaming", "々 {name} 々"],
        ["gaming", "彡 {name} 彡"],
        ["gaming", "么 {name} 么"],

        ["attitude", "👑 {name} 👑"],
        ["attitude", "🔥 {name} 🔥"],
        ["attitude", "😎 {name} 😎"],
        ["attitude", "😈 {name} 😈"],
        ["attitude", "💀 {name} 💀"],
        ["attitude", "⚡ {name} ⚡"],
        ["attitude", "🖤 {name} 🖤"],

        ["symbols", "★ {name} ★"],
        ["symbols", "☆ {name} ☆"],
        ["symbols", "✦ {name} ✦"],
        ["symbols", "✧ {name} ✧"],
        ["symbols", "❖ {name} ❖"],
        ["symbols", "◆ {name} ◆"],
        ["symbols", "◇ {name} ◇"],
        ["symbols", "♡ {name} ♡"],
        ["symbols", "♥ {name} ♥"],
        ["symbols", "♛ {name} ♛"]
    ];


    let index = 0;

    while (styles.length < 340) {

        const pattern = patterns[index % patterns.length];

        const category = pattern[0];
        const template = pattern[1];

        const variations = [
            template,
            template.replace(/ /g, ""),
            template.replace("{name}", "【{name}】"),
            template.replace("{name}", "『{name}』"),
            template.replace("{name}", "〆{name}"),
            template.replace("{name}", "乂{name}"),
            template.replace("{name}", "★{name}★")
        ];

        const selected =
            variations[Math.floor(index / patterns.length) % variations.length];

        addStyle(
            category,
            name => selected.replace("{name}", name)
        );

        index++;
    }
}


buildAdditionalStyles();


/* =========================================================
   REMOVE EXACT DUPLICATES
   ========================================================= */

function getUniqueStyles() {

    const seen = new Set();
    const unique = [];

    styles.forEach(style => {

        const key = style.category + "|" + style.template.toString();

        if (!seen.has(key)) {
            seen.add(key);
            unique.push(style);
        }

    });

    return unique;
}


/* =========================================================
   FINAL STYLE LIST
   ========================================================= */

const allStyles = getUniqueStyles();


/* =========================================================
   GENERATE STYLES FOR NAME
   ========================================================= */

function generateStyles(name) {

    return allStyles.map((style, index) => {

        let result = "";

        try {
            result = style.template(name);
        } catch (error) {
            result = name;
        }

        return {
            id: index + 1,
            category: style.category,
            text: result
        };

    });

}


/* =========================================================
   FILTER STYLES
   ========================================================= */

function getFilteredStyles() {

    const generated = generateStyles(currentName);

    if (currentFilter === "all") {
        return generated;
    }

    return generated.filter(style => {
        return style.category === currentFilter;
    });

}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults() {

    if (!resultsContainer || !currentName) {
        return;
    }

    const filteredStyles = getFilteredStyles();

    resultsContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    filteredStyles.forEach((style, index) => {

        const card = document.createElement("article");
        card.className = "result-card";

        card.style.animationDelay = `${Math.min(index * 0.015, 0.35)}s`;

        const nameElement = document.createElement("div");
        nameElement.className = "result-name";
        nameElement.textContent = style.text;

        const copyButton = document.createElement("button");

        copyButton.type = "button";
        copyButton.className = "copy-result-button";

        copyButton.innerHTML = `
            <span class="copy-icon">📋</span>
            <span>Copy</span>
        `;

        copyButton.dataset.copy = style.text;

        copyButton.addEventListener("click", async () => {

            const copied = await copyText(style.text);

            if (copied) {

                copyButton.classList.add("copied");

                copyButton.innerHTML = `
                    <span class="copy-icon">✓</span>
                    <span>Copied!</span>
                `;

                showToast("Copied!");

                setTimeout(() => {

                    copyButton.classList.remove("copied");

                    copyButton.innerHTML = `
                        <span class="copy-icon">📋</span>
                        <span>Copy</span>
                    `;

                }, 1400);
            }

        });

        card.appendChild(nameElement);
        card.appendChild(copyButton);

        fragment.appendChild(card);

    });

    resultsContainer.appendChild(fragment);

    updateResultsTitle(filteredStyles.length);

}


/* =========================================================
   RESULTS TITLE
   ========================================================= */

function updateResultsTitle(count) {

    if (!resultsTitle) {
        return;
    }

    const filterName =
        currentFilter === "all"
            ? "Stylish Names"
            : `${capitalize(currentFilter)} Names`;

    resultsTitle.textContent =
        `${filterName} (${count})`;

}


/* =========================================================
   CAPITALIZE
   ========================================================= */

function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);

}


/* =========================================================
   GENERATE BUTTON
   ========================================================= */

function generateName() {

    if (!nameInput) {
        return;
    }

    const value = nameInput.value.trim();

    if (!value) {

        showToast("Please enter your name.");

        nameInput.focus();

        return;
    }

    currentName = value;

    /* LIVE PREVIEW */

    if (previewSection) {
        previewSection.hidden = false;
    }

    if (previewName) {
        previewName.textContent = value;
    }

    /* RESULTS */

    if (resultsSection) {
        resultsSection.hidden = false;
    }

    currentFilter = "all";

    updateFilterButtons();

    renderResults();

    /* Button animation */

    if (generateButton) {

        generateButton.classList.add("generating");

        const originalHTML = generateButton.innerHTML;

        generateButton.innerHTML = `
            <span>✓</span>
            Generated!
        `;

        setTimeout(() => {

            generateButton.classList.remove("generating");

            generateButton.innerHTML = originalHTML;

        }, 900);

    }

    /* Scroll toward results */

    setTimeout(() => {

        if (resultsSection) {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 120);

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (nameForm) {

    nameForm.addEventListener("submit", event => {

        event.preventDefault();

        generateName();

    });

}


/* =========================================================
   LIVE PREVIEW
   =========================================================
   HTML/CSS already says LIVE PREVIEW,
   so preview updates while user types.
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("input", () => {

        const value = nameInput.value.trim();

        if (clearName) {
            clearName.hidden = value.length === 0;
        }

        if (previewName) {

            previewName.textContent =
                value || "Your Name";

        }

        if (!value) {

            if (previewSection) {
                previewSection.hidden = true;
            }

        } else {

            if (previewSection) {
                previewSection.hidden = false;
            }

        }

    });

}


/* =========================================================
   CLEAR NAME
   ========================================================= */

if (clearName) {

    clearName.addEventListener("click", () => {

        nameInput.value = "";

        currentName = "";

        clearName.hidden = true;

        if (previewName) {
            previewName.textContent = "Your Name";
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

    const buttons =
        styleFilters.querySelectorAll(".filter-button");

    buttons.forEach(button => {

        const filter = button.dataset.filter;

        button.classList.toggle(
            "active",
            filter === currentFilter
        );

    });

}


if (styleFilters) {

    styleFilters.addEventListener("click", event => {

        const button =
            event.target.closest(".filter-button");

        if (!button) {
            return;
        }

        if (!currentName) {
            showToast("Generate a name first.");
            return;
        }

        currentFilter =
            button.dataset.filter || "all";

        updateFilterButtons();

        renderResults();

    });

}


/* =========================================================
   COPY FUNCTION
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

        /* Fallback for older browsers */

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const success =
            document.execCommand("copy");

        textarea.remove();

        return success;

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   SYMBOL CARDS
   ========================================================= */

if (symbolsGrid) {

    symbolsGrid.addEventListener("click", async event => {

        const card =
            event.target.closest(".symbol-card");

        if (!card) {
            return;
        }

        const symbol =
            card.dataset.symbol;

        if (!symbol) {
            return;
        }

        const copied =
            await copyText(symbol);

        if (!copied) {
            showToast("Copy failed.");
            return;
        }

        card.classList.add("copied");

        const small =
            card.querySelector("small");

        if (small) {

            const originalText =
                small.textContent;

            small.textContent = "Copied!";

            setTimeout(() => {

                small.textContent =
                    originalText;

            }, 1200);

        }

        showToast("Symbol copied!");

        setTimeout(() => {

            card.classList.remove("copied");

        }, 1200);

    });

}


/* =========================================================
   TRENDING STYLE BUTTONS
   ========================================================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest(".use-style-button");

    if (!button) {
        return;
    }

    const template =
        button.dataset.template;

    if (!template) {
        return;
    }

    if (!nameInput) {
        return;
    }

    const existingName =
        nameInput.value.trim();

    const name =
        existingName || "Your Name";

    const styledName =
        template.replace(
            "{name}",
            name
        );

    nameInput.value = name;

    currentName = name;

    if (clearName) {
        clearName.hidden = false;
    }

    if (previewSection) {
        previewSection.hidden = false;
    }

    if (previewName) {
        previewName.textContent = styledName;
    }

    if (resultsSection) {
        resultsSection.hidden = false;
    }

    currentFilter = "all";

    updateFilterButtons();

    renderResults();

    showToast("Style selected!");

    if (resultsSection) {

        setTimeout(() => {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    const isOpen =
        mobileMenu.classList.toggle("open");

    mobileMenuButton.classList.toggle(
        "open",
        isOpen
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

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

if (mobileMenu) {

    mobileMenu.addEventListener("click", event => {

        const link =
            event.target.closest(".mobile-nav-link");

        if (!link) {
            return;
        }

        closeMobileMenu();

    });

}


function closeMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.remove("open");

    mobileMenuButton.classList.remove("open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

if (bottomMenuButton) {

    bottomMenuButton.addEventListener(
        "click",
        () => {

            toggleMobileMenu();

        }
    );

}


/* =========================================================
   CLOSE MENU ON OUTSIDE CLICK
   ========================================================= */

document.addEventListener("click", event => {

    if (
        !mobileMenu ||
        !mobileMenuButton
    ) {
        return;
    }

    if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target) &&
        !(
            bottomMenuButton &&
            bottomMenuButton.contains(event.target)
        )
    ) {

        closeMobileMenu();

    }

});


/* =========================================================
   CLOSE MENU WITH ESCAPE
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMobileMenu();

    }

});


/* =========================================================
   MOBILE BOTTOM NAV
   ========================================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );

bottomNavItems.forEach(item => {

    item.addEventListener("click", event => {

        if (
            item.id === "bottomMenuButton"
        ) {
            return;
        }

        bottomNavItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});


/* =========================================================
   DESKTOP NAV ACTIVE STATE
   ========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================================
   MOBILE NAV ACTIVE STATE
   ========================================================= */

const mobileNavLinks =
    document.querySelectorAll(
        ".mobile-nav-link"
    );

mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNavLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.remove("show");

    /* Force reflow so repeated toast works */

    void toast.offsetWidth;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* =========================================================
   INPUT ENTER SUPPORT
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("keydown", event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            generateName();

        }

    });

}


/* =========================================================
   INPUT PASTE CLEANUP
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("paste", () => {

        setTimeout(() => {

            const value =
                nameInput.value;

            if (value.length > 30) {

                nameInput.value =
                    value.substring(0, 30);

            }

            const trimmed =
                nameInput.value.trim();

            if (clearName) {
                clearName.hidden =
                    trimmed.length === 0;
            }

            if (previewName) {

                previewName.textContent =
                    trimmed || "Your Name";

            }

        }, 0);

    });

}


/* =========================================================
   FAQ ACCESSIBILITY / SINGLE OPEN ITEM
   ========================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );

faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

        if (!item.open) {
            return;
        }

        faqItems.forEach(other => {

            if (
                other !== item &&
                other.open
            ) {

                other.open = false;

            }

        });

    });

});


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (clearName && nameInput) {

    clearName.hidden =
        nameInput.value.trim().length === 0;

}

if (previewName) {
    previewName.textContent = "Your Name";
}

if (previewSection) {
    previewSection.hidden = true;
}

if (resultsSection) {
    resultsSection.hidden = true;
}

updateFilterButtons();


/* =========================================================
   DEBUG INFORMATION
   =========================================================
   Open browser console to see number of available styles.
   ========================================================= */

console.log(
    `Z-Name Style loaded successfully: ${allStyles.length}+ styles available.`
);
