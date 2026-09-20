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

    /* ── Phishing Detector ── */
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

    /* ── Password Lab ── */
    function initPasswordLab() {
        var input = document.getElementById('passwordInput');
        var resultEl = document.getElementById('pw-result');
        var barEl = document.getElementById('pw-bar');
        var detailEl = document.getElementById('pw-detail');
        if (!input) return;

        input.addEventListener('input', function() {
            var val = input.value;
            var score = 0;
            var feedback = [];

            if (val.length >= 12) { score++; }
            else { feedback.push('Use at least 12 characters'); }

            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) { score++; }
            else { feedback.push('Mix uppercase and lowercase letters'); }

            if (/\d/.test(val)) { score++; }
            else { feedback.push('Add numbers'); }

            if (/[^A-Za-z0-9]/.test(val)) { score++; }
            else { feedback.push('Add a special character like !@#$%'); }

            if (val.length > 0 && val.length < 8) { score = Math.max(0, score - 1); }

            var labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
            var colors = ['#b9473d', '#c4802a', '#c99b2e', '#087a5b', '#0b5d46'];
            var idx = Math.min(score, 4);

            if (resultEl) { resultEl.textContent = labels[idx]; resultEl.style.color = colors[idx]; }
            if (barEl) { barEl.style.width = (idx * 25) + '%'; barEl.style.background = colors[idx]; }
            if (detailEl) { detailEl.textContent = feedback.length ? 'Tip: ' + feedback.join('; ') + '.' : 'This is a strong password pattern.'; }
        });
    }

    /* ── Digital Footprint ── */
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

    /* ── Fact or Fake ── */
    function initFactOrFake() {
        document.querySelectorAll('[data-fact]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var container = btn.closest('.info-card, .lab-card, .scenario');
                var resultId = btn.dataset.factResult;
                var result = document.getElementById(resultId);
                if (!result) return;

                var isCorrect = btn.dataset.fact === 'true';
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

    /* ── Source Checker ── */
    function initSourceChecker() {
        document.querySelectorAll('[data-source-check]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.dataset.sourceCheck;
                var result = document.getElementById(id);
                if (!result) return;

                var isReliable = btn.dataset.reliable === 'true';
                var container = btn.closest('.lab-card');
                container.querySelectorAll('[data-source-check]').forEach(function(b) {
                    if (b !== btn) { b.disabled = true; b.style.opacity = '0.5'; }
                });
                btn.disabled = true;

                var checklist = result.querySelector('.source-checklist');
                if (checklist) {
                    checklist.querySelectorAll('li').forEach(function(li) {
                        var ind = li.querySelector('.indicator');
                        if (ind) { ind.className = 'indicator ' + (isReliable ? 'good' : 'bad'); }
                    });
                }
                result.className = 'feedback ' + (isReliable ? 'success' : 'error') + ' show';
            });
        });
    }

    /* ── AI Spot the Problem ── */
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

    /* ── Planet Activity ── */
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

    /* ── People Scenario ── */
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