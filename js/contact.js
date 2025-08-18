// Contact Page - Specific JavaScript Functions

// Initialize Contact page components
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality from common.js
    initializeHeader();
    initializeMobileMenu();
    initializeButtonEffects();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();

    // Contact-specific functionality
    initializeContactAnimations();
    initializeContactForm();
    initializeStatusIndicators();
    initializeSocialCards();
    initializeEmailButtons();
    initializePandaMailInteraction();
    initializeOfficeImageEffects();
});

// ===== CORE FUNCTIONS FROM COMMON.JS =====

// Enhanced header with glassmorphism
function initializeHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > lastScrollY && scrollY > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        const parallaxOffset = scrollY * 0.1;
        header.style.backdropFilter = `blur(${Math.min(20 + parallaxOffset, 30)}px)`;

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Enhanced mobile menu with smooth animations
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            const spans = mobileMenuButton.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[1].style.transform = 'scale(0) rotate(180deg)';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                mobileMenuButton.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[1].style.transform = 'scale(1) rotate(0deg)';
                spans[2].style.transform = 'none';
                mobileMenuButton.style.boxShadow = '';
            }
        });

        navMenu.querySelectorAll('a').forEach((link, index) => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    const spans = mobileMenuButton.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                    mobileMenuButton.style.boxShadow = '';
                }, index * 50);
            });
        });
    }
}

// Enhanced button effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-btn, .social-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.addEventListener('mousemove', magneticEffect);
        });

        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = '';
            this.removeEventListener('mousemove', magneticEffect);
        });

        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'translateY(1px) scale(0.99)';
            createBlueRipple(e);
            createParticleBurst(e);
        });

        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Blue particle system
function initializeBlueParticles() {
    let particlesContainer = document.querySelector('.particles-container');

    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particlesContainer);
    }

    function createBlueBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'blue-particle';

        const particleTypes = ['✨', '💙', '📧', '⭐', '💫'];
        const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];

        const size = Math.random() * 25 + 20;
        const left = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        const rotation = Math.random() * 360;

        bubble.innerHTML = particleType;
        bubble.style.cssText = `
            position: absolute;
            left: ${left}px;
            bottom: -50px;
            font-size: ${size}px;
            animation: blueBubbleFloat ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: 0;
            transform: rotate(${rotation}deg);
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6));
        `;

        particlesContainer.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, (animationDuration + delay) * 1000);
    }

    // Add CSS for particle animations
    if (!document.querySelector('#contactParticleAnimations')) {
        const style = document.createElement('style');
        style.id = 'contactParticleAnimations';
        style.textContent = `
            @keyframes blueBubbleFloat {
                0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.5); }
                10% { opacity: 1; transform: translateY(-10vh) rotate(45deg) scale(1); }
                50% { opacity: 0.8; transform: translateY(-50vh) rotate(180deg) scale(1.2); }
                90% { opacity: 0.6; transform: translateY(-90vh) rotate(315deg) scale(0.8); }
                100% { opacity: 0; transform: translateY(-100vh) rotate(360deg) scale(0.3); }
            }
            @keyframes blueRipple {
                to { transform: scale(4); opacity: 0; }
            }
            @keyframes particleBurst {
                0% { opacity: 1; transform: translate(0, 0) scale(1); }
                100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }

    setInterval(createBlueBubble, 2500);

    for (let i = 0; i < 3; i++) {
        setTimeout(createBlueBubble, i * 600);
    }
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        scrollObserver.observe(section);
    });
}

// Glassmorphism effects
function initializeGlassmorphismEffects() {
    const glassElements = document.querySelectorAll('.contact-card, .location-card, .contact-form, .hours-card, .social-card, header');

    glassElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.backdropFilter = 'blur(25px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.backdropFilter = 'blur(20px)';
        });
    });
}

// Advanced animations
function initializeAdvancedAnimations() {
    initializeCursorTrail();
    initializeScrollProgress();
}

// ===== CONTACT PAGE SPECIFIC FUNCTIONS =====

// Contact page specific animations
function initializeContactAnimations() {
    // Hero stats entrance animation
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) scale(0.8)';

        setTimeout(() => {
            stat.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0) scale(1)';
        }, 1000 + (index * 200));
    });

    // Contact cards entrance animation
    const contactCards = document.querySelectorAll('.contact-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateX(10deg)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // Social cards staggered animation
    const socialCards = document.querySelectorAll('.social-card');
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    socialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s ease';
        socialObserver.observe(card);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSubmit = document.querySelector('.form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') === 'on'
            };

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            showFormLoading(true);

            // Simulate form submission
            setTimeout(() => {
                showFormSuccess();
                resetForm();
                showFormLoading(false);

                // Create celebration effect
                createFormSuccessEffect();
            }, 2000);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        // Enhanced form interactions
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
}

// Form validation
function validateForm(data) {
    let isValid = true;

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!data.subject) {
        showFieldError('subject', 'Please select a subject');
        isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    clearFieldError(field);

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }

    showFieldSuccess(field);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const fieldGroup = field.parentElement;

    // Remove existing error
    const existingError = fieldGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error styling
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    fieldGroup.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.style.borderColor = '#22c55e';
    field.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.2)';
}

function clearFieldError(field) {
    const fieldGroup = field.parentElement;
    const existingError = fieldGroup.querySelector('.field-error');

    if (existingError) {
        existingError.remove();
    }

    field.style.borderColor = '';
    field.style.boxShadow = '';
}

function showFormLoading(loading) {
    const submitButton = document.querySelector('.form-submit');

    if (loading) {
        submitButton.textContent = 'Sending Message...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        submitButton.style.cursor = 'not-allowed';
    } else {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    }
}

function showFormSuccess() {
    const form = document.querySelector('.contact-form');

    // Create or show success message
    let successMessage = document.querySelector('.form-success');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <strong>🎉 Message Sent Successfully!</strong><br>
            Thank you for reaching out! We'll get back to you within 24 hours.
        `;
        form.insertBefore(successMessage, form.firstChild);
    }

    successMessage.classList.add('show');

    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

