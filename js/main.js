// Loading overlay
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Hide loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        loadingOverlay.classList.add('loaded');
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuButton.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');

    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');
        });

        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
        });

        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced button animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // News card animations
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot-item');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
        });

        screenshot.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Hero section animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Add ripple effect to buttons
    function createRipple(event) {
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
    }

    const primaryButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Gallery auto-slide functionality
    const screenshotContainer = document.querySelector('.screenshot-scroll-container');
    const screenshotWrapper = document.querySelector('.screenshot-scroll-wrapper');
    const screenshotItems = document.querySelectorAll('.screenshot-item');

    if (screenshotContainer && screenshotWrapper && screenshotItems.length > 0) {
        const totalItems = screenshotItems.length;
        let currentIndex = 0;
        let autoSlideInterval;
        let direction = 1; // 1 for forward, -1 for backward
        let isAutoSliding = true;

        // Create auto-slide indicator
        const indicatorContainer = document.createElement('div');
        indicatorContainer.className = 'auto-slide-indicator';
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'auto-slide-progress';
        indicatorContainer.appendChild(progressIndicator);
        screenshotContainer.parentNode.insertBefore(indicatorContainer, screenshotContainer.nextSibling);

        // Function to update slide position
        function updateSlidePosition() {
            const itemWidth = 300 + 20; // width + gap
            const maxScroll = (totalItems - 1) * itemWidth;
            const newPosition = -currentIndex * itemWidth;
            screenshotWrapper.style.transform = `translateX(${newPosition}px)`;

            // Update scrollbar position to match visual position
            screenshotContainer.scrollLeft = -newPosition;
        }

        // Function to start auto-slide progress
        function startAutoSlideProgress() {
            progressIndicator.style.width = '0%';
            progressIndicator.style.transition = 'none';

            // Trigger reflow
            void progressIndicator.offsetWidth;

            progressIndicator.style.transition = `width 3s linear`;
            progressIndicator.style.width = '100%';
        }

        // Function to reset auto-slide progress
        function resetAutoSlideProgress() {
            progressIndicator.style.transition = 'none';
            progressIndicator.style.width = '0%';
        }

        // Auto slide function
        function autoSlide() {
            if (direction === 1) {
                if (currentIndex < totalItems - 1) {
                    currentIndex++;
                } else {
                    direction = -1; // Change direction to backward
                    currentIndex--;
                }
            } else {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    direction = 1; // Change direction to forward
                    currentIndex++;
                }
            }

            updateSlidePosition();
            resetAutoSlideProgress();
            if (isAutoSliding) startAutoSlideProgress();
        }

        // Start auto sliding
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(autoSlide, 3000);
            startAutoSlideProgress();
        }

        // Stop auto sliding
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
            resetAutoSlideProgress();
        }

        // Pause auto-slide on hover
        screenshotContainer.addEventListener('mouseenter', function() {
            if (isAutoSliding) {
                stopAutoSlide();
            }
        });

        screenshotContainer.addEventListener('mouseleave', function() {
            if (isAutoSliding) {
                startAutoSlide();
            }
        });

        // Manual scroll detection
        let isScrolling = false;
        screenshotContainer.addEventListener('scroll', function() {
            if (!isScrolling) {
                stopAutoSlide();
                isAutoSliding = false;
            }

            isScrolling = true;
            clearTimeout(screenshotContainer.scrollTimer);

            screenshotContainer.scrollTimer = setTimeout(function() {
                isScrolling = false;
                // Resume auto-slide after manual scrolling stops
                setTimeout(function() {
                    if (!isAutoSliding) {
                        isAutoSliding = true;
                        startAutoSlide();
                    }
                }, 2000);
            }, 150);
        });

        // Initialize auto-slide
        startAutoSlide();

        // Handle window resize
        window.addEventListener('resize', function() {
            updateSlidePosition();
        });
    }
});