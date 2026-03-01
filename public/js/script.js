
(() => {
  'use strict'

  // Form Validation
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  }
})

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]')
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded')
    })
  })
})

// Button Ripple Effect
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
    const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn')
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('btn-ripple')

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
})

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault()
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Card Animation on Scroll (Intersection Observer)
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card)
  })
}

// Enhanced Search Input
const searchInput = document.querySelector('input[type="search"]')
if (searchInput) {
  let searchTimeout
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout)
    const form = e.target.closest('form')
    
    // Add visual feedback
    if (e.target.value.length > 0) {
      e.target.style.fontWeight = '500'
    } else {
      e.target.style.fontWeight = '400'
    }
  })

  // Clear button functionality
  searchInput.addEventListener('search', (e) => {
    if (e.target.value === '') {
      e.target.style.fontWeight = '400'
    }
  })
}

// Toast Notification Enhancement
const alerts = document.querySelectorAll('.alert')
alerts.forEach(alert => {
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    const bsAlert = new bootstrap.Alert(alert)
    bsAlert.close()
  }, 5000)
})

// Image Preview for File Inputs
const fileInputs = document.querySelectorAll('input[type="file"]')
fileInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        // Find or create preview element
        let preview = input.parentElement.querySelector('.image-preview')
        if (!preview) {
          preview = document.createElement('img')
          preview.className = 'image-preview img-fluid rounded mt-2'
          preview.style.maxWidth = '300px'
          preview.style.maxHeight = '200px'
          preview.style.objectFit = 'cover'
          input.parentElement.appendChild(preview)
        }
        preview.src = event.target.result
        preview.style.display = 'block'
      }
      reader.readAsDataURL(file)
    }
  })
})

// Scroll to Top Button
const createScrollToTop = () => {
  const button = document.createElement('button')
  button.className = 'scroll-to-top'
  button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'
  button.setAttribute('aria-label', 'Scroll to top')
  document.body.appendChild(button)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.classList.add('visible')
    } else {
      button.classList.remove('visible')
    }
  })

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

// Initialize scroll to top button
if (document.body.scrollHeight > window.innerHeight * 2) {
  createScrollToTop()
}

// Enhanced Dropdown Behavior
const dropdowns = document.querySelectorAll('.dropdown-toggle')
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('show.bs.dropdown', function () {
    this.classList.add('active')
  })
  
  dropdown.addEventListener('hide.bs.dropdown', function () {
    this.classList.remove('active')
  })
})

// Price Formatting
const formatPrices = () => {
  const priceElements = document.querySelectorAll('.card-text')
  priceElements.forEach(element => {
    const text = element.textContent
    const priceMatch = text.match(/₹([\d,]+)/)
    if (priceMatch) {
      const price = priceMatch[1]
      element.innerHTML = element.innerHTML.replace(
        `₹${price}`,
        `<strong>₹${price}</strong>`
      )
    }
  })
}

// Initialize price formatting
formatPrices()

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
  // Escape key closes modals and dropdowns
  if (e.key === 'Escape') {
    const openDropdowns = document.querySelectorAll('.dropdown-menu.show')
    openDropdowns.forEach(dropdown => {
      const toggle = dropdown.previousElementSibling
      if (toggle) {
        bootstrap.Dropdown.getInstance(toggle)?.hide()
      }
    })
  }
})

// Performance: Debounce Function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized Resize Handler
const handleResize = debounce(() => {
  // Add any resize-specific logic here
  console.log('Window resized')
}, 250)

window.addEventListener('resize', handleResize)

// Console Welcome Message
console.log('%c🏡 Welcome to NomadNest!', 'color: #ff385c; font-size: 20px; font-weight: bold;')
console.log('%cBuilt with ❤️ using Node.js, Express, and MongoDB', 'color: #717171; font-size: 12px;')
