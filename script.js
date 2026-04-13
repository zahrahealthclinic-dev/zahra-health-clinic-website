// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const loadingScreen = document.getElementById('loadingScreen');
const backToTopBtn = document.getElementById('backToTop');
const serviceModal = document.getElementById('serviceModal');
const serviceModalBackdrop = document.getElementById('serviceModalBackdrop');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalSubtitle = document.getElementById('serviceModalSubtitle');
const serviceModalDescription = document.getElementById('serviceModalDescription');
const serviceModalIdealFor = document.getElementById('serviceModalIdealFor');
const serviceModalDuration = document.getElementById('serviceModalDuration');
const serviceModalDowntime = document.getElementById('serviceModalDowntime');
const serviceModalIcon = document.getElementById('serviceModalIcon');

const serviceDetailsData = {
    'dermal-fillers': {
        title: 'Dermal Fillers',
        subtitle: 'Facial Volume Restoration',
        icon: 'fa-droplet',
        description: 'Premium dermal filler treatment to restore volume, smooth folds, and refine facial contours while keeping results natural.',
        idealFor: 'Volume loss, smile lines, lip contouring',
        duration: '30-45 minutes',
        downtime: 'Minimal, same-day routine for most patients'
    },
    botox: {
        title: 'Botox',
        subtitle: 'Wrinkle Softening Therapy',
        icon: 'fa-face-smile',
        description: 'Targeted anti-wrinkle injections to soften dynamic lines and support a fresher, more rested appearance.',
        idealFor: 'Forehead lines, crow’s feet, frown lines',
        duration: '20-30 minutes',
        downtime: 'No major downtime'
    },
    'thread-lifts': {
        title: 'Thread Lifts',
        subtitle: 'Non-Surgical Facial Lift',
        icon: 'fa-scissors',
        description: 'Lift and tighten mild to moderate skin laxity using absorbable threads designed for contour support.',
        idealFor: 'Jawline definition, sagging cheeks, lift effect',
        duration: '45-60 minutes',
        downtime: '2-5 days mild swelling can occur'
    },
    hydrafacial: {
        title: 'HydraFacial',
        subtitle: 'Deep Cleanse + Hydration',
        icon: 'fa-water',
        description: 'A multi-step treatment that deeply cleanses, exfoliates, and hydrates skin for instant glow.',
        idealFor: 'Dull skin, clogged pores, dehydration',
        duration: '35-50 minutes',
        downtime: 'No downtime'
    },
    'chemical-peels': {
        title: 'Chemical Peels',
        subtitle: 'Skin Texture and Tone Renewal',
        icon: 'fa-flask',
        description: 'Medical peels that help brighten skin, improve pigmentation, and reduce acne marks.',
        idealFor: 'Pigmentation, acne marks, uneven tone',
        duration: '20-40 minutes',
        downtime: 'Light peeling for a few days'
    },
    'rf-microneedling': {
        title: 'PRP Face & Scalp',
        subtitle: 'Regenerative Platelet Therapy',
        icon: 'fa-vial',
        description: 'Platelet-rich plasma treatment designed to support skin rejuvenation, improve texture, and boost scalp health for stronger-looking hair.',
        idealFor: 'Dull skin, early hair thinning, scalp nourishment',
        duration: '35-55 minutes',
        downtime: 'Minimal, mild redness for a few hours'
    },
    glutathione: {
        title: 'Skin Booster / PDRN / Biostimulator / Profhilo',
        subtitle: 'Advanced Injectable Skin Rejuvenation',
        icon: 'fa-syringe',
        description: 'Premium skin-boosting injectables for hydration, elasticity, collagen support, and naturally refreshed skin quality.',
        idealFor: 'Fine lines, dehydration, texture concerns, skin laxity',
        duration: '25-40 minutes',
        downtime: 'Minimal, occasional mild swelling'
    },
    'laser-treatment': {
        title: 'Suprano Titanium Hair Laser',
        subtitle: 'Advanced Hair Reduction Platform',
        icon: 'fa-bolt',
        description: 'Comfort-focused hair laser sessions using Suprano Titanium technology for effective long-term hair reduction across multiple skin types.',
        idealFor: 'Unwanted facial/body hair, fast treatment sessions',
        duration: '15-45 minutes',
        downtime: 'No downtime'
    },
    skincare: {
        title: 'CO2 Laser Resurfacing',
        subtitle: 'Fractional Resurfacing & Renewal',
        icon: 'fa-fire',
        description: 'Focused CO2 laser treatment protocol for acne scars, pore refinement, skin rejuvenation, and tightening support.',
        idealFor: 'Acne scars, enlarged pores, texture irregularities, skin tightening',
        duration: '30-60 minutes',
        downtime: '3-7 days depending on intensity'
    },
    diabetes: {
        title: 'Diabetes Clinic',
        subtitle: 'Endocrine and Diabetes Management',
        icon: 'fa-heartbeat',
        description: 'Comprehensive diabetes and endocrine consultations with individualized monitoring and treatment planning.',
        idealFor: 'Type 1, Type 2, endocrine concerns',
        duration: '30-45 minutes',
        downtime: 'None'
    },
    dermatology: {
        title: 'Dermatology Consultation',
        subtitle: 'Specialist Clinical Assessment',
        icon: 'fa-user-md',
        description: 'Detailed skin assessment and treatment roadmap for acne, pigmentation, hair, and chronic skin conditions.',
        idealFor: 'Any skin, hair, or nail concern',
        duration: '25-40 minutes',
        downtime: 'None'
    }
};

