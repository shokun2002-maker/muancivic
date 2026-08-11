/* ==========================================================================
   무안 자치주권 시민연대 (Muan Civic Sovereignty Alliance) Core Web App Script
   ========================================================================== */

// --- INITIAL STATE & MOCK DATA ---
const STORAGE_KEY = 'muan_civic_data_v1';

const defaultData = {
    issues: [
        {
            id: 1,
            title: "무안 생태갯벌 및 청정해양 환경보전 종합대책 수립 촉구",
            category: "환경",
            summary: "무안군 해안가 갯벌 보호구역에 대규모 개발 계획이 추진되면서 해양 생태계 파괴 우려가 제기되고 있습니다. 시민연대는 지속 가능한 생태 보전을 촉구합니다.",
            status: "시민의견 수렴중",
            date: "2026-08-01",
            overview: "전라남도 무안군의 청정 갯벌은 습지보호지역이자 세계 자연유산적 가치를 지닌 보물입니다. 하지만 최근 해안 도로 확장 및 인근 관광 개발 사업 과정에서 환경성 평가가 미흡하게 이루어지고 있다는 지적이 이어지고 있습니다.",
            currentStatus: "무안군청 담당 부서에 환경영향평가 재실시 및 군민 공청회 개최 요구서를 전달한 상태이며, 환경 전문가들과 공동 현장 조사를 진행 중입니다.",
            position: "개발 위주의 행정에서 벗어나 무안의 미래 자산인 갯벌과 해양 생태계를 보전하는 방향으로 사업 방향을 전면 재검토해야 합니다.",
            comments: [
                { author: "김철수(무안읍)", text: "갯벌은 한번 훼손되면 되돌릴 수 없습니다. 강력히 보전을 요구합니다!", date: "2026-08-02" },
                { author: "이영희(해제면)", text: "해제 갯벌 습지보호구역 지키기에 지역 주민들이 함께하겠습니다.", date: "2026-08-03" }
            ]
        },
        {
            id: 2,
            title: "삼향·일로·오룡지구 대중교통 배차간격 단축 및 노선 확충",
            category: "교통",
            summary: "신도시 인구 유입으로 이동 수요가 크게 급증했으나 출퇴근 시 대중교통 배차간격이 길어 주민 불편이 가중되고 있어 노선 전면 개편을 제안합니다.",
            status: "정책제안 완료",
            date: "2026-07-25",
            overview: "남악 및 오룡지구 등 삼향·일로읍 일대의 인구가 지속 증가함에 따라 무안읍 중심가 및 목포권 연결 버스 노선의 불편함이 누적되고 있습니다.",
            currentStatus: "시민연대 교통분과에서 군민 500여 명의 설문조사를 완료하고, 무안군 교통행정과에 '주민 맞춤형 공영버스 확대안'을 제출했습니다.",
            position: "지방정부가 재정을 투입하여 버스 준공영제 또는 수요응답형(DRT) 마을버스를 적극 도입하여 교통 복지를 실현해야 합니다.",
            comments: [
                { author: "박민우(삼향읍)", text: "출퇴근 시간 버스 기다리기가 너무 힘듭니다. 빠른 개선 부탁드립니다.", date: "2026-07-26" }
            ]
        },
        {
            id: 3,
            title: "무안 양파·마늘 농가 수확기 직거래 및 가격 안정화 정책 추진",
            category: "농업",
            summary: "기후변화와 유통 구조로 인해 어려움을 겪는 지역 대표 농산물 농가를 위해 유통 구조 개선과 최저 생산비 보장 조례 제정을 요구합니다.",
            status: "조례 제정 운동중",
            date: "2026-07-15",
            overview: "무안군의 핵심 산업인 농업, 특히 양파와 마늘 수확기 폭락 문제로 농가 시름이 깊어지고 있습니다.",
            currentStatus: "무안군 농업인 단체들과 공동으로 '농산물 최저 가격 보장 조례 제정' 촉구 서명운동을 전개하고 있습니다.",
            position: "무안군은 농가에 책임을 전가하지 말고 농산물 유통 조절 기여금을 확대 편성하고 최저 생산비를 제도적으로 보장해야 합니다.",
            comments: []
        },
        {
            id: 4,
            title: "무안군 주민참여예산제 투명성 강화 및 시민 자율예산 확대",
            category: "주민자치",
            summary: "주민참여예산이 단순 선심성 사업에 치우치지 않도록 주민자치회 직접 심의 권한을 늘리고 실질적인 자치권을 부여해야 합니다.",
            status: "기자회견 진행",
            date: "2026-07-08",
            overview: "지방자치법에 명시된 주민참여예산 제도가 관주도의 겉치레에 그치고 있다는 비판이 제기되고 있습니다.",
            currentStatus: "시민연대는 기자회견을 열고 주민참여예산위원회의 민간위원 비율 확대 및 공개 검증 절차 도입을 공개 요구했습니다.",
            position: "주민이 직접 지역 사업을 기획하고 편성할 수 있는 실질적 예산 편성권을 인구 대비 정률 보장해야 합니다.",
            comments: []
        },
        {
            id: 5,
            title: "무안군 초·중·고 안전한 통학로 및 청소년 문화 공간 조성",
            category: "교육",
            summary: "농촌 지역 및 신도시 학생들의 통학로 안전 시설을 보강하고 청소년이 건전하게 이용할 수 있는 자치 문화 공간 확충이 시급합니다.",
            status: "검토중",
            date: "2026-06-20",
            overview: "무안군 관내 학교 주변 어린이 보호구역 신호등 부재 및 보도 미비 구역이 여전히 존재합니다.",
            currentStatus: "무안교육지원청 및 경찰서와 합동 안전 점검을 실시하였습니다.",
            position: "아이들의 안전과 행복은 서둘러 예산을 투입해야 할 최우선 과제입니다.",
            comments: []
        }
    ],

    statements: [
        {
            id: 1,
            category: "성명서",
            title: "[성명서] 무안군 주민자치회 권한 대폭 강화 및 예산 자율성 촉구",
            date: "2026-08-10",
            views: 245,
            content: `
               <h2>[성명서] 주민이 진정한 주인되는 무안의 참된 자치를 촉구한다!</h2>
               <p>풀뿌리 주민자치는 지방자치의 핵심 꽃이자 시민 민주주의의 바탕이다. 그러나 지금 무안군의 주민자치회 현주소는 어떠한가? 행정의 하부 조직처럼 다뤄지며 실질적인 결정권과 예산 자율권은 소외되어 있다.</p>
               <p>무안 자치주권 시민연대는 10만 무안군민의 뜻을 모아 다음과 같이 엄중히 촉구한다.</p>
               <ol>
                   <li>무안군은 읍·면 주민자치회의 위원 선출 과정을 행정 개입 없이 전면 민주화하라!</li>
                   <li>주민참여예산 중 최우선 사업을 주민자치회가 직접 선정하고 집행할 수 있는 권한을 보장하라!</li>
                   <li>군정의 주요 현안 결정에 군민 투표권을 적극 활성화하라!</li>
               </ol>
               <p>우리의 요구가 관철될 때까지 무안의 모든 시민사회단체는 멈추지 않고 연대하여 투쟁할 것임을 밝힌다.</p>
               <p class="text-right"><strong>2026년 8월 10일<br>무안 자치주권 시민연대 회원 일동</strong></p>
            `
        },
        {
            id: 2,
            category: "보도자료",
            title: "[보도자료] 무안 생태갯벌 보전을 위한 시민사회 합동 조례 제안서 제출",
            date: "2026-08-05",
            views: 189,
            content: `<p>무안 자치주권 시민연대는 무안 환경운동단체들과 함께 '무안군 생태계 보전 및 갯벌 지속가능 관리 조례안'을 작성하여 무안군의회에 공식 제출했다고 밝혔다.</p>`
        },
        {
            id: 3,
            category: "논평",
            title: "[논평] 무안군 청사 및 공공시설 이용 투명성 및 시민 개방 조치 환영",
            date: "2026-07-28",
            views: 132,
            content: `<p>무안군이 공공시설의 주민 무료 개방 및 예약 시스템을 개선한 것에 대해 진심으로 환영의 뜻을 표하며, 앞으로도 시민 접근성을 더욱 강화해주기를 기대한다.</p>`
        },
        {
            id: 4,
            category: "정책제안",
            title: "[정책제안] 농가 수확기 직거래 지원 시스템 및 공공유통 플랫폼 건립안",
            date: "2026-07-18",
            views: 310,
            content: `<p>무안 양파·마늘 유통 구조 혁신을 위한 무안군 자체 온라인 직거래 플랫폼 및 지역 마켓 확충 제안서 전문입니다.</p>`
        }
    ],

    activities: [
        {
            id: 101,
            title: "무안군 주민자치 실질화를 위한 군민 100인 대토론회 현장",
            category: "토론회",
            date: "2026-08-05",
            imageUrl: "./hero_bg.png",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            desc: "주민자치회 예산 자율성과 주민 직접 참여 확대를 논의했습니다.",
            content: "무안 승달문화예술회관에서 열린 군민 100인 토론회 현장 기록입니다. 무안군 9개 읍면 군민 대표들이 한자리에 모여 주민자치 권한 강화 방안을 발표하고 토론하였습니다.",
            icon: "fa-comments"
        },
        {
            id: 102,
            title: "청정 무안 해안가 방치 폐기물 수거 및 생태계 정화 봉사활동",
            category: "봉사활동",
            date: "2026-07-28",
            imageUrl: "./hero_bg.png",
            videoUrl: "",
            desc: "해제면 유월리 해안에서 무안시민연대 회원 50여 명이 환경 정화 봉사에 동참했습니다.",
            content: "무안 자치주권 시민연대 봉사단이 해제면 바닷가 일대의 수산 폐기물과 부유 쓰레기를 수거하였습니다. 깨끗한 갯벌 생태계를 위해 지속적인 정화 활동을 전개하겠습니다.",
            icon: "fa-camera-retro"
        },
        {
            id: 103,
            title: "무안 자치주권 시민연대 창립 총회 및 공식 선언 기자회견 영상",
            category: "기자회견",
            date: "2026-07-15",
            imageUrl: "./hero_bg.png",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            desc: "시민이 주인 되는 무안을 만들기 위한 시민연대 창립선언 현장 영상입니다.",
            content: "무안군청 프레스센터에서 진행된 무안 자치주권 시민연대 창립 기자회견 전문과 미디어 기록입니다.",
            icon: "fa-bullhorn"
        }
    ],

    petitions: {
        title: "무안군 주민자치 실질화를 위한 3,000인 무안시민 서명운동",
        goal: 3000,
        count: 1842,
        desc: "주민 자치는 지방자치단체의 통제를 벗어나 무안군민이 지역 의사를 스스로 결정할 수 있어야 합니다. 읍·면 주민자치회 권한 강화와 예산 자율성 확보를 위해 서명에 함께해주세요!",
        signers: [
            { name: "홍*동", region: "무안읍", date: "2026-08-11 14:10", comment: "무안의 자치가 바로 서길 소망합니다." },
            { name: "김*진", region: "삼향읍", date: "2026-08-11 13:45", comment: "주민참여예산 권한을 더 늘려주세요." },
            { name: "박*석", region: "일로읍", date: "2026-08-11 12:20", comment: "시민연대 화이팅!" },
            { name: "이*순", region: "청계면", date: "2026-08-11 11:05", comment: "농민의 목소리도 경청해주길 바랍니다." },
            { name: "최*호", region: "해제면", date: "2026-08-11 09:30", comment: "당당한 무안군민이 됩시다." }
        ]
    },

    proposals: [
        {
            id: 1,
            title: "남악·오룡 수변공원 야간 안전 조명 및 시민 쉼터 확충",
            category: "지역개발",
            author: "남악시민",
            date: "2026-08-08",
            upvotes: 42,
            content: "수변공원 산책로 일부 구간이 야간에 어두워 어린이와 어르신 산책 시 안전사고 위험이 있습니다. LED 태양광 안심 조명 설치를 제안합니다."
        },
        {
            id: 2,
            title: "무안읍 전통 5일시장 주차장 무료 회차 시간 1시간 확대",
            category: "교통",
            author: "무안상인",
            date: "2026-08-04",
            upvotes: 38,
            content: "장날 전통시장 이용객들이 편안하게 장을 볼 수 있도록 주차장 회차 시간을 30분에서 1시간으로 확대해주십시오."
        },
        {
            id: 3,
            title: "농촌 지역 독거어르신을 위한 100원 안심 택시 운영 횟수증가",
            category: "복지",
            author: "몽탄주민",
            date: "2026-07-29",
            upvotes: 29,
            content: "버스 이용이 힘든 오지 마을 어르신들의 병원 방문을 돕기 위해 안심 택시 지원 바우처를 확대해주셨으면 좋겠습니다."
        }
    ],

    reports: [
        {
            id: 101,
            category: "환경",
            title: "무안 해제면 인근 해안가 산업 폐기물 야적 제보",
            name: "익명제보자",
            date: "2026-08-09",
            status: "현장조사 완료",
            public: true,
            content: "해안 도로 부근에 불법 폐기물이 쌓여 방치되고 있습니다."
        },
        {
            id: 102,
            category: "교통",
            title: "청계면 대학로 스쿨존 보도 블록 파손 및 위험 요소",
            name: "청계주민",
            date: "2026-08-07",
            status: "행정 건의완료",
            public: true,
            content: "학생 통학로 보도블록이 유실되어 넘어질 위험이 큽니다."
        }
    ],

    events: [
        { date: "2026-08-15", title: "광복절 계기 지역 사적지 시민 답사", location: "무안읍 독립운동 기념비 (10:00)" },
        { date: "2026-08-20", title: "무안 갯벌 생태 보전 시민 토론회", location: "무안군민회관 2층 (14:00)" },
        { date: "2026-08-28", title: "8월 정기 회원 운영위원회", location: "시민연대 사무실 (19:00)" },
        { date: "2026-09-05", title: "농업인 희망 정책 한마당", location: "무안 5일시장 광장 (11:00)" }
    ],

    notices: [
        { id: 1, title: "무안 자치주권 시민연대 8월 회원 정기 모임 안내", date: "2026-08-08" },
        { id: 2, title: "[자료실] 2026년 무안군 주민참여예산 현황 분석 보고서", date: "2026-08-02" },
        { id: 3, title: "온라인 시민 제보 센터 개인정보 보안 정책 강화 안내", date: "2026-07-25" }
    ],

    partners: [
        { name: "무안환경운동연합", desc: "청정 무안의 생태계와 갯벌 보전을 위해 활동하는 환경 NGO", icon: "fa-leaf" },
        { name: "무안군 농업인회", desc: "무안 농민 권익 신장과 농촌 경제 활성화를 위한 대표 단체", icon: "fa-wheat-awn" },
        { name: "무안여성농민회", desc: "성평등 농촌 사회와 여성 농민의 지속 가능한 삶을 만드는 연대", icon: "fa-person-dress" },
        { name: "무안교육희망연대", desc: "우리 아이들의 공교육 정상화와 안전한 교육 환경 조성 단체", icon: "fa-graduation-cap" },
        { name: "무안청년회의소(JC)", desc: "지역 사회발전에 앞장서는 미래 무안 청년 리더들의 모임", icon: "fa-user-group" },
        { name: "무안참여예산시민 네트워크", desc: "무안군 예산의 투명한 집행과 주민참여 확대를 위한 시민단체", icon: "fa-calculator" }
    ],

    members: [
        { id: 'admin', pw: 'muan2026', name: '최고관리자', region: '무안읍', type: '정회원', role: 'super_admin', date: '2026-01-01', contact: '061-450-0000', email: 'admin@muan.org' },
        { id: 'kim_muan', pw: '1234', name: '김철수', region: '무안읍', type: '정회원', role: 'operator', date: '2026-07-10', contact: '010-1234-5678', email: 'kim@naver.com' },
        { id: 'park_samhyang', pw: '1234', name: '박영희', region: '삼향읍', type: '정회원', role: 'member', date: '2026-07-20', contact: '010-9876-5432', email: 'park@daum.net' },
        { id: 'lee_illo', pw: '1234', name: '이동진', region: '일로읍', type: '후원회원', role: 'member', date: '2026-08-01', contact: '010-5555-4444', email: 'lee@gmail.com' }
    ]
};

