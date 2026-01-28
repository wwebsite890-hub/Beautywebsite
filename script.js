// JavaScript for BeautyPerlor Website

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const appointmentForm = document.getElementById('appointmentForm');
const reviewsContainer = document.querySelector('.reviews-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const formSuccess = document.getElementById('formSuccess');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.padding = '15px 0';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update Active Nav Link on Scroll
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Testimonial Slider
let currentSlide = 0;
const reviewCards = document.querySelectorAll('.review-card');
const totalSlides = reviewCards.length;

function updateSlider() {
    // Calculate the translateX value based on current slide
    const translateXValue = -currentSlide * (100 / 3); // 3 cards per view
    
    reviewsContainer.style.transform = `translateX(${translateXValue}%)`;
    
    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= totalSlides - 3;
    
    // For mobile view, adjust for different number of visible cards
    if (window.innerWidth <= 768) {
        const mobileTranslateXValue = -currentSlide * 100; // 1 card per view on mobile
        reviewsContainer.style.transform = `translateX(${mobileTranslateXValue}%)`;
        nextBtn.disabled = currentSlide >= totalSlides - 1;
    }
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    // Check how many cards should be visible based on screen size
    const cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    
    if (currentSlide < totalSlides - cardsPerView) {
        currentSlide++;
        updateSlider();
    }
});

// Handle window resize for slider
window.addEventListener('resize', () => {
    // Reset to first slide on resize for better UX
    currentSlide = 0;
    updateSlider();
});

// Form Validation and Submission
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous error messages
    clearErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    
    // Validation flags
    let isValid = true;
    
    // Name validation
    if (name === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (phone === '') {
        showError('phoneError', 'Please enter your phone number');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Email validation (optional)
    if (email !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Service validation
    if (service === '') {
        showError('serviceError', 'Please select a service');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        // In a real application, you would send the form data to a server here
        formSuccess.textContent = 'Thank you! Your appointment request has been submitted. We will contact you shortly to confirm.';
        formSuccess.style.display = 'block';
        
        // Reset form
        appointmentForm.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }
});

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    
    // Highlight the input field with error
    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderColor = '#ff6b6b';
    inputElement.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.2)';
}

// Helper function to clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Reset input styles
    const formInputs = document.querySelectorAll('#appointmentForm input, #appointmentForm select');
    formInputs.forEach(input => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        input.style.boxShadow = 'none';
    });
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
    
    // Update active nav link on initial load
    updateActiveNavLink();
});