// Download Page - Specific JavaScript Functions

// Initialize Download page components
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality from common.js
    initializeHeader();
    initializeMobileMenu();
    initializeButtonEffects();
    initializeBlueParticles();
    initializeScrollAnimations();
    initializeGlassmorphismEffects();
    initializeAdvancedAnimations();

    // Download-specific functionality
    initializeDownloadAnimations();
    initializeStatCounters();
    initializeDownloadButtons();
    initializePlatformCards();
    initializePricingCards();
    initializeFAQItems();
    initializeProgressDemo();
    initializeQuickDownload();
    initializeDownloadParticles();
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
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn, .pricing-btn, .quick-btn');

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

        const particleTypes = ['📱', '💻', '🌐', '⭐', '💫'];
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
    if (!document.querySelector('#downloadParticleAnimations')) {
        const style = document.createElement('style');
        style.id = 'downloadParticleAnimations';
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
    const glassElements = document.querySelectorAll('.platform-card, .pricing-card, .faq-item, .download-showcase, header');

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

// ===== DOWNLOAD PAGE SPECIFIC FUNCTIONS =====

// Download page specific animations
function initializeDownloadAnimations() {
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

// Animated stat counters with enhanced effects
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 100;
        const isRating = stat.dataset.target === '4.8';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (isRating) {
                stat.textContent = current.toFixed(1) + '★';
            } else if (target >= 1000000) {
                stat.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else {
                stat.textContent = Math.floor(current).toLocaleString() + '+';
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

// Download buttons with enhanced interactions
function initializeDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        const platform = button.dataset.platform;

        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Create download effect
            createDownloadEffect(this, platform);

            // Show download confirmation
            showDownloadConfirmation(platform);

            // Track download attempt
            trackDownload(platform);
        });

        // Enhanced hover effect for instant play button
        if (button.classList.contains('instant-play')) {
            button.addEventListener('mouseenter', function() {
                this.style.animation = 'pulseGlow 1s ease-in-out infinite';
            });

            button.addEventListener('mouseleave', function() {
                this.style.animation = 'pulseGlow 2s ease-in-out infinite';
            });
        }
    });
}

// Platform cards interactions
function initializePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach((card, index) => {
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
            const isHighlight = this.classList.contains('highlight-card');
            const scale = isHighlight ? 1.07 : 1.02;
            this.style.transform = `translateY(-15px) scale(${scale}) rotateY(2deg)`;

            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
            }

            // Animate platform stats
            const stats = this.querySelector('.platform-stats');
            if (stats) {
                stats.style.transform = 'translateY(-5px)';
                const statValue = stats.querySelector('.stat-value');
                if (statValue) {
                    animateStatValue(statValue);
                }
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }

            const stats = this.querySelector('.platform-stats');
            if (stats) {
                stats.style.transform = '';
            }
        });

        // Click effect for card
        card.addEventListener('click', function() {
            createPlatformClickEffect(this);
        });
    });
}

// Pricing cards interactions
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach((card, index) => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const isPremium = this.classList.contains('premium-card');
            const scale = isPremium ? 1.07 : 1.02;
            this.style.transform = `translateY(-12px) scale(${scale}) rotateY(1deg)`;

            // Animate pricing icon
            const icon = this.querySelector('.pricing-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))';
            }

            // Animate price
            const price = this.querySelector('.amount');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.color = 'var(--text-blue)';
            }

            // Animate features
            const features = this.querySelectorAll('.features-list li');
            features.forEach((feature, featureIndex) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--text-blue)';
                }, featureIndex * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const icon = this.querySelector('.pricing-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.filter = '';
            }

            const price = this.querySelector('.amount');
            if (price) {
                price.style.transform = '';
                price.style.color = '';
            }

            const features = this.querySelectorAll('.features-list li');
            features.forEach(feature => {
                feature.style.transform = '';
                feature.style.color = '';
            });
        });

        // Pricing button interactions
        const pricingBtn = card.querySelector('.pricing-btn');
        if (pricingBtn) {
            pricingBtn.addEventListener('click', function(e) {
                e.preventDefault();

                const plan = this.dataset.plan;
                createPricingClickEffect(card, plan);
                showPricingConfirmation(plan);
            });
        }
    });
}