// Data Store Controller
function loadStore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData;
    }
    try {
        let data = JSON.parse(raw);
        if (!data.activities || data.activities.length === 0) {
            data.activities = defaultData.activities;
        }
        return data;
    } catch(e) {
        return defaultData;
    }
}

function saveStore(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let store = loadStore();

// --- APP INITIALIZATION & DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderAllViews();
    initForms();
    initAiAssistant();
    initAdminPanel();
});

// --- NAVIGATION & TAB SYSTEM ---
function initNavigation() {
    // Nav Links
    document.querySelectorAll('.nav-link, .drawer-menu-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            const tab = link.getAttribute('data-tab');
            if (tab) {
                e.preventDefault();
                switchTab(tab);
                closeMobileDrawer();
            }
        });
    });

    // Mobile Hamburger Toggle
    const mobileBtn = document.getElementById('mobileToggleBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');

    if (mobileBtn) mobileBtn.addEventListener('click', openMobileDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

    // Subtab Button Event Listeners (About & Admin)
    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sub = btn.getAttribute('data-sub');
            document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sub-content-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetPanel = document.getElementById(`sub-${sub}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const atab = btn.getAttribute('data-atab');
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetPanel = document.getElementById(`atab-${atab}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // Top action triggers
    const btnOpenAiTop = document.getElementById('btnOpenAiTop');
    if (btnOpenAiTop) btnOpenAiTop.addEventListener('click', openAiDrawer);

    const btnToggleAdmin = document.getElementById('btnToggleAdmin');
    if (btnToggleAdmin) btnToggleAdmin.addEventListener('click', () => handleAdminAccess());

    const btnDrawerAi = document.getElementById('btnDrawerAi');
    if (btnDrawerAi) btnDrawerAi.addEventListener('click', () => { closeMobileDrawer(); openAiDrawer(); });

    const btnDrawerAdmin = document.getElementById('btnDrawerAdmin');
    if (btnDrawerAdmin) btnDrawerAdmin.addEventListener('click', () => { closeMobileDrawer(); handleAdminAccess(); });

    updateAdminHeaderUI();
}

function handleAdminAccess() {
    window.location.href = 'admin.html';
}

function updateAdminHeaderUI() {
    const userSpan = document.getElementById('userStatusSpan');
    const btnReg = document.getElementById('btnUserRegister');
    const btnLog = document.getElementById('btnUserLogin');
    const btnAdmin = document.getElementById('btnToggleAdmin');

    if (store.currentUser) {
        const u = store.currentUser;
        let roleBadge = u.role === 'super_admin' ? '<span class="badge-tag label-accent"><i class="fa-solid fa-crown"></i> 최초관리자</span>' : (u.role === 'operator' ? '<span class="badge-tag label-primary"><i class="fa-solid fa-shield-halved"></i> 운영자</span>' : `<span class="badge-tag label-secondary">${u.type}</span>`);
        if (userSpan) userSpan.innerHTML = `<strong>${u.name}</strong> 님 ${roleBadge}`;
        if (btnReg) btnReg.style.display = 'none';
        if (btnLog) {
            btnLog.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> 로그아웃';
            btnLog.onclick = userLogout;
        }
    } else {
        if (userSpan) userSpan.innerHTML = '';
        if (btnReg) btnReg.style.display = 'inline-flex';
        if (btnLog) {
            btnLog.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> 로그인';
            btnLog.onclick = () => openModal('modalAdminLogin');
        }
    }

    if (btnAdmin) {
        const isOp = store.currentUser && (store.currentUser.role === 'super_admin' || store.currentUser.role === 'operator');
        if (isOp || store.isAdminLoggedIn) {
            btnAdmin.style.display = 'inline-flex';
            btnAdmin.innerHTML = '<i class="fa-solid fa-user-shield"></i> 관리자 대시보드';
            btnAdmin.onclick = handleAdminAccess;
        } else {
            btnAdmin.style.display = 'inline-flex';
            btnAdmin.innerHTML = '<i class="fa-solid fa-user-shield"></i> 관리자 로그인';
            btnAdmin.onclick = handleAdminAccess;
        }
    }
}

function userLogout() {
    store.currentUser = null;
    store.isAdminLoggedIn = false;
    saveStore(store);
    updateAdminHeaderUI();
    switchTab('home');
    showToast('로그아웃 되었습니다.', 'info');
}

function adminLogout() {
    userLogout();
}

function switchTab(tabId) {
    const isOp = store.currentUser && (store.currentUser.role === 'super_admin' || store.currentUser.role === 'operator');
    if (tabId === 'admin') {
        window.open('admin.html', '_blank');
        return;
    }

    const targetPage = document.getElementById(`tab-${tabId}`);
    if (targetPage) {
        document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const activeNavLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        if (activeNavLink) activeNavLink.classList.add('active');
    } else {
        const pageMap = {
            'home': 'index.html',
            'about': 'about.html',
            'issues': 'issues.html',
            'activities': 'activities.html',
            'statements': 'statements.html',
            'voice': 'voice.html',
            'participate': 'voice.html',
            'report': 'voice.html',
            'notice': 'notice.html',
            'support': 'support.html'
        };
        if (pageMap[tabId]) {
            window.location.href = pageMap[tabId];
        }
    }
}
window.switchTab = switchTab;

function openMobileDrawer() {
    document.getElementById('mobileDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
}

function closeMobileDrawer() {
    document.getElementById('mobileDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
}

// --- RENDER VIEWS & DYNAMIC DATA ---
function renderAllViews() {
    renderHomeStats();
    renderIssues();
    renderPetitionData();
    renderActivities();
    renderStatements();
    renderProposals();
    renderCalendarAndNotices();
    renderPartners();
    renderPublicReports();
}

function renderHomeStats() {
    document.getElementById('statPetitionSignatures').innerText = store.petitions.count.toLocaleString();
    document.getElementById('statActiveIssues').innerText = store.issues.length;
    document.getElementById('statProposals').innerText = store.proposals.length;
    document.getElementById('statPartnerCount').innerText = store.partners.length;
}

// Render Issues (Home & Full)
function renderIssues(catFilter = 'all') {
    const homeGrid = document.getElementById('homeIssuesGrid');
    const fullGrid = document.getElementById('fullIssuesGrid');

    const filtered = catFilter === 'all' 
        ? store.issues 
        : store.issues.filter(i => i.category === catFilter);

    const generateCardHtml = (item) => `
        <div class="issue-card">
            <div class="issue-card-header">
                <span class="badge-tag label-primary"><i class="fa-solid fa-tag"></i> ${item.category}</span>
                <span class="badge-tag label-secondary">${item.status}</span>
            </div>
            <div class="issue-card-body">
                <div>
                    <h3 class="issue-card-title">${item.title}</h3>
                    <p class="issue-card-desc">${item.summary}</p>
                </div>
                <div class="issue-card-footer">
                    <span><i class="fa-solid fa-calendar"></i> ${item.date}</span>
                    <button class="btn btn-outline btn-sm" onclick="openIssueModal(${item.id})">
                        자세히 보기 <i class="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    if (homeGrid) {
        homeGrid.innerHTML = filtered.slice(0, 3).map(generateCardHtml).join('');
    }
    if (fullGrid) {
        fullGrid.innerHTML = filtered.map(generateCardHtml).join('');
    }

    // Bind Filter Chips
    bindCategoryChips('issuesFilterBar', renderIssues);
    bindCategoryChips('issuesFullFilterBar', renderIssues);
}

function bindCategoryChips(barId, callback) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    bar.querySelectorAll('.filter-chip').forEach(chip => {
        chip.onclick = () => {
            bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.getAttribute('data-cat');
            callback(cat);
        };
    });
}

// Render Petition Progress Bar & Recent Signers Ticker
function renderPetitionData() {
    const pct = ((store.petitions.count / store.petitions.goal) * 100).toFixed(1);
    
    // Home Banner
    const homePct = document.getElementById('homePetitionPercent');
    const homeGoal = document.getElementById('homePetitionGoal');
    const homeCount = document.getElementById('homePetitionCount');
    const homeFill = document.getElementById('homePetitionFill');

    if (homePct) homePct.innerText = `${pct}%`;
    if (homeGoal) homeGoal.innerText = `${store.petitions.goal.toLocaleString()}명`;
    if (homeCount) homeCount.innerText = `${store.petitions.count.toLocaleString()}명`;
    if (homeFill) homeFill.style.width = `${pct}%`;

    // Full Tab Section
    const fullPct = document.getElementById('fullPetitionPercent');
    const fullGoal = document.getElementById('fullPetitionGoal');
    const fullCount = document.getElementById('fullPetitionCount');
    const fullFill = document.getElementById('fullPetitionFill');

    if (fullPct) fullPct.innerText = `${pct}%`;
    if (fullGoal) fullGoal.innerText = `${store.petitions.goal.toLocaleString()}명`;
    if (fullCount) fullCount.innerText = `${store.petitions.count.toLocaleString()}명`;
    if (fullFill) fullFill.style.width = `${pct}%`;

    // Signers list
    const signersList = document.getElementById('recentSignersList');
    if (signersList) {
        signersList.innerHTML = store.petitions.signers.map(s => `
            <div class="signer-item">
                <span class="signer-name"><strong>${s.name}</strong> (${s.region})</span>
                <span class="signer-comment">"${s.comment || '서명에 동참합니다.'}"</span>
                <span class="signer-date">${s.date}</span>
            </div>
        `).join('');
    }
}

// Render Activities
function renderActivities() {
    const homeGrid = document.getElementById('homeActivitiesGrid');
    const fullGrid = document.getElementById('fullActivitiesGrid');

    if (!store.activities) store.activities = defaultData.activities;

    const cardHtml = (item) => `
        <div class="activity-card" style="cursor:pointer;" onclick="openActivityModal(${item.id})">
            <div class="activity-thumb">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" onerror="this.onerror=null; this.src='./logo.png';">` : `<i class="fa-solid ${item.icon || 'fa-camera-retro'}"></i>`}
                <span class="activity-badge">${item.category}</span>
                ${item.videoUrl ? '<span class="badge-tag label-accent" style="position:absolute; bottom:0.5rem; right:0.5rem;"><i class="fa-solid fa-circle-play"></i> 영상</span>' : ''}
            </div>
            <div class="activity-content">
                <h4 class="activity-title">${item.title}</h4>
                <p class="activity-desc">${item.desc}</p>
                <div class="activity-date mt-2 flex-header">
                    <span><i class="fa-solid fa-calendar"></i> ${item.date}</span>
                    <span class="text-primary font-weight-bold">자세히 보기 <i class="fa-solid fa-angle-right"></i></span>
                </div>
            </div>
        </div>
    `;

    if (homeGrid) homeGrid.innerHTML = store.activities.slice(0, 4).map(cardHtml).join('');
    if (fullGrid) fullGrid.innerHTML = store.activities.map(cardHtml).join('');
}

function openActivityModal(id) {
    if (!store.activities) store.activities = defaultData.activities;
    const item = store.activities.find(a => a.id === id);
    if (!item) return;

    document.getElementById('modalActCat').innerText = item.category;
    document.getElementById('modalActTitle').innerText = item.title;
    document.getElementById('modalActDate').innerText = item.date;
    document.getElementById('modalActSummaryContent').innerText = item.desc || item.title;
    document.getElementById('modalActContent').innerText = item.content || item.desc || "상세 활동 내용이 수록되어 있습니다.";

    // Video Handler
    const videoWrap = document.getElementById('modalActVideoWrap');
    const videoIframe = document.getElementById('modalActVideoIframe');
    if (item.videoUrl) {
        let embedUrl = item.videoUrl;
        if (embedUrl.includes('youtube.com/watch?v=')) {
            const vId = embedUrl.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${vId}`;
        } else if (embedUrl.includes('youtu.be/')) {
            const vId = embedUrl.split('youtu.be/')[1];
            embedUrl = `https://www.youtube.com/embed/${vId}`;
        }
        videoIframe.src = embedUrl;
        videoWrap.style.display = 'block';
    } else {
        videoIframe.src = '';
        videoWrap.style.display = 'none';
    }

    // Photo Handler
    const imgWrap = document.getElementById('modalActImageWrap');
    const imgElem = document.getElementById('modalActImg');
    if (item.imageUrl) {
        imgElem.src = item.imageUrl;
        imgWrap.style.display = 'block';
    } else {
        imgWrap.style.display = 'none';
    }

    openModal('modalActivityDetail');
}

// Render Statements Table & Home List
function renderStatements(subCat = 'all', searchQuery = '') {
    const homeList = document.getElementById('homeStatementsList');
    const fullTbody = document.getElementById('fullStatementsTbody');

    let list = store.statements;
    if (subCat !== 'all') {
        list = list.filter(s => s.category === subCat);
    }
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q));
    }

    if (homeList) {
        homeList.innerHTML = store.statements.slice(0, 4).map(s => `
            <div class="statement-item" onclick="openStatementModal(${s.id})">
                <div class="statement-main">
                    <span class="badge-tag label-dark">${s.category}</span>
                    <span class="statement-title">${s.title}</span>
                </div>
                <span class="statement-date"><i class="fa-solid fa-calendar"></i> ${s.date}</span>
            </div>
        `).join('');
    }

    if (fullTbody) {
        fullTbody.innerHTML = list.map(s => `
            <tr>
                <td><span class="badge-tag label-primary">${s.category}</span></td>
                <td><strong style="cursor:pointer;" onclick="openStatementModal(${s.id})">${s.title}</strong></td>
                <td>${s.date}</td>
                <td><i class="fa-solid fa-file-pdf text-danger" title="PDF 첨부"></i></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="openStatementModal(${s.id})">
                        보기 / 공유
                    </button>
                </td>
            </tr>
        `).join('');
    }

    bindCategoryChips('statementsFilterBar', (cat) => renderStatements(cat, searchQuery));
}

