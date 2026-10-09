/**
 * Devanshu Banerjee — Builder's Command Center
 * Vanilla JavaScript for navigation, scroll reveals, and small interactions.
 */

(function () {
  'use strict';

  // Elements
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link, .nav__cta');
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('back-to-top');
  const currentYearEl = document.getElementById('current-year');
  const copyEmailBtn = document.getElementById('copy-email');
  const emailLink = document.getElementById('email-link');

  // Configuration
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const emailPlaceholder = 'hello@example.com';

  /**
   * Debounce utility
   */
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  /**
   * Header background on scroll
   */
  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }

  /**
   * Mobile navigation toggle
   */
  function toggleMenu(forceClose) {
    const isOpen = navMenu.classList.contains('is-open');
    const shouldOpen = typeof forceClose === 'boolean' ? !forceClose : !isOpen;

    navMenu.classList.toggle('is-open', shouldOpen);
    navToggle.setAttribute('aria-expanded', String(shouldOpen));
    navToggle.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  function closeMenu() {
    toggleMenu(true);
  }

  /**
   * Active section highlighting in navigation
   */
  function updateActiveSection() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight + 32 : 120);
    let currentId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.slice(1) === currentId) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Scroll reveal with IntersectionObserver
   */
  function initReveal() {
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Back to top
   */
  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  /**
   * Copy email to clipboard
   * Only enabled when the email is not the placeholder.
   */
  function initCopyEmail() {
    if (!copyEmailBtn || !emailLink) return;

    const rawEmail = emailLink.textContent.trim();
    const isPlaceholder = rawEmail === emailPlaceholder;

    if (!isPlaceholder) {
      copyEmailBtn.disabled = false;
      copyEmailBtn.removeAttribute('disabled');
      copyEmailBtn.classList.add('is-active');
    }

    copyEmailBtn.addEventListener('click', async () => {
      if (isPlaceholder) return;

      try {
        await navigator.clipboard.writeText(rawEmail);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
        }, 1800);
      } catch (err) {
        // Fallback: do nothing silently to avoid console noise
      }
    });
  }

  /**
   * Set current year in footer
   */
  function setCurrentYear() {
    if (currentYearEl) {
      currentYearEl.textContent = String(new Date().getFullYear());
    }
  }

  /**
   * Close mobile menu when clicking outside
   */
  function handleOutsideClick(e) {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  }

  /**
   * Close mobile menu on Escape key
   */
  function handleKeydown(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  }

  /**
   * Initialize
   */
  function init() {
    setCurrentYear();
    initReveal();
    initCopyEmail();

    window.addEventListener('scroll', debounce(updateHeader, 10), { passive: true });
    window.addEventListener('scroll', debounce(updateActiveSection, 50), { passive: true });
    window.addEventListener('resize', debounce(closeMenu, 100));
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeydown);

    if (navToggle) {
      navToggle.addEventListener('click', () => toggleMenu());
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });

    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
    }

    updateHeader();
    updateActiveSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
