(function () {
    'use strict';

    /* ══════════════════════════════════════
       BACK TO TOP — scroll progress + visibility
       ══════════════════════════════════════ */
    var btnTop = document.getElementById('backToTop');
    var ring = btnTop ? btnTop.querySelector('.back-to-top-ring circle') : null;
    var circumference = 2 * Math.PI * 26;
    var reveals = document.querySelectorAll('.reveal');

    if (ring) {
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
    }

    /* ── Scroll handler: back-to-top visibility + reveal animations ── */
    function onFrame() {
        var y = window.scrollY;
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docH > 0 ? y / docH : 0;

        /* Back-to-top button show/hide */
        if (btnTop) {
            if (y > 400) {
                btnTop.classList.add('visible');
            } else {
                btnTop.classList.remove('visible');
            }
        }

        /* Ring progress */
        if (ring) {
            ring.style.strokeDashoffset = circumference - (progress * circumference);
        }

        /* Scroll reveal */
        var wh = window.innerHeight;
        reveals.forEach(function (el) {
            if (el.getBoundingClientRect().top < wh - 60) {
                el.classList.add('revealed');
            }
        });

        requestAnimationFrame(onFrame);
    }

    requestAnimationFrame(onFrame);

    /* Back-to-top click */
    if (btnTop) {
        btnTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ══════════════════════════════════════
       NEWSLETTER
       ══════════════════════════════════════ */
    var form = document.getElementById('newsletterForm');
    var msg = document.getElementById('newsletterMsg');

    if (form && msg) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = form.querySelector('.footer-newsletter-input');
            var email = input.value.trim();
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                input.style.borderColor = 'rgba(220, 80, 80, 0.5)';
                setTimeout(function () { input.style.borderColor = ''; }, 1500);
                return;
            }
            form.classList.add('success');
            msg.classList.add('visible');
            input.value = '';
            setTimeout(function () { form.classList.remove('success'); msg.classList.remove('visible'); }, 4000);
        });
    }

})();
