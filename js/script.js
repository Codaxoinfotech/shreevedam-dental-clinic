// Custom JavaScript for Shreevedam Dental Clinic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavbar();
    initializeContactForm();
    initializeAnimations();
    initializeCarousel();
    initializeSmoothScrolling();
    initializeCounters();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

function handleFormSubmission() {
    const formData = getFormData();
    const messageDiv = document.getElementById('formMessage');

    // Show loading state
    showLoadingState();

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(formData);

        // Show success message
        showSuccessMessage(messageDiv);

        // Open WhatsApp
        window.open(`https://wa.me/918234006206?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

        // Reset form
        document.getElementById('contactForm').reset();
    }, 1500);
}

function getFormData() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        preferredDate: document.getElementById('preferredDate').value,
        preferredTime: document.getElementById('preferredTime').value,
        message: document.getElementById('message').value
    };
}

function createWhatsAppMessage(data) {
    let message = `🦷 *Appointment Request - Shreevedam Dental Clinic*\n\n`;
    message += `👤 *Name:* ${data.firstName} ${data.lastName}\n`;
    message += `📱 *Phone:* ${data.phone}\n`;

    if (data.email) {
        message += `📧 *Email:* ${data.email}\n`;
    }

    if (data.service) {
        message += `🔧 *Service:* ${data.service}\n`;
    }

    if (data.preferredDate) {
        message += `📅 *Preferred Date:* ${data.preferredDate}\n`;
    }

    if (data.preferredTime) {
        message += `⏰ *Preferred Time:* ${data.preferredTime}\n`;
    }

    if (data.message) {
        message += `💬 *Message:* ${data.message}\n`;
    }

    message += `\nPlease confirm my appointment. Thank you!`;

    return message;
}

function showLoadingState() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    // Store original text for later restoration
    submitBtn.dataset.originalText = originalText;
}

function showSuccessMessage(messageDiv) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');

    // Restore button
    submitBtn.innerHTML = submitBtn.dataset.originalText;
    submitBtn.disabled = false;

    // Show success message
    messageDiv.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your appointment request has been sent. We'll contact you shortly to confirm.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Animation functionality
function initializeAnimations() {
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .doctor-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Carousel functionality
function initializeCarousel() {
    const carousel = document.querySelector('#heroCarousel');

    if (carousel) {
        // Auto-play carousel
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', () => {
            bsCarousel.cycle();
        });
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format as Indian phone number
    if (cleaned.length === 10) {
        return `+91 ${cleaned}`;
    }

    return phone;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleaned = phone.replace(/\D/g, '');
    return phoneRegex.test(cleaned);
}

// Form validation
function validateForm(formData) {
    const errors = [];

    if (!formData.firstName.trim()) {
        errors.push('First name is required');
    }

    if (!formData.lastName.trim()) {
        errors.push('Last name is required');
    }

    if (!formData.phone.trim()) {
        errors.push('Phone number is required');
    } else if (!validatePhone(formData.phone)) {
        errors.push('Please enter a valid Indian phone number');
    }

    if (formData.email && !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    return errors;
}

// WhatsApp integration
function openWhatsApp(message = '') {
    const defaultMessage = 'Hello! I would like to book an appointment at Shreevedam Dental Clinic.';
    const finalMessage = message || defaultMessage;

    window.open(`https://wa.me/918234006206?text=${encodeURIComponent(finalMessage)}`, '_blank');
}

// Phone call functionality
function makeCall(number = '+918234006206') {
    window.location.href = `tel:${number}`;
}

// Google Maps integration
function openGoogleMaps() {
    const address = 'Shreevedam dental and ayurved clinic, Opposite Passport Office, Sector 4, DDU Nagar, Amanaka, Raipur, Chhattisgarh 492001';
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
}

// Emergency contact
function handleEmergency() {
    const emergencyMessage = '🚨 DENTAL EMERGENCY 🚨\n\nI need immediate dental care. Please help me as soon as possible.\n\nThank you!';
    openWhatsApp(emergencyMessage);
}

// Add emergency contact functionality
document.addEventListener('DOMContentLoaded', function() {
    const emergencyButtons = document.querySelectorAll('[href*="Emergency"]');

    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href.includes('wa.me')) {
                e.preventDefault();
                handleEmergency();
            }
        });
    });
});

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .contact-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: 1px solid #E9ECEF;
    }

    .contact-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(124, 252, 0, 0.2);
        border-color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const options = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (target === 4.8) {
                            counter.textContent = current.toFixed(1);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target === 4.8) {
                            counter.textContent = target.toFixed(1);
                        } else {
                            counter.textContent = target;
                        }
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Enhanced scroll animations
function initializeEnhancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for enhanced animations
    const animatedElements = document.querySelectorAll('.why-choose-card, .journey-step, .approach-card-1, .approach-card-2');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}
