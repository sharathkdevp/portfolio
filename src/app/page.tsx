"use client";

import React, { useEffect, useState, useRef } from "react";

/* =======================
   Helpers
======================= */
const isHttpUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

/* =======================
   SVG Icons
======================= */
const Mail = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPin = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Github = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Sun = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const Moon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

/* =======================
   Themes (Emerald only)
======================= */
const THEMES = {
  darkEmerald: {
    name: "darkEmerald",
    page: "bg-slate-950 text-slate-100",
    nav: "border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl",
    heading: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400",
    card: "bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20",
    pill: "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-emerald-500/30",
    glowText: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-pulse",
    btnPrimary: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105",
    gradientBg: "bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900",
  },
  lightEmerald: {
    name: "lightEmerald",
    page: "bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-800",
    nav: "border-b border-slate-200/50 bg-white/80 backdrop-blur-xl",
    heading: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600",
    card: "bg-white/70 border border-slate-200/50 backdrop-blur-sm hover:bg-white/90 hover:border-emerald-300/50 hover:shadow-xl hover:shadow-emerald-500/20",
    pill: "bg-slate-100/50 border border-slate-200/50 text-slate-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-emerald-500/30",
    glowText: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 animate-pulse",
    btnPrimary: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105",
    gradientBg: "bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50",
  },
};

/* =======================
   Site Data
======================= */
const PROFILE = {
  name: "Sharath Kandagattla",
  tagline: "Backend Developer / Software Developer · Java/Spring",
  roles: ["Backend Developer", "Java/Spring Specialist", "Microservices & Kafka"],
  location: "United States",
  email: "sharath.kdevp@gmail.com",
  phone: "+1 (857) 529-9334",
  links: {
    linkedin: "https://www.linkedin.com/in/sharath-k-b5698a19a/",
    github: "https://github.com/sharathkdevp",
  },
  blurb:
    "I love building and breaking things to make them better. I began my journey in test automation, grew into system design, and now specialize in Java/Spring backends powered by microservices, AWS, Docker, Kubernetes, SQL databases, and CI/CD. My passion is creating software that runs faster, stays reliable, and helps teams deliver with confidence",
};

const SKILL_GROUPS = [
  { label: "Backend", icon: <span className="w-5 h-5">🖥️</span>, items: ["Java(8/11/17)", "Spring Boot", "Spring Security", "Spring Data JPA", "Spring Cloud", "REST"] },
  { label: "Cloud & DevOps", icon: <span className="w-5 h-5">☁️</span>, items: ["AWS (Lambda, EC2, S3)", "Docker", "Kubernetes", "Jenkins", "Git", "Maven"] },
  { label: "Data & Messaging", icon: <span className="w-5 h-5">🗄️</span>, items: ["Oracle", "PostgreSQL", "MySQL", "MS SQL Server", "Kafka", "Spring Batch"] },
  { label: "Testing & Quality", icon: <span className="w-5 h-5">✅</span>, items: ["JUnit", "TestNG", "Selenium", "Cypress", "REST Assured", "BrowserStack", "Splunk"] },
];

const PROJECTS = [
  {
    name: "US Bank – Loan Processing Platform",
    summary: "High-throughput microservices with Kafka and AWS; reduced API p95 by ~35%.",
    madeWith: ["Java 17", "Spring Boot", "Kafka", "Docker", "Kubernetes", "AWS"],
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "NRA – Training & Certification LMS",
    summary: "APIs for registration, quiz scoring, certificate issuance; batch jobs for compliance exports.",
    madeWith: ["Spring Boot", "Spring Batch", "Oracle PL/SQL", "Splunk"],
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "QVC – Automation Suite",
    summary: "Hybrid Selenium/TestNG framework with BrowserStack coverage + CI/CD integration.",
    madeWith: ["Java", "Selenium", "TestNG", "REST Assured", "Jenkins"],
    gradient: "from-green-400 to-emerald-500",
  },
];

