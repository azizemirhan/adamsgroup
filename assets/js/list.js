(function () {
    console.log('AdamsGroup List JS Initialized...');
    'use strict';

    /* ── Room Filter Toggle ── */
    document.querySelectorAll('.filter-room-grid').forEach(function (grid) {
        grid.querySelectorAll('.filter-room-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                grid.querySelectorAll('.filter-room-btn').forEach(function (b) {
                    b.classList.remove('selected');
                });
                btn.classList.add('selected');
            });
        });
    });

    /* ── Range Slider ── */
    var areaSlider = document.getElementById('areaSlider');
    var rangeMax = document.getElementById('rangeMax');
    if (areaSlider && rangeMax) {
        areaSlider.addEventListener('input', function () {
            rangeMax.textContent = areaSlider.value + ' m²';
        });
    }

    /* ── Favorite Toggle ── */
    document.querySelectorAll('.card-fav').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            btn.classList.toggle('liked');
        });
    });

    /* ── View Toggle ── */
    var propertyGrid = document.getElementById('propertyGrid');
    document.querySelectorAll('.view-toggle-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var view = btn.getAttribute('data-view');
            document.querySelectorAll('.view-toggle-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var grid = document.getElementById('propertyGrid');
            if (grid) {
                if (view === 'list') {
                    grid.classList.add('list-view');
                } else {
                    grid.classList.remove('list-view');
                }
            }
        });
    });

    /* ── Pagination ── */
    document.querySelectorAll('.pagination-btn:not(.disabled)').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.pagination-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* ── Active Filter Tag Remove ── */
    document.querySelectorAll('.active-filter-tag svg').forEach(function (x) {
        x.addEventListener('click', function () {
            var tag = x.closest('.active-filter-tag');
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.9)';
            tag.style.transition = 'all 250ms ease';
            setTimeout(function () { tag.remove(); }, 260);
        });
    });

    document.querySelector('.active-filters-clear').addEventListener('click', function () {
        document.querySelectorAll('.active-filter-tag').forEach(function (tag, i) {
            setTimeout(function () {
                tag.style.opacity = '0';
                tag.style.transform = 'scale(0.9)';
                tag.style.transition = 'all 200ms ease';
                setTimeout(function () { tag.remove(); }, 220);
            }, i * 80);
        });
    });

    /* ── Mobile Bottom Sheet ── */
    var bsOverlay = document.getElementById('bsOverlay');
    var bottomSheet = document.getElementById('bottomSheet');
    var mobileFilterBtn = document.getElementById('mobileFilterBtn');
    var bsClose = document.getElementById('bsClose');
    var bsApply = document.getElementById('bsApply');

    function openBottomSheet() {
        bsOverlay.classList.add('visible');
        bottomSheet.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeBottomSheet() {
        bottomSheet.classList.remove('open');
        bsOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openBottomSheet);
    if (bsClose) bsClose.addEventListener('click', closeBottomSheet);
    if (bsOverlay) bsOverlay.addEventListener('click', closeBottomSheet);
    if (bsApply) bsApply.addEventListener('click', closeBottomSheet);

    /* ── Touch drag to close bottom sheet ── */
    var startY = 0;
    var currentY = 0;

    if (bottomSheet) {
        bottomSheet.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
        }, { passive: true });

        bottomSheet.addEventListener('touchmove', function (e) {
            currentY = e.touches[0].clientY;
            var diff = currentY - startY;
            if (diff > 0) {
                bottomSheet.style.transform = 'translateY(' + diff + 'px)';
            }
        }, { passive: true });

        bottomSheet.addEventListener('touchend', function () {
            var diff = currentY - startY;
            if (diff > 120) {
                closeBottomSheet();
            }
            bottomSheet.style.transform = '';
            startY = 0;
            currentY = 0;
        });
    }

})();