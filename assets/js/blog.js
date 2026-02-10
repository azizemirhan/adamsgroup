/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * BLOG SAYFALARI JAVASCRIPT
 * blog-list.html ve blog-detail.html için özel fonksiyonlar
 * ═══════════════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PAGINATION (Sayfalama)
    // ═══════════════════════════════════════════════════════════════════════════
    
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn--prev');
    const nextBtn = document.querySelector('.pagination-btn--next');
    
    if (paginationNumbers.length > 0) {
        paginationNumbers.forEach(btn => {
            btn.addEventListener('click', function() {
                // Aktif sayfayı güncelle
                paginationNumbers.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Buton durumlarını güncelle
                const pageNum = parseInt(this.textContent);
                updatePaginationButtons(pageNum);
                
                // Sayfa değişim animasyonu
                animatePageChange();
                
                // Scroll to top of blog list
                const blogPage = document.querySelector('.blog-page');
                if (blogPage) {
                    blogPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const activePage = document.querySelector('.pagination-number.active');
            if (activePage && activePage.previousElementSibling && 
                activePage.previousElementSibling.classList.contains('pagination-number')) {
                activePage.previousElementSibling.click();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const activePage = document.querySelector('.pagination-number.active');
            if (activePage && activePage.nextElementSibling && 
                activePage.nextElementSibling.classList.contains('pagination-number')) {
                activePage.nextElementSibling.click();
            }
        });
    }
    
    function updatePaginationButtons(currentPage) {
        const totalPages = paginationNumbers.length;
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
    }
    
    function animatePageChange() {
        const blogCards = document.querySelectorAll('.blog-list-card');
        
        blogCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SIDEBAR FORM (Bülten Aboneliği)
    // ═══════════════════════════════════════════════════════════════════════════
    
    const sidebarForm = document.querySelector('.sidebar-form');
    
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Buton durumunu güncelle
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✓ Abone Olundu';
                submitBtn.disabled = true;
                submitBtn.style.background = '#22c55e';
                
                // Input'u temizle
                emailInput.value = '';
                
                // 3 saniye sonra butonu eski haline getir
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SOCIAL SHARE (Sosyal Medya Paylaşımı)
    // ═══════════════════════════════════════════════════════════════════════════
    
    const shareButtons = document.querySelectorAll('.share-btn');
    
    if (shareButtons.length > 0) {
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const url = window.location.href;
                const title = document.title;
                let shareUrl = '';
                
                if (this.classList.contains('share-facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                } else if (this.classList.contains('share-twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                } else if (this.classList.contains('share-linkedin')) {
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                } else if (this.classList.contains('share-whatsapp')) {
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
                }
            });
        });
    }
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // READING PROGRESS (Okuma İlerlemesi)
    // ═══════════════════════════════════════════════════════════════════════════
    
    const article = document.querySelector('.blog-article');
    
    if (article) {
        // Progress bar oluştur
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        // CSS ekle
        const style = document.createElement('style');
        style.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: rgba(0,0,0,0.05);
                z-index: 9999;
            }
            .reading-progress-bar {
                height: 100%;
                background: var(--gold);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);
        
        const progressBarInner = progressBar.querySelector('.reading-progress-bar');
        
        window.addEventListener('scroll', function() {
            const articleRect = article.getBoundingClientRect();
            const articleTop = articleRect.top;
            const articleHeight = articleRect.height;
            const windowHeight = window.innerHeight;
            
            let progress = 0;
            
            if (articleTop < 0) {
                const scrolled = Math.abs(articleTop);
                const total = articleHeight - windowHeight;
                progress = Math.min((scrolled / total) * 100, 100);
            }
            
            progressBarInner.style.width = progress + '%';
        });
    }
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGE LAZY LOADING ANIMATION
    // ═══════════════════════════════════════════════════════════════════════════
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // TAG CLICK HANDLER
    // ═══════════════════════════════════════════════════════════════════════════
    
    const tagLinks = document.querySelectorAll('.tag-link');
    
    tagLinks.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Tıklanan tag'i vurgula
            this.style.background = 'var(--navy)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 200);
            
            // Burada gerçek bir filtreleme yapılabilir
            console.log('Filter by tag:', this.textContent);
        });
    });
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CATEGORY FILTER HIGHLIGHT
    // ═══════════════════════════════════════════════════════════════════════════
    
    const categoryLinks = document.querySelectorAll('.widget-categories a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            categoryLinks.forEach(l => l.style.color = '');
            this.style.color = 'var(--gold)';
            
            // Burada gerçek bir filtreleme yapılabilir
            console.log('Filter by category:', this.textContent);
        });
    });
    
});


// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Debounce fonksiyonu - scroll event'leri için
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format date to Turkish locale
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

/**
 * Calculate reading time based on text content
 */
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}
