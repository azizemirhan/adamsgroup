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
    var acItems = acDropdown ? acDropdown.querySelectorAll('.search-autocomplete-item') : [];

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
        if (!acDropdown) return;
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

    if (locInput) {
        locInput.addEventListener('input', function () {
            showAutocomplete(locInput.value.trim());
        });

        locInput.addEventListener('focus', function () {
            if (locInput.value.trim().length >= 1) {
                showAutocomplete(locInput.value.trim());
            }
        });
    }

    // Close autocomplete on outside click
    document.addEventListener('click', function (e) {
        if (locInput && !locInput.contains(e.target) && acDropdown && !acDropdown.contains(e.target)) {
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
        if (!input) return;
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
    var searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var activeTab = document.querySelector('.search-tab.active');
            var type = activeTab ? activeTab.getAttribute('data-tab') : 'satilik';
            var location = locInput ? locInput.value : '';
            var category = document.getElementById('searchCategory') ? document.getElementById('searchCategory').value : '';

            // Visual feedback
            var btn = this.querySelector('.search-btn');
            if (btn) {
                btn.style.transform = 'scale(0.96)';
                setTimeout(function () {
                    btn.style.transform = '';
                }, 200);
            }

            console.log('Arama:', { type: type, location: location, category: category });
        });
    }


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
   GLOBAL SCROLL REVEAL & INTERACTIONS
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── Global Scroll Reveal Animation ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    const revealItems = document.querySelectorAll('.reveal, .property-card, .testimonial-card, .blog-card, .sell-section, .quick-features-section, .qf-action-card, .qf-city-card');
    revealItems.forEach(el => revealObserver.observe(el));

    /* ── Quick Features Card Click Handler ── */
    const actionCards = document.querySelectorAll('.qf-action-card, .qf-loc-card');
    actionCards.forEach(card => {
        card.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        card.addEventListener('mouseup', function () {
            this.style.transform = '';
        });
    });

    /* ── Featured Card Click Handler ── */
    const featuredCards = document.querySelectorAll('.property-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.property-view-btn')) {
                e.preventDefault();
                const btn = e.target.closest('.property-view-btn');
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
                return;
            }
            const viewBtn = this.querySelector('.property-view-btn');
            if (viewBtn) {
                viewBtn.click();
            }
        });
    });

    /* ── View All Buttons Animation ── */
    const actionBtns = document.querySelectorAll('.featured-all-btn, .blog-all-btn, .bento-cta');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

})();


/* ═══════════════════════════════════════════════════
   SELL SECTION — Lead Generation Form
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

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

    const sellForm = document.getElementById('sellForm');
    const sellSuccess = document.getElementById('sellSuccess');
    const sellBenefits = document.querySelector('.sell-benefits');
    const sellFormHeader = document.querySelector('.sell-form-header');
    const sellResetBtn = document.getElementById('sellResetBtn');

    if (sellForm) {
        sellForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(sellForm);
            const data = Object.fromEntries(formData);
            const submitBtn = sellForm.querySelector('.sell-form-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Gönderiliyor...</span>';
            
            setTimeout(() => {
                sellForm.classList.add('hidden');
                if (sellBenefits) sellBenefits.classList.add('hidden');
                if (sellFormHeader) sellFormHeader.style.display = 'none';
                if (sellSuccess) sellSuccess.classList.add('visible');
                console.log('Lead Generation Data:', data);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    if (sellResetBtn) {
        sellResetBtn.addEventListener('click', function () {
            sellForm.reset();
            sellForm.classList.remove('hidden');
            if (sellBenefits) sellBenefits.classList.remove('hidden');
            if (sellFormHeader) sellFormHeader.style.display = 'block';
            if (sellSuccess) sellSuccess.classList.remove('visible');
        });
    }

    const sellInputs = document.querySelectorAll('.sell-form-input, .sell-form-select');
    sellInputs.forEach(input => {
        input.addEventListener('focus', function () {
            const group = this.closest('.sell-form-group');
            if (group) group.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function () {
            const group = this.closest('.sell-form-group');
            if (group) group.style.transform = 'scale(1)';
        });
    });

})();


/* ═══════════════════════════════════════════════════
   TESTIMONIALS SLIDER
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';

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
        
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Sayfa ' + (i + 1));
                const slideIndex = i;
                dot.addEventListener('click', () => goToSlide(slideIndex));
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider() {
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonials-dot') : [];
            const cardWidth = cards[0].offsetWidth + 30;
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
        
        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        let autoSlide = setInterval(nextSlide, 5000);
        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        window.addEventListener('resize', () => {
            const newCardsPerView = window.innerWidth > 992 ? 2 : 1;
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                updateSlider();
            }
        });
    }

    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const link = card.querySelector('.blog-link');
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                this.style.transform = 'translateX(5px)';
                setTimeout(() => { this.style.transform = ''; }, 200);
            });
        }
    });

})();
