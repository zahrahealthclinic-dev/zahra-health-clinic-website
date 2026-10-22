// Run after changing clinic content: node scripts/build-chatbot-data.js
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const plain = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();

function divs(html, className) {
    const results = [];
    const starts = /<div\b[^>]*class="([^"]+)"[^>]*>/g;
    let start;
    while ((start = starts.exec(html))) {
        if (!start[1].split(/\s+/).includes(className)) continue;
        const tags = /<\/?div\b[^>]*>/g;
        tags.lastIndex = starts.lastIndex;
        let depth = 1, tag;
        while (depth && (tag = tags.exec(html))) depth += tag[0].startsWith('</') ? -1 : 1;
        if (depth) throw new Error('Unclosed ' + className);
        results.push(html.slice(start.index, tags.lastIndex));
    }
    return results;
}

const entries = [];
const add = (id, title, answer, aliases, source, category) => entries.push({ id, title, answer, aliases, source, category });
const home = read('index.html');
const contact = read('contact.html');
const hours = plain(home.match(/class="timing-hours">([\s\S]*?)<\/p>/)[1]);
const phone = contact.match(/href="tel:([^"]+)"/)[1];
const email = contact.match(/href="mailto:([^"]+)"/)[1];
const addressCard = divs(contact, 'contact-card').find(block => block.includes('Location'));
const address = [...addressCard.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => plain(m[1])).join(', ');

add('hours', 'Clinic timings', `Clinic timings: Monday to Friday, ${hours}. Please contact the team to confirm your visit.`,
    ['clinic timings', 'opening hours', 'hours', 'timing', 'what time', 'kis time', 'kitne baje', 'kitny baje', 'kab aoon', 'open', 'closed', 'weekend', 'saturday', 'sunday', 'waqt', 'kab khulta', 'kab khulti', 'kab band', 'jumma', 'hafta', 'کلینک کے اوقات'], 'contact.html', 'clinic');
add('location', 'Clinic location', address + '.',
    ['address', 'location', 'directions', 'where is clinic', 'kahan', 'kidhar', 'pata', 'bahria town', 'karachi', 'لوکیشن'], 'contact.html', 'clinic');
add('contact', 'Contact the clinic', `Call ${phone} or email ${email}. You can also speak with the clinic team on WhatsApp.`,
    ['contact', 'phone', 'number', 'call', 'email', 'whatsapp', 'talk to doctor', 'doctor se baat', 'team se baat', 'رابطہ'], 'contact.html', 'clinic');
add('booking', 'Book an appointment', 'Use the appointment form to share your name, phone, treatment and optional doctor/date/time preference. It opens a WhatsApp draft: press Send in WhatsApp to send it. Your appointment is a request until the clinic confirms it.',
    ['appointment', 'booking', 'book consultation', 'book now', 'book', 'appointment lena', 'appointment leni', 'appointment chahiye', 'وقت لینا'], 'booking.html', 'clinic');
add('availability', 'Confirm appointment availability', 'I cannot check live slots, confirm an appointment, cancel it or reschedule it. Please contact the clinic team on WhatsApp or call to confirm availability and changes.',
    ['available today', 'slot', 'availability', 'cancel', 'reschedule', 'appointment confirm', 'aaj aa sakta', 'aaj aa sakti', 'kal appointment'], 'booking.html', 'clinic');
add('pricing', 'Treatment prices', 'The website does not publish a fixed price list. Pricing depends on the treatment and area. Please ask the clinic team for a current quote; I cannot confirm discounts, free consultations or payment plans.',
    ['price', 'prices', 'cost', 'fee', 'fees', 'charges', 'rate', 'package', 'discount', 'discounts', 'payment', 'installment', 'instalment', 'kitne paise', 'kitna kharcha', 'qeemat', 'قیمت', 'فیس'], 'booking.html', 'clinic');
add('doctors', 'Meet the doctors', 'Dr. Hina Wazir — RMP, Cosmetologist. Dr. Ahmed Khalil — Diabetes Consultant and General Physician. Dr. Saher Fatima — MBBS, Diploma in Dermatology. See their profiles or ask about a doctor by name.',
    ['doctors', 'doctor', 'doctar', 'doctor list', 'team', 'specialists', 'kon doctor', 'kaun doctor', 'doctor kaun', 'doctor ka naam', 'ڈاکٹر'], 'doctors.html', 'clinic');
add('services', 'Clinic services', 'The clinic offers laser and aesthetic treatments, dermatology consultations, hair/body/minor procedures, and diabetes and weight management care. Ask about a treatment by name, for example HydraFacial, hair laser, Botox, PRP, acne scars or diabetes.',
    ['services', 'treatments', 'what do you offer', 'kya services', 'kya treatment', 'ilaj', 'علاج'], 'services.html', 'clinic');
add('results', 'Before and after gallery', 'You can view the published before-and-after examples in the homepage gallery. Individual results vary; these examples do not guarantee a specific outcome.',
    ['before after', 'before and after', 'gallery', 'photos', 'pictures', 'results', 'tasveer', 'tasveerain'], 'index.html#gallery', 'clinic');
add('reviews', 'Patient reviews', 'Published patient experiences are available on the Reviews page. Experiences and results can differ between individuals.',
    ['review', 'reviews', 'testimonial', 'testimonials', 'feedback', 'patient experience'], 'reviews.html', 'clinic');
add('why-us', 'Why choose the clinic?', 'The clinic describes a personalized, doctor-guided approach, treatment planning around individual needs, professional guidance and aftercare support.',
    ['why choose', 'why us', 'why zahra', 'clinic ke bare', 'clinic kaisi', 'about clinic'], 'why-us.html', 'clinic');

