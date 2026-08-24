/* ================================================
   داده‌های مهارت‌ها
   ================================================ */
const skillsData = [
    {
        name: 'HTML',
        nameEn: 'HTML',
        percent: 100,
        color: 'var(--purple)',
        desc: 'ساختاردهی صفحات وب',
        descEn: 'Web page structuring'
    },
    {
        name: 'CSS',
        nameEn: 'CSS',
        percent: 100,
        color: 'var(--cyan)',
        desc: 'استایل‌دهی و انیمیشن',
        descEn: 'Styling & animation'
    },
    {
        name: 'JavaScript',
        nameEn: 'JavaScript',
        percent: 90,
        color: 'var(--pink)',
        desc: 'تعامل‌پذیری و منطق',
        descEn: 'Interactivity & logic'
    },
    {
        name: 'Responsive',
        nameEn: 'Responsive',
        percent: 100,
        color: 'var(--purple)',
        desc: 'طراحی واکنش‌گرا',
        descEn: 'Responsive design'
    },
    {
        name: 'SEO',
        nameEn: 'SEO',
        percent: 80,
        color: 'var(--cyan)',
        desc: 'بهینه‌سازی موتور جستجو',
        descEn: 'Search engine optimization'
    },
    {
        name: 'React.js',
        nameEn: 'React.js',
        percent: 85,
        color: 'var(--pink)',
        desc: 'ساخت رابط کاربری',
        descEn: 'Building user interfaces'
    }
];

/* ================================================
   تشخیص دستگاه تاچی
   ================================================ */
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

/* ================================================
   ساخت کارت‌های مهارت به صورت داینامیک
   ================================================ */
function buildSkillCards() {
    const grid = document.getElementById('skillsGrid');
    const w = window.innerWidth;
    let r, size, center;

    if (w <= 360) {
        r = 28; size = 70; center = 35;
    } else if (w <= 480) {
        r = 34; size = 80; center = 40;
    } else {
        r = 50; size = 110; center = 55;
    }

    const circ = 2 * Math.PI * r;

    grid.innerHTML = skillsData.map((s, i) => `
        <div class="skill-card" style="transition-delay: ${i * 0.1}s">
            <div class="skill-ring-wrap">
                <svg class="skill-ring" viewBox="0 0 ${size} ${size}">
                    <circle class="skill-ring-bg" cx="${center}" cy="${center}" r="${r}"/>
                    <circle class="skill-ring-fill" cx="${center}" cy="${center}" r="${r}"
                        stroke="${s.color}" data-percent="${s.percent}"
                        style="stroke-dasharray:${circ}; stroke-dashoffset:${circ}"/>
                </svg>
                <span class="skill-percent">${s.percent}%</span>
            </div>
            <h3 class="skill-name tech-font" data-lang-fa="${s.name}" data-lang-en="${s.nameEn}">${s.name}</h3>
            <p class="skill-desc" data-lang-fa="${s.desc}" data-lang-en="${s.descEn}">${s.desc}</p>
        </div>
    `).join('');
}

/* ساخت اولیه */
buildSkillCards();

/* بازسازی هنگام تغییر اندازه با debounce */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildSkillCards, 250);
});

/* ================================================
   تغییر تم (Dark / Light)
   ================================================ */
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;
let currentTheme = 'dark';

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    themeBtn.innerHTML = currentTheme === 'dark'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
});

/* ================================================
   تغییر زبان (فارسی / انگلیسی)
   ================================================ */
const langBtn = document.getElementById('langToggle');
let currentLang = 'fa';

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    langBtn.textContent = currentLang === 'fa' ? 'EN' : 'فا';

    /* تغییر جهت و زبان سند */
    if (currentLang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-fa');
    } else {
        html.setAttribute('lang', 'fa');
        html.setAttribute('dir', 'rtl');
        document.body.classList.add('lang-fa');
        document.body.classList.remove('lang-en');
    }

    /* بروزرسانی متن تمام عناصر دو زبانه */
    document.querySelectorAll('[data-lang-fa]').forEach(el => {
        const text = el.getAttribute(`data-lang-${currentLang}`);
        if (text) el.textContent = text;
    });

    /* بروزرسانی placeholder‌های فرم */
    document.querySelectorAll('[data-lang-fa-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute(`data-lang-${currentLang}-placeholder`);
    });
});

/* ================================================
   منوی موبایل
   ================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mobileOverlay.addEventListener('click', closeMenu);

/* بستن منو با کلیک روی هر لینک */
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
});

/* بستن منو با کلید Escape */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
    }
});

/* ================================================
   اسکرول اسپای — هایلایت لینک فعال ناوبری
   ================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#desktopNav a, .mobile-menu a');

function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ================================================
   اسکرول رویال — نمایش تدریجی عناصر
   ================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            /* اگر بخش مهارت‌ها بود، انیمیشن حلقه‌ها را اجرا کن */
            if (entry.target.id === 'skillsGrid') {
                animateSkillRings();
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ================================================
   انیمیشن حلقه‌های پیشرفت مهارت
   ================================================ */
let skillsAnimated = false;

function animateSkillRings() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    document.querySelectorAll('.skill-ring-fill').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const style = getComputedStyle(circle);
        const dashArray = parseFloat(style.strokeDasharray);
        const offset = dashArray * (1 - percent / 100);

        /* یک فریم تاخیر برای اجرای صحیح ترنزیشن CSS */
        requestAnimationFrame(() => {
            circle.style.strokeDashoffset = offset;
        });
    });
}

/* بازست انیمیشن مهارت‌ها هنگام تغییر اندازه (اگر از دید خارج شده باشد) */
const skillsGrid = document.getElementById('skillsGrid');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            skillsAnimated = false;
            document.querySelectorAll('.skill-ring-fill').forEach(circle => {
                const style = getComputedStyle(circle);
                const dashArray = parseFloat(style.strokeDasharray);
                circle.style.transition = 'none';
                circle.style.strokeDashoffset = dashArray;
                requestAnimationFrame(() => {
                    circle.style.transition = '';
                });
            });
        }
    });
}, { threshold: 0 });

if (skillsGrid) skillsObserver.observe(skillsGrid);

/* ================================================
   افکت سه‌بعدی کارت هیرو با حرکت ماوس
   (غیرفعال روی دستگاه‌های تاچی)
   ================================================ */
const heroCard = document.getElementById('heroCard');

if (heroCard && !isTouchDevice) {
    heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = ((centerY - y) / centerY) * 12;

        heroCard.style.transform =
            `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    });
}

/* ================================================
   پارالکس سبک روی ارب‌های پس‌زمینه
   (غیرفعال روی دستگاه‌های تاچی برای عملکرد بهتر)
   ================================================ */
if (!isTouchDevice) {
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.03;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

/* ================================================
   ارسال فرم تماس (بدون سرور — نمایش توست)
   ================================================ */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = currentLang === 'fa'
        ? 'پیام شما با موفقیت ارسال شد!'
        : 'Your message was sent successfully!';
    showToast(message);
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ================================================
   اجرای اولیه
   ================================================ */
updateActiveNav();