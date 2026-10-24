// Page ke zaroori elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
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
    biostimulators: {
        title: 'Sculptra & Radiesse Biostimulators',
        subtitle: 'Gradual Collagen Support',
        icon: 'fa-arrows-to-circle',
        description: 'Biostimulator treatments support your skin\'s natural collagen rebuilding so firmness and contour improve gradually.',
        idealFor: 'Early to moderate laxity and lost firmness',
        duration: '30-45 minutes',
        downtime: 'Minimal'
    },
    'fat-dissolving': {
        title: 'Fat Dissolving Injection',
        subtitle: 'Targeted Contouring Support',
        icon: 'fa-compress',
        description: 'A targeted treatment for small, stubborn pockets of fat such as under the chin and along the jawline.',
        idealFor: 'Small localised fat deposits',
        duration: '20-30 minutes',
        downtime: 'Swelling or tenderness for a few days'
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
    exosomes: {
        title: 'Exosomes',
        subtitle: 'Regenerative Skin Support',
        icon: 'fa-dna',
        description: 'A regenerative therapy that supports healing and glow, often paired with microneedling.',
        idealFor: 'Post-procedure recovery, dull or damaged skin',
        duration: '30-45 minutes',
        downtime: 'Minimal'
    },
    'hands-feet-rejuvenation': {
        title: 'Hands & Feet Rejuvenation',
        subtitle: 'Texture, Volume and Tone Care',
        icon: 'fa-hand-sparkles',
        description: 'A tailored approach to improve texture, volume and tone so hands and feet look as cared for as the face.',
        idealFor: 'Thin, crepey or pigmented skin',
        duration: '30-60 minutes',
        downtime: 'Usually minimal'
    },
    'rf-microneedling': {
        title: 'Microneedling & PRP Face',
        subtitle: 'Skin Texture and Rejuvenation',
        icon: 'fa-vial',
        description: 'Microneedling stimulates collagen to smooth texture and scars. PRP made from your own blood supports repair and brings back glow.',
        idealFor: 'Skin texture, scars and dull skin',
        duration: '35-55 minutes',
        downtime: 'Minimal, mild redness for a few hours'
    },
    glutathione: {
        title: 'Skin Boosters: PDRN & Polynucleotide',
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
    'hair-nails-diseases': {
        title: 'PRP Scalp & Hair Fall Treatment',
        subtitle: 'Hair and Scalp Assessment',
        icon: 'fa-spa',
        description: 'Hair fall assessment and support for regrowth with PRP and other therapies where they make sense.',
        idealFor: 'Hair fall, thinning hair and scalp concerns',
        duration: '20-35 minutes',
        downtime: 'None'
    },
    'stretch-marks': {
        title: 'Stretch Marks Treatment',
        subtitle: 'Body Texture Improvement',
        icon: 'fa-wave-square',
        description: 'Personalized plans to soften the look of stretch marks and improve body skin texture.',
        idealFor: 'Stretch marks on the body',
        duration: '30-60 minutes',
        downtime: 'Depends on the method'
    },
    'mole-removal': {
        title: 'Mole Removal',
        subtitle: 'Careful Cosmetic Assessment',
        icon: 'fa-circle-dot',
        description: 'Careful removal with attention to safety. Any mole that looks unusual is assessed properly first.',
        idealFor: 'Cosmetic or irritating moles',
        duration: '20-40 minutes',
        downtime: 'Small wound heals over days to weeks'
    },
    'skin-tags-removal': {
        title: 'Skin Tags Removal',
        subtitle: 'Minor Skin Procedure',
        icon: 'fa-tag',
        description: 'Quick removal of skin tags on the neck, eyelids, underarms and other areas.',
        idealFor: 'Skin tags that rub or bother you',
        duration: '15-30 minutes',
        downtime: 'Minimal'
    },
    'antioxidant-injections': {
        title: 'Antioxidant Injections',
        subtitle: 'Radiance and Wellness Support',
        icon: 'fa-syringe',
        description: 'Antioxidant injections and drips that support skin radiance and general wellness.',
        idealFor: 'Dull skin and low-energy periods',
        duration: '20-40 minutes',
        downtime: 'None'
    },
    dermatology: {
        title: 'Dermatology Consultation',
        subtitle: 'Acne and Scar Assessment',
        icon: 'fa-user-md',
        description: 'Detailed skin assessment and treatment roadmap for acne, pigmentation, hair, and chronic skin conditions.',
        idealFor: 'Any skin, hair, or nail concern',
        duration: '25-40 minutes',
        downtime: 'None'
    }
};

// ============================================
// Loading screen ka animation
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 260);
    }, 120);
});