const servicePages = {
    "laser-treatment": "aesthetic-dermatology.html",
    "skincare": "aesthetic-dermatology.html",
    "dermatology": "aesthetic-dermatology.html",
    "hydrafacial": "aesthetic-dermatology.html",
    "rf-microneedling": "aesthetic-dermatology.html",
    "glutathione": "aesthetic-dermatology.html",
    "chemical-peels": "aesthetic-dermatology.html",
    "exosomes": "aesthetic-dermatology.html",
    "hands-feet-rejuvenation": "aesthetic-dermatology.html",
    "botox": "aesthetic-dermatology.html",
    "dermal-fillers": "aesthetic-dermatology.html",
    "thread-lifts": "aesthetic-dermatology.html",
    "biostimulators": "aesthetic-dermatology.html",
    "fat-dissolving": "mole-body-minor-procedures.html",
    "hair-nails-diseases": "mole-body-minor-procedures.html",
    "stretch-marks": "mole-body-minor-procedures.html",
    "mole-removal": "mole-body-minor-procedures.html",
    "skin-tags-removal": "mole-body-minor-procedures.html",
    "antioxidant-injections": "mole-body-minor-procedures.html",
    "diabetes": "diabetes-weight-management.html"
};
const serviceAliases = {
    'laser-treatment': ['hair laser', 'hair removal', 'soprano', 'suprano', 'unwanted hair', 'baal hatana'],
    skincare: ['co2', 'carbon dioxide laser', 'resurfacing', 'laser resurfacing'],
    dermatology: ['acne', 'acne scars', 'pimples', 'scars', 'muhase', 'danay'],
    hydrafacial: ['hydrafacial', 'hydra facial', 'hydration facial'],
    'rf-microneedling': ['prp face', 'microneedling', 'prp facial'],
    glutathione: ['skin booster', 'skin boosters', 'pdrn', 'polynucleotide', 'profhilo'],
    'chemical-peels': ['chemical peel', 'peels', 'peeling'],
    exosomes: ['exosomes', 'exosome'],
    'hands-feet-rejuvenation': ['hands feet', 'hand rejuvenation', 'feet rejuvenation'],
    botox: ['botox', 'wrinkles', 'anti wrinkle'],
    'dermal-fillers': ['fillers', 'filler', 'lip enhancement', 'lip fillers'],
    'thread-lifts': ['thread lift', 'thread lifting', 'face lift'],
    biostimulators: ['biostimulator', 'sculptra', 'radiesse', 'collagen'],
    'fat-dissolving': ['fat dissolving', 'double chin'],
    'hair-nails-diseases': ['prp scalp', 'hair fall', 'hair loss', 'hair thinning', 'baal girna'],
    'stretch-marks': ['stretch marks', 'stretch mark'],
    'mole-removal': ['mole removal', 'moles', 'mole', 'til hatana'],
    'skin-tags-removal': ['skin tags', 'skin tag'],
    'antioxidant-injections': ['antioxidant', 'antioxidant injections', 'drip'],
    diabetes: ['diabetes', 'blood sugar', 'thyroid', 'weight management', 'obesity', 'blood pressure', 'cholesterol', 'diabetic foot', 'sugar', 'wazan']
};
for (const block of divs(read('services.html'), 'service-card')) {
    const key = block.match(/data-service="([^"]+)"/)[1];
    const title = plain(block.match(/<h3>([\s\S]*?)<\/h3>/)[1]);
    const answer = [...block.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => plain(m[1])).join('\n\n');
    add('service-' + key, title, answer, [title, ...(serviceAliases[key] || [])], servicePages[key] + '#service-' + key, 'service');
}
const doctorAliases = [
    ['hina', 'dr hina', 'hina wazir', 'cosmetologist'],
    ['ahmed', 'dr ahmed', 'ahmed khalil', 'general physician', 'diabetes doctor'],
    ['saher', 'sahar', 'dr saher', 'saher fatima', 'dermatologist', 'skin specialist']
];
divs(read('doctors.html'), 'doctor-card').forEach((block, i) => {
    const title = plain(block.match(/<h3>([\s\S]*?)<\/h3>/)[1]);
    const id = block.match(/id="([^"]+)"/)[1];
    const specialty = plain(block.match(/class="doctor-specialty">([\s\S]*?)<\/p>/)[1]);
    const details = divs(block, 'doctor-details')[0];
    const qualifications = [...details.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => plain(m[1]));
    add('doctor-' + id, title, [specialty, ...qualifications].join('\n'), [title, ...doctorAliases[i]], 'doctors.html#' + id, 'doctor');
});
for (const file of ['index.html', 'services.html', 'doctors.html', 'reviews.html', 'why-us.html', 'faq.html']) {
    for (const block of divs(read(file), 'faq-item')) {
        const button = block.match(/<button\b[^>]*class="faq-question"[^>]*>([\s\S]*?)<\/button>/);
        const answer = divs(block, 'faq-answer')[0];
        if (!button || !answer) continue;
        const title = plain(button[1]);
        add('faq-' + entries.length, title, plain(answer), [title], file, 'faq');
    }
}
const data = { phone, email, whatsapp: 'https://wa.me/923164364811', entries };
const output = '// Generated from website content. Rebuild: node scripts/build-chatbot-data.js\n' +
    '(function(root) { const data = ' + JSON.stringify(data, null, 2) + ';\n' +
    'if (typeof module === "object" && module.exports) module.exports = data; else root.ZahraChatKnowledge = data;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n';
fs.writeFileSync(path.join(root, 'chatbot-knowledge.js'), output);
console.log(`Built ${entries.length} clinic answers with ${entries.reduce((n, e) => n + e.aliases.length, 0)} question/topic aliases.`);
