/* =========================================================
   Z-NAME STYLE
   COMPLETE SCRIPT.JS
   Works with the provided index.html
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
   CURRENT STATE
   ========================================================= */

let currentName = "";
let currentTemplate = null;
let toastTimer = null;


/* =========================================================
   200+ STYLE TEMPLATES
   IMPORTANT:
   Only the final stylish name is displayed.
   No numbers or category names are added.
   ========================================================= */

const STYLE_TEMPLATES = [

    "꧁༺ {name} ༻꧂",
    "꧁༺{name}༻꧂",
    "꧁{name}꧂",
    "༺ {name} ༻",
    "༺{name}༻",
    "『{name}』",
    "『 {name} 』",
    "【{name}】",
    "【 {name} 】",
    "〖{name}〗",
    "〘{name}〙",
    "〚{name}〛",
    "《{name}》",
    "〈{name}〉",
    "「{name}」",
    "『༺{name}༻』",
    "꧁𓊈𒆜 {name} 𒆜𓊉꧂",
    "꧁𓊈{ name }𓊉꧂",
    "亗 {name} 亗",
    "亗{name}亗",
    "乂 {name} 乂",
    "乂{name}乂",
    "彡 {name} 彡",
    "彡{name}彡",
    "ツ {name} ツ",
    "ツ{name}ツ",
    "࿐ {name} ࿐",
    "࿐{name}࿐",
    "★ {name} ★",
    "★彡 {name} 彡★",
    "★彡{name}彡★",
    "☆ {name} ☆",
    "☆彡 {name} 彡☆",
    "✦ {name} ✦",
    "✧ {name} ✧",
    "✯ {name} ✯",
    "✰ {name} ✰",
    "✪ {name} ✪",
    "✵ {name} ✵",
    "✺ {name} ✺",
    "❖ {name} ❖",
    "◆ {name} ◆",
    "◇ {name} ◇",
    "◈ {name} ◈",
    "◉ {name} ◉",
    "● {name} ●",
    "○ {name} ○",
    "• {name} •",
    "× {name} ×",
    "メ {name} メ",
    "乄 {name} 乄",
    "么 {name} 么",
    "々 {name} 々",
    "〆 {name} 〆",
    "〄 {name} 〄",
    "シ {name} シ",
    "ツ乂 {name} 乂ツ",
    "亗〆 {name} 〆亗",
    "乂亗 {name} 亗乂",
    "メ亗 {name} 亗メ",
    "『亗 {name} 亗』",
    "『乂 {name} 乂』",
    "『★ {name} ★』",
    "【亗 {name} 亗】",
    "【乂 {name} 乂】",
    "【★ {name} ★】",
    "꧁亗 {name} 亗꧂",
    "꧁乂 {name} 乂꧂",
    "꧁★ {name} ★꧂",
    "꧁༺ {name} ༻꧂",
    "꧁༺★ {name} ★༻꧂",
    "꧁༺亗 {name} 亗༻꧂",
    "꧁༺乂 {name} 乂༻꧂",
    "꧁𓆩 {name} 𓆪꧂",
    "𓆩 {name} 𓆪",
    "𓆩{name}𓆪",
    "𓆩♡{name}♡𓆪",
    "𓆩★{name}★𓆪",
    "𓆩亗{name}亗𓆪",
    "𓆩乂{name}乂𓆪",
    "༒ {name} ༒",
    "༒︎ {name} ༒︎",
    "༒{name}༒",
    "☬ {name} ☬",
    "☬{name}☬",
    "♛ {name} ♛",
    "♛{name}♛",
    "♕ {name} ♕",
    "♕{name}♕",
    "♚ {name} ♚",
    "♚{name}♚",
    "♔ {name} ♔",
    "♔{name}♔",
    "♤ {name} ♤",
    "♧ {name} ♧",
    "♡ {name} ♡",
    "♥ {name} ♥",
    "❥ {name} ❥",
    "ღ {name} ღ",
    "❣ {name} ❣",
    "☾ {name} ☽",
    "☽ {name} ☾",
    "☠ {name} ☠",
    "☠︎ {name} ☠︎",
    "☣ {name} ☣",
    "☢ {name} ☢",
    "⚔ {name} ⚔",
    "⚡ {name} ⚡",
    "🔥 {name} 🔥",
    "❄ {name} ❄",
    "🌙 {name} 🌙",
    "🌸 {name} 🌸",
    "💫 {name} 💫",
    "💎 {name} 💎",
    "👑 {name} 👑",
    "👑༺ {name} ༻👑",
    "⚡亗 {name} 亗⚡",
    "🔥亗 {name} 亗🔥",
    "☠亗 {name} 亗☠",
    "♛亗 {name} 亗♛",
    "♛༺ {name} ༻♛",
    "♚༺ {name} ༻♚",
    "★༺ {name} ༻★",
    "☆༺ {name} ༻☆",
    "✦༺ {name} ༻✦",
    "✧༺ {name} ༻✧",
    "❖༺ {name} ༻❖",
    "◆༺ {name} ༻◆",
    "◇༺ {name} ༻◇",
    "☬༺ {name} ༻☬",
    "༒༺ {name} ༻༒",
    "☠༺ {name} ༻☠",
    "⚔༺ {name} ༻⚔",
    "⚡༺ {name} ༻⚡",
    "🔥༺ {name} ༻🔥",
    "❄༺ {name} ༻❄",
    "♡༺ {name} ༻♡",
    "ღ༺ {name} ༻ღ",
    "❥༺ {name} ༻❥",
    "꧁♛ {name} ♛꧂",
    "꧁♚ {name} ♚꧂",
    "꧁♕ {name} ♕꧂",
    "꧁⚡ {name} ⚡꧂",
    "꧁🔥 {name} 🔥꧂",
    "꧁☠ {name} ☠꧂",
    "꧁☬ {name} ☬꧂",
    "꧁༒ {name} ༒꧂",
    "꧁♡ {name} ♡꧂",
    "꧁ღ {name} ღ꧂",
    "꧁✦ {name} ✦꧂",
    "꧁✧ {name} ✧꧂",
    "꧁❖ {name} ❖꧂",
    "꧁◆ {name} ◆꧂",
    "꧁◇ {name} ◇꧂",
    "꧁★ {name} ★꧂",
    "꧁☆ {name} ☆꧂",
    "『★ {name} ★』",
    "『☆ {name} ☆』",
    "『✦ {name} ✦』",
    "『✧ {name} ✧』",
    "『亗 {name} 亗』",
    "『☠ {name} ☠』",
    "『♛ {name} ♛』",
    "『⚡ {name} ⚡』",
    "『🔥 {name} 🔥』",
    "『♡ {name} ♡』",
    "【★ {name} ★】",
    "【☆ {name} ☆】",
    "【✦ {name} ✦】",
    "【✧ {name} ✧】",
    "【亗 {name} 亗】",
    "【☠ {name} ☠】",
    "【♛ {name} ♛】",
    "【⚡ {name} ⚡】",
    "【🔥 {name} 🔥】",
    "【♡ {name} ♡】",
    "〖★ {name} ★〗",
    "〖亗 {name} 亗〗",
    "〖乂 {name} 乂〗",
    "〖⚡ {name} ⚡〗",
    "〖🔥 {name} 🔥〗",
    "〘★ {name} ★〙",
    "〘亗 {name} 亗〙",
    "〘乂 {name} 乂〙",
    "〘⚡ {name} ⚡〙",
    "〘🔥 {name} 🔥〙",
    "《★ {name} ★》",
    "《亗 {name} 亗》",
    "《乂 {name} 乂》",
    "《⚡ {name} ⚡》",
    "《🔥 {name} 🔥》",
    "〈★ {name} ★〉",
    "〈亗 {name} 亗〉",
    "〈乂 {name} 乂〉",
    "〈⚡ {name} ⚡〉",
    "〈🔥 {name} 🔥〉",
    "乂★ {name} ★乂",
    "乂亗 {name} 亗乂",
    "乂☠ {name} ☠乂",
    "乂⚡ {name} ⚡乂",
    "乂🔥 {name} 🔥乂",
    "彡★ {name} ★彡",
    "彡亗 {name} 亗彡",
    "彡乂 {name} 乂彡",
    "彡⚡ {name} ⚡彡",
    "彡🔥 {name} 🔥彡",
    "ツ★ {name} ★ツ",
    "ツ亗 {name} 亗ツ",
    "ツ乂 {name} 乂ツ",
    "ツ⚡ {name} ⚡ツ",
    "ツ🔥 {name} 🔥ツ",
    "メ★ {name} ★メ",
    "メ亗 {name} 亗メ",
    "メ乂 {name} 乂メ",
    "メ⚡ {name} ⚡メ",
    "メ🔥 {name} 🔥メ",
    "〆★ {name} ★〆",
    "〆亗 {name} 亗〆",
    "〆乂 {name} 乂〆",
    "〆⚡ {name} ⚡〆",
    "〆🔥 {name} 🔥〆",
    "么★ {name} ★么",
    "么亗 {name} 亗么",
    "么乂 {name} 乂么",
    "么⚡ {name} ⚡么",
    "么🔥 {name} 🔥么",
    "々★ {name} ★々",
    "々亗 {name} 亗々",
    "々乂 {name} 乂々",
    "々⚡ {name} ⚡々",
    "々🔥 {name} 🔥々",
    "★彡 {name} 彡★",
    "★彡{name}彡★",
    "☆彡 {name} 彡☆",
    "✦彡 {name} 彡✦",
    "亗彡 {name} 彡亗",
    "乂彡 {name} 彡乂",
    "⚡彡 {name} 彡⚡",
    "🔥彡 {name} 彡🔥",
    "☠彡 {name} 彡☠",
    "♛彡 {name} 彡♛",
    "༺★ {name} ★༻",
    "༺☆ {name} ☆༻",
    "༺✦ {name} ✦༻",
    "༺✧ {name} ✧༻",
    "༺亗 {name} 亗༻",
    "༺乂 {name} 乂༻",
    "༺⚡ {name} ⚡༻",
    "༺🔥 {name} 🔥༻",
    "༺☠ {name} ☠༻",
    "༺♛ {name} ♛༻",
    "༺♡ {name} ♡༻",
    "༺ღ {name} ღ༻",
    "𒆜 {name} 𒆜",
    "𒆜{name}𒆜",
    "𒁍 {name} 𒁍",
    "𒀱 {name} 𒀱",
    "𓆩 {name} 𓆪",
    "𓆩{name}𓆪",
    "𓆩★ {name} ★𓆪",
    "𓆩亗 {name} 亗𓆪",
    "𓆩乂 {name} 乂𓆪",
    "𓆩⚡ {name} ⚡𓆪",
    "𓆩🔥 {name} 🔥𓆪",
    "𓆩♡ {name} ♡𓆪",
    "☾✦ {name} ✦☽",
    "☾★ {name} ★☽",
    "☽亗 {name} 亗☾",
    "☾♛ {name} ♛☽",
    "☾♡ {name} ♡☽",
    "⚜ {name} ⚜",
    "⚜️ {name} ⚜️",
    "⚜༺ {name} ༻⚜",
    "♔༺ {name} ༻♔",
    "♕༺ {name} ༻♕",
    "♚༺ {name} ༻♚",
    "♛༺ {name} ༻♛",
    "👑 {name} 👑",
    "👑亗 {name} 亗👑",
    "👑༺ {name} ༻👑",
    "💎 {name} 💎",
    "💎༺ {name} ༻💎",
    "🌸 {name} 🌸",
    "🌸༺ {name} ༻🌸",
    "♡ {name} ♡",
    "♡༺ {name} ༻♡",
    "♥ {name} ♥",
    "♥༺ {name} ༻♥",
    "ღ {name} ღ",
    "ღ༺ {name} ༻ღ",
    "❥ {name} ❥",
    "❥༺ {name} ༻❥",
    "☠ {name} ☠",
    "☠༺ {name} ༻☠",
    "☣ {name} ☣",
    "☢ {name} ☢",
    "⚔ {name} ⚔",
    "⚔༺ {name} ༻⚔",
    "⚡ {name} ⚡",
    "⚡༺ {name} ༻⚡",
    "🔥 {name} 🔥",
    "🔥༺ {name} ༻🔥",
    "❄ {name} ❄",
    "❄༺ {name} ༻❄",
    "🌙 {name} 🌙",
    "🌙༺ {name} ༻🌙",
    "💫 {name} 💫",
    "💫༺ {name} ༻💫",
    "✨ {name} ✨",
    "✨༺ {name} ༻✨",
    "✰ {name} ✰",
    "✰༺ {name} ༻✰",
    "✯ {name} ✯",
    "✯༺ {name} ༻✯",
    "❖ {name} ❖",
    "❖༺ {name} ༻❖",
    "◆ {name} ◆",
    "◆༺ {name} ༻◆",
    "◇ {name} ◇",
    "◇༺ {name} ༻◇",
    "◈ {name} ◈",
    "◈༺ {name} ༻◈",
    "★ {name} ★",
    "★༺ {name} ༻★",
    "☆ {name} ☆",
    "☆༺ {name} ༻☆"
];


