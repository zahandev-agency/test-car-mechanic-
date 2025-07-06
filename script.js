// Enhanced Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// Enhanced Navigation with Active States
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// Animated Statistics Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for statistics
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(entry.target.dataset.target);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe statistics elements
document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// Gallery Lightbox Functionality
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 3000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .lightbox-content {
            position: relative;
            margin: auto;
            padding: 20px;
            width: 90%;
            max-width: 800px;
            height: 90%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox-close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 3001;
        }
        
        .lightbox-close:hover {
            color: #ea580c;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80%;
            object-fit: contain;
            border-radius: 10px;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 20px;
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
    
    return lightbox;
}

// Initialize gallery lightbox
let lightbox;
document.addEventListener('DOMContentLoaded', function() {
    lightbox = createLightbox();
    
    // Add click handlers to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const overlay = this.querySelector('.gallery-overlay');
            const lightboxImg = lightbox.querySelector('.lightbox-image');
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = `
                <h3>${overlay.querySelector('h3').textContent}</h3>
                <p>${overlay.querySelector('p').textContent}</p>
            `;
            
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Enhanced Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Basic validation
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    let errorMessage = '';
    
    requiredFields.forEach(field => {
        if (!formObject[field] || formObject[field].trim() === '') {
            isValid = false;
            errorMessage += `${field.charAt(0).toUpperCase() + field.slice(1)} is required.\n`;
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formObject.email && !emailRegex.test(formObject.email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const loading = submitBtn.querySelector('.loading');
        
        btnText.style.display = 'none';
        loading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = 'Thank you for your message! We will get back to you shortly.';
            this.insertBefore(successDiv, this.firstChild);
            
            // Reset form
            this.reset();
            
            // Reset button state
            btnText.style.display = 'inline';
            loading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }, 1500);
        
        // In a real application, you would send the data to a server
        console.log('Form submitted:', formObject);
    } else {
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Please correct the following errors:\n' + errorMessage;
        this.insertBefore(errorDiv, this.firstChild);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .about-image, .contact-card, .gallery-item, .team-member');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced Modal functionality
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.3s ease-out';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
});

// Enhanced Service selection in booking modal
function selectService(serviceName) {
    // Remove previous selections
    document.querySelectorAll('.service-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const selectedOption = document.querySelector(`[data-service="${serviceName}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        document.getElementById('selectedService').value = serviceName;
    }
    
    // Open booking modal
    openBookingModal();
}

// Service option click handlers
document.addEventListener('DOMContentLoaded', function() {
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selections
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked option
            this.classList.add('selected');
            document.getElementById('selectedService').value = this.dataset.service;
        });
    });
});

// Enhanced Booking form handling
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Basic validation
    const requiredFields = ['bookingName', 'bookingEmail', 'bookingPhone', 'selectedService', 'bookingDate', 'bookingTime'];
    let isValid = true;
    let errorMessage = '';
    
    requiredFields.forEach(field => {
        if (!formObject[field] || formObject[field].trim() === '') {
            isValid = false;
            errorMessage += `${field.replace('booking', '').charAt(0).toUpperCase() + field.replace('booking', '').slice(1)} is required.\n`;
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formObject.bookingEmail && !emailRegex.test(formObject.bookingEmail)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const loading = submitBtn.querySelector('.loading');
        
        btnText.style.display = 'none';
        loading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            alert('Thank you for booking! We will contact you shortly to confirm your appointment.');
            
            // Reset form
            this.reset();
            document.querySelectorAll('.service-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Reset button state
            btnText.style.display = 'inline';
            loading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Close modal
            closeBookingModal();
        }, 1500);
        
        // In a real application, you would send the data to a server
        console.log('Booking submitted:', formObject);
    } else {
        alert('Please correct the following errors:\n' + errorMessage);
    }
});

// Enhanced Emergency call functionality
function callEmergency() {
    if (confirm('Call emergency service at (555) 123-4567?')) {
        // In a real application, this would initiate a phone call on mobile devices
        window.location.href = 'tel:+15551234567';
    }
}

// Enhanced Button click handlers for CTAs
document.addEventListener('DOMContentLoaded', function() {
    // Book Now buttons
    const bookNowButtons = document.querySelectorAll('.btn-primary');
    bookNowButtons.forEach(button => {
        if (button.textContent.includes('Book Now') || button.textContent.includes('Book Your Service')) {
            button.addEventListener('click', function(e) {
                if (!this.onclick) { // Only if no onclick is already set
                    e.preventDefault();
                    openBookingModal();
                }
            });
        }
    });
    
    // Get Free Quote buttons
    const quoteButtons = document.querySelectorAll('.btn-secondary');
    quoteButtons.forEach(button => {
        if (button.textContent.includes('Get a Free Quote') || button.textContent.includes('Get Free Quote')) {
            button.addEventListener('click', function() {
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Pre-select "Request Quote" in the subject dropdown
                    setTimeout(() => {
                        const subjectSelect = document.getElementById('subject');
                        if (subjectSelect) {
                            subjectSelect.value = 'quote';
                        }
                    }, 500);
                }
            });
        }
    });
    
    // Call Us Today buttons
    const callButtons = document.querySelectorAll('.btn');
    callButtons.forEach(button => {
        if (button.textContent.includes('Call Us Today') || button.textContent.includes('Call Today') || button.textContent.includes('Call Now')) {
            button.addEventListener('click', function(e) {
                if (!this.onclick) { // Only if no onclick is already set
                    e.preventDefault();
                    callEmergency();
                }
            });
        }
    });
});

