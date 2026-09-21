document.addEventListener("DOMContentLoaded", () => {
  const lettersEl = document.querySelector(".name-merdji .letters");
  if (lettersEl) {
    const text = lettersEl.textContent;
    lettersEl.innerHTML = "";
    text.split("").forEach((ch, i) => {
      const span = document.createElement("span");
      span.textContent = ch;
      span.style.animationDelay = (i * 0.12) + "s";
      lettersEl.appendChild(span);
    });
  }

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

  const typingEl = document.getElementById("typing");
  const words = ["SISR", "Administration systeme", "Securite reseau", "Supervision"];
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

  const navList = document.getElementById("navList");
  const indicator = document.getElementById("navIndicator");
  if (navList && indicator) {
    const links = navList.querySelectorAll("a");
    const moveIndicator = (el) => {
      const rect = el.getBoundingClientRect();
      const parentRect = navList.getBoundingClientRect();
      indicator.style.left = (rect.left - parentRect.left) + "px";
      indicator.style.width = rect.width + "px";
    };
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveIndicator(link));
    });
    navList.addEventListener("mouseleave", () => {
      indicator.style.width = "0px";
    });
  }
});

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
  setTimeout(() => {
    if (progress < 100) finish();
  }, 4000);
})();
