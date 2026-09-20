(function() {
    'use strict';

    var questions = [
        {
            category: 'Online Safety',
            question: 'What is the strongest password habit?',
            options: ['Reuse one simple password across sites', 'Use strong, unique passwords for each account', 'Write passwords on paper near your computer', 'Share passwords with trusted friends'],
            correct: 1,
            explanation: 'Unique, strong passwords for each account limit the damage if one service is breached.'
        },
        {
            category: 'Information Literacy',
            question: 'What is the first thing to check when you encounter a surprising news article?',
            options: ['The headline looks professional', 'Check the source, date, and author', 'See how many likes it has', 'Read the comments section'],
            correct: 1,
            explanation: 'Source, date, and author are the fundamental reliability indicators for any information.'
        },
        {
            category: 'Digital Citizenship',
            question: 'Someone posts an embarrassing photo of a classmate online without permission. What should you do?',
            options: ['Like the post to show support', 'Ignore it — it is not your concern', 'Encourage removal and report if necessary', 'Share it with others'],
            correct: 2,
            explanation: 'Respect and inclusion require standing against non-consensual sharing and supporting those affected.'
        },
        {
            category: 'AI Literacy',
            question: 'What should you do when an AI tool gives you an important factual answer?',
            options: ['Accept it immediately — AI is always accurate', 'Verify against reliable sources', 'Trust it if it sounds confident', 'Share it without checking'],
            correct: 1,
            explanation: 'AI can produce confident-sounding but incorrect information. Verification is essential.'
        },
        {
            category: 'Digital Finance',
            question: 'You receive a message asking you to verify your bank account by clicking a link. What should you do?',
            options: ['Click the link and enter your details', 'Ignore and delete the message', 'Contact your bank through a known trusted channel', 'Forward the message to friends'],
            correct: 2,
            explanation: 'Legitimate banks never ask you to verify accounts through message links. Use your bank\'s official contact method.'
        },
        {
            category: 'Environmental Responsibility',
            question: 'Which habit most reduces your devices\' environmental impact?',
            options: ['Keep all devices plugged in constantly', 'Turn off and unplug devices when not in use', 'Always buy the newest model available', 'Never recycle old electronics'],
            correct: 1,
            explanation: 'Reducing energy consumption and proper disposal are key to sustainable device use.'
        },
        {
            category: 'Online Safety',
            question: 'What does phishing typically try to do?',
            options: ['Improve your device performance', 'Trick you into revealing personal information', 'Block unwanted advertisements', 'Speed up your internet connection'],
            correct: 1,
            explanation: 'Phishing uses deceptive messages to steal sensitive information or install malware.'
        },
        {
            category: 'Information Literacy',
            question: 'Why is it important to check the publication date of online information?',
            options: ['Older content is always incorrect', 'Information can become outdated as conditions change', 'Dates are not important for online content', 'Newer content is always better'],
            correct: 1,
            explanation: 'Information changes over time. Outdated health, science, or policy content can be misleading.'
        },
        {
            category: 'Digital Citizenship',
            question: 'What is a respectful way to disagree with someone online?',
            options: ['Respond with personal insults', 'Ignore and block without explanation', 'Address the argument, not the person', 'Use mocking memes to make your point'],
            correct: 2,
            explanation: 'Respectful disagreement focuses on ideas and arguments, not personal attacks.'
        },
        {
            category: 'AI Literacy',
            question: 'Which personal detail is safe to share with an AI chatbot?',
            options: ['Your password', 'Your bank PIN', 'A general question about a topic', 'Your identification number'],
            correct: 2,
            explanation: 'Always protect passwords, PINs, and identification numbers. Ask general questions instead.'
        },
        {
            category: 'Digital Finance',
            question: 'What is a common sign of a fake giveaway or contest scam?',
            options: ['The prize is valuable', 'You are asked to pay a fee or share personal details', 'The website looks professional', 'Many people have entered'],
            correct: 1,
            explanation: 'Requiring payment or personal details to claim a prize is a classic scam indicator.'
        },
        {
            category: 'Environmental Responsibility',
            question: 'What is the best way to handle an old smartphone?',
            options: ['Put it in regular household waste', 'Check local recycling or collection programmes', 'Leave it in a drawer indefinitely', 'Give it to a stranger on the street'],
            correct: 1,
            explanation: 'Proper recycling programmes recover materials and prevent environmental contamination from e-waste.'
        }
    ];

    var qIndex = 0;
    var score = 0;
    var answered = false;
    var categoryScores = {};
    var categoryCounts = {};

    questions.forEach(function(q) {
        var cat = q.category;
        if (!categoryScores[cat]) { categoryScores[cat] = 0; categoryCounts[cat] = 0; }
    });

    var quizContainer = document.getElementById('quiz');
    if (!quizContainer) return;

    function renderQuiz() {
        quizContainer.innerHTML = '<div class="quiz-top"><span id="qNumber">QUESTION 1 / ' + questions.length + '</span><span id="score">0 correct</span></div>' +
            '<div class="quiz-progress"><i id="quizProgress" style="width:0%"></i></div>' +
            '<h2 id="question"></h2>' +
            '<div id="answers" class="choices"></div>' +
            '<div id="quizFeedback" class="feedback"></div>' +
            '<div class="actions"><button id="nextBtn" class="btn primary" disabled>Next question &#8594;</button></div>';

        var qNum = document.getElementById('qNumber');
        var scoreEl = document.getElementById('score');
        var qEl = document.getElementById('question');
        var aEl = document.getElementById('answers');
        var fbEl = document.getElementById('quizFeedback');
        var nextBtn = document.getElementById('nextBtn');
        var barEl = document.getElementById('quizProgress');

        qNum.textContent = 'QUESTION ' + (qIndex + 1) + ' / ' + questions.length;
        scoreEl.textContent = score + ' correct';
        barEl.style.width = ((qIndex) / questions.length * 100) + '%';
        qEl.textContent = questions[qIndex].question;
        aEl.innerHTML = '';
        answered = false;
        nextBtn.disabled = true;
        fbEl.textContent = '';
        fbEl.className = 'feedback';

        questions[qIndex].options.forEach(function(opt, k) {
            var btn = document.createElement('button');
            btn.className = 'choice';
            btn.type = 'button';
            btn.innerHTML = '<span class="check-mark"></span>' + opt;
            btn.addEventListener('click', function() { choose(k, btn); });
            aEl.appendChild(btn);
        });

        nextBtn.addEventListener('click', next);
    }

    function choose(k, btn) {
        if (answered) return;
        answered = true;

        var q = questions[qIndex];
        var allBtns = document.querySelectorAll('#answers .choice');
        allBtns.forEach(function(b) { b.disabled = true; });

        var fbEl = document.getElementById('quizFeedback');
        var scoreEl = document.getElementById('score');

        if (k === q.correct) {
            btn.classList.add('correct');
            var check = btn.querySelector('.check-mark');
            if (check) check.textContent = '\u2713';
            score++;
            categoryScores[q.category] = (categoryScores[q.category] || 0) + 1;
            fbEl.className = 'feedback success';
            fbEl.textContent = 'Correct. ' + q.explanation;
        } else {
            btn.classList.add('wrong');
            var check = btn.querySelector('.check-mark');
            if (check) check.textContent = '\u2717';
            var correctBtn = allBtns[q.correct];
            if (correctBtn) {
                correctBtn.classList.add('correct');
                var cCheck = correctBtn.querySelector('.check-mark');
                if (cCheck) cCheck.textContent = '\u2713';
            }
            fbEl.className = 'feedback warning';
            fbEl.textContent = 'Not quite. ' + q.explanation;
        }
        categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
        scoreEl.textContent = score + ' correct';
        document.getElementById('nextBtn').disabled = false;
    }

    function next() {
        qIndex++;
        if (qIndex < questions.length) {
            renderQuiz();
        } else {
            showResults();
        }
    }

    function showResults() {
        var catHTML = '';
        var cats = Object.keys(categoryScores);
        cats.sort();
        cats.forEach(function(cat) {
            var pct = categoryCounts[cat] > 0 ? Math.round(categoryScores[cat] / categoryCounts[cat] * 100) : 0;
            catHTML += '<div class="category-score"><h4>' + cat + '</h4><div class="pct">' + pct + '%</div></div>';
        });

        var pct = Math.round(score / questions.length * 100);
        var msg = pct >= 80
            ? 'Excellent work. You have a strong understanding of digital literacy. Keep learning and share your knowledge.'
            : pct >= 60
            ? 'Good progress. You have a solid foundation. Explore the areas where you scored lower to strengthen your skills.'
            : 'You have a starting foundation. Review the labs, practice the activities, and try the challenge again to build your knowledge.';

        try {
            localStorage.setItem('dlhAssessment', JSON.stringify({
                score: score,
                total: questions.length,
                percent: pct,
                categories: Object.keys(categoryScores).reduce(function(out, cat) {
                    out[cat] = categoryCounts[cat] > 0 ? Math.round(categoryScores[cat] / categoryCounts[cat] * 100) : 0;
                    return out;
                }, {}),
                completedAt: new Date().toISOString()
            }));
        } catch (e) {}

        quizContainer.innerHTML = '<div class="result">' +
            '<div class="eyebrow">CHALLENGE COMPLETE</div>' +
            '<div class="result-score">' + score + '/' + questions.length + '</div>' +
            '<div style="margin:8px 0 24px;">' + catHTML + '</div>' +
            '<h2>' + (pct >= 80 ? 'Digital Literacy Champion' : pct >= 60 ? 'Digital Literacy Advocate' : 'Digital Learner') + '</h2>' +
            '<p>' + msg + '</p>' +
            '<div class="result-actions">' +
            '<button class="btn primary" id="retryBtn">Take the Challenge Again</button>' +
            '<a class="btn ghost" href="pledge.html">Take the Pledge</a>' +
            '</div>' +
            '</div>';

        document.getElementById('retryBtn').addEventListener('click', function() {
            qIndex = 0;
            score = 0;
            answered = false;
            Object.keys(categoryScores).forEach(function(cat) {
                categoryScores[cat] = 0;
                categoryCounts[cat] = 0;
            });
            renderQuiz();
        });

        var exploreBtn = document.createElement('a');
        exploreBtn.className = 'btn ghost';
        exploreBtn.href = 'skills.html';
        exploreBtn.textContent = 'Explore Skills';
        document.querySelector('.result-actions').appendChild(exploreBtn);
    }

    renderQuiz();
})();