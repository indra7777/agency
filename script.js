// Create and style overlay
const overlay = document.createElement('div');
overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s;
`;

// Create logo container
const logoContainer = document.createElement('div');
logoContainer.style.cssText = `
    display: flex;
    align-items: center;
    transform: scale(0.1);
    opacity: 0;
    transition: all 1s ease-in-out;
`;

// Create and style logo image
const logoImg = document.createElement('img');
logoImg.src = './public/ck.jpeg';
logoImg.style.cssText = `
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-right: 0.5rem;
`;

// Create and style logo text
const logoText = document.createElement('div');
logoText.textContent = 'CoderKraft';
logoText.style.cssText = `
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-left: 0.5rem;
`;

// Append elements
logoContainer.appendChild(logoImg);
logoContainer.appendChild(logoText);
overlay.appendChild(logoContainer);
document.body.appendChild(overlay);

// Zoom in animation
setTimeout(() => {
    logoContainer.style.opacity = '1';
    logoContainer.style.transform = 'scale(2)';
}, 100);

// Hold at zoomed in state
setTimeout(() => {
    logoContainer.style.transform = 'scale(2)';
}, 1500);

// Zoom out animation
setTimeout(() => {
    logoContainer.style.transform = 'scale(0.1)';
    logoContainer.style.opacity = '0';
}, 2000);

// Remove overlay
setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 500);
}, 2500);



document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });

    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const testimonialWidth = testimonials[0].offsetWidth + 32; // Including gap

    function updateSlider() {
        // Update transform
        slider.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`;
        
        // Update active state
        testimonials.forEach((testimonial, index) => {
            if (index === currentIndex) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
    });

    prevBtn.addEventListener('click', () => {
        prevTestimonial();
    });

    // Auto-play functionality
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Start autoplay
    startAutoplay();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Initial setup
    updateSlider();

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    });

    // Handle touch events
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
    }

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}); 

// Contact form handling
const contactForm = document.querySelector('#contact form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value, 
        message: contactForm.querySelector('textarea').value
    };

    // Create mailto link
    const mailtoLink = `mailto:coderkraft@gmail.com?subject=Contact from ${formData.name}&body=From: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

    // Open default mail client
    window.location.href = mailtoLink;

    // Reset form
    contactForm.reset();
});
