const ALL_FILES = ['alphaprism3609.svg', 'alpharay6647.svg', 'alphastorm3449.svg', 'blazeedge3063.svg', 'chromedark7366.svg', 'cosmicglow5572.svg', 'cosmicgrid6280.svg', 'cosmicsurge30.svg', 'crystalburst6910.svg', 'crystallight6506.svg', 'crystalshadow8876.svg', 'cyberdrift1810.svg', 'cyberray2667.svg', 'cybersync9144.svg', 'deltahex4684.svg', 'deltanova4934.svg', 'deltarealm5444.svg', 'deltasync8727.svg', 'divinehex774.svg', 'divineprism7397.svg', 'divinesurge2724.svg', 'driftbeacon7649.svg', 'driftdust6913.svg', 'driftprism8680.svg', 'driftwave9865.svg', 'echoburst8558.svg', 'echodust9620.svg', 'echopulse5200.svg', 'echovortex3853.svg', 'frostcore1637.svg', 'frostdrift3111.svg', 'frostglow6261.svg', 'frostnova8053.svg', 'froststorm3425.svg', 'frozendark844.svg', 'frozenlink2018.svg', 'frozenstream2442.svg', 'frozensync1891.svg', 'frozensync5380.svg', 'frozensync6180.svg', 'lunarray4260.svg', 'lunarsurge9482.svg', 'mysticcore1450.svg', 'mysticcore8789.svg', 'mysticcore8877.svg', 'mysticspiral2068.svg', 'neonnova7079.svg', 'neonprism7755.svg', 'neonprism9765.svg', 'neonspiral873.svg', 'nexusedge3546.svg', 'noble_grove.svg', 'omegadust6282.svg', 'omegaedge2192.svg', 'omeganova9730.svg', 'omegasync3344.svg', 'pixeldark4536.svg', 'pixelglow8188.svg', 'pixellight1105.svg', 'pixelpulse1149.svg', 'pixelvortex6672.svg', 'quantumbeacon9185.svg', 'quantumsurge6472.svg', 'solarnode6290.svg', 'solarnova7794.svg', 'sonicdust3516.svg', 'soniclink8824.svg', 'sonicnova5152.svg', 'sonicspiral5301.svg', 'sonicvoid7001.svg', 'sparkbeacon1600.svg', 'sparkprism7634.svg', 'stormburst8964.svg', 'stormdrift9059.svg', 'stormsurge5381.svg', 'stormsurge5701.svg', 'surgecore9185.svg', 'surgegrid3278.svg', 'surgehex5160.svg', 'surgenode5447.svg', 'surgeshadow1287.svg', 'surgeshadow1901.svg', 'surgesync9254.svg', 'voidbeacon4793.svg', 'voidburst7785.svg', 'vortexdark1745.svg', 'vortexedge5109.svg', 'vortexflow9294.svg', 'vortexlink6745.svg', 'vortexnova7482.svg', 'vortexspiral8981.svg', 'wavebeacon6240.svg', 'wavedrift7969.svg', 'waveflow8887.svg', 'wavegrid7167.svg', 'waveprism4253.svg', 'waveray8627.svg', 'wavewave2441.svg', 'zendark1999.svg', 'zenrealm1610.svg', 'zenstorm4772.svg'];
const ALL_USERS = ['searchfrosted', 'mrdavidss-vgg', 'archived-sites', 'mrdavidsz', 'Alsetle', 'mrdavidzs'];
const ALL_BRANCHES = ['main', 'A1', 'A2', 'A3', 'A4', 'A5'];
const ALL_MIRRORS = ['cdn', 'quantil', 'fastly', 'gcore', 'testingcf'];
const ALL_CDNS = ['jsdelivr', 'statically', 'githack'];
const TESTINGCF_USERS = ['mrdavidss-vgg', 'archived-sites', 'mrdavidsz', 'Alsetle', 'mrdavidzs'];

