const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    // Get current element top relative to viewport + current scroll Y
    const yOffset = -80; // negative means scroll above the section
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
