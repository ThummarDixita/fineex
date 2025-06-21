
const products = [
    {
        id: 1,
        name: "Luxury Mortise Handle Set",
        description: "Premium brass mortise handle with elegant design and superior finish.",
        price: "2500",
        image: "./assets/images/p1.jpeg",
        category: "handles",
        tags: ["luxury", "brass", "premium", "handle", "mortise"]
    },
    {
        id: 2,
        name: "Security Mortise Lock",
        description: "Heavy-duty mortise lock with advanced security features and durable construction.",
        price: "4200",
        image: "./assets/images/p2.jpeg",
        category: "locks",
        tags: ["security", "lock", "heavy-duty", "mortise", "advanced"]
    },
    {
        id: 3,
        name: "Premium Door Handle",
        description: "Elegant door handle with smooth operation and premium finish.",
        price: "1800",
        image: "./assets/images/p3.jpeg",
        category: "handles",
        tags: ["premium", "door", "handle", "elegant", "smooth"]
    },
    {
        id: 4,
        name: "Designer Mortise Set",
        description: "Contemporary design mortise set perfect for modern interiors.",
        price: "3500",
        image: "./assets/images/p4.jpeg",
        category: "handles",
        tags: ["designer", "contemporary", "modern", "mortise", "interior"]
    },
    {
        id: 5,
        name: "Heavy Duty Lock",
        description: "Industrial grade mortise lock for maximum security and durability.",
        price: "5200",
        image: "./assets/images/p5.jpeg ",
        category: "locks",
        tags: ["heavy-duty", "industrial", "security", "durable", "mortise"]
    },
    {
        id: 6,
        name: "Brass Door Hardware",
        description: "Traditional brass hardware set with intricate detailing and lasting quality.",
        price: "2800",
        image: "./assets/images/p6.jpeg",
        category: "handles",
        tags: ["brass", "traditional", "hardware", "detailed", "quality"]
    },
    {
        id: 7,
        name: "Premium Hinge Set",
        description: "Heavy-duty brass hinges with smooth operation and rust resistance.",
        price: "1200",
        image: "./assets/images/p7.jpeg",
        category: "hinges",
        tags: ["premium", "hinge", "brass", "heavy-duty", "rust-resistant"]
    },
    {
        id: 8,
        name: "Luxury Lock Cylinder",
        description: "High-security lock cylinder with precision engineering and smooth operation.",
        price: "3800",
        image: "./assets/images/p8.jpeg",
        category: "locks",
        tags: ["luxury", "cylinder", "security", "precision", "engineering"]
    },
    {
        id: 9,
        name: "Designer Handle Collection",
        description: "Exclusive designer handle with unique styling and premium materials.",
        price: "4500",
        image: "./assets/images/p9.jpeg",
        category: "handles",
        tags: ["designer", "exclusive", "unique", "premium", "collection"]
    },
    {
        id: 10,
        name: "Professional Grade Lock",
        description: "Commercial grade mortise lock suitable for high-traffic areas.",
        price: "6200",
        image: "./assets/images/p10.jpeg",
        category: "locks",
        tags: ["professional", "commercial", "high-traffic", "grade", "mortise"]
    },
    {
        id: 11,
        name: "Decorative Hardware Set",
        description: "Ornate hardware set with artistic design and premium finish.",
        price: "3200",
        image: "./assets/images/p11.jpeg",
        category: "handles",
        tags: ["decorative", "ornate", "artistic", "premium", "hardware"]
    },
    {
        id: 12,
        name: "Heavy Duty Hinges",
        description: "Industrial strength hinges designed for heavy doors and frequent use.",
        price: "1800",
        image: "./assets/images/p12.jpeg",
        category: "hinges",
        tags: ["heavy-duty", "industrial", "hinges", "doors", "frequent-use"]
    }
];

