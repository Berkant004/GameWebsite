// ✅ Shadow Realm - Elite Animation Engine v2.0
// AAA-tier animations: cinematic, smooth, performant
// No dependencies — pure vanilla JS + CSS
(function () {
    'use strict';

    // === Utility Functions (Cross-Browser Safe) ===
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    function addClass(el, cls) {
        if (el.classList) el.classList.add(cls);
        else el.className += ' ' + cls;
    }

    function removeClass(el, cls) {
        if (el.classList) el.classList.remove(cls);
        else el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    function hasClass(el, cls) {
        return el.classList ? el.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }

    function getClosest(el, selector) {
        while (el) {
            if (el.matches && el.matches(selector)) return el;
            el = el.parentElement;
        }
        return null;
    }

    // === Smooth Scroll (with fallback) ===
    function smoothScrollTo(target) {
        if ('scrollBehavior' in document.documentElement.style) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo(0, target.offsetTop);
        }
    }

    // === Loading Overlay Fade (with minimum duration) ===
    function initLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) return;

        // Ensure minimum 800ms visibility for smooth effect
        const minDuration = 800;
        const start = Date.now();

        const finish = () => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, minDuration - elapsed);
            setTimeout(() => {
                addClass(overlay, 'loaded');
                document.body.style.overflow = 'auto';
            }, remaining);
        };

        // Hide on load or error
        if (document.readyState === 'complete') {
            finish();
        } else {
            window.addEventListener('load', finish);
        }
    }

    // === Hero Text Reveal (Cinematic Split Animation) ===
    function initTextReveal() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (!heroTitle) return;

        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = '';

        // Create span for each word
        text.split(' ').forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(40px) skewY(10deg)';
            span.style.transition = `all 0.5s cubic-bezier(0.2, 0.8, 0.3, 1) ${i * 0.1 + 0.3}s`;
            heroTitle.appendChild(span);
        });

        // Reveal after loading
        setTimeout(() => {
            const spans = heroTitle.children;
            for (let span of spans) {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) skewY(0)';
            }
        }, 600);
    }

    // === Staggered Reveal on Scroll (Intersection Observer) ===
    function initStaggeredReveal() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const container = entry.target;
                        const items = container.querySelectorAll('.feature-card, .news-card, .screenshot-item');
                        items.forEach((item, i) => {
                            if (!hasClass(item, 'animated')) {
                                item.style.opacity = '0';
                                item.style.transform = 'translateY(30px)';
                                item.style.transition = `opacity 0.6s ease, transform 0.6s ease ${i * 0.08}s`;
                                setTimeout(() => {
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateY(0)';
                                    addClass(item, 'animated');
                                }, 50);
                            }
                        });
                        observer.unobserve(container);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        document.querySelectorAll('.features-grid, .news-grid, .screenshot-scroll-wrapper').forEach((container) => {
            observer.observe(container);
        });
    }

    // === Magnetic Hover (Buttons & Cards) ===
    function initMagneticHover() {
        const hoverables = document.querySelectorAll('.btn-primary, .btn-secondary, .feature-card, .news-card, .screenshot-item');

        hoverables.forEach((el) => {
            el.addEventListener('mousemove', function (e) {
                const rect = el.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;

                // Subtle magnetic effect
                const tx = relX * 0.06;
                const ty = relY * 0.06;

                el.style.transform = `translate(${tx}px, ${ty}px) scale(1.03)`;
                el.style.zIndex = '10';
            });

            el.addEventListener('mouseleave', function () {
                this.style.transform = '';
                this.style.zIndex = 'auto';
            });
        });
    }

    // === Floating Animation (Logo, Icons) ===
    function initFloatingElements() {
        const floats = document.querySelectorAll('.feature-icon, .game-logo, .logo h1, .read-more');
        floats.forEach((el) => {
            let animating = false;

            el.addEventListener('mouseenter', () => {
                if (animating) return;
                animating = true;
                el.style.transform = 'scale(1.15) rotate(6deg)';
                setTimeout(() => { animating = false; }, 200);
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // === Auto-Drift Screenshot Carousel ===
    function initScreenshotDrift() {
        const wrapper = document.querySelector('.screenshot-scroll-wrapper');
        if (!wrapper) return;

        let scrollPos = 0;
        let direction = 1;

        function drift() {
            scrollPos += direction * 0.4;
            if (scrollPos > 120) direction = -1;
            if (scrollPos < -120) direction = 1;

            wrapper.style.transform = `translateX(${scrollPos}px)`;
            requestAnimationFrame(drift);
        }

        setTimeout(drift, 2500);
    }

    // === Enhanced Video Trailer Interaction ===
    function initTrailerAnimation() {
        const container = document.querySelector('.video-container');
        if (!container) return;

        container.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)';
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.03)';
            container.style.boxShadow = '0 30px 60px rgba(0,0,0,0.35)';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = '';
            container.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
    }

    // === Header Scroll Effect (Refined) ===
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                addClass(header, 'scrolled');
            } else {
                removeClass(header, 'scrolled');
            }
        });
    }

    // === Mobile Menu Toggle ===
    function initMobileMenu() {
        const button = document.querySelector('.mobile-menu-button');
        const nav = document.querySelector('nav ul');
        if (!button || !nav) return;

        button.addEventListener('click', () => {
            toggleClass(nav, 'active');
            button.setAttribute('aria-expanded', hasClass(nav, 'active'));
        });

        document.addEventListener('click', (e) => {
            if (hasClass(nav, 'active') && !getClosest(e.target, 'nav') && e.target !== button) {
                removeClass(nav, 'active');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // === Smooth Scroll for Anchor Links ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if (target) smoothScrollTo(target);
            });
        });
    }

    // === Video Play Button Logic ===
    function initVideoControls() {
        const containers = document.querySelectorAll('.video-container');
        containers.forEach(container => {
            const video = container.querySelector('video');
            const playButton = container.querySelector('.play-button');
            if (!video || !playButton) return;

            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    addClass(playButton, 'hidden');
                }
            });

            video.addEventListener('play', () => {
                addClass(playButton, 'hidden');
            });

            video.addEventListener('pause', () => {
                // Optionally show play button again
                // removeClass(playButton, 'hidden');
            });
        });
    }

    // === Initialize All Systems ===
    function init() {
        initLoading();
        domReady(() => {
            setTimeout(() => {
                initTextReveal();
                initStaggeredReveal();
                initMagneticHover();
                initFloatingElements();
                initScreenshotDrift();
                initTrailerAnimation();
                initHeaderScroll();
                initMobileMenu();
                initSmoothScroll();
                initVideoControls();
            }, 300);
        });
    }

    // Start the engine
    init();

})();