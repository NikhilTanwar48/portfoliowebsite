"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Moon,
  Sun,
  ArrowUpRight,
  Download,
  Copy,
  Check,
  MapPin,
  Cpu,
  Database,
  Terminal,
  GraduationCap,
  Award,
  Sparkles,
  X,
  TrendingDown,
  Activity,
  BarChart3,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Project = {
  title: string;
  subtitle: string;
  metric: string;
  metricSub: string;
  badgeClass: string;
  spanClass: string;
  scale: string;
  description: string;
  highlights: string[];
  tags: string[];
  github: string;
  visualType: "f1" | "mae" | "r2";
};

const bentoProjects: Project[] = [
  {
    title: "Germany Public Transport Delay Analytics",
    subtitle: "GTFS Schedule + Weather Classification & Streamlit App",
    metric: "0.87 F1",
    metricSub: "Delay >5 min classification",
    badgeClass: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
    spanClass: "md:col-span-7",
    scale: "100K+ Trip Records",
    description:
      "Processed 100K+ German public transport trip records combining GTFS schedules and weather feeds to uncover peak delay hours, high-risk routes, and weekday vs. weekend anomalies.",
    highlights: [
      "Engineered time, route, and rainfall features across Logistic Regression, Random Forest, and XGBoost classifiers.",
      "Achieved a 0.87 F1-score predicting transit delays exceeding 5 minutes.",
      "Deployed a Streamlit dashboard for live delay monitoring and real-time risk prediction.",
    ],
    tags: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Streamlit", "GTFS"],
    github: "https://github.com/NikhilTanwar48",
    visualType: "f1",
  },
  {
    title: "Airbnb Berlin Price Analytics",
    subtitle: "Geospatial Regression & Host Pricing Intelligence",
    metric: "€35 → €18",
    metricSub: "-48% Mean Absolute Error",
    badgeClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    spanClass: "md:col-span-5",
    scale: "20K+ Berlin Listings",
    description:
      "Analyzed 20K+ Berlin InsideAirbnb listings to isolate neighborhood pricing clusters, Superhost premiums, and amenity-driven price differences.",
    highlights: [
      "Benchmarked Linear Regression, Ridge, Random Forest, and XGBoost regressors.",
      "Reduced nightly price MAE from a €35 baseline down to €18 with XGBoost.",
      "Built an interactive host dashboard for data-driven pricing decisions.",
    ],
    tags: ["Python", "XGBoost", "Geospatial", "Pandas", "Visualization"],
    github: "https://github.com/NikhilTanwar48",
    visualType: "mae",
  },
  {
    title: "E-Commerce Sales Forecasting",
    subtitle: "Longitudinal Time-Series Demand Modeling",
    metric: "0.89 R²",
    metricSub: "500K+ retail transactions",
    badgeClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    spanClass: "md:col-span-12",
    scale: "500K+ Transactions",
    description:
      "Independently processed 500K+ historical transactions to uncover seasonal purchasing trends and engineer Decision Tree and XGBoost forecasting models—translating demand cycles into concrete sales and marketing strategies.",
    highlights: [
      "Cleaned and aggregated 500K+ transactions to reveal multi-month seasonality and peak demand windows.",
      "Built and tuned Linear Regression, Decision Trees, and XGBoost models achieving an R² of 0.89.",
      "Derived actionable inventory and campaign timing recommendations from forecast outputs.",
    ],
    tags: ["Python", "NumPy", "XGBoost", "Time-Series", "Decision Trees", "Power BI"],
    github: "https://github.com/NikhilTanwar48",
    visualType: "r2",
  },
];

const archiveBuilds = [
  {
    title: "StockDoc Forecaster",
    tag: "TensorFlow",
    link: "https://github.com/NikhilTanwar48/StockDoc",
  },
  {
    title: "YOLOv4 Object Detection",
    tag: "Computer Vision",
    link: "https://github.com/NikhilTanwar48/Object-Detection",
  },
  {
    title: "Python Steganography",
    tag: "Cybersecurity",
    link: "https://github.com/NikhilTanwar48/stegnography-using-python",
  },
  {
    title: "Heart Disease Predictor",
    tag: "90%+ Acc",
    link: "https://github.com/vishal2501/AIML-Project",
  },
];