/* =========================================================
   EXTRA UNICODE FONT MAPS
   These create actual fancy letters.
   ========================================================= */

const FONT_STYLES = {

    bold: {
        upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
        lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
        digits: "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
    },

    italic: {
        upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
        lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
        digits: "0123456789"
    },

    boldItalic: {
        upper: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
        lower: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
        digits: "0123456789"
    },

    script: {
        upper: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
        lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
        digits: "0123456789"
    },

    double: {
        upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
        lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
        digits: "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
    },

    fraktur: {
        upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
        lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
        digits: "0123456789"
    },

    monospace: {
        upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
        lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
        digits: "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
    },

    fullwidth: {
        upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
        lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
        digits: "０１２３４５６７８９"
    }
};


/* =========================================================
   FANCY FONT CONVERTER
   ========================================================= */

function convertToFont(text, font) {

    if (!FONT_STYLES[font]) {
        return text;
    }

    const style = FONT_STYLES[font];

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";

    let output = "";

    for (const character of text) {

        const upperIndex = upper.indexOf(character);

        if (upperIndex !== -1) {
            output += style.upper[upperIndex] || character;
            continue;
        }

        const lowerIndex = lower.indexOf(character);

        if (lowerIndex !== -1) {
            output += style.lower[lowerIndex] || character;
            continue;
        }

        const digitIndex = digits.indexOf(character);

        if (digitIndex !== -1) {
            output += style.digits[digitIndex] || character;
            continue;
        }

        output += character;
    }

    return output;
}