// ============================================
// Scroll progress bar update karna
// ============================================
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgressBar) scrollProgressBar.style.width = scrollPercentage + '%';
});

// ============================================
// Navbar ko scroll par sticky rakhna
// ============================================
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Hamburger menu ka control
// ============================================
const navDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
let menuBodyOverflow = null;

function closeNavDropdowns(exceptButton = null) {
    navDropdownToggles.forEach(button => {
        const submenu = document.getElementById(button.getAttribute('aria-controls'));
        if (button === exceptButton || (submenu && exceptButton && submenu.contains(exceptButton))) return;
        button.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.hidden = true;
    });
}

function closeNavBranch(button) {
    const submenu = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', 'false');
    if (!submenu) return;
    submenu.hidden = true;
    submenu.querySelectorAll('.nav-dropdown-toggle').forEach(child => closeNavBranch(child));
}

function openNavDropdown(button) {
    const submenu = document.getElementById(button.getAttribute('aria-controls'));
    if (!submenu) return;
    closeNavDropdowns(button);
    button.setAttribute('aria-expanded', 'true');
    submenu.hidden = false;
    if (window.innerWidth > 1320 && submenu.classList.contains('nav-flyout')) {
        const group = button.parentElement;
        group.classList.remove('nav-flyout-left');
        if (submenu.getBoundingClientRect().right > window.innerWidth - 12) group.classList.add('nav-flyout-left');
    }
}

function setMenuState(isOpen) {
    if (!hamburger || !navMenu) return;
    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
        if (menuBodyOverflow === null) menuBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    } else {
        if (menuBodyOverflow !== null) document.body.style.overflow = menuBodyOverflow;
        menuBodyOverflow = null;
        closeNavDropdowns();
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = !hamburger.classList.contains('active');
        setMenuState(isOpen);
    });
}

navDropdownToggles.forEach(button => {
    button.addEventListener('click', () => {
        const submenu = document.getElementById(button.getAttribute('aria-controls'));
        if (!submenu) return;
        if (button.getAttribute('aria-expanded') === 'true') closeNavBranch(button);
        else openNavDropdown(button);
    });
    button.parentElement.addEventListener('pointerenter', event => {
        if (window.innerWidth > 1320 && event.pointerType === 'mouse') openNavDropdown(button);
    });
    button.parentElement.addEventListener('pointerleave', event => {
        if (window.innerWidth > 1320 && event.pointerType === 'mouse') closeNavBranch(button);
    });
});

// Dropdown links aur booking CTA click par bhi mobile menu band karna.
if (navMenu) {
    navMenu.addEventListener('click', event => {
        if (event.target.closest('a')) setMenuState(false);
    });
    navMenu.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        const openDropdown = Array.from(navDropdownToggles).reverse().find(button => button.getAttribute('aria-expanded') === 'true');
        if (openDropdown) {
            closeNavBranch(openDropdown);
            openDropdown.focus();
        } else {
            setMenuState(false);
            if (hamburger) hamburger.focus();
        }
    });
    navMenu.addEventListener('focusout', event => {
        if (!navMenu.contains(event.relatedTarget)) closeNavDropdowns();
    });
}

document.addEventListener('click', event => {
    if (navMenu && !navMenu.contains(event.target) && (!hamburger || !hamburger.contains(event.target))) closeNavDropdowns();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1320) setMenuState(false);
});

// ============================================
// Service detail modal
// ============================================
const treatmentMap = {
    'dermal-fillers': 'Filler',
    'botox': 'Botox',
    'thread-lifts': 'Thread Lift',
    'hydrafacial': 'HydraFacial',
    'chemical-peels': 'Chemical Peels',
    'exosomes': 'Exosomes',
    'hands-feet-rejuvenation': 'Hands and Feet Rejuvenation',
    'biostimulators': 'Biostimulator Treatments',
    'fat-dissolving': 'Fat Dissolving Injection',
    'rf-microneedling': 'PRP Face & Scalp',
    'glutathione': 'PDRN and Polynucleotide',
    'laser-treatment': 'Hair Laser Removal',
    'skincare': 'CO2 Laser Resurfacing',
    'diabetes': 'Consultation',
    'hair-nails-diseases': 'PRP Face & Scalp',
    'stretch-marks': 'Stretch Marks Treatment',
    'mole-removal': 'Mole Removal',
    'skin-tags-removal': 'Skin Tags Removal',
    'antioxidant-injections': 'Antioxidant Injections',
    'dermatology': 'Consultation'
};

