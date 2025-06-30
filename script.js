// Global variables
let currentLanguage = 'en';
const CART_KEY = 'explorerCart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// Language toggle functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
    updateLanguage();
    updateLanguageButton();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-de], [data-placeholder-de]');
    
    elements.forEach(element => {
        if (currentLanguage === 'de') {
            // Switch to German
            if (element.hasAttribute('data-de')) {
                element.textContent = element.getAttribute('data-de');
            }
            if (element.hasAttribute('data-placeholder-de') && element.tagName === 'INPUT') {
                element.placeholder = element.getAttribute('data-placeholder-de');
            }
        } else {
            // Switch to English
            if (element.hasAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            }
            if (element.hasAttribute('data-placeholder-de') && element.tagName === 'INPUT') {
                element.placeholder = 'Your email address';
            }
        }
    });
}

function updateLanguageButton() {
    const langButton = document.getElementById('lang-toggle');
    if (langButton) {
        langButton.innerHTML = `<i class="fas fa-globe"></i> ${currentLanguage === 'en' ? 'DE/EN' : 'EN/DE'}`;
    }
}

// Mobile navigation
function toggleMobileNav() {
    const navbar = document.getElementById('navbar');
    const bar = document.getElementById('bar');
    
    if (navbar && bar) {
        navbar.classList.toggle('active');
        
        // Change hamburger icon
        if (navbar.classList.contains('active')) {
            bar.classList.remove('fas', 'fa-outdent');
            bar.classList.add('far', 'fa-times');
        } else {
            bar.classList.remove('far', 'fa-times');
            bar.classList.add('fas', 'fa-outdent');
        }
    }
}

// Close mobile navigation
function closeMobileNav() {
    const navbar = document.getElementById('navbar');
    const bar = document.getElementById('bar');
    
    if (navbar && bar) {
        navbar.classList.remove('active');
        bar.classList.remove('far', 'fa-times');
        bar.classList.add('fas', 'fa-outdent');
    }
}

// Cart functionality
function addToCart(item) {
    cart.push(item);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    showCartNotification(item.name);
}

function updateCartCount() {
    const cartIcons = document.querySelectorAll('#lg-bag a, #mobile a[href="cart.html"]');
    cartIcons.forEach(icon => {
        // Remove existing count badge
        const existingBadge = icon.querySelector('.cart-count');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add new count badge if cart has items
        if (cart.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-count';
            badge.textContent = cart.length;
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #f59e0b;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            icon.style.position = 'relative';
            icon.appendChild(badge);
        }
    });
}

function showCartNotification(itemName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${currentLanguage === 'de' ? 'Zum Warenkorb hinzugefügt:' : 'Added to cart:'} ${itemName}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2d5a27;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('#newsletter input[type="email"]');
    if (emailInput && emailInput.value) {
        const email = emailInput.value;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLanguage === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : 'Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert(currentLanguage === 'de' ? 'Danke für Ihre Anmeldung!' : 'Thank you for subscribing!');
        emailInput.value = '';
    } else {
        alert(currentLanguage === 'de' ? 'Bitte geben Sie Ihre E-Mail-Adresse ein.' : 'Please enter your email address.');
    }
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize page
function initializePage() {
    // Set up mobile navigation
    const mobileBar = document.getElementById('bar');
    const closeBtn = document.getElementById('close');
    
    if (mobileBar) {
        mobileBar.addEventListener('click', toggleMobileNav);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileNav);
    }
    
    // Set up newsletter subscription
    const newsletterBtn = document.querySelector('#newsletter .form button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }
    
    // Set up newsletter enter key
    const newsletterInput = document.querySelector('#newsletter input[type="email"]');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
    
    // Close mobile nav when clicking on nav links
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Initialize cart count
    updateCartCount();
    
    // Set up CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            smoothScroll('#sports-overview');
        });
    }
}