/* =========================================================
   FONT-BASED STYLES
   ========================================================= */

const FONT_TEMPLATES = [

    "{font:bold}",
    "{font:italic}",
    "{font:boldItalic}",
    "{font:script}",
    "{font:double}",
    "{font:fraktur}",
    "{font:monospace}",
    "{font:fullwidth}",

    "★ {font:bold} ★",
    "亗 {font:bold} 亗",
    "乂 {font:bold} 乂",
    "彡 {font:bold} 彡",
    "『{font:bold}』",
    "꧁{font:bold}꧂",

    "★彡 {font:bold} 彡★",
    "亗 {font:boldItalic} 亗",
    "乂 {font:boldItalic} 乂",
    "♛ {font:bold} ♛",
    "☠ {font:bold} ☠",
    "⚡ {font:bold} ⚡",
    "🔥 {font:bold} 🔥",
    "♡ {font:script} ♡",
    "ღ {font:script} ღ",
    "꧁༺ {font:bold} ༻꧂",
    "꧁亗 {font:bold} 亗꧂",
    "『★ {font:bold} ★』",
    "【亗 {font:bold} 亗】",
    "༺ {font:boldItalic} ༻",
    "𓆩 {font:bold} 𓆪",
    "♛ {font:double} ♛",
    "⚔ {font:fraktur} ⚔",
    "☬ {font:bold} ☬",
    "✦ {font:script} ✦",
    "✧ {font:italic} ✧",
    "❖ {font:bold} ❖",
    "💎 {font:bold} 💎",
    "👑 {font:bold} 👑",
    "☠ {font:fraktur} ☠",
    "⚡ {font:double} ⚡",
    "🔥 {font:boldItalic} 🔥",
    "🌙 {font:script} 🌙",
    "✨ {font:fullwidth} ✨"
];


