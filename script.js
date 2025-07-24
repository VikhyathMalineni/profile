document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar")
  const scrollToTopBtn = document.getElementById("scrollToTop")
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const typedTextElement = document.getElementById("typed-text")

  const texts = [
    "Building the future with code",
    "Passionate about AI & Machine Learning",
    "Creating innovative solutions",
    "Always learning, always growing",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 2000)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
    }

    const typingSpeed = isDeleting ? 50 : 100
    setTimeout(typeWriter, typingSpeed)
  }

  if (typedTextElement) {
    typeWriter()
  }

  document.querySelectorAll(".navbar a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.98)"
      scrollToTopBtn.classList.add("visible")
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
      scrollToTopBtn.classList.remove("visible")
    }
  })

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category").includes(filter)) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        if (entry.target.classList.contains("skill-progress")) {
          const width = entry.target.style.width
          entry.target.style.width = "0"
          setTimeout(() => {
            entry.target.style.width = width
          }, 500)
        }
      }
    })
  }, observerOptions)

  document
    .querySelectorAll(".project-card, .skill-item, .timeline-item, .achievement-card, .blog-card")
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "all 0.6s ease"
      observer.observe(el)
    })

  document.querySelectorAll(".skill-progress").forEach((progress) => {
    observer.observe(progress)
  })

  const form = document.querySelector("form")
  if (form) {
    form.addEventListener("submit", (e) => {
      const submitBtn = form.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  document.addEventListener("mousemove", (e) => {
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.02
      const x = (e.clientX * speed) / 100
      const y = (e.clientY * speed) / 100

      shape.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`
    })
  })
})
