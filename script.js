const portfolioData = {
  name: "Vanshika Thakkar",
  headline:
    "Product Analyst blending product strategy, analytics, and stakeholder execution to ship measurable business outcomes.",
  contact: {
    email: "vtt2@illinois.edu",
    phone: "+1 (217) 721-8209",
    linkedin: "https://www.linkedin.com/in/ankitp24/"
  },
  education: [
    {
      institution: "University of Illinois Urbana-Champaign",
      degree: "Master of Science in Information Management",
      period: "Aug 2020 - May 2027",
      gpa: "4.0 / 4.0"
    },
    {
      institution: "University of Mumbai",
      degree: "Bachelor of Commerce",
      period: "Aug 2020 - Mar 2023",
      gpa: "8.69 / 10"
    }
  ],
  experience: [
    {
      company: "Deloitte",
      role: "Product Analyst",
      location: "Mumbai, India",
      period: "Nov 2023 - Oct 2024",
      highlights: [
        "Unlocked $5M in margin visibility by leading discovery and backlog prioritization for a Cost of Quality data product, translating pain points from 150+ enterprise users into a shipped Power BI roadmap.",
        "Helped executives make pricing decisions 30% faster by rebuilding requirements intake for a SaaS financial analytics platform and removing rework loops that blocked sign-off.",
        "Empowered 12 PMs to self-serve A/B test results by shipping a SQL-based experimentation framework, increasing experimentation velocity by 35%.",
        "Saved engagement teams 15+ hours per week by shipping automated WIP reporting; achieved 80%+ adoption in 6 weeks."
      ]
    },
    {
      company: "Colgate-Palmolive",
      role: "Business Finance Intern",
      location: "Mumbai, India",
      period: "Apr 2023 - Nov 2023",
      highlights: [
        "Freed 4 senior analysts to focus on variance analysis by automating reconciliation workflows across month-end close, saving 25 hours per week.",
        "Reduced month-end data errors by 20% by embedding Power Query and VBA validation, cutting cycle time by 30%.",
        "Delivered real-time month-end close visibility for 10+ finance stakeholders via a live Tableau dashboard backed by SQL."
      ]
    }
  ],
  skills: {
    "Product Management": [
      "Requirements gathering",
      "User stories and acceptance criteria",
      "Backlog management and prioritization",
      "Sprint preparation",
      "Product documentation",
      "Roadmapping",
      "QA and validation",
      "Post-launch feedback synthesis",
      "Product lifecycle management",
      "Agile (Scrum / Kanban)"
    ],
    "Stakeholder and Delivery": [
      "Cross-functional coordination (Product, Engineering, Design, Business)",
      "Stakeholder management",
      "Decision tracking",
      "Dependency identification",
      "Structured problem-solving"
    ],
    "Data and Analytics": [
      "SQL",
      "Python (Pandas, NumPy)",
      "Power BI",
      "Tableau",
      "Excel (Power Query, VBA)",
      "A/B testing",
      "KPI design",
      "Product usage and trend analysis"
    ],
    Tools: ["Jira", "Confluence", "Figma", "Power BI", "Tableau", "Notion"]
  },
  projects: [
    {
      name: "Business Intelligence Group",
      period: "Jan 2026 - Present",
      summary: [
        "Replaced 8+ fragmented grant-tracking spreadsheets with a normalized SQL schema, reducing data duplication by 20%.",
        "Shipped governed Power BI dashboards with embedded validation, reducing reconciliation cycles by 25% and manual reporting by 30%."
      ]
    },
    {
      name: "Daily News Digest",
      period: "Jan 2026 - Present",
      summary: [
        "Built a 0-to-1 conversational news MVP in 8 weeks based on 20+ user interviews identifying information overload as the core pain.",
        "Improved user task-completion rates across 3 Figma prototype iterations with moderated usability testing feedback.",
        "Defined a campus GTM around AARRR metrics to prioritize acquisition channels and activation hooks."
      ]
    }
  ]
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (typeof text === "string") {
    node.textContent = text;
  }
  return node;
}

function initHeader(data) {
  document.getElementById("name").textContent = data.name;
  document.getElementById("headline").textContent = data.headline;
  document.getElementById("footer-name").textContent = data.name;

  const contactLinks = document.getElementById("contact-links");
  const email = el("a", "contact-link", data.contact.email);
  email.href = `mailto:${data.contact.email}`;
  const phone = el("a", "contact-link", data.contact.phone);
  phone.href = `tel:${data.contact.phone.replace(/[^\d+]/g, "")}`;
  const linkedin = el("a", "contact-link", "LinkedIn");
  linkedin.href = data.contact.linkedin;
  linkedin.target = "_blank";
  linkedin.rel = "noopener noreferrer";

  contactLinks.append(email, phone, linkedin);
}

