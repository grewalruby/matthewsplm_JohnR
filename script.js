/**
 * Infor CloudSuite PLM — Matthews Demonstration
 * Interactive Application Controller
 * Premium Animations & Transitions
 * Copyright © 2025. Infor. All Rights Reserved.
 */

(function () {
    'use strict';

    // ========================================================================
    // NAVIGATION
    // ========================================================================
    const navItems = document.querySelectorAll('.ids-nav__item');
    const pages = document.querySelectorAll('.ids-page');
    const mainContent = document.querySelector('.ids-main');

    function navigateTo(sectionId) {
        // Deactivate all nav items
        navItems.forEach(function (item) {
            item.classList.remove('ids-nav__item--active');
        });

        // Activate clicked nav item
        const activeNav = document.querySelector('[data-section="' + sectionId + '"]');
        if (activeNav) {
            activeNav.classList.add('ids-nav__item--active');
        }

        // Hide all pages with fade out, show target with fade in
        pages.forEach(function (page) {
            page.classList.remove('ids-page--active');
        });

        var target = document.getElementById('page-' + sectionId);
        if (target) {
            target.classList.add('ids-page--active');
            // Trigger staggered reveal of child elements
            revealPageElements(target);
        }

        // Smooth scroll main content to top
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var section = this.getAttribute('data-section');
            if (section) {
                navigateTo(section);
            }
        });
    });

    // ========================================================================
    // TABS
    // ========================================================================
    var tabButtons = document.querySelectorAll('.ids-tabs__btn');

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tabId = this.getAttribute('data-tab');
            var container = this.closest('.ids-card__body');

            if (!container) return;

            // Deactivate all tabs in this container
            container.querySelectorAll('.ids-tabs__btn').forEach(function (b) {
                b.classList.remove('ids-tabs__btn--active');
            });

            // Activate clicked tab
            this.classList.add('ids-tabs__btn--active');

            // Hide all panels, show target
            container.querySelectorAll('.ids-tabs__panel').forEach(function (panel) {
                panel.classList.remove('ids-tabs__panel--active');
            });

            var targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('ids-tabs__panel--active');
            }
        });
    });

    // ========================================================================
    // ACCORDION
    // ========================================================================
    var accordionTriggers = document.querySelectorAll('.ids-accordion__trigger');

    accordionTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var accordion = this.closest('.ids-accordion');
            var panel = this.nextElementSibling;
            var isActive = this.classList.contains('ids-accordion__trigger--active');

            // Close all items in this accordion group
            if (accordion) {
                accordion.querySelectorAll('.ids-accordion__trigger').forEach(function (t) {
                    t.classList.remove('ids-accordion__trigger--active');
                });
                accordion.querySelectorAll('.ids-accordion__panel').forEach(function (p) {
                    p.classList.remove('ids-accordion__panel--open');
                });
            }

            // Toggle current item (open if it was closed)
            if (!isActive) {
                this.classList.add('ids-accordion__trigger--active');
                if (panel) {
                    panel.classList.add('ids-accordion__panel--open');
                }
            }
        });
    });

    // ========================================================================
    // KEYBOARD NAVIGATION
    // ========================================================================
    document.addEventListener('keydown', function (e) {
        if (e.altKey) {
            var currentNav = document.querySelector('.ids-nav__item--active');
            var navArray = Array.from(navItems);
            var currentIndex = navArray.indexOf(currentNav);

            if (e.key === 'ArrowDown' && currentIndex < navArray.length - 1) {
                e.preventDefault();
                navigateTo(navArray[currentIndex + 1].getAttribute('data-section'));
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                navigateTo(navArray[currentIndex - 1].getAttribute('data-section'));
            }
        }
    });

    // ========================================================================
    // STAGGERED ELEMENT REVEAL
    // ========================================================================
    function revealPageElements(page) {
        var elements = page.querySelectorAll('.ids-card, .ids-role-card, .ids-stat, .ids-hero, .ids-screenshot, .ids-output-box, .ids-grid');
        
        elements.forEach(function (el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(function () {
                el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 80 + (index * 60));
        });
    }

    // ========================================================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ========================================================================
    var observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Setup scroll observation for all animated elements
    function setupScrollAnimations() {
        document.querySelectorAll('.ids-card, .ids-role-card, .ids-stat, .ids-screenshot, .ids-output-box').forEach(function (el) {
            // Only set initial hidden state if element is below viewport
            var rect = el.getBoundingClientRect();
            var viewHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top > viewHeight) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                scrollObserver.observe(el);
            }
        });
    }

    // ========================================================================
    // INITIAL PAGE LOAD
    // ========================================================================
    window.addEventListener('DOMContentLoaded', function () {
        // Small delay for page paint, then reveal
        setTimeout(function () {
            var activePage = document.querySelector('.ids-page--active');
            if (activePage) {
                revealPageElements(activePage);
            }
            // Setup scroll animations after initial reveal
            setTimeout(setupScrollAnimations, 600);
        }, 50);
    });

})();
