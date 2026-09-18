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

// Preloader style "jeu video / app store"
(function () {
  document.body.classList.add("is-loading");
  const fill = document.getElementById("loaderFill");
  const percentEl = document.getElementById("loaderPercent");
  const preloader = document.getElementById("preloader");
  if (!fill || !percentEl || !preloader) return;

  let progress = 0;
  const finish = () => {
    fill.style.width = "100%";
    percentEl.textContent = "100%";
    setTimeout(() => {
      preloader.classList.add("loaded");
      document.body.classList.remove("is-loading");
    }, 300);
  };

  const tick = () => {
    const increment = Math.random() * 12 + 4;
    progress = Math.min(progress + increment, 100);
    fill.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress) + "%";
    if (progress >= 100) {
      finish();
    } else {
      setTimeout(tick, 180);
    }
  };

  window.addEventListener("load", () => {
    setTimeout(tick, 200);
  });
  // Fallback: force finish after 4s even if load event is slow
  setTimeout(() => {
    if (progress < 100) finish();
  }, 4000);
})();
