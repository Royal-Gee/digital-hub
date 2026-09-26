(function () {
    'use strict';

    var phone = document.querySelector('[data-scenario]');
    if (!phone) return;

    var chat = phone.querySelector('.chat');
    var typing = phone.querySelector('.typing');
    var steps = [].slice.call(chat.querySelectorAll('[data-step]'));
    var reply = phone.querySelector('.reply');
    var buttons = [].slice.call(reply.querySelectorAll('[data-choice]'));
    var verdict = phone.querySelector('.verdict');
    var tag = verdict.querySelector('.verdict-tag');
    var title = verdict.querySelector('.verdict-title');
    var body = verdict.querySelector('.verdict-body');
    var replay = verdict.querySelector('[data-replay]');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timers = [];
    var myBubble = null;

    var outcomes = {
        send: {
            tone: 'bad',
            tag: 'This is the scam',
            title: 'You would be out $20.',
            body: 'The \u201creceived\u201d notification was fake, so no money ever arrived. Scammers copy the look of real payment messages, then rush you so you never check.',
            said: 'Sending it back now'
        },
        check: {
            tone: 'good',
            tag: 'Good call',
            title: 'Check first, then decide.',
            body: 'Open your own mobile-money app or menu, not the message, and look at your balance. If nothing arrived, there is nothing to return. If money really did arrive by mistake, ask your provider to reverse it rather than sending it yourself.',
            said: 'Let me check my balance first'
        },
        ignore: {
            tone: 'ok',
            tag: 'Safe, and you can do better',
            title: 'Nobody loses, but you can learn more.',
            body: 'Checking your balance takes ten seconds and tells you whether anything arrived at all. Then report the number to your provider so the next person is protected.',
            said: 'Not replying. Blocking this number'
        }
    };

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function toBottom() { chat.scrollTop = chat.scrollHeight; }

    function show(el) {
        typing.classList.remove('on');
        el.classList.add('shown');
        toBottom();
    }

    function ready() {
        reply.classList.add('is-ready');
        buttons.forEach(function (b) { b.disabled = false; });
    }

    function play() {
        clearTimers();
        if (myBubble && myBubble.parentNode) myBubble.parentNode.removeChild(myBubble);
        myBubble = null;
        steps.forEach(function (el) { el.classList.remove('shown'); });
        typing.classList.remove('on');
        verdict.hidden = true;
        reply.hidden = false;
        reply.classList.remove('is-ready');
        buttons.forEach(function (b) { b.disabled = true; });
        phone.classList.add('is-live');

        if (reduceMotion) {
            steps.forEach(function (el) { el.classList.add('shown'); });
            ready();
            return;
        }

        var t = 500;
        steps.forEach(function (el) {
            var isChat = el.classList.contains('them');
            var gap = Number(el.getAttribute('data-delay')) || 1000;
            if (isChat) {
                (function (at) { later(function () { typing.classList.add('on'); toBottom(); }, at); })(t);
                t += gap;
            } else {
                t += 500;
            }
            (function (node, at) { later(function () { show(node); }, at); })(el, t);
        });
        later(ready, t + 400);
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var o = outcomes[btn.getAttribute('data-choice')];
            if (!o) return;
            buttons.forEach(function (b) { b.disabled = true; });

            myBubble = document.createElement('div');
            myBubble.className = 'msg me';
            myBubble.textContent = o.said;
            chat.insertBefore(myBubble, typing);

            verdict.setAttribute('data-tone', o.tone);
            tag.textContent = o.tag;
            title.textContent = o.title;
            body.textContent = o.body;
            reply.hidden = true;
            verdict.hidden = false;
            toBottom();
            verdict.focus({ preventScroll: true });
        });
    });

    if (replay) replay.addEventListener('click', function () {
        play();
        chat.focus({ preventScroll: true });
    });

    play();
})();
