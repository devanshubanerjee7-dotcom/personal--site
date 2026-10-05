(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  const menuLinks = [...document.querySelectorAll('.nav-menu a')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  };

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  });

  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        menuLinks.forEach((link) => {
          if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -58% 0px' });
    sections.forEach((section) => navObserver.observe(section));
  }

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  const emptyMessage = document.querySelector('.filter-empty');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
        card.classList.toggle('is-hidden', !show);
        if (show) visibleCount += 1;
      });
      emptyMessage.hidden = visibleCount !== 0;
    });
  });

  const skillTabs = [...document.querySelectorAll('[data-skill-tab]')];
  const skillPanels = [...document.querySelectorAll('[data-skill-panel]')];
  const activateSkill = (tab) => {
    skillTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    skillPanels.forEach((panel) => {
      panel.hidden = panel.dataset.skillPanel !== tab.dataset.skillTab;
    });
  };
  skillTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateSkill(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % skillTabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + skillTabs.length) % skillTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = skillTabs.length - 1;
      skillTabs[nextIndex].focus();
      activateSkill(skillTabs[nextIndex]);
    });
  });

  const terminalReset = document.querySelector('.terminal-reset');
  const typedOutputs = document.querySelectorAll('.typed-output');
  const typeWords = () => {
    if (reduceMotion) return;
    typedOutputs.forEach((element) => {
      const fullText = element.textContent;
      element.textContent = '';
      let position = 0;
      const typeCharacter = () => {
        if (position >= fullText.length) return;
        element.textContent += fullText[position];
        position += 1;
        window.setTimeout(typeCharacter, 60);
      };
      window.setTimeout(typeCharacter, 180);
    });
  };
  if (terminalReset) {
    terminalReset.addEventListener('click', () => {
      typedOutputs.forEach((element, index) => {
        element.textContent = index === 0 ? 'whoami' : "what's next?";
      });
      typeWords();
    });
  }
  typeWords();

  document.querySelectorAll('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (window.location.hash !== link.getAttribute('href')) history.pushState(null, '', link.getAttribute('href'));
    });
  });
})();
