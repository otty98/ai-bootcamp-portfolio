document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Matrix background (optional — never block rest of the page)
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (canvas && ctx) {
        function syncCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        syncCanvasSize();

        const accent = (getComputedStyle(document.documentElement).getPropertyValue('--color-accent') || '#0066ff').trim();
        const letters = '01'.split('');
        const fontSize = 16;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);
        let matrixInterval = null;

        function resetColumns() {
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = accent;
            ctx.font = fontSize + 'px monospace';

            drops.forEach((y, i) => {
                const text = letters[Math.floor(Math.random() * letters.length)];
                const x = i * fontSize;
                ctx.fillText(text, x, y * fontSize);
                drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
            });
        }

        if (prefersReducedMotion) {
            canvas.classList.add('matrix-reduced');
            ctx.fillStyle = '#050508';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.15;
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < 8; j++) {
                    ctx.fillText(letters[(i + j) % 2], i * fontSize, (j * 3 + 1) * fontSize);
                }
            }
            ctx.globalAlpha = 1;
        } else {
            matrixInterval = setInterval(drawMatrix, 50);
        }

        window.addEventListener('resize', () => {
            syncCanvasSize();
            resetColumns();
            if (prefersReducedMotion) {
                ctx.fillStyle = '#050508';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = accent;
                ctx.globalAlpha = 0.15;
                for (let i = 0; i < columns; i++) {
                    for (let j = 0; j < 8; j++) {
                        ctx.fillText(letters[(i + j) % 2], i * fontSize, (j * 3 + 1) * fontSize);
                    }
                }
                ctx.globalAlpha = 1;
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const aiDescription = document.getElementById('ai-description');
    const fnbDescription = document.getElementById('fnb-description');
    const clientDescription = document.getElementById('client-description');

    projectCards.forEach(card => { card.style.display = 'none'; });
    if (aiDescription) aiDescription.style.display = 'none';
    if (fnbDescription) fnbDescription.style.display = 'none';
    if (clientDescription) clientDescription.style.display = 'none';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => { card.style.display = 'none'; });
            if (aiDescription) aiDescription.style.display = 'none';
            if (fnbDescription) fnbDescription.style.display = 'none';
            if (clientDescription) clientDescription.style.display = 'none';

            if (filter === 'all') {
                projectCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                });
            } else if (filter === 'client') {
                if (clientDescription) clientDescription.style.display = 'block';
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }
                });
            } else if (filter === 'ai') {
                if (aiDescription) aiDescription.style.display = 'block';
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }
                });
            } else if (filter === 'fnb') {
                if (fnbDescription) fnbDescription.style.display = 'block';
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }
                });
            } else {
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }
                });
            }
        });
    });

    const defaultFilterBtn = document.querySelector('.filter-btn[data-filter="client"]');
    if (defaultFilterBtn) defaultFilterBtn.click();

    // Scroll animations
    const sections = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => scrollObserver.observe(section));

    // Certification carousel (certs page)
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    if (carouselContainer) {
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

        const stopAutoScroll = () => clearInterval(scrollInterval);

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

    const playGameBtn = document.getElementById('play-game-btn');
    if (playGameBtn) {
        playGameBtn.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    }

    document.querySelectorAll('[data-project-carousel]').forEach((root) => {
        const track = root.querySelector('[data-carousel-track]');
        const slides = root.querySelectorAll('[data-carousel-slide]');
        const prevBtnCarousel = root.querySelector('[data-carousel-prev]');
        const nextBtnCarousel = root.querySelector('[data-carousel-next]');
        const dotBtns = root.querySelectorAll('[data-carousel-dot]');
        if (!track || !slides.length) return;

        let index = 0;

        function goTo(i) {
            const n = slides.length;
            index = ((i % n) + n) % n;
            track.style.transform = `translateX(-${index * 100}%)`;
            dotBtns.forEach((dot, j) => {
                const on = j === index;
                dot.classList.toggle('is-active', on);
                dot.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            slides.forEach((slide, j) => {
                slide.setAttribute('aria-hidden', j === index ? 'false' : 'true');
            });
        }

        prevBtnCarousel?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(index - 1);
        });
        nextBtnCarousel?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(index + 1);
        });
        dotBtns.forEach((dot, j) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goTo(j);
            });
        });

        root.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goTo(index - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goTo(index + 1);
            }
        });

        goTo(0);
    });
});
