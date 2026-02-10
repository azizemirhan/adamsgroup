(function () {
    'use strict';

    /* ══════════════════════════════════════
       VIDEO — Ken Burns on play
       ══════════════════════════════════════ */
    var video = document.getElementById('heroVideo');
    if (video) {
        video.addEventListener('playing', function () {
            video.classList.add('hero-video--active');
        });
        // Fallback: try playing
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                // Autoplay blocked — fallback image is already visible
            });
        }
    }


    /* ══════════════════════════════════════
       PARTICLES
       ══════════════════════════════════════ */
    var particleContainer = document.getElementById('heroParticles');
    var particleCount = window.innerWidth > 768 ? 18 : 8;

    for (var i = 0; i < particleCount; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = '-5%';
        p.style.width = (Math.random() * 2 + 1) + 'px';
        p.style.height = p.style.width;
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.opacity = '0';
        particleContainer.appendChild(p);
    }


    /* ══════════════════════════════════════
       SEARCH TABS
       ══════════════════════════════════════ */
    var tabs = document.querySelectorAll('.search-tab');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        });
    });


    /* ══════════════════════════════════════
       AUTOCOMPLETE (Location)
       ══════════════════════════════════════ */
    var locInput = document.getElementById('searchLocation');
    var acDropdown = document.getElementById('searchAutocomplete');
    var acItems = acDropdown.querySelectorAll('.search-autocomplete-item');

    // Sample data for filtering
    var locations = [
        { text: 'Beşiktaş, İstanbul', val: 'İstanbul, Beşiktaş', tag: 'İlçe' },
        { text: 'Bebek, İstanbul', val: 'İstanbul, Bebek', tag: 'Semt' },
        { text: 'Bodrum, Muğla', val: 'Bodrum, Muğla', tag: 'İlçe' },
        { text: 'Çankaya, Ankara', val: 'Ankara, Çankaya', tag: 'İlçe' },
        { text: 'Bakırköy, İstanbul', val: 'İstanbul, Bakırköy', tag: 'İlçe' },
        { text: 'Beylikdüzü, İstanbul', val: 'İstanbul, Beylikdüzü', tag: 'İlçe' },
        { text: 'Kadıköy, İstanbul', val: 'İstanbul, Kadıköy', tag: 'İlçe' },
        { text: 'Bornova, İzmir', val: 'İzmir, Bornova', tag: 'İlçe' },
        { text: 'Antalya, Konyaaltı', val: 'Antalya, Konyaaltı', tag: 'İlçe' },
    ];

    function showAutocomplete(query) {
        var q = query.toLowerCase();
        var filtered = locations.filter(function (loc) {
            return loc.text.toLowerCase().indexOf(q) !== -1;
        }).slice(0, 5);

        acDropdown.innerHTML = '';

        if (filtered.length === 0 || q.length < 1) {
            acDropdown.classList.remove('visible');
            return;
        }

        filtered.forEach(function (loc) {
            var item = document.createElement('div');
            item.className = 'search-autocomplete-item';
            item.setAttribute('data-value', loc.val);

            // Highlight matching text
            var idx = loc.text.toLowerCase().indexOf(q);
            var before = loc.text.substring(0, idx);
            var match = loc.text.substring(idx, idx + q.length);
            var after = loc.text.substring(idx + q.length);

            item.innerHTML =
                '<svg class="search-autocomplete-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
                '<span class="search-autocomplete-text">' + before + '<strong>' + match + '</strong>' + after + '</span>' +
                '<span class="search-autocomplete-tag">' + loc.tag + '</span>';

            item.addEventListener('click', function () {
                locInput.value = loc.val;
                acDropdown.classList.remove('visible');
            });

            acDropdown.appendChild(item);
        });

        acDropdown.classList.add('visible');
    }

    locInput.addEventListener('input', function () {
        showAutocomplete(locInput.value.trim());
    });

    locInput.addEventListener('focus', function () {
        if (locInput.value.trim().length >= 1) {
            showAutocomplete(locInput.value.trim());
        }
    });

    // Close autocomplete on outside click
    document.addEventListener('click', function (e) {
        if (!locInput.contains(e.target) && !acDropdown.contains(e.target)) {
            acDropdown.classList.remove('visible');
        }
    });


    /* ══════════════════════════════════════
       PRICE FORMATTING
       ══════════════════════════════════════ */
    function formatPrice(val) {
        var num = val.replace(/[^\d]/g, '');
        if (!num) return '';
        return Number(num).toLocaleString('tr-TR') + ' ₺';
    }

    var priceMin = document.getElementById('priceMin');
    var priceMax = document.getElementById('priceMax');

    [priceMin, priceMax].forEach(function (input) {
        input.addEventListener('input', function () {
            var raw = input.value.replace(/[^\d]/g, '');
            if (raw) {
                input.value = Number(raw).toLocaleString('tr-TR');
            }
        });

        input.addEventListener('blur', function () {
            var raw = input.value.replace(/[^\d]/g, '');
            if (raw) {
                input.value = Number(raw).toLocaleString('tr-TR') + ' ₺';
            }
        });

        input.addEventListener('focus', function () {
            var raw = input.value.replace(/[^\d₺.\s]/g, '').replace(/\s/g, '');
            input.value = raw.replace(/₺/g, '').replace(/\./g, '').trim();
        });
    });


    /* ══════════════════════════════════════
       FORM SUBMIT
       ══════════════════════════════════════ */
    document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var activeTab = document.querySelector('.search-tab.active');
        var type = activeTab ? activeTab.getAttribute('data-tab') : 'satilik';
        var location = locInput.value;
        var category = document.getElementById('searchCategory').value;

        // Visual feedback
        var btn = this.querySelector('.search-btn');
        btn.style.transform = 'scale(0.96)';
        setTimeout(function () {
            btn.style.transform = '';
        }, 200);

        console.log('Arama:', { type: type, location: location, category: category });
    });


    /* ══════════════════════════════════════
       STATS COUNTER ANIMATION
       ══════════════════════════════════════ */
    var statNumbers = document.querySelectorAll('.hero-stat-number[data-target]');
    var statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'));
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out quad
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target).toLocaleString('tr-TR');

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target.toLocaleString('tr-TR');
                }
            }

            requestAnimationFrame(step);
        });
    }

    // Start counters after hero animations settle
    setTimeout(animateStats, 2200);

})();