// Enhanced Loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Enhanced scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .about-image, .contact-card, .gallery-item, .team-member');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Enhanced Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = navMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// Enhanced hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced click effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Enhanced Team member interactions
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const social = this.querySelector('.member-social');
            if (social) {
                social.style.opacity = '1';
                social.style.transform = 'translateX(0)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const social = this.querySelector('.member-social');
            if (social) {
                social.style.opacity = '0';
                social.style.transform = 'translateX(20px)';
            }
        });
    });
});

// Enhanced Gallery interactions
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeBookingModal();
    }
});

// Enhanced Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    updateActiveNavLink();
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Maps Section Functionality
function getDirections() {
    const address = "123 Auto Care Drive, Mechanic City, MC 12345";
    const encodedAddress = encodeURIComponent(address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    
    // Open in new tab
    window.open(directionsUrl, '_blank');
    
    // Show confirmation message
    showNotification('Directions opened in new tab!', 'success');
}

function callUs() {
    const phoneNumber = "(555) 123-4567";
    
    // Check if it's a mobile device
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobile device - initiate phone call
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Desktop - copy to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showNotification('Phone number copied to clipboard!', 'success');
        }).catch(() => {
            showNotification(`Call us at: ${phoneNumber}`, 'info');
        });
    }
}

// Enhanced Map Loading Detection
function initializeMap() {
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper.querySelector('iframe');
    
    if (mapIframe) {
        // Add loading state
        mapWrapper.classList.add('loading');
        
        // Detect when map is loaded
        mapIframe.addEventListener('load', function() {
            mapWrapper.classList.remove('loading');
            mapWrapper.classList.add('loaded');
            
            // Add fade-in animation
            mapWrapper.style.opacity = '0';
            mapWrapper.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mapWrapper.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                mapWrapper.style.opacity = '1';
                mapWrapper.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Fallback for map loading
        setTimeout(() => {
            if (mapWrapper.classList.contains('loading')) {
                mapWrapper.classList.remove('loading');
                mapWrapper.classList.add('loaded');
            }
        }, 5000);
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-content {
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                border-left: 4px solid;
            }
            
            .notification-info {
                border-left-color: #3b82f6;
            }
            
            .notification-success {
                border-left-color: #10b981;
            }
            
            .notification-error {
                border-left-color: #dc2626;
            }
            
            .notification-message {
                color: #374151;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                color: #6b7280;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #374151;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced Location Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
});

// Enhanced Map Overlay Interactions
document.addEventListener('DOMContentLoaded', function() {
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (mapOverlay) {
        // Add hover effects
        mapOverlay.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        mapOverlay.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add keyboard navigation
        mapOverlay.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Trigger the first button (Get Directions)
                const firstButton = this.querySelector('.btn');
                if (firstButton) {
                    firstButton.click();
                }
            }
        });
    }
});

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

// Enhanced Map Responsive Behavior
function handleMapResponsive() {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (window.innerWidth <= 768) {
        // Mobile layout
        if (mapOverlay) {
            mapOverlay.style.position = 'relative';
            mapOverlay.style.top = '0';
            mapOverlay.style.left = '0';
            mapOverlay.style.marginTop = '1rem';
            mapOverlay.style.maxWidth = 'none';
        }
    } else {
        // Desktop layout
        if (mapOverlay) {
            mapOverlay.style.position = 'absolute';
            mapOverlay.style.top = '1rem';
            mapOverlay.style.left = '1rem';
            mapOverlay.style.marginTop = '0';
            mapOverlay.style.maxWidth = '300px';
        }
    }
}

// Call on load and resize
window.addEventListener('load', handleMapResponsive);
window.addEventListener('resize', debounce(handleMapResponsive, 100));

// Enhanced Map Accessibility
document.addEventListener('DOMContentLoaded', function() {
    const mapIframe = document.querySelector('.map-wrapper iframe');
    
    if (mapIframe) {
        // Add proper ARIA labels
        mapIframe.setAttribute('title', 'Interactive map showing AutoCare Pro location');
        mapIframe.setAttribute('aria-label', 'Google Maps showing our location at 123 Auto Care Drive, Mechanic City, MC 12345');
        
        // Add loading state
        mapIframe.addEventListener('load', function() {
            this.setAttribute('aria-busy', 'false');
        });
        
        mapIframe.setAttribute('aria-busy', 'true');
    }
});

console.log('AutoCare Pro website loaded successfully!');

