(function () {
    'use strict';

    /* ── ELEMENTS ── */
    const header = document.getElementById('header');
    const topbar = document.getElementById('topbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const megaItems = document.querySelectorAll('.nav-item[data-mega]');
    const mobileSubItems = document.querySelectorAll('.mobile-menu-item[data-mobile-sub]');
    const langSelector = document.getElementById('langSelector');

    /* ── STICKY HEADER ON SCROLL ── */
    let lastScroll = 0;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;

        // Toggle scrolled class for header
        if (y > 40) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }

        lastScroll = y;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    /* ── LANGUAGE SELECTOR ── */
    if (langSelector) {
        const langCurrent = langSelector.querySelector('.lang-current');

        langCurrent.addEventListener('click', function (e) {
            e.stopPropagation();
            langSelector.classList.toggle('open');
            this.setAttribute('aria-expanded', langSelector.classList.contains('open'));
        });

        document.addEventListener('click', function (e) {
            if (!langSelector.contains(e.target)) {
                langSelector.classList.remove('open');
                langCurrent.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ── MEGA MENU (Desktop) ── */
    let megaCloseTimer = null;

    function closeMega(item) {
        const megaId = item.getAttribute('data-mega');
        const mega = document.getElementById('mega-' + megaId);
        if (!mega) return;
        item.classList.remove('mega-open');
        mega.classList.remove('open');
        const link = item.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
    }

    function closeAllMegas() {
        megaItems.forEach(closeMega);
    }

    function openMega(item) {
        clearTimeout(megaCloseTimer);
        megaCloseTimer = null;
        // Önce tüm mega menüleri kapat, sonra bu öğeninkini aç (başka menüye geçişte öncekinin kalmasını önler)
        closeAllMegas();
        const megaId = item.getAttribute('data-mega');
        const mega = document.getElementById('mega-' + megaId);
        if (!mega) return;
        item.classList.add('mega-open');
        mega.classList.add('open');
        const link = item.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'true');
    }

    /* Geçişte kapatma gecikmesi (ms) — menüden menüye geçerken yanlışlıkla kapanmasın */
    var megaCloseDelay = 320;

    megaItems.forEach(function (item) {
        const megaId = item.getAttribute('data-mega');
        const mega = document.getElementById('mega-' + megaId);
        if (!mega) return;

        item.addEventListener('mouseenter', function () {
            clearTimeout(megaCloseTimer);
            megaCloseTimer = null;
            openMega(item);
        });

        item.addEventListener('mouseleave', function () {
            megaCloseTimer = setTimeout(function () {
                closeMega(item);
                megaCloseTimer = null;
            }, megaCloseDelay);
        });

        mega.addEventListener('mouseenter', function () {
            clearTimeout(megaCloseTimer);
            megaCloseTimer = null;
        });

        mega.addEventListener('mouseleave', function () {
            megaCloseTimer = setTimeout(function () {
                closeMega(item);
                megaCloseTimer = null;
            }, megaCloseDelay);
        });

        // Keyboard accessibility
        item.querySelector('.nav-link').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (item.classList.contains('mega-open')) {
                    closeMega(item);
                } else {
                    openMega(item);
                }
            }
            if (e.key === 'Escape') {
                closeMega(item);
            }
        });
    });

    // Close mega on outside click
    document.addEventListener('click', function (e) {
        megaItems.forEach(function (item) {
            if (!item.contains(e.target)) {
                closeMega(item);
            }
        });
    });

    /* ── MOBILE MENU ── */
    function openMobileMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    overlay.addEventListener('click', closeMobileMenu);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            megaItems.forEach(closeMega);
            if (langSelector) {
                langSelector.classList.remove('open');
                const langCurrent = langSelector.querySelector('.lang-current');
                if (langCurrent) langCurrent.setAttribute('aria-expanded', 'false');
            }
        }
    });

    /* ── MOBILE ACCORDION SUB-MENUS ── */
    mobileSubItems.forEach(function (item) {
        var link = item.querySelector('.mobile-menu-link');
        var sub = item.querySelector('.mobile-sub');
        if (!link || !sub) return;

        link.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = item.classList.contains('sub-open');

            // close all others
            mobileSubItems.forEach(function (el) {
                el.classList.remove('sub-open');
                var s = el.querySelector('.mobile-sub');
                if (s) s.classList.remove('expanded');
            });

            if (!isOpen) {
                item.classList.add('sub-open');
                sub.classList.add('expanded');
            }
        });
    });

    /* ── CLOSE MOBILE MENU ON LINK CLICK (navigation links) ── */
    mobileMenu.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href && href !== '#' && href.indexOf('javascript:') !== 0) {
            closeMobileMenu();
        }
    });

    /* ── PREVENT FLASH ON LOAD ── */
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

})();