const themeConfigs = {
    red: { accent: '#ff3b3b', soft: '#ff3b3b33', link: '#ff9b9b', bg: '#0b0b0c', text: '#f2f2f2', panel: 'rgba(20, 20, 22, 0.85)', dot: '255,255,255', fog: { highlight: 0xff3b3b, midtone: 0x220000, lowlight: 0xff0000, base: 0x0b0b0c } },
    blue: { accent: '#3b5fff', soft: '#4f3bff33', link: '#9badff', bg: '#0b0b0c', text: '#f2f2f2', panel: 'rgba(20, 20, 22, 0.85)', dot: '255,255,255', fog: { highlight: 0x3b5fff, midtone: 0x000022, lowlight: 0x0000ff, base: 0x0b0b0c } },
    green: { accent: '#3bff62', soft: '#3bff6233', link: '#9bffad', bg: '#0b0b0c', text: '#f2f2f2', panel: 'rgba(20, 20, 22, 0.85)', dot: '255,255,255', fog: { highlight: 0x3bff62, midtone: 0x002200, lowlight: 0x00ff00, base: 0x0b0b0c } },
    dark: { accent: '#f2f2f2', soft: '#f2f2f233', link: '#8a8a92', bg: '#141416', text: '#f2f2f2', panel: 'rgba(20, 20, 22, 0.85)', dot: '255,255,255', fog: { highlight: 0x888888, midtone: 0x222222, lowlight: 0x444444, base: 0x141416 } }
};

function applyTheme(themeId) {
    const t = themeConfigs[themeId];
    if (!t) return;
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent-soft', t.soft);
    root.style.setProperty('--link-color', t.link);
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--text', t.text);
    root.style.setProperty('--panel', t.panel);
    root.style.setProperty('--dot-color', t.dot);
}

let currentThemeId = localStorage.getItem('frosted-theme') || 'dark';
applyTheme(currentThemeId);

const $ = (id) => document.querySelector(id);

const resultsEl = document.getElementById('results');
const countEl = document.getElementById('count');
const loadingEl = document.getElementById('loading-indicator');
const noResultsEl = document.getElementById('no-results');

function isBypassed(mirrorKey, filterName) {
    if (filterName === 'all') return true;
    const info = MIRROR_INFO[mirrorKey];
    if (!info) return false;
    const lines = info.split('\n');
    return lines.some(line => line.includes(filterName) && line.includes('✅'));
}

document.getElementById('generate-btn').onclick = async () => {
    const loader = document.getElementById('central-loader');
    resultsEl.innerHTML = '';
    resultsEl.style.display = 'none';
    loadingEl.style.display = 'inline';
    loader.style.display = 'flex';
    noResultsEl.style.display = 'none';

    const selectedCDN = document.getElementById('cdn').value;
    const selectedMirror = document.getElementById('mirror').value;
    const selectedUser = document.getElementById('user').value;
    const selectedBranch = document.getElementById('branch').value;
    const selectedFilterCheck = document.getElementById('filter-check').value;
    const repo = document.getElementById('repo-input').value;

    const users = selectedUser === 'all' ? ALL_USERS : [selectedUser];
    const branches = selectedBranch === 'all' ? ALL_BRANCHES : [selectedBranch];
    const mirrors = selectedMirror === 'all' ? ALL_MIRRORS : [selectedMirror];
    const cdns = selectedCDN === 'all' ? ALL_CDNS : [selectedCDN];
    const files = ALL_FILES;

    let count = 0;

    if ((selectedCDN === 'all' || selectedCDN === 'jsdelivr') && (selectedUser === 'all' || selectedUser === 'mrdavidzs') && (selectedMirror === 'all' || selectedMirror === 'cdn')) {
        if (isBypassed('cdn', selectedFilterCheck)) {
            files.forEach(f => {
                addResult(`jsDelivr (Primary) - mrdavidzs (${f})`, `https://cdn.jsdelivr.net/gh/mrdavidzs/svgfrosted@main/${f}`);
                count++;
            });
        }
    }

    if (cdns.includes('jsdelivr')) {
        const mirrorSources = [];
        if (mirrors.includes('cdn')) mirrorSources.push({ url: 'cdnjsdelivr.json', name: 'cdn' });
        if (mirrors.includes('quantil')) mirrorSources.push({ url: 'quantiljsdelivr.json', name: 'quantil' });

        for (const source of mirrorSources) {
            try {
                const res = await fetch(source.url);
                if (res.ok) {
                    const data = await res.json();
                    data.forEach(link => {
                        const u = (link.match(/\/gh\/([^\/]+)/) || [])[1] || 'unknown';
                        const b = (link.match(/@([^\/]+)/) || [])[1] || 'main';

                        if (selectedUser !== 'all' && u !== selectedUser) return;
                        if (u === 'searchfrosted' && b === 'main') return;
                        if (['Science-Math-2248', 'applebeescheese16-glitch'].includes(u)) return;

                        if (isBypassed(source.name, selectedFilterCheck)) {
                            addResult(`jsDelivr (${source.name}) - ${u} 🌿 ${b}`, link.replace('@1.0.5', ''));
                            count++;
                        }
                    });
                }
            } catch (e) { console.warn(e); }
        }
    }

    users.forEach(u => {
        branches.forEach(b => {
            if (u === 'searchfrosted' && b === 'main') return;

            const filesToProcess = (u !== 'mrdavidzs' && b !== 'main') ? ['chudding.svg'] : files;

            filesToProcess.forEach(file => {
                const subPath = '';
                const fullPath = `${subPath}${file}`;

                cdns.forEach(c => {
                    if (c === 'jsdelivr') {
                        mirrors.forEach(m => {
                            if (m === 'testingcf' && !TESTINGCF_USERS.includes(u)) return;
                            if (!isBypassed(m, selectedFilterCheck)) return;
                            if (m === 'fastly' && u === 'searchfrosted' && b === 'main') return;

                            const link = `https://${m}.jsdelivr.net/gh/${u}/${repo}@${b}/${fullPath}`;
                            addResult(`jsDelivr (${m}) - ${u} 🌿 ${b} (${file})`, link);
                            count++;
                        });
                    } else if (c === 'statically') {
                        if (isBypassed('statically', selectedFilterCheck)) {
                            addResult(`statically.io - ${u} 🌿 ${b} (${file})`, `https://cdn.statically.io/gh/${u}/${repo}/${b}/${fullPath}`);
                            count++;
                        }
                    } else if (c === 'githack') {
                        if (isBypassed('githack', selectedFilterCheck)) {
                            addResult(`githack - ${u} 🌿 ${b} (${file})`, `https://raw.githack.com/${u}/${repo}/${b}/${fullPath}`);
                            count++;
                        }
                    }
                });
            });
        });
    });

    const filterLabel = selectedFilterCheck === 'all' ? 'Total' : selectedFilterCheck;
    countEl.innerHTML = `${filterLabel}: ${count} links <span id="loading-indicator" style="display:none">...generating</span>`;
    loadingEl.style.display = 'none';
    loader.style.display = 'none';
    resultsEl.style.display = 'grid';
    if (count === 0) noResultsEl.style.display = 'block';
};

