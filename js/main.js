// Panda X - Proper Theme JavaScript
// Nature-inspired, family-friendly interactions

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
    initializeNatureParticles();
    initializeScrollAnimations();
    initializeHeroAnimations();
});

// Loading overlay with nature theme
function initializeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.querySelector('.loading-text');

    // Add loading messages for panda theme
    const loadingMessages = [
        'LOADING ADVENTURE...',
        'PREPARING JOURNEY...',
        'WAKING UP PANDA X...',
        'DRAWING THE PATH...',
        'ALMOST READY...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        if (loadingText) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingText.textContent = loadingMessages[messageIndex];
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

// Enhanced header with gentle scroll effects
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

        // Gentle header hide/show on scroll
        if (scrollY > lastScrollY && scrollY > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

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

// Mobile menu with smooth animations
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Smooth hamburger animation
            const spans = mobileMenuButton.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[1].style.transform = 'scale(0)';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[1].style.transform = 'scale(1)';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on nav links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const spans = mobileMenuButton.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Video player functionality
function initializeVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');

    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');

            // Add gentle glow effect to video container
            video.parentElement.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.4)';
        });

        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
            video.parentElement.style.boxShadow = '';
        });

        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
        });

        video.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
            video.parentElement.style.boxShadow = '';
        });
    }
}

// Smooth scrolling with natural easing
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gentle button effects with nature theme
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        // Gentle hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = '';
        });

        // Gentle click effects
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'translateY(1px) scale(0.99)';
            createNatureRipple(e);
        });

        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });

        // Focus effects for accessibility
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(76, 175, 80, 0.6)';
            this.style.outlineOffset = '2px';
        });

        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Nature-themed ripple effect
function createNatureRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);

    // Remove ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Enhanced card animations with nature feel
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
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        cardObserver.observe(card);

        // Gentle hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            // Add gentle glow effect
            if (this.classList.contains('feature-card')) {
                this.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.25)';
            } else if (this.classList.contains('vision-card')) {
                this.style.boxShadow = '0 15px 40px rgba(139, 195, 74, 0.25)';
            } else {
                this.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.2)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced screenshot gallery with nature theme
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

    // Create enhanced indicators
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

    // Create navigation dots with nature theme
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-dots';
    dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 15px;
    `;

    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: none;
            background: rgba(76, 175, 80, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    indicatorContainer.appendChild(dotsContainer);

    function updateSlidePosition() {
        const itemWidth = screenshotItems[0].offsetWidth + 24; // width + gap
        const newPosition = -currentIndex * itemWidth;
        screenshotWrapper.style.transform = `translateX(${newPosition}px)`;

        // Update dots
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.style.background = index === currentIndex ?
                'rgba(76, 175, 80, 1)' : 'rgba(76, 175, 80, 0.3)';
            dot.style.transform = index === currentIndex ? 'scale(1.2)' : 'scale(1)';
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalItems - 1));
        updateSlidePosition();
        resetAutoSlideProgress();
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

    // Touch/swipe support
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
    });

    screenshotContainer.addEventListener('touchend', function(e) {
        if (!isSwipping) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                goToSlide(Math.min(currentIndex + 1, totalItems - 1));
            } else {
                // Swipe right - previous slide
                goToSlide(Math.max(currentIndex - 1, 0));
            }
        }

        isSwipping = false;
        setTimeout(() => {
            isUserInteracting = false;
            if (isAutoSliding) startAutoSlide();
        }, 3000);
    });

    // Mouse interaction
    screenshotContainer.addEventListener('mouseenter', function() {
        if (isAutoSliding) stopAutoSlide();
    });

    screenshotContainer.addEventListener('mouseleave', function() {
        if (isAutoSliding && !isUserInteracting) startAutoSlide();
    });

    // Keyboard support
    screenshotContainer.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(Math.max(currentIndex - 1, 0));
            isUserInteracting = true;
        } else if (e.key === 'ArrowRight') {
            goToSlide(Math.min(currentIndex + 1, totalItems - 1));
            isUserInteracting = true;
        }
    });

    // Manual scroll detection
    let scrollTimeout;
    screenshotContainer.addEventListener('scroll', function() {
        stopAutoSlide();
        isAutoSliding = false;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isAutoSliding = true;
            startAutoSlide();
        }, 3000);
    });

    // Initialize
    updateSlidePosition();
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', function() {
        updateSlidePosition();
    });
}

// Nature particle system - floating leaves instead of neon particles
function initializeNatureParticles() {
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

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'nature-particle';

        // Different leaf emojis
        const leafTypes = ['🍃', '🌿', '🍀', '🌱'];
        const leafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];

        const size = Math.random() * 20 + 15;
        const left = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 8 + 12;
        const delay = Math.random() * 5;
        const rotation = Math.random() * 360;

        leaf.innerHTML = leafType;
        leaf.style.cssText = `
            position: absolute;
            left: ${left}px;
            bottom: -30px;
            font-size: ${size}px;
            animation: leafFloat ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: 0;
            transform: rotate(${rotation}deg);
        `;

        (particlesContainer || document.querySelector('.particles-container')).appendChild(leaf);

        // Remove leaf after animation
        setTimeout(() => {
            if (leaf.parentNode) {
                leaf.parentNode.removeChild(leaf);
            }
        }, (animationDuration + delay) * 1000);
    }

    // Add CSS for leaf animation
    if (!document.querySelector('#leafAnimation')) {
        const style = document.createElement('style');
        style.id = 'leafAnimation';
        style.textContent = `
            @keyframes leafFloat {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                    transform: translateY(-100vh) rotate(360deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-110vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create leaves periodically
    setInterval(createLeaf, 2000);

    // Create initial batch
    for (let i = 0; i < 3; i++) {
        setTimeout(createLeaf, i * 500);
    }
}

// Scroll-triggered animations with gentle effects
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
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        scrollObserver.observe(section);
    });
}