function renderImpact(data) {
  const metrics = [
    {
      value: "$5M",
      label: "Margin visibility unlocked"
    },
    {
      value: "150+",
      label: "Enterprise users translated into roadmap priorities"
    },
    {
      value: "35%",
      label: "Faster experimentation velocity enabled"
    },
    {
      value: "25 hrs/week",
      label: "Operational time saved in finance workflows"
    }
  ];

  const impactGrid = document.getElementById("impact-grid");
  metrics.forEach((metric) => {
    const card = el("article", "impact-card");
    card.append(el("p", "impact-value", metric.value), el("p", "impact-label", metric.label));
    impactGrid.append(card);
  });
}

function renderExperience(data, companyFilter = "All") {
  const list = document.getElementById("experience-list");
  list.innerHTML = "";

  const filtered =
    companyFilter === "All"
      ? data.experience
      : data.experience.filter((item) => item.company === companyFilter);

  filtered.forEach((item) => {
    const card = el("article", "card");
    const title = el("h3", "", `${item.role} - ${item.company}`);
    const meta = el("p", "meta", `${item.location} | ${item.period}`);
    const bullets = el("ul", "bullet-list");
    item.highlights.forEach((highlight) => bullets.append(el("li", "", highlight)));
    card.append(title, meta, bullets);
    list.append(card);
  });

  if (!filtered.length) {
    list.append(el("p", "empty-state", "No experience matches this filter."));
  }
}

function setupExperienceFilter(data) {
  const select = document.getElementById("experience-filter");
  const companies = ["All", ...new Set(data.experience.map((item) => item.company))];
  companies.forEach((company) => {
    const option = el("option", "", company);
    option.value = company;
    select.append(option);
  });

  select.addEventListener("change", (event) => {
    renderExperience(data, event.target.value);
  });
}

function renderProjects(data, query = "") {
  const list = document.getElementById("projects-list");
  list.innerHTML = "";
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = data.projects.filter((project) => {
    if (!normalizedQuery) {
      return true;
    }

    const blob = [project.name, project.period, ...project.summary].join(" ").toLowerCase();
    return blob.includes(normalizedQuery);
  });

  filtered.forEach((project) => {
    const card = el("article", "card");
    card.append(el("h3", "", project.name), el("p", "meta", project.period));
    const bullets = el("ul", "bullet-list");
    project.summary.forEach((line) => bullets.append(el("li", "", line)));
    card.append(bullets);
    list.append(card);
  });

  if (!filtered.length) {
    list.append(el("p", "empty-state", "No projects found for that search."));
  }
}

function setupProjectSearch(data) {
  const input = document.getElementById("project-search");
  input.addEventListener("input", (event) => {
    renderProjects(data, event.target.value);
  });
}

function renderSkills(data, activeCategory) {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";

  data.skills[activeCategory].forEach((skill) => {
    list.append(el("li", "skill-pill", skill));
  });
}

function setupSkillTabs(data) {
  const categories = Object.keys(data.skills);
  const tabs = document.getElementById("skill-tabs");
  let activeCategory = categories[0];

  function refreshTabs() {
    tabs.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === activeCategory);
    });
    renderSkills(data, activeCategory);
  }

  categories.forEach((category) => {
    const button = el("button", "tab", category);
    button.type = "button";
    button.dataset.category = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      refreshTabs();
    });
    tabs.append(button);
  });

  refreshTabs();
}

function renderEducation(data) {
  const list = document.getElementById("education-list");
  data.education.forEach((entry) => {
    const card = el("article", "card");
    card.append(
      el("h3", "", entry.institution),
      el("p", "meta", `${entry.degree} | ${entry.period}`),
      el("p", "", `GPA: ${entry.gpa}`)
    );
    list.append(card);
  });
}

function initializePortfolio() {
  initHeader(portfolioData);
  renderImpact(portfolioData);
  setupExperienceFilter(portfolioData);
  renderExperience(portfolioData);
  setupProjectSearch(portfolioData);
  renderProjects(portfolioData);
  setupSkillTabs(portfolioData);
  renderEducation(portfolioData);
}

initializePortfolio();
