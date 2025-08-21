document.addEventListener('DOMContentLoaded', () => {

    // Matrix Background Animation
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = "01".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00FFAB";
        ctx.font = fontSize + "px monospace";

        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            const x = i * fontSize;
            ctx.fillText(text, x, y * fontSize);
            drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
        });
    }

    setInterval(drawMatrix, 50);

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
        mobileMenu.classList.toggle("active");
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const aiDescription = document.getElementById('ai-description');
    const fnbDescription = document.getElementById('fnb-description');

    // Initially hide all project cards and the description
    projectCards.forEach(card => card.style.display = 'none');
    if (aiDescription) {
        aiDescription.style.display = 'none';
    }
    if (fnbDescription) {
    fnbDescription.style.display = 'none';
}

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and add it to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Always hide all cards and descriptions at the start of the click
            projectCards.forEach(card => card.style.display = 'none');
            if (aiDescription) {
                aiDescription.style.display = 'none';
            }
            if (fnbDescription) {
            fnbDescription.style.display = 'none';
            }
            
            // Show content based on the filter
            if (filter === 'all') {
                projectCards.forEach(card => card.style.display = 'block');
            } else if (filter === 'ai') {
                if (aiDescription) {
                    aiDescription.style.display = 'block';
                }
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                    }
                });
            } else if (filter === 'fnb') { 
            if (fnbDescription) {
                fnbDescription.style.display = 'block';
            }
            projectCards.forEach(card => {
                if (card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                }
            });
        } else {
            projectCards.forEach(card => {
                if (card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                }
            });
        }
    });
});

    
    // Scroll animations
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Certification carousel functionality
    const carouselContainer = document.querySelector(".carousel-container");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");
    if (carouselContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let scrollInterval;
        
        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
                if (carouselContainer.scrollLeft >= maxScroll - 10) {
                    carouselContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carouselContainer.scrollBy({ left: 382, behavior: 'smooth' });
                }
            }, 3000);
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        startAutoScroll();

        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoScroll();
                carouselContainer.scrollBy({ left: -382, behavior: 'smooth' });
                startAutoScroll();
            });
            nextBtn.addEventListener('click', () => {
                stopAutoScroll();
                carouselContainer.scrollBy({ left: 382, behavior: 'smooth' });
                startAutoScroll();
            });
        }
    }
});

// Game Invitation Button Logic
const playGameBtn = document.getElementById('play-game-btn');
if (playGameBtn) {
    playGameBtn.addEventListener('click', () => {
        window.location.href = 'game.html';
    });
}