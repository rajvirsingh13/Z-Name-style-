/* =========================================================
   Z-NAME STYLE
   Complete script.js
   Compatible with the provided index.html + style.css
   220+ Stylish Name Styles
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
let currentResults = [];
let currentFilter = "all";
let toastTimer = null;


/* =========================================================
   UNICODE FONT TABLES
   ========================================================= */

const normalUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const normalLower = "abcdefghijklmnopqrstuvwxyz";

const boldUpper =
    "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙";

const boldLower =
    "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳";

const italicUpper =
    "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍";

const italicLower =
    "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧";

const boldItalicUpper =
    "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁";

const boldItalicLower =
    "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛";

const scriptUpper =
    "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵";

const scriptLower =
    "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏";

const boldScriptUpper =
    "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩";

const boldScriptLower =
    "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃";

const frakturUpper =
    "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ";

const frakturLower =
    "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷";

const boldFrakturUpper =
    "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅";

const boldFrakturLower =
    "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟";

const doubleUpper =
    "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ";

const doubleLower =
    "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫";

const sansUpper =
    "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹";

const sansLower =
    "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓";

const sansBoldUpper =
    "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭";

const sansBoldLower =
    "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇";

const sansItalicUpper =
    "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡";

const sansItalicLower =
    "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻";

const sansBoldItalicUpper =
    "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕";

const sansBoldItalicLower =
    "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯";

const monoUpper =
    "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉";

const monoLower =
    "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣";

const smallCaps = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ꜰ",
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


/* =========================================================
   FONT CONVERTER
   ========================================================= */

function convertFont(text, upper, lower) {
    let output = "";

    for (const char of text) {
        const upperIndex = normalUpper.indexOf(char);

        if (upperIndex !== -1) {
            output += upper[upperIndex] || char;
            continue;
        }

        const lowerIndex = normalLower.indexOf(char);

        if (lowerIndex !== -1) {
            output += lower[lowerIndex] || char;
            continue;
        }

        output += char;
    }

    return output;
}


function toSmallCaps(text) {
    return [...text]
        .map(char => {
            const lower = char.toLowerCase();
            return smallCaps[lower] || char;
        })
        .join("");
}


function toCircled(text) {
    const map = {
        A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ",
        F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ",
        K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ",
        P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ",
        U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ",
        Z: "Ⓩ"
    };

    return [...text]
        .map(char => map[char.toUpperCase()] || char)
        .join("");
}


function toSquared(text) {
    const map = {
        A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴",
        F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹",
        K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾",
        P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃",
        U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈",
        Z: "🅉"
    };

    return [...text]
        .map(char => map[char.toUpperCase()] || char)
        .join("");
}


function addStrike(text) {
    return [...text]
        .map(char => {
            if (char === " ") return char;
            return char + "̶";
        })
        .join("");
}


function addUnderline(text) {
    return [...text]
        .map(char => {
            if (char === " ") return char;
            return char + "̲";
        })
        .join("");
}


function addDoubleUnderline(text) {
    return [...text]
        .map(char => {
            if (char === " ") return char;
            return char + "͟";
        })
        .join("");
}


function addDot(text) {
    return [...text]
        .map(char => {
            if (char === " ") return char;
            return char + "̇";
        })
        .join("");
}


function addWave(text) {
    return [...text]
        .map(char => {
            if (char === " ") return char;
            return char + "̃";
        })
        .join("");
}


function reverseText(text) {
    return [...text].reverse().join("");
}


function spaced(text, separator) {
    return [...text].join(separator);
}


/* =========================================================
   STYLE DEFINITIONS
   220+ UNIQUE STYLE FUNCTIONS
   ========================================================= */

