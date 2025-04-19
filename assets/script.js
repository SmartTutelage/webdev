const body = document.body;
const theme = document.getElementById("btn-theme")
const faqContainer = document.getElementById("faq-container")
const question = document.getElementById("faq-question")
const response = document.getElementById("faq-response")
const skillCard = document.querySelectorAll(".skill-card")
const copyrightContainer = document.getElementById("footer-copyright")


// Load saved theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
});

//==================================
// Toggle theme on click
//===================================
theme.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Save theme to localStorage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

//=================================
// FAQs are loaded from JSON file
//=================================
fetch("assets/faq.json")
  .then(response => response.json())
  .then(faqs => {
    console.log(faqs)
    
    const faqContainer = document.querySelector(".faq");
    faqs.forEach(faq => {
      const item = document.createElement("div");
      item.className = "faq-quest";
      item.innerHTML = `
        <span class="top-q" id="faq-question">
            <h4>${faq.question}</h4> <h4>+</h4>
        </span>           
        <p class="response hide-faq" id="faq-response">${faq.answer}</p>
      `;
      faqContainer.appendChild(item);
    });
  });

  // Toggle FAQ answer
document.addEventListener("click", e => {
    if (e.target.classList.contains("top-q")) {
      const answer = e.target.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    }
  });

//==========================================
//   Testimonials are loaded from JSON file
//==========================================

  async function loadTestimonials() {
    try {
      const response = await fetch('assets/testimonial.json');
      const data = await response.json();

      const container = document.getElementById('testimonialCarousel');
      data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
          <p class="testimonial-text">"${item.text}"</p>
          <div class="student-info">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <strong>${item.name}</strong><br>
              <p><small>${item.country}</small></p>
              ${item.cohort}
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    }
  }

  function scrollTestimonials(direction) {
    const container = document.getElementById('testimonialCarousel');
    const scrollAmount = 320;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  window.addEventListener('DOMContentLoaded', loadTestimonials);


// ==============================
// Footer copyright dynamic year
// ==============================
document.getElementById("year").textContent = new Date().getFullYear();
