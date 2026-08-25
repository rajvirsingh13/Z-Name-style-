document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const clearName = document.getElementById("clearName");
    const generateButton = document.getElementById("generateButton");

    const previewSection = document.getElementById("previewSection");
    const previewName = document.getElementById("previewName");

    const resultsSection = document.getElementById("resultsSection");
    const resultsContainer = document.getElementById("resultsContainer");
    const resultsTitle = document.getElementById("resultsTitle");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const bottomMenuButton = document.getElementById("bottomMenuButton");

    const filterButtons = document.querySelectorAll(".filter-button");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    let currentFilter = "all";
    let currentName = "";

    /*
     * =========================================================
     * 220 NAME DESIGNS
     * 22 readable text styles × 10 decorative designs
     * =========================================================
     */

    const fontMaps = [
        {
            name: "Bold",
            map: {
                A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",H:"𝐇",
                I:"𝐈",J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",O:"𝐎",P:"𝐏",
                Q:"𝐐",R:"𝐑",S:"𝐒",T:"𝐓",U:"𝐔",V:"𝐕",W:"𝐖",X:"𝐗",
                Y:"𝐘",Z:"𝐙",
                a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",
                i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",o:"𝐨",p:"𝐩",
                q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",
                y:"𝐲",z:"𝐳"
            }
        },

        {
            name: "Italic",
            map: {
                A:"𝘈",B:"𝘉",C:"𝘊",D:"𝘋",E:"𝘌",F:"𝘍",G:"𝘎",H:"𝘏",
                I:"𝘐",J:"𝘑",K:"𝘒",L:"𝘓",M:"𝘔",N:"𝘕",O:"𝘖",P:"𝘗",
                Q:"𝘘",R:"𝘙",S:"𝘚",T:"𝘛",U:"𝘜",V:"𝘝",W:"𝘞",X:"𝘟",
                Y:"𝘠",Z:"𝘡",
                a:"𝘢",b:"𝘣",c:"𝘤",d:"𝘥",e:"𝘦",f:"𝘧",g:"𝘨",h:"𝘩",
                i:"𝘪",j:"𝘫",k:"𝘬",l:"𝘭",m:"𝘮",n:"𝘯",o:"𝘰",p:"𝘱",
                q:"𝘲",r:"𝘳",s:"𝘴",t:"𝘵",u:"𝘶",v:"𝘷",w:"𝘸",x:"𝘹",
                y:"𝘺",z:"𝘻"
            }
        },

        {
            name: "Bold Italic",
            map: {
                A:"𝑨",B:"𝑩",C:"𝑪",D:"𝑫",E:"𝑬",F:"𝑭",G:"𝑮",H:"𝑯",
                I:"𝑰",J:"𝑱",K:"𝑲",L:"𝑳",M:"𝑴",N:"𝑵",O:"𝑶",P:"𝑷",
                Q:"𝑸",R:"𝑹",S:"𝑺",T:"𝑻",U:"𝑼",V:"𝑽",W:"𝑾",X:"𝑿",
                Y:"𝒀",Z:"𝒁",
                a:"𝒂",b:"𝒃",c:"𝒄",d:"𝒅",e:"𝒆",f:"𝒇",g:"𝒈",h:"𝒉",
                i:"𝒊",j:"𝒋",k:"𝒌",l:"𝒍",m:"𝒎",n:"𝒏",o:"𝒐",p:"𝒑",
                q:"𝒒",r:"𝒓",s:"𝒔",t:"𝒕",u:"𝒖",v:"𝒗",w:"𝒘",x:"𝒙",
                y:"𝒚",z:"𝒛"
            }
        },

        {
            name: "Script",
            map: {
                A:"𝒜",B:"ℬ",C:"𝒞",D:"𝒟",E:"ℰ",F:"ℱ",G:"𝒢",H:"ℋ",
                I:"ℐ",J:"𝒥",K:"𝒦",L:"ℒ",M:"ℳ",N:"𝒩",O:"𝒪",P:"𝒫",
                Q:"𝒬",R:"ℛ",S:"𝒮",T:"𝒯",U:"𝒰",V:"𝒱",W:"𝒲",X:"𝒳",
                Y:"𝒴",Z:"𝒵",
                a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"ℯ",f:"𝒻",g:"ℊ",h:"𝒽",
                i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",n:"𝓃",o:"ℴ",p:"𝓅",
                q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",
                y:"𝓎",z:"𝓏"
            }
        },

        {
            name: "Double",
            map: {
                A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",
                I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",N:"ℕ",O:"𝕆",P:"ℙ",
                Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",
                Y:"𝕐",Z:"ℤ",
                a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",
                i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",n:"𝕟",o:"𝕠",p:"𝕡",
                q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",
                y:"𝕪",z:"𝕫"
            }
        },

        {
            name: "Sans Bold",
            map: {
                A:"𝗔",B:"𝗕",C:"𝗖",D:"𝗗",E:"𝗘",F:"𝗙",G:"𝗚",H:"𝗛",
                I:"𝗜",J:"𝗝",K:"𝗞",L:"𝗟",M:"𝗠",N:"𝗡",O:"𝗢",P:"𝗣",
                Q:"𝗤",R:"𝗥",S:"𝗦",T:"𝗧",U:"𝗨",V:"𝗩",W:"𝗪",X:"𝗫",
                Y:"𝗬",Z:"𝗭",
                a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",h:"𝗵",
                i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",n:"𝗻",o:"𝗼",p:"𝗽",
                q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",v:"𝘃",w:"𝘄",x:"𝘅",
                y:"𝘆",z:"𝘇"
            }
        },

        {
            name: "Sans Italic",
            map: {
                A:"𝘈",B:"𝘉",C:"𝘊",D:"𝘋",E:"𝘌",F:"𝘍",G:"𝘎",H:"𝘏",
                I:"𝘐",J:"𝘑",K:"𝘒",L:"𝘓",M:"𝘔",N:"𝘕",O:"𝘖",P:"𝘗",
                Q:"𝘘",R:"𝘙",S:"𝘚",T:"𝘛",U:"𝘜",V:"𝘝",W:"𝘞",X:"𝘟",
                Y:"𝘠",Z:"𝘡",
                a:"𝘢",b:"𝘣",c:"𝘤",d:"𝘥",e:"𝘦",f:"𝘧",g:"𝘨",h:"𝘩",
                i:"𝘪",j:"𝘫",k:"𝘬",l:"𝘭",m:"𝘮",n:"𝘯",o:"𝘰",p:"𝘱",
                q:"𝘲",r:"𝘳",s:"𝘴",t:"𝘵",u:"𝘶",v:"𝘷",w:"𝘸",x:"𝘹",
                y:"𝘺",z:"𝘻"
            }
        },

        {
            name: "Monospace",
            map: {
                A:"𝙰",B:"𝙱",C:"𝙲",D:"𝙳",E:"𝙴",F:"𝙵",G:"𝙶",H:"𝙷",
                I:"𝙸",J:"𝙹",K:"𝙺",L:"𝙻",M:"𝙼",N:"𝙽",O:"𝙾",P:"𝙿",
                Q:"𝚀",R:"𝚁",S:"𝚂",T:"𝚃",U:"𝚄",V:"𝚅",W:"𝚆",X:"𝚇",
                Y:"𝚈",Z:"𝚉",
                a:"𝚊",b:"𝚋",c:"𝚌",d:"𝚍",e:"𝚎",f:"𝚏",g:"𝚐",h:"𝚑",
                i:"𝚒",j:"𝚓",k:"𝚔",l:"𝚕",m:"𝚖",n:"𝚗",o:"𝚘",p:"𝚙",
                q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",v:"𝚟",w:"𝚠",x:"𝚡",
                y:"𝚢",z:"𝚣"
            }
        },

        {
            name: "Small Caps",
            map: {
                a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",
                i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",
                q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",
                y:"ʏ",z:"ᴢ"
            }
        },

        {
            name: "Circled",
            map: {
                A:"Ⓐ",B:"Ⓑ",C:"Ⓒ",D:"Ⓓ",E:"Ⓔ",F:"Ⓕ",G:"Ⓖ",H:"Ⓗ",
                I:"Ⓘ",J:"Ⓙ",K:"Ⓚ",L:"Ⓛ",M:"Ⓜ",N:"Ⓝ",O:"Ⓞ",P:"Ⓟ",
                Q:"Ⓠ",R:"Ⓡ",S:"Ⓢ",T:"Ⓣ",U:"Ⓤ",V:"Ⓥ",W:"Ⓦ",X:"Ⓧ",
                Y:"Ⓨ",Z:"Ⓩ"
            }
        },

        {
            name: "Squared",
            map: {
                A:"🅰",B:"🅱",C:"🅲",D:"🅳",E:"🅴",F:"🅵",G:"🅶",H:"🅷",
                I:"🅸",J:"🅹",K:"🅺",L:"🅻",M:"🅼",N:"🅽",O:"🅾",P:"🅿",
                Q:"🆀",R:"🆁",S:"🆂",T:"🆃",U:"🆄",V:"🆅",W:"🆆",X:"🆇",
                Y:"🆈",Z:"🆉"
            }
        },

        {
            name: "Fullwidth",
            map: {
                A:"Ａ",B:"Ｂ",C:"Ｃ",D:"Ｄ",E:"Ｅ",F:"Ｆ",G:"Ｇ",H:"Ｈ",
                I:"Ｉ",J:"Ｊ",K:"Ｋ",L:"Ｌ",M:"Ｍ",N:"Ｎ",O:"Ｏ",P:"Ｐ",
                Q:"Ｑ",R:"Ｒ",S:"Ｓ",T:"Ｔ",U:"Ｕ",V:"Ｖ",W:"Ｗ",X:"Ｘ",
                Y:"Ｙ",Z:"Ｚ"
            }
        },

        {
            name: "Fraktur",
            map: {
                A:"𝔄",B:"𝔅",C:"ℭ",D:"𝔇",E:"𝔈",F:"𝔉",G:"𝔊",H:"ℌ",
                I:"ℑ",J:"𝔍",K:"𝔎",L:"𝔏",M:"𝔐",N:"𝔑",O:"𝔒",P:"𝔓",
                Q:"𝔔",R:"ℜ",S:"𝔖",T:"𝔗",U:"𝔘",V:"𝔙",W:"𝔚",X:"𝔛",
                Y:"𝔜",Z:"ℨ",
                a:"𝔞",b:"𝔟",c:"𝔠",d:"𝔡",e:"𝔢",f:"𝔣",g:"𝔤",h:"𝔥",
                i:"𝔦",j:"𝔧",k:"𝔨",l:"𝔩",m:"𝔪",n:"𝔫",o:"𝔬",p:"𝔭",
                q:"𝔮",r:"𝔯",s:"𝔰",t:"𝔱",u:"𝔲",v:"𝔳",w:"𝔴",x:"𝔵",
                y:"𝔶",z:"𝔷"
            }
        },

        {
            name: "Bold Fraktur",
            map: {
                A:"𝕬",B:"𝕭",C:"𝕮",D:"𝕯",E:"𝕰",F:"𝕱",G:"𝕲",H:"𝕳",
                I:"𝕴",J:"𝕵",K:"𝕶",L:"𝕷",M:"𝕸",N:"𝕹",O:"𝕺",P:"𝕻",
                Q:"𝕼",R:"𝕽",S:"𝕾",T:"𝕿",U:"𝖀",V:"𝖁",W:"𝖂",X:"𝖃",
                Y:"𝖄",Z:"𝖅"
            }
        },

        {
            name: "Bold Script",
            map: {
                A:"𝓐",B:"𝓑",C:"𝓒",D:"𝓓",E:"𝓔",F:"𝓕",G:"𝓖",H:"𝓗",
                I:"𝓘",J:"𝓙",K:"𝓚",L:"𝓛",M:"𝓜",N:"𝓝",O:"𝓞",P:"𝓟",
                Q:"𝓠",R:"𝓡",S:"𝓢",T:"𝓣",U:"𝓤",V:"𝓥",W:"𝓦",X:"𝓧",
                Y:"𝓨",Z:"𝓩"
            }
        },

        {
            name: "Negative",
            map: {
                A:"🅰",B:"🅱",C:"🅲",D:"🅳",E:"🅴",F:"🅵",G:"🅶",H:"🅷",
                I:"🅸",J:"🅹",K:"🅺",L:"🅻",M:"🅼",N:"🅽",O:"🅾",P:"🅿",
                Q:"🆀",R:"🆁",S:"🆂",T:"🆃",U:"🆄",V:"🆅",W:"🆆",X:"🆇",
                Y:"🆈",Z:"🆉"
            }
        },

        {
            name: "Tiny",
            map: {
                a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",
                i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",o:"ᵒ",p:"ᵖ",
                q:"ᑫ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",
                y:"ʸ",z:"ᶻ"
            }
        },

        {
            name: "Underline",
            map: {}
        },

        {
            name: "Spaced",
            map: {}
        },

        {
            name: "Wave",
            map: {}
        }
    ];

    /*
     * 10 decorative templates.
     * 22 fonts × 10 templates = 220 results.
     */
    const templates = [
        name => `꧁༺ ${name} ༻꧂`,
        name => `★彡 ${name} 彡★`,
        name => `亗 ${name} 亗`,
        name => `『${name}』`,
        name => `乂 ${name} 乂`,
        name => `〆 ${name} 〆`,
        name => `メ ${name} メ`,
        name => `༒ ${name} ༒`,
        name => `♛ ${name} ♛`,
        name => `⚡ ${name} ⚡`
    ];

    const categories = [
        "fancy",
        "fancy",
        "gaming",
        "gaming",
        "attitude",
        "attitude",
        "symbols",
        "symbols",
        "fancy",
        "gaming"
    ];

    function transformText(text, font) {
        if (!font.map || Object.keys(font.map).length === 0) {
            if (font.name === "Underline") {
                return [...text].map(char => {
                    return /[a-zA-Z]/.test(char) ? char + "\u0332" : char;
                }).join("");
            }

            if (font.name === "Spaced") {
                return [...text].join(" ");
            }

            if (font.name === "Wave") {
                return [...text].map((char, i) => {
                    return i % 2 === 0
                        ? char + "\u0301"
                        : char + "\u0303";
                }).join("");
            }

            return text;
        }

        return [...text].map(char => {
            return font.map[char] || font.map[char.toLowerCase()] || char;
        }).join("");
    }

    const allStyles = [];

    fontMaps.forEach((font, fontIndex) => {
        templates.forEach((template, templateIndex) => {
            allStyles.push({
                id: `${fontIndex}-${templateIndex}`,
                category: categories[templateIndex],
                create(name) {
                    const styled = transformText(name, font);
                    return template(styled);
                }
            });
        });
    });

    /*
     * Make sure we have at least 200 styles.
     */
    console.log(`Z-Name Style: ${allStyles.length} styles loaded.`);

    function getFilteredStyles() {
        if (currentFilter === "all") {
            return allStyles;
        }

        return allStyles.filter(style => style.category === currentFilter);
    }

    function renderResults() {
        if (!currentName) return;

        const styles = getFilteredStyles();

        resultsContainer.innerHTML = "";

        styles.forEach((style, index) => {
            const styledName = style.create(currentName);

            const card = document.createElement("article");
            card.className = "result-card";
            card.style.animationDelay = `${Math.min(index * 15, 300)}ms`;

            /*
             * IMPORTANT:
             * Only styled name + Copy button.
             * No A / category / font / style name.
             */
            card.innerHTML = `
                <div class="result-name">${escapeHTML(styledName)}</div>

                <button
                    type="button"
                    class="copy-result-button"
                    data-copy="${escapeHTML(styledName)}"
                >
                    <span class="copy-icon">📋</span>
                    <span>Copy</span>
                </button>
            `;

            resultsContainer.appendChild(card);
        });

        resultsSection.hidden = false;

        resultsTitle.textContent =
            currentFilter === "all"
                ? "Stylish Names"
                : "Stylish Names";

        setTimeout(() => {
            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    async function copyText(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                fallbackCopy(text);
            }

            showToast("Copied!");

            return true;
        } catch {
            try {
                fallbackCopy(text);
                showToast("Copied!");
                return true;
            } catch {
                showToast("Copy failed");
                return false;
            }
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        textarea.remove();
    }

    function showToast(message) {
        if (!toast) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.zNameToastTimer);

        window.zNameToastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }

    function updatePreview() {
        const value = nameInput.value.trim();

        if (value) {
            clearName.hidden = false;
            previewSection.hidden = false;
            previewName.textContent = value;
        } else {
            clearName.hidden = true;
            previewSection.hidden = true;
        }
    }

    nameInput.addEventListener("input", updatePreview);

    clearName.addEventListener("click", () => {
        nameInput.value = "";
        currentName = "";

        updatePreview();

        nameInput.focus();

        resultsSection.hidden = true;
        resultsContainer.innerHTML = "";
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const value = nameInput.value.trim();

        if (!value) {
            showToast("Please enter your name");
            nameInput.focus();
            return;
        }

        currentName = value;

        generateButton.classList.add("generating");

        setTimeout(() => {
            generateButton.classList.remove("generating");

            updatePreview();
            renderResults();
        }, 250);
    });

    /*
     * Copy buttons
     */
    resultsContainer.addEventListener("click", async event => {
        const button = event.target.closest(".copy-result-button");

        if (!button) return;

        const text = button.dataset.copy;

        const originalHTML = button.innerHTML;

        button.classList.add("copied");

        button.innerHTML = `
            <span class="copy-icon">✓</span>
            <span>Copied</span>
        `;

        await copyText(text);

        setTimeout(() => {
            button.classList.remove("copied");
            button.innerHTML = originalHTML;
        }, 1400);
    });

    /*
     * Filters
     */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter = button.dataset.filter || "all";

            if (currentName) {
                renderResults();
            }
        });
    });

    /*
     * Mobile menu
     */
    function toggleMobileMenu() {
        if (!mobileMenu || !mobileMenuButton) return;

        const isOpen = mobileMenu.classList.toggle("open");

        mobileMenuButton.classList.toggle("open", isOpen);

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }

    mobileMenuButton?.addEventListener("click", toggleMobileMenu);

    bottomMenuButton?.addEventListener("click", toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu?.classList.remove("open");
            mobileMenuButton?.classList.remove("open");
            mobileMenuButton?.setAttribute("aria-expanded", "false");
        });
    });

    /*
     * Trending style buttons
     */
    document.querySelectorAll(".use-style-button").forEach(button => {
        button.addEventListener("click", () => {
            const template = button.dataset.template || "{name}";

            const name = nameInput.value.trim();

            if (!name) {
                showToast("Enter your name first");
                nameInput.focus();
                return;
            }

            const result = template.replace("{name}", name);

            copyText(result);

            showToast("Style copied!");
        });
    });

    /*
     * Symbol copy
     */
    document.querySelectorAll(".symbol-card").forEach(button => {
        button.addEventListener("click", () => {
            const symbol = button.dataset.symbol;

            if (!symbol) return;

            copyText(symbol);

            button.classList.add("copied");

            setTimeout(() => {
                button.classList.remove("copied");
            }, 700);
        });
    });

    /*
     * Category links that still exist elsewhere in the old HTML.
     */
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;

            if (!category) return;

            const filter = document.querySelector(
                `.filter-button[data-filter="${category}"]`
            );

            if (filter) {
                filter.click();

                document
                    .getElementById("resultsSection")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            } else {
                document
                    .getElementById("generator")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }
        });
    });

    /*
     * Bottom navigation active state
     */
    document.querySelectorAll(".bottom-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".bottom-nav-item")
                .forEach(nav => nav.classList.remove("active"));

            if (item.tagName.toLowerCase() !== "button") {
                item.classList.add("active");
            }
        });
    });

    /*
     * Bottom navigation active state
     */
    document.querySelectorAll(".bottom-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".bottom-nav-item")
                .forEach(nav => nav.classList.remove("active"));

            if (item.tagName.toLowerCase() !== "button") {
                item.classList.add("active");
            }
        });
    });

    /*
     * Initial state
     */
    updatePreview();
});