// FAQ items interactions
function initializeFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02) rotateY(1deg)';

            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
                icon.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.5)';
            }
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }
        });

        // Click to expand/highlight effect
        item.addEventListener('click', function() {
            createFAQClickEffect(this);
        });
    });
}

// Progress demo in CTA section
function initializeProgressDemo() {
    const progressCircle = document.querySelector('.progress-circle');
    const progressValue = document.querySelector('.progress-value');

    if (progressCircle && progressValue) {
        let progress = 0;
        const targetProgress = 100;

        function animateProgress() {
            const progressObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const timer = setInterval(() => {
                            progress += 2;
                            if (progress >= targetProgress) {
                                progress = targetProgress;
                                clearInterval(timer);

                                // Reset after a delay
                                setTimeout(() => {
                                    progress = 0;
                                    updateProgress();
                                    setTimeout(animateProgress, 1000);
                                }, 2000);
                            }
                            updateProgress();
                        }, 50);

                        progressObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            progressObserver.observe(progressCircle);
        }

        function updateProgress() {
            const degree = (progress / 100) * 360;
            progressCircle.style.background = `conic-gradient(var(--text-blue) ${degree}deg, var(--glass-border) ${degree}deg)`;
            progressValue.textContent = `${Math.floor(progress)}%`;

            if (progress === 100) {
                progressValue.textContent = 'Ready!';
                progressValue.style.color = '#22c55e';
            } else {
                progressValue.style.color = 'var(--text-blue)';
            }
        }

        animateProgress();
    }
}

// Quick download buttons
function initializeQuickDownload() {
    const quickButtons = document.querySelectorAll('.quick-btn');

    quickButtons.forEach(button => {
        const platform = button.dataset.platform;

        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';

            setTimeout(() => {
                this.style.transform = '';
                createQuickDownloadEffect(this, platform);

                if (platform === 'web') {
                    showInstantPlayEffect();
                } else if (platform === 'mobile') {
                    showMobileDownloadOptions();
                } else if (platform === 'wishlist') {
                    showWishlistConfirmation();
                }
            }, 150);
        });
    });
}

// Download-specific particle effects
function initializeDownloadParticles() {
    function createDownloadFloatingElement() {
        const downloadElements = ['📱', '💻', '🌐', '⬇️', '🚀'];
        const element = document.createElement('div');
        const downloadIcon = downloadElements[Math.floor(Math.random() * downloadElements.length)];

        element.innerHTML = downloadIcon;
        element.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            pointer-events: none;
            z-index: -1;
            animation: downloadFloatUp ${Math.random() * 15 + 20}s linear infinite;
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

    // Add CSS for download floating animation
    if (!document.querySelector('#downloadFloatingAnimation')) {
        const style = document.createElement('style');
        style.id = 'downloadFloatingAnimation';
        style.textContent = `
            @keyframes downloadFloatUp {
                0% { opacity: 0; transform: translateY(0) rotate(0deg); }
                10% { opacity: 0.8; transform: translateY(-10vh) rotate(45deg); }
                90% { opacity: 0.6; transform: translateY(-90vh) rotate(315deg); }
                100% { opacity: 0; transform: translateY(-100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setInterval(createDownloadFloatingElement, 4000);
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

// Download effect
function createDownloadEffect(button, platform) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create download arrow
    const arrow = document.createElement('div');
    arrow.innerHTML = '⬇️';
    arrow.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 10000;
        animation: downloadArrow 2s ease-out forwards;
        transform: translate(-50%, -50%);
    `;

    document.body.appendChild(arrow);
    setTimeout(() => arrow.remove(), 2000);

    // Create platform-specific particles
    const platformEmojis = {
        ios: ['🍎', '📱', '💙'],
        android: ['🤖', '📱', '💚'],
        web: ['🌐', '⚡', '🚀'],
        pc: ['💻', '🖥️', '⚙️']
    };

    const emojis = platformEmojis[platform] || ['⬇️', '💙', '⭐'];

    for (let i = 0; i < 6; i++) {
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
            animation: downloadBurst 2s ease-out forwards;
        `;

        const angle = (i / 6) * Math.PI * 2;
        const velocity = 80 + Math.random() * 40;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Add download animations
    if (!document.querySelector('#downloadEffectAnimations')) {
        const style = document.createElement('style');
        style.id = 'downloadEffectAnimations';
        style.textContent = `
            @keyframes downloadArrow {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, 50px) scale(1.5); }
                100% { opacity: 0; transform: translate(-50%, 100px) scale(0.5); }
            }
            @keyframes downloadBurst {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show download confirmation
function showDownloadConfirmation(platform) {
    const platformNames = {
        ios: 'iOS App Store',
        android: 'Google Play Store',
        web: 'Web Browser',
        pc: 'PC Notification List'
    };

    const platformIcons = {
        ios: '🍎',
        android: '🤖',
        web: '🌐',
        pc: '💻'
    };

    const name = platformNames[platform] || 'Download';
    const icon = platformIcons[platform] || '⬇️';

    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-gradient);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        text-align: center;
        min-width: 250px;
    `;

    confirmation.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${icon}</div>
        <div style="font-size: 1.1rem; margin-bottom: 0.3rem;">Download Started!</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">Redirecting to ${name}</div>
    `;

    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => confirmation.remove(), 500);
    }, 4000);

    if (!document.querySelector('#confirmationAnimations')) {
        const style = document.createElement('style');
        style.id = 'confirmationAnimations';
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

// Track download attempts
function trackDownload(platform) {
    // In a real application, this would send analytics data
    console.log(`Download tracked: ${platform}`);

    // Update download count in localStorage for demo
    const downloads = JSON.parse(localStorage.getItem('pandax_downloads') || '{}');
    downloads[platform] = (downloads[platform] || 0) + 1;
    localStorage.setItem('pandax_downloads', JSON.stringify(downloads));
}

// Animate stat values
function animateStatValue(element) {
    const currentText = element.textContent;
    const number = parseInt(currentText.replace(/[^0-9]/g, ''));

    if (number) {
        let current = 0;
        const increment = number / 20;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + currentText.replace(/[0-9]/g, '').charAt(0);
        }, 50);
    }
}

