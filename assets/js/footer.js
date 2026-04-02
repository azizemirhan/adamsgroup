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

    /* ══════════════════════════════════════
       WHATSAPP WIDGET
       ══════════════════════════════════════ */
    function initWhatsApp() {
        var widgetHTML = `
            <div class="wa-widget" id="waWidget">
                <div class="wa-panel">
                    <div class="wa-panel-header">
                        <h4>Adams Group</h4>
                        <p>Size nasıl yardımcı olabiliriz?</p>
                    </div>
                    <div class="wa-panel-body">
                        <a href="https://wa.me/905555555555?text=Merhaba,%20bilgi%20almak%20istiyorum." target="_blank" class="wa-rep-card">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" alt="Firma Yetkilisi" class="wa-rep-avatar">
                            <div class="wa-rep-info">
                                <h5>Firma Yetkilisi</h5>
                                <span><i class="online-dot"></i>Çevrimiçi</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="wa-button" id="waBtn">
                    <svg viewBox="0 0 24 24"><path d="M19.49 4.51C17.49 2.5 14.83 1.4 12 1.4 6.44 1.4 1.91 5.93 1.91 11.5c0 1.77.46 3.5 1.34 5.03L1.81 22.2l5.8-1.52c1.47.81 3.12 1.24 4.81 1.24h.01c5.56 0 10.09-4.53 10.09-10.1 0-2.69-1.05-5.22-2.95-7.13zm-7.48 15.65h-.01c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.15.83.84-3.08-.2-.32a8.4 8.4 0 0 1-1.28-4.48c0-4.64 3.78-8.42 8.43-8.42 2.25 0 4.36.88 5.95 2.47 1.59 1.59 2.47 3.7 2.47 5.95 0 4.64-3.78 8.42-8.42 8.42zm4.62-6.31c-.25-.13-1.5-.74-1.73-.83-.23-.09-.4-.13-.57.13-.17.25-.66.83-.81 1-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.38-.78-1.89-.2-.5-.41-.43-.57-.44-.15-.01-.32-.01-.49-.01-.17 0-.44.06-.67.31-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.79 2.73 4.34 3.83.61.26 1.08.42 1.45.54.61.19 1.17.16 1.61.1.49-.07 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3z"/></svg>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        var waWidget = document.getElementById('waWidget');
        var waBtn = document.getElementById('waBtn');
        if (waBtn && waWidget) {
            waBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                waWidget.classList.toggle('open');
            });
            
            document.addEventListener('click', function(e) {
                if (!waWidget.contains(e.target)) {
                    waWidget.classList.remove('open');
                }
            });
        }
    }
    
    // Inject automatically
    initWhatsApp();

})();
