"use strict";

/* ====== Content (edit this to update the site) ====== */
const roles = [
  "Software Development & AI Intern",
  "Backend & Microservices Developer",
  "Aspiring Cloud-Native DevOps Engineer",
];

const skills = [
  { group: "Languages", items: ["Python", "JavaScript", "HTML", "CSS"] },
  { group: "Backend", items: ["Node.js", "REST APIs", "Microservices"] },
  { group: "DevOps", items: ["Docker", "CI/CD", "Git", "Linux"] },
  { group: "Learning", items: ["Kubernetes", "Terraform", "Prometheus", "Grafana", "ArgoCD"] },
];

const experience = [
  {
    date: "May 2026 – Present",
    title: "Software Development & AI Intern",
    org: "Step to Success Pvt. Ltd.",
    points: [
      "Dockerized backend services and built CI/CD pipelines.",
      "Developed Python and Node.js microservices.",
      "Worked on REST API integrations.",
    ],
  },
  {
    date: "April 2026 – Present",
    title: "Google Student Ambassador & Technical Lead",
    org: "Maharishi University of Information Technology (MUIT)",
    points: ["Leading the developer community and technical events on campus."],
  },
  {
    date: "2025 – Present",
    title: "B.Tech, Computer Science & Engineering",
    org: "Maharishi University of Information Technology, Noida",
    points: [],
  },
];

const projects = [
  {
    name: "Deevuh",
    desc: "A full-stack e-commerce platform built as a freelance project for a client.",
    tags: ["Full-stack", "E-commerce"],
  },
  {
    name: "UCO Kart",
    desc: "A venture aggregating used cooking oil, turning a waste stream into a managed supply chain.",
    tags: ["Startup", "Sustainability"],
  },
  {
    name: "YouTube Automation",
    desc: "An AI-powered content pipeline designed to produce videos for affiliate income.",
    tags: ["AI", "Automation", "Python"],
  },
  {
    name: "RTO/COD Reconciliation",
    desc: "A micro-SaaS concept to help D2C sellers reconcile cash-on-delivery and return-to-origin orders.",
    tags: ["SaaS", "D2C"],
  },
];

/* ====== Helpers ====== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ====== Render sections ====== */
function renderSkills() {
  const grid = $("#skillsGrid");
  skills.forEach((s) => {
    const card = el("div", "skill-card reveal");
    card.append(el("h3", "", esc(s.group)));
    const chips = el("div", "chips");
    s.items.forEach((i) => chips.append(el("span", "chip", esc(i))));
    card.append(chips);
    grid.append(card);
  });
}

function renderExperience() {
  const box = $("#timeline");
  experience.forEach((e) => {
    const item = el("div", "t-item reveal");
    item.append(el("div", "t-date", esc(e.date)));
    item.append(el("h3", "", esc(e.title)));
    item.append(el("div", "t-org", esc(e.org)));
    if (e.points.length) {
      const ul = el("ul");
      e.points.forEach((p) => ul.append(el("li", "", esc(p))));
      item.append(ul);
    }
    box.append(item);
  });
}

function renderProjects() {
  const grid = $("#projectsGrid");
  projects.forEach((p) => {
    const card = el("article", "project reveal");
    card.append(el("h3", "", esc(p.name)));
    card.append(el("p", "", esc(p.desc)));
    const chips = el("div", "chips");
    p.tags.forEach((t) => chips.append(el("span", "chip", esc(t))));
    card.append(chips);
    grid.append(card);
  });
}

/* ====== Typing effect ====== */
function typeLoop() {
  const target = $("#typed");
  let r = 0, c = 0, deleting = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { target.textContent = roles[0]; return; }

  function tick() {
    const word = roles[r];
    c += deleting ? -1 : 1;
    target.textContent = word.slice(0, c);
    let delay = deleting ? 35 : 70;
    if (!deleting && c === word.length) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ====== Theme ====== */
function initTheme() {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (_) {}
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.dataset.theme = saved || (prefersLight ? "light" : "dark");

  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (_) {}
  });
}

/* ====== Mobile menu + active link ====== */
function initNav() {
  const links = $("#navLinks");
  $("#menuToggle").addEventListener("click", () => links.classList.toggle("open"));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

  const sections = $$("main section[id]");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        $$("#navLinks a").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)
        );
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ====== Reveal on scroll + counters ====== */
function initReveal() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      $$("[data-count]", en.target).forEach(countUp);
      obs.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((n) => io.observe(n));
}

function countUp(node) {
  const end = Number(node.dataset.count);
  let n = 0;
  const step = () => {
    n += 1;
    node.textContent = n + "+";
    if (n < end) setTimeout(step, 250);
  };
  step();
}

/* ====== Contact form (opens the visitor's mail app) ====== */
function initForm() {
  const form = $("#contactForm");
  const msg = $("#formMsg");
  const EMAIL = "your-email@example.com"; // <- replace with your address

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const text = $("#message").value.trim();

    msg.className = "form-msg";
    if (!name || !email || !text) { msg.textContent = "Please fill in every field."; msg.classList.add("error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = "Enter a valid email address."; msg.classList.add("error"); return; }

    const subject = encodeURIComponent("Message from " + name);
    const body = encodeURIComponent(text + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
    msg.textContent = "Opening your email app…";
    msg.classList.add("ok");
    form.reset();
  });
}

/* ====== Back to top + footer year ====== */
function initMisc() {
  const btn = $("#toTop");
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 500), { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#year").textContent = new Date().getFullYear();
}

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderSkills();
  renderExperience();
  renderProjects();
  typeLoop();
  initNav();
  initReveal();
  initForm();
  initMisc();
});