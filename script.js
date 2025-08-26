// Loading Screen Animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")
  const mainContent = document.getElementById("main-content")
  const typingText = document.getElementById("typing-text")
  const fullText = "Portfolio"
  let index = 0

  // Typing animation
  const typeText = () => {
    if (index <= fullText.length) {
      typingText.textContent = fullText.slice(0, index)
      index++
      setTimeout(typeText, 200)
    }
  }

  typeText()

  // Hide loading screen after 3 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      mainContent.style.display = "block"
      initScrollAnimations()
      initSkillBars()
    }, 500)
  }, 3000)
})

// Navigation
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  }, observerOptions)

  const elements = document.querySelectorAll(".scroll-reveal")
  elements.forEach((el) => observer.observe(el))
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const width = skillBar.getAttribute("data-width")
          setTimeout(() => {
            skillBar.style.width = width + "%"
          }, 500)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => skillObserver.observe(bar))
}

// Navigation background on scroll
window.addEventListener("scroll", () => {
  const navigation = document.getElementById("navigation")
  if (window.scrollY > 100) {
    navigation.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
  } else {
    navigation.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// CV Download function
function downloadCV() {
  // Replace with your actual CV file path
  const cvUrl = "/path/to/your/cv.pdf"

  // Create a temporary link element
  const link = document.createElement("a")
  link.href = cvUrl
  link.download = "CV_Nama_Anda.pdf" // Update with your actual name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Alternative: Open CV in new tab if download doesn't work
  // window.open(cvUrl, '_blank')
}
