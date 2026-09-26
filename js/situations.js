(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       Content. Each case: a short scene, three choices, feedback for each.
       tone: 'good' (best choice), 'ok' (safe or partly right), 'bad' (risky)
       ---------------------------------------------------------------------- */
    var PILLARS = [
        { id: 'people', name: 'People', line: 'Protect yourself and others' },
        { id: 'planet', name: 'Planet', line: 'Make choices that last' },
        { id: 'prosperity', name: 'Prosperity', line: 'Turn skills into safe opportunity' }
    ];

    var CASES = [
        {
            id: 'sent-by-mistake', pillar: 'people', title: 'Sent by mistake', blurb: 'A stranger asks for $20 back',
            head: { avatar: '?', name: 'Unknown number', sub: '+263 77 \u2022\u2022\u2022 \u2022\u2022\u2022\u2022' },
            items: [
                { t: 'them', text: 'Hi, sorry, wrong number. I just sent you $20 by mistake \uD83D\uDE4F' },
                { t: 'sms', label: 'New SMS: Mobile money', text: 'You have received USD 20.00 from +263 77 \u2022\u2022\u2022 \u2022\u2022\u2022\u2022.' },
                { t: 'them', text: 'Please send it back now. It\u2019s for my child\u2019s school fees. I\u2019m begging you \uD83D\uDE4F' }
            ],
            options: [
                { tone: 'bad', said: 'Sending it back now', tag: 'This is the scam', title: 'You would be out $20.',
                  body: 'The \u201Creceived\u201D notification was fake, so no money ever arrived. Scammers copy the look of real payment messages, then rush you so you never check.' },
                { tone: 'good', said: 'Let me check my balance first', tag: 'Good call', title: 'Check first, then decide.',
                  body: 'Open your own mobile-money app or menu, not the message, and look at your balance. If nothing arrived, there is nothing to return. If money really did arrive by mistake, ask your provider to reverse it rather than sending it yourself.' },
                { tone: 'ok', said: 'Not replying. Blocking this number', tag: 'Safe, and you can do better', title: 'Nobody loses, but you can learn more.',
                  body: 'Checking your balance takes ten seconds and tells you whether anything arrived at all. Then report the number to your provider so the next person is protected.' }
            ],
            remember: 'Pressure, emotion, and you moving the money: three signs of a scam.'
        },
        {
            id: 'forward-everyone', pillar: 'people', title: 'Forward to everyone', blurb: 'A panic message in the family group',
            head: { avatar: 'F', name: 'Family group', sub: '14 members' },
            items: [
                { t: 'note', text: 'Forwarded many times' },
                { t: 'them', text: 'URGENT!! Fuel price doubles at midnight tonight. Fill your tanks NOW and forward to everyone you love.' }
            ],
            options: [
                { tone: 'bad', said: 'Forwarding to my other groups', tag: 'Risky choice', title: 'Now your name is on the rumour.',
                  body: 'A message with no source, no date, and an order to forward is built to spread, whether or not it is true. Rumours like this can cause panic buying and real harm.' },
                { tone: 'good', said: 'Checking the official announcement first', tag: 'Good call', title: 'Look for the source, then share.',
                  body: 'Search for the announcement from the body that sets prices, or a news outlet you trust. If you cannot find it, treat it as unconfirmed. Then tell the group what you found, which helps everyone.' },
                { tone: 'ok', said: 'Replying \u201Cis this true?\u201D and waiting', tag: 'Better than forwarding', title: 'Asking helps, checking helps more.',
                  body: 'Asking slows the rumour down. But the group may not know either, so do the check yourself and report back.' }
            ],
            remember: 'Urgency, \u201Cforward to everyone,\u201D and no source: the classic rumour pattern.'
        },
        {
            id: 'bank-call', pillar: 'people', title: 'The bank is calling', blurb: 'A caller wants the code you just received',
            head: { avatar: 'B', name: 'Incoming call', sub: 'Says they are from your bank' },
            items: [
                { t: 'note', text: 'Call connected' },
                { t: 'them', text: 'Good afternoon. This is your bank\u2019s fraud team. Someone is taking money from your account right now.' },
                { t: 'them', text: 'To stop it, I\u2019ve just sent you a code. Read it out to me and I\u2019ll block the transaction.' }
            ],
            options: [
                { tone: 'bad', said: 'Reading out the code', tag: 'This is the scam', title: 'That code is the key to your account.',
                  body: 'A one-time code proves that you are the one logging in. A real bank does not need you to read it back to them. Reading it out hands the thief the key.' },
                { tone: 'good', said: 'Hanging up, then calling the number on my bank card', tag: 'Good call', title: 'End the call, then verify yourself.',
                  body: 'Callers can fake names and sound very official. Hanging up and contacting the bank through a number or app you already trust puts you back in control. If there is a real problem, the bank will confirm it.' },
                { tone: 'ok', said: 'Asking for their name and staff number first', tag: 'Better than complying', title: 'A scammer will just invent one.',
                  body: 'Asking questions is wise, but any name or number given on the call can be made up. Verification has to come from outside the call.' }
            ],
            remember: 'Never share a one-time code. Verify by contacting the organisation yourself.'
        },
        {
            id: 'fun-quiz', pillar: 'people', title: 'Just a fun quiz', blurb: 'A post asks for your \u201Csuperhero name\u201D details',
            head: { avatar: 'Q', name: 'Friend\u2019s post', sub: 'Shared on your feed' },
            items: [
                { t: 'note', text: 'Post with 212 comments' },
                { t: 'them', text: 'Find your superhero name! Comment with: your first pet + the street you grew up on + your mother\u2019s maiden name \u26A1' }
            ],
            options: [
                { tone: 'bad', said: 'Commenting with my real answers', tag: 'Risky choice', title: 'You just posted your password hints.',
                  body: 'Those are the questions many accounts use to reset passwords. Posted in public, they help someone take over your accounts or pretend to be you.' },
                { tone: 'good', said: 'Skipping it and telling my friend why', tag: 'Good call', title: 'Skip it, and protect your friend too.',
                  body: 'Quizzes like this can be used to collect answers that double as security questions. A quick message to your friend helps them clean up their post.' },
                { tone: 'ok', said: 'Commenting with made-up answers', tag: 'Safer, but still risky', title: 'Better than the truth, not as good as skipping.',
                  body: 'Fake answers protect you, but you still help the post spread, and you get used to answering these prompts. Skipping is easier and safer.' }
            ],
            remember: 'If a fun quiz asks for facts you would use as password hints, it is not just a game.'
        },
        {
            id: 'cracked-phone', pillar: 'planet', title: 'Cracked screen', blurb: 'Bin it or keep it going?',
            head: { avatar: 'T', name: 'A friend', sub: 'Message' },
            items: [
                { t: 'note', text: 'Your phone slipped. The screen is cracked, but everything still works.' },
                { t: 'them', text: 'Ouch! Just bin it and buy a new one. They\u2019re cheap now.' }
            ],
            options: [
                { tone: 'bad', said: 'Binning it and buying a new one', tag: 'Risky choice', title: 'The costliest option for the planet.',
                  body: 'Much of a phone\u2019s carbon footprint comes from making it, and dumped phones leak harmful materials. In 2022, less than 1% of e-waste in African countries was documented as formally collected and recycled (Global E-waste Monitor 2024).' },
                { tone: 'good', said: 'Asking a repairer what a new screen would cost', tag: 'Good call', title: 'The greenest phone is the one you own.',
                  body: 'Using a working phone for longer avoids the footprint of making another. Compare the repair price with a replacement. If it is truly beyond repair, hand it on or take it to a proper collection point.' },
                { tone: 'ok', said: 'Putting it in a drawer and buying a new one', tag: 'Not dumped, but not used', title: 'Idle devices are a hidden waste.',
                  body: 'At least it is not in the bin. But small devices often sit forgotten in cupboards for years. A working phone can be repaired, passed on, or recycled properly.' }
            ],
            remember: 'Repair and reuse come before recycling, and recycling comes before the bin.'
        },
        {
            id: 'eco-claim', pillar: 'planet', title: '\u201C100% green\u201D', blurb: 'An advert makes a big claim',
            head: { avatar: 'Ad', name: 'Sponsored post', sub: 'In your feed' },
            items: [
                { t: 'note', text: 'Sponsored' },
                { t: 'them', text: 'NEW: the Eco+ phone. 100% green. Saves the planet. Buy now!' }
            ],
            options: [
                { tone: 'bad', said: 'Buying it, it says green', tag: 'Risky choice', title: '\u201CGreen\u201D is not a measurement.',
                  body: 'Words like \u201Ceco\u201D and \u201Cgreen\u201D with no numbers and no named checker are a hallmark of greenwashing: marketing that sounds good but proves nothing.' },
                { tone: 'good', said: 'Looking for specifics: what, who checked, can I repair it?', tag: 'Good call', title: 'Real claims can be measured and checked.',
                  body: 'Look for figures and an independent checker. Ask whether the battery can be replaced, how long repairs and updates are supported, and whether there is a take-back scheme.' },
                { tone: 'ok', said: 'Sharing it. Green ideas deserve support', tag: 'Good intention, weak check', title: 'Support the idea, not the advert.',
                  body: 'Your heart is in the right place, but passing on an unchecked claim helps the advertiser more than the planet. Check it first, then decide.' }
            ],
            remember: 'A real environmental claim can be measured, named, and checked.'
        },
        {
            id: 'cheap-charger', pillar: 'planet', title: 'The two-dollar charger', blurb: 'A bargain at the market stall',
            head: { avatar: 'S', name: 'Market stall', sub: 'Phone accessories' },
            items: [
                { t: 'them', text: 'Fast charger, works with every phone. Only $2!' },
                { t: 'them', text: 'Same as the branded one, just no box.' }
            ],
            options: [
                { tone: 'bad', said: 'Buying it. It\u2019s a bargain', tag: 'Risky choice', title: 'The low price hides the cost.',
                  body: 'Untested chargers can overheat, damage batteries, and cause fires. A damaged battery shortens your phone\u2019s life, which creates more e-waste.' },
                { tone: 'good', said: 'Buying from a reputable seller, ideally the phone maker\u2019s own', tag: 'Good call', title: 'Protect the battery, protect the phone.',
                  body: 'A proper charger is safer at home and helps the battery last, so the phone stays in use for years. Longer life is one of the best things you can do for the planet.' },
                { tone: 'ok', said: 'Asking the seller for a warranty', tag: 'Good instinct', title: 'A seller\u2019s answer tells you something.',
                  body: 'If a seller cannot offer any guarantee, that is a warning. But a warranty on a $2 charger will not cover a house fire, so a reputable brand is still the safer choice.' }
            ],
            remember: 'A phone lasts as long as its battery and charger allow. Cheap accessories can cost more.'
        },
        {
            id: 'overpayment', pillar: 'prosperity', title: 'Paid too much', blurb: 'A new client overpays and asks for a refund',
            head: { avatar: 'C', name: 'New client', sub: 'Message request' },
            items: [
                { t: 'them', text: 'Hello! Love your portfolio. I need a logo and three posters. My budget is $300.' },
                { t: 'sms', label: 'Payment alert', text: 'Pending: USD 500.00 received (awaiting clearance).' },
                { t: 'them', text: 'Oops, my assistant sent $500! Please refund the extra $200 and you can start right away.' }
            ],
            options: [
                { tone: 'bad', said: 'Sending back $200 now', tag: 'This is the scam', title: 'The payment can vanish. Your $200 will not.',
                  body: 'This is the overpayment scam. A \u201Cpending\u201D payment can be fake or reversed later, but the real money you refund is gone for good.' },
                { tone: 'good', said: 'Agreeing the price and using a payment method that protects us both', tag: 'Good call', title: 'Never send \u201Cchange\u201D.',
                  body: 'Agree on the exact amount, use a method that protects both sides, and never refund an overpayment until the money has fully cleared in your own account. A real client can simply correct the mistake.' },
                { tone: 'ok', said: 'Starting the logo while the payment clears', tag: 'Careful, but late', title: 'Do not work on a promise.',
                  body: 'Doing the work first gives away your time and skills before anything is settled. Ask for the agreed amount, or a deposit, cleared before you start.' }
            ],
            remember: 'If someone pays more than agreed and asks for money back, stop and check.'
        },
        {
            id: 'job-fee', pillar: 'prosperity', title: 'A job overseas', blurb: 'You are \u201Cselected\u201D, if you pay a fee',
            head: { avatar: 'J', name: 'Recruiter', sub: 'Job offer by message' },
            items: [
                { t: 'them', text: 'Congratulations! You are selected for a hotel job overseas. Salary $1,200 a month, accommodation included.' },
                { t: 'them', text: 'To secure your place, send a $60 processing fee today. Only 3 spots left!' }
            ],
            options: [
                { tone: 'bad', said: 'Paying the $60 before the spots go', tag: 'Risky choice', title: 'Fees and deadlines are red flags.',
                  body: 'Real employers rarely ask candidates to pay just to be hired, and fake deadlines are used to stop you thinking. Once you pay, the recruiter usually disappears.' },
                { tone: 'good', said: 'Checking the employer and agency independently, and not paying', tag: 'Good call', title: 'Verify from outside the message.',
                  body: 'Look for the company\u2019s official website and contact details, and check whether the agency is registered with the relevant authority. Talk to someone you trust before you send anything.' },
                { tone: 'ok', said: 'Asking for a contract first', tag: 'Right instinct', title: 'Fake contracts exist too.',
                  body: 'Asking for a contract is sensible, but scammers can produce convincing documents. You still need to confirm the employer and the agency yourself.' }
            ],
            remember: 'A real opportunity survives checking. A scam needs you to hurry.'
        },
        {
            id: 'ai-sources', pillar: 'prosperity', title: 'The AI\u2019s sources', blurb: 'A chatbot gives you three references',
            head: { avatar: 'AI', name: 'AI chatbot', sub: 'Helping with your project' },
            items: [
                { t: 'note', text: 'You asked: \u201CGive me three sources on solar power in rural schools.\u201D' },
                { t: 'them', text: '1) Moyo, T. (2021). Solar Power in Rural Schools. Rural Learning Review, 14(2), 45\u201361.\n2) Ncube, S. & Dube, L. (2019). Clean Energy and Classroom Outcomes. Southern Education Journal, 8(1), 12\u201330.\n3) Chikwanha, R. (2022). Powering the Rural Classroom. African Learning Studies, 5(3), 101\u2013118.' }
            ],
            options: [
                { tone: 'bad', said: 'Pasting them into my bibliography', tag: 'Risky choice', title: 'AI can invent convincing sources.',
                  body: 'AI tools can produce references that look perfect but do not exist. Handing in fake sources damages your credibility, however good the topic is.' },
                { tone: 'good', said: 'Searching for each one to confirm it exists and says what the AI claims', tag: 'Good call', title: 'Use AI to start, and your own check to finish.',
                  body: 'Look each source up in a library catalogue or search engine, and read enough to confirm it says what you need. Keep the ones that are real and drop the rest.' },
                { tone: 'ok', said: 'Asking the AI \u201Care these real?\u201D', tag: 'Weak check', title: 'The same tool cannot mark its own homework.',
                  body: 'The chatbot may simply repeat itself with confidence. It does not open a library catalogue. The check has to come from you, or from a source outside the chatbot.' }
            ],
            remember: 'AI can sound sure and still be wrong. Check anything you will rely on.'
        }
    ];

    var TONE_LABEL = { good: 'Best choice', ok: 'Could be better', bad: 'Risky choice' };
    var STORE_KEY = 'dlh.situations.v1';

    /* ---------------------------------------------------------------------- */
    var listEl = document.getElementById('s-list');
    var summaryEl = document.getElementById('s-summary');
    var phone = document.getElementById('s-phone');
    if (!listEl || !phone) return;

    var chat = phone.querySelector('.chat');
    var typing = phone.querySelector('.typing');
    var avatar = phone.querySelector('.phone-avatar');
    var nameEl = phone.querySelector('.phone-name');
    var subEl = phone.querySelector('.phone-sub');
    var reply = phone.querySelector('.reply');
    var replyOptions = phone.querySelector('.reply-options');
    var verdict = phone.querySelector('.verdict');
    var vTag = verdict.querySelector('.verdict-tag');
    var vTitle = verdict.querySelector('.verdict-title');
    var vBody = verdict.querySelector('.verdict-body');
    var vRemember = verdict.querySelector('.verdict-remember');
    var nextBtn = verdict.querySelector('[data-next]');
    var retryBtn = verdict.querySelector('[data-retry]');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var timers = [];
    var current = null;
    var results = load();

    function load() {
        try { return JSON.parse(window.localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
    }
    function save() {
        try { window.localStorage.setItem(STORE_KEY, JSON.stringify(results)); } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
    }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function toBottom() { chat.scrollTop = chat.scrollHeight; }
    function byId(id) { for (var i = 0; i < CASES.length; i++) { if (CASES[i].id === id) return CASES[i]; } return null; }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    /* ---- list + summary ---- */
    function renderList() {
        listEl.textContent = '';
        PILLARS.forEach(function (p) {
            var group = document.createElement('div');
            group.className = 's-group s-' + p.id;
            var h = document.createElement('h2');
            h.textContent = p.name;
            var line = document.createElement('p');
            line.className = 's-group-line';
            line.textContent = p.line;
            var ul = document.createElement('ul');
            CASES.filter(function (c) { return c.pillar === p.id; }).forEach(function (c) {
                var li = document.createElement('li');
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 's-case';
                b.setAttribute('data-case', c.id);
                if (current && current.id === c.id) b.setAttribute('aria-current', 'true');
                var t = document.createElement('span');
                t.className = 's-case-title';
                t.textContent = c.title;
                var d = document.createElement('span');
                d.className = 's-case-blurb';
                d.textContent = c.blurb;
                var st = document.createElement('span');
                var r = results[c.id];
                st.className = 's-case-status' + (r ? ' is-' + r : '');
                st.textContent = r ? TONE_LABEL[r] : 'Not tried yet';
                b.appendChild(t); b.appendChild(d); b.appendChild(st);
                b.addEventListener('click', function () { openCase(c.id, true); });
                li.appendChild(b);
                ul.appendChild(li);
            });
            group.appendChild(h); group.appendChild(line); group.appendChild(ul);
            listEl.appendChild(group);
        });
    }

    function renderSummary() {
        var done = CASES.filter(function (c) { return results[c.id]; }).length;
        summaryEl.textContent = '';
        var h = document.createElement('h2');
        h.textContent = 'Your pattern so far';
        summaryEl.appendChild(h);

        if (!done) {
            var p0 = document.createElement('p');
            p0.textContent = 'Try a situation and your results will appear here. They stay in this browser and are never uploaded.';
            summaryEl.appendChild(p0);
            return;
        }

        var dl = document.createElement('dl');
        dl.className = 's-tally';
        PILLARS.forEach(function (p) {
            var cases = CASES.filter(function (c) { return c.pillar === p.id; });
            var tried = cases.filter(function (c) { return results[c.id]; }).length;
            var best = cases.filter(function (c) { return results[c.id] === 'good'; }).length;
            var dt = document.createElement('dt');
            dt.textContent = p.name;
            var dd = document.createElement('dd');
            dd.textContent = best + ' best ' + (best === 1 ? 'choice' : 'choices') + ' from ' + tried + ' tried, of ' + cases.length;
            dl.appendChild(dt); dl.appendChild(dd);
        });
        summaryEl.appendChild(dl);

        var note = document.createElement('p');
        note.className = 's-note';
        note.textContent = done === CASES.length
            ? 'You have tried every situation. Try again on any you would change, then take the full assessment.'
            : (CASES.length - done) + ' to go. Each one takes about a minute.';
        summaryEl.appendChild(note);

        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'btn ghost small';
        reset.textContent = 'Clear my results';
        reset.addEventListener('click', function () {
            results = {};
            save();
            renderList();
            renderSummary();
        });
        summaryEl.appendChild(reset);
    }

    /* ---- phone ---- */
    function makeMsg(item) {
        var el = document.createElement('div');
        el.setAttribute('data-step', '');
        if (item.t === 'sms') {
            el.className = 'msg sms';
            var b = document.createElement('b');
            b.textContent = item.label || 'New message';
            el.appendChild(b);
            el.appendChild(document.createTextNode(item.text));
        } else if (item.t === 'note') {
            el.className = 'msg note';
            el.textContent = item.text;
        } else {
            el.className = 'msg them';
            el.textContent = item.text;
        }
        return el;
    }

    function openCase(id, focusPhone) {
        var c = byId(id);
        if (!c) return;
        clearTimers();
        current = c;

        // reset chat
        [].slice.call(chat.querySelectorAll('.msg')).forEach(function (n) { n.parentNode.removeChild(n); });
        typing.classList.remove('on');
        avatar.textContent = c.head.avatar;
        nameEl.textContent = c.head.name;
        subEl.textContent = c.head.sub;
        phone.setAttribute('aria-label', 'Situation: ' + c.title);
        phone.classList.add('is-live');
        verdict.hidden = true;
        reply.hidden = false;
        reply.classList.remove('is-ready');

        // options, shuffled so the answer is never in a fixed position
        replyOptions.textContent = '';
        shuffle(c.options).forEach(function (o) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = o.said;
            b.disabled = true;
            b.addEventListener('click', function () { choose(o); });
            replyOptions.appendChild(b);
        });

        var els = c.items.map(function (it) {
            var n = makeMsg(it);
            chat.insertBefore(n, typing);
            return n;
        });

        function ready() {
            reply.classList.add('is-ready');
            [].slice.call(replyOptions.querySelectorAll('button')).forEach(function (b) { b.disabled = false; });
        }

        if (reduceMotion) {
            els.forEach(function (n) { n.classList.add('shown'); });
            ready();
        } else {
            var t = 300;
            els.forEach(function (n) {
                if (n.classList.contains('them')) {
                    (function (at) { later(function () { typing.classList.add('on'); toBottom(); }, at); })(t);
                    t += 850;
                } else {
                    t += 350;
                }
                (function (node, at) { later(function () { typing.classList.remove('on'); node.classList.add('shown'); toBottom(); }, at); })(n, t);
            });
            later(ready, t + 300);
        }

        renderList();
        if (focusPhone) {
            var top = phone.getBoundingClientRect().top;
            if (top < 0 || top > window.innerHeight * 0.5) {
                phone.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            }
        }
    }

    function choose(o) {
        var c = current;
        if (!c) return;
        var me = document.createElement('div');
        me.className = 'msg me shown';
        me.setAttribute('data-step', '');
        me.textContent = o.said;
        chat.insertBefore(me, typing);

        results[c.id] = o.tone;
        save();

        verdict.setAttribute('data-tone', o.tone);
        vTag.textContent = o.tag;
        vTitle.textContent = o.title;
        vBody.textContent = o.body;
        vRemember.textContent = c.remember;
        reply.hidden = true;
        verdict.hidden = false;
        toBottom();
        verdict.focus({ preventScroll: true });

        renderList();
        renderSummary();
    }

    function nextCase() {
        var i = CASES.indexOf(current);
        for (var k = 1; k <= CASES.length; k++) {
            var c = CASES[(i + k) % CASES.length];
            if (!results[c.id]) { openCase(c.id, true); return; }
        }
        // all done: go to the summary
        summaryEl.setAttribute('tabindex', '-1');
        summaryEl.focus();
        summaryEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }

    nextBtn.addEventListener('click', nextCase);
    retryBtn.addEventListener('click', function () { openCase(current.id, false); chat.focus({ preventScroll: true }); });

    // first load: open the first case not yet tried
    renderSummary();
    var first = CASES.filter(function (c) { return !results[c.id]; })[0] || CASES[0];
    openCase(first.id, false);
})();