// Render Citizen Proposals (With Upvote Engine)
function renderProposals() {
    const homeGrid = document.getElementById('homeProposalsGrid');
    const fullGrid = document.getElementById('fullProposalsGrid');

    const sorted = [...store.proposals].sort((a,b) => b.upvotes - a.upvotes);

    const cardHtml = (item) => `
        <div class="proposal-card ${item.upvotes > 35 ? 'popular' : ''}">
            <div>
                <div class="proposal-header">
                    <span class="badge-tag label-secondary">${item.category}</span>
                    ${item.upvotes > 35 ? '<span class="badge-tag label-accent"><i class="fa-solid fa-fire"></i> 🔥 시민 관심제안</span>' : ''}
                </div>
                <h3 class="proposal-title">${item.title}</h3>
                <p class="proposal-body">${item.content}</p>
            </div>
            <div class="proposal-footer">
                <span class="text-muted"><i class="fa-solid fa-user"></i> ${item.author} (${item.date})</span>
                <button class="btn-agree" onclick="upvoteProposal(${item.id})">
                    <i class="fa-solid fa-thumbs-up"></i> 공감 <strong id="upvote-count-${item.id}">${item.upvotes}</strong>
                </button>
            </div>
        </div>
    `;

    if (homeGrid) homeGrid.innerHTML = sorted.slice(0, 3).map(cardHtml).join('');
    if (fullGrid) fullGrid.innerHTML = sorted.map(cardHtml).join('');
}

