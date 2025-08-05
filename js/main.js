// Utility functions for effects

function addSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                animation: sparkleFloat 2s ease-out forwards;
                z-index: 1000;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 200);
    }
    
    // Add sparkle animation if not exists
    if (!document.querySelector('#sparkleAnimation')) {
        const style = document.createElement('style');
        style.id = 'sparkleAnimation';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 0;
                    transform: translateY(0) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-20px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-40px) scale(0.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

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

function createSparkleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 10000;
            animation: sparkleExplosion 1.5s ease-out forwards;
            font-size: 20px;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        sparkle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
    
    // Add sparkle explosion animation
    if (!document.querySelector('#sparkleExplosionAnimation')) {
        const style = document.createElement('style');
        style.id = 'sparkleExplosionAnimation';
        style.textContent = `
            @keyframes sparkleExplosion {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(0.5) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0.2) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        z-index: 10000;
        animation: scrollIndicatorPulse 0.8s ease-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.remove(), 800);
    
    // Add scroll indicator animation
    if (!document.querySelector('#scrollIndicatorAnimation')) {
        const style = document.createElement('style');
        style.id = 'scrollIndicatorAnimation';
        style.textContent = `
            @keyframes scrollIndicatorPulse {
                0% {
                    opacity: 0;
                    transform: translateY(-50%) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-50%) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSlideTransition() {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%);
        animation: slideTransition 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    const container = document.querySelector('.screenshot-scroll-container');
    container.style.position = 'relative';
    container.appendChild(transition);
    
    setTimeout(() => transition.remove(), 600);
    
    // Add slide transition animation
    if (!document.querySelector('#slideTransitionAnimation')) {
        const style = document.createElement('style');
        style.id = 'slideTransitionAnimation';
        style.textContent = `
            @keyframes slideTransition {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createKeyboardFeedback(direction) {
    const feedback = document.createElement('div');
    feedback.innerHTML = direction === 'left' ? '←' : '→';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        ${direction}: 20px;
        transform: translateY(-50%);
        font-size: 24px;
        color: #3b82f6;
        z-index: 10000;
        animation: keyboardFeedback 0.5s ease-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 500);
    
    // Add keyboard feedback animation
    if (!document.querySelector('#keyboardFeedbackAnimation')) {
        const style = document.createElement('style');
        style.id = 'keyboardFeedbackAnimation';
        style.textContent = `
            @keyframes keyboardFeedback {
                0% {
                    opacity: 1;
                    transform: translateY(-50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50%) scale(1.5);
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

function addTypewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Performance optimization for blue theme
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
        const originalCreateBubble = window.createBlueBubble;
        if (originalCreateBubble) {
            clearInterval(window.bubbleInterval);
            window.bubbleInterval = setInterval(originalCreateBubble, 3000); // Less frequent
        }
    }
}

// Add CSS for dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .reduced-animations * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }

    .gallery-dots {
        margin-top: 1rem;
    }

    .gallery-dot:hover {
        background: rgba(59, 130, 246, 0.7) !important;
        transform: scale(1.3) !important;
    }

    .gallery-dot:focus {
        outline: 2px solid rgba(59, 130, 246, 0.6);
        outline-offset: 2px;
    }

    /* Enhanced accessibility */
    .btn-primary:focus,
    .btn-secondary:focus {
        outline: 2px solid rgba(59, 130, 246, 0.8);
        outline-offset: 2px;
    }

    /* Custom focus styles for cards */
    .feature-card:focus-within,
    .news-card:focus-within,
    .vision-card:focus-within {
        outline: 2px solid rgba(59, 130, 246, 0.6);
        outline-offset: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }

        .particles-container {
            display: none !important;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --text-primary: #000000;
            --text-secondary: #333333;
            --bg-primary: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
            --bg-secondary: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
        }
    }

    /* Dark mode preference */
    @media (prefers-color-scheme: dark) {
        :root {
            --bg-primary: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            --bg-secondary: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            --text-primary: #ffffff;
            --text-secondary: #e2e8f0;
        }
    }
`;
document.head.appendChild(dynamicStyles);

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});

// Intersection Observer for better performance
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Add error handling for missing elements
function safeQuerySelector(selector, parent = document) {
    try {
        return parent.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeLoading,
        initializeHeader,
        initializeMobileMenu,
        initializeVideoPlayer,
        initializeSmoothScrolling,
        initializeButtonEffects,
        initializeCardAnimations,
        initializeScreenshotGallery,
        initializeBlueParticles,
        initializeScrollAnimations,
        initializeHeroAnimations,
        initializeGlassmorphismEffects,
        initializeAdvancedAnimations
    };
}// Panda X - Complete Blue Theme JavaScript
// Modern, interactive experiences with beautiful blue animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeHeader();
    initializeMobileMenu();
    initializeVideoPlayer();
    initializeSmoothScrolling();
    initializeButtonEffects();
    initializeCardAnimations();
    initializeScreenshotGallery();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();
});

// Enhanced loading overlay with blue theme
function initializeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.querySelector('.loading-text');

    // Blue-themed loading messages
    const loadingMessages = [
        'LOADING ADVENTURE...',
        'PREPARING JOURNEY...',
        'WAKING UP PANDA X...',
        'DRAWING THE PATH...',
        'ENTERING BLUE REALM...',
        'ALMOST READY...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        if (loadingText) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingText.textContent = loadingMessages[messageIndex];
            
            // Add sparkle effect to loading text
            addSparkleEffect(loadingText);
        }
    }, 800);

    // Hide loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        clearInterval(messageInterval);
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.add('loaded');
                // Remove from DOM after transition
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 800);
            }
        }, 1000);
    });
}

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

// Enhanced video player with blue theme
function initializeVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');
    const videoContainer = document.querySelector('.video-container');

    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');

            // Add enhanced glow effect
            videoContainer.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.6)';
            videoContainer.style.transform = 'scale(1.02)';
        });

        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
            videoContainer.style.boxShadow = '';
            videoContainer.style.transform = 'scale(1)';
        });

        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
        });

        video.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
            videoContainer.style.boxShadow = '';
            videoContainer.style.transform = 'scale(1)';
            
            // Add completion sparkle effect
            createSparkleExplosion(videoContainer);
        });
    }
}

// Smooth scrolling with blue-themed indicators
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                // Add scroll indicator
                createScrollIndicator();

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
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

// Enhanced card animations with blue theme
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.feature-card, .news-card, .vision-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add entrance sparkle effect
                setTimeout(() => {
                    addSparkleEffect(entry.target);
                }, 300);
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;

        cardObserver.observe(card);

        // Enhanced hover effects with 3D transform
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // 3D tilt effect
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            this.addEventListener('mousemove', cardTiltEffect);
            
            // Enhanced glow effect
            if (this.classList.contains('feature-card')) {
                this.style.boxShadow = '0 20px 50px rgba(59, 130, 246, 0.3)';
            } else if (this.classList.contains('vision-card')) {
                this.style.boxShadow = '0 20px 50px rgba(96, 165, 250, 0.3)';
            } else {
                this.style.boxShadow = '0 20px 50px rgba(59, 130, 246, 0.25)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = '';
            this.style.boxShadow = '';
            this.removeEventListener('mousemove', cardTiltEffect);
        });
    });
}

// 3D tilt effect for cards
function cardTiltEffect(e) {
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
}

// Enhanced screenshot gallery with blue theme
function initializeScreenshotGallery() {
    const screenshotContainer = document.querySelector('.screenshot-scroll-container');
    const screenshotWrapper = document.querySelector('.screenshot-scroll-wrapper');
    const screenshotItems = document.querySelectorAll('.screenshot-item');

    if (!screenshotContainer || !screenshotWrapper || screenshotItems.length === 0) return;

    const totalItems = screenshotItems.length;
    let currentIndex = 0;
    let autoSlideInterval;
    let direction = 1;
    let isAutoSliding = true;
    let isUserInteracting = false;

    // Create enhanced indicators with blue theme
    const indicatorContainer = document.querySelector('.auto-slide-indicator') || document.createElement('div');
    if (!document.querySelector('.auto-slide-indicator')) {
        indicatorContainer.className = 'auto-slide-indicator';
        screenshotContainer.parentNode.insertBefore(indicatorContainer, screenshotContainer.nextSibling);
    }

    const progressIndicator = document.querySelector('.auto-slide-progress') || document.createElement('div');
    if (!document.querySelector('.auto-slide-progress')) {
        progressIndicator.className = 'auto-slide-progress';
        indicatorContainer.appendChild(progressIndicator);
    }

    // Create navigation dots with blue theme
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-dots';
    dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    `;

    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: rgba(59, 130, 246, 0.3);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        `;
        
        // Add hover effect
        dot.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(59, 130, 246, 0.7)';
            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
        });
        
        dot.addEventListener('mouseleave', function() {
            if (i !== currentIndex) {
                this.style.background = 'rgba(59, 130, 246, 0.3)';
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }
        });
        
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    indicatorContainer.appendChild(dotsContainer);

    function updateSlidePosition() {
        const itemWidth = screenshotItems[0].offsetWidth + 24; // width + gap
        const newPosition = -currentIndex * itemWidth;
        screenshotWrapper.style.transform = `translateX(${newPosition}px)`;

        // Update dots with enhanced animation
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.style.background = 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
                dot.style.transform = 'scale(1.4)';
                dot.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';
            } else {
                dot.style.background = 'rgba(59, 130, 246, 0.3)';
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '';
            }
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalItems - 1));
        updateSlidePosition();
        resetAutoSlideProgress();
        
        // Add slide transition effect
        createSlideTransition();
    }

    function startAutoSlideProgress() {
        progressIndicator.style.width = '0%';
        progressIndicator.style.transition = 'none';
        void progressIndicator.offsetWidth;
        progressIndicator.style.transition = 'width 4s linear';
        progressIndicator.style.width = '100%';
    }

    function resetAutoSlideProgress() {
        progressIndicator.style.transition = 'none';
        progressIndicator.style.width = '0%';
    }

    function autoSlide() {
        if (direction === 1) {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
            } else {
                direction = -1;
                currentIndex--;
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                direction = 1;
                currentIndex++;
            }
        }

        updateSlidePosition();
        resetAutoSlideProgress();
        if (isAutoSliding && !isUserInteracting) startAutoSlideProgress();
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 4000);
        startAutoSlideProgress();
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        resetAutoSlideProgress();
    }

    // Enhanced touch/swipe support
    let startX = 0;
    let startY = 0;
    let isSwipping = false;

    screenshotContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipping = true;
        isUserInteracting = true;
        stopAutoSlide();
    });

    screenshotContainer.addEventListener('touchmove', function(e) {
        if (!isSwipping) return;
        e.preventDefault();
        
        // Add live swipe feedback
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        const opacity = Math.min(Math.abs(diffX) / 100, 0.3);
        screenshotContainer.style.background = `rgba(59, 130, 246, ${opacity})`;
    });

    screenshotContainer.addEventListener('touchend', function(e) {
        if (!isSwipping) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        screenshotContainer.style.background = '';

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                goToSlide(Math.min(currentIndex + 1, totalItems - 1));
            } else {
                goToSlide(Math.max(currentIndex - 1, 0));
            }
        }

        isSwipping = false;
        setTimeout(() => {
            isUserInteracting = false;
            if (isAutoSliding) startAutoSlide();
        }, 3000);
    });

    // Mouse interaction with enhanced effects
    screenshotContainer.addEventListener('mouseenter', function() {
        if (isAutoSliding) stopAutoSlide();
        this.style.transform = 'scale(1.01)';
    });

    screenshotContainer.addEventListener('mouseleave', function() {
        if (isAutoSliding && !isUserInteracting) startAutoSlide();
        this.style.transform = 'scale(1)';
    });

    // Enhanced keyboard support
    screenshotContainer.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(Math.max(currentIndex - 1, 0));
            isUserInteracting = true;
            createKeyboardFeedback('left');
        } else if (e.key === 'ArrowRight') {
            goToSlide(Math.min(currentIndex + 1, totalItems - 1));
            isUserInteracting = true;
            createKeyboardFeedback('right');
        }
    });

    // Initialize
    updateSlidePosition();
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', function() {
        updateSlidePosition();
    });
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
    setInterval(createBlueBubble, 1500);

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
                const children = entry.target.querySelectorAll('.feature-card, .news-card, .vision-card, .text-block');
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

// Enhanced hero animations with blue theme
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero h1');
    const heroDescription = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.cta-buttons');
    const heroStats = document.querySelector('.hero-stats');

    if (heroContent) {
        // Enhanced staggered entrance animations
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                
                // Add typewriter effect
                addTypewriterEffect(heroTitle);
            }
        }, 500);

        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
                
                // Add subtle glow
                heroDescription.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
            }
        }, 800);

        setTimeout(() => {
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
                
                // Add button entrance effects
                const buttons = heroButtons.querySelectorAll('.btn-primary, .btn-secondary');
                buttons.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            btn.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
            }
        }, 1100);

        setTimeout(() => {
            if (heroStats) {
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }
        }, 1400);
    }

    // Enhanced parallax effect for hero background
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            const rate = scrolled * -0.2; // Enhanced parallax
            hero.style.transform = `translateY(${rate}px)`;
            
            // Add dynamic opacity based on scroll
            const opacity = Math.max(1 - scrolled / window.innerHeight, 0);
            hero.style.opacity = opacity;
        }

        ticking = false;
    }

    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxTick);
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
    const textElements = document.querySelectorAll('h1, h2, h3');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Split text into spans
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease ${index * 0.05}s;
                display: inline-block;
            `;
            element.appendChild(span);
        });
        
        // Reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
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