document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activePane = document.getElementById(tabId);

        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });

        // Add hover animation
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'translateY(-2px)';
                button.style.color = 'var(--primary-color)';
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'translateY(0)';
                button.style.color = 'var(--text-dim)';
            }
        });
    });

    // Initialize first tab as active
    switchTab('protection');
}); 