function upvoteProposal(id) {
    const item = store.proposals.find(p => p.id === id);
    if (item) {
        item.upvotes += 1;
        saveStore(store);
        renderProposals();
        showToast('제안에 공감(Upvote)을 표하셨습니다!', 'success');
    }
}

// Render Calendar & Notices
function renderCalendarAndNotices() {
    const miniCal = document.getElementById('miniCalendarWidget');
    const fullCal = document.getElementById('fullCalendarWrap');
    const noticeHome = document.getElementById('homeNoticeList');
    const noticeFull = document.getElementById('noticeFullList');

    // Calendar Html Generator
    const calHtml = `
        <div class="calendar-mini-grid">
            <div class="cal-head text-danger">일</div>
            <div class="cal-head">월</div>
            <div class="cal-head">화</div>
            <div class="cal-head">수</div>
            <div class="cal-head">목</div>
            <div class="cal-head">금</div>
            <div class="cal-head text-primary">토</div>
            <!-- Blank days for Aug 2026 starting on Sat -->
            <div class="cal-day"></div><div class="cal-day"></div><div class="cal-day"></div><div class="cal-day"></div><div class="cal-day"></div><div class="cal-day"></div><div class="cal-day">1</div>
            <div class="cal-day text-danger">2</div><div class="cal-day">3</div><div class="cal-day">4</div><div class="cal-day">5</div><div class="cal-day">6</div><div class="cal-day">7</div><div class="cal-day text-primary">8</div>
            <div class="cal-day text-danger">9</div><div class="cal-day">10</div><div class="cal-day">11</div><div class="cal-day">12</div><div class="cal-day">13</div><div class="cal-day">14</div><div class="cal-day text-primary event-day" title="독립운동 사적지 답사">15</div>
            <div class="cal-day text-danger">16</div><div class="cal-day">17</div><div class="cal-day">18</div><div class="cal-day">19</div><div class="cal-day event-day" title="무안 갯벌 토론회">20</div><div class="cal-day">21</div><div class="cal-day text-primary">22</div>
            <div class="cal-day text-danger">23</div><div class="cal-day">24</div><div class="cal-day">25</div><div class="cal-day">26</div><div class="cal-day">27</div><div class="cal-day event-day" title="8월 정기 운영위">28</div><div class="cal-day text-primary">29</div>
            <div class="cal-day text-danger">30</div><div class="cal-day">31</div>
        </div>
    `;

    if (miniCal) miniCal.innerHTML = calHtml;
    if (fullCal) fullCal.innerHTML = calHtml;

    if (noticeHome) {
        noticeHome.innerHTML = store.notices.map(n => `
            <li>
                <span><i class="fa-solid fa-bullhorn text-primary"></i> ${n.title}</span>
                <span class="text-muted">${n.date}</span>
            </li>
        `).join('');
    }

    if (noticeFull) {
        noticeFull.innerHTML = store.notices.map(n => `
            <div class="content-card p-3 mb-2 flex-header">
                <div>
                    <span class="badge-tag label-primary">공지</span>
                    <strong class="ml-2">${n.title}</strong>
                </div>
                <span class="text-muted">${n.date}</span>
            </div>
        `).join('');
    }
}