/* =======================
   UI Components
======================= */
const FloatingParticles = ({ theme }: { theme: any }) => {
  const particleRefs = useRef<HTMLDivElement[]>([] as any);

  useEffect(() => {
    const particles = particleRefs.current;
    particles.forEach((particle, index) => {
      if (particle) {
        const animateParticle = () => {
          const duration = 15000 + Math.random() * 10000;
          const startX = Math.random() * window.innerWidth;
          const startY = window.innerHeight + 50;
          const endX = startX + (Math.random() - 0.5) * 300;
          const endY = -50;

          particle.style.left = startX + "px";
          particle.style.top = startY + "px";
          particle.style.opacity = "0";

          particle
            .animate(
              [
                { transform: `translate(0, 0) scale(0.5)`, opacity: 0 },
                { transform: `translate(0, -100px) scale(1)`, opacity: 0.7, offset: 0.1 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.5)`, opacity: 0 },
              ],
              { duration, easing: "ease-out" }
            )
            .onfinish = () => {
            setTimeout(animateParticle, Math.random() * 5000);
          };
        };

        setTimeout(animateParticle, index * 2000);
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particleRefs.current[i] = el as any)}
          className={`absolute w-1 h-1 rounded-full ${
            theme.name === "darkEmerald" ? "bg-emerald-400" : "bg-teal-400"
          }`}
          style={{
            boxShadow: `0 0 10px ${theme.name === "darkEmerald" ? "#34d399" : "#2dd4bf"}`,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = ({ theme }: { theme: any }) => (
  <div className="fixed inset-0 -z-10">
    <div className={`absolute inset-0 ${theme.gradientBg}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${
              theme.name === "darkEmerald" ? "#10b981" : "#14b8a6"
            } 0%, transparent 70%)`,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${
              theme.name === "darkEmerald" ? "#06b6d4" : "#0ea5e9"
            } 0%, transparent 70%)`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full opacity-25 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${
              theme.name === "darkEmerald" ? "#22d3ee" : "#99f6e4"
            } 0%, transparent 70%)`,
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </div>
    </div>

    <style jsx>{`
      @keyframes float {
        0%,
        100% {
          transform: translate(0, 0) rotate(0deg);
        }
        33% {
          transform: translate(30px, -30px) rotate(120deg);
        }
        66% {
          transform: translate(-20px, 20px) rotate(240deg);
        }
      }
    `}</style>
  </div>
);

const Section = ({
  id,
  title,
  theme,
  children,
  delay = 0,
}: {
  id: string;
  title: string;
  theme: any;
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <section
      ref={sectionRef as any}
      id={id}
      className={`scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-12 text-center ${theme.heading}`}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};

const Pill = ({
  theme,
  children,
  className = "",
  delay = 0,
}: {
  theme: any;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const pillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (pillRef.current) observer.observe(pillRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={pillRef}
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 transform cursor-pointer ${theme.pill} ${className} ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      {children}
    </span>
  );
};

const Card = ({
  theme,
  children,
  className = "",
  gradient = "",
  delay = 0,
}: {
  theme: any;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`rounded-3xl p-8 transition-all duration-700 transform cursor-pointer ${theme.card} ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isHovered ? "scale-105 -rotate-1" : "scale-100 rotate-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        background: gradient ? `linear-gradient(135deg, ${gradient.split(" ").join(", ")})` : undefined,
      }}
    >
      {gradient && <div className="absolute inset-0 bg-black/20 rounded-3xl backdrop-blur-sm" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const TechMarquee = ({ items, theme }: { items: string[]; theme: any }) => (
  <div className="relative py-12 overflow-hidden">
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10" />

    <div className="flex gap-6 py-3 whitespace-nowrap animate-scroll-fast">
      {[...items, ...items].map((tech, i) => (
        <div key={i} className={`px-6 py-3 rounded-2xl text-sm font-medium ${theme.pill} hover:scale-110 transition-transform`}>
          {tech}
        </div>
      ))}
    </div>

    <div className="flex gap-6 py-3 whitespace-nowrap animate-scroll-reverse">
      {[...items.slice(8), ...items.slice(8)].map((tech, i) => (
        <div key={i} className={`px-6 py-3 rounded-2xl text-sm font-medium ${theme.pill} hover:scale-110 transition-transform`}>
          {tech}
        </div>
      ))}
    </div>

    <style jsx>{`
      @keyframes scroll-fast {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      @keyframes scroll-reverse {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .animate-scroll-fast {
        animation: scroll-fast 25s linear infinite;
      }
      .animate-scroll-reverse {
        animation: scroll-reverse 20s linear infinite;
      }
    `}</style>
  </div>
);

/* =======================
   Role Rotator (smooth loop)
======================= */
function RoleRotator({
  roles,
  theme,
  height = 80,
  intervalMs = 4500,
  transitionMs = 900,
}: {
  roles: string[];
  theme: any;
  height?: number;
  intervalMs?: number;
  transitionMs?: number;
}) {
  const loop = [...roles, roles[0]];
  const [idx, setIdx] = React.useState(0);
  const [enableTransition, setEnableTransition] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => i + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const handleTransitionEnd = () => {
    if (idx === loop.length - 1) {
      setEnableTransition(false);
      setIdx(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }
  };

  return (
    <div className="overflow-hidden mb-8" style={{ height }}>
      <div
        onTransitionEnd={handleTransitionEnd}
        className={enableTransition ? "transition-transform ease-out" : ""}
        style={{
          transform: `translateY(-${idx * height}px)`,
          transitionDuration: enableTransition ? `${transitionMs}ms` : "0ms",
          willChange: "transform",
        }}
      >
        {loop.map((role, i) => (
          <div key={`${role}-${i}`} style={{ height }} className="flex items-center">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${theme.glowText}`}>{role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =======================
   Main Page
======================= */
export default function Page() {
  const [themeName, setThemeName] = useState<keyof typeof THEMES>("darkEmerald");
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const nextTheme = saved === "lightEmerald" || saved === "darkEmerald" ? (saved as keyof typeof THEMES) : "darkEmerald";
    setThemeName(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const theme = THEMES[themeName];

  const toggleTheme = () => {
    setThemeName((t) => {
      const next = t === "darkEmerald" ? "lightEmerald" : "darkEmerald";
      if (typeof window !== "undefined") localStorage.setItem("theme", next);
      return next as keyof typeof THEMES;
    });
  };

  return (
    <div className={`relative min-h-screen ${theme.page} overflow-x-hidden`}>
      <AnimatedBackground theme={theme} />
      <FloatingParticles theme={theme} />

      {/* Custom Cursor */}
      {mounted && (
        <div
          className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: "transform 0.1s ease",
          }}
        />
      )}

      {/* Navigation */}
      <header className={`sticky top-0 z-40 ${theme.nav}`}>
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-20">
          <a href="#home" className={`text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-110 ${theme.heading}`}>
            {PROFILE.name}
          </a>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium">
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="relative group transition-all duration-300 hover:scale-110">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className={`rounded-xl p-3 inline-flex items-center transition-all duration-300 ${theme.btnPrimary}`}
              aria-label="Toggle color theme"
            >
              {mounted ? (themeName === "darkEmerald" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />) : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fadeInUp">
              <p className={`uppercase tracking-[0.2em] text-sm mb-6 opacity-80 ${theme.heading}`}>Hello! I am</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
                <span className={theme.heading}>{PROFILE.name}</span>
              </h1>

              <RoleRotator roles={PROFILE.roles} theme={theme} height={80} intervalMs={4500} transitionMs={900} />

              <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl opacity-90 text-justify hyphens-auto">{PROFILE.blurb}</p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                <Pill theme={theme}>
                  <MapPin className="w-4 h-4 mr-2" />
                  {PROFILE.location}
                </Pill>
                <a href={`mailto:${PROFILE.email}`} className="no-underline">
                  <Pill theme={theme}>
                    <Mail className="w-4 h-4 mr-2" />
                    {PROFILE.email}
                  </Pill>
                </a>
                <a href={`tel:${PROFILE.phone}`} className="no-underline">
                  <Pill theme={theme}>
                    <Phone className="w-4 h-4 mr-2" />
                    {PROFILE.phone}
                  </Pill>
                </a>
                {isHttpUrl(PROFILE.links.linkedin) && (
                  <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="no-underline">
                    <Pill theme={theme}>
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Pill>
                  </a>
                )}
                {isHttpUrl(PROFILE.links.github) && (
                  <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="no-underline">
                    <Pill theme={theme}>
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Pill>
                  </a>
                )}
              </div>

              <div className="flex gap-6 justify-center lg:justify-start">
                <a href="#contact" className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${theme.btnPrimary}`}>
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 ${
                    theme.name === "darkEmerald" ? "border-slate-600 hover:border-emerald-400 hover:bg-slate-800" : "border-slate-300 hover:border-teal-400 hover:bg-slate-50"
                  }`}
                >
                  View Work
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card theme={theme} className="relative z-10" delay={300}>
              <h3 className={`text-2xl font-bold mb-6 ${theme.heading}`}>Core Focus</h3>
              <div className="grid gap-4">
                {["🚀 Java / Spring Boot", "⚡ Microservices", "🗄️ SQL & Data Modeling", "📡 Kafka & Messaging", "🐳 CI/CD, Docker, K8s", "🧪 Test Automation (SDET)"].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-2xl">{item.split(" ")[0]}</span>
                    <span className="font-medium">{item.substring(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <TechMarquee
        theme={theme}
        items={[
          "Java(8/11/17)",
          "Spring Boot",
          "Spring Security",
          "Spring Cloud",
          "Kafka",
          "PostgreSQL",
          "Oracle",
          "Docker",
          "Kubernetes",
          "AWS",
          "JUnit",
          "TestNG",
          "Selenium WebDriver",
          "REST Assured",
          "Jenkins",
          "Git",
          "Maven",
          "Microservices",
        ]}
      />

      <Section id="about" title="About My Journey" theme={theme} delay={100}>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              h: "Past",
              t: "Began my career as a Test Automation Engineer, building QA frameworks, and then transitioned into backend development.",
              icon: "📚",
              gradient: "from-teal-400 to-emerald-500",
            },
            {
              h: "Present",
              t: "Building secure, scalable microservices for banking & training platforms; driving CI/CD and observability.",
              icon: "🚀",
              gradient: "from-emerald-400 to-cyan-500",
            },
            {
              h: "Future",
              t: "Designing event-driven systems at scale, with a focus on reliability and developer productivity.",
              icon: "🌟",
              gradient: "from-cyan-400 to-teal-500",
            },
          ].map((period, index) => (
            <Card key={period.h} theme={theme} delay={index * 200} gradient={period.gradient}>
              <div className="text-white text-center">
                <div className="text-6xl mb-4">{period.icon}</div>
                <h3 className="text-xl font-bold mb-4">{period.h}</h3>
                <p className="leading-relaxed opacity-90">{period.t}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills & Technologies" theme={theme} delay={200}>
        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <Card key={group.label} theme={theme} delay={groupIndex * 150}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${theme.name === "darkEmerald" ? "bg-emerald-500/20" : "bg-teal-500/20"}`}>{group.icon}</div>
                <h3 className="text-xl font-bold">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, skillIndex) => (
                  <Pill key={skill} theme={theme} delay={groupIndex * 150 + skillIndex * 50}>
                    {skill}
                  </Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Featured Projects" theme={theme} delay={300}>
        <div className="grid lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <Card key={project.name} theme={theme} gradient={project.gradient} delay={index * 200}>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-4">{project.name}</h3>
                <p className="mb-6 opacity-90 leading-relaxed">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.madeWith.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="cta" title="Want To..." theme={theme} delay={400}>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              h: "Offer job opportunity?",
              t: "Open to backend/SDET roles building Java/Spring systems and automation.",
              a: { href: `mailto:${PROFILE.email}`, label: "Email me" },
              icon: "💼",
            },
            {
              h: "Connect?",
              t: "Always happy to chat about backend architecture, testing, and DevOps.",
              a: { href: isHttpUrl(PROFILE.links.linkedin) ? PROFILE.links.linkedin : "#contact", label: isHttpUrl(PROFILE.links.linkedin) ? "LinkedIn" : "Contact" },
              icon: "🤝",
            },
            {
              h: "Build something?",
              t: "Consulting on migrations, performance tuning, and CI/CD enablement.",
              a: { href: isHttpUrl(PROFILE.links.github) ? PROFILE.links.github : "#projects", label: isHttpUrl(PROFILE.links.github) ? "GitHub" : "Projects" },
              icon: "🛠️",
            },
          ].map((cta, index) => (
            <Card key={cta.h} theme={theme} delay={index * 200}>
              <div className="text-center">
                <div className="text-5xl mb-4">{cta.icon}</div>
                <h3 className="text-lg font-bold mb-3">{cta.h}</h3>
                <p className="mb-6 opacity-90 leading-relaxed">{cta.t}</p>
                <a
                  href={cta.a.href}
                  target={cta.a.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.a.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${theme.btnPrimary}`}
                >
                  <ArrowRight className="w-4 h-4" /> {cta.a.label}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Get In Touch" theme={theme} delay={500}>
        <Card theme={theme} className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <a href={`mailto:${PROFILE.email}`} className="group block">
              <div
                className={`p-4 rounded-2xl mb-4 mx-auto w-fit ${
                  theme.name === "darkEmerald" ? "bg-emerald-500/20 group-hover:bg-emerald-500/30" : "bg-teal-500/20 group-hover:bg-teal-500/30"
                } transition-all duration-300 group-hover:scale-110`}
              >
                <Mail className="w-8 h-8 mx-auto" />
              </div>
              <div className="font-medium">{PROFILE.email}</div>
            </a>

            <a href={`tel:${PROFILE.phone}`} className="group block">
              <div
                className={`p-4 rounded-2xl mb-4 mx-auto w-fit ${
                  theme.name === "darkEmerald" ? "bg-teal-500/20 group-hover:bg-teal-500/30" : "bg-emerald-500/20 group-hover:bg-emerald-500/30"
                } transition-all duration-300 group-hover:scale-110`}
              >
                <Phone className="w-8 h-8 mx-auto" />
              </div>
              <div className="font-medium">{PROFILE.phone}</div>
            </a>

            <div className="group">
              <div
                className={`p-4 rounded-2xl mb-4 mx-auto w-fit ${
                  theme.name === "darkEmerald" ? "bg-cyan-500/20" : "bg-teal-300/20"
                } transition-all duration-300 group-hover:scale-110`}
              >
                <MapPin className="w-8 h-8 mx-auto" />
              </div>
              <div className="font-medium">{PROFILE.location}</div>
            </div>

            <div className="flex gap-4 justify-center items-center">
              {isHttpUrl(PROFILE.links.linkedin) && (
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${theme.btnPrimary}`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {isHttpUrl(PROFILE.links.github) && (
                <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${theme.btnPrimary}`}>
                  <Github className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </Card>
      </Section>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className={`text-2xl font-bold mb-4 ${theme.heading}`}>{PROFILE.name}</div>
          <div className="text-sm opacity-70">© {new Date().getFullYear()} {PROFILE.name}. Crafted with passion and lots of coffee ☕</div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