const styleFunctions = [

    /* ---------- BASIC FONTS ---------- */

    text => text,
    text => convertFont(text, boldUpper, boldLower),
    text => convertFont(text, italicUpper, italicLower),
    text => convertFont(text, boldItalicUpper, boldItalicLower),
    text => convertFont(text, scriptUpper, scriptLower),
    text => convertFont(text, boldScriptUpper, boldScriptLower),
    text => convertFont(text, frakturUpper, frakturLower),
    text => convertFont(text, boldFrakturUpper, boldFrakturLower),
    text => convertFont(text, doubleUpper, doubleLower),
    text => convertFont(text, sansUpper, sansLower),
    text => convertFont(text, sansBoldUpper, sansBoldLower),
    text => convertFont(text, sansItalicUpper, sansItalicLower),
    text => convertFont(text, sansBoldItalicUpper, sansBoldItalicLower),
    text => convertFont(text, monoUpper, monoLower),
    text => toSmallCaps(text),
    text => toCircled(text),
    text => toSquared(text),

    /* ---------- SYMBOL FRAMES ---------- */

    text => `꧁${text}꧂`,
    text => `꧁༺${text}༻꧂`,
    text => `༺${text}༻`,
    text => `༺༻${text}༺༻`,
    text => `『${text}』`,
    text => `【${text}】`,
    text => `〖${text}〗`,
    text => `〘${text}〙`,
    text => `〚${text}〛`,
    text => `⟦${text}⟧`,
    text => `⟨${text}⟩`,
    text => `《${text}》`,
    text => `〈${text}〉`,
    text => `「${text}」`,
    text => `『${text}』`,
    text => `【『${text}』】`,
    text => `乂${text}乂`,
    text => `メ${text}メ`,
    text => `彡${text}彡`,
    text => `ツ${text}ツ`,
    text => `×͜×${text}×͜×`,
    text => `乂༒${text}༒乂`,
    text => `亗${text}亗`,
    text => `〆${text}〆`,
    text => `々${text}々`,
    text => `ミ${text}彡`,
    text => `シ${text}ツ`,
    text => `ヅ${text}ヅ`,
    text => `么${text}么`,

    /* ---------- STAR STYLES ---------- */

    text => `★${text}★`,
    text => `☆${text}☆`,
    text => `★彡${text}彡★`,
    text => `☆彡${text}彡☆`,
    text => `✦${text}✦`,
    text => `✧${text}✧`,
    text => `✪${text}✪`,
    text => `✯${text}✯`,
    text => `✰${text}✰`,
    text => `✵${text}✵`,
    text => `✷${text}✷`,
    text => `✸${text}✸`,
    text => `✹${text}✹`,
    text => `✺${text}✺`,
    text => `✻${text}✻`,
    text => `✼${text}✼`,
    text => `✽${text}✽`,
    text => `✾${text}✾`,
    text => `✿${text}✿`,
    text => `❀${text}❀`,
    text => `❁${text}❁`,
    text => `❂${text}❂`,
    text => `❃${text}❃`,
    text => `❇${text}❇`,
    text => `❈${text}❈`,
    text => `❉${text}❉`,
    text => `❊${text}❊`,
    text => `❋${text}❋`,

    /* ---------- CROWN / ROYAL ---------- */

    text => `♛${text}♛`,
    text => `♕${text}♕`,
    text => `♚${text}♚`,
    text => `♔${text}♔`,
    text => `♛༺${text}༻♛`,
    text => `♕༺${text}༻♕`,
    text => `♚꧁${text}꧂♚`,
    text => `♔꧁${text}꧂♔`,
    text => `👑${text}👑`,
    text => `⚜${text}⚜`,
    text => `♜${text}♜`,
    text => `♝${text}♝`,
    text => `♞${text}♞`,
    text => `♟${text}♟`,

    /* ---------- GAMING ---------- */

    text => `乂${text}乂`,
    text => `亗${text}亗`,
    text => `メ${text}メ`,
    text => `〆${text}〆`,
    text => `么${text}么`,
    text => `ツ${text}ツ`,
    text => `彡${text}彡`,
    text => `乂༒${text}༒乂`,
    text => `亗『${text}』亗`,
    text => `メ『${text}』メ`,
    text => `〆『${text}』〆`,
    text => `么『${text}』么`,
    text => `乂『${text}』乂`,
    text => `彡『${text}』彡`,
    text => `×͜×${text}×͜×`,
    text => `乂★${text}★乂`,
    text => `亗★${text}★亗`,
    text => `メ★${text}★メ`,
    text => `〆★${text}★〆`,
    text => `乂✦${text}✦乂`,
    text => `亗✦${text}✦亗`,
    text => `メ✦${text}✦メ`,
    text => `乂♛${text}♛乂`,
    text => `亗♛${text}♛亗`,
    text => `メ♛${text}♛メ`,
    text => `〆♛${text}♛〆`,
    text => `乂꧁${text}꧂乂`,
    text => `亗꧁${text}꧂亗`,
    text => `メ꧁${text}꧂メ`,
    text => `〆꧁${text}꧂〆`,

    /* ---------- ATTITUDE ---------- */

    text => `☠${text}☠`,
    text => `☬${text}☬`,
    text => `⚔${text}⚔`,
    text => `⚡${text}⚡`,
    text => `🔥${text}🔥`,
    text => `💀${text}💀`,
    text => `😈${text}😈`,
    text => `👿${text}👿`,
    text => `😎${text}😎`,
    text => `🖤${text}🖤`,
    text => `♠${text}♠`,
    text => `♣${text}♣`,
    text => `♦${text}♦`,
    text => `♥${text}♥`,
    text => `☠༺${text}༻☠`,
    text => `⚔༺${text}༻⚔`,
    text => `⚡༺${text}༻⚡`,
    text => `🔥༺${text}༻🔥`,
    text => `💀༺${text}༻💀`,
    text => `😈༺${text}༻😈`,
    text => `👿༺${text}༻👿`,
    text => `😎༺${text}༻😎`,
    text => `🖤༺${text}༻🖤`,
    text => `☠꧁${text}꧂☠`,
    text => `⚔꧁${text}꧂⚔`,
    text => `⚡꧁${text}꧂⚡`,
    text => `🔥꧁${text}꧂🔥`,
    text => `💀꧁${text}꧂💀`,
    text => `😈꧁${text}꧂😈`,
    text => `😎꧁${text}꧂😎`,

    /* ---------- LOVE ---------- */

    text => `♡${text}♡`,
    text => `♥${text}♥`,
    text => `❤${text}❤`,
    text => `❥${text}❥`,
    text => `ღ${text}ღ`,
    text => `💕${text}💕`,
    text => `💖${text}💖`,
    text => `💗${text}💗`,
    text => `💘${text}💘`,
    text => `💝${text}💝`,
    text => `💞${text}💞`,
    text => `💓${text}💓`,
    text => `♡꧁${text}꧂♡`,
    text => `♥꧁${text}꧂♥`,
    text => `❤꧁${text}꧂❤`,
    text => `ღ꧁${text}꧂ღ`,
    text => `♡༺${text}༻♡`,
    text => `♥༺${text}༻♥`,
    text => `❤༺${text}༻❤`,

    /* ---------- SIMPLE DECORATIVE ---------- */

    text => `•${text}•`,
    text => `·${text}·`,
    text => `|${text}|`,
    text => `~${text}~`,
    text => `^${text}^`,
    text => `+${text}+`,
    text => `=${text}=`,
    text => `-${text}-`,
    text => `_${text}_`,
    text => `*${text}*`,
    text => `#${text}#`,
    text => `@${text}@`,
    text => `$${text}$`,
    text => `%${text}%`,
    text => `&${text}&`,
    text => `!${text}!`,
    text => `?${text}?`,
    text => `•°${text}°•`,
    text => `°•${text}•°`,
    text => `•.¸${text}¸.•`,
    text => `¸.•${text}•.¸`,
    text => `╰${text}╯`,
    text => `╭${text}╮`,
    text => `╰☆${text}☆╮`,
    text => `╭☆${text}☆╯`,
    text => `┏${text}┓`,
    text => `┗${text}┛`,
    text => `┌${text}┐`,
    text => `└${text}┘`,
    text => `╔${text}╗`,
    text => `╚${text}╝`,
    text => `╭༺${text}༻╮`,
    text => `╰༺${text}༻╯`,
    text => `╭꧁${text}꧂╮`,
    text => `╰꧁${text}꧂╯`,

    /* ---------- SPACED ---------- */

    text => spaced(text, " "),
    text => spaced(text, "  "),
    text => spaced(text, " • "),
    text => spaced(text, " · "),
    text => spaced(text, " ★ "),
    text => spaced(text, " ☆ "),
    text => spaced(text, " ✦ "),
    text => spaced(text, " ✧ "),
    text => spaced(text, " | "),
    text => spaced(text, " ~ "),
    text => spaced(text, " - "),
    text => spaced(text, " 乂 "),
    text => spaced(text, " 亗 "),
    text => spaced(text, " ツ "),
    text => spaced(text, " 彡 "),

    /* ---------- COMBINED FONTS + DECORATION ---------- */

    text => `★${convertFont(text, boldUpper, boldLower)}★`,
    text => `☆${convertFont(text, boldUpper, boldLower)}☆`,
    text => `꧁${convertFont(text, boldUpper, boldLower)}꧂`,
    text => `༺${convertFont(text, boldUpper, boldLower)}༻`,
    text => `『${convertFont(text, boldUpper, boldLower)}』`,
    text => `亗${convertFont(text, boldUpper, boldLower)}亗`,
    text => `乂${convertFont(text, boldUpper, boldLower)}乂`,
    text => `彡${convertFont(text, boldUpper, boldLower)}彡`,
    text => `♛${convertFont(text, boldUpper, boldLower)}♛`,
    text => `☠${convertFont(text, boldUpper, boldLower)}☠`,
    text => `⚡${convertFont(text, boldUpper, boldLower)}⚡`,
    text => `🔥${convertFont(text, boldUpper, boldLower)}🔥`,
    text => `♡${convertFont(text, boldUpper, boldLower)}♡`,
    text => `★${convertFont(text, italicUpper, italicLower)}★`,
    text => `☆${convertFont(text, italicUpper, italicLower)}☆`,
    text => `꧁${convertFont(text, italicUpper, italicLower)}꧂`,
    text => `༺${convertFont(text, italicUpper, italicLower)}༻`,
    text => `『${convertFont(text, italicUpper, italicLower)}』`,
    text => `亗${convertFont(text, italicUpper, italicLower)}亗`,
    text => `乂${convertFont(text, italicUpper, italicLower)}乂`,
    text => `彡${convertFont(text, italicUpper, italicLower)}彡`,
    text => `♛${convertFont(text, italicUpper, italicLower)}♛`,
    text => `☠${convertFont(text, italicUpper, italicLower)}☠`,
    text => `⚡${convertFont(text, italicUpper, italicLower)}⚡`,
    text => `🔥${convertFont(text, italicUpper, italicLower)}🔥`,
    text => `♡${convertFont(text, italicUpper, italicLower)}♡`,

    /* ---------- MARKED TEXT ---------- */

    text => addStrike(text),
    text => addUnderline(text),
    text => addDoubleUnderline(text),
    text => addDot(text),
    text => addWave(text),

    text => `★${addStrike(text)}★`,
    text => `☆${addStrike(text)}☆`,
    text => `꧁${addStrike(text)}꧂`,
    text => `亗${addStrike(text)}亗`,
    text => `乂${addStrike(text)}乂`,
    text => `彡${addStrike(text)}彡`,
    text => `♛${addStrike(text)}♛`,
    text => `☠${addStrike(text)}☠`,
    text => `♡${addStrike(text)}♡`,

    text => `★${addUnderline(text)}★`,
    text => `☆${addUnderline(text)}☆`,
    text => `꧁${addUnderline(text)}꧂`,
    text => `亗${addUnderline(text)}亗`,
    text => `乂${addUnderline(text)}乂`,
    text => `彡${addUnderline(text)}彡`,
    text => `♛${addUnderline(text)}♛`,
    text => `☠${addUnderline(text)}☠`,
    text => `♡${addUnderline(text)}♡`,

    /* ---------- EXTRA COMBINATIONS ---------- */

    text => `꧁༺${convertFont(text, boldUpper, boldLower)}༻꧂`,
    text => `꧁༺${convertFont(text, italicUpper, italicLower)}༻꧂`,
    text => `★彡${convertFont(text, boldUpper, boldLower)}彡★`,
    text => `☆彡${convertFont(text, boldUpper, boldLower)}彡☆`,
    text => `亗『${convertFont(text, boldUpper, boldLower)}』亗`,
    text => `乂『${convertFont(text, italicUpper, italicLower)}』乂`,
    text => `メ『${convertFont(text, boldItalicUpper, boldItalicLower)}』メ`,
    text => `〆『${convertFont(text, scriptUpper, scriptLower)}』〆`,
    text => `♛꧁${convertFont(text, boldUpper, boldLower)}꧂♛`,
    text => `☠꧁${convertFont(text, boldUpper, boldLower)}꧂☠`,
    text => `⚔꧁${convertFont(text, boldUpper, boldLower)}꧂⚔`,
    text => `⚡꧁${convertFont(text, boldUpper, boldLower)}꧂⚡`,
    text => `🔥꧁${convertFont(text, boldUpper, boldLower)}꧂🔥`,
    text => `💀꧁${convertFont(text, boldUpper, boldLower)}꧂💀`,
    text => `😈꧁${convertFont(text, boldUpper, boldLower)}꧂😈`,
    text => `👑꧁${convertFont(text, boldUpper, boldLower)}꧂👑`,
    text => `♡꧁${convertFont(text, boldUpper, boldLower)}꧂♡`,
    text => `♥꧁${convertFont(text, boldUpper, boldLower)}꧂♥`,
    text => `★༺${convertFont(text, boldItalicUpper, boldItalicLower)}༻★`,
    text => `☆༺${convertFont(text, scriptUpper, scriptLower)}༻☆`,
    text => `✦『${convertFont(text, sansBoldUpper, sansBoldLower)}』✦`,
    text => `✧『${convertFont(text, sansItalicUpper, sansItalicLower)}』✧`,
    text => `❖${convertFont(text, doubleUpper, doubleLower)}❖`,
    text => `◆${convertFont(text, monoUpper, monoLower)}◆`,
    text => `◇${convertFont(text, monoUpper, monoLower)}◇`,
    text => `●${convertFont(text, sansBoldUpper, sansBoldLower)}●`,
    text => `○${convertFont(text, sansItalicUpper, sansItalicLower)}○`,
    text => `◈${convertFont(text, boldUpper, boldLower)}◈`,
    text => `◉${convertFont(text, italicUpper, italicLower)}◉`,
    text => `✪${convertFont(text, boldUpper, boldLower)}✪`,
    text => `✯${convertFont(text, scriptUpper, scriptLower)}✯`,
    text => `⚜${convertFont(text, boldUpper, boldLower)}⚜`,
    text => `♔${convertFont(text, boldUpper, boldLower)}♔`,
    text => `♕${convertFont(text, scriptUpper, scriptLower)}♕`,
    text => `♚${convertFont(text, frakturUpper, frakturLower)}♚`,
    text => `♛${convertFont(text, boldFrakturUpper, boldFrakturLower)}♛`,

    /* ---------- REVERSED / SPECIAL ---------- */

    text => reverseText(text),
    text => `↞${text}↠`,
    text => `↠${text}↞`,
    text => `‹${text}›`,
    text => `›${text}‹`,
    text => `«${text}»`,
    text => `»${text}«`,
    text => `⫷${text}⫸`,
    text => `⫸${text}⫷`,
    text => `⟪${text}⟫`,
    text => `⟫${text}⟪`,
    text => `⦗${text}⦘`,
    text => `⦘${text}⦗`,
    text => `〔${text}〕`,
    text => `〕${text}〔`,
    text => `〖${text}〗`,
    text => `〗${text}〖`,
    text => `⟮${text}⟯`,
    text => `⟯${text}⟮`,
    text => `﹝${text}﹞`,
    text => `﹞${text}﹝`,
    text => `⸢${text}⸣`,
    text => `⸤${text}⸥`,
    text => `⸜${text}⸝`,
    text => `⸜${text}⸝`,

    /* ---------- FINAL DECORATIVE STYLES ---------- */

    text => `•°${convertFont(text, boldUpper, boldLower)}°•`,
    text => `°•${convertFont(text, italicUpper, italicLower)}•°`,
    text => `✦•${convertFont(text, boldUpper, boldLower)}•✦`,
    text => `✧•${convertFont(text, scriptUpper, scriptLower)}•✧`,
    text => `★•${convertFont(text, sansBoldUpper, sansBoldLower)}•★`,
    text => `☆•${convertFont(text, sansItalicUpper, sansItalicLower)}•☆`,
    text => `꧁•${convertFont(text, boldUpper, boldLower)}•꧂`,
    text => `༺•${convertFont(text, italicUpper, italicLower)}•༻`,
    text => `亗•${convertFont(text, boldUpper, boldLower)}•亗`,
    text => `乂•${convertFont(text, boldItalicUpper, boldItalicLower)}•乂`,
    text => `彡•${convertFont(text, scriptUpper, scriptLower)}•彡`,
    text => `♛•${convertFont(text, boldFrakturUpper, boldFrakturLower)}•♛`,
    text => `☠•${convertFont(text, boldFrakturUpper, boldFrakturLower)}•☠`,
    text => `⚡•${convertFont(text, sansBoldUpper, sansBoldLower)}•⚡`,
    text => `🔥•${convertFont(text, boldUpper, boldLower)}•🔥`,
    text => `♡•${convertFont(text, scriptUpper, scriptLower)}•♡`,
    text => `♥•${convertFont(text, boldUpper, boldLower)}•♥`,
    text => `👑•${convertFont(text, boldUpper, boldLower)}•👑`
];