// Platform click effect
function createPlatformClickEffect(card) {
    const icon = card.querySelector('.platform-icon');
    if (icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Determine platform type for appropriate particles
        let platformParticles = ['💙', '⭐', '✨'];

        if (card.classList.contains('mobile-card')) {
            platformParticles = ['📱', '📲', '💙'];
        } else if (card.classList.contains('pc-card')) {
            platformParticles = ['💻', '🖥️', '⚙️'];
        } else if (card.classList.contains('web-card')) {
            platformParticles = ['🌐', '⚡', '🚀'];
        }

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const emoji = platformParticles[Math.floor(Math.random() * platformParticles.length)];

            particle.innerHTML = emoji;
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 10000;
                animation: platformBurst 2s ease-out forwards;
            `;

            const angle = (i / 8) * Math.PI * 2;
            const velocity = 70 + Math.random() * 50;
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }

    if (!document.querySelector('#platformBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'platformBurstAnimation';
        style.textContent = `
            @keyframes platformBurst {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Pricing click effect
function createPricingClickEffect(card, plan) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pricingEmojis = plan === 'premium' ? ['💎', '🎒', '⭐', '🏆'] : ['🆓', '🎮', '💙', '✨'];

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        const emoji = pricingEmojis[Math.floor(Math.random() * pricingEmojis.length)];

        particle.innerHTML = emoji;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 10000;
            animation: pricingBurst 3s ease-out forwards;
        `;

        const angle = (i / 10) * Math.PI * 2;
        const velocity = 100 + Math.random() * 60;
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    if (!document.querySelector('#pricingBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'pricingBurstAnimation';
        style.textContent = `
            @keyframes pricingBurst {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
                100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show pricing confirmation
function showPricingConfirmation(plan) {
    const planInfo = {
        free: { name: 'Free Explorer', icon: '🆓', message: 'Welcome to the adventure!' },
        premium: { name: 'Adventurer\'s Pack', icon: '🎒', message: 'Premium features unlocked!' }
    };

    const info = planInfo[plan];
    if (!info) return;

    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 2.5rem 3rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 1.3rem;
        z-index: 10001;
        animation: pricingConfirmation 3s ease-out forwards;
        backdrop-filter: blur(15px);
        box-shadow: 0 25px 70px rgba(59, 130, 246, 0.6);
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;

    confirmation.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${info.icon}</div>
        <div style="margin-bottom: 0.5rem;">${info.name}</div>
        <div style="font-size: 1rem; opacity: 0.9;">${info.message}</div>
    `;

    document.body.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 3000);

    if (!document.querySelector('#pricingConfirmationAnimation')) {
        const style = document.createElement('style');
        style.id = 'pricingConfirmationAnimation';
        style.textContent = `
            @keyframes pricingConfirmation {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
}

// FAQ click effect
function createFAQClickEffect(item) {
    const icon = item.querySelector('.faq-icon');
    if (icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create question mark particles
        const faqEmojis = ['❓', '💡', '✅', '📚'];

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            const emoji = faqEmojis[Math.floor(Math.random() * faqEmojis.length)];

            particle.innerHTML = emoji;
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 10000;
                animation: faqBurst 1.5s ease-out forwards;
            `;

            const angle = (i / 6) * Math.PI * 2;
            const velocity = 50 + Math.random() * 30;
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }

        // Add highlight effect to the FAQ item
        item.style.background = 'var(--glass-hover)';
        item.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        item.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';

        setTimeout(() => {
            item.style.background = '';
            item.style.borderColor = '';
            item.style.boxShadow = '';
        }, 2000);
    }

    if (!document.querySelector('#faqBurstAnimation')) {
        const style = document.createElement('style');
        style.id = 'faqBurstAnimation';
        style.textContent = `
            @keyframes faqBurst {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Quick download effect
function createQuickDownloadEffect(button, platform) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create quick action effect
    const effect = document.createElement('div');
    effect.innerHTML = '⚡';
    effect.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: 2.5rem;
        pointer-events: none;
        z-index: 10000;
        animation: quickEffect 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;

    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);

    if (!document.querySelector('#quickEffectAnimation')) {
        const style = document.createElement('style');
        style.id = 'quickEffectAnimation';
        style.textContent = `
            @keyframes quickEffect {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show instant play effect
function showInstantPlayEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--aurora-gradient);
        color: white;
        padding: 3rem 4rem;
        border-radius: 25px;
        font-weight: 700;
        font-size: 1.5rem;
        z-index: 10001;
        animation: instantPlay 3s ease-out forwards;
        backdrop-filter: blur(20px);
        box-shadow: 0 30px 80px rgba(59, 130, 246, 0.7);
        text-align: center;
        border: 3px solid rgba(255, 255, 255, 0.3);
    `;

    effect.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">🚀</div>
        <div style="margin-bottom: 0.5rem;">Launching Game...</div>
        <div style="font-size: 1rem; opacity: 0.9; font-weight: 400;">Get ready for adventure!</div>
    `;

    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 3000);

    if (!document.querySelector('#instantPlayAnimation')) {
        const style = document.createElement('style');
        style.id = 'instantPlayAnimation';
        style.textContent = `
            @keyframes instantPlay {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(-10deg); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2) rotate(5deg); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show mobile download options
function showMobileDownloadOptions() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: modalFadeIn 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: var(--glass-bg);
        backdrop-filter: blur(25px);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 3rem 2.5rem;
        text-align: center;
        max-width: 400px;
        width: 90%;
        color: var(--text-primary);
        animation: modalSlideIn 0.3s ease-out;
    `;

    content.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1.5rem;">📱</div>
        <h3 style="margin-bottom: 1.5rem; color: var(--text-primary);">Choose Your Platform</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
                <span style="font-size: 1.2rem;">🍎</span>
                Download for iOS
            </button>
            <button class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
                <span style="font-size: 1.2rem;">🤖</span>
                Download for Android
            </button>
        </div>
        <button style="margin-top: 1.5rem; background: none; border: none; color: var(--text-muted); cursor: pointer;">Close</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = content.querySelector('button:last-child');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.3s ease-in forwards';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });

    if (!document.querySelector('#modalAnimations')) {
        const style = document.createElement('style');
        style.id = 'modalAnimations';
        style.textContent = `
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes modalSlideIn {
                from { opacity: 0; transform: scale(0.8) translateY(30px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show wishlist confirmation
function showWishlistConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--warm-gradient);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 15px 40px rgba(251, 191, 36, 0.4);
        text-align: center;
        min-width: 250px;
    `;

    confirmation.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💻</div>
        <div style="font-size: 1.1rem; margin-bottom: 0.3rem;">Added to Wishlist!</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">We'll notify you when PC version is ready</div>
    `;

    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => confirmation.remove(), 500);
    }, 4000);
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

    // Disable floating particles
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
}