function addResult(title, link) {
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = `
        <div class="result-top">
            <span><b>${title}</b></span>
            <div class="actions">
                <button class="small-btn" onclick="copy('${link}')">copy</button>
                <button class="small-btn" onclick="window.open('${link}')">open</button>
            </div>
        </div>
        <div class="link">${link}</div>
    `;
    resultsEl.appendChild(div);
}

const settingsModal = document.getElementById('settings-modal');
document.getElementById('settings-btn').onclick = () => settingsModal.classList.add('show');
document.getElementById('close-settings').onclick = () => settingsModal.classList.remove('show');

const MIRROR_INFO = {
    cdn: `<b>Results for cdn.jsdelivr.net</b>
🛡️ FortiGuard (Content Servers) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ✅
🧱 Blocksi Web (Personal: Content Servers) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (cdnandcloud) ✅
☁️ Cisco Umbrella (Infrastructure and Content Delivery Networks) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Search Engines & Tools) ✅
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (Educational Sites) ✅
🌳 Senso Cloud (General) ✅
😈 Deledao (Content servers) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (content-server) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Information Technology, Content Servers) ✅
🪼 ZScaler ✅`,
    quantil: `<b>Results for quantil.jsdelivr.net</b>
🛡️ FortiGuard (Information Technology) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Business: Information Technology) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (cdnandcloud) ✅
☁️ Cisco Umbrella (Infrastructure and Content Delivery Networks) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Search Engines & Tools, General Games Websites, Online Games) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (net) ✅
🌳 Senso Cloud (General) ✅
😈 Deledao (Content servers) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (content-server) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Business, Information Technology) ✅
🪼 ZScaler ⏱️ Timed out`,
    fastly: `<b>Results for fastly.jsdelivr.net</b>
🛡️ FortiGuard (Information Technology) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Business: Information Technology) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (cdnandcloud) ✅
☁️ Cisco Umbrella (Computers and Internet, Infrastructure and Content Delivery Networks) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Search Engines & Tools, General Games Websites, Online Games) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (net) ✅
🌳 Senso Cloud (General) ✅
😈 Deledao (Content servers) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (content-server) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Business, Information Technology) ✅
🪼 ZScaler ⏱️ Timed out`,
    gcore: `<b>Results for gcore.jsdelivr.net</b>
🛡️ FortiGuard (Information Technology) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Business: Information Technology) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (cdnandcloud) ✅
☁️ Cisco Umbrella (Computers and Internet, Infrastructure and Content Delivery Networks) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Search Engines & Tools, General Games Websites, Online Games) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (net) ✅
🌳 Senso Cloud (General) ✅
😈 Deledao (Content servers) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (content-server) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Business, Information Technology) ✅
🪼 ZScaler ⏱️ Timed out`,
    testingcf: `<b>Results for testingcf.jsdelivr.net</b>
🛡️ FortiGuard (Information Technology) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Business: Information Technology) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (cdnandcloud) ✅
☁️ Cisco Umbrella (Computers and Internet, Infrastructure and Content Delivery Networks) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Search Engines & Tools, General Games Websites, Online Games) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (net) ✅
🌳 Senso Cloud (General) ✅
😈 Deledao (Content servers) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (content-server) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Business, Information Technology) ✅
🪼 ZScaler ⏱️ Timed out`,
    statically: `<b>Results for cdn.statically.io</b>
🛡️ FortiGuard (Content Servers) ✅
🚦 Lightspeed (Computers) ✅
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Personal: Content Servers) ✅
🧱 Blocksi AI (Web Hosting) ✅
🌐 Linewize (computing) ✅
☁️ Cisco Umbrella (Computers and Internet) ✅
⚛️ Securly (General) ✅
🔒 GoGuardian (Uncategorized) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (io) ❌
🌳 Senso Cloud (Developer Tools) ✅
😈 Deledao (Unclassified) ✅
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (computing-technology) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Business, Information Technology) ✅
🪼 ZScaler ⏱️ Timed out`,
    githack: `<b>Results for raw.githack.com</b>
🛡️ FortiGuard (Information Technology) ✅
🚦 Lightspeed (Security - Proxy) ❌
🔥 Palo Alto ⏱️ Timed out
🧱 Blocksi Web (Business: Information Technology) ✅
🧱 Blocksi AI (Content Servers) ✅
🌐 Linewize (blocklist.proxies) ❌
☁️ Cisco Umbrella (Computers and Internet) ✅
⚛️ Securly (Games) ❌
🔒 GoGuardian (Online Games) ❌
🏫 LanSchool (LanSchool) ✅
🧹 ContentKeeper (ContentKeeper) ✅
🥏 AristotleK12 (! Blocked) ❌
🌳 Senso Cloud (Developer Tools) ✅
😈 Deledao (Games) ❌
💼 iBoss (iBoss) ✅
🛏️ Sophos (INFORMATION_TECHNOLOGY) ✅
🐍 Barracuda (computing-technology) ✅
🎙️ Qustodio (Technology) ✅
🛢️ DNSFilter (Information Technology) ✅
🪼 ZScaler Loading...`
};

