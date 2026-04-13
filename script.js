// ============================================
// DENTAL AI SOLUTIONS - SCRIPT.JS
// ============================================

// Modal Management
function openModal(type) {
    const modal = document.getElementById(type + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const type = modal.id.replace('-modal', '');
            closeModal(type);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const type = modal.id.replace('-modal', '');
            closeModal(type);
        });
    }
});

// Scroll to section
function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Handlers
function handleAssessment(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thanks for completing the assessment! We'll send personalized recommendations to ${email}`);
    closeModal('assessment');
    e.target.reset();
}

function handleEnrollment(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    alert(`Welcome to the program, ${name}! You'll receive enrollment details at the email provided.`);
    closeModal('enrollment');
    e.target.reset();
}

function handleContact(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    alert(`Thanks for reaching out, ${name}! We'll get back to you soon.`);
    closeModal('contact');
    e.target.reset();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.program-card, .transform-item, .testimonial, .situation-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('modal')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add active state to nav links based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Any additional initialization can go here
    console.log('Dental AI Solutions website loaded');
});
