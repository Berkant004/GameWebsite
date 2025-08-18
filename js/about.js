// About Page - Specific JavaScript Functions

// Initialize About page components
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality from common.js
    initializeHeader();
    initializeMobileMenu();
    initializeButtonEffects();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();

    // About-specific functionality
    initializeAboutAnimations();
    initializeStatCounters();
    initializeJourneyPath();
    initializePandaInteractions();
    initializeVisionCards();
    initializeLegendEffects();
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

        // Smooth header hide/show on scroll
        if (scrollY > lastScrollY && scrollY > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        // Add parallax effect to header
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

            // Enhanced hamburger animation
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

        // Close menu when clicking on nav links
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

// Enhanced button effects with blue theme
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

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

// Blue particle system - floating bubbles and stars
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

        const particleTypes = ['✨', '💙', '🔹', '⭐', '💫'];
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
    if (!document.querySelector('#aboutParticleAnimations')) {
        const style = document.createElement('style');
        style.id = 'aboutParticleAnimations';
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

    // Create bubbles periodically
    setInterval(createBlueBubble, 2000);

    // Create initial batch
    for (let i = 0; i < 3; i++) {
        setTimeout(createBlueBubble, i * 500);
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
    const glassElements = document.querySelectorAll('.stat-item, .text-block, .vision-card, header');

    glassElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.backdropFilter = 'blur(25px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.backdropFilter = 'blur(20px)';
        });
    });
}

// Advanced animations including cursor trail and scroll progress
function initializeAdvancedAnimations() {
    initializeCursorTrail();
    initializeScrollProgress();
}

// ===== ABOUT PAGE SPECIFIC FUNCTIONS =====

// About page specific animations
function initializeAboutAnimations() {
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

    // Legend text blocks entrance animation
    const textBlocks = document.querySelectorAll('.text-block');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    textBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-50px)';
        block.style.transition = 'all 0.6s ease';
        textObserver.observe(block);
    });
}

// Animated stat counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const targets = ['10000', '50', '500'];
    const suffixes = ['', '', ''];

    statNumbers.forEach((stat, index) => {
        const target = parseInt(targets[index]);
        const suffix = suffixes[index];
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                stat.textContent = (current / 1000).toFixed(1) + 'K+';
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);

        // Start animation when visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation is already set up above
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counterObserver.observe(stat);
    });
}

// Interactive journey path
function initializeJourneyPath() {
    const pathDots = document.querySelectorAll('.path-dot');
    let currentDot = 1; // Start with the second dot active

    // Animate path progression
    function animatePathProgression() {
        pathDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index < currentDot) {
                dot.style.background = 'var(--primary-gradient)';
                dot.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
            } else if (index === currentDot) {
                dot.classList.add('active');
            } else {
                dot.style.background = 'var(--glass-bg)';
                dot.style.boxShadow = '';
            }
        });

        currentDot = (currentDot + 1) % pathDots.length;
    }

    // Auto-progress every 3 seconds
    setInterval(animatePathProgression, 3000);

    // Click interaction
    pathDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentDot = index;
            animatePathProgression();
        });

        dot.style.cursor = 'pointer';
    });
}

// Panda illustration interactions
function initializePandaInteractions() {
    const pandaCircle = document.querySelector('.panda-circle');
    const pandaEmoji = document.querySelector('.panda-emoji');

    if (pandaCircle && pandaEmoji) {
        // Click interaction
        pandaCircle.addEventListener('click', () => {
            pandaEmoji.style.animation = 'none';
            pandaEmoji.offsetHeight; // Trigger reflow
            pandaEmoji.style.animation = 'pandaBounce 0.5s ease-in-out';

            // Create celebration particles
            createPandaCelebration();
        });

        // Hover effect
        pandaCircle.addEventListener('mouseenter', () => {
            pandaCircle.style.transform = 'scale(1.1)';
            pandaCircle.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.6)';
        });

        pandaCircle.addEventListener('mouseleave', () => {
            pandaCircle.style.transform = '';
            pandaCircle.style.boxShadow = '';
        });

        // Add cursor pointer
        pandaCircle.style.cursor = 'pointer';
    }
}

// Vision cards enhanced interactions
function initializeVisionCards() {
    const visionCards = document.querySelectorAll('.vision-card');

    visionCards.forEach((card, index) => {
        // Entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(15deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        // Intersection observer for entrance
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, index * 200);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        cardObserver.observe(card);

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateY(2deg)';

            // Add glow effect based on card type
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
        });

        // Click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Create ripple effect
            createCardRipple(this);
        });
    });
}

// Legend section effects
function initializeLegendEffects() {
    const legendVisual = document.querySelector('.legend-visual');

    if (legendVisual) {
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            legendVisual.style.transform = `translateY(${rate}px)`;
        });
    }

    // Text block hover effects
    const textBlocks = document.querySelectorAll('.text-block');
    textBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.text-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            }
        });

        block.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.text-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }
        });
    });
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

// Blue-themed ripple effect
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

// Panda celebration effect
function createPandaCelebration() {
    const pandaCircle = document.querySelector('.panda-circle');
    const rect = pandaCircle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ['🎉', '⭐', '💫', '✨', '🌟'];

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        particle.innerHTML = emoji;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 10000;
            animation: celebration 2s ease-out forwards;
        `;

        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Add celebration animation
    if (!document.querySelector('#celebrationAnimation')) {
        const style = document.createElement('style');
        style.id = 'celebrationAnimation';
        style.textContent = `
            @keyframes celebration {
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

// Card ripple effect
function createCardRipple(card) {
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();

    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: cardRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

    card.style.position = 'relative';
    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    // Add card ripple animation
    if (!document.querySelector('#cardRippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'cardRippleAnimation';
        style.textContent = `
            @keyframes cardRipple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
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
}