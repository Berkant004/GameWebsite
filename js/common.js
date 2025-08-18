// Panda X - Common JavaScript Functions Shared Across All Pages

// Initialize all common components
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeMobileMenu();
    initializeButtonEffects();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();
});

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

                // Add glow effect
                mobileMenuButton.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[1].style.transform = 'scale(1) rotate(0deg)';
                spans[2].style.transform = 'none';

                mobileMenuButton.style.boxShadow = '';
            }
        });

        // Close menu when clicking on nav links with animation
        navMenu.querySelectorAll('a').forEach((link, index) => {
            link.addEventListener('click', () => {
                // Staggered close animation
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
        // Enhanced hover effects with magnetic attraction
        button.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            // Add magnetic effect
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            this.addEventListener('mousemove', magneticEffect);
        });

        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = '';
            this.removeEventListener('mousemove', magneticEffect);
        });

        // Enhanced click effects with ripple
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'translateY(1px) scale(0.99)';
            createBlueRipple(e);

            // Add particle burst
            createParticleBurst(e);
        });

        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });

        // Enhanced focus effects
        button.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(59, 130, 246, 0.6)';
            this.style.outlineOffset = '3px';
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
        });

        button.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.boxShadow = '';
        });
    });
}

// Magnetic effect for buttons
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

    // Enhanced ripple styles
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

    // Remove ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 800);
}

// Blue particle system - floating bubbles and stars
function initializeBlueParticles() {
    const particlesContainer = document.getElementById('particlesContainer') ||
                               document.querySelector('.particles-container');

    if (!particlesContainer) {
        const container = document.createElement('div');
        container.className = 'particles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(container);
    }

    function createBlueBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'blue-particle';

        // Different particle types
        const particleTypes = ['✨', '💙', '🔹', '⭐', '💫'];
        const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];

        const size = Math.random() * 25 + 20;
        const left = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        const rotation = Math.random() * 360;
        const opacity = Math.random() * 0.8 + 0.2;

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

        (particlesContainer || document.querySelector('.particles-container')).appendChild(bubble);

        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, (animationDuration + delay) * 1000);
    }

    // Add CSS for bubble animation
    if (!document.querySelector('#blueBubbleAnimation')) {
        const style = document.createElement('style');
        style.id = 'blueBubbleAnimation';
        style.textContent = `
            @keyframes blueBubbleFloat {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg) scale(0.5);
                }
                10% {
                    opacity: 1;
                    transform: translateY(-10vh) rotate(45deg) scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: translateY(-50vh) rotate(180deg) scale(1.2);
                }
                90% {
                    opacity: 0.6;
                    transform: translateY(-90vh) rotate(315deg) scale(0.8);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) rotate(360deg) scale(0.3);
                }
            }

            @keyframes blueRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create bubbles periodically
    window.bubbleInterval = setInterval(createBlueBubble, 1500);

    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createBlueBubble, i * 300);
    }
}

// Scroll-triggered animations with enhanced blue effects
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.feature-card, .news-card, .text-block');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';

                        // Add blue glow effect on entrance
                        child.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
                        setTimeout(() => {
                            child.style.boxShadow = '';
                        }, 1000);
                    }, index * 150);
                });

                // Add section entrance effect
                createSectionEntranceEffect(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        scrollObserver.observe(section);
    });
}

// Glassmorphism effects initialization
function initializeGlassmorphismEffects() {
    const glassElements = document.querySelectorAll('.feature-card, .news-card, .btn-secondary, header');

    glassElements.forEach(element => {
        // Add dynamic backdrop blur based on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const blurAmount = Math.min(scrolled / 10 + 10, 25);

            if (element.tagName === 'HEADER') {
                element.style.backdropFilter = `blur(${blurAmount}px)`;
            }
        });

        // Add hover glass effects
        element.addEventListener('mouseenter', function() {
            this.style.backdropFilter = 'blur(25px)';
            this.style.background = 'rgba(255, 255, 255, 0.25)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.backdropFilter = 'blur(20px)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });
    });
}

// Advanced animations and effects
function initializeAdvancedAnimations() {
    // Cursor trail effect
    initializeCursorTrail();

    // Scroll progress indicator
    initializeScrollProgress();

    // Text reveal animations
    initializeTextReveal();

    // Interactive background
    initializeInteractiveBackground();
}

// Cursor trail with blue particles
function initializeCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create trail particle
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.cssText = `
            position: fixed;
            left: ${mouseX}px;
            top: ${mouseY}px;
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

        // Remove old particles
        if (trail.length > 20) {
            const oldParticle = trail.shift();
            oldParticle.remove();
        }

        // Clean up after animation
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
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3);
                }
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

// Text reveal animations
function initializeTextReveal() {
    const textElements = document.querySelectorAll('h3, p');

    textElements.forEach(element => {
        // Skip if already processed or is a title
        if (element.classList.contains('processed') ||
            element.classList.contains('hero-title') ||
            element.classList.contains('section-title')) {
            return;
        }

        element.classList.add('processed');

        // Reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(element);
    });
}

// Interactive background with particles
function initializeInteractiveBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        };
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;

            if (particle.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${particle.life * 0.5})`;
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add particles on mouse move
        if (Math.random() < 0.3) {
            particles.push(createParticle(mouseX, mouseY));
        }
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

// Utility functions for effects

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

    // Add particle burst animation
    if (!document.querySelector('#particleBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'particleBurstAnimation';
        style.textContent = `
            @keyframes particleBurst {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSectionEntranceEffect(section) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%);
        animation: sectionWave 1s ease-out;
        z-index: 100;
    `;

    section.style.position = 'relative';
    section.appendChild(wave);

    setTimeout(() => wave.remove(), 1000);

    // Add section wave animation
    if (!document.querySelector('#sectionWaveAnimation')) {
        const style = document.createElement('style');
        style.id = 'sectionWaveAnimation';
        style.textContent = `
            @keyframes sectionWave {
                0% {
                    left: -100%;
                }
                100% {
                    left: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Performance optimization
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
        document.documentElement.style.setProperty('--transition-bounce', 'none');

        // Disable auto-sliding
        const autoSlideInterval = window.autoSlideInterval;
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }

        // Disable particle system
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }

        // Disable cursor trail
        document.removeEventListener('mousemove', initializeCursorTrail);
    }

    // Optimize animations for lower-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-animations');

        // Reduce particle frequency
        if (window.bubbleInterval) {
            clearInterval(window.bubbleInterval);
            window.bubbleInterval = setInterval(() => {
                const particlesContainer = document.querySelector('.particles-container');
                if (particlesContainer) {
                    createBlueBubble();
                }
            }, 3000); // Less frequent
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});

// Utility function for safe element selection
function safeQuerySelector(selector, parent = document) {
    try {
        return parent.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}