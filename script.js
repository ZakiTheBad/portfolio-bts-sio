document.addEventListener("DOMContentLoaded", () => {
  // Animated counters
  const nums = document.querySelectorAll(".num");
  const animateNum = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  };

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".num").forEach(animateNum);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  reveals.forEach((el) => revealObserver.observe(el));

  // Typing effect for the role option
  const typingEl = document.getElementById("typing");
  const words = ["SISR", "SLAM", "Cybersécurité", "Développement"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 90);
  };
  if (typingEl) typeLoop();
});
