// Gameplay Page - Specific JavaScript Functions

// Initialize Gameplay page components
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality from common.js
    initializeHeader();
    initializeMobileMenu();
    initializeButtonEffects();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();

    // Gameplay-specific functionality
    initializeGameplayAnimations();
    initializeGameplayDemo();
    initializeMechanicCards();
    initializeStepCards();
    initializeSystemCards();
    initializeFeatureHighlights();
    initializeGameplayParticles();
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

// Enhanced mobile menu
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
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .demo-btn');

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

        const particleTypes = ['🎮', '⚡', '🎯', '⭐', '💫'];
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
    if (!document.querySelector('#gameplayParticleAnimations')) {
        const style = document.createElement('style');
        style.id = 'gameplayParticleAnimations';
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

    setInterval(createBlueBubble, 2000);

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
    const glassElements = document.querySelectorAll('.mechanic-card, .step-card, .system-card, .gameplay-demo, header');

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

// ===== GAMEPLAY PAGE SPECIFIC FUNCTIONS =====

// Gameplay page specific animations
function initializeGameplayAnimations() {
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
}

// Interactive gameplay demo
function initializeGameplayDemo() {
    const playButton = document.getElementById('playDemo');
    const progressBar = document.querySelector('.progress-bar');
    const demoBall = document.querySelector('.demo-ball');
    const demoObstacles = document.querySelectorAll('.obstacle');

    let isPlaying = false;
    let animationTimeout;

    if (playButton) {
        playButton.addEventListener('click', function() {
            if (isPlaying) return;

            isPlaying = true;
            this.textContent = '⏸ Playing...';
            this.style.opacity = '0.7';

            // Reset positions
            demoBall.style.animation = 'none';
            demoBall.offsetHeight; // Trigger reflow

            // Start ball animation
            demoBall.style.animation = 'ballBounce 4s ease-in-out';

            // Animate progress bar
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.transition = 'width 4s linear';
                progressBar.style.width = '100%';
            }, 100);

            // Create demo effect particles
            createDemoEffects();

            // Reset after animation
            animationTimeout = setTimeout(() => {
                this.textContent = '▶ Watch Demo';
                this.style.opacity = '1';
                progressBar.style.transition = 'width 0.3s ease';
                progressBar.style.width = '0%';
                isPlaying = false;

                // Reset ball position
                setTimeout(() => {
                    demoBall.style.animation = 'ballBounce 4s ease-in-out infinite';
                }, 500);
            }, 4000);
        });
    }

    // Auto-restart demo every 10 seconds
    setInterval(() => {
        if (!isPlaying && playButton) {
            playButton.click();
        }
    }, 10000);
}

// Mechanic cards interactions
function initializeMechanicCards() {
    const mechanicCards = document.querySelectorAll('.mechanic-card');

    mechanicCards.forEach((card, index) => {
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
                    }, index * 150);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        cardObserver.observe(card);

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02) rotateY(2deg)';

            const icon = this.querySelector('.mechanic-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.6)';
            }

            // Animate detail tags
            const tags = this.querySelectorAll('.detail-tag');
            tags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
                }, tagIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const icon = this.querySelector('.mechanic-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }

            const tags = this.querySelectorAll('.detail-tag');
            tags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
        });

        // Click effect
        card.addEventListener('click', function() {
            createMechanicClickEffect(this);
        });
    });
}

// Step cards interactions
function initializeStepCards() {
    const stepCards = document.querySelectorAll('.step-card');

    stepCards.forEach((card, index) => {
        // Entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.6s ease';

        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    stepObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        stepObserver.observe(card);

        // Interactive hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';

            const stepNumber = this.querySelector('.step-number');
            const stepIcon = this.querySelector('.step-icon');

            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1) rotate(5deg)';
                stepNumber.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            }

            if (stepIcon) {
                stepIcon.style.transform = 'scale(1.2)';
                stepIcon.style.filter = 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const stepNumber = this.querySelector('.step-number');
            const stepIcon = this.querySelector('.step-icon');

            if (stepNumber) {
                stepNumber.style.transform = '';
                stepNumber.style.boxShadow = '';
            }

            if (stepIcon) {
                stepIcon.style.transform = '';
                stepIcon.style.filter = '';
            }
        });

        // Click for step progression effect
        card.addEventListener('click', function() {
            createStepProgressEffect(this, index + 1);
        });
    });
}

