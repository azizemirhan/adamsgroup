const fs = require('fs');
const path = require('path');

const authCode = `                    <li class="nav-item auth-nav-item">
                        <div class="header-auth" id="headerAuth">
                            <button class="auth-btn" aria-haspopup="true" aria-expanded="false">
                                <div class="auth-texts">
                                    <span class="auth-title">Giriş Yap</span>
                                    <span class="auth-sub">veya <span class="text-red">üye ol</span></span>
                                </div>
                                <div class="auth-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                            </button>
                            <div class="auth-dropdown-menu">
                                <a href="#" class="auth-btn-primary">Üye Girişi Yap</a>
                                <strong class="auth-dropdown-title">Adams Group'a Üye Ol</strong>
                                <ul class="auth-dropdown-list">
                                    <li><a href="#">Kayıtlı Aramalarım</a></li>
                                    <li><a href="#">Favorilerim</a></li>
                                    <li><a href="#">Mesajlarım</a></li>
                                    <li><a href="#">Değerlemelerim / Mülklerim</a></li>
                                    <li><a href="#">Kazançlarım</a></li>
                                    <li><a href="#">İlanlarım</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Condition: Has nav-right but missing auth-nav-item
    if (content.includes('class="nav-right"') && !content.includes('auth-nav-item')) {
        console.log(`Updating ${file}...`);
        
        // Match the <nav class="nav-right">...<ul role="menubar">...</ul>.../nav>
        // We use a non-greedy dots and capture group for the content inside <ul>
        const regex = /(<nav[^>]*class="nav-right"[^>]*>[\s\S]*?<ul[^>]*role="menubar"[^>]*>)([\s\S]*?)(<\/ul>\s*<\/nav>)/i;
        
        if (regex.test(content)) {
            const updatedContent = content.replace(regex, (match, open, items, close) => {
                // Remove trailing whitespace from items and append the authCode
                return open + items.trimEnd() + '\n' + authCode + '\n                ' + close;
            });
            fs.writeFileSync(file, updatedContent);
            console.log(`Successfully updated ${file}`);
        } else {
            // Try a simpler match if the first one fails
            const simpleRegex = /(<nav[^>]*class="nav-right"[^>]*>[\s\S]*?)(<\/ul>\s*<\/nav>)/i;
            if (simpleRegex.test(content)) {
                 const updatedContent = content.replace(simpleRegex, (match, open, close) => {
                    return open + '\n' + authCode + '\n                ' + close;
                });
                fs.writeFileSync(file, updatedContent);
                console.log(`Successfully updated ${file} (fallback search)`);
            } else {
                console.warn(`Could not find nav-right structure in ${file}`);
            }
        }
    } else if (content.includes('auth-nav-item')) {
        console.log(`Skipping ${file} - already has auth-nav-item`);
    } else {
        console.log(`Skipping ${file} - no nav-right found`);
    }
});
