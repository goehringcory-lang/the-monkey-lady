/* ============================================
   The Monkey Lady's Gift — Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // Amazon URL — single source of truth
    const AMAZON_URL = 'https://us.amazon.com/Monkey-Ladys-Gift-Debbie-Goehring/dp/B0GTQMKD6M';

    // ----- Amazon Link Centralization -----
    function initAmazonLinks() {
        document.querySelectorAll('[data-amazon-link]').forEach(function (el) {
            el.href = AMAZON_URL;
        });
    }

    // ----- Sticky Navigation -----
    function initNav() {
        var nav = document.getElementById('nav');
        var hero = document.getElementById('hero');
        if (!nav || !hero) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    nav.classList.remove('nav--scrolled');
                } else {
                    nav.classList.add('nav--scrolled');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(hero);
    }

    // ----- Mobile Hamburger Menu -----
    function initMobileMenu() {
        var nav = document.getElementById('nav');
        var hamburger = nav ? nav.querySelector('.nav__hamburger') : null;
        var menu = nav ? nav.querySelector('.nav__menu') : null;
        if (!hamburger || !menu) return;

        hamburger.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('nav--open');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on nav link click
        menu.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('nav--open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
                nav.classList.remove('nav--open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburger.focus();
            }
        });
    }

    // ----- Floating CTA -----
    function initFloatingCTA() {
        var cta = document.getElementById('floating-cta');
        var hero = document.getElementById('hero');
        if (!cta || !hero) return;

        // Check if previously dismissed
        if (sessionStorage.getItem('cta-dismissed') === 'true') return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    cta.hidden = true;
                } else {
                    cta.hidden = false;
                }
            });
        }, { threshold: 0 });

        observer.observe(hero);

        // Dismiss button
        var closeBtn = cta.querySelector('.floating-cta__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                cta.hidden = true;
                sessionStorage.setItem('cta-dismissed', 'true');
            });
        }
    }

    // ----- Scroll Animations -----
    function initScrollAnimations() {
        var elements = document.querySelectorAll(
            '.section__label, .section__title, .section__intro, ' +
            '.book__cover, .book__details, ' +
            '.author__photo, .author__bio, ' +
            '.story-card, .stories__cta-card, ' +
            '.gallery__item, ' +
            '.culture__block, .culture__cta, ' +
            '.review-card, .reviews__cta, ' +
            '.contact__text, .contact__form'
        );

        elements.forEach(function (el) {
            el.classList.add('fade-in');
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ----- Story Card Toggle -----
    function initStoryToggles() {
        document.querySelectorAll('.story-card__toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var card = btn.closest('.story-card');
                var fullText = card ? card.querySelector('.story-card__full') : null;
                if (!fullText) return;

                var isExpanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !isExpanded);
                fullText.hidden = isExpanded;
                btn.textContent = isExpanded ? 'Read More' : 'Read Less';
            });
        });
    }

    // ----- Smooth scroll for anchor links -----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ----- Initialize Everything -----
    document.addEventListener('DOMContentLoaded', function () {
        initAmazonLinks();
        initNav();
        initMobileMenu();
        initFloatingCTA();
        initScrollAnimations();
        initStoryToggles();
        initSmoothScroll();
    });
})();