// System cards interactions
function initializeSystemCards() {
    const systemCards = document.querySelectorAll('.system-card');

    systemCards.forEach((card, index) => {
        // Entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = 'all 0.8s ease';

        const systemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                    systemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        systemObserver.observe(card);

        // Enhanced hover effects with type-specific colors
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateY(2deg)';

            const icon = this.querySelector('.system-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }

            // Type-specific glow effects
            const type = this.classList.contains('primary') ? 'primary' :
                        this.classList.contains('secondary') ? 'secondary' : 'tertiary';

            const glowColors = {
                primary: 'rgba(59, 130, 246, 0.4)',
                secondary: 'rgba(6, 182, 212, 0.4)',
                tertiary: 'rgba(139, 92, 246, 0.4)'
            };

            this.style.boxShadow = `0 20px 50px ${glowColors[type]}`;

            // Animate feature list items
            const listItems = this.querySelectorAll('.system-features li');
            listItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                    item.style.color = 'var(--text-blue)';
                }, itemIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';

            const icon = this.querySelector('.system-icon');
            if (icon) {
                icon.style.transform = '';
            }

            const listItems = this.querySelectorAll('.system-features li');
            listItems.forEach(item => {
                item.style.transform = '';
                item.style.color = '';
            });
        });

        // Click effect
        card.addEventListener('click', function() {
            createSystemClickEffect(this);
        });
    });
}

// Feature highlights interactions
function initializeFeatureHighlights() {
    const featureHighlights = document.querySelectorAll('.feature-highlight');

    featureHighlights.forEach((highlight, index) => {
        // Entrance animation
        highlight.style.opacity = '0';
        highlight.style.transform = 'translateY(30px)';
        highlight.style.transition = 'all 0.8s ease';

        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 300);
                    highlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        highlightObserver.observe(highlight);

        // Feature media interactions
        const featureMedia = highlight.querySelector('.feature-media');
        if (featureMedia) {
            featureMedia.addEventListener('click', function() {
                createFeaturePlayEffect(this);
            });
        }

        // Stats animation on hover
        const stats = highlight.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                const statValue = this.querySelector('.stat-value');
                if (statValue) {
                    statValue.style.transform = 'scale(1.2)';
                    statValue.style.color = 'var(--text-blue)';

                    // Number counting effect
                    const finalValue = statValue.textContent;
                    animateStatValue(statValue, finalValue);
                }
            });

            stat.addEventListener('mouseleave', function() {
                const statValue = this.querySelector('.stat-value');
                if (statValue) {
                    statValue.style.transform = '';
                    statValue.style.color = '';
                }
            });
        });
    });
}

