// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Menu item click handlers
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Save Settings Button
    const saveSettingsBtn = document.querySelector('.save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const btn = this;
            const originalText = btn.textContent;
            
            btn.textContent = 'Saving...';
            btn.disabled = true;
            
            // Simulate save
            setTimeout(() => {
                btn.textContent = 'Saved ✓';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            }, 1000);
        });
    }

    // Modal form submission
    const inviteForm = document.querySelector('.modal-form');
    if (inviteForm) {
        inviteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Team invitation sent! (In production, this would send an actual email)');
            document.getElementById('invite-modal').style.display = 'none';
            this.reset();
        });
    }

    // Action buttons and test call buttons
    document.querySelectorAll('.action-btn, .test-call-btn, .icon-action').forEach(btn => {
        if (!btn.classList.contains('save-settings')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = this.title || this.textContent.trim();
                console.log('Action clicked:', action);
                alert(`"${action}" feature will be fully functional in production!`);
            });
        }
    });
});

function navigateToPage(page) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[data-page="${page}"]`).classList.add('active');
    
    // Update page content
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`page-${page}`).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search functionality for call history
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // In production, this would filter the calls table
    });
}

// Filter dropdowns
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', function() {
        console.log('Filter changed:', this.value);
        // In production, this would filter the data
    });
});

// Add customer modal
function openAddCustomerModal() {
    alert('Add Customer modal would open here.\n\nIn production, this would show a form to add:\n- Customer name & contact\n- Insurance company & policy ID\n- Vehicle details\n- Issue description\n- Location information');
}
