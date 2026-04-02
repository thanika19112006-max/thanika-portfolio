import { Toaster } from "@/components/ui/sonner";
import {
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const ROLES = ["Developer", "Designer", "Creative Thinker", "GDG Member"];

type Category = "all" | "web" | "uiux";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: Category;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Brain Boost Hub",
    description:
      "Interactive platform offering quizzes, puzzles, and learning tools to improve cognitive skills and knowledge.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://brain-boost-hub.vercel.app/",
  },
  {
    id: 2,
    title: "BidNova",
    description:
      "Real-time online auction platform where users can place bids, track items, and compete dynamically.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://bidvault-8x1.caffeine.xyz/",
  },
  {
    id: 3,
    title: "Glow Brain Lab",
    description:
      "Visually engaging brain-training app with games and analytics to track mental performance.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://glow-brain-ygmanac9p-thanika19112006-maxs-projects.vercel.app/",
  },
  {
    id: 4,
    title: "Daily Plan",
    description:
      "Productivity web app that helps users organize tasks, set goals, and manage daily schedules efficiently.",
    tech: ["HTML", "CSS", "JavaScript", "Local Storage"],
    category: "web",
    link: "https://daily-calendar-planning-notes-app-vr4.caffeine.xyz/",
  },
  {
    id: 5,
    title: "Cipher Vault",
    description:
      "Secure web application for encrypting and storing sensitive data using modern cryptographic techniques.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://cipher-vault-hrlu.vercel.app/",
  },
  {
    id: 6,
    title: "EMC Website",
    description:
      "Responsive institutional website showcasing courses, events, and resources for an EMC organization.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://emc-website-gamma.vercel.app/",
  },
  {
    id: 7,
    title: "Events",
    description:
      "Dynamic event management website where users can explore, register, and track upcoming events.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://events-5ugs.vercel.app/",
  },
  {
    id: 8,
    title: "Tourism",
    description:
      "A tourism website that helps users explore famous destinations, discover travel ideas, and plan memorable trips with ease.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://tourism-dlan.vercel.app/",
  },
  {
    id: 9,
    title: "FinWise Pro",
    description:
      "Smart income & expense tracker with AI chatbot, custom emoji categories, interactive charts, and monthly insights to help you save smarter.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "https://finwise-tracker-esgz.vercel.app/",
  },
  {
    id: 10,
    title: "GentleCart Commerce",
    description:
      "A clean, user-friendly e-commerce platform with intuitive product browsing, cart management, and a smooth checkout experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
    link: "http://gentlecart-commerce-gules.vercel.app/#",
  },
  {
    id: 11,
    title: "KFC Website",
    description:
      "Modern UI redesign concept for KFC's website with improved user flows and visual hierarchy.",
    tech: ["Figma"],
    category: "uiux",
    link: "https://www.figma.com/design/rAf5ssDcxW94jmXsMKczwe/KFC-Website?node-id=0-1&p=f&t=IVjfQo1FKWdUjfdW-0",
  },
  {
    id: 12,
    title: "Instagram App",
    description:
      "Comprehensive UI/UX redesign of the Instagram mobile app with enhanced discovery and interaction patterns.",
    tech: ["Figma"],
    category: "uiux",
    link: "https://www.figma.com/design/JHN0bj8m1bL0nZ4iUZ3qUt/instagram-app?t=TLeJB2QOUFMiquYq-0",
  },
  {
    id: 13,
    title: "Furniture App",
    description:
      "Clean furniture shopping app design with modern UX, intuitive navigation, and stunning product showcases.",
    tech: ["Figma"],
    category: "uiux",
    link: "https://www.figma.com/design/M4mZP50YEyr4o0wYgEasj1/furniture-app?t=TLeJB2QOUFMiquYq-0",
  },
  {
    id: 14,
    title: "Red Bus Website",
    description:
      "Redesigned bus booking website with an intuitive UI, streamlined booking flow, and accessible design.",
    tech: ["Figma"],
    category: "uiux",
    link: "https://www.figma.com/design/oFCffuShELQvpxEJyBaVhK/red-Bus?t=TLeJB2QOUFMiquYq-0",
  },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/thanika-s-004339327";