/* =========================================================
   CATEGORY TEMPLATES
   ========================================================= */

const CATEGORY_TEMPLATES = {

    gaming: [
        "亗 {name} 亗",
        "乂 {name} 乂",
        "彡 {name} 彡",
        "★彡 {name} 彡★",
        "『{name}』",
        "꧁亗 {name} 亗꧂",
        "꧁乂 {name} 乂꧂",
        "乂★ {name} ★乂",
        "亗〆 {name} 〆亗",
        "メ亗 {name} 亗メ",
        "⚔ {name} ⚔",
        "☠ {name} ☠",
        "⚡ {name} ⚡",
        "🔥 {name} 🔥",
        "༒ {name} ༒",
        "☬ {name} ☬",
        "꧁༺ {name} ༻꧂",
        "꧁𓊈 {name} 𓊉꧂",
        "𒆜 {name} 𒆜",
        "『亗 {name} 亗』",
        "【乂 {name} 乂】",
        "彡⚡ {name} ⚡彡",
        "ツ乂 {name} 乂ツ",
        "〆★ {name} ★〆"
    ],

    attitude: [
        "☠ {name} ☠",
        "☠༺ {name} ༻☠",
        "亗 {name} 亗",
        "乂 {name} 乂",
        "⚡ {name} ⚡",
        "🔥 {name} 🔥",
        "༒ {name} ༒",
        "『☠ {name} ☠』",
        "꧁☠ {name} ☠꧂",
        "꧁亗 {name} 亗꧂",
        "乂⚡ {name} ⚡乂",
        "彡🔥 {name} 🔥彡",
        "☠彡 {name} 彡☠",
        "⚔༺ {name} ༻⚔",
        "♛༺ {name} ༻♛",
        "『⚡ {name} ⚡』",
        "【☠ {name} ☠】",
        "༺☠ {name} ☠༻",
        "亗〆 {name} 〆亗",
        "么 {name} 么"
    ],

    royal: [
        "♛ {name} ♛",
        "♕ {name} ♕",
        "♚ {name} ♚",
        "♔ {name} ♔",
        "👑 {name} 👑",
        "⚜ {name} ⚜",
        "♛༺ {name} ༻♛",
        "♚༺ {name} ༻♚",
        "꧁♛ {name} ♛꧂",
        "꧁♚ {name} ♚꧂",
        "👑༺ {name} ༻👑",
        "♕亗 {name} 亗♕",
        "♛亗 {name} 亗♛",
        "『♛ {name} ♛』",
        "【♚ {name} ♚】",
        "⚜༺ {name} ༻⚜",
        "꧁༺♛ {name} ♛༻꧂",
        "𓆩♛ {name} ♛𓆪"
    ],

    love: [
        "♡ {name} ♡",
        "♥ {name} ♥",
        "ღ {name} ღ",
        "❥ {name} ❥",
        "❣ {name} ❣",
        "♡༺ {name} ༻♡",
        "♥༺ {name} ༻♥",
        "ღ༺ {name} ༻ღ",
        "❥༺ {name} ༻❥",
        "『♡ {name} ♡』",
        "꧁♡ {name} ♡꧂",
        "𓆩♡ {name} ♡𓆪",
        "🌸 {name} 🌸",
        "🌸༺ {name} ༻🌸",
        "💫 {name} 💫",
        "✨ {name} ✨"
    ],

    cool: [
        "★ {name} ★",
        "☆ {name} ☆",
        "✦ {name} ✦",
        "✧ {name} ✧",
        "✯ {name} ✯",
        "✰ {name} ✰",
        "❖ {name} ❖",
        "◆ {name} ◆",
        "◇ {name} ◇",
        "◈ {name} ◈",
        "★彡 {name} 彡★",
        "☆彡 {name} 彡☆",
        "꧁★ {name} ★꧂",
        "『✦ {name} ✦』",
        "【✧ {name} ✧】",
        "༺✯ {name} ✯༻",
        "✦༺ {name} ༻✦",
        "💎 {name} 💎"
    ],

    dark: [
        "☠ {name} ☠",
        "☣ {name} ☣",
        "☢ {name} ☢",
        "༒ {name} ༒",
        "☠༺ {name} ༻☠",
        "꧁☠ {name} ☠꧂",
        "『☠ {name} ☠』",
        "【☠ {name} ☠】",
        "𓆩☠ {name} ☠𓆪",
        "彡☠ {name} ☠彡",
        "乂☠ {name} ☠乂",
        "⚔ {name} ⚔",
        "⚔༺ {name} ༻⚔",
        "༺☠ {name} ☠༻",
        "꧁༒ {name} ༒꧂",
        "☠彡 {name} 彡☠"
    ],

    fancy: [
        "꧁༺ {name} ༻꧂",
        "『{name}』",
        "【{name}】",
        "〖{name}〗",
        "〘{name}〙",
        "《{name}》",
        "★彡 {name} 彡★",
        "✦ {name} ✦",
        "✧ {name} ✧",
        "❖ {name} ❖",
        "༺ {name} ༻",
        "𓆩 {name} 𓆪",
        "꧁✦ {name} ✦꧂",
        "꧁❖ {name} ❖꧂",
        "『★ {name} ★』",
        "【✦ {name} ✦】",
        "༺★ {name} ★༻",
        "꧁𓊈 {name} 𓊉꧂"
    ],

    cute: [
        "♡ {name} ♡",
        "ღ {name} ღ",
        "🌸 {name} 🌸",
        "♡༺ {name} ༻♡",
        "🌸༺ {name} ༻🌸",
        "꧁♡ {name} ♡꧂",
        "𓆩♡ {name} ♡𓆪",
        "✿ {name} ✿",
        "❀ {name} ❀",
        "❁ {name} ❁",
        "🌷 {name} 🌷",
        "🦋 {name} 🦋",
        "✨ {name} ✨",
        "💫 {name} 💫",
        "♡彡 {name} 彡♡"
    ]
};


