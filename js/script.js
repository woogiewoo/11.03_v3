// ========================================
// DOM Elements
// ========================================
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.querySelector('.nav');
const body = document.body;

// ========================================
// Mobile Menu Toggle
// ========================================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('scroll-disabled');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('scroll-disabled');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('scroll-disabled');
        }
    });
}

// ========================================
// Header Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#' || href === '') return;

        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerOffset = headerHeight + 20;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll to Top Button (Optional Enhancement)
// ========================================
// You can add a scroll-to-top button here if needed

// ========================================
// Lazy Loading for Images (Optional)
// ========================================
// If you add real images later, you can implement lazy loading here

// ========================================
// Animation on Scroll - Section Visibility
// ========================================
const sectionObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, stop observing
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

// Observe sections (except hero)
const sectionsToAnimate = document.querySelectorAll('.friend-section, .products-section, .cotielog-section, .instagram-section');
sectionsToAnimate.forEach(section => {
    sectionObserver.observe(section);
});


// ========================================
// Product Cards Staggered Animation
// ========================================
const productCards = document.querySelectorAll('.product-card');
const productObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger animation
            productObserver.unobserve(entry.target);
        }
    });
}, productObserverOptions);

productCards.forEach(card => {
    productObserver.observe(card);
});

// ========================================
// COTIELOG Horizontal Scroll Enhancement
// ========================================
const cotielogScroll = document.querySelector('.cotielog-scroll');

if (cotielogScroll) {
    // Add smooth scrolling behavior
    cotielogScroll.style.scrollBehavior = 'smooth';

    // Optional: Add snap scrolling
    cotielogScroll.addEventListener('wheel', (e) => {
        e.preventDefault();
        cotielogScroll.scrollLeft += e.deltaY;
    });

    // Touch support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    cotielogScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        cotielogScroll.style.cursor = 'grabbing';
        startX = e.pageX - cotielogScroll.offsetLeft;
        scrollLeft = cotielogScroll.scrollLeft;
    });

    cotielogScroll.addEventListener('mouseleave', () => {
        isDown = false;
        cotielogScroll.style.cursor = 'grab';
    });

    cotielogScroll.addEventListener('mouseup', () => {
        isDown = false;
        cotielogScroll.style.cursor = 'grab';
    });

    cotielogScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - cotielogScroll.offsetLeft;
        const walk = (x - startX) * 2;
        cotielogScroll.scrollLeft = scrollLeft - walk;
    });

    cotielogScroll.style.cursor = 'grab';
}

// ========================================
// Console Log (for debugging)
// ========================================
console.log('Cotie Shop - JavaScript loaded successfully!');
