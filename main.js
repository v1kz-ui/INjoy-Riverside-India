/* ============================================================
   INjoy Riverside — India Investor & Tech Pitch
   Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  };

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // ---- 2. Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---- 3. Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- 4. Scroll-triggered reveal animations ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- 5. Animated count-up numbers ----
  const countElements = document.querySelectorAll('.count-up');

  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(target * eased);
      el.textContent = current.toLocaleString('en-IN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  countElements.forEach(el => {
    if (el.dataset.target) {
      countObserver.observe(el);
    }
  });

  // ---- 6. Form handling ----
  const form = document.getElementById('inquiryForm');
  const submitBtn = document.getElementById('formSubmit');

  if (form && submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const interest = document.getElementById('formInterest').value;

      if (!name || !email) {
        // Simple validation feedback
        if (!name) document.getElementById('formName').style.borderColor = '#E85A5A';
        if (!email) document.getElementById('formEmail').style.borderColor = '#E85A5A';
        return;
      }

      // Success state
      submitBtn.innerHTML = '<span class="material-symbols-rounded">check_circle</span> Request Received';
      submitBtn.style.background = '#4CAF72';
      submitBtn.style.pointerEvents = 'none';

      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = '<span class="material-symbols-rounded">send</span> Request Investor Deck';
        submitBtn.style.background = '';
        submitBtn.style.pointerEvents = '';
      }, 3000);
    });

    // Clear validation on input
    ['formName', 'formEmail'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        });
      }
    });
  }

  // ---- 7. Hero daily counter — real-time feel ----
  // Simulates the "seniors added today" based on time of day
  const heroCounter = document.querySelector('.hero .daily-counter__number');
  if (heroCounter && heroCounter.classList.contains('count-up')) {
    // Already handled by the generic counter above
  }

});