/* =========================================================
   SAFE TEXT CLEANING
   ========================================================= */

function cleanName(value) {

    return value
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30);
}


/* =========================================================
   APPLY TEMPLATE
   ========================================================= */

function applyTemplate(template, name) {

    if (!template) {
        return name;
    }

    let result = template;

    const fontMatches = result.match(/\{font:([^}]+)\}/g);

    if (fontMatches) {

        fontMatches.forEach(match => {

            const fontName = match
                .replace("{font:", "")
                .replace("}", "");

            result = result.replace(
                match,
                convertToFont(name, fontName)
            );

        });

        return result;
    }

    return result.replace(/\{name\}/g, name);
}


/* =========================================================
   CREATE RESULT LIST
   ========================================================= */

function buildResults(name, templates = STYLE_TEMPLATES) {

    const output = [];

    const used = new Set();

    const combined = [
        ...templates,
        ...FONT_TEMPLATES
    ];

    for (const template of combined) {

        const styled = applyTemplate(template, name);

        if (!styled) {
            continue;
        }

        if (styled === name) {
            continue;
        }

        if (used.has(styled)) {
            continue;
        }

        used.add(styled);
        output.push(styled);
    }

    return output;
}


/* =========================================================
   CREATE RESULT CARD
   ========================================================= */