// Leaflet map initialization (for sport pages)
function initMap(containerId, coordinates, markers) {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    const map = L.map(containerId).setView(coordinates, 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers
    markers.forEach(marker => {
        L.marker([marker.lat, marker.lng])
            .bindPopup(`<b>${marker.name}</b><br>${marker.description}`)
            .addTo(map);
    });
    
    return map;
}

// Get coordinates for Ruhpolding area
function getRuhpoldingCoordinates() {
    return {
        center: [47.7567, 12.6442], // Ruhpolding center
        trailRunning: [
            { lat: 47.7600, lng: 12.6500, name: 'Ruhpolding Trail Start', description: 'Main trailhead for forest routes' },
            { lat: 47.7650, lng: 12.6600, name: 'Mountain Trail', description: 'Challenging mountain trail with panoramic views' },
            { lat: 47.7400, lng: 12.6300, name: 'Lake Loop', description: 'Easy scenic loop around the lake' }
        ],
        mountainBiking: [
            { lat: 47.7550, lng: 12.6400, name: 'MTB Center', description: 'Bike rental and trail information' },
            { lat: 47.7700, lng: 12.6700, name: 'Flow Trail', description: 'Exciting downhill flow trail' },
            { lat: 47.7350, lng: 12.6200, name: 'Cross Country', description: 'Long distance XC route' }
        ],
        climbing: [
            { lat: 47.7800, lng: 12.6800, name: 'Climbing Crag', description: 'Natural rock climbing area' },
            { lat: 47.7450, lng: 12.6350, name: 'Via Ferrata', description: 'Secured climbing route with stunning views' },
            { lat: 47.7650, lng: 12.6750, name: 'Bouldering Area', description: 'Popular bouldering spot' }
        ],
        paragliding: [
            { lat: 47.7900, lng: 12.6900, name: 'Launch Site 1', description: 'Primary paragliding launch point - 1200m' },
            { lat: 47.7750, lng: 12.6650, name: 'Launch Site 2', description: 'Alternative launch for different wind conditions' },
            { lat: 47.7300, lng: 12.6100, name: 'Landing Zone', description: 'Safe landing area in the valley' }
        ],
        skiing: [
            { lat: 47.7600, lng: 12.6500, name: 'Ski Resort', description: 'Main ski area with multiple slopes' },
            { lat: 47.7800, lng: 12.6800, name: 'Cross Country', description: 'Nordic skiing trails' },
            { lat: 47.7400, lng: 12.6200, name: 'Biathlon Stadium', description: 'World-famous biathlon venue' }
        ]
    };
}

// Page load event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    // Check if this is a sport page and initialize map
    const mapContainer = document.getElementById('sport-map');
    if (mapContainer) {
        const coordinates = getRuhpoldingCoordinates();
        const pageTitle = document.title.toLowerCase();
        
        let markers = [];
        if (pageTitle.includes('trail')) {
            markers = coordinates.trailRunning;
        } else if (pageTitle.includes('mountain') || pageTitle.includes('bike')) {
            markers = coordinates.mountainBiking;
        } else if (pageTitle.includes('climb')) {
            markers = coordinates.climbing;
        } else if (pageTitle.includes('paraglid')) {
            markers = coordinates.paragliding;
        } else if (pageTitle.includes('ski')) {
            markers = coordinates.skiing;
        }
        
        if (markers.length > 0) {
            // Add small delay to ensure map container is properly rendered
            setTimeout(() => {
                initMap('sport-map', coordinates.center, markers);
            }, 500);
        }
    }
});

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');

    if (!cartItemsContainer || !totalDisplay) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    const grouped = {};
    cart.forEach(item => {
        if (!grouped[item.id]) {
            grouped[item.id] = { ...item, quantity: 0 };
        }
        grouped[item.id].quantity += 1;
    });

    Object.values(grouped).forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'cart-item-name';
        nameSpan.textContent = `${item.name} × ${item.quantity}`;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'cart-item-price';
        priceSpan.textContent = `€${(item.price * item.quantity).toFixed(2)}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = currentLanguage === 'de' ? 'Entfernen' : 'Remove';
        removeBtn.onclick = () => removeFromCart(item.id);

        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(priceSpan);
        itemDiv.appendChild(removeBtn);

        cartItemsContainer.appendChild(itemDiv);

        total += item.price * item.quantity;
    });

    totalDisplay.textContent = `€${total.toFixed(2)}`;
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    renderCart();
}


// Ergänze in initializePage()
if (document.getElementById('cart-items')) {
    renderCart();
}


// Export functions for use in other files
window.addToCart = addToCart;
window.toggleLanguage = toggleLanguage;
window.initMap = initMap;
window.getRuhpoldingCoordinates = getRuhpoldingCoordinates