// ============================================
// LOADING SCREEN ANIMATION
// ============================================
window.addEventListener('load', () => {
    if (!loadingScreen) return;

    // Intentional premium intro delay requested by user.
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 260);
    }, 600);
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgressBar.style.width = scrollPercentage + '%';
});

// ============================================
// STICKY NAVBAR
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
function setMenuState(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

hamburger.addEventListener('click', () => {
    const isOpen = !hamburger.classList.contains('active');
    setMenuState(isOpen);
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setMenuState(false);
    });
});

// ============================================
// SERVICE MODAL
// ============================================
function openServiceModal(serviceKey) {
    if (!serviceModal || !serviceDetailsData[serviceKey]) return;

    const data = serviceDetailsData[serviceKey];
    serviceModalTitle.textContent = data.title;
    serviceModalSubtitle.textContent = data.subtitle;
    serviceModalDescription.textContent = data.description;
    serviceModalIdealFor.textContent = data.idealFor;
    serviceModalDuration.textContent = data.duration;
    serviceModalDowntime.textContent = data.downtime;
    serviceModalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.getAttribute('data-service');
        if (!key) return;
        openServiceModal(key);
    });
});

document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentCard = link.closest('.service-card');
        const key = parentCard ? parentCard.getAttribute('data-service') : '';
        if (!key) return;
        openServiceModal(key);
    });
});

if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
}

if (serviceModalBackdrop) {
    serviceModalBackdrop.addEventListener('click', closeServiceModal);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const autoRevealTargets = document.querySelectorAll(
    'section h1, section h2, section h3, section h4, section p, section li, section .btn, section .service-card, section .doctor-card, section .why-card, section .testimonial-card, section .timing-card, section .contact-card, section .gallery-item, footer .footer-section'
);

autoRevealTargets.forEach((element, index) => {
    if (element.closest('.hero-background, .gallery-modal, .service-modal')) return;

    if (!element.hasAttribute('data-aos')) {
        if (element.matches('.btn')) {
            element.setAttribute('data-aos', 'zoom-in');
        } else {
            element.setAttribute('data-aos', 'fade-up');
        }
    }

    if (!element.hasAttribute('data-aos-delay')) {
        element.setAttribute('data-aos-delay', String((index % 6) * 70));
    }
});

const revealElements = document.querySelectorAll('[data-aos]');

const revealElement = (element) => {
    if (element.classList.contains('revealed')) return;
    const delay = parseInt(element.getAttribute('data-aos-delay') || '0', 10);
    element.style.transitionDelay = `${delay}ms`;
    element.classList.add('revealed');
};

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            revealElement(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const isVisible = element.getBoundingClientRect().top < window.innerHeight - 100;
            if (isVisible) revealElement(element);
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ============================================
// HERO FORM SUBMISSION
// ============================================
const heroForm = document.getElementById('heroForm');
if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = heroForm.querySelector('input[type="text"]').value;
        const phone = heroForm.querySelector('input[type="tel"]').value;
        const treatment = heroForm.querySelector('select[name="treatment"]').value;
        const doctorField = heroForm.querySelector('select[name="doctor"]');
        const doctor = doctorField ? doctorField.value : '';
        
        const message = `Hello👋, I'm ${name}. I would like to book a consultation for ${treatment}. My phone number is ${phone}. Please contact me soon.`;
        const finalMessage = doctor ? `${message} Preferred doctor: ${doctor}.` : message;
        const whatsappURL = `https://wa.me/923164364811?text=${encodeURIComponent(finalMessage)}`;
        
        window.open(whatsappURL, '_blank');
        heroForm.reset();
    });
}

// ============================================
// BOOKING FORM SUBMISSION
// ============================================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const treatment = document.getElementById('treatment').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;
        
        let whatsappMessage = `*APPOINTMENT REQUEST*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        whatsappMessage += `*Phone:* ${phone}\n`;
        whatsappMessage += `*Treatment:* ${treatment}\n`;
        if (doctor) whatsappMessage += `*Preferred Doctor:* ${doctor}\n`;
        if (date) whatsappMessage += `*Preferred Date:* ${date}\n`;
        if (time) whatsappMessage += `*Preferred Time:* ${time}\n`;
        if (message) whatsappMessage += `*Additional Notes:* ${message}\n`;
        whatsappMessage += `\nThank you for choosing Zahra Health Clinic!`;
        
        const whatsappURL = `https://wa.me/923164364811?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');
        
        // Show success animation
        showFormSuccess(bookingForm);
        bookingForm.reset();
    });
}