const infoModal = document.getElementById('info-modal');

document.getElementById('info-trigger').onclick = () => {
    const mirror = document.getElementById('mirror').value;
    const text = MIRROR_INFO[mirror] || MIRROR_INFO.cdn;
    document.getElementById('info-text').innerHTML = text;
    infoModal.classList.add('show');
};

document.getElementById('cdn-info-trigger').onclick = () => {
    const cdn = document.getElementById('cdn').value;
    let text = "";
    if (cdn === 'statically') {
        text = MIRROR_INFO.statically;
    } else if (cdn === 'githack') {
        text = MIRROR_INFO.githack;
    } else {
        text = MIRROR_INFO.cdn;
    }
    document.getElementById('info-text').innerHTML = text;
    infoModal.classList.add('show');
};

document.getElementById('close-info').onclick = () => infoModal.classList.remove('show');

window.onclick = (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove('show');
    if (e.target === infoModal) infoModal.classList.remove('show');
};

document.querySelectorAll('.theme-opt').forEach(opt => {
    opt.onclick = () => {
        currentThemeId = opt.dataset.theme;
        localStorage.setItem('frosted-theme', currentThemeId);
        applyTheme(currentThemeId);
        settingsModal.classList.remove('show');
        initFog();
        initParticleGrid();
    };
});

