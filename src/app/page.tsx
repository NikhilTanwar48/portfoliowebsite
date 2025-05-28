"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Mail, Linkedin, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import { useRef } from 'react';



const projects = [
  {
    title: "GDPR-Compliant Data Storage",
    description: "Encrypt, store, delete & export user data with GDPR compliance.",
    link: "https://github.com/NikhilTanwar48/gdpr-data-storage",
  },
  {
    title: "Sustainable Investment Dashboard",
    description: "Visualize ESG scores to guide sustainable financial choices.",
    link: "https://github.com/NikhilTanwar48/sustainable-investments",
  },
  {
    title: "Fintech Fraud Detection",
    description: "AI-based system to detect anomalies in financial transactions.",
    link: "https://github.com/NikhilTanwar48/fraud-detection-ml",
  },
  {
    title: "Cyber Threat Monitor",
    description: "Monitor server logs in real time and detect suspicious behavior.",
    link: "https://github.com/NikhilTanwar48/cyber-threat-monitor",
  },
  {
    title: "German Tax Calculator",
    description: "Calculate net salary & visualize German income tax bands.",
    link: "https://github.com/NikhilTanwar48/german-tax-calculator",
  },
];

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Scroll helper to smoothly scroll to sections by id
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const form= useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.current) return;

  emailjs
    .sendForm('service_qrfbj6e', 'template_m748vtk', form.current, '0-6vt0gq7mj4JVLVw')
    .then(
      () => {
        alert("Message sent Successfully!");
        form.current?.reset();
      },

    );
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
            <button onClick={() => scrollToSection("projects")} className="hover:underline">Projects</button>
            <button onClick={() => scrollToSection("resume")} className="hover:underline">Resume</button>
            <button onClick={() => scrollToSection("contact")} className="hover:underline">Contact</button>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://github.com/NikhilTanwar48" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 hover:text-purple dark:hover:text-white" />
            </a>
            <a href="mailto:youremail@example.com">
              <Mail className="h-5 w-5 hover:text-red-500" />
            </a>
            <a href="https://linkedin.com/in/nikhil-tanwar" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 hover:text-blue-600" />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
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

          {/* Contact Form */}
          <motion.div
            id="contact"
            className="text-left max-w-xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <form ref={form} className="space-y-4" onSubmit={sendEmail}>
              <Input name="user_name" placeholder="Your Name" required />
              <Input name="user_email" type="email" placeholder="Your Email" required />
              <Textarea name="message" placeholder="Your Message" rows={5} required />
              <Button type="submit">Send Message</Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