// Gameplay-specific particle effects
function initializeGameplayParticles() {
    // Add game-specific floating elements
    function createGameFloatingElement() {
        const gameElements = ['🎯', '⚡', '🧩', '🏆', '🎮'];
        const element = document.createElement('div');
        const gameIcon = gameElements[Math.floor(Math.random() * gameElements.length)];

        element.innerHTML = gameIcon;
        element.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            pointer-events: none;
            z-index: -1;
            animation: gameFloatUp ${Math.random() * 15 + 20}s linear infinite;
            opacity: 0;
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
        `;

        document.body.appendChild(element);

        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, 35000);
    }

    // Add CSS for game floating animation
    if (!document.querySelector('#gameFloatingAnimation')) {
        const style = document.createElement('style');
        style.id = 'gameFloatingAnimation';
        style.textContent = `
            @keyframes gameFloatUp {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                10% {
                    opacity: 0.8;
                    transform: translateY(-10vh) rotate(45deg);
                }
                90% {
                    opacity: 0.6;
                    transform: translateY(-90vh) rotate(315deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create floating elements periodically
    setInterval(createGameFloatingElement, 3000);
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

// Demo effects for gameplay demonstration
function createDemoEffects() {
    const demoScreen = document.querySelector('.demo-screen');
    if (!demoScreen) return;

    const rect = demoScreen.getBoundingClientRect();

    // Create trail effects
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: var(--primary-gradient);
                border-radius: 50%;
                top: ${60 + i * 5}px;
                left: ${40 + i * 25}px;
                animation: trailFade 1s ease-out forwards;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            `;
            demoScreen.appendChild(trail);

            setTimeout(() => trail.remove(), 1000);
        }, i * 200);
    }

    // Add trail fade animation
    if (!document.querySelector('#trailFadeAnimation')) {
        const style = document.createElement('style');
        style.id = 'trailFadeAnimation';
        style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mechanic card click effect
function createMechanicClickEffect(card) {
    const icon = card.querySelector('.mechanic-icon');
    if (icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const gameIcons = ['🎯', '⚡', '🧩', '🎮'];

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            const gameIcon = gameIcons[Math.floor(Math.random() * gameIcons.length)];

            particle.innerHTML = gameIcon;
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 10000;
                animation: mechanicBurst 2s ease-out forwards;
            `;

            const angle = (i / 6) * Math.PI * 2;
            const velocity = 80 + Math.random() * 40;
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }

    if (!document.querySelector('#mechanicBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'mechanicBurstAnimation';
        style.textContent = `
            @keyframes mechanicBurst {
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

// Step progress effect
function createStepProgressEffect(card, stepNumber) {
    const stepNum = card.querySelector('.step-number');
    if (stepNum) {
        // Create progress ring
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80px;
            height: 80px;
            border: 3px solid var(--text-blue);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: progressRing 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 100;
        `;

        stepNum.style.position = 'relative';
        stepNum.appendChild(ring);

        setTimeout(() => ring.remove(), 1500);

        // Show step completion message
        showStepMessage(`Step ${stepNumber} Complete!`);
    }

    if (!document.querySelector('#progressRingAnimation')) {
        const style = document.createElement('style');
        style.id = 'progressRingAnimation';
        style.textContent = `
            @keyframes progressRing {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0.8;
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

// System click effect
function createSystemClickEffect(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Get system type for appropriate icons
    const type = card.classList.contains('primary') ? 'physics' :
                card.classList.contains('secondary') ? 'progression' : 'social';

    const iconSets = {
        physics: ['⚡', '🔧', '⚙️', '🎯'],
        progression: ['🏆', '⭐', '🎖️', '👑'],
        social: ['👥', '💬', '🌐', '🤝']
    };

    const icons = iconSets[type];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const icon = icons[Math.floor(Math.random() * icons.length)];

        particle.innerHTML = icon;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: systemBurst 2s ease-out forwards;
        `;

        const angle = (i / 8) * Math.PI * 2;
        const velocity = 70 + Math.random() * 50;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    if (!document.querySelector('#systemBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'systemBurstAnimation';
        style.textContent = `
            @keyframes systemBurst {
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

// Feature play effect
function createFeaturePlayEffect(media) {
    const rect = media.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create play burst effect
    const playEmojis = ['▶️', '🎬', '🎥', '📺'];

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const emoji = playEmojis[Math.floor(Math.random() * playEmojis.length)];

        particle.innerHTML = emoji;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 10000;
            animation: playBurst 3s ease-out forwards;
        `;

        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 60;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    // Show play message
    showFeatureMessage('🎮 Loading Gameplay Preview...');

    if (!document.querySelector('#playBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'playBurstAnimation';
        style.textContent = `
            @keyframes playBurst {
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

// Animate stat values
function animateStatValue(element, finalValue) {
    const isNumber = /\d+/.test(finalValue);
    if (!isNumber) return;

    const number = parseInt(finalValue.match(/\d+/)[0]);
    const suffix = finalValue.replace(/\d+/, '');

    let current = 0;
    const increment = number / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 50);
}

// Show step completion message
function showStepMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-gradient);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => messageDiv.remove(), 500);
    }, 2000);

    if (!document.querySelector('#slideAnimations')) {
        const style = document.createElement('style');
        style.id = 'slideAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show feature message
function showFeatureMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 1.2rem;
        z-index: 10001;
        animation: featureMessage 3s ease-out forwards;
        backdrop-filter: blur(10px);
        box-shadow: 0 20px 60px rgba(59, 130, 246, 0.5);
        text-align: center;
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => messageDiv.remove(), 3000);

    if (!document.querySelector('#featureMessageAnimation')) {
        const style = document.createElement('style');
        style.id = 'featureMessageAnimation';
        style.textContent = `
            @keyframes featureMessage {
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