document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================================================
    // HERO TYPING EFFECT
    // ==========================================================================
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["Data Structures & Algorithms", "Java Development", "Python Utilities", "Web Technology"];
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Start typing animation
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon menu / close
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // ==========================================================================
    // HEADER SCROLL STYLE & BACK TO TOP BUTTON
    // ==========================================================================
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top visibility
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // ==========================================================================
    // ACTIVE NAVIGATION LINKS HIGHLIGHT ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight when section is 30% down the screen
            if (window.scrollY >= (sectionTop - sectionHeight * 0.3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // SCROLL REVEAL OBSERVER
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If the skills section is revealed, animate the skill bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Function to trigger skill progress loading
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const widthVal = bar.getAttribute('data-width');
            if (widthVal) {
                bar.style.width = widthVal;
            }
        });
    }

    // ==========================================================================
    // PROJECTS GALLERY FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const categories = category.split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Retrigger styling flow
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elements
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const subjectInput = document.getElementById('form-subject');
            const messageInput = document.getElementById('form-message');
            const submitBtn = document.getElementById('form-submit');
            const submitBtnText = submitBtn.querySelector('.submit-btn-text');
            const submitBtnIcon = submitBtn.querySelector('.submit-btn-icon');

            let isValid = true;

            // Reset validation states
            document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                // Loading UI state
                submitBtn.disabled = true;
                submitBtnText.textContent = "Sending...";
                submitBtnIcon.setAttribute('data-lucide', 'loader');
                submitBtnIcon.classList.add('spin');
                lucide.createIcons();

                // Mock Submission delay
                setTimeout(() => {
                    // Success UI state
                    submitBtn.disabled = false;
                    submitBtnText.textContent = "Message Sent";
                    submitBtnIcon.setAttribute('data-lucide', 'check');
                    submitBtnIcon.classList.remove('spin');
                    lucide.createIcons();

                    // Show success block
                    successAlert.classList.add('show');
                    
                    // Reset Form
                    contactForm.reset();

                    // Restore submit button after 3 seconds
                    setTimeout(() => {
                        submitBtnText.textContent = "Send Message";
                        submitBtnIcon.setAttribute('data-lucide', 'send');
                        lucide.createIcons();
                        successAlert.classList.remove('show');
                    }, 5000);
                    
                }, 1500);
            }
        });
    }
});