/* =========================================================
   CATEGORY ASSIGNMENT
   Important:
   Categories are ONLY used for filtering.
   They are NEVER displayed inside result cards.
   ========================================================= */

function getCategory(index) {
    /*
     * Category assignment is used only for filtering.
     *
     * NOTE:
     * The styleFunctions array contains many different
     * decorative styles. These ranges are intentionally
     * broad so every generated result always has a category.
     */

    if (index < 17) {
        return "fancy";
    }

    if (index < 76) {
        return "gaming";
    }

    if (index < 140) {
        return "attitude";
    }

    if (index < 210) {
        return "symbols";
    }

    return "fancy";
}


/* =========================================================
   BUILD STYLES
   ========================================================= */

function buildStyles(name) {
    const styles = [];
    const used = new Set();

    for (let i = 0; i < styleFunctions.length; i++) {
        let styledName = "";

        try {
            styledName = styleFunctions[i](name);
        } catch (error) {
            console.warn(
                `Style ${i + 1} failed:`,
                error
            );

            styledName = name;
        }

        styledName = String(styledName).trim();

        // Ignore empty styles
        if (!styledName) {
            continue;
        }

        // Remove duplicate generated names
        if (used.has(styledName)) {
            continue;
        }

        used.add(styledName);

        styles.push({
            id: styles.length + 1,
            value: styledName,

            // IMPORTANT:
            // Use the original style-function index,
            // NOT styles.length.
            category: getCategory(i)
        });
    }

    return styles;
}