// Render Partners Grid
function renderPartners() {
    const homeGrid = document.getElementById('homePartnerGrid');
    const fullGrid = document.getElementById('fullPartnerGrid');

    const cardHtml = (p) => `
        <div class="partner-card">
            <div class="partner-logo-icon">
                <i class="fa-solid ${p.icon}"></i>
            </div>
            <h3 class="partner-name">${p.name}</h3>
            <p class="partner-desc">${p.desc}</p>
        </div>
    `;

    if (homeGrid) homeGrid.innerHTML = store.partners.map(cardHtml).join('');
    if (fullGrid) fullGrid.innerHTML = store.partners.map(cardHtml).join('');
}

// Render Public Reports List
function renderPublicReports() {
    const feed = document.getElementById('publicReportFeed');
    if (!feed) return;

    feed.innerHTML = store.reports.map(r => `
        <div class="content-card p-3 mb-3 border">
            <div class="flex-header mb-1">
                <span class="badge-tag label-primary">${r.category}</span>
                <span class="badge-tag label-secondary">${r.status}</span>
            </div>
            <h4 class="font-weight-bold mb-1">${r.title}</h4>
            <p class="text-muted text-sm mb-2">${r.content}</p>
            <div class="text-xs text-muted flex-header">
                <span>제보자: ${r.name}</span>
                <span>${r.date}</span>
            </div>
        </div>
    `).join('');
}