function resetForm() {
    const form = document.getElementById('contactForm');
    form.reset();

    // Clear all field styles
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        clearFieldError(field);
    });
}

// Status indicators animation
function initializeStatusIndicators() {
    const statusIndicators = document.querySelectorAll('.status-indicator');

    statusIndicators.forEach(indicator => {
        const dot = indicator.querySelector('.status-dot');

        // Add click interaction
        indicator.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Create pulse effect
            createStatusPulse(this);
        });

        // Enhanced hover effect
        indicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            if (dot) {
                dot.style.animationDuration = '0.5s';
            }
        });

        indicator.addEventListener('mouseleave', function() {
            this.style.transform = '';
            if (dot) {
                dot.style.animationDuration = '2s';
            }
        });
    });

    // Real-time status updates
    updateStatusIndicators();
    setInterval(updateStatusIndicators, 30000); // Update every 30 seconds
}

function updateStatusIndicators() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday

    // Live Chat status (Monday-Friday 10AM-8PM EST, Saturday-Sunday 12PM-6PM EST)
    const liveChatIndicator = document.querySelector('.hours-card .status-indicator.live');
    if (liveChatIndicator) {
        let isLiveChatAvailable = false;

        if (day >= 1 && day <= 5) { // Monday-Friday
            isLiveChatAvailable = hour >= 10 && hour < 20;
        } else { // Weekend
            isLiveChatAvailable = hour >= 12 && hour < 18;
        }

        const statusText = liveChatIndicator.querySelector('span:last-child');
        if (isLiveChatAvailable) {
            statusText.textContent = 'Currently Available';
            liveChatIndicator.style.background = 'rgba(34, 197, 94, 0.1)';
            liveChatIndicator.style.color = '#22c55e';
        } else {
            statusText.textContent = 'Currently Offline';
            liveChatIndicator.style.background = 'rgba(156, 163, 175, 0.1)';
            liveChatIndicator.style.color = '#6b7280';
        }
    }
}