const cloaks = {
    none: { title: 'frosted link generator', icon: 'assets/og-image.png' },
    drive: { title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png' },
    classroom: { title: 'Classes', icon: 'https://www.gstatic.com/classroom/favicon.png' },
    canvas: { title: 'Dashboard', icon: 'https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e1067b0b11.ico' },
    gmail: { title: 'Inbox (1) - gmail.user@gmail.com', icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico' },
    google: { title: 'Google', icon: 'https://www.google.com/favicon.ico' },
    zoom: { title: 'Zoom Meetings', icon: 'https://zoom.us/static/94191/image/favicon.ico' }
};

function applyCloak(id) {
    const cloak = cloaks[id] || cloaks.none;
    document.title = cloak.title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = cloak.icon;
    localStorage.setItem('frosted-cloak', id);
}

document.getElementById('cloaker-select').onchange = (e) => applyCloak(e.target.value);
const savedCloak = localStorage.getItem('frosted-cloak') || 'none';
document.getElementById('cloaker-select').value = savedCloak;

function updateGreeting() {
    const hour = new Date().getHours();
    const name = localStorage.getItem('frosted-username') || 'user';
    let greeting = "goodnight";

    if (hour >= 5 && hour < 12) greeting = "good morning";
    else if (hour >= 12 && hour < 18) greeting = "good afternoon";
    else if (hour >= 18 && hour < 22) greeting = "good evening";

    const banner = document.getElementById('greeting-banner');
    if (banner) banner.textContent = `${greeting}, ${name}!`;
}

document.getElementById('username-input').oninput = (e) => {
    const val = e.target.value.trim();
    localStorage.setItem('frosted-username', val || 'user');
    updateGreeting();
};

const tutorialSteps = [
    { title: "welcome!", desc: "welcome to frosted link generator! let's take a quick tour of how to use this tool.", target: null },
    { title: "sidebar controls", desc: "here you can select your filters, CDNs, and specific users to generate links for.", target: ".sidebar" },
    { title: "action buttons", desc: "generate your links or clear the list from here.", target: ".buttons" },
    { title: "settings & themes", desc: "personalize your experience with custom themes and tab cloaking.", target: "#settings-btn" },
    { title: "link output", desc: "your generated links will appear here. you can copy them individually with ease.", target: ".main" }
];

let currentStep = 0;
function startTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    overlay.style.display = 'flex';
    showStep(0);
}

function showStep(index) {
    const step = tutorialSteps[index];
    const spotlight = document.getElementById('spotlight');
    const target = step.target ? document.querySelector(step.target) : null;

    document.getElementById('tut-title').textContent = step.title;
    document.getElementById('tut-desc').textContent = step.desc;

    if (target) {
        const rect = target.getBoundingClientRect();
        spotlight.style.top = (rect.top - 5) + 'px';
        spotlight.style.left = (rect.left - 5) + 'px';
        spotlight.style.width = (rect.width + 10) + 'px';
        spotlight.style.height = (rect.height + 10) + 'px';
        spotlight.style.opacity = '1';
    } else {
        spotlight.style.opacity = '0';
    }

    document.getElementById('tut-next').textContent = index === tutorialSteps.length - 1 ? "get started" : "next";
}

document.getElementById('tut-next').onclick = () => {
    currentStep++;
    if (currentStep < tutorialSteps.length) {
        showStep(currentStep);
    } else {
        const overlay = document.getElementById('tutorial-overlay');
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.getElementById('spotlight').style.display = 'none';
            localStorage.setItem('frosted-onboarded', 'true');

            if (!localStorage.getItem('frosted-v1-seen')) {
                document.getElementById('release-modal').classList.add('show');
            }
        }, 500);
    }
};

function initFog() {
    if (window._vantaEffect) {
        if (typeof window._vantaEffect.destroy === 'function') {
            window._vantaEffect.destroy();
        }
        window._vantaEffect = null;
    }

    const el = $('#vanta-bg');
    if (!el) return;

    if (typeof VANTA === 'undefined' || !VANTA.FOG) {
        console.warn('Vanta fog not loaded yet');
        return;
    }

    const t = themeConfigs[currentThemeId] || themeConfigs.dark;
    const f = t.fog;

    try {
        window._vantaEffect = VANTA.FOG({
            el: el,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: f.highlight,
            midtoneColor: f.midtone,
            lowlightColor: f.lowlight,
            baseColor: f.base,
            blurFactor: 0.6,
            speed: 2.0,
            zoom: 1.2
        });
    } catch (e) {
        console.warn('Vanta fog init failed', e);
    }
}