// --- FORMS & USER INTERACTION ---
function initForms() {
    // Quick Sign Form (Home)
    const formQuick = document.getElementById('formHomeQuickSign');
    if (formQuick) {
        formQuick.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('quickSignName').value;
            const region = document.getElementById('quickSignRegion').value;
            const contact = document.getElementById('quickSignContact').value;
            
            submitSignature(name, region, contact, "온라인 서명 참여");
            formQuick.reset();
        });
    }

    // Full Sign Form (Participate Page)
    const formFull = document.getElementById('formFullSign');
    if (formFull) {
        formFull.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullSignName').value;
            const region = document.getElementById('fullSignRegion').value;
            const contact = document.getElementById('fullSignContact').value;
            const comment = document.getElementById('fullSignComment').value;

            submitSignature(name, region, contact, comment);
            formFull.reset();
        });
    }

    // Citizen Report Form
    const formReport = document.getElementById('formCitizenReport');
    if (formReport) {
        formReport.addEventListener('submit', (e) => {
            e.preventDefault();
            const cat = document.getElementById('reportCategory').value;
            const title = document.getElementById('reportTitle').value;
            const content = document.getElementById('reportContent').value;
            const loc = document.getElementById('reportLocation').value;
            const name = document.getElementById('reportName').value || '익명제보자';
            const isAnon = document.getElementById('reportIsAnonymous').checked;

            const newReport = {
                id: Date.now(),
                category: cat,
                title: title,
                content: content + (loc ? ` (위치: ${loc})` : ''),
                name: isAnon ? '익명제보자' : name,
                date: new Date().toISOString().split('T')[0],
                status: '접수 및 검토중',
                public: true
            };

            store.reports.unshift(newReport);
            saveStore(store);
            renderPublicReports();
            renderAdminView();
            showToast('시민제보가 성공적으로 접수되었습니다. 관리자 검토 후 조치됩니다.', 'success');
            formReport.reset();
        });
    }

    // New Proposal Modal Form
    const formProp = document.getElementById('formNewProposal');
    if (formProp) {
        formProp.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('propTitle').value;
            const cat = document.getElementById('propCategory').value;
            const content = document.getElementById('propContent').value;
            const author = document.getElementById('propAuthor').value;

            const newProp = {
                id: Date.now(),
                title: title,
                category: cat,
                content: content,
                author: author,
                date: new Date().toISOString().split('T')[0],
                upvotes: 1
            };

            store.proposals.unshift(newProp);
            saveStore(store);
            renderProposals();
            renderHomeStats();
            closeModal('modalProposal');
            showToast('시민 정책제안이 게시되었습니다!', 'success');
            formProp.reset();
        });
    }

    // Join Alliance Modal Form
    const formJoin = document.getElementById('formJoinApp');
    if (formJoin) {
        formJoin.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal('modalJoin');
            showToast('시민연대 가입신청이 제출되었습니다. 담당자가 곧 연락드리겠습니다!', 'success');
            formJoin.reset();
        });
    }

    // Admin Login Form
    const formAdminLogin = document.getElementById('formAdminLogin');
    if (formAdminLogin) {
        formAdminLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('adminLoginId').value.trim();
            const pw = document.getElementById('adminLoginPw').value.trim();

            if (id === 'admin' && (pw === 'muan2026' || pw === '1234')) {
                store.isAdminLoggedIn = true;
                saveStore(store);
                closeModal('modalAdminLogin');
                updateAdminHeaderUI();
                switchTab('admin');
                showToast('관리자 인증 성공! 대시보드에 로그인되었습니다.', 'success');
                formAdminLogin.reset();
            } else {
                showToast('아이디 또는 비밀번호가 올바르지 않습니다. (초기계정: admin / muan2026)', 'danger');
            }
        });
    }

    // Search Statement Listener
    const btnSearchState = document.getElementById('btnSearchStatement');
    const inputSearchState = document.getElementById('statementSearchInput');
    if (btnSearchState && inputSearchState) {
        btnSearchState.addEventListener('click', () => {
            renderStatements('all', inputSearchState.value);
        });
        inputSearchState.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') renderStatements('all', inputSearchState.value);
        });
    }
}

function submitSignature(name, region, contact, comment) {
    store.petitions.count += 1;
    const maskedName = name.length > 2 ? name[0] + '*' + name[name.length - 1] : name[0] + '*';
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    store.petitions.signers.unshift({
        name: maskedName,
        region: region,
        date: dateStr,
        comment: comment
    });

    saveStore(store);
    renderPetitionData();
    renderHomeStats();
    showToast(`감사합니다, ${name}님! 서명이 성공적으로 등록되었습니다.`, 'success');
}

// --- MODAL HANDLERS ---
function openIssueModal(id) {
    const issue = store.issues.find(i => i.id === id);
    if (!issue) return;

    document.getElementById('modalIssueCat').innerText = issue.category;
    document.getElementById('modalIssueTitle').innerText = issue.title;
    document.getElementById('modalIssueOverviewContent').innerText = issue.overview || issue.summary;
    document.getElementById('modalIssueStatusContent').innerText = issue.currentStatus || "진행 상황 검토중입니다.";
    document.getElementById('modalIssuePositionContent').innerText = issue.position || issue.summary;
    document.getElementById('modalIssueCommentCount').innerText = issue.comments ? issue.comments.length : 0;

    // Render Comments
    const commentsList = document.getElementById('modalIssueCommentsList');
    if (commentsList) {
        commentsList.innerHTML = (issue.comments && issue.comments.length > 0)
            ? issue.comments.map(c => `
                <div class="content-card p-2 mb-2 bg-light">
                    <strong>${c.author}</strong>: ${c.text} <span class="text-muted text-xs">(${c.date})</span>
                </div>
            `).join('')
            : '<p class="text-muted">등록된 시민 의견이 없습니다. 첫 의견을 남겨보세요!</p>';
    }

    // Modal Inner Tab Switching
    document.querySelectorAll('.id-tab-btn').forEach(btn => {
        btn.onclick = () => {
            const itab = btn.getAttribute('data-itab');
            document.querySelectorAll('.id-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.itab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(`itab-${itab}`);
            if (target) target.classList.add('active');
        };
    });

    // Form add comment
    const formComm = document.getElementById('formAddIssueComment');
    if (formComm) {
        formComm.onsubmit = (e) => {
            e.preventDefault();
            const text = document.getElementById('inputIssueComment').value;
            if (!issue.comments) issue.comments = [];
            issue.comments.push({
                author: "무안군민",
                text: text,
                date: new Date().toISOString().split('T')[0]
            });
            saveStore(store);
            openIssueModal(id);
            formComm.reset();
            showToast('의견이 등록되었습니다.', 'info');
        };
    }

    openModal('modalIssueDetail');
}

function openStatementModal(id) {
    const item = store.statements.find(s => s.id === id);
    if (!item) return;

    document.getElementById('modalStateCat').innerText = item.category;
    document.getElementById('modalStateTitle').innerText = item.title;
    document.getElementById('modalStateDate').innerText = item.date;
    document.getElementById('modalStateContent').innerHTML = item.content;

    openModal('modalStatementDetail');
}

function openProposalModal() { openModal('modalProposal'); }
function openJoinModal() { openModal('modalJoin'); }
function openVolunteerModal() { openModal('modalJoin'); }
function scrollToPetition() {
    switchTab('participate');
    const sec = document.getElementById('fullPetitionSection');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('open');
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('open');
}

function downloadStatementPdf() {
    showToast('성명서 PDF 파일 다운로드를 시뮬레이션합니다.', 'info');
}

function shareSns(type) {
    if (type === 'copy') {
        navigator.clipboard.writeText(window.location.href);
        showToast('홈페이지 주소가 클립보드에 복사되었습니다.', 'success');
    } else {
        showToast(`${type.toUpperCase()} 공유창으로 연결됩니다.`, 'info');
    }
}

// --- AI CIVIC ASSISTANT CHATBOT ENGINE ---
function initAiAssistant() {
    const trigger = document.getElementById('aiTriggerBtn');
    const closeBtn = document.getElementById('aiCloseBtn');
    const form = document.getElementById('formAiChat');

    if (trigger) trigger.addEventListener('click', toggleAiDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeAiDrawer);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('aiUserInput');
            const question = input.value.trim();
            if (question) {
                processAiQuestion(question);
                input.value = '';
            }
        });
    }
}