// Social cards enhanced interactions
function initializeSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');

    socialCards.forEach(card => {
        const icon = card.querySelector('.social-icon');

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotateY(2deg)';

            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }

            // Add social-specific glow
            const type = this.classList.contains('primary') ? 'primary' :
                        this.classList.contains('secondary') ? 'secondary' : 'tertiary';

            const glowColors = {
                primary: 'rgba(59, 130, 246, 0.4)',
                secondary: 'rgba(6, 182, 212, 0.4)',
                tertiary: 'rgba(139, 92, 246, 0.4)'
            };

            this.style.boxShadow = `0 20px 50px ${glowColors[type]}`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';

            if (icon) {
                icon.style.transform = '';
            }
        });

        card.addEventListener('click', function() {
            createSocialClickEffect(this);
        });
    });
}

// Email button enhancements
function initializeEmailButtons() {
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');

    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create email click effect
            createEmailClickEffect(this);

            // Show confirmation message
            showEmailConfirmation(this);
        });
    });
}

// Panda mail interaction
function initializePandaMailInteraction() {
    const pandaCircle = document.querySelector('.panda-circle');
    const pandaEmoji = document.querySelector('.panda-emoji');

    if (pandaCircle && pandaEmoji) {
        pandaCircle.addEventListener('click', () => {
            // Create mail delivery animation
            createMailDeliveryEffect();

            // Bounce the panda
            pandaEmoji.style.animation = 'none';
            pandaEmoji.offsetHeight;
            pandaEmoji.style.animation = 'pandaBounce 0.6s ease-in-out';
        });

        pandaCircle.addEventListener('mouseenter', () => {
            pandaCircle.style.transform = 'scale(1.1)';
            pandaEmoji.textContent = '📬'; // Change to mailbox when hovered
        });

        pandaCircle.addEventListener('mouseleave', () => {
            pandaCircle.style.transform = '';
            pandaEmoji.textContent = '📧'; // Back to mail
        });

        pandaCircle.style.cursor = 'pointer';
    }
}

