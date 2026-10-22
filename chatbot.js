(function() {
    'use strict';
    if (!window.ZahraChatKnowledge || !window.ZahraChatEngine || document.getElementById('clinic-chat')) return;
    const knowledge = window.ZahraChatKnowledge;
    const engine = window.ZahraChatEngine.createEngine(knowledge);
    const widget = document.createElement('div');
    widget.id = 'clinic-chat';
    widget.innerHTML = `
        <button class="clinic-chat-launcher" type="button" aria-label="Open clinic chat" aria-expanded="false" aria-controls="clinic-chat-panel">
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 11h8M8 15h5"/></svg>
            <span>Chat</span>
        </button>
        <section class="clinic-chat-panel" id="clinic-chat-panel" role="dialog" aria-labelledby="clinic-chat-heading" hidden>
            <header class="clinic-chat-header">
                <div><h2 id="clinic-chat-heading">Zahra Clinic Guide</h2><p>Services · Doctors · Booking</p></div>
                <button class="clinic-chat-close" type="button" aria-label="Close clinic chat">×</button>
            </header>
            <p class="clinic-chat-note">Clinic information only. For personal medical advice, please speak with a doctor.</p>
            <div class="clinic-chat-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages" tabindex="0"></div>
            <div class="clinic-chat-suggestions" aria-label="Suggested questions"></div>
            <form class="clinic-chat-form">
                <label class="clinic-chat-sr" for="clinic-chat-input">Your question</label>
                <input id="clinic-chat-input" name="question" type="text" placeholder="Ask in English or Roman Urdu…" maxlength="500" autocomplete="off" required>
                <button type="submit" aria-label="Send question">Send</button>
            </form>
            <footer class="clinic-chat-footer"><a href="${knowledge.whatsapp}" target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a><button class="clinic-chat-reset" type="button">New chat</button></footer>
        </section>`;
    document.body.appendChild(widget);
    document.body.classList.add('clinic-chat-ready');
    const launcher = widget.querySelector('.clinic-chat-launcher');
    const panel = widget.querySelector('.clinic-chat-panel');
    const log = widget.querySelector('.clinic-chat-log');
    const input = widget.querySelector('input');
    const suggestions = widget.querySelector('.clinic-chat-suggestions');
    let context = null;
    let welcomed = false;
    let savedPage = null;
    const mobileView = () => window.matchMedia('(max-width: 768px)').matches;
    function syncPageLock() {
        const lock = !panel.hidden && mobileView();
        if (lock && !savedPage) {
            savedPage = { x: window.scrollX, y: window.scrollY,
                position: document.body.style.position, top: document.body.style.top,
                left: document.body.style.left, width: document.body.style.width,
                overflow: document.body.style.overflow };
            Object.assign(document.body.style, { position: 'fixed', top: `-${savedPage.y}px`,
                left: `-${savedPage.x}px`, width: '100%', overflow: 'hidden' });
        } else if (!lock && savedPage) {
            const saved = savedPage;
            savedPage = null;
            Object.assign(document.body.style, { position: saved.position, top: saved.top,
                left: saved.left, width: saved.width, overflow: saved.overflow });
            const behavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(saved.x, saved.y);
            document.documentElement.style.scrollBehavior = behavior;
        }
        document.body.classList.toggle('clinic-chat-mobile-open', lock);
        panel.setAttribute('aria-modal', String(lock));
    }

    function append(text, user, answer) {
        const message = document.createElement('div');
        message.className = 'clinic-chat-message' + (user ? ' clinic-chat-message--user' : '');
        const label = document.createElement('span');
        label.className = 'clinic-chat-message-label';
        label.textContent = user ? 'You' : 'Clinic Guide';
        const body = document.createElement('p');
        body.textContent = text;
        message.append(label, body);
        if (answer && answer.source) {
            const allowed = knowledge.entries.some(e => e.source === answer.source) || answer.source === knowledge.whatsapp;
            if (allowed) {
                const link = document.createElement('a');
                link.href = answer.source;
                link.textContent = answer.source === knowledge.whatsapp ? 'Contact clinic on WhatsApp ↗' : 'Read more: ' + answer.title;
                if (answer.source === knowledge.whatsapp) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
                message.appendChild(link);
            }
        }
        log.appendChild(message);
        while (log.children.length > 80) log.firstElementChild.remove();
        log.scrollTop = log.scrollHeight;
    }

    function setSuggestions(items) {
        suggestions.replaceChildren();
        items.forEach(question => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = question;
            button.addEventListener('click', () => ask(question));
            suggestions.appendChild(button);
        });
    }
    function welcome() {
        append('Assalam-o-Alaikum! Welcome to Zahra Health Clinic. Ask me about treatments, doctors, clinic timings, location or appointments. Aap English ya Roman Urdu mein sawal kar sakte hain.', false);
        setSuggestions(['Clinic timings', 'Services', 'Meet the doctors', 'Book an appointment', 'Location', 'Treatment prices']);
        welcomed = true;
    }
    function ask(question) {
        const text = question.trim();
        if (!text) return;
        append(text, true);
        const answer = engine.reply(text, context);
        context = answer.context;
        append(answer.answer, false, answer);
        input.value = '';
        setSuggestions(answer.id.startsWith('service-') ? ['How many sessions', 'Downtime', 'Treatment prices', 'Book an appointment'] : ['Services', 'Meet the doctors', 'Clinic timings', 'Contact the clinic']);
        input.focus({ preventScroll: true });
    }
    function setOpen(open) {
        panel.hidden = !open;
        syncPageLock();
        fitViewport();
        launcher.setAttribute('aria-expanded', String(open));
        launcher.setAttribute('aria-label', open ? 'Close clinic chat' : 'Open clinic chat');
        if (open) {
            if (!welcomed) welcome();
            if (mobileView()) widget.querySelector('.clinic-chat-close').focus({ preventScroll: true });
            else input.focus({ preventScroll: true });
        } else {
            input.blur();
            launcher.focus({ preventScroll: true });
        }
    }
    launcher.addEventListener('click', () => setOpen(panel.hidden));
    widget.querySelector('.clinic-chat-close').addEventListener('click', () => setOpen(false));
    widget.querySelector('form').addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
    widget.querySelector('.clinic-chat-reset').addEventListener('click', () => { log.replaceChildren(); context = null; welcome(); input.focus({ preventScroll: true }); });
    widget.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); setOpen(false); } });
    const fitViewport = () => {
        const viewport = window.visualViewport;
        const height = viewport ? viewport.height : window.innerHeight;
        widget.style.setProperty('--chat-viewport-height', height + 'px');
        widget.style.setProperty('--chat-viewport-top', (viewport ? viewport.offsetTop : 0) + 'px');
        widget.classList.toggle('clinic-chat-compact', height < 500);
        syncPageLock();
    };
    fitViewport();
    window.addEventListener('resize', fitViewport);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', fitViewport);
        window.visualViewport.addEventListener('scroll', fitViewport);
    }
    panel.addEventListener('keydown', event => {
        if (event.key !== 'Tab' || !mobileView() || panel.hidden) return;
        const controls = [...panel.querySelectorAll('a[href], button, input, [tabindex="0"]')]
            .filter(element => element.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
        }
    });
})();