function showFormSuccess(form) {
    const originalButton = form.querySelector('button[type="submit"]');
    const originalText = originalButton.innerHTML;
    
    originalButton.innerHTML = '<i class="fas fa-check-circle"></i> Request Sent!';
    originalButton.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
    
    setTimeout(() => {
        originalButton.innerHTML = originalText;
        originalButton.style.background = '';
    }, 3000);
}

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// For mobile/tablet: Show all testimonials in grid, For desktop: Show carousel
if (window.innerWidth > 768) {
    showTestimonial(0);
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-scroll testimonials every 6 seconds
    setInterval(nextTestimonial, 6000);
} else {
    // Show all testimonials on mobile
    testimonialCards.forEach(card => {
        card.style.display = 'block';
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// COUNTER ANIMATION (for stats)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stat-number')) {
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target) && entry.target.dataset.animated !== 'true') {
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(element => {
    observer.observe(element);
});

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Gallery lightbox is implemented with the premium modal system below.

// ============================================
// CURSOR GLOW EFFECT (Desktop)
// ============================================
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) {
        return;
    }

    let glow = document.querySelector('.cursor-glow');
    if (!glow) {
        glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 22px;
            height: 22px;
            background: radial-gradient(circle, rgba(142, 31, 63, 0.5), rgba(192, 154, 95, 0.18), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(glow);
    }

    glow.style.left = (e.clientX - 11) + 'px';
    glow.style.top = (e.clientY - 11) + 'px';

    if (e.target.closest('a, button, .service-card, .doctor-card, .why-card, .testimonial-card')) {
        glow.style.opacity = '0.35';
    } else {
        glow.style.opacity = '0';
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Defer non-critical animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize any heavy animations
    });
}

// ============================================
// ADDITIONAL POLISH
// ============================================

// Smooth scroll behavior for all browsers
document.documentElement.style.scrollBehavior = 'smooth';

// Add page visibility API for optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, reduce animations
        document.body.style.animation = 'none';
    } else {
        // Page is visible, resume animations
        document.body.style.animation = '';
    }
});

const serviceModalBookBtn = document.getElementById('serviceModalBookBtn');
if (serviceModalBookBtn) {
    serviceModalBookBtn.addEventListener('click', () => {
        closeServiceModal();
    });
}

// Why card enhancements
document.querySelectorAll('.why-card').forEach((card, index) => {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 100);
});
// ============================================
// GALLERY MODAL (Premium with Navigation)
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
let currentGalleryIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    updateModalContent();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateModalContent() {
    const item = galleryItems[currentGalleryIndex];
    const title = item.getAttribute('data-title') || item.querySelector('p').textContent;
    const description = item.getAttribute('data-description') || 'Premium treatment at Zahra Health Clinic';
    const imageSrc = item.getAttribute('data-image');
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('currentSlide').textContent = currentGalleryIndex + 1;
    document.getElementById('totalSlides').textContent = galleryItems.length;
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalImage').alt = title;
}

function nextGallerySlide() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateModalContent();
}

function prevGallerySlide() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalContent();
}

// Gallery button click handlers
galleryItems.forEach((item, index) => {
    const galleryBtn = item.querySelector('.gallery-btn');
    if (galleryBtn) {
        galleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openGalleryModal(index);
        });
    }
});

// Modal controls
if (modalClose) {
    modalClose.addEventListener('click', closeGalleryModal);
}

if (modalPrev) {
    modalPrev.addEventListener('click', prevGallerySlide);
}

if (modalNext) {
    modalNext.addEventListener('click', nextGallerySlide);
}

// Close modal when clicking outside
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (serviceModal && serviceModal.classList.contains('active') && e.key === 'Escape') {
        closeServiceModal();
        return;
    }

    if (galleryModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevGallerySlide();
        if (e.key === 'ArrowRight') nextGallerySlide();
        if (e.key === 'Escape') closeGalleryModal();
    }
});

// Swipe support for mobile
if (galleryModal) {
    galleryModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    galleryModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextGallerySlide();
        } else {
            prevGallerySlide();
        }
    }
}
// ============================================
// ENHANCED FORM FIELD INTERACTIONS
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    // Remove focus animation
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Add filled state
    input.addEventListener('input', function() {
        if (this.value) {
            this.parentElement.classList.add('filled');
        } else {
            this.parentElement.classList.remove('filled');
        }
    });
});

// ============================================
// INPUT VALIDATION & FORMATTING
// ============================================
// Gallery click handlers - see new GALLERY MODAL section below for enhanced version
