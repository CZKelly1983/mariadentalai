// ============================================
// DENTAL AI SOLUTIONS — Script 2025
// ============================================

// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile Menu
document.getElementById('mobileMenuToggle')?.addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navMenu')?.classList.remove('active'));
});

// ── Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const offset = 80;
            const top = document.querySelector(href).getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.program-card, .resource-card, .change-item, .testimonial, .fit-card, .cred-item').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
});

// ── Modals
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (type === 'quiz') initQuiz();
    }
}
function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal.id.replace('Modal', ''));
    });
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id.replace('Modal', '')));
    }
});

// ── Quiz
const quizQuestions = [
    {
        id: 'q1',
        question: 'How many years have you been a dental hygienist?',
        options: [
            { text: '5+ years', value: 'yes' },
            { text: 'Less than 5 years', value: 'no' }
        ]
    },
    {
        id: 'q2',
        question: 'Are you interested in working remotely or flexibly?',
        options: [
            { text: 'Yes, very interested', value: 'yes' },
            { text: 'Not sure yet', value: 'no' }
        ]
    },
    {
        id: 'q3',
        question: 'Have you ever worked with tech tools beyond basic practice software?',
        options: [
            { text: 'Yes, somewhat familiar', value: 'yes' },
            { text: 'Not really', value: 'no' }
        ]
    },
    {
        id: 'q4',
        question: 'How important is having a mentor guide your transition?',
        options: [
            { text: 'Very — I want guidance', value: 'yes' },
            { text: 'I prefer to learn independently', value: 'no' }
        ]
    },
    {
        id: 'q5',
        question: "What's your biggest concern about making a career change?",
        options: [
            { text: 'Cost / financial commitment', value: 'cost' },
            { text: "Time — can't commit to long training", value: 'time' },
            { text: "I'm not qualified enough for tech", value: 'qualify' },
            { text: 'Finding real job opportunities', value: 'opportunity' }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = {};

function initQuiz() {
    currentQuestion = 0;
    quizAnswers = {};
    document.getElementById('quizResultsScreen').style.display = 'none';
    document.getElementById('quizForm').style.display = 'block';
    document.getElementById('quizProgress').style.display = 'block';
    showQuestion(0);
}

function showQuestion(index) {
    const q = quizQuestions[index];
    const progress = ((index + 1) / quizQuestions.length) * 100;

    document.getElementById('questionNumber').textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('questionText').textContent = q.question;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const label = document.createElement('label');
        label.style.cssText = `
            display:flex; align-items:center; gap:12px;
            padding:12px 16px; border:1.5px solid #E2D9CE;
            border-radius:8px; cursor:pointer; transition:all 0.18s;
            font-size:14px; color:#3D3D3D; font-family:inherit;
            background:#FAF7F2;
        `;

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `quiz_${index}`;
        radio.value = opt.value;
        radio.style.cssText = 'accent-color:#C4714A; width:16px; height:16px; flex-shrink:0;';
        if (quizAnswers[q.id] === opt.value) radio.checked = true;

        radio.addEventListener('change', () => {
            container.querySelectorAll('label').forEach(l => {
                l.style.borderColor = '#E2D9CE';
                l.style.background = '#FAF7F2';
            });
            label.style.borderColor = '#C4714A';
            label.style.background = 'rgba(196,113,74,0.07)';
        });

        label.addEventListener('mouseover', () => {
            if (!radio.checked) { label.style.borderColor = '#C4714A'; label.style.background = 'rgba(196,113,74,0.04)'; }
        });
        label.addEventListener('mouseout', () => {
            if (!radio.checked) { label.style.borderColor = '#E2D9CE'; label.style.background = '#FAF7F2'; }
        });

        const span = document.createElement('span');
        span.textContent = opt.text;

        label.appendChild(radio);
        label.appendChild(span);
        container.appendChild(label);

        // Restore selected state
        if (quizAnswers[q.id] === opt.value) {
            label.style.borderColor = '#C4714A';
            label.style.background = 'rgba(196,113,74,0.07)';
        }
    });

    document.getElementById('backBtn').style.display = index === 0 ? 'none' : 'flex';
    document.getElementById('nextBtn').textContent = index === quizQuestions.length - 1 ? 'See My Results →' : 'Next →';
}

function handleQuizNext(event) {
    event.preventDefault();
    const selected = document.querySelector(`input[name="quiz_${currentQuestion}"]:checked`);
    if (!selected) {
        // Highlight that a selection is needed
        document.getElementById('optionsContainer').style.outline = '2px solid #C4714A';
        setTimeout(() => document.getElementById('optionsContainer').style.outline = 'none', 800);
        return;
    }
    quizAnswers[quizQuestions[currentQuestion].id] = selected.value;
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        showQuizResults();
    }
}

