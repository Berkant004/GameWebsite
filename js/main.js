// Main JavaScript for the website with cross-browser compatibility
(function() {
    'use strict';

    // Feature detection
    var supportsES6 = (function() {
        try {
            new Function('(a = 0) => a');
            return true;
        } catch (err) {
            return false;
        }
    })();

    var supportsIntersectionObserver = 'IntersectionObserver' in window;
    var supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    // DOM ready function (cross-browser compatible)
    function domReady(callback) {
        if (document.readyState === 'loading') {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                // Fallback for older IE
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'complete') {
                        callback();
                    }
                });
            }
        } else {
            callback();
        }
    }

    // Smooth scrolling function (cross-browser compatible)
    function smoothScrollTo(target, duration) {
        if (!supportsSmoothScroll) {
            // Fallback for older browsers
            target.scrollIntoView();
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Get closest element (cross-browser compatible)
    function getClosest(elem, selector) {
        if (elem.closest) {
            return elem.closest(selector);
        }

        // Fallback for older browsers
        while (elem) {
            if (elem.matches && elem.matches(selector)) {
                return elem;
            }
            elem = elem.parentElement || elem.parentNode;
        }
        return null;
    }

    // Add class to element (cross-browser compatible)
    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            // Fallback for older browsers
            element.className += ' ' + className;
        }
    }

    // Remove class from element (cross-browser compatible)
    function removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            // Fallback for older browsers
            element.className = element.className.replace(
                new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
                ' '
            );
        }
    }

    // Toggle class on element (cross-browser compatible)
    function toggleClass(element, className) {
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            // Fallback for older browsers
            var classes = element.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            element.className = classes.join(' ');
        }
    }

    // Main initialization function
    function init() {
        // Close loading overlay
        var loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            setTimeout(function() {
                addClass(loadingOverlay, 'loaded');
            }, 500);
        }

        // Smooth scrolling for navigation links
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchorLinks.length; i++) {
            anchorLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    var target = document.querySelector(targetId);
                    if (target) {
                        smoothScrollTo(target, 800);
                    }
                }
            });
        }

        // Video play button functionality - Updated for direct video control
        var videoContainers = document.querySelectorAll('.video-container');
        for (var v = 0; v < videoContainers.length; v++) {
            var videoContainer = videoContainers[v];
            var video = videoContainer.querySelector('video');
            var playButton = videoContainer.querySelector('.play-button');

            if (video && playButton) {
                // Play button click handler
                playButton.addEventListener('click', function(e) {
                    var container = getClosest(e.target, '.video-container');
                    var vid = container.querySelector('video');
                    var btn = container.querySelector('.play-button');

                    if (vid.paused) {
                        vid.play();
                        addClass(btn, 'hidden'); // Hide play button when video plays
                    }
                });

                // Video play handler (in case user uses native controls)
                video.addEventListener('play', function() {
                    var container = getClosest(this, '.video-container');
                    var btn = container.querySelector('.play-button');
                    addClass(btn, 'hidden'); // Hide play button when video plays
                });

                // Video pause handler (optional: show play button when paused)
                video.addEventListener('pause', function() {
                    var container = getClosest(this, '.video-container');
                    var btn = container.querySelector('.play-button');
                    // Remove hidden class when video is paused
                    // removeClass(btn, 'hidden');
                });
            }
        }

        // Header scroll effect
        function handleHeaderScroll() {
            var header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 100) {
                    addClass(header, 'scrolled');
                } else {
                    removeClass(header, 'scrolled');
                }
            }
        }

        if (window.addEventListener) {
            window.addEventListener('scroll', handleHeaderScroll);
        } else {
            // Fallback for older browsers
            window.attachEvent('onscroll', handleHeaderScroll);
        }

        // Add hover effects to interactive elements (touch-friendly)
        var hoverElements = document.querySelectorAll('.feature-card, .news-card, .screenshot-item');
        for (var k = 0; k < hoverElements.length; k++) {
            hoverElements[k].addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });

            hoverElements[k].addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }

        // Mobile menu toggle
        var mobileMenuButton = document.querySelector('.mobile-menu-button');
        var navMenu = document.querySelector('nav ul');

        if (mobileMenuButton && navMenu) {
            mobileMenuButton.addEventListener('click', function() {
                toggleClass(navMenu, 'active');
                var isExpanded = navMenu.classList.contains('active');
                mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                var isClickInsideNav = getClosest(e.target, 'nav') !== null;
                var isClickOnMenuButton = e.target === mobileMenuButton;

                if (!isClickInsideNav && !isClickOnMenuButton) {
                    removeClass(navMenu, 'active');
                    if (mobileMenuButton) {
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });

        // Lazy loading for images (with fallback)
        if (supportsIntersectionObserver) {
            var images = document.querySelectorAll('img[loading="lazy"]');
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        }

        // Form submission handling
        var forms = document.querySelectorAll('form');
        for (var l = 0; l < forms.length; l++) {
            forms[l].addEventListener('submit', function(e) {
                e.preventDefault();
                if (supportsES6) {
                    alert('Thank you for your interest! (This is a demo site)');
                } else {
                    window.alert('Thank you for your interest! (This is a demo site)');
                }
            });
        }

        // Modal functions (if needed in future)
        window.openModal = function(modalId) {
            var modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = function(modalId) {
            var modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        // Close modals when clicking outside
        document.addEventListener('click', function(event) {
            var modals = document.querySelectorAll('.modal');
            for (var m = 0; m < modals.length; m++) {
                if (event.target === modals[m]) {
                    modals[m].style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }

    // Initialize when DOM is ready
    domReady(init);

    // Utility functions
    window.scrollToTop = function() {
        if (supportsSmoothScroll) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    // Add loaded class to body
    domReady(function() {
        addClass(document.body, 'loaded');
    });

})();