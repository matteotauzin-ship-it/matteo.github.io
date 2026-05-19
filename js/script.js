// ========================================
// NAVIGATION MOBILE
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================================
// SCROLL EFFECTS
// ========================================

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.8)';
    }
});

// ========================================
// INTERSECTION OBSERVER ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer pour les cartes de compétences
const competenceCards = document.querySelectorAll('.competence-card');
competenceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observer pour les statistiques
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observer pour déclencher les animations de compteur
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const number = entry.target.querySelector('.stat-number');
            const target = parseInt(number.textContent);
            animateCounter(number, target);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statsObserver.observe(card);
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// CURSOR CUSTOM (optionnel - effet avancé)
// ========================================

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

// Style pour le curseur custom
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(74, 123, 199, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.3s ease;
        transform: translate(-50%, -50%);
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--accent-bright);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor.hover {
        width: 60px;
        height: 60px;
        background: rgba(74, 123, 199, 0.1);
    }
`;
document.head.appendChild(style);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Effet hover sur les liens et boutons
const interactiveElements = document.querySelectorAll('a, button, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c Portfolio BTS SIO ', 'background: linear-gradient(135deg, #2d4a7c 0%, #4a7bc7 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Développé avec passion 💙 ', 'color: #4a7bc7; font-size: 14px;');