// Application State Management
class FineexStore {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('fineexCart')) || [];
        this.isCartOpen = false;
        this.isMobileMenuOpen = false;
        this.isSearchOpen = false;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.filteredProducts = [...products];
    }

    // Cart Management
    addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: Date.now(),
                productId: productId,
                quantity: quantity,
                product: product
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`, 'success');
        return true;
    }

    updateQuantity(cartItemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(cartItemId);
            return;
        }

        const item = this.cart.find(item => item.id === cartItemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    }

    removeFromCart(cartItemId) {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'info');
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Cart cleared!', 'info');
    }

    saveCart() {
        localStorage.setItem('fineexCart', JSON.stringify(this.cart));
    }

    // UI State Management
    toggleCart() {
        this.isCartOpen = !this.isCartOpen;
        const cartSidebar = document.getElementById('cartSidebar');
        const cartContent = document.getElementById('cartContent');
        
        if (this.isCartOpen) {
            cartSidebar.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                cartContent.classList.remove('translate-x-full');
            }, 10);
        } else {
            cartContent.classList.add('translate-x-full');
            document.body.style.overflow = '';
            setTimeout(() => {
                cartSidebar.classList.add('hidden');
            }, 300);
        }
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const mobileNav = document.getElementById('mobileNav');
        const menuIcon = document.getElementById('menuIcon');
        const closeIcon = document.getElementById('closeIcon');
        
        if (this.isMobileMenuOpen) {
            mobileNav.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    toggleSearch() {
        this.isSearchOpen = !this.isSearchOpen;
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        if (this.isSearchOpen) {
            searchOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 100);
        } else {
            searchOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            this.searchQuery = '';
            searchInput.value = '';
            this.renderSearchResults([]);
        }
    }

    // Product Management
    filterProducts(category) {
        this.currentFilter = category;
        this.filteredProducts = category === 'all' 
            ? [...products] 
            : products.filter(product => product.category === category);
        
        if (this.searchQuery) {
            this.filteredProducts = this.filteredProducts.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        }
        
        this.renderProducts();
        this.updateFilterButtons();
    }

    searchProducts(query) {
        this.searchQuery = query.toLowerCase();
        const results = products.filter(product =>
            product.name.toLowerCase().includes(this.searchQuery) ||
            product.description.toLowerCase().includes(this.searchQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
        );
        this.renderSearchResults(results);
    }

    // UI Rendering Methods
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <div class="text-gray-400 mb-4">
                        <svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-4v2m0 0v2m0-2h2m-2 0h-2"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => `
            <div class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:scale-105">
                <div class="relative overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
                    <div class="absolute top-4 right-4">
                        <span class="bg-gradient-to-r from-gold to-yellow-500 text-navy font-bold px-3 py-1 rounded-full text-sm shadow-lg">Premium</span>
                    </div>
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div class="p-6 h-full">
                    <h3 class="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">${product.name}</h3>
                    <p class="text-gray-600 mb-6 text-sm leading-relaxed flex-1">${product.description}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-2xl font-bold text-navy">₹${parseInt(product.price).toLocaleString()}</span>
                        <button onclick="store.addToCart(${product.id})" class="bg-gradient-to-r from-gold to-yellow-500 text-navy hover:from-yellow-500 hover:to-gold font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 01-8 0"></path>
                            </svg>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderSearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0 && this.searchQuery) {
            searchResults.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-gray-400 mb-2">
                        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                    <p class="text-gray-500">No products found for "${this.searchQuery}"</p>
                </div>
            `;
        } else if (results.length > 0) {
            searchResults.innerHTML = results.slice(0, 6).map(product => `
                <div class="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onclick="store.selectSearchResult(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-800">${product.name}</h4>
                        <p class="text-sm text-gray-600">₹${parseInt(product.price).toLocaleString()}</p>
                    </div>
                </div>
            `).join('');
        } else {
            searchResults.innerHTML = '';
        }
    }

    selectSearchResult(productId) {
        this.toggleSearch();
        const product = products.find(p => p.id === productId);
        if (product) {
            this.filterProducts(product.category);
            // Scroll to product
            setTimeout(() => {
                const productElement = document.querySelector(`[data-product-id="${productId}"]`);
                if (productElement) {
                    productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    productElement.classList.add('ring-4', 'ring-gold', 'ring-opacity-50');
                    setTimeout(() => {
                        productElement.classList.remove('ring-4', 'ring-gold', 'ring-opacity-50');
                    }, 2000);
                }
            }, 100);
        }
    }

    updateFilterButtons() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            const category = btn.dataset.category;
            if (category === this.currentFilter) {
                btn.className = 'filter-btn bg-[#22283b] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105';
            } else {
                btn.className = 'filter-btn bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-[#22283b] hover:text-white transition-colors';
            }
        });
    }

    updateCartUI() {
        const cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = this.cart.reduce((sum, item) => sum + (parseInt(item.product.price) * item.quantity), 0);

        // Update cart count badges
        const cartCountElement = document.getElementById('cartCount');
        const floatingCartCountElement = document.getElementById('floatingCartCount');
        
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.classList.toggle('hidden', cartCount === 0);
        }

        if (floatingCartCountElement) {
            floatingCartCountElement.textContent = cartCount;
        }

        // Update total
        const cartTotalElement = document.getElementById('cartTotal');
        if (cartTotalElement) {
            cartTotalElement.textContent = Math.round(cartTotal).toLocaleString();
        }

        // Show/hide floating cart button
        const floatingCart = document.getElementById('floatingCart');
        if (floatingCart) {
            floatingCart.classList.toggle('hidden', cartCount === 0);
        }

        // Update cart items
        this.renderCartItems();

        // Show/hide cart footer
        const cartFooter = document.getElementById('cartFooter');
        if (cartFooter) {
            cartFooter.classList.toggle('hidden', cartCount === 0);
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 01-8 0"></path>
                    </svg>
                    <p class="text-gray-500 text-lg">Your cart is empty</p>
                    <p class="text-gray-400 text-sm mt-2">Add some products to get started</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center space-x-4">
                    <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-navy truncate">${item.product.name}</h4>
                        <p class="text-gray-600 text-sm">₹${parseInt(item.product.price).toLocaleString()}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})" class="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <span class="bg-gray-100 px-3 py-1 rounded text-sm font-medium min-w-[2rem] text-center">${item.quantity}</span>
                            <button onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})" class="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button onclick="store.removeFromCart(${item.id})" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-[#22283b]';
        
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 max-w-sm`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    ${type === 'success' ? 
                        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
                        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                    }
                </div>
                <div class="font-medium">${message}</div>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Hide notification
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize store
const store = new FineexStore();

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    store.renderProducts();
    store.updateCartUI();
    setupEventListeners();
});

