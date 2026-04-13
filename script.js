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

// Quiz Functionality
document.getElementById('quizForm')?.addEventListener('submit', handleQuizSubmit);

function handleQuizSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const answers = {
        q1: form.q1.value,
        q2: form.q2.value,
        q3: form.q3.value,
        q4: form.q4.value,
        q5: form.q5.value
    };
    
    // Calculate fit score
    let score = 0;
    if (answers.q1 === 'yes') score++;
    if (answers.q2 === 'yes') score++;
    if (answers.q3 === 'yes') score++;
    if (answers.q4 === 'yes') score++;
    
    // Generate personalized result
    const resultsText = generateQuizResults(score, answers);
    
    // Show results
    document.getElementById('quizContainer').style.display = 'none';
    const resultsDiv = document.getElementById('quizResults');
    document.getElementById('resultsText').textContent = resultsText;
    resultsDiv.style.display = 'block';
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