/* ═══════════════════════════════════════════════════
   BENTO VIDEO GRID — Interactions & Animations
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── Scroll Reveal Animation ── */
    const bentoCards = document.querySelectorAll('.bento-card');
    
    if (bentoCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Start video when card is visible
                    const video = entry.target.querySelector('.bento-video');
                    if (video && video.paused) {
                        video.play().catch(() => {
                            // Autoplay blocked, keep poster visible
                        });
                    }
                } else {
                    // Optional: Pause video when out of view for performance
                    const video = entry.target.querySelector('.bento-video');
                    if (video && !video.paused) {
                        video.pause();
                    }
                }
            });
        }, observerOptions);

        bentoCards.forEach(card => {
            revealObserver.observe(card);
        });
    }

    /* ── Video Optimization ── */
    const bentoVideos = document.querySelectorAll('.bento-video');
    
    bentoVideos.forEach(video => {
        // Ensure videos are properly loaded
        video.addEventListener('loadeddata', function () {
            this.classList.add('loaded');
        });

        // Handle video errors gracefully
        video.addEventListener('error', function () {
            // Poster image will remain visible
            console.log('Video yüklenemedi, poster görseli gösteriliyor.');
        });
    });

    /* ── Card Click Handler ── */
    bentoCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // If clicked on CTA link, let it handle the navigation
            if (e.target.closest('.bento-cta')) {
                return;
            }
            
            // Otherwise, find the CTA link and trigger it
            const cta = this.querySelector('.bento-cta');
            if (cta) {
                const href = cta.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }
        });

        // Add touch feedback for mobile
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });

    /* ── Parallax Effect on Scroll ── */
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const citiesSection = document.getElementById('citiesSection');
        
        if (citiesSection) {
            const sectionTop = citiesSection.offsetTop;
            const sectionHeight = citiesSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when section is in view
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const parallaxOffset = (scrolled - sectionTop) * 0.05;
                const header = citiesSection.querySelector('.cities-header');
                if (header) {
                    header.style.transform = `translateY(${parallaxOffset}px)`;
                }
            }
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

})();