// Gentle hero animations
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero h1');
    const heroDescription = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.cta-buttons');
    const heroStats = document.querySelector('.hero-stats');

    if (heroContent) {
        // Staggered entrance animations
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 300);

        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }
        }, 600);

        setTimeout(() => {
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }
        }, 900);

        setTimeout(() => {
            if (heroStats) {
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }
        }, 1200);
    }

    // Gentle parallax effect for hero background
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            const rate = scrolled * -0.3; // Gentler parallax
            hero.style.transform = `translateY(${rate}px)`;
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

// Performance optimization for nature theme
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
    }

    // Optimize animations for lower-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-animations');

        // Reduce particle frequency
        const originalCreateLeaf = window.createLeaf;
        if (originalCreateLeaf) {
            clearInterval(window.leafInterval);
            window.leafInterval = setInterval(originalCreateLeaf, 4000); // Less frequent
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
        background: rgba(76, 175, 80, 0.7) !important;
        transform: scale(1.3) !important;
    }

    .gallery-dot:focus {
        outline: 2px solid rgba(76, 175, 80, 0.6);
        outline-offset: 2px;
    }

    /* Enhanced accessibility */
    .btn-primary:focus,
    .btn-secondary:focus {
        outline: 2px solid rgba(76, 175, 80, 0.8);
        outline-offset: 2px;
    }

    /* Custom focus styles for cards */
    .feature-card:focus-within,
    .news-card:focus-within,
    .vision-card:focus-within {
        outline: 2px solid rgba(76, 175, 80, 0.6);
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
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
        }
    }

    /* Dark mode preference */
    @media (prefers-color-scheme: dark) {
        :root {
            --bg-primary: #1a3d1a;
            --bg-secondary: #2d5a2d;
            --text-primary: #ffffff;
            --text-secondary: #e0e0e0;
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
        initializeNatureParticles,
        initializeScrollAnimations,
        initializeHeroAnimations
    };
}