function createResultCard(styledName) {

    const card = document.createElement("div");

    card.className = "style-result-card";

    const nameElement = document.createElement("div");

    nameElement.className = "style-result-name";

    nameElement.textContent = styledName;

    const copyButton = document.createElement("button");

    copyButton.type = "button";

    copyButton.className = "copy-style-button";

    copyButton.textContent = "Copy";

    copyButton.setAttribute(
        "aria-label",
        "Copy stylish name"
    );

    copyButton.addEventListener("click", async () => {

        const copied = await copyText(styledName);

        if (copied) {

            copyButton.textContent = "Copied!";

            showToast("Name copied!");

            setTimeout(() => {

                copyButton.textContent = "Copy";

            }, 1200);

        } else {

            showToast("Copy failed");

        }

    });

    card.appendChild(nameElement);
    card.appendChild(copyButton);

    return card;
}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults(name, templates = STYLE_TEMPLATES) {

    if (!resultsContainer) {
        return;
    }

    resultsContainer.innerHTML = "";

    const results = buildResults(name, templates);

    results.forEach(styledName => {

        const card = createResultCard(styledName);

        resultsContainer.appendChild(card);

    });

    if (resultsSection) {
        resultsSection.hidden = false;
    }

    if (resultsTitle) {
        resultsTitle.textContent = "Stylish Names";
    }

    if (previewSection) {
        previewSection.hidden = false;
    }

    if (previewName) {
        previewName.textContent = name;
    }
}


