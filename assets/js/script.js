window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('nav-open', navMenu.classList.contains('active'));
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            navMenu?.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
});

function bindLeadForm(form, submitBtn) {
    if (!form || !submitBtn) return;
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        const customSelect = form.querySelector('.custom-select');
        const hiddenInput = customSelect ? customSelect.querySelector('input[type="hidden"]') : null;
        const selectedValue = hiddenInput ? hiddenInput.value : '';

        if (!nameInput.value.trim()) {
            shakeElement(nameInput);
            return;
        }
        if (!phoneInput.value.trim()) {
            shakeElement(phoneInput);
            return;
        }
        if (!selectedValue) {
            shakeElement(customSelect.querySelector('.custom-select-trigger'));
            return;
        }

        showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        form.reset();
        customSelect.classList.remove('has-value');
        customSelect.querySelector('.selected-text').textContent = 'Что вас интересует';
    });
}

bindLeadForm(document.querySelector('.contact-form'), document.querySelector('.contact-submit-btn'));
bindLeadForm(document.querySelector('.services-form'), document.querySelector('.services-submit-btn'));

function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    el.style.borderColor = '#e74c3c';
    setTimeout(() => { el.style.borderColor = ''; }, 1500);
}

function showNotification(text) {
    const existing = document.querySelector('.form-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'form-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2A9D8F;
        color: white;
        padding: 18px 28px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
        animation: slideInRight 0.4s ease;
        max-width: 350px;
    `;
    notification.textContent = text;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

const injectedStyles = document.createElement('style');
injectedStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }

    .animate-in {
        animation: fastFadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }

    @keyframes fastFadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .hero-text {
        animation: fastFadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        opacity: 0;
    }

    .hero-image {
        animation: fastFadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        opacity: 0;
    }

    .floating-card {
        animation: fastFadeInUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.45s forwards;
        opacity: 0;
    }
`;
document.head.appendChild(injectedStyles);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

const animatedElements = document.querySelectorAll(
    '.product-card, .advantage-card, .gallery-item-large, .gallery-item-small, ' +
    '.feature-item, .stat-item, .about-image, .about-content, ' +
    '.section-header, .contact-info, .contact-form, .partner-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

document.querySelectorAll('.gallery-item-large-visual, .gallery-item-small').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 10);

        lightbox.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.9)';
            setTimeout(() => lightbox.remove(), 300);
        });
    });
});

const animateCounter = (element, target, duration = 1500, suffix = '') => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const raw = stat.textContent.trim();
                const suffix = raw.includes('+') ? '+' : '';
                const target = parseInt(raw, 10);
                stat.textContent = suffix ? '0' + suffix : '0';
                animateCounter(stat, target, 1500, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 100}ms`;
    timelineObserver.observe(step);
});

// Custom Select
document.querySelectorAll('.custom-select').forEach(customSelect => {
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const options = customSelect.querySelector('.custom-select-options');
    const selectedText = customSelect.querySelector('.selected-text');
    const hiddenInput = customSelect.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = customSelect.classList.contains('open');

        document.querySelectorAll('.custom-select.open').forEach(s => {
            if (s !== customSelect) s.classList.remove('open');
        });

        customSelect.classList.toggle('open', !isOpen);
    });

    customSelect.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.textContent;

            customSelect.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            selectedText.textContent = text;
            hiddenInput.value = value;

            if (value) {
                customSelect.classList.add('has-value');
            } else {
                customSelect.classList.remove('has-value');
            }

            customSelect.classList.remove('open');
        });
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
});

const revealOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealOnScrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.service-block, .team-member, .team-leader, .team-card, .project-showcase-card'
).forEach(el => {
    revealOnScrollObserver.observe(el);
});

