// Panda X - Index Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing gallery...');
    // Run debug after a short delay to ensure CSS is applied
    setTimeout(debugGallery, 100);
    initializeVideoPlayer();
    initializeScreenshotGallery();
    initializeStatsAnimation();
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeSocialLinks();
});

// Enhanced video player functionality
function initializeVideoPlayer() {
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer?.querySelector('video');
    const playButton = videoContainer?.querySelector('.play-button');

    if (!video || !playButton) return;

    // Play button functionality
    playButton.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playButton.style.opacity = '0';
            playButton.style.pointerEvents = 'none';
        }
    });

    // Show play button when video is paused
    video.addEventListener('pause', function() {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
    });

    // Hide play button when video starts playing
    video.addEventListener('play', function() {
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
    });

    // Show play button when video ends
    video.addEventListener('ended', function() {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
    });

    // Add hover effects to video container
    videoContainer.addEventListener('mouseenter', function() {
        if (video.paused) {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }
    });

    videoContainer.addEventListener('mouseleave', function() {
        if (video.paused) {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
}

// ADDED: Debug function to check gallery visibility
function debugGallery() {
    const gallery = document.querySelector('.screenshots');
    const container = document.querySelector('.screenshot-scroll-container');
    const wrapper = document.querySelector('.screenshot-scroll-wrapper');
    const items = document.querySelectorAll('.screenshot-item');

    console.log('=== Gallery Debug Info ===');
    console.log('Gallery section:', gallery ? 'Found' : 'NOT FOUND');
    console.log('Container:', container ? 'Found' : 'NOT FOUND');
    console.log('Wrapper:', wrapper ? 'Found' : 'NOT FOUND');
    console.log('Items count:', items.length);

    if (gallery) {
        console.log('Gallery display:', getComputedStyle(gallery).display);
        console.log('Gallery visibility:', getComputedStyle(gallery).visibility);
        console.log('Gallery height:', gallery.offsetHeight);
    }

    if (container) {
        console.log('Container display:', getComputedStyle(container).display);
        console.log('Container height:', container.offsetHeight);
    }

    if (wrapper) {
        console.log('Wrapper display:', getComputedStyle(wrapper).display);
        console.log('Wrapper width:', wrapper.offsetWidth);
    }

    items.forEach((item, index) => {
        console.log(`Item ${index + 1} display:`, getComputedStyle(item).display);
        console.log(`Item ${index + 1} dimensions:`, item.offsetWidth + 'x' + item.offsetHeight);
    });
}

// FIXED Screenshot gallery initialization function
function initializeScreenshotGallery() {
    const scrollContainer = document.querySelector('.screenshot-scroll-container');
    const scrollWrapper = document.querySelector('.screenshot-scroll-wrapper');

    // ADDED: Debug logging to check if elements exist
    console.log('Screenshot container found:', !!scrollContainer);
    console.log('Screenshot wrapper found:', !!scrollWrapper);

    if (!scrollContainer || !scrollWrapper) {
        console.error('Screenshot gallery elements not found');
        return;
    }

    // ADDED: Force display the section
    scrollContainer.style.display = 'block';
    scrollWrapper.style.display = 'flex';

    // Add smooth scroll behavior
    scrollContainer.style.scrollBehavior = 'smooth';

    // Auto-scroll functionality - SIMPLIFIED and FIXED
    let isAutoScrolling = true;
    let autoScrollInterval;
    let scrollDirection = 1;

    function startAutoScroll() {
        // ADDED: Clear any existing interval
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        autoScrollInterval = setInterval(() => {
            if (!isAutoScrolling) return;

            const maxScroll = scrollWrapper.scrollWidth - scrollContainer.clientWidth;
            const currentScroll = scrollContainer.scrollLeft;

            // FIXED: Better boundary detection
            if (currentScroll >= maxScroll - 5) {
                scrollDirection = -1;
            } else if (currentScroll <= 5) {
                scrollDirection = 1;
            }

            scrollContainer.scrollLeft += scrollDirection * 1;
        }, 30);
    }

    // Pause auto-scroll on hover
    scrollContainer.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            isAutoScrolling = true;
        }, 1000);
    });

    // Pause auto-scroll on manual scroll
    scrollContainer.addEventListener('scroll', () => {
        isAutoScrolling = false;
        clearTimeout(window.scrollResumeTimeout);
        window.scrollResumeTimeout = setTimeout(() => {
            isAutoScrolling = true;
        }, 3000);
    });

    // Start auto-scroll
    startAutoScroll();

    // Enhanced hover effects for screenshots
    const screenshots = document.querySelectorAll('.screenshot-item');
    console.log('Screenshots found:', screenshots.length);

    screenshots.forEach((screenshot, index) => {
        // ADDED: Force display for each screenshot
        screenshot.style.display = 'block';

        // Add enhanced hover effect
        screenshot.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = 'var(--shadow-glow)';
            this.style.zIndex = '10';
        });

        screenshot.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-soft)';
            this.style.zIndex = '1';
        });

        // Add focus for accessibility
        screenshot.setAttribute('tabindex', '0');
        screenshot.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(59, 130, 246, 0.6)';
            this.style.outlineOffset = '3px';
        });

        screenshot.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ADDED: Force visibility check
    setTimeout(() => {
        const isVisible = scrollContainer.offsetHeight > 0 && scrollContainer.offsetWidth > 0;
        console.log('Gallery is visible:', isVisible);

        if (!isVisible) {
            console.error('Gallery is not visible. Check CSS display properties.');
        }
    }, 100);
}