// ── Typing Animation Hook ────────────────────────────────────────────────────
function useTypingAnimation(items: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && display === "") {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % items.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplay((prev) =>
            isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
          );
        },
        isDeleting ? speed / 2 : speed,
      );
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, roleIdx, items, speed, pause]);

  return display;
}

// ── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav
          className="glass flex items-center justify-between px-5 py-3 rounded-full"
          style={{ borderRadius: "9999px" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.20 168), oklch(0.65 0.18 148))",
                color: "oklch(0.10 0.04 180)",
              }}
            >
              T.
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {["about", "projects", "contact"].map((s) => (
              <button
                type="button"
                key={s}
                data-ocid={`nav.${s}.link`}
                onClick={() => scrollTo(s)}
                className="capitalize text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Connect */}
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.connect.button"
              className="btn-primary hidden sm:flex items-center gap-2 px-5 py-2 text-sm"
            >
              <Linkedin size={14} />
              Connect
            </a>
            <button
              type="button"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="glass mt-2 rounded-2xl px-6 py-4 flex flex-col gap-4 md:hidden">
            {["about", "projects", "contact"].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => scrollTo(s)}
                className="capitalize text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {s}
              </button>
            ))}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-5 py-2 text-sm w-fit"
            >
              <Linkedin size={14} />
              Connect
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typedRole = useTypingAnimation(ROLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className="glass rounded-3xl p-8 sm:p-12"
          style={{
            border: "1px solid oklch(0.78 0.20 168 / 0.25)",
            boxShadow:
              "0 0 60px oklch(0.78 0.20 168 / 0.08), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Avatar */}
            <div className="fade-up flex-shrink-0">
              <div
                className="avatar-ring w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.14 0.05 185), oklch(0.22 0.07 168))",
                }}
              >
                <span
                  className="text-7xl sm:text-8xl font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.20 168), oklch(0.65 0.18 148))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  T
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              {/* Status badge */}
              <div
                className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                style={{
                  background: "oklch(0.78 0.20 168 / 0.12)",
                  border: "1px solid oklch(0.78 0.20 168 / 0.3)",
                  color: "oklch(0.78 0.20 168)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Open to Opportunities
              </div>

              <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-tight">
                HI, I&apos;M <span className="text-gradient">THANIKA</span> 👋
              </h1>

              <div className="fade-up fade-up-delay-2 mt-4 text-base sm:text-lg font-semibold uppercase tracking-widest">
                <span
                  className="typing-cursor"
                  style={{ color: "oklch(0.78 0.20 168)" }}
                >
                  {typedRole}
                </span>
              </div>

              <p className="fade-up fade-up-delay-3 mt-5 max-w-xl text-muted-foreground leading-relaxed text-sm sm:text-base">
                Passionate Software Developer and second-year B.Tech IT student.
                Building web apps and UI/UX designs — with a love for data
                structures and cloud fundamentals.
              </p>

              <div className="fade-up fade-up-delay-4 mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  type="button"
                  data-ocid="hero.view_projects.button"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-primary px-8 py-3 text-sm"
                >
                  View Portfolio
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.linkedin.button"
                  className="btn-outline px-8 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>

              {/* Stats row */}
              <div className="fade-up fade-up-delay-5 mt-8 flex flex-wrap gap-6 justify-center md:justify-start">
                {[
                  { value: "10+", label: "Projects" },
                  { value: "4+", label: "UI/UX Designs" },
                  { value: "2nd", label: "Year B.Tech" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <p
                      className="text-xl font-extrabold"
                      style={{ color: "oklch(0.78 0.20 168)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal();

  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "HTML/CSS",
    "Data Structures",
    "Cloud Fundamentals",
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.78 0.20 168)" }}
          >
            — About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-8">
            Who I Am
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Passionate Software Developer and second-year B.Tech IT student
                with foundational experience in Python and Java. Skilled in
                building web applications and UI/UX design. Strong interest in
                data structures, problem-solving, and cloud fundamentals.
                Actively working on innovative projects in web development.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-foreground">
                Skills &amp; Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="tech-badge">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isComingSoon = project.link === "#";

  return (
    <article
      className="glass-card rounded-2xl p-6 flex flex-col"
      data-ocid={`projects.item.${index + 1}`}
    >
      {/* Category label */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.78 0.20 168)" }}
        >
          {project.category === "uiux" ? "UI/UX" : "Web"}
        </span>
        {!isComingSoon && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Open ${project.title}`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="tech-badge">
            {t}
          </span>
        ))}
      </div>

      {isComingSoon ? (
        <div
          className="text-xs py-2 px-5 text-center w-full rounded-xl font-semibold"
          style={{
            background: "oklch(0.78 0.20 168 / 0.08)",
            border: "1px solid oklch(0.78 0.20 168 / 0.2)",
            color: "oklch(0.78 0.20 168 / 0.6)",
          }}
        >
          Coming Soon
        </div>
      ) : (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`projects.view.button.${index + 1}`}
          className="btn-outline text-xs py-2 px-5 text-center w-full flex items-center justify-center gap-2"
        >
          <ExternalLink size={12} />
          VIEW PROJECT
        </a>
      )}
    </article>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState<Category>("all");
  const ref = useReveal();

  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const tabs: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "uiux", label: "UI/UX" },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal">
          {/* Header */}
          <div className="glass rounded-3xl p-8 sm:p-10 mb-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3 text-center"
              style={{ color: "oklch(0.78 0.20 168)" }}
            >
              — My Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground text-center mb-6">
              Featured Projects
            </h2>

            {/* Filter chips */}
            <div
              className="flex justify-center gap-3 flex-wrap"
              role="tablist"
              aria-label="Project filter"
            >
              {tabs.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  data-ocid={`projects.${key}.tab`}
                  className={`filter-chip ${filter === key ? "active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return;
    }
    const mailtoUrl = `mailto:thanika19112006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoUrl;
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3 text-center"
            style={{ color: "oklch(0.78 0.20 168)" }}
          >
            — Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground text-center mb-10">
            Contact
          </h2>

          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Form */}
              <form
                onSubmit={handleSubmit}
                data-ocid="contact.form"
                className="flex flex-col gap-5"
              >
                <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                  Get In Touch
                </h3>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    data-ocid="contact.name.input"
                    className="glass-input w-full px-4 py-3 text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-ocid="contact.email.input"
                    className="glass-input w-full px-4 py-3 text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    data-ocid="contact.subject.input"
                    className="glass-input w-full px-4 py-3 text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    data-ocid="contact.message.textarea"
                    className="glass-input w-full px-4 py-3 text-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="contact.submit.button"
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-3 text-sm"
                >
                  <Send size={14} />
                  SEND MESSAGE
                </button>
              </form>

              {/* Info */}
              <div className="flex flex-col justify-center gap-8">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-6">
                    Contact Info
                  </h3>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "oklch(0.78 0.20 168 / 0.15)",
                          border: "1px solid oklch(0.78 0.20 168 / 0.3)",
                        }}
                      >
                        <Mail
                          size={18}
                          style={{ color: "oklch(0.78 0.20 168)" }}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                          Email
                        </p>
                        <p className="text-sm text-foreground font-medium">
                          thanika19112006@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "oklch(0.78 0.20 168 / 0.15)",
                          border: "1px solid oklch(0.78 0.20 168 / 0.3)",
                        }}
                      >
                        <MapPin
                          size={18}
                          style={{ color: "oklch(0.78 0.20 168)" }}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                          Location
                        </p>
                        <p className="text-sm text-foreground font-medium">
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">
                    Find Me On
                  </p>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.linkedin.button"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      background: "oklch(0.78 0.20 168 / 0.12)",
                      border: "1px solid oklch(0.78 0.20 168 / 0.3)",
                      color: "oklch(0.78 0.20 168)",
                    }}
                  >
                    <Linkedin size={18} />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-8 px-4 sm:px-6 border-t"
      style={{ borderColor: "oklch(0.78 0.20 168 / 0.1)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {year} Thanika. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen bg-animated">
      {/* Floating blobs */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(8, 38, 35, 0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(100, 220, 180, 0.15)",
            color: "oklch(0.96 0.02 170)",
          },
        }}
      />
    </div>
  );
}
