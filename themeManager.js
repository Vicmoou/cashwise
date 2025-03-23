class ThemeManager {
    static init() {
        // Set base URL for GitHub Pages
        this.baseUrl = window.location.pathname.includes('/Cashmigo') ? '/Cashmigo' : '';
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = `${this.baseUrl}/login.html`;
            return;
        }

        const theme = localStorage.getItem(`theme_${currentUser.id}`) || 'light';
        this.applyTheme(theme);
        this.initMobileMenu();
        this.fixNavigation();
    }

    static fixNavigation() {
        // Update all navigation links with correct base URL
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.getAttribute('href').startsWith('/') || 
                link.getAttribute('href').startsWith('./') || 
                link.getAttribute('href').endsWith('.html')) {
                const href = link.getAttribute('href').replace(/^\.?\/?/, '');
                link.href = `${this.baseUrl}/${href}`;
            }
        });
    }

    static applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(`theme_${JSON.parse(localStorage.getItem('currentUser')).id}`, theme);
    }

    static initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }
}

// Initialize theme system
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());