function goToPreviousQuestion() {
    if (currentQuestion > 0) { currentQuestion--; showQuestion(currentQuestion); }
}

function showQuizResults() {
    let score = 0;
    if (quizAnswers.q1 === 'yes') score++;
    if (quizAnswers.q2 === 'yes') score++;
    if (quizAnswers.q3 === 'yes') score++;
    if (quizAnswers.q4 === 'yes') score++;

    let result = '';
    if (score >= 4) {
        result = "You're an excellent fit. You have the experience, the drive, and the mindset for this transition. You can start as soon as you're ready — and your insider understanding of dentistry is a genuine competitive advantage.";
    } else if (score === 3) {
        result = "You're a great fit. You have what it takes. The main thing that would help you right now is clarity on which specific tech roles are the best match for your background — that's exactly what the discovery call is for.";
    } else if (score === 2) {
        result = "You're a good fit, and the main thing holding you back is probably just lack of clarity or confidence about tech. That's the #1 thing we help with — and it shifts faster than you'd expect.";
    } else {
        result = "It sounds like you're still exploring — and that's completely okay. Our free resources are the perfect starting point. Download the AI Starter Guide and see if this path excites you.";
    }

    const concerns = {
        cost: " Your biggest concern is cost — which makes complete sense. But this program is $497, not $40K+. It's designed to be accessible for working hygienists.",
        time: " Time is your concern. The program is 5–8 hours per week for 6 weeks, designed specifically for people who are still working full-time.",
        qualify: " You're worried about whether you're qualified. This is the #1 doubt we hear — and it's almost always the thing that shifts most during the program. You're more qualified than you think.",
        opportunity: " Finding real jobs is your concern. That's exactly why we built direct company introductions into the program. You're not cold-applying — you're being referred."
    };
    if (concerns[quizAnswers.q5]) result += concerns[quizAnswers.q5];

    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
    document.getElementById('quizResultsScreen').style.display = 'block';
    document.getElementById('resultsText').textContent = result;
}

// ── Form Handlers
function downloadGuide(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showSuccess(event.target, `Thanks! Check ${email} for your download.`);
}
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showSuccess(event.target, `Welcome! You're subscribed at ${email}.`);
}
function handleEnrollment(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[type="text"]').value;
    showSuccess(event.target, `Thanks, ${name}! Maria will be in touch within 24 hours.`);
}
function showSuccess(form, message) {
    form.innerHTML = `
        <div style="text-align:center;padding:1rem 0;">
            <div style="font-size:2.5rem;margin-bottom:1rem;">✅</div>
            <p style="color:#1A1A1A;font-size:16px;font-weight:600;">${message}</p>
        </div>
    `;
    setTimeout(() => {
        const modal = form.closest('.modal');
        if (modal) closeModal(modal.id.replace('Modal', ''));
    }, 2500);
}

// ── Analytics
document.querySelectorAll('.btn-primary, .btn-nav-cta').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('[CTA]', this.textContent.trim());
    });
});

console.log('%c Maria · Dental AI Solutions', 'color:#C4714A;font-size:16px;font-weight:bold;');