// Global functions for HTML onclick handlers
function toggleCart() { store.toggleCart(); }
function toggleMobileMenu() { store.toggleMobileMenu(); }
function toggleSearch() { store.toggleSearch(); }
function clearCart() { store.clearCart(); }
function addToCart(productId) { store.addToCart(productId); }

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            store.filterProducts(category);
        });
    });

    // Navigation links - smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (store.isMobileMenuOpen) {
                store.toggleMobileMenu();
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                store.searchProducts(e.target.value);
            }, 300);
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                store.toggleSearch();
            }
        });
    }

    // Search overlay click outside to close
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                store.toggleSearch();
            }
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (store.isCartOpen && !e.target.closest('#cartContent') && !e.target.closest('button[onclick*="toggleCart"]')) {
            store.toggleCart();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (store.isCartOpen) {
                store.toggleCart();
            }
            if (store.isSearchOpen) {
                store.toggleSearch();
            }
            if (store.isMobileMenuOpen) {
                store.toggleMobileMenu();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && store.isMobileMenuOpen) {
            store.toggleMobileMenu();
        }
    });

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate
        document.querySelectorAll('.product-card, .about-content, .contact-item').forEach(el => {
            animateOnScroll.observe(el);
        });
    }
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        store.showNotification('Message sent successfully! We will get back to you soon.', 'success');
        event.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced scroll behaviors
    // window.addEventListener('scroll', function() {
    //     const header = document.querySelector('header');
    //     if (window.scrollY > 100) {
    //         header.classList.add('backdrop-blur-sm', 'bg-[#22283b]');
    //     } else {
    //         header.classList.remove('backdrop-blur-sm', 'bg-[#22283b]');
    //     }
    // });

// Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical images
    const criticalImages = [
        '/assets/images/p1.jpegpeg',
        '/assets/images/p1.jpeg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

// Analytics and performance tracking
function trackEvent(action, category, label) {
    // Replace with your analytics implementation
    console.log('Event tracked:', { action, category, label });
}

// Enhanced cart analytics
const originalAddToCart = store.addToCart.bind(store);
store.addToCart = function(productId, quantity = 1) {
    const result = originalAddToCart(productId, quantity);
    if (result) {
        const product = products.find(p => p.id === productId);
        trackEvent('add_to_cart', 'ecommerce', product.name);
    }
    return result;
};

// SEO and Meta tag updates
function updatePageMeta(title, description) {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    store.showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Enhanced accessibility
function addAccessibilityFeatures() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#22283b] text-white p-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.setAttribute('id', 'main');
        productsSection.setAttribute('role', 'main');
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Call accessibility enhancements
addAccessibilityFeatures();
