document.addEventListener('DOMContentLoaded', function() {

    //  --- Mobile Navigation Toggle ---
    
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) { 
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling for Anchor Links ---

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) { 
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });


    // --- Active Navigation Link Highlighting on Scroll ---

    const sections = document.querySelectorAll('section[id]'); 
    const navLinkItems = document.querySelectorAll('nav .nav-links li a');

    if (sections.length > 0 && navLinkItems.length > 0) { 
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - (window.innerHeight / 3); 
                const sectionHeight = section.clientHeight;


                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            
            const scrolledToBottom = (window.innerHeight + scrollPosition) >= document.body.offsetHeight - 5; 

            navLinkItems.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');

            
                if (scrolledToBottom && linkHref === '#contact') {
                    link.classList.add('active');
                }
            
                else if (!scrolledToBottom && linkHref.includes(currentSectionId) && currentSectionId !== '') {
                     link.classList.add('active');
                }
                
                else if (scrollPosition < window.innerHeight / 3 && linkHref === '#home') {
                     link.classList.add('active');
                }

            });
        });
         
         window.dispatchEvent(new Event('scroll'));
    }


    // --- Scroll-triggered Animations ---

    const elementsToAnimate = document.querySelectorAll('.container, .slide-in-left, .slide-in-right');

    if ('IntersectionObserver' in window && elementsToAnimate.length > 0) { 
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                }
                
            });
        }, {
            threshold: 0.1 
        });

        elementsToAnimate.forEach(el => {
            if (el.classList.contains('container')) {
                if (!el.closest('.hero')) {
                     el.classList.add('fade-in'); 
                }
            }
            
            observer.observe(el);
        });
    } else {
        
        elementsToAnimate.forEach(el => {
             if (el.classList.contains('container') && !el.closest('.hero')) {
                 el.classList.add('fade-in');
             }
             el.classList.add('visible'); 
        });
    }

});