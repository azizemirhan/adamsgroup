(function () {
    'use strict';

    /* ── Gallery Images ── */
    var images = [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=675&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=675&fit=crop&q=85'
    ];
    var current = 0;
    var mainImg = document.getElementById('mainImage');
    var counter = document.getElementById('counterText');
    var thumbs = document.querySelectorAll('.gallery-thumb');

    function goTo(idx) {
        if (idx < 0) idx = images.length - 1;
        if (idx >= images.length) idx = 0;
        current = idx;
        mainImg.src = images[current];
        counter.textContent = (current + 1) + ' / ' + images.length;
        thumbs.forEach(function (t, i) {
            t.classList.toggle('active', i === current);
        });
        // Scroll thumb into view
        if (thumbs[current]) thumbs[current].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    document.getElementById('galleryNext').addEventListener('click', function () { goTo(current + 1); });
    document.getElementById('galleryPrev').addEventListener('click', function () { goTo(current - 1); });

    thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            goTo(parseInt(this.getAttribute('data-idx')));
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    /* ── Lightbox ── */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');

    document.getElementById('galleryMain').addEventListener('click', function (e) {
        if (e.target.closest('.gallery-nav') || e.target.closest('.gallery-icon-btn')) return;
        lightboxImg.src = images[current];
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    document.getElementById('lightboxClose').addEventListener('click', function () {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    /* ── Tab Navigation ── */
    var tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            tabBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var target = document.getElementById('sec-' + btn.getAttribute('data-tab'));
            if (target) {
                var offset = 70;
                var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    /* ── Scroll Spy for Tabs ── */
    var sections = ['details', 'description', 'features', 'address'];
    var sectionEls = sections.map(function (id) { return document.getElementById('sec-' + id); });

    function updateActiveTab() {
        var scrollY = window.scrollY + 100;
        for (var i = sectionEls.length - 1; i >= 0; i--) {
            if (sectionEls[i] && sectionEls[i].offsetTop <= scrollY) {
                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                tabBtns[i].classList.add('active');
                break;
            }
        }
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () { updateActiveTab(); scrollTicking = false; });
            scrollTicking = true;
        }
    }, { passive: true });

    /* ── Gallery Touch Swipe ── */
    var galleryEl = document.getElementById('galleryMain');
    var touchStartX = 0;
    var touchEndX = 0;

    galleryEl.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryEl.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) { goTo(current + 1); }
            else { goTo(current - 1); }
        }
    }, { passive: true });

    /* ── Mobile CTA Bar show/hide ── */
    var mobileCta = document.getElementById('mobileCta');
    if (mobileCta) {
        var heroSection = document.querySelector('.prop-hero');
        function toggleMobileCta() {
            if (!heroSection) return;
            var rect = heroSection.getBoundingClientRect();
            if (rect.bottom < 0) {
                mobileCta.style.transform = 'translateY(0)';
            } else {
                mobileCta.style.transform = 'translateY(100%)';
            }
        }
        mobileCta.style.transition = 'transform 300ms ease';
        mobileCta.style.transform = 'translateY(100%)';
        window.addEventListener('scroll', function () {
            requestAnimationFrame(toggleMobileCta);
        }, { passive: true });
        toggleMobileCta();
    }

})();