const certificates = [
  {
    name: "Google Data Analytics",
    logo: "/logos/google.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/JL5FM4FNS2XF",
  },
  {
    name: "NVIDIA Deep Learning",
    logo: "/logos/nvidia.svg",
    link: "https://learn.nvidia.com/certificates?id=5wqzDmK4QcSYFapeqmARtg",
  },
  {
    name: "Databricks Data Warehousing",
    logo: "/logos/google.svg", // Swap with /logos/databricks.svg when added
    link: "https://www.databricks.com/",
  },
  {
    name: "NVIDIA CUDA Python",
    logo: "/logos/nvidia.svg",
    link: "https://learn.nvidia.com/certificates?id=hM7y_GqMTfq2iw5IEl6IFA",
  },
  {
    name: "Google Cybersecurity",
    logo: "/logos/google.svg",
    link: "https://coursera.org/share/2204f9575bad370ace2aa65f2b83ea7f",
  },
  {
    name: "DL for Healthcare (UIUC)",
    logo: "/logos/uni-illinois.svg",
    link: "https://coursera.org/share/da17bee24279a7b0abc30e3fcf8c29da",
  },
];

const tileAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function BentoPortfolio() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => setMounted(true), []);

  const copyEmail = () => {
    navigator.clipboard.writeText("workidnikhil@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    emailjs
      .sendForm(
        "service_qrfbj6e",
        "template_m748vtk",
        form.current,
        "0-6vt0gq7mj4JVLVw"
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current?.reset();
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20">
      {/* Ambient Radial Spotlight */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-sky-500/15 dark:bg-sky-400/10 blur-[130px] -z-10" />

      {/* Minimal Floating Pill Nav */}
      <header className="sticky top-4 z-40 px-4">
        <nav className="max-w-6xl mx-auto rounded-full border border-border/80 bg-background/75 backdrop-blur-md px-5 py-2.5 flex items-center justify-between shadow-xs">
          <a href="#" className="font-mono text-sm font-semibold tracking-tight flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            nikhil.tanwar
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-muted-foreground">
            <a href="#overview" className="hover:text-foreground transition">01. Bento</a>
            <a href="#work" className="hover:text-foreground transition">02. Projects</a>
            <a href="#credentials" className="hover:text-foreground transition">03. Stack &amp; Certs</a>
            <a href="#contact" className="hover:text-foreground transition">04. Contact</a>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/NikhilTanwar48"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-tanwar-503a411a8/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
                className="p-2 rounded-full border border-border bg-card hover:bg-muted transition"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-16">
        {/* ============================================================
            SECTION 1: HERO & PROFILE BENTO GRID (12-Column Asymmetric)
           ============================================================ */}
        <section id="overview" className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Tile 1: Main Intro Hero (8 cols) */}
          <motion.div
            {...tileAnim(0)}
            className="md:col-span-8 rounded-3xl border border-border bg-card/85 backdrop-blur p-7 sm:p-10 flex flex-col justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/70 font-mono text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Available for Data Science &amp; ML Roles
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
                Nikhil Tanwar.{" "}
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  Predictive ML &amp; Data Systems.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                MSc Web &amp; Data Science candidate at{" "}
                <span className="text-foreground font-medium">Universität Koblenz</span>. I turn
                high-volume messy datasets into calibrated XGBoost models, geospatial pricing
                engines, and interactive Streamlit dashboards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#work">
                <Button className="rounded-xl font-medium">
                  View Case Studies <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/resume.pdf" download>
                <Button variant="outline" className="rounded-xl bg-background/50">
                  <Download className="h-4 w-4" /> Resume
                </Button>
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-xl border border-border bg-background/50 hover:bg-muted transition font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> workidnikhil@gmail.com
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Tile 2: Location & Academic Radar (4 cols) */}
          <motion.div
            {...tileAnim(0.06)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-7 flex flex-col justify-between gap-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Base &amp; Focus
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-full">
                <MapPin className="h-3 w-3" /> Koblenz, DE
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-secondary/60 border border-border/60">
                <div className="flex items-center justify-between font-mono text-[11px] text-sky-500">
                  <span>CURRENTLY PURSUING</span>
                  <span>2027</span>
                </div>
                <p className="font-semibold text-sm mt-1">MSc Web &amp; Data Science</p>
                <p className="text-xs text-muted-foreground">Universität Koblenz, Germany</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/60">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>BACHELOR’S DEGREE</span>
                  <span>2020–2024</span>
                </div>
                <p className="font-semibold text-sm mt-1">BTech Computer Science</p>
                <p className="text-xs text-muted-foreground">Bennett University, India</p>
              </div>
            </div>
          </motion.div>

          {/* Tile 3, 4, 5: 3-Column Metric Bento Strip */}
          <motion.div
            {...tileAnim(0.1)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase">Data Engineered</p>
              <p className="font-mono text-3xl font-bold mt-1">620K+</p>
              <p className="text-xs text-muted-foreground mt-1">GTFS, Airbnb &amp; e-commerce rows</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
          </motion.div>

          <motion.div
            {...tileAnim(0.14)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase">Transit Delay F1</p>
              <p className="font-mono text-3xl font-bold text-sky-500 mt-1">0.87</p>
              <p className="text-xs text-muted-foreground mt-1">XGBoost + weather feature pipeline</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <BarChart3 className="h-6 w-6" />
            </div>
          </motion.div>

          <motion.div
            {...tileAnim(0.18)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase">Pricing MAE Drop</p>
              <p className="font-mono text-3xl font-bold text-emerald-500 mt-1">-48.5%</p>
              <p className="text-xs text-muted-foreground mt-1">€35 baseline reduced to €18 MAE</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <TrendingDown className="h-6 w-6" />
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            SECTION 2: ASYMMETRIC BENTO PROJECT SHOWCASE
           ============================================================ */}
        <section id="work" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-sky-500 uppercase tracking-wider">
                Selected Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
                Data Science &amp; ML Case Studies
              </h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              Click any tile to inspect architecture &amp; results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {bentoProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                {...tileAnim(idx * 0.08)}
                onClick={() => setSelectedProject(project)}
                className={`${project.spanClass} group cursor-pointer rounded-3xl border border-border bg-card/85 hover:border-sky-500/50 backdrop-blur p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
              >
                <div className="space-y-4">
                  {/* Top Row: Metric Pill + Scale */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full border font-mono text-xs font-semibold ${project.badgeClass}`}
                    >
                      {project.metric} • {project.metricSub}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.scale}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-sky-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Embedded Micro-Visual Benchmark Bar */}
                  <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/60 space-y-2">
                    {project.visualType === "f1" && (
                      <>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-muted-foreground">XGBoost Classifier F1-Score</span>
                          <span className="text-sky-500 font-semibold">0.87 / 1.00</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                          <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
                        </div>
                      </>
                    )}
                    {project.visualType === "mae" && (
                      <>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-muted-foreground">MAE Reduction (Baseline vs XGBoost)</span>
                          <span className="text-emerald-500 font-semibold">€35 → €18</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <div className="h-2 rounded-full bg-rose-500/40" title="Baseline €35" />
                          <div className="h-2 w-[51%] rounded-full bg-emerald-500" title="XGBoost €18" />
                        </div>
                      </>
                    )}
                    {project.visualType === "r2" && (
                      <>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-muted-foreground">Explained Variance (R² across 500K+ rows)</span>
                          <span className="text-purple-500 font-semibold">0.89 R²</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                          <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-purple-500 to-sky-500" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Tags + Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-sky-500 group-hover:underline">
                      <Sparkles className="h-3.5 w-3.5" /> Inspect
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg border border-border hover:bg-muted transition"
                      aria-label="Source Code"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 3: SKILLS, ARCHIVE & CERTIFICATIONS BENTO
           ============================================================ */}
        <section id="credentials" className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* ML & AI Tile (4 cols) */}
          <motion.div
            {...tileAnim(0)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-500">
              <Cpu className="h-4 w-4" /> Machine Learning
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["XGBoost", "Scikit-learn", "PyTorch", "TensorFlow", "Feature Engineering", "Statistical Modeling"].map(
                (item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-secondary font-mono text-xs">
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Data Engineering & BI Tile (4 cols) */}
          <motion.div
            {...tileAnim(0.05)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-500">
              <Database className="h-4 w-4" /> Data &amp; Analytics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "SQL", "Pandas", "NumPy", "Power BI", "Databricks", "RDBMS", "NoSQL", "Seaborn"].map(
                (item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-secondary font-mono text-xs">
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Dev & Infrastructure Tile (4 cols) */}
          <motion.div
            {...tileAnim(0.1)}
            className="md:col-span-4 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-purple-500">
              <Terminal className="h-4 w-4" /> Tools &amp; Web
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Linux", "Bash Scripting", "Git & GitHub", "Streamlit", "Next.js", "Jupyter", "VS Code"].map(
                (item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-secondary font-mono text-xs">
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Verified Certifications Bento Tile (7 cols) */}
          <motion.div
            {...tileAnim(0.12)}
            className="md:col-span-7 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 sm:p-7 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-500">
                <Award className="h-4 w-4" /> Verified Certifications
              </div>
              <span className="font-mono text-xs text-muted-foreground">6 Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {certificates.map(({ name, logo, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-2.5 rounded-2xl border border-border/70 bg-secondary/40 hover:bg-secondary hover:border-sky-500/40 transition"
                >
                  <div className="h-9 w-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                    <Image src={logo} alt={name} width={24} height={24} className="object-contain" />
                  </div>
                  <span className="text-xs font-medium leading-tight group-hover:text-sky-500 transition">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Engineering Archive Bento Tile (5 cols) */}
          <motion.div
            {...tileAnim(0.16)}
            className="md:col-span-5 rounded-3xl border border-border bg-card/85 backdrop-blur p-6 sm:p-7 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Engineering Lab
              </span>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-2.5">
              {archiveBuilds.map((build) => (
                <a
                  key={build.title}
                  href={build.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl border border-border/70 bg-secondary/40 hover:bg-secondary transition"
                >
                  <div>
                    <p className="text-xs font-semibold group-hover:text-sky-500 transition">
                      {build.title}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">{build.tag}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            SECTION 4: CONTACT BENTO TILE
           ============================================================ */}
        <motion.section
          id="contact"
          {...tileAnim(0.1)}
          className="rounded-3xl border border-border bg-card/90 backdrop-blur p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs text-emerald-500 uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Let’s build something data-driven.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to Werkstudent, Data Science, and Machine Learning roles in Germany or remote.
            </p>
            <div className="pt-2 space-y-1 font-mono text-xs text-muted-foreground">
              <p>workidnikhil@gmail.com</p>
              <p>+49 151 10045633 • Koblenz, Germany</p>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input type="text" name="user_name" placeholder="Your name" required />
            <Input type="email" name="user_email" placeholder="Your email" required />
            <div className="sm:col-span-2">
              <Textarea name="message" placeholder="Tell me about the role or project..." rows={3} required />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={sending} className="w-full rounded-xl">
                <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </motion.section>
      </main>

      {/* Interactive Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full border font-mono text-xs font-semibold mb-2 ${selectedProject.badgeClass}`}
                  >
                    {selectedProject.metric} • {selectedProject.scale}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">{selectedProject.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-foreground">
                  Key Outcomes &amp; Methodology
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selectedProject.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full rounded-xl">
                    <Github className="h-4 w-4" /> Open Repository
                  </Button>
                </a>
                <Button variant="outline" onClick={() => setSelectedProject(null)} className="rounded-xl">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}