// ===== STATE MANAGEMENT =====
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name":"Guest User","email":"guest@5saudit.com"}');

// ===== DOM ELEMENTS =====
const elements = {
    loginBtn: document.getElementById('loginBtn'),
    loginModal: document.getElementById('loginModal'),
    closeModal: document.getElementById('closeModal'),
    accountMenu: document.getElementById('accountMenu'),
    accountAvatar: document.getElementById('accountAvatar'),
    dropdownMenu: document.getElementById('dropdownMenu'),
    startAuditBtn: document.getElementById('startAuditBtn'),
    loginForm: document.getElementById('loginForm'),
    logoutBtn: document.getElementById('logoutBtn'),
    toastMessage: document.getElementById('toastMessage'),
    toastText: document.getElementById('toastText'),
    dropdownUserName: document.getElementById('dropdownUserName'),
    dropdownUserEmail: document.getElementById('dropdownUserEmail'),
    submitLogin: document.getElementById('submitLogin'),
    forgotPassword: document.getElementById('forgotPassword'),
    signupLink: document.getElementById('signupLink')
};

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'success') {
    elements.toastText.textContent = message;
    elements.toastMessage.className = `toast-notification show ${type}`;
    
    setTimeout(() => {
        elements.toastMessage.classList.remove('show');
    }, 3000);
}

function updateUIForLoginState() {
    if (isLoggedIn) {
        elements.loginBtn.style.display = 'none';
        elements.accountMenu.style.display = 'block';
        
        elements.dropdownUserName.textContent = currentUser.name;
        elements.dropdownUserEmail.textContent = currentUser.email;
    } else {
        elements.loginBtn.style.display = 'flex';
        elements.accountMenu.style.display = 'none';
    }
}

function closeModal() {
    elements.loginModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openModal() {
    elements.loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== EVENT HANDLERS =====
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    elements.submitLogin.classList.add('loading');
    elements.submitLogin.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store login state
        isLoggedIn = true;
        currentUser = {
            name: email.split('@')[0],
            email: email
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateUIForLoginState();
        
        // Close modal
        closeModal();
        
        // Reset button
        elements.submitLogin.classList.remove('loading');
        elements.submitLogin.disabled = false;
        
        // Reset form
        elements.loginForm.reset();
        
        // Show welcome message
        showToast(`Welcome back, ${currentUser.name}!`);
    }, 1500);
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    
    updateUIForLoginState();
    elements.accountMenu.classList.remove('active');
    showToast('You have been logged out successfully.');
}

function handleStartAudit() {
    elements.startAuditBtn.classList.add('loading');
    
    if (!isLoggedIn) {
        setTimeout(() => {
            elements.startAuditBtn.classList.remove('loading');
            showToast('Please login first to start the audit!', 'error');
            openModal();
        }, 500);
    } else {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

function handleDropdownItemClick(e) {
    const item = e.currentTarget;
    const action = item.dataset.action;
    
    let message = '';
    switch(action) {
        case 'profile':
            message = 'Profile section coming soon!';
            break;
        case 'settings':
            message = 'Settings coming soon!';
            break;
        case 'history':
            message = 'Audit history coming soon!';
            break;
        case 'reports':
            message = 'Reports coming soon!';
            break;
    }
    
    if (message) {
        showToast(message, 'info');
        elements.accountMenu.classList.remove('active');
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Login button
    elements.loginBtn.addEventListener('click', openModal);
    
    // Close modal
    elements.closeModal.addEventListener('click', closeModal);
    
    // Click outside modal to close
    elements.loginModal.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) {
            closeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.loginModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Account avatar dropdown
    elements.accountAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.accountMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.accountMenu.contains(e.target) && !elements.accountAvatar.contains(e.target)) {
            elements.accountMenu.classList.remove('active');
        }
    });
    
    // Login form submit
    elements.loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Logout button
    elements.logoutBtn.addEventListener('click', handleLogout);
    
    // Start audit button
    elements.startAuditBtn.addEventListener('click', handleStartAudit);
    
    // Dropdown items
    document.querySelectorAll('.dropdown-item[data-action]').forEach(item => {
        item.addEventListener('click', handleDropdownItemClick);
    });
    
    // Forgot password
    elements.forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password reset functionality coming soon!', 'info');
    });
    
    // Sign up link
    elements.signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Sign up functionality coming soon!', 'info');
    });
    
    // Method cards click
    document.querySelectorAll('.method-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const messages = {
                sort: 'Sort (Seiri) - Remove unnecessary items',
                systematize: 'Systematize (Seiton) - A place for everything',
                sweep: 'Sweep (Seiso) - Clean and maintain',
                standardize: 'Standardize (Seiketsu) - Create consistency',
                discipline: 'Self-Discipline (Shitsuke) - Sustain the system'
            };
            showToast(messages[category] || '5S Methodology', 'info');
        });
    });
}

// ===== INITIALIZATION =====
function init() {
    // Update UI based on login state
    updateUIForLoginState();
    
    // Initialize event listeners
    initEventListeners();
    
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.method-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Welcome toast
    setTimeout(() => {
        if (isLoggedIn) {
            showToast(`Welcome back, ${currentUser.name}!`);
        } else {
            showToast('Welcome to 5S Audit System!', 'info');
        }
    }, 1000);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);