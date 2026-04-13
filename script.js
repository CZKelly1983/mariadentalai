// ============================================
// DENTAL AI SOLUTIONS — From Chairside to AI
// ============================================

// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile Menu
document.getElementById('mobileMenuToggle')?.addEventListener('click', function () {
    document.getElementById('navMenu').classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navMenu')?.classList.remove('active'));
});

// ── Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const top = document.querySelector(href).getBoundingClientRect().top + window.scrollY - 80;
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
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.program-card, .resource-card, .change-item, .testimonial, .fit-card, .cred-item, .stat-box').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(el);
});

// ── Modals
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (type === 'quiz') initQuiz();
}
function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
        question: 'How long have you been working as a dental professional?',
        options: [
            { text: '5 or more years', value: 'yes' },
            { text: 'Less than 5 years', value: 'no' }
        ]
    },
    {
        id: 'q2',
        question: 'How interested are you in working remotely or with a more flexible schedule?',
        options: [
            { text: 'Very interested — flexibility is a priority for me', value: 'yes' },
            { text: 'I am still figuring out what I want', value: 'no' }
        ]
    },
    {
        id: 'q3',
        question: 'Have you had any exposure to digital tools or technology beyond standard practice software?',
        options: [
            { text: 'Yes — I have some familiarity', value: 'yes' },
            { text: 'Not really', value: 'no' }
        ]
    },
    {
        id: 'q4',
        question: 'How important is having a mentor guide you through this transition?',
        options: [
            { text: 'Very important — I want personalised support', value: 'yes' },
            { text: 'I prefer to learn independently', value: 'no' }
        ]
    },
    {
        id: 'q5',
        question: 'What is your biggest concern about making a career change?',
        options: [
            { text: 'The financial investment required', value: 'cost' },
            { text: 'Finding the time while still working', value: 'time' },
            { text: 'Whether I am qualified enough for tech roles', value: 'qualify' },
            { text: 'Finding genuine job opportunities', value: 'opportunity' }
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
            padding:12px 16px;
            border:1.5px solid #e4e8ef;
            border-radius:6px; cursor:pointer;
            transition:all 0.18s;
            font-size:14px; color:#3d4a5c;
            font-family:Inter,sans-serif;
            background:#fafafa;
            user-select:none;
        `;

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `q_${index}`;
        radio.value = opt.value;
        radio.style.cssText = 'accent-color:#cca197; width:15px; height:15px; flex-shrink:0;';
        if (quizAnswers[q.id] === opt.value) {
            radio.checked = true;
            label.style.borderColor = '#cca197';
            label.style.background = 'rgba(204,161,151,0.07)';
        }

        radio.addEventListener('change', () => {
            container.querySelectorAll('label').forEach(l => {
                l.style.borderColor = '#e4e8ef';
                l.style.background = '#fafafa';
            });
            label.style.borderColor = '#cca197';
            label.style.background = 'rgba(204,161,151,0.07)';
        });

        label.addEventListener('mouseover', () => {
            if (!radio.checked) label.style.borderColor = '#cca197';
        });
        label.addEventListener('mouseout', () => {
            if (!radio.checked) label.style.borderColor = '#e4e8ef';
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(opt.text));
        container.appendChild(label);
    });

    document.getElementById('backBtn').style.display = index === 0 ? 'none' : 'inline-flex';
    document.getElementById('nextBtn').textContent = index === quizQuestions.length - 1 ? 'See My Results' : 'Next';
}

function handleQuizNext(event) {
    event.preventDefault();
    const selected = document.querySelector(`input[name="q_${currentQuestion}"]:checked`);
    if (!selected) {
        const container = document.getElementById('optionsContainer');
        container.style.outline = '2px solid #cca197';
        container.style.borderRadius = '8px';
        setTimeout(() => { container.style.outline = 'none'; }, 900);
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
    let score = ['q1','q2','q3','q4'].filter(k => quizAnswers[k] === 'yes').length;

    let result;
    if (score >= 4) {
        result = "You are an excellent fit. You have the experience, the clarity, and the mindset for this transition. Your years inside the dental industry are a genuine competitive advantage — most candidates applying for these roles simply do not have it.";
    } else if (score === 3) {
        result = "You are a strong fit. You have what it takes to make this transition. A discovery call would help identify which specific roles align best with your particular background and goals.";
    } else if (score === 2) {
        result = "You are a good fit, and the main thing holding you back is likely a lack of clarity — not capability. That is precisely what this program addresses, and it tends to shift quickly once you have the right guidance.";
    } else {
        result = "It sounds like you are still in the exploration phase, and that is completely fine. The free resources are the best starting point. Download the AI Starter Guide and see whether this path resonates with you.";
    }

    const concerns = {
        cost:        " Regarding cost: this program is $497, not $40,000. It is designed to be accessible for working professionals at every stage.",
        time:        " Regarding time: the program requires 5 to 8 hours per week over 6 weeks — designed specifically for people who are still working full-time.",
        qualify:     " Regarding qualifications: this is the most common concern we hear, and it is almost always the thing that shifts most during the program. Your clinical background is more relevant than you think.",
        opportunity: " Regarding job opportunities: direct company introductions are built into the program. You will not be cold-applying — you will be referred by someone the industry already trusts."
    };
    if (concerns[quizAnswers.q5]) result += concerns[quizAnswers.q5];

    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
    const screen = document.getElementById('quizResultsScreen');
    screen.style.display = 'block';
    document.getElementById('resultsText').textContent = result;
}

// ── Form handlers
function showSuccess(form, msg) {
    form.innerHTML = `<div style="text-align:center;padding:1.5rem 0;">
        <p style="font-size:28px;margin-bottom:0.75rem;">&#10003;</p>
        <p style="font-size:15px;font-weight:600;color:#222d44;">${msg}</p>
    </div>`;
    setTimeout(() => {
        const modal = form.closest('.modal');
        if (modal) closeModal(modal.id.replace('Modal', ''));
    }, 2600);
}
function downloadGuide(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showSuccess(e.target, `Check ${email} — your resource is on its way.`);
}
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showSuccess(e.target, `You are subscribed. Welcome to the community, ${email}.`);
}
function handleEnrollment(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    showSuccess(e.target, `Thank you, ${name}. Maria will be in touch within 24 hours.`);
}
