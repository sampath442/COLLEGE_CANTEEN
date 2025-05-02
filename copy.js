// Menu Data with placeholder text instead of images
const menuItems = [
    {
        id: 1,
        name: "Masala Dosa",
        price: 50,
        category: "breakfast",
        description: "Crispy rice crepe with potato filling",
        image: '/home/rguktrkvalley/WT_Project2/Images/Dosa.jpg' 
    },
    {
        id: 2,
        name: "Idli Sambar",
        price: 40,
        category: "breakfast",
        description: "Steamed rice cakes with lentil stew",
        image: '/home/rguktrkvalley/WT_Project2/Images/Idli.jpg' 
    },
    {
        id: 3,
        name: "Poha",
        price: 30,
        category: "breakfast",
        description: "Flattened rice with vegetables",
        image: '/home/rguktrkvalley/WT_Project2/Images/Poha.jpg' 
    },
    {
        id: 4,
        name: "Vada Pav",
        price: 25,
        category: "snacks",
        description: "Spicy potato fritter in bun",
        image: '/home/rguktrkvalley/WT_Project2/Images/VadaPav.jpg' 
    },
    {
        id: 5,
        name: "Samosa",
        price: 20,
        category: "snacks",
        description: "Fried pastry with spiced potatoes",
        image: '/home/rguktrkvalley/WT_Project2/Images/Samosa.jpg' 
    },
    {
        id: 6,
        name: "Chole Bhature",
        price: 60,
        category: "breakfast",
        description: "Chickpea curry with fried bread",
        image: '/home/rguktrkvalley/WT_Project2/Images/Chola.png' 
    },
    {
        id: 7,
        name: "Rajma Chawal",
        price: 55,
        category: "lunch",
        description: "Kidney beans with rice",
        image: '/home/rguktrkvalley/WT_Project2/Images/Rajma.jpg' 
    },
    {
        id: 8,
        name: "Paneer Butter Masala",
        price: 80,
        category: "lunch",
        description: "Cottage cheese in creamy tomato sauce",
        image: '/home/rguktrkvalley/WT_Project2/Images/Paneer.jpg' 
    },
    {
        id: 9,
        name: "Tea",
        price: 15,
        category: "beverages",
        description: "Hot milk tea with spices",
        image: '/home/rguktrkvalley/WT_Project2/Images/Tea.jpg' 
    },
    {
        id: 10,
        name: "Coffee",
        price: 20,
        category: "beverages",
        description: "Hot South Indian filter coffee",
        image: '/home/rguktrkvalley/WT_Project2/Images/Coffee.jpg' 
    },
    {
        id: 11,
        name: "Lassi",
        price: 30,
        category: "beverages",
        description: "Sweet yogurt drink",
        image: '/home/rguktrkvalley/WT_Project2/Images/Lassi.jpg' 
    },
    {
        id: 12,
        name: "Sandwich",
        price: 45,
        category: "snacks",
        description: "Vegetable sandwich with chutney",
        image: '/home/rguktrkvalley/WT_Project2/Images/Sandwich.jpg' 
    },
    {
        id: 13,
        name: "Chapathi",
        price: 40,
        category: "lunch",
        description: "Rajasthani Chapathi",
        image: '/home/rguktrkvalley/WT_Project2/Images/Chapathi.jpg' 
    },
    {
        id: 14,
        name: "Biryani",
        price: 150,
        category: "lunch",
        description: "Hyderabadi Chicken Dum Biryani",
        image: '/home/rguktrkvalley/WT_Project2/Images/Biryani.jpg' 
    }

];

// DOM Elements
const menuItemsContainer = document.getElementById('menu-items');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const orderModal = document.getElementById('order-modal');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.querySelector('.close-btn');
const closeSuccessBtn = document.getElementById('close-success-btn');
const orderSummary = document.getElementById('order-summary');
const studentForm = document.getElementById('student-form');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
function init() {
    renderMenuItems();
    renderCartItems();
    updateCartSummary();
    setupEventListeners();
    console.log("System initialized");
}

