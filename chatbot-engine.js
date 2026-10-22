(function (root) {
    const normalize = value => String(value || '').toLowerCase().normalize('NFKC')
        .replace(/&/g, ' and ').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
    const stop = new Set(('a an the is are it of for to in on at do does can could would will what which how i we you me my your please tell about mujhe mujha mera meri mere hai hain hia ka ki ke ko se kya kia ho hoga hota hun kar kr karo batao btao aur or bhi this that have need want').split(' '));
    const tokens = value => [...new Set(normalize(value).split(' ').filter(t => t.length > 1 && !stop.has(t)))];
    const has = (text, phrase) => (' ' + text + ' ').includes(' ' + normalize(phrase) + ' ');
    function createEngine(data) {
        const entries = data.entries;
        const result = (entry, context) => ({ answer: entry.answer, source: entry.source, title: entry.title, id: entry.id, context: context || entry.id });
        const escalation = (answer, id = 'handoff') => ({ answer, source: data.whatsapp, title: 'Speak with the clinic', id, context: null });
        function reply(input, context) {
            const text = normalize(input);
            if (!text) return escalation('Please type a clinic question, or choose one of the suggested topics.');
            if (input.length > 500) return escalation('Please ask one short question at a time, up to 500 characters.');
            if (/^(hi|hello|hey|salam|assalam o alaikum|assalamualaikum|aoa|salaam)$/.test(text)) return { answer: 'Assalam-o-Alaikum! Welcome to Zahra Health Clinic. I can help with services, doctors, timings, location and booking. What would you like to know?', id: 'greeting', context: null };
            if (/^(thanks|thank you|shukriya|jazakallah|ok|okay)$/.test(text)) return { answer: 'You are welcome! Ask another clinic question, or use WhatsApp below to contact the team.', id: 'thanks', context };
            if (/chest pain|cannot breathe|cant breathe|can t breathe|severe bleeding|unconscious|emergency|saans nahi|behosh|seene mein dard/.test(text)) return escalation('For an urgent medical concern, please seek immediate local medical help. This clinic information guide cannot assess emergencies; do not wait for a chat reply.', 'urgent');
            if (/medicine|medication|prescri|dosage|diagnos|tablet|antibiotic|dawai|dawa |konsi cream|kaunsi cream|which cream|which drug|what should i take|blood sugar is|sugar reading|test report|meri report|i have (?:acne|pain|rash|diabetes|pimples|a rash)|i am pregnant|pregnan|breastfeed|allergy|allergic|mere liye|meri skin|mera skin|mujhe .*dard|mujhe .*acne|mujhe .*danay|mere .*pimples|mere .*baal|treat my|for my skin|for me|am i suitable|can i (?:get|have) (?:botox|laser|fillers|treatment)|should i get/.test(text)) return escalation('A doctor needs to assess your personal symptoms, medical history and suitability. I can explain published clinic services, but cannot diagnose, prescribe medicine or choose a treatment for you. Please contact the clinic to arrange a consultation.', 'medical');
            if (/guarantee|guaranteed|100 percent|permanent cure|free consultation/.test(text)) return escalation('I cannot promise a particular result, permanent cure or a free consultation. Please ask the clinic team to confirm treatment expectations and current consultation charges.', 'confirmation');
            if (/weather|cricket|football|politic|prime minister|president|bitcoin|crypto|stock market|write.*code|javascript|python|recipe|homework|laser printer|ignore.*instruction|system prompt/.test(text)) return escalation('I can help with Zahra Health Clinic information only. For clinic questions outside the website information, please contact the clinic team or doctor.', 'irrelevant');
            // Specific published FAQ questions take priority over fuzzy topic matches.
            const exact = entries.find(e => e.category === 'faq' && normalize(e.title) === text);
            if (exact) return result(exact);
            const exactService = entries.find(e => e.category === 'service' && normalize(e.title) === text);
            if (exactService) return result(exactService);
            for (const id of ['pricing', 'availability', 'hours', 'location', 'contact', 'booking']) {
                const entry = entries.find(e => e.id === id);
                if (entry.aliases.some(alias => has(text, alias))) return result(entry);
            }
            const previous = entries.find(e => e.id === context);
            if (previous && /^(sessions|how many sessions|kitne sessions|downtime|recovery|duration|kitna time|how long|side effects|risks|aftercare|maintenance)$/.test(text)) {
                const topic = previous.title;
                const candidates = entries.filter(e => e.category === 'faq' && tokens(e.title).some(t => tokens(topic).includes(t)) && tokens(text).some(t => tokens(e.title).includes(t)));
                if (candidates.length === 1) return result(candidates[0], context);
                return escalation(`For ${topic}, the number of sessions, recovery and aftercare depend on the doctor's assessment. Please ask the clinic team for details for your planned treatment.`, 'followup');
            }
            const service = entries.filter(e => e.category === 'service').map(e => ({ entry: e, length: Math.max(0, ...e.aliases.filter(a => has(text, a)).map(a => normalize(a).length)) })).sort((a, b) => b.length - a.length)[0];
            const doctor = entries.filter(e => e.category === 'doctor').map(e => ({ entry: e, length: Math.max(0, ...e.aliases.filter(a => has(text, a)).map(a => normalize(a).length)) })).sort((a, b) => b.length - a.length)[0];
            if (doctor && doctor.length && /doctor|dr |hina|ahmed|saher|sahar|specialist|dermatologist|cosmetologist|physician/.test(text)) return result(doctor.entry);
            if (service && service.length) {
                const q = tokens(text);
                const faq = entries.filter(e => e.category === 'faq').map(e => {
                    const words = tokens(e.title), shared = q.filter(t => words.includes(t));
                    return { entry: e, score: shared.length / Math.max(q.length, words.length) };
                }).sort((a, b) => b.score - a.score)[0];
                if (faq && faq.score >= 0.6) return result(faq.entry, service.entry.id);
                return result(service.entry);
            }
            for (const id of ['doctors', 'services', 'results', 'reviews', 'why-us']) {
                const entry = entries.find(e => e.id === id);
                if (entry.aliases.some(a => has(text, a))) return result(entry);
            }
            const q = tokens(text);
            const ranked = entries.filter(e => e.category === 'faq').map(e => {
                const words = tokens(e.title), shared = q.filter(t => words.includes(t));
                return { entry: e, score: shared.length / Math.max(q.length, words.length), shared: shared.length };
            }).sort((a, b) => b.score - a.score);
            if (ranked[0] && ranked[0].shared >= 2 && ranked[0].score >= 0.65) return result(ranked[0].entry);
            return escalation('I do not have a reliable answer to that in the website information. Please contact the clinic team or doctor on WhatsApp. You can also ask about a service, doctor, timings, location or booking.', 'unknown');
        }
        return { reply };
    }
    if (typeof module === 'object' && module.exports) module.exports = { createEngine };
    else root.ZahraChatEngine = { createEngine };
})(typeof globalThis !== 'undefined' ? globalThis : this);