/* =========================================================
   GENERATE
   ========================================================= */

function generateNames() {

    const enteredName = cleanName(nameInput ? nameInput.value : "");

    if (!enteredName) {

        showToast("Please enter your name");

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }

    currentName = enteredName;

    currentTemplate = null;

    renderResults(currentName);

    if (resultsSection) {

        setTimeout(() => {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }
}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (nameForm) {

    nameForm.addEventListener("submit", event => {

        event.preventDefault();

        generateNames();

    });

}


/* =========================================================
   LIVE PREVIEW
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("input", () => {

        const value = cleanName(nameInput.value);

        if (clearName) {
            clearName.hidden = value.length === 0;
        }

        if (previewName && value) {

            previewName.textContent = value;

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

        if (nameInput) {
            nameInput.value = "";
            nameInput.focus();
        }

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

    });

}


/* =========================================================
   DISABLE OLD RESULT FILTERS
   User does NOT want these filters.
   ========================================================= */

if (styleFilters) {

    styleFilters.style.display = "none";

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

    try {

        const textarea = document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(
            0,
            textarea.value.length
        );

        const successful = document.execCommand("copy");

        textarea.remove();

        return successful;

    } catch (error) {

        console.error(
            "Fallback copy failed:",
            error
        );

        return false;
    }
}


/* =========================================================
   TOAST
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

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */
if (symbolsGrid) {

    const symbolButtons =
        symbolsGrid.querySelectorAll(
            ".symbol-card"
        );

    symbolButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const symbol =
                button.dataset.symbol ||
                button.querySelector("span")?.textContent ||
                "";

            if (!symbol) {
                return;
            }

            const copied = await copyText(symbol);

            if (copied) {

                showToast(
                    `Copied: ${symbol}`
                );

            } else {

                showToast("Copy failed");

            }

        });

    });

}


/* =========================================================
   TRENDING STYLE BUTTONS
   ========================================================= */