// Add scroll indicators to show there's more content
function addScrollIndicators(scrollContainer, scrollWrapper) {
    // Create left indicator
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'scroll-indicator left';
    leftIndicator.innerHTML = '‹';
    leftIndicator.style.cssText = `
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background: rgba(59, 130, 246, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        z-index: 100;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    `;

    // Create right indicator
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'scroll-indicator right';
    rightIndicator.innerHTML = '›';
    rightIndicator.style.cssText = leftIndicator.style.cssText.replace('left: 10px', 'right: 10px');

    // Make parent container relative
    const screenshotsSection = scrollContainer.closest('.screenshots');
    screenshotsSection.style.position = 'relative';

    screenshotsSection.appendChild(leftIndicator);
    screenshotsSection.appendChild(rightIndicator);

    // Update indicator visibility
    function updateIndicators() {
        const maxScroll = scrollWrapper.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;

        leftIndicator.style.opacity = currentScroll > 20 ? '1' : '0';
        rightIndicator.style.opacity = currentScroll < maxScroll - 20 ? '1' : '0';
    }

    // Scroll functions - scroll one image at a time
    leftIndicator.addEventListener('click', () => {
        const imageWidth = 300 + 24; // image width + gap
        scrollContainer.scrollLeft -= imageWidth;
    });

    rightIndicator.addEventListener('click', () => {
        const imageWidth = 300 + 24; // image width + gap
        scrollContainer.scrollLeft += imageWidth;
    });

    // Update indicators on scroll
    scrollContainer.addEventListener('scroll', updateIndicators);

    // Initial update
    updateIndicators();

    // Show indicators on hover
    screenshotsSection.addEventListener('mouseenter', () => {
        updateIndicators();
    });

    screenshotsSection.addEventListener('mouseleave', () => {
        setTimeout(() => {
            leftIndicator.style.opacity = '0';
            rightIndicator.style.opacity = '0';
        }, 1000);
    });
}

// Animated statistics counter
function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
            current = number;
            clearInterval(timer);
        }

        // Format the number
        let displayNumber = Math.floor(current);
        if (displayNumber >= 1000000) {
            displayNumber = (displayNumber / 1000000).toFixed(1) + 'M';
        } else if (displayNumber >= 1000) {
            displayNumber = (displayNumber / 1000).toFixed(0) + 'K';
        }

        element.textContent = displayNumber + suffix;
    }, duration / steps);
}

// FIXED: Lazy loading initialization
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    console.log('Lazy images found:', images.length);

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // ADDED: Handle image loading events
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    console.log('Image loaded:', img.src);
                });

                img.addEventListener('error', () => {
                    console.error('Image failed to load:', img.src);
                    // ADDED: Show placeholder on error
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.textContent = 'Image not found';
                    placeholder.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: var(--glass-bg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--text-readable);
                        font-weight: 600;
                    `;
                    img.parentNode.appendChild(placeholder);
                });

                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .stat-item, .community-text');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((element, index) => {
        element.dataset.delay = index * 150;
        scrollObserver.observe(element);
    });
}

// Social links enhancements
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');

    socialLinks.forEach(link => {
        // Add tooltip functionality
        const platform = getPlatformFromUrl(link.href);
        link.setAttribute('title', `Follow us on ${platform}`);

        // Add click tracking (you can replace this with your analytics)
        link.addEventListener('click', (e) => {
            console.log(`Social link clicked: ${platform}`);
            // Example: gtag('event', 'social_click', { platform: platform });
        });

        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Utility function to get platform name from URL
function getPlatformFromUrl(url) {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('facebook.com')) return 'Facebook';
    return 'Social Media';
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Keyboard navigation for screenshot gallery
document.addEventListener('keydown', function(e) {
    const scrollContainer = document.querySelector('.screenshot-scroll-container');
    if (!scrollContainer) return;

    // Arrow key navigation when gallery is focused
    if (document.activeElement === scrollContainer ||
        scrollContainer.contains(document.activeElement)) {

        const imageWidth = 300 + 24; // image width + gap

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollContainer.scrollLeft -= imageWidth;
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollContainer.scrollLeft += imageWidth;
        }
    }
});

// Performance optimization for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable auto-scrolling for screenshots
    const scrollContainer = document.querySelector('.screenshot-scroll-container');
    if (scrollContainer) {
        scrollContainer.style.scrollBehavior = 'auto';
    }

    // Reduce animation durations
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
}

// Add touch/swipe support for mobile
function addTouchSupport() {
    const scrollContainer = document.querySelector('.screenshot-scroll-container');
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Slower drag for better control with 3 images
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Initial cursor
    scrollContainer.style.cursor = 'grab';
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', addTouchSupport);

// Center the gallery if it fits within the container
function centerGalleryIfNeeded() {
    const scrollContainer = document.querySelector('.screenshot-scroll-container');
    const scrollWrapper = document.querySelector('.screenshot-scroll-wrapper');

    if (!scrollContainer || !scrollWrapper) return;

    // Check if all images fit within the container
    const containerWidth = scrollContainer.clientWidth;
    const wrapperWidth = scrollWrapper.scrollWidth;

    if (wrapperWidth <= containerWidth) {
        // Center the gallery
        scrollWrapper.style.justifyContent = 'center';
        scrollWrapper.style.width = '100%';

        // Remove auto-scroll since it's not needed
        const autoScrollInterval = window.autoScrollInterval;
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
}

// Initialize centering
document.addEventListener('DOMContentLoaded', centerGalleryIfNeeded);
window.addEventListener('resize', centerGalleryIfNeeded);