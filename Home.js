// Smooth scrolling for internal links only
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetHref = this.getAttribute('href');
        if (targetHref.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetHref);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', '라이트 모드로 전환');
    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', '다크 모드로 전환');
    }
}

function initTheme() {
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme');
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
    });
}

// Optional: Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});