(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initPhishingDetector();
        initPasswordLab();
        initDigitalFootprint();
        initFactOrFake();
        initSourceChecker();
        initAISpotProblem();
        initPlanetActivity();
        initPeopleScenario();
    });


    function initPhishingDetector() {
        var feedback = document.getElementById('phish-feedback');
        if (!feedback) return;

        document.querySelectorAll('[data-phish]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var safe = btn.dataset.phish === 'safe';
                feedback.className = 'feedback ' + (safe ? 'success' : 'error');
                feedback.innerHTML = (safe
                    ? '<strong>Good choice.</strong> Pausing to verify the sender and request through a trusted channel is the safest response. Urgency, prizes, and requests for sensitive information are common warning signs.'
                    : '<strong>Risky.</strong> Messages that create urgency, offer unexpected prizes, or ask for passwords and personal details are common phishing tactics. Do not click suspicious links or share sensitive information.')
                + '<br><br><em>Remember: legitimate organisations will not ask for your password or OTP via message.</em>';
            });
        });
    }

    function initPasswordLab() {
        var input = document.getElementById('passwordInput');
        var resultEl = document.getElementById('pw-result');
        var barEl = document.getElementById('pw-bar');
        var detailEl = document.getElementById('pw-detail');
        if (!input) return;

        if (resultEl) resultEl.setAttribute('aria-live', 'polite');

        var COMMON = ['password', 'passw0rd', 'qwerty', 'letmein', 'welcome', 'admin', 'iloveyou', 'abc123', 'monkey', 'football', 'harare', 'zimbabwe', 'bulawayo'];

        function assess(val) {
            var lower = val.toLowerCase();
            var words = val.split(/[\s\-_.]+/).filter(function(w) { return w.length > 1; });
            var tips = [];
            var score;

            var allDigits = /^\d+$/.test(val);
            var repeated = /^(.)\1+$/.test(val);
            var sequence = /(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/.test(lower);
            var common = COMMON.some(function(w) { return lower.indexOf(w) !== -1; });

            if (val.length < 8) score = 0;
            else if (val.length < 12) score = 1;
            else if (val.length < 16) score = 2;
            else score = 3;

            if (val.length >= 16 && words.length >= 4) score = 4;

            if (allDigits || repeated || sequence || common) {
                score = Math.min(score, 1);
                tips.push('avoid common words, names, and patterns like 1234 or qwerty');
            }
            if (val.length < 12) tips.push('length matters most: aim for 12 or more characters');
            if (words.length < 4 && val.length < 16) tips.push('try a passphrase of four or more unrelated words');
            tips.push('use a different password for every account');
            return { score: score, tips: tips };
        }

        input.addEventListener('input', function() {
            var val = input.value;
            var labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
            var colors = ['#c62d2d', '#c25e00', '#a8620a', '#1b7f4b', '#0e2747'];

            if (!val) {
                if (resultEl) { resultEl.textContent = 'No password entered'; resultEl.style.color = ''; }
                if (barEl) { barEl.style.width = '0%'; }
                if (detailEl) { detailEl.textContent = 'Start typing to see feedback.'; }
                return;
            }

            var r = assess(val);
            if (resultEl) { resultEl.textContent = labels[r.score]; resultEl.style.color = colors[r.score]; }
            if (barEl) { barEl.style.width = (Math.max(r.score, 0.5) * 25) + '%'; barEl.style.background = colors[r.score]; }
            if (detailEl) {
                detailEl.textContent = r.score >= 4
                    ? 'Long and hard to guess. Never reuse it, and never type a real password into a practice tool.'
                    : 'Tip: ' + r.tips.slice(0, 3).join('; ') + '.';
            }
        });
    }


    function initDigitalFootprint() {
        var container = document.getElementById('footprint');
        if (!container) return;

        var actions = [
            { label: 'Posting publicly', weight: 3 },
            { label: 'Sharing location', weight: 4 },
            { label: 'Creating accounts', weight: 2 },
            { label: 'Commenting', weight: 2 },
            { label: 'Sharing photographs', weight: 3 },
            { label: 'Joining online communities', weight: 1 }
        ];

        var resultEl = document.getElementById('footprint-result');
        var footprintTotal = document.getElementById('footprint-total');
        var selected = {};

        var chipsDiv = document.createElement('div');
        chipsDiv.className = 'footprint-actions';
        actions.forEach(function(a) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'footprint-chip';
            chip.textContent = a.label;
            chip.dataset.weight = a.weight;
            chip.addEventListener('click', function() {
                var isSelected = chip.classList.toggle('selected');
                if (isSelected) { selected[a.label] = a.weight; }
                else { delete selected[a.label]; }
                updateFootprint();
            });
            chipsDiv.appendChild(chip);
        });
        container.appendChild(chipsDiv);

        function updateFootprint() {
            var total = Object.values(selected).reduce(function(s, v) { return s + v; }, 0);
            var level = total > 10 ? 'High visibility' : total > 4 ? 'Moderate visibility' : 'Low visibility';
            var msg = '<strong>' + level + '</strong> (' + total + ' impact points). ';
            if (total > 10) {
                msg += 'Your selections suggest many public-facing actions. Consider: Who can see this? Could this be used without your permission? Is this necessary to share?';
            } else if (total > 4) {
                msg += 'Be mindful of what you share publicly. Each action contributes to your digital footprint, which can be saved, copied, and seen by others.';
            } else {
                msg += 'Your footprint appears limited. Remember that even small actions leave traces. Always think before sharing.';
            }
            if (resultEl) { resultEl.className = 'feedback'; resultEl.innerHTML = msg; }
            if (footprintTotal) { footprintTotal.textContent = total; }
        }
    }


    function initFactOrFake() {
        document.querySelectorAll('[data-fact]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var container = btn.closest('.info-card, .lab-card, .scenario');
                var resultId = btn.dataset.factResult;
                var result = document.getElementById(resultId);
                if (!result) return;

                var isCorrect = btn.dataset.correct === 'true';
                container.querySelectorAll('[data-fact]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                result.className = 'feedback ' + (isCorrect ? 'success' : 'error') + ' show';
                result.innerHTML = isCorrect
                    ? '<strong>Good judgement.</strong> Checking the source, date, author and evidence before accepting a claim is the most reliable way to evaluate information.'
                    : '<strong>Reconsider.</strong> Reliable information should have a named source, publication date, evidence, and be verifiable through multiple trustworthy sources.';
            });
        });
    }

    function initSourceChecker() {
        document.querySelectorAll('[data-source-check]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.dataset.sourceCheck;
                var result = document.getElementById(id);
                if (!result) return;

                var isCorrect = btn.dataset.correct === 'true';
                var container = btn.closest('.lab-card');
                container.querySelectorAll('[data-source-check]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                var checklist = result.querySelector('.source-checklist');
                if (checklist) {
                    checklist.querySelectorAll('li').forEach(function(li) {
                        var ind = li.querySelector('.indicator');
                        if (ind) { ind.className = 'indicator ' + (isCorrect ? 'good' : 'bad'); }
                    });
                }
                result.className = 'feedback ' + (isCorrect ? 'success' : 'error') + ' show';
                result.innerHTML = isCorrect
                    ? '<strong>Correct.</strong> Good judgement. Always check for named authorship, publication date, cited evidence, and links to official resources.'
                    : '<strong>Not quite.</strong> This source lacks key reliability indicators: no named author, no publication date, no evidence, and no verifiable references.';
            });
        });
    }

    function initAISpotProblem() {
        document.querySelectorAll('[data-ai-problem]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var container = btn.closest('.ai-demo');
                if (!container) return;
                var isCorrect = btn.dataset.aiProblem === 'correct';
                var feedback = container.querySelector('.ai-feedback');
                if (!feedback) return;

                container.querySelectorAll('[data-ai-problem]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                feedback.className = 'ai-message ' + (isCorrect ? 'success' : 'error') + ' show';
                feedback.style.display = 'block';
                feedback.innerHTML = isCorrect
                    ? '<strong>Well spotted.</strong> The AI generated false information about Mount Everest being in Africa. Always verify factual claims from AI against reliable sources before trusting them.'
                    : '<strong>Not quite.</strong> The key error here is a factual one: Mount Everest is located in Asia, not Africa. AI models can produce confident-sounding but incorrect information.';
            });
        });
    }

    function initPlanetActivity() {
        document.querySelectorAll('[data-planet]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var container = btn.closest('.activity-card');
                if (!container) return;
                var isCorrect = btn.dataset.planet === 'correct';
                var feedback = container.querySelector('.planet-feedback');
                if (!feedback) return;

                container.querySelectorAll('[data-planet]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                feedback.className = 'feedback ' + (isCorrect ? 'success' : 'error') + ' show';
                feedback.innerHTML = isCorrect
                    ? '<strong>Correct.</strong> Reducing unnecessary digital waste, turning off unused devices, and using technology thoughtfully all contribute to environmental protection.'
                    : '<strong>Not quite.</strong> Consider the full lifecycle of digital devices: production, energy use, and disposal. Thoughtful and sustainable digital habits help protect the planet.';
            });
        });
    }

    function initPeopleScenario() {
        document.querySelectorAll('[data-scenario]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var container = btn.closest('.scenario');
                if (!container) return;
                var isCorrect = btn.dataset.correct === 'true';
                var feedback = container.querySelector('.scenario-feedback');
                if (!feedback) return;

                container.querySelectorAll('[data-scenario]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                feedback.className = 'scenario-feedback show ' + (isCorrect ? 'success' : 'warning');
                var strong = feedback.querySelector('strong');
                if (strong) strong.textContent = isCorrect ? 'Correct.' : 'Not quite.';
            });
        });
    }
})();