// Render menu items with images
function renderMenuItems(category = 'all') {
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = '<p>No items found in this category.</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}')"></div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-price">₹${item.price.toFixed(2)}</div>
                <span class="item-category">${item.category}</span>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-id="${item.id}">${quantity > 0 ? 'Update' : 'Add'}</button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(itemElement);
    });
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${menuItem.name}</div>
                <div class="cart-item-price">₹${menuItem.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" data-id="${item.id}">+</button>
                <button class="remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
        return sum + (menuItem.price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
    
    cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    
    checkoutBtn.disabled = cart.length === 0;
}

// Add item to cart
function addToCart(itemId, quantityChange = 1) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantityChange;
        
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
    } else if (quantityChange > 0) {
        cart.push({ id: itemId, quantity: quantityChange });
    }
    
    saveCart();
    renderMenuItems(document.querySelector('.tab-btn.active').dataset.category);
    renderCartItems();
    updateCartSummary();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderMenuItems(button.dataset.category);
        });
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            placeOrder();
        });
    });
    
    // Menu items container (event delegation)
    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId, 1);
        } else if (e.target.classList.contains('decrease-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId, -1);
        } else if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            const quantity = parseInt(e.target.parentElement.querySelector('.quantity').textContent);
            
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                cart.push({ id: itemId, quantity });
            }
            
            saveCart();
            renderMenuItems(document.querySelector('.tab-btn.active').dataset.category);
            renderCartItems();
            updateCartSummary();
        }
    });
    
    // Cart items container (event delegation)
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId, 1);
        } else if (e.target.classList.contains('decrease-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId, -1);
        } else if (e.target.classList.contains('remove-item-btn') || 
                   e.target.classList.contains('fa-trash')) {
            const itemId = parseInt(e.target.closest('button').dataset.id);
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            renderMenuItems(document.querySelector('.tab-btn.active').dataset.category);
            renderCartItems();
            updateCartSummary();
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        showOrderModal();
    });
    
    // Close modal buttons
    closeModalBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });
    
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
   
}

// Show order modal
function showOrderModal() {
    orderSummary.innerHTML = '';
    
    const summaryList = document.createElement('div');
    summaryList.className = 'order-items';
    
    cart.forEach(item => {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>${menuItem.name} x ${item.quantity}</div>
            <div>₹${(menuItem.price * item.quantity).toFixed(2)}</div>
        `;
        summaryList.appendChild(orderItem);
    });
    
    const subtotal = cart.reduce((sum, item) => {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
        return sum + (menuItem.price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    const summaryTotal = document.createElement('div');
    summaryTotal.className = 'order-total';
    summaryTotal.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (5%):</span>
            <span>₹${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
    `;
    
    orderSummary.appendChild(summaryList);
    orderSummary.appendChild(summaryTotal);
    
    orderModal.style.display = 'flex';
}

// Place order
function placeOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const dorm = document.getElementById('dorm').value;
    
    // In a real app, you would send this data to a server
    console.log('Order placed:', {
        studentInfo: { name, phone, dorm },
        items: cart,
        subtotal: parseFloat(subtotalElement.textContent.replace('₹', '')),
        tax: parseFloat(taxElement.textContent.replace('₹', '')),
        total: parseFloat(totalElement.textContent.replace('₹', ''))
    });
    
    // Show success message
    document.getElementById('success-message').textContent = 
        `Thank you, ${name}! Your order has been received and will be ready in 15-20 minutes.`;
    
    // Clear the cart
    cart = [];
    saveCart();
    renderMenuItems(document.querySelector('.tab-btn.active').dataset.category);
    renderCartItems();
    updateCartSummary();
    
    // Close order modal and show success modal
    orderModal.style.display = 'none';
    successModal.style.display = 'flex';
    
    // Reset form
    studentForm.reset();
}
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);