let serviceModalTrigger = null;
let serviceModalOverflow = '';
const serviceModalInert = new Map();
function setServiceModalBackgroundLocked(locked) {
    if (!locked) {
        serviceModalInert.forEach((value, element) => { element.inert = value; });
        serviceModalInert.clear();
        return;
    }
    for (let node = serviceModal; node && node !== document.body; node = node.parentElement) {
        [...node.parentElement.children].forEach(sibling => {
            if (sibling !== node && !serviceModalInert.has(sibling)) {
                serviceModalInert.set(sibling, sibling.inert);
                sibling.inert = true;
            }
        });
    }
}
function openServiceModal(serviceKey, trigger = document.activeElement) {
    if (!serviceModal || !serviceDetailsData[serviceKey]) return;

    const data = serviceDetailsData[serviceKey];
    const card = document.querySelector(`.service-card[data-service="${serviceKey}"]`);
    serviceModalTrigger = trigger;
    serviceModalOverflow = document.body.style.overflow;
    const bookButton = document.getElementById('serviceModalBookBtn');
    if (bookButton) {
        bookButton.href = `booking.html?treatment=${encodeURIComponent(treatmentMap[serviceKey] || 'Consultation')}`;
    }
    serviceModalTitle.textContent = card ? card.querySelector('h3').textContent.trim() : data.title;
    serviceModalSubtitle.textContent = data.subtitle;
    serviceModalDescription.textContent = card ? card.querySelector('p').textContent.replace(/\s+/g, ' ').trim() : data.description;
    serviceModalIdealFor.textContent = data.idealFor;
    serviceModalDuration.textContent = data.duration;
    serviceModalDowntime.textContent = data.downtime;
    serviceModalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setServiceModalBackgroundLocked(true);
    serviceModalClose.focus({ preventScroll: true });
}

function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = serviceModalOverflow;
    setServiceModalBackgroundLocked(false);
    if (serviceModalTrigger && serviceModalTrigger.isConnected) serviceModalTrigger.focus({ preventScroll: true });
}

document.querySelectorAll('.service-card').forEach(card => {
    if (card.hasAttribute('data-service')) {
        card.tabIndex = 0;
        card.setAttribute('aria-haspopup', 'dialog');
        card.addEventListener('keydown', event => {
            if (event.target !== card || !['Enter', ' '].includes(event.key)) return;
            event.preventDefault();
            openServiceModal(card.getAttribute('data-service'), card);
        });
    }
    card.addEventListener('click', event => {
        if (event.target.closest('a, button')) return;
        const key = card.getAttribute('data-service');
        if (!key) return;
        openServiceModal(key, card);
    });
});

document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const parentCard = link.closest('.service-card');
        const key = parentCard ? parentCard.getAttribute('data-service') : '';
        if (!key) return;

        e.preventDefault();
        e.stopPropagation();

        const bookingSection = document.getElementById('booking');
        const bookingTreatmentSelect = document.getElementById('treatment');



        if (bookingTreatmentSelect && key && treatmentMap[key]) {
            bookingTreatmentSelect.value = treatmentMap[key];
            bookingTreatmentSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (key && treatmentMap[key]) {
            window.location.href = `booking.html?treatment=${encodeURIComponent(treatmentMap[key])}`;
        }
    });
});

if (serviceModal) {
    serviceModal.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const controls = [...serviceModal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')]
            .filter(element => !element.disabled && element.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (!first) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
}

if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
}

if (serviceModalBackdrop) {
    serviceModalBackdrop.addEventListener('click', closeServiceModal);
}

// ============================================
// Wapas upar jane ka button
// ============================================
window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Scroll par elements ko reveal karna
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
// Hero form ko WhatsApp par bhejna
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
    });
}

// ============================================
// Booking form ko WhatsApp par bhejna
// ============================================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    const dateField = bookingForm.querySelector('input[type="date"]');
    function validateBookingDate() {
        const parts = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit'
        }).formatToParts(new Date());
        const part = type => parts.find(item => item.type === type).value;
        const today = `${part('year')}-${part('month')}-${part('day')}`;
        dateField.min = today;
        let error = '';
        if (dateField.value) {
            const day = new Date(`${dateField.value}T12:00:00Z`).getUTCDay();
            if (dateField.value < today) error = 'Please choose today or a future date.';
            else if (day === 0 || day === 6) error = 'Clinic appointments are available Monday to Friday only.';
        }
        dateField.setCustomValidity(error);
    }
    if (dateField) {
        validateBookingDate();
        dateField.addEventListener('input', validateBookingDate);
        dateField.addEventListener('change', validateBookingDate);
        dateField.addEventListener('focus', validateBookingDate);
    }
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (dateField) validateBookingDate();
        if (!bookingForm.reportValidity()) return;

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

    });
}