// Office image effects
function initializeOfficeImageEffects() {
    const officeImageContainer = document.querySelector('.office-image-container');

    if (officeImageContainer) {
        const image = officeImageContainer.querySelector('.office-image');
        const overlay = officeImageContainer.querySelector('.image-overlay');

        officeImageContainer.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(59, 130, 246, 0.8))';
            }
        });

        officeImageContainer.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))';
            }
        });

        // Click to "visit" effect
        officeImageContainer.addEventListener('click', function() {
            createOfficeVisitEffect();
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Magnetic effect for interactive elements
function magneticEffect(e) {
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;

    this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
}

// Blue ripple effect
function createBlueRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("blue-ripple");

    circle.style.cssText += `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(96, 165, 250, 0.4) 70%, transparent 100%);
        transform: scale(0);
        animation: blueRipple 0.8s linear;
        pointer-events: none;
        z-index: 1000;
    `;

    const ripple = button.getElementsByClassName("blue-ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 800);
}

// Particle burst effect
function createParticleBurst(event) {
    const colors = ['#3b82f6', '#60a5fa', '#06b6d4', '#8b5cf6'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: particleBurst 0.8s ease-out forwards;
        `;

        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 30;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// Form success celebration effect
function createFormSuccessEffect() {
    const form = document.querySelector('.contact-form');
    const rect = form.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ['🎉', '✉️', '📧', '⭐', '💫', '🎊'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        particle.innerHTML = emoji;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: formCelebration 2s ease-out forwards;
        `;

        const angle = (i / 15) * Math.PI * 2;
        const velocity = 80 + Math.random() * 40;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Add form celebration animation
    if (!document.querySelector('#formCelebrationAnimation')) {
        const style = document.createElement('style');
        style.id = 'formCelebrationAnimation';
        style.textContent = `
            @keyframes formCelebration {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0.3) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Status pulse effect
function createStatusPulse(indicator) {
    const pulse = document.createElement('div');
    pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: 2px solid currentColor;
        border-radius: inherit;
        transform: translate(-50%, -50%);
        animation: statusPulseEffect 0.6s ease-out;
        pointer-events: none;
        opacity: 0.7;
    `;

    indicator.style.position = 'relative';
    indicator.appendChild(pulse);

    setTimeout(() => pulse.remove(), 600);

    if (!document.querySelector('#statusPulseAnimation')) {
        const style = document.createElement('style');
        style.id = 'statusPulseAnimation';
        style.textContent = `
            @keyframes statusPulseEffect {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Social click effect
function createSocialClickEffect(card) {
    const icon = card.querySelector('.social-icon');
    if (icon) {
        const iconRect = icon.getBoundingClientRect();
        const centerX = iconRect.left + iconRect.width / 2;
        const centerY = iconRect.top + iconRect.height / 2;

        const socialEmojis = ['👥', '💬', '🌟', '🚀', '💙'];

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            const emoji = socialEmojis[Math.floor(Math.random() * socialEmojis.length)];

            particle.innerHTML = emoji;
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 10000;
                animation: socialBurst 1.5s ease-out forwards;
            `;

            const angle = (i / 6) * Math.PI * 2;
            const velocity = 60 + Math.random() * 30;
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    if (!document.querySelector('#socialBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'socialBurstAnimation';
        style.textContent = `
            @keyframes socialBurst {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Email click effect
function createEmailClickEffect(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create flying envelope
    const envelope = document.createElement('div');
    envelope.innerHTML = '✉️';
    envelope.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 10000;
        animation: flyingEnvelope 2s ease-out forwards;
    `;

    document.body.appendChild(envelope);
    setTimeout(() => envelope.remove(), 2000);

    if (!document.querySelector('#flyingEnvelopeAnimation')) {
        const style = document.createElement('style');
        style.id = 'flyingEnvelopeAnimation';
        style.textContent = `
            @keyframes flyingEnvelope {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(100px, -200px) scale(1.2) rotate(15deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(300px, -400px) scale(0.5) rotate(45deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show email confirmation
function showEmailConfirmation(button) {
    const email = button.href.replace('mailto:', '');

    // Create confirmation tooltip
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
    `;
    tooltip.innerHTML = `📧 Opening email client for:<br><strong>${email}</strong>`;

    document.body.appendChild(tooltip);

    setTimeout(() => {
        tooltip.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => tooltip.remove(), 500);
    }, 3000);

    if (!document.querySelector('#emailTooltipAnimations')) {
        const style = document.createElement('style');
        style.id = 'emailTooltipAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mail delivery effect
function createMailDeliveryEffect() {
    const pandaCircle = document.querySelector('.panda-circle');
    const rect = pandaCircle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple flying mails
    for (let i = 0; i < 5; i++) {
        const mail = document.createElement('div');
        mail.innerHTML = '📮';
        mail.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: mailDelivery 3s ease-out forwards;
            animation-delay: ${i * 0.2}s;
        `;

        const angle = (i / 5) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        mail.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        mail.style.setProperty('--dy', Math.sin(angle) * distance + 'px');

        document.body.appendChild(mail);
        setTimeout(() => mail.remove(), 3000 + (i * 200));
    }

    if (!document.querySelector('#mailDeliveryAnimation')) {
        const style = document.createElement('style');
        style.id = 'mailDeliveryAnimation';
        style.textContent = `
            @keyframes mailDelivery {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1.1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0.3) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Office visit effect
function createOfficeVisitEffect() {
    const container = document.querySelector('.office-image-container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create visit confirmation
    const visit = document.createElement('div');
    visit.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏢</div>
        <div style="font-weight: 600; color: white;">Virtual Visit!</div>
    `;
    visit.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        background: rgba(59, 130, 246, 0.9);
        padding: 1rem 2rem;
        border-radius: 15px;
        pointer-events: none;
        z-index: 10000;
        animation: officeVisit 2s ease-out forwards;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5);
    `;

    document.body.appendChild(visit);
    setTimeout(() => visit.remove(), 2000);

    if (!document.querySelector('#officeVisitAnimation')) {
        const style = document.createElement('style');
        style.id = 'officeVisitAnimation';
        style.textContent = `
            @keyframes officeVisit {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Cursor trail effect
function initializeCursorTrail() {
    let trail = [];

    document.addEventListener('mousemove', function(e) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 0.8s ease-out forwards;
        `;

        document.body.appendChild(particle);
        trail.push(particle);

        if (trail.length > 15) {
            const oldParticle = trail.shift();
            oldParticle.remove();
        }

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 800);
    });

    // Add trail fade animation
    if (!document.querySelector('#trailAnimation')) {
        const style = document.createElement('style');
        style.id = 'trailAnimation';
        style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #06b6d4 100%);
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

// Performance optimization for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');

    // Disable particle systems
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
}