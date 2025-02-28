// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show Create Note button only on relevant pages
    const createNoteBtn = document.querySelector('.create-note-btn');
    const currentPath = window.location.pathname;
    if (createNoteBtn) {
        if (currentPath.includes('/pages/notes.html') || currentPath.includes('/pages/portfolio.html')) {
            createNoteBtn.style.display = 'inline-flex';
        }
    }

    const modal = document.getElementById('noteTypeModal');
    const closeModal = document.getElementById('closeModal');
    const selectButtons = document.querySelectorAll('.select-button');
    
    // Function to open modal
    window.openNoteTypeModal = function() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Function to close modal
    function closeNoteTypeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Close modal
    closeModal?.addEventListener('click', closeNoteTypeModal);
    
    // Close modal when clicking outside
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeNoteTypeModal();
        }
    });
    
    // Handle note type selection
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const noteType = this.getAttribute('data-note-type');
            closeNoteTypeModal();
            window.location.href = `/pages/create-note.html?type=${noteType}`;
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle?.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Wallet connection
    const connectWalletBtn = document.querySelector('.connect-wallet');
    
    connectWalletBtn?.addEventListener('click', async function() {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined') {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                
                // Update button text to show connected address
                connectWalletBtn.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
                connectWalletBtn.classList.add('connected');
            } else {
                alert('Please install MetaMask to connect your wallet!');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    });
});

// Slogans Manager
const exchequerSlogans = {
    general: [
        "It's not moon, but it's safe harbor",
        "While they farm yields, we build flood walls",
        "It's not lambos, it's lifeboats",
        "When they're catching knives, we're handing out gloves",
        "It's not much, but it's honest protection",
        "Floor protection isn't sexy until the rug is pulled",
        "We don't go to the moon, we build the landing pad",
        "While they chase pumps, we prevent dumps",
        "It ain't glamorous, but neither is losing everything",
        "Downside protection: Because 'number go up' isn't a strategy",
        "We're the airbags for your crypto journey",
        "FOMO into safety for once",
        "The floor isn't lava, it's where we build foundations",
        "We're the seatbelts of DeFi - boring until you crash",
        "Exchequer: Because someone has to be the adult in the room",
        "It's not much, but it keeps you dry when it rains"
    ],
    
    contextual: {
        portfolio: [
            "Your bags are heavy, let us help with that",
            "Portfolio protection > Portfolio flexing",
            "Making 'zoom out' less painful"
        ],
        notes: [
            "Like bonds, but with a sense of humor",
            "Protection first, moon missions second",
            "Because 'trust me bro' isn't a strategy"
        ],
        governance: [
            "Democracy with downside protection",
            "Vote with your brain, protect with your heart",
            "Governance: Where the adults make the decisions"
        ]
    }
};

// Add slogan to any element with data-slogan-type attribute
function initializeSlogans() {
    const elements = document.querySelectorAll('[data-slogan-type]');
    elements.forEach(element => {
        const type = element.getAttribute('data-slogan-type');
        const slogans = type === 'general' ? exchequerSlogans.general : exchequerSlogans.contextual[type];
        if (slogans) {
            const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
            element.setAttribute('data-slogan', randomSlogan);
        }
    });
}

// Add hover effect styles
const sloganStyles = `
    [data-slogan] {
        position: relative;
        cursor: help;
    }

    [data-slogan]::after {
        content: attr(data-slogan);
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 1rem;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        font-size: 0.75rem;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }

    [data-slogan]:hover::after {
        opacity: 1;
    }

    .stat-card[data-slogan]::after {
        bottom: 0;
        left: 0;
        transform: none;
        width: 100%;
        text-align: center;
        border-radius: 0 0 12px 12px;
    }

    .section-title[data-slogan]::after {
        bottom: -20px;
        left: 0;
        transform: none;
    }
`;

// Add styles to document
function addSloganStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = sloganStyles;
    document.head.appendChild(styleSheet);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    addSloganStyles();
    initializeSlogans();
    
    // Load header and footer if placeholders exist
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        fetch('/components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Re-run slogan initialization for new content
                initializeSlogans();
            });
    }
    
    if (footerPlaceholder) {
        fetch('/components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                // Re-run slogan initialization for new content
                initializeSlogans();
            });
    }
}); 