/* ═══════════════════════════════════════════════════
   FEATURED PROPERTIES — Scroll Reveal Animation
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    const featuredCards = document.querySelectorAll('.property-card');
    
    if (featuredCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        featuredCards.forEach(card => {
            revealObserver.observe(card);
        });
    }

    /* ── Card Click Handler ── */
    featuredCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // If clicked on button, handle separately
            if (e.target.closest('.property-view-btn')) {
                e.preventDefault();
                // Add click animation
                const btn = e.target.closest('.property-view-btn');
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
                
                // Navigate to property detail
                console.log('İlan detayına gidiliyor...');
                return;
            }
            
            // Trigger the view button click effect
            const viewBtn = this.querySelector('.property-view-btn');
            if (viewBtn) {
                viewBtn.click();
            }
        });
    });

    /* ── View All Button Animation ── */
    const viewAllBtn = document.querySelector('.featured-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Tüm ilanlar sayfasına gidiliyor...');
        });
    }

})();


/* ═══════════════════════════════════════════════════
   SELL SECTION — Lead Generation Form & Animations
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── Scroll Reveal Animation ── */
    const sellSection = document.getElementById('sellSection');
    
    if (sellSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        revealObserver.observe(sellSection);
    }

    /* ── Phone Input Formatting ── */
    const phoneInput = document.getElementById('sellPhone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '0 (' + value;
                } else if (value.length <= 6) {
                    value = '0 (' + value.slice(0, 3) + ') ' + value.slice(3);
                } else if (value.length <= 8) {
                    value = '0 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + ' ' + value.slice(6);
                } else {
                    value = '0 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
                }
            }
            
            e.target.value = value;
        });
    }

    /* ── Form Submission ── */
    const sellForm = document.getElementById('sellForm');
    const sellSuccess = document.getElementById('sellSuccess');
    const sellBenefits = document.querySelector('.sell-benefits');
    const sellFormHeader = document.querySelector('.sell-form-header');
    const sellResetBtn = document.getElementById('sellResetBtn');

    if (sellForm) {
        sellForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(sellForm);
            const data = Object.fromEntries(formData);
            
            // Simulate API call
            const submitBtn = sellForm.querySelector('.sell-form-submit');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Gönderiliyor...</span>';
            
            setTimeout(() => {
                // Hide form elements
                sellForm.classList.add('hidden');
                if (sellBenefits) sellBenefits.classList.add('hidden');
                if (sellFormHeader) sellFormHeader.style.display = 'none';
                
                // Show success message
                sellSuccess.classList.add('visible');
                
                // Log data (in production, send to server)
                console.log('Lead Generation Data:', data);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
            }, 1500);
        });
    }

    /* ── Reset Form ── */
    if (sellResetBtn) {
        sellResetBtn.addEventListener('click', function () {
            // Reset form
            sellForm.reset();
            
            // Show form elements
            sellForm.classList.remove('hidden');
            if (sellBenefits) sellBenefits.classList.remove('hidden');
            if (sellFormHeader) sellFormHeader.style.display = 'block';
            
            // Hide success
            sellSuccess.classList.remove('visible');
        });
    }

    /* ── Input Focus Effects ── */
    const sellInputs = document.querySelectorAll('.sell-form-input, .sell-form-select');
    
    sellInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.closest('.sell-form-group').style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function () {
            this.closest('.sell-form-group').style.transform = 'scale(1)';
        });
    });

})();


/* ═══════════════════════════════════════════════════
   TESTIMONIALS SLIDER & BLOG ANIMATIONS
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── Testimonials Slider ── */
    const slider = document.getElementById('testimonialsSlider');
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    if (slider && track) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let cardsPerView = window.innerWidth > 992 ? 2 : 1;
        const totalSlides = Math.ceil(cards.length / cardsPerView);
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Sayfa ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.testimonials-dot');
        
        function updateSlider() {
            const cardWidth = cards[0].offsetWidth + 30; // card width + gap
            track.style.transform = 'translateX(-' + (currentIndex * cardWidth * cardsPerView) + 'px)';
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            if (currentIndex >= totalSlides) currentIndex = 0;
            updateSlider();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide
        let autoSlide = setInterval(nextSlide, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            const newCardsPerView = window.innerWidth > 992 ? 2 : 1;
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                updateSlider();
            }
        });
    }

    /* ── Scroll Reveal Animations ── */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const blogCards = document.querySelectorAll('.blog-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    testimonialCards.forEach((card, i) => {
        card.style.transitionDelay = (i * 100) + 'ms';
        revealObserver.observe(card);
    });
    
    blogCards.forEach((card, i) => {
        card.style.transitionDelay = (i * 100) + 'ms';
        revealObserver.observe(card);
    });

    /* ── Blog Link Click Handler ── */
    blogCards.forEach(card => {
        const link = card.querySelector('.blog-link');
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Animation feedback
                this.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                console.log('Blog yazısına gidiliyor...');
            });
        }
    });

})();