// ============================================
// Testimonials carousel ka control
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
    if (!totalTestimonials) return;
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    if (!totalTestimonials) return;
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Mobile par sab reviews, desktop par carousel dikhana
const isReviewsPage = Boolean(document.querySelector('.reviews-page'));
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
if (window.innerWidth > 768 && !isReviewsPage) {
    showTestimonial(0);

    // Har 6 second baad testimonial badalna
    setInterval(nextTestimonial, 6000);
} else {
    // Mobile par tamam testimonials dikhana
    testimonialCards.forEach(card => {
        card.style.display = 'block';
    });
}

// ============================================
// FAQ accordion ka control
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, index) => {
    question.type = 'button';
    question.setAttribute('aria-expanded', question.parentElement.classList.contains('active') ? 'true' : 'false');
    const answer = question.parentElement.querySelector('.faq-answer');
    if (answer) {
        answer.id = answer.id || `faq-answer-${index + 1}`;
        question.setAttribute('aria-controls', answer.id);
    }
    const icon = question.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-chevron-down');
        icon.setAttribute('aria-hidden', 'true');
    }
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Baqi tamam items band karna
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const button = item.querySelector('.faq-question');
            if (button) button.setAttribute('aria-expanded', 'false');
        });

        // Current item ko kholna ya band karna
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        } else {
            question.setAttribute('aria-expanded', 'false');
        }
    });
});

// ============================================
// Anchor links par smooth scroll
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
// Stats numbers ka animation
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

// Visible hone par counter animation chalana
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
// Service card ka hover effect
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Gallery lightbox neeche diye gaye modal system se chalta hai.

// ============================================
// Desktop par cursor glow effect
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
// Performance behtar rakhna
// ============================================
// Zaroorat se zyada animations ko baad me chalana
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Heavy animations yahan initialize hoti hain
    });
}

// ============================================
// Mazeed visual polish
// ============================================

// Har browser me smooth scroll rakhna
document.documentElement.style.scrollBehavior = 'smooth';

// Page hide hone par animations halka karna
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page hidden hai, animations kam karna
        document.body.style.animation = 'none';
    } else {
        // Page visible hai, animations resume karna
        document.body.style.animation = '';
    }
});

const serviceModalBookBtn = document.getElementById('serviceModalBookBtn');
if (serviceModalBookBtn) {
    serviceModalBookBtn.addEventListener('click', () => {
        closeServiceModal();
    });
}

// Why cards ki extra settings
document.querySelectorAll('.why-card').forEach((card, index) => {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 100);
});
// ============================================
// Gallery modal aur navigation
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

// Gallery buttons ke click handlers
galleryItems.forEach((item, index) => {
    const galleryBtn = item.querySelector('.gallery-btn');
    if (galleryBtn) {
        galleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openGalleryModal(index);
        });
    }
});

// Modal ke controls
if (modalClose) {
    modalClose.addEventListener('click', closeGalleryModal);
}

if (modalPrev) {
    modalPrev.addEventListener('click', prevGallerySlide);
}

if (modalNext) {
    modalNext.addEventListener('click', nextGallerySlide);
}

// Bahar click par modal band karna
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
}

// Keyboard se gallery chalana
document.addEventListener('keydown', (e) => {
    if (serviceModal && serviceModal.classList.contains('active') && e.key === 'Escape') {
        closeServiceModal();
        return;
    }

    if (galleryModal && galleryModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevGallerySlide();
        if (e.key === 'ArrowRight') nextGallerySlide();
        if (e.key === 'Escape') closeGalleryModal();
    }
});

// Mobile swipe support
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
// Form fields ki extra interactions
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Focus par animation lagana
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    // Focus khatam hone par animation hatana
    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });

    // Filled state update karna
    input.addEventListener('input', function () {
        if (this.value) {
            this.parentElement.classList.add('filled');
        } else {
            this.parentElement.classList.remove('filled');
        }
    });
});

// ============================================
// Input validation aur formatting
// ============================================
// Gallery handlers neeche wale modal section me maujood hain