function openAiDrawer() {
    document.getElementById('aiChatDrawer').classList.add('open');
}

function closeAiDrawer() {
    document.getElementById('aiChatDrawer').classList.remove('open');
}

function toggleAiDrawer() {
    document.getElementById('aiChatDrawer').classList.toggle('open');
}

function askAiPreset(question) {
    openAiDrawer();
    processAiQuestion(question);
}

function processAiQuestion(question) {
    const messages = document.getElementById('aiChatMessages');

    // Add User Bubble
    const userMsgHtml = `
        <div class="chat-bubble user">
            <div class="chat-text">${question}</div>
        </div>
    `;
    messages.insertAdjacentHTML('beforeend', userMsgHtml);
    messages.scrollTop = messages.scrollHeight;

    // Simulate AI Response Generation
    setTimeout(() => {
        const answer = generateAiAnswer(question);
        const aiMsgHtml = `
            <div class="chat-bubble ai">
                <div class="chat-text">${answer}</div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', aiMsgHtml);
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}

function generateAiAnswer(q) {
    const lower = q.toLowerCase();
    
    if (lower.includes('현안') || lower.includes('이슈') || lower.includes('무안')) {
        return `현재 무안군에서 주요하게 다루는 핵심 현안은 다음과 같습니다.<br><br>
        1. <strong>무안 생태갯벌 및 청정해양 환경보전대책</strong> (환경)<br>
        2. <strong>삼향·일로·오룡지구 대중교통 배차간격 단축</strong> (교통)<br>
        3. <strong>양파·마늘 농가 수확기 최저생산비 조례 제정</strong> (농업)<br>
        4. <strong>주민참여예산제 투명성 강화</strong> (주민자치)<br><br>
        상단 메뉴의 <strong>[무안의 현안]</strong> 게시판에서 시민연대의 공식 입장과 상세 내역을 확인하실 수 있습니다.`;
    }
    
    if (lower.includes('가입') || lower.includes('참여') || lower.includes('후원')) {
        return `무안 자치주권 시민연대는 무안군민 누구나 참여하실 수 있습니다!<br><br>
        • <strong>정회원:</strong> 연대 주요 활동 의결 및 분과위원회 참여<br>
        • <strong>후원회원:</strong> 시민연대 재정 자립 후원<br>
        • <strong>자원봉사:</strong> 캠페인 및 환경 현장 봉사<br><br>
        메뉴의 <strong>[시민참여]</strong> 페이지에서 간편하게 가입신청을 제출해주시면 담당자가 안내해드립니다.`;
    }

    if (lower.includes('성명서') || lower.includes('보도자료') || lower.includes('요약')) {
        return `최근 시민연대 주요 성명서 내용입니다:<br><br>
        📰 <strong>[성명서] 무안군 주민자치회 권한 대폭 강화 및 예산 자율성 촉구 (2026-08-10)</strong><br>
        주민자치회의 민주적 위원 선출, 주민참여예산 자율 집행권 확대 및 군정 현안 주민투표 활성화를 강력히 요구하였습니다.`;
    }

    if (lower.includes('제보') || lower.includes('익명') || lower.includes('신고')) {
        return `🛡️ <strong>시민제보 안내:</strong><br>
        행정 낭비, 환경오염, 교통 위험 등 무안의 문제를 제보해주시면 시민연대 집행부가 현장을 확인하고 조치합니다.<br><br>
        • <strong>익명 보장:</strong> 제보자 개인정보는 철저히 비공개됩니다.<br>
        • <strong>접수 방법:</strong> 상단 <strong>[시민제보]</strong> 메뉴에서 작성 제출 가능합니다.`;
    }

    return `질문해주신 <strong>"${q}"</strong>에 관한 내용입니다.<br><br>무안 자치주권 시민연대는 무안군민의 주권 확립과 자치 발전을 위해 언제나 열려있습니다. 추가 문의사항은 사무국(061-450-0000)으로 연락주시면 친절히 안내해드리겠습니다.`;
}

// --- ADMIN DASHBOARD OPERATIONS ---
function initAdminPanel() {
    renderAdminView();

    // Form Add Issue
    const formIssue = document.getElementById('formAdminAddIssue');
    if (formIssue) {
        formIssue.onsubmit = (e) => {
            e.preventDefault();
            const title = document.getElementById('adminIssueTitle').value;
            const cat = document.getElementById('adminIssueCat').value;
            const summary = document.getElementById('adminIssueSummary').value;
            const pos = document.getElementById('adminIssuePosition').value;

            store.issues.unshift({
                id: Date.now(),
                title: title,
                category: cat,
                summary: summary,
                status: '시민의견 수렴중',
                date: new Date().toISOString().split('T')[0],
                overview: summary,
                currentStatus: '관리자에 의해 게시된 신규 현안입니다.',
                position: pos,
                comments: []
            });

            saveStore(store);
            renderAllViews();
            renderAdminView();
            showToast('신규 무안 현안이 등록되었습니다.', 'success');
            formIssue.reset();
        };
    }

    // Form Add Statement
    const formState = document.getElementById('formAdminAddStatement');
    if (formState) {
        formState.onsubmit = (e) => {
            e.preventDefault();
            const cat = document.getElementById('adminStateCat').value;
            const title = document.getElementById('adminStateTitle').value;
            const content = document.getElementById('adminStateContent').value;

            store.statements.unshift({
                id: Date.now(),
                category: cat,
                title: title,
                date: new Date().toISOString().split('T')[0],
                views: 1,
                content: `<p>${content}</p>`
            });

            saveStore(store);
            renderStatements();
            renderAdminView();
            showToast('신규 성명서/논평이 게시되었습니다.', 'success');
            formState.reset();
        };
    }

    // Form Petition Settings
    const formPet = document.getElementById('formAdminPetition');
    if (formPet) {
        document.getElementById('adminPetTitle').value = store.petitions.title;
        document.getElementById('adminPetGoal').value = store.petitions.goal;
        document.getElementById('adminPetCount').value = store.petitions.count;
        document.getElementById('adminPetDesc').value = store.petitions.desc;

        formPet.onsubmit = (e) => {
            e.preventDefault();
            store.petitions.title = document.getElementById('adminPetTitle').value;
            store.petitions.goal = parseInt(document.getElementById('adminPetGoal').value);
            store.petitions.count = parseInt(document.getElementById('adminPetCount').value);
            store.petitions.desc = document.getElementById('adminPetDesc').value;

            saveStore(store);
            renderPetitionData();
            showToast('서명운동 설정이 업데이트되었습니다.', 'success');
        };
    }

    // Form Add Event
    const formEvt = document.getElementById('formAdminAddEvent');
    if (formEvt) {
        formEvt.onsubmit = (e) => {
            e.preventDefault();
            const date = document.getElementById('adminEventDate').value;
            const title = document.getElementById('adminEventTitle').value;
            const loc = document.getElementById('adminEventLocation').value;

            store.events.unshift({ date: date, title: title, location: loc });
            saveStore(store);
            renderCalendarAndNotices();
            showToast('행사 일정이 추가되었습니다.', 'success');
            formEvt.reset();
        };
    }
}

function renderAdminView() {
    document.getElementById('adminStatReports').innerText = `${store.reports.length}건`;
    document.getElementById('adminStatSigns').innerText = `${store.petitions.count.toLocaleString()}명`;
    document.getElementById('adminStatIssues').innerText = `${store.issues.length}건`;
    document.getElementById('adminStatStatements').innerText = `${store.statements.length}건`;

    // 1. Citizen Reports Table
    const reportsTbody = document.getElementById('adminReportsTbody');
    if (reportsTbody) {
        reportsTbody.innerHTML = store.reports.map(r => `
            <tr>
                <td><span class="badge-tag label-primary">${r.category}</span></td>
                <td><strong>${r.title}</strong></td>
                <td>${r.name}</td>
                <td>${r.date}</td>
                <td><span class="badge-tag label-secondary">${r.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="approveReport(${r.id})">승인/완료</button>
                    <button class="btn btn-link text-danger btn-sm" onclick="deleteReport(${r.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }

    // 2. Local Issues Table
    const issuesTbody = document.getElementById('adminIssuesTbody');
    if (issuesTbody) {
        issuesTbody.innerHTML = store.issues.map(item => `
            <tr>
                <td><span class="badge-tag label-primary">${item.category}</span></td>
                <td><strong style="cursor:pointer;" onclick="openIssueModal(${item.id})">${item.title}</strong></td>
                <td>${item.date}</td>
                <td><span class="badge-tag label-secondary">${item.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="openIssueModal(${item.id})">상세보기</button>
                    <button class="btn btn-link text-danger btn-sm" onclick="deleteIssue(${item.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }

    // 3. Statements Table
    const statementsTbody = document.getElementById('adminStatementsTbody');
    if (statementsTbody) {
        statementsTbody.innerHTML = store.statements.map(s => `
            <tr>
                <td><span class="badge-tag label-dark">${s.category}</span></td>
                <td><strong style="cursor:pointer;" onclick="openStatementModal(${s.id})">${s.title}</strong></td>
                <td>${s.date}</td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="openStatementModal(${s.id})">보기</button>
                    <button class="btn btn-link text-danger btn-sm" onclick="deleteStatement(${s.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    // 4. Members Roster Table
    renderAdminMembers();
}

function renderAdminMembers(searchQuery = '') {
    const tbody = document.getElementById('adminMembersTbody');
    if (!tbody) return;

    if (!store.members) store.members = defaultData.members;

    let list = store.members;
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(m => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.region.toLowerCase().includes(q));
    }

    tbody.innerHTML = list.map(m => {
        let roleTag = '';
        let actionBtn = '';

        if (m.role === 'super_admin') {
            roleTag = '<span class="badge-tag label-accent"><i class="fa-solid fa-crown"></i> 최초 최고관리자</span>';
            actionBtn = '<span class="text-muted text-xs"><i class="fa-solid fa-lock"></i> 최초 관리자 (권한 고정)</span>';
        } else if (m.role === 'operator') {
            roleTag = '<span class="badge-tag label-primary"><i class="fa-solid fa-shield-halved"></i> 공동 운영자</span>';
            actionBtn = `<button class="btn btn-outline btn-sm text-danger" onclick="toggleOperatorRole('${m.id}')"><i class="fa-solid fa-user-minus"></i> 운영자 권한 해제</button>`;
        } else {
            roleTag = `<span class="badge-tag label-dark"><i class="fa-solid fa-user"></i> ${m.type}</span>`;
            actionBtn = `<button class="btn btn-outline btn-sm text-success" onclick="toggleOperatorRole('${m.id}')"><i class="fa-solid fa-user-gear"></i> 운영자 권한 지정 👑</button>`;
        }

        return `
            <tr>
                <td><strong>${m.id}</strong></td>
                <td>${m.name}</td>
                <td>${m.region}</td>
                <td><small>${m.contact}<br>${m.email}</small></td>
                <td><span class="badge-tag label-secondary">${m.type}</span></td>
                <td>${m.date}</td>
                <td>${roleTag}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
    }).join('');

    const input = document.getElementById('adminMemberSearchInput');
    if (input) {
        input.onkeyup = (e) => renderAdminMembers(e.target.value);
    }
}

function toggleOperatorRole(memberId) {
    if (!store.members) store.members = defaultData.members;
    const member = store.members.find(m => m.id === memberId);
    if (!member) return;

    if (member.role === 'super_admin') {
        showToast('최초 최고 관리자의 권한은 변경할 수 없습니다.', 'warning');
        return;
    }

    if (member.role === 'operator') {
        member.role = 'member';
        saveStore(store);
        renderAdminView();
        updateAdminHeaderUI();
        showToast(`${member.name} 님의 운영자 권한이 해제되었습니다.`, 'info');
    } else {
        member.role = 'operator';
        saveStore(store);
        renderAdminView();
        updateAdminHeaderUI();
        showToast(`🎉 ${member.name} 님이 공동 운영자로 지정되었습니다! 관리자로 함께 관리할 수 있습니다.`, 'success');
    }
}

function approveReport(id) {
    const item = store.reports.find(r => r.id === id);
    if (item) {
        item.status = '조치 및 완료';
        saveStore(store);
        renderPublicReports();
        renderAdminView();
        showToast('제보 건이 승인 완료 처리되었습니다.', 'success');
    }
}

function deleteReport(id) {
    store.reports = store.reports.filter(r => r.id !== id);
    saveStore(store);
    renderPublicReports();
    renderAdminView();
    showToast('제보 건이 삭제되었습니다.', 'info');
}

function deleteIssue(id) {
    if (confirm('해당 현안 게시물을 삭제하시겠습니까?')) {
        store.issues = store.issues.filter(i => i.id !== id);
        saveStore(store);
        renderIssues();
        renderHomeStats();
        renderAdminView();
        showToast('현안 게시물이 삭제되었습니다.', 'info');
    }
}

function deleteStatement(id) {
    if (confirm('해당 성명서/논평 게시물을 삭제하시겠습니까?')) {
        store.statements = store.statements.filter(s => s.id !== id);
        saveStore(store);
        renderStatements();
        renderAdminView();
        showToast('성명서 게시물이 삭제되었습니다.', 'info');
    }
}

// --- UTILITY TOAST NOTIFICATION ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Global Modal Privacy Alert
function openPrivacyModal() {
    alert("개인정보 처리방침 안내:\n무안 자치주권 시민연대는 시민제보 및 서명 참여 시 수집되는 개인정보를 관계 법령에 따라 철저히 보호하며 목적으로 지정된 범위 외에는 절대 사용하거나 제3자에게 제공하지 않습니다.");
}