const useStyleButtons =
    document.querySelectorAll(
        ".use-style-button"
    );

useStyleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const template =
            button.dataset.template;

        if (!template) {
            return;
        }

        const name =
            cleanName(
                nameInput
                    ? nameInput.value
                    : ""
            );

        if (!name) {

            showToast(
                "Enter your name first"
            );

            if (nameInput) {
                nameInput.focus();
            }

            return;
        }

        currentName = name;
        currentTemplate = template;

        const styledName =
            applyTemplate(
                template,
                currentName
            );

        if (previewName) {

            previewName.textContent =
                styledName;

        }

        if (previewSection) {

            previewSection.hidden =
                false;

        }

        if (resultsContainer) {

            resultsContainer.innerHTML = "";

            const card =
                createResultCard(
                    styledName
                );

            resultsContainer.appendChild(card);

        }

        if (resultsSection) {

            resultsSection.hidden =
                false;

            setTimeout(() => {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    });

});


/* =========================================================
   CATEGORY CARDS
   ========================================================= */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        if (!category) {
            return;
        }

        const name =
            cleanName(
                nameInput
                    ? nameInput.value
                    : ""
            );

        if (!name) {

            showToast(
                "Enter your name first"
            );

            if (nameInput) {
                nameInput.focus();
            }

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

            return;
        }

        currentName = name;

        const templates =
            CATEGORY_TEMPLATES[category] ||
            STYLE_TEMPLATES;

        renderResults(
            currentName,
            templates
        );

        if (resultsSection) {

            setTimeout(() => {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    });

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.remove("open");

    if (mobileMenuButton) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* OPEN / CLOSE MOBILE MENU */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            if (!mobileMenu) {
                return;
            }

            const isOpen =
                mobileMenu.classList.contains(
                    "open"
                );

            if (isOpen) {

                closeMobileMenu();

            } else {

                mobileMenu.classList.add(
                    "open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

}


/* CLOSE MENU AFTER NAVIGATION */

const mobileNavLinks =
    document.querySelectorAll(
        ".mobile-nav-link"
    );

mobileNavLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

if (bottomMenuButton) {

    bottomMenuButton.addEventListener(
        "click",
        () => {

            if (!mobileMenu) {
                return;
            }

            const isOpen =
                mobileMenu.classList.contains(
                    "open"
                );

            if (isOpen) {

                closeMobileMenu();

            } else {

                mobileMenu.classList.add(
                    "open"
                );

                if (mobileMenuButton) {

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }

        }
    );

}


/* =========================================================
   DESKTOP NAV ACTIVE STATE
   ========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================================
   MOBILE BOTTOM NAV ACTIVE STATE
   ========================================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );

bottomNavItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            bottomNavItems.forEach(
                navItem => {

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
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!mobileMenu || !mobileMenuButton) {
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
   SMOOTH SCROLL FOR INTERNAL LINKS
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );

internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

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

});


/* =========================================================
   KEYBOARD SHORTCUT
   Enter = Generate
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
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

function initializeApp() {

    if (resultsSection) {
        resultsSection.hidden = true;
    }

    if (previewSection) {
        previewSection.hidden = true;
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }

    if (clearName) {
        clearName.hidden = true;
    }

    if (styleFilters) {
        styleFilters.style.display = "none";
    }

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}


/* =========================================================
   GLOBAL HELPERS
   Optional:
   window.ZNameStyle.generate("Rajvir")
   window.ZNameStyle.copy("text")
   ========================================================= */

window.ZNameStyle = {

    generate: function(name) {

        if (nameInput) {
            nameInput.value =
                cleanName(name);

            nameInput.dispatchEvent(
                new Event("input")
            );
        }

        generateNames();

    },

    copy: function(text) {

        return copyText(text);

    },

    getStyles: function(name) {

        return buildResults(
            cleanName(name)
        );

    }

};


/* =========================================================
   END OF SCRIPT
   ========================================================= */