let gridAnimId;
function initParticleGrid() {
    cancelAnimationFrame(gridAnimId);
    const c = $('#particle-grid');
    const ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const dotColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-color').trim() || '255, 255, 255';

    c.classList.add('visible');

    const scale = Math.min(c.width, c.height) / 900;
    const spacing = Math.round(28 * Math.max(scale, 0.6));
    const radius = 1.2 * Math.max(scale, 0.5);
    const influenceRadius = 200 * Math.max(scale, 0.6);
    const maxDisplace = 45 * Math.max(scale, 0.6);
    const cols = Math.ceil(c.width / spacing) + 1;
    const rows = Math.ceil(c.height / spacing) + 1;
    let time = 0;

    const dots = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            dots.push({ homeX: col * spacing, homeY: row * spacing, x: col * spacing, y: row * spacing, col, row, scale: 1 });
        }
    }

    const mouse = { x: -9999, y: -9999 };
    window.onmousemove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        time += 0.02;
        for (let i = 0; i < dots.length; i++) {
            const d = dots[i];
            const waveX = Math.sin(time + d.col * 0.3 + d.row * 0.15) * 4;
            const waveY = Math.cos(time * 0.8 + d.row * 0.25 + d.col * 0.1) * 5 + Math.sin(time * 0.5 + d.col * 0.15) * 3;
            const targetX = d.homeX + waveX;
            const targetY = d.homeY + waveY;
            const dx = mouse.x - d.homeX;
            const dy = mouse.y - d.homeY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < influenceRadius) {
                const force = (1 - dist / influenceRadius);
                const angle = Math.atan2(dy, dx);
                const push = force * force * maxDisplace;
                d.x += (targetX - Math.cos(angle) * push - d.x) * 0.3;
                d.y += (targetY - Math.sin(angle) * push - d.y) * 0.3;
                d.scale += (1 + force * 1.2 - d.scale) * 0.3;
            } else {
                d.x += (targetX - d.x) * 0.12; d.y += (targetY - d.y) * 0.12; d.scale += (1 - d.scale) * 0.12;
            }
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius * d.scale, 0, 6.283);
            ctx.fillStyle = `rgba(${dotColor},${d.scale > 1.05 ? 0.4 + (d.scale - 1) * 0.5 : 0.15})`;
            ctx.fill();
        }
        gridAnimId = requestAnimationFrame(draw);
    }
    draw();
}

window.addEventListener('resize', () => { initParticleGrid(); });
window.onload = () => {
    initFog();
    initParticleGrid();
    applyCloak(savedCloak);

    const savedName = localStorage.getItem('frosted-username') || 'user';
    document.getElementById('username-input').value = savedName === 'user' ? '' : savedName;
    updateGreeting();

    const userSelect = document.getElementById('user');
    if (userSelect) userSelect.value = 'all';

    const cdnSelect = document.getElementById('cdn');
    const mirrorContainer = document.getElementById('mirror-container');
    const updateMirrorVisibility = () => {
        mirrorContainer.style.display = (cdnSelect.value === 'all' || cdnSelect.value === 'jsdelivr') ? 'flex' : 'none';
    };
    cdnSelect.addEventListener('change', updateMirrorVisibility);
    updateMirrorVisibility();

    if (!localStorage.getItem('frosted-onboarded')) {
        setTimeout(startTutorial, 800);
    }

    const hasVisited = localStorage.getItem('frosted-visited');
    if (!hasVisited) {
        showToast('welcome user!');
        localStorage.setItem('frosted-visited', 'true');
    } else {
        showToast('welcome back user!');
    }
};

document.getElementById('close-release').onclick = () => {
    document.getElementById('release-modal').classList.remove('show');
    localStorage.setItem('frosted-v1-seen', 'true');
};

function copy(text) {
    navigator.clipboard.writeText(text);
    showToast('copied');
}

document.getElementById('clear').onclick = () => {
    resultsEl.innerHTML = '';
    countEl.innerHTML = `0 links <span id="loading-indicator" style="display:none">...generating</span>`;
    noResultsEl.style.display = 'none';
};

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1500);
}