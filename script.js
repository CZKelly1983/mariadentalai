// ============================================
// DENTAL AI SOLUTIONS - INTERACTIVE FEATURES
// ============================================

// Mobile Menu Toggle
document.getElementById('mobileMenuToggle')?.addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navMenu')?.classList.remove('active');
    });
});

// Modal Functions
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize quiz when opening quiz modal
        if (modalType === 'quiz') {
            initQuiz();
        }
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const modalType = modal.id.replace('Modal', '');
            closeModal(modalType);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const modalType = modal.id.replace('Modal', '');
            closeModal(modalType);
        });
    }
});

// One-Question-at-a-Time Quiz
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
        question: 'Are you interested in working remotely?',
        options: [
            { text: 'Yes, very interested', value: 'yes' },
            { text: 'Not sure yet', value: 'no' }
        ]
    },
    {
        id: 'q3',
        question: 'Have you ever worked with tech tools (beyond practice software)?',
        options: [
            { text: 'Yes, somewhat familiar', value: 'yes' },
            { text: 'Not really', value: 'no' }
        ]
    },
    {
        id: 'q4',
        question: 'How important is having a mentor guide you through the transition?',
        options: [
            { text: 'Very important', value: 'yes' },
            { text: 'I prefer to learn independently', value: 'no' }
        ]
    },
    {
        id: 'q5',
        question: 'What\'s your biggest concern about making a career change?',
        options: [
            { text: 'Cost / financial commitment', value: 'cost' },
            { text: 'Time / can\'t commit to long training', value: 'time' },
            { text: 'Not qualified enough', value: 'qualify' },
            { text: 'Finding real job opportunities', value: 'opportunity' }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = {};

function initQuiz() {
    currentQuestion = 0;
    quizAnswers = {};
    showQuestion(0);
    document.getElementById('quizResultsScreen').style.display = 'none';
    document.getElementById('quizForm').style.display = 'block';
}

function showQuestion(index) {
    const question = quizQuestions[index];
    const progress = ((index + 1) / quizQuestions.length) * 100;
    
    // Update progress
    document.getElementById('questionNumber').textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Update question
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const label = document.createElement('label');
        label.style.cssText = `
            display: flex;
            align-items: center;
            padding: var(--spacing-md);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        label.onmouseover = () => {
            label.style.borderColor = 'var(--accent)';
            label.style.backgroundColor = 'rgba(216, 155, 111, 0.05)';
        };
        label.onmouseout = () => {
            label.style.borderColor = 'var(--border)';
            label.style.backgroundColor = 'transparent';
        };
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `quiz_${index}`;
        radio.value = option.value;
        radio.style.marginRight = 'var(--spacing-md)';
        
        if (quizAnswers[question.id] === option.value) {
            radio.checked = true;
        }
        
        const span = document.createElement('span');
        span.textContent = option.text;
        span.style.flex = '1';
        
        label.appendChild(radio);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });
    
    // Update button states
    document.getElementById('backBtn').style.display = index === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').textContent = index === quizQuestions.length - 1 ? 'See Results' : 'Next';
}

function handleQuizNext(event) {
    event.preventDefault();
    
    const selectedOption = document.querySelector(`input[name="quiz_${currentQuestion}"]:checked`);
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    quizAnswers[question.id] = selectedOption.value;
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        showQuizResults();
    }
}

function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showQuizResults() {
    // Calculate fit score
    let score = 0;
    if (quizAnswers.q1 === 'yes') score++;
    if (quizAnswers.q2 === 'yes') score++;
    if (quizAnswers.q3 === 'yes') score++;
    if (quizAnswers.q4 === 'yes') score++;
    
    const resultsText = generateQuizResults(score, quizAnswers);
    
    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('quizResultsScreen').style.display = 'block';
    document.getElementById('resultsText').textContent = resultsText;
}

function generateQuizResults(score, answers) {
    let result = '';
    
    if (score === 5) {
        result = "You're an excellent fit! You have the experience, interest, and mindset for this transition. We can start immediately. Your biggest advantage is understanding the dental industry from inside.";
    } else if (score === 4) {
        result = "You're a great fit! You have what it takes. The main thing you might benefit from is clarity on which tech roles are the best match for your specific background. Let's talk about that.";
    } else if (score === 3) {
        result = "You're a good fit! You have the foundation. The main thing holding you back is likely just lack of clarity or confidence about tech. That's exactly what we help with.";
    } else if (score === 2) {
        result = "You're a fit, but let's talk more. It sounds like you're still exploring. Our free discovery call would be perfect for you to understand if this is really the right path.";
    } else {
        result = "You might benefit from more exploration first. Our free resources are a great starting point. Download the AI Starter Guide and see if this path excites you.";
    }
    
    // Add concern-specific insight
    if (answers.q5 === 'cost') {
        result += " Your biggest concern is cost, which makes sense — but our program is $497, not $40K+. It's designed to be accessible.";
    } else if (answers.q5 === 'time') {
        result += " Time is your concern. The program is 5-8 hours per week for 6 weeks, designed for people who are still working.";
    } else if (answers.q5 === 'qualify') {
        result += " Your concern is qualification. This is the #1 doubt we hear, and it's usually the thing that shifts most in our program. You're more qualified than you think.";
    } else if (answers.q5 === 'opportunity') {
        result += " Finding jobs is your concern. That's exactly why we built in real company introductions. It's not about applying — it's about being referred.";
    }
    
    return result;
}

// Form Handlers
function downloadGuide(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Check your email (${email}) for the AI Starter Guide!`);
    closeModal('guide');
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Welcome to the community! Check ${email} for your first weekly insights.`);
    closeModal('newsletter');
}

function handleEnrollment(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[type="text"]').value;
    alert(`Welcome, ${name}! Check your email for enrollment details.`);
    closeModal('enroll');
    event.target.reset();
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.program-card, .resource-card, .change-card, .testimonial, .resource-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Analytics tracking (simple)
function trackClick(action) {
    console.log('User action:', action);
    // In production, send to Google Analytics or similar
}

// Track important CTAs
document.querySelectorAll('.btn-primary, .btn-nav-cta').forEach(btn => {
    btn.addEventListener('click', function() {
        trackClick('CTA clicked: ' + this.textContent);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dental AI Solutions website loaded');
});
