"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import emailjs from "emailjs/browser";
import Image from "next/image";

const projects = [
  {
    
    title: "Heart Disease Analysis",
    description: "Machine learning model with 90%+ accuracy predicting heart disease.",
    link: "https://github.com/vishal2501/AIML-Project",
  },
  {
    title: "STOCKDOC",
    description: "Forecasts stock prices using Yahoo Finance API & ML (TensorFlow).",
    link: "https://github.com/NikhilTanwar48/StockDoc",
  },
  {
    title: "Steganography in Python",
    description: "Securely hides information inside images.",
    link: "https://github.com/NikhilTanwar48/stegnography-using-python",
  },
  {
    title: "Real-Time Object Detection",
    description: "YOLOv4-based system showing bounding boxes with class & confidence.",
    link: "https://github.com/NikhilTanwar48/Object-Detection",
  },
];

// Add your certificates here with public folder paths for logos
const certificates = [
  {
    name: "Google Data Analytics",
    logo: "/logos/google.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/JL5FM4FNS2XF",
  },
  {
    name: "Nvidia Fundamentals of Deep Learning",
    logo: "/logos/nvidia.svg",
    link: "https://learn.nvidia.com/certificates?id=5wqzDmK4QcSYFapeqmARtg",
  },
  {
    name: "Google Cyber Security",
    logo: "/logos/google.svg",
    link: "https://coursera.org/share/2204f9575bad370ace2aa65f2b83ea7f",
  },
  {
    name: "Responsive Web Design",
    logo: "/logos/free-code-camp.svg",
    link: "https://www.freecodecamp.org/certification/NikhilTanwar/responsive-web-design"
  },
  {
    name: "Introduction to Applied Cryptography- University of London",
    logo: "/logos/uni-london.svg",
    link: "https://coursera.org/share/c6ead064241ff382aea6522cda97d939"
  },
  {
    name: "Usable Security - Univeristy of Maryland",
    logo: "/logos/uni-maryland.svg",
    link: "https://www.coursera.org/account/accomplishments/verify/3UXUWDQBXKZ3"
  },
  {
    name: "Fundamentals of Accelerated Computing with Cuda Python",
    logo: "/logos/nvidia.svg",
    link: "https://learn.nvidia.com/certificates?id=hM7y_GqMTfq2iw5IEl6IFA"
  },
  {
    name: "Cryptography - Univeristy of Maryland",
    logo: "/logos/uni-maryland.svg",
    link: "https://coursera.org/share/5cd75414568ae21b7ca6f4fa8786e771"
  },
  {
    name: "Deep Learning for Healthcare - University of Illinois",
    logo: "/logos/uni-illinois.svg",
    link: "https://coursera.org/share/da17bee24279a7b0abc30e3fcf8c29da"
  },
];

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_qrfbj6e",
        "template_m748vtk",
        form.current,
        "0-6vt0gq7mj4JVLVw"
      )
      .then(() => {
        alert("Message sent Successfully!");
        form.current?.reset();
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={darkMode ? "dark" : "light"}
        className={`min-h-screen text-foreground transition-all duration-700 ease-in-out ${
          darkMode
            ? "bg-gradient-to-b from-black via-purple-1000 to-purple-900 text-white"
            : "bg-gradient-to-b from-blue-100 via-yellow-200 to-pink-200 text-black"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Responsive About Me Section */}
        <section id="about" className="max-w-4xl mx-auto text-center py-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Im Nikhil Tanwar — a developer passionate about Fintech, Cybersecurity, and Data Science.
            With a strong academic foundation and real-world project experience, I build tech that solves financial and security challenges.
            Im currently preparing for my MSc in Fintech at the University of Galway. I love working on meaningful software and am always looking to collaborate and learn.
          </motion.p>
        </section>
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: showNavbar ? 0 : -100 }}
          transition={{ duration: 0.4 }}
          className={`w-full px-6 py-4 flex justify-between items-center fixed top-0 z-50 shadow-sm
            ${darkMode
              ? "bg-gradient-to-r from-black/10 via-purple-800/10 to-purple-950/10 text-white"
              : "bg-gradient-to-r from-blue-100/30 via-yellow-100/30 to-pink-100/30 text-black"
            }`}
        >
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
           Nikhil Tanwar
          </div>

          <div className="md:flex space-x-6 font-medium">
            <button onClick={() => scrollToSection("projects")} className="hover:underline">
              Projects
            </button>
            <button onClick={() => scrollToSection("resume")} className="hover:underline">
              Resume
            </button>
            <button onClick={() => scrollToSection("certificates")} className="hover:underline">
              Certificates
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:underline">
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/NikhilTanwar48"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5 hover:text-purple dark:hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-tanwar-503a411a8/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5 hover:text-blue-600" />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center px-6 py-10 pt-24">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Fintech | Cybersecurity | Data Science | Machine Learning
          </motion.p>

          {/* Projects */}
          <div id="projects" className="grid md:grid-cols-2 gap-6 mb-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="rounded-2xl shadow-md bg-white/60 dark:bg-gray-800/20">
                  <CardContent className="p-6 text-left">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button>View Project</Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Resume Section */}
          <motion.div
            id="resume"
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Resume</h2>
            <p className="mb-2 light:text-white-300 dark:text-white">
              Download my resume and explore my qualifications, experience, and technical skills.
            </p>
            <a href="/resume.pdf" download>
              <Button>Download Resume</Button>
            </a>
          </motion.div>

          {/* Certificates Section */}
          <motion.div
            id="certificates"
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Certificates</h2>

            <div className="flex flex-wrap justify-center gap-6">
              {certificates.map(({ name, logo, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-900/60 hover:scale-105 transition-transform cursor-pointer w-40"
                  aria-label={name}
                >
                  <Image
                    src={logo}
                    alt={name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            id="contact"
            className="max-w-lg mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <Input type="text" name="user_name" placeholder="Name" required />
              <Input type="email" name="user_email" placeholder="Email" required />
              <Textarea name="message" placeholder="Your message" rows={4} required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