/* =========================================================
   COPY FUNCTION
   ========================================================= */

async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");

        textarea.remove();

        return successful;
    } catch (error) {
        return false;
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
    }, 1800);
}


/* =========================================================
   CREATE RESULT CARD
   IMPORTANT:
   ONLY NAME + COPY BUTTON.
   NO CATEGORY.
   NO STYLE NAME.
   NO "A".
   ========================================================= */

function createResultCard(result, index) {
    const card = document.createElement("article");

    card.className = "result-card";
    card.dataset.category = result.category;
    card.style.animationDelay = `${Math.min(index * 0.018, 0.5)}s`;

    const nameElement = document.createElement("div");

    nameElement.className = "result-name";
    nameElement.textContent = result.value;

    const copyButton = document.createElement("button");

    copyButton.type = "button";
    copyButton.className = "copy-result-button";
    copyButton.setAttribute("aria-label", "Copy styled name");

    copyButton.innerHTML = `
        <span class="copy-icon">📋</span>
        <span class="copy-text">Copy</span>
    `;

    copyButton.addEventListener("click", async () => {
        const copied = await copyText(result.value);

        if (copied) {
            copyButton.classList.add("copied");

            const copyTextElement =
                copyButton.querySelector(".copy-text");

            const copyIcon =
                copyButton.querySelector(".copy-icon");

            if (copyTextElement) {
                copyTextElement.textContent = "Copied!";
            }

            if (copyIcon) {
                copyIcon.textContent = "✓";
            }

            showToast("Name copied!");

            setTimeout(() => {
                copyButton.classList.remove("copied");

                if (copyTextElement) {
                    copyTextElement.textContent = "Copy";
                }

                if (copyIcon) {
                    copyIcon.textContent = "📋";
                }
            }, 1400);
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

function renderResults(filter = "all") {
    if (!resultsContainer) {
        return;
    }

    currentFilter = filter;

    resultsContainer.innerHTML = "";

    const filteredResults =
        filter === "all"
            ? currentResults
            : currentResults.filter(
                result => result.category === filter
            );

    if (resultsTitle) {
        resultsTitle.textContent =
            `${filteredResults.length} Stylish Names`;
    }

    // No results
    if (!filteredResults.length) {
        const emptyMessage =
            document.createElement("div");

        emptyMessage.className = "no-results";

        emptyMessage.textContent =
            "No stylish names found in this category.";

        resultsContainer.appendChild(emptyMessage);

        return;
    }

    // Render result cards
    filteredResults.forEach((result, index) => {
        const card =
            createResultCard(result, index);

        resultsContainer.appendChild(card);
    });
}


/* =========================================================
   GENERATE
   ========================================================= */

function generateNames() {
    const value = nameInput
        ? nameInput.value.trim()
        : "";

    // Empty name check
    if (!value) {
        showToast("Please enter your name");

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }

    // Save current name
    currentName = value;

    // Update preview
    if (previewSection) {
        previewSection.hidden = false;
    }

    if (previewName) {
        previewName.textContent = value;
    }

    // Generate all styles
    currentResults = buildStyles(value);

    // Check if styles were generated
    if (!currentResults.length) {
        showToast("No styles generated");
        return;
    }

    // Show results
    if (resultsSection) {
        resultsSection.hidden = false;
    }

    // Reset filter
    currentFilter = "all";

    updateFilterButtons("all");

    // Render
    renderResults("all");

    // Scroll to results
    if (resultsSection) {
        setTimeout(() => {
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
    nameForm.addEventListener("submit", event => {
        event.preventDefault();
        generateNames();
    });
}


/* =========================================================
   LIVE INPUT / CLEAR BUTTON
   ========================================================= */

if (nameInput) {
    nameInput.addEventListener("input", () => {
        const hasValue =
            nameInput.value.trim().length > 0;

        if (clearName) {
            clearName.hidden = !hasValue;
        }

       if (
    previewName &&
    previewSection &&
    !previewSection.hidden
) {
    previewName.textContent =
        nameInput.value.trim() || "Your Name";
       } 
    });

    nameInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (nameForm) {
                nameForm.requestSubmit();
            }
        }
    });
}


if (clearName) {
    clearName.addEventListener("click", () => {

        // Clear input
        if (nameInput) {
            nameInput.value = "";
            nameInput.focus();
        }

        // Clear stored name
        currentName = "";

        // Clear previous generated results
        currentResults = [];

        // Reset filter
        currentFilter = "all";

        // Hide clear button
        clearName.hidden = true;

        // Reset preview
        if (previewName) {
            previewName.textContent = "Your Name";
        }

        // Hide preview
        if (previewSection) {
            previewSection.hidden = true;
        }

        // Hide results
        if (resultsSection) {
            resultsSection.hidden = true;
        }

        // Clear result container
        if (resultsContainer) {
            resultsContainer.innerHTML = "";
        }

        // Reset filter buttons
        updateFilterButtons("all");
    });
}


/* =========================================================
   GENERATE BUTTON ANIMATION
   ========================================================= */

if (nameForm && generateButton) {
    nameForm.addEventListener("submit", () => {
        generateButton.classList.add("generating");

        setTimeout(() => {
            generateButton.classList.remove("generating");
        }, 450);
    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMobileMenu() {
    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.add("open");
    mobileMenuButton.classList.add("open");

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
    mobileMenuButton.classList.remove("open");

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

    if (mobileMenu.classList.contains("open")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


if (mobileMenuButton) {
    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );
}


if (mobileMenu) {
    mobileMenu.addEventListener("click", event => {
        const link =
            event.target.closest(".mobile-nav-link");

        if (link) {
            closeMobileMenu();
        }
    });
}


document.addEventListener("click", event => {
    if (
        mobileMenu &&
        mobileMenuButton &&
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
    ) {
        closeMobileMenu();
    }
});


/* =========================================================
   ESCAPE CLOSES MOBILE MENU
   ========================================================= */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

if (bottomMenuButton) {
    bottomMenuButton.addEventListener("click", () => {
        toggleMobileMenu();
    });
}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

if (symbolsGrid) {
    symbolsGrid.addEventListener("click", async event => {
        const button =
            event.target.closest(".symbol-card");

        if (!button) {
            return;
        }

        const symbol =
            button.dataset.symbol || "";

        if (!symbol) {
            return;
        }

        const copied = await copyText(symbol);

        if (copied) {
            button.classList.add("copied");

            const small =
                button.querySelector("small");

            if (small) {
                small.textContent = "Copied!";
            }

            showToast("Symbol copied!");

            setTimeout(() => {
                button.classList.remove("copied");

                if (small) {
                    small.textContent = "Copy";
                }
            }, 1200);
        } else {
            showToast("Copy failed");
        }
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
        button.dataset.template || "";

    if (!template) {
        return;
    }

    const name =
        currentName ||
        (nameInput ? nameInput.value.trim() : "");

    if (!name) {
        showToast("First enter your name");

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }

    const styled =
        template.replace(/\{name\}/gi, name);

    if (nameInput) {
        nameInput.value = name;
    }

    currentName = name;

    if (previewSection) {
        previewSection.hidden = false;
    }

    if (previewName) {
        previewName.textContent = styled;
    }

    if (resultsSection) {
        resultsSection.hidden = false;
    }

    currentResults = [
        {
            id: 1,
            value: styled,
            category: "symbols"
        }
    ];

    updateFilterButtons("all");
    renderResults("all");

    if (resultsSection) {
        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});


/* =========================================================
   DESKTOP NAV ACTIVE STATE
   ========================================================= */

const desktopNavLinks =
    document.querySelectorAll(".desktop-nav .nav-link");

desktopNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        desktopNavLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});


/* =========================================================
   MOBILE BOTTOM NAV ACTIVE STATE
   ========================================================= */

const bottomNavItems =
    document.querySelectorAll(".bottom-nav-item");

bottomNavItems.forEach(item => {
    item.addEventListener("click", () => {
        if (item.tagName.toLowerCase() === "button") {
            return;
        }

        bottomNavItems.forEach(navItem => {
            navItem.classList.remove("active");
        });

        item.classList.add("active");
    });
});


/* =========================================================
   FAQ + ACCESSIBILITY
   ========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
        if (!item.open) {
            return;
        }

        faqItems.forEach(other => {
            if (other !== item) {
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

if (resultsSection) {
    resultsSection.hidden = true;
}

if (previewSection) {
    previewSection.hidden = true;
}


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (styleFunctions.length < 200) {
    console.warn(
        "Z-Name Style: Less than 200 style functions loaded."
    );
}


/* =========================================================
   READY
   ========================================================= */

console.log(
    `Z-Name Style loaded successfully — ${styleFunctions.length}+ style patterns available.`
);
