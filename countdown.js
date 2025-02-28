// Countdown timer functionality
console.log('Countdown timer script loaded');

// Global transactions array to store bids
window.transactions = window.transactions || [];

// Function to update countdown timer
function updateCountdown(transaction) {
    const countdownElement = document.getElementById(`countdown-${transaction.id}`);
    
    if (!countdownElement) {
        return;
    }
    
    const now = Date.now();
    const remaining = Math.max(0, transaction.executionTime - now);
    
    const minutes = Math.floor(remaining / (60 * 1000));
    const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
    
    countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (remaining > 0) {
        setTimeout(() => updateCountdown(transaction), 1000);
    } else {
        countdownElement.textContent = 'Executed';
        
        // Simulate execution
        if (transaction.status === 'pending') {
            transaction.status = 'executed';
            
            // Update the UI to show execution
            if (transaction.id === window.currentSimpleBid?.id) {
                // Update the simple bid display to show execution
                const bidsList = document.getElementById('simpleBidsList');
                if (bidsList) {
                    bidsList.innerHTML = '';
                    const bidElement = document.createElement('div');
                    bidElement.className = 'bid-item';
                    bidElement.innerHTML = `
                        <div class="bid-item-details">
                            <div class="bid-item-round">Round ${transaction.round} - Auto Bid (Executed)</div>
                            <div class="bid-item-main">
                                ${transaction.quantity.toLocaleString()} tokens at $${transaction.price.toFixed(2)}
                            </div>
                            <div class="bid-item-total">
                                Total USDC spent: $${transaction.total.toFixed(2)}
                                <div style="color: #4CAF50; margin-top: 0.25rem;">
                                    Executed at clearing price
                                </div>
                            </div>
                        </div>
                    `;
                    bidsList.appendChild(bidElement);
                }
            }
            
            // Update the transaction in history
            const transactionElement = document.querySelector(`.transaction-item[data-id="${transaction.id}"]`);
            if (transactionElement) {
                transactionElement.querySelector('.transaction-status').className = 'transaction-status executed';
                transactionElement.querySelector('.transaction-status').textContent = 'executed';
                if (transactionElement.querySelector('.execution-time')) {
                    transactionElement.querySelector('.execution-time').textContent = 'Executed';
                }
            }
        }
    }
}

// Function to update all countdowns
function updateAllCountdowns() {
    if (window.transactions && window.transactions.length > 0) {
        window.transactions.forEach(updateCountdown);
    }
}

// Update countdowns every second
setInterval(updateAllCountdowns, 1000);

// Function to add a transaction to the UI
function addTransactionToUI(transaction) {
    const transactionsContainer = document.querySelector('.history-list');
    if (!transactionsContainer) return;
    
    const transactionItem = document.createElement('div');
    transactionItem.classList.add('transaction-item');
    transactionItem.classList.add(transaction.type || 'buy');
    transactionItem.setAttribute('data-id', transaction.id);
    
    const formattedDate = new Date(transaction.executionTime).toLocaleString();
    
    transactionItem.innerHTML = `
        <div class="transaction-header">
            <span class="transaction-type">${transaction.type ? transaction.type.toUpperCase() : 'BUY'}</span>
            <span class="transaction-time">${new Date(transaction.timestamp || Date.now()).toLocaleString()}</span>
            <span class="transaction-status ${transaction.status}">${transaction.status}</span>
        </div>
        <div class="transaction-details">
            <div class="transaction-main">
                ${transaction.quantity.toLocaleString()} tokens @ $${transaction.price.toFixed(2)}
                ${transaction.status === 'pending' ? 
                    `<div class="execution-time">Executes in: <span class="countdown-timer" id="history-countdown-${transaction.id}">
                        ${Math.floor((transaction.executionTime - Date.now()) / (60 * 1000))}:${Math.floor(((transaction.executionTime - Date.now()) % (60 * 1000)) / 1000).toString().padStart(2, '0')}
                    </span></div>` : ''}
            </div>
            <div class="transaction-round">Round ${transaction.round}</div>
            <div class="transaction-total">
                Total: $${transaction.total.toFixed(2)}
                ${transaction.fee ? `<br>Fee: $${transaction.fee.toFixed(2)}` : ''}
                ${transaction.maxPrice ? `<br>Max Price: $${transaction.maxPrice.toFixed(2)}` : ''}
            </div>
        </div>
    `;
    
    transactionsContainer.prepend(transactionItem);
    
    // Start the countdown immediately
    updateCountdown(transaction);
}

// Global function for placing auto bids
window.placeAutoBid = function() {
    console.log('Auto bid button clicked');
    
    const simpleBidAmount = document.getElementById('simpleBidAmount');
    const simpleMaxPrice = document.getElementById('simpleMaxPrice');
    
    if (!simpleBidAmount || !simpleMaxPrice) {
        console.error('Bid form elements not found');
        return;
    }
    
    const amount = parseFloat(simpleBidAmount.value);
    const maxPrice = parseFloat(simpleMaxPrice.value);
    
    console.log('Amount:', amount, 'Max Price:', maxPrice);

    if (!amount || amount <= 0) {
        alert('Please enter a valid USDC amount');
        return;
    }

    if (!maxPrice || maxPrice <= 0) {
        alert('Please enter a valid maximum price');
        return;
    }
    
    try {
        // Simple calculation without complex demand curve
        const currentPrice = 2.25; // Current round price
        
        if (maxPrice < currentPrice) {
            alert(`Maximum price must be at least the current price ($${currentPrice})`);
            return;
        }
        
        const quantity = Math.floor(amount / currentPrice);
        
        const bid = {
            id: Date.now(),
            round: '3',
            quantity: quantity,
            price: currentPrice,
            maxPrice: maxPrice,
            total: amount,
            status: 'pending',
            timestamp: Date.now(),
            type: 'buy',
            executionTime: Date.now() + (5 * 60 * 1000), // 5 minutes from now
        };
        
        // Add to global transactions array
        window.transactions = window.transactions || [];
        window.transactions.push(bid);
        
        // Add to UI
        addTransactionToUI(bid);
        
        // Store the bid in a global variable for reference
        window.currentSimpleBid = bid;
        
        // Directly update the simple bidding tab UI
        const bidsList = document.getElementById('simpleBidsList');
        if (bidsList) {
            bidsList.innerHTML = '';
            const bidElement = document.createElement('div');
            bidElement.className = 'bid-item';
            bidElement.innerHTML = `
                <div class="bid-item-details">
                    <div class="bid-item-round">Round ${bid.round} - Auto Bid (Pending)</div>
                    <div class="bid-item-main">
                        ${bid.quantity.toLocaleString()} tokens at up to $${bid.maxPrice.toFixed(2)}
                    </div>
                    <div class="bid-item-total">
                        Total USDC committed: $${bid.total.toFixed(2)}
                        <div style="color: #FFA726; margin-top: 0.25rem;">
                            Will execute at clearing price in <span id="countdown-${bid.id}" class="countdown-timer">5:00</span>
                        </div>
                        <div style="color: #4CAF50; margin-top: 0.25rem;">
                            Expected execution price: $${bid.price.toFixed(2)}
                        </div>
                    </div>
                </div>
                <button class="cancel-bid-btn" onclick="cancelSimpleBid()">
                    <span style="color: #FF6B6B;">✕</span>
                </button>
            `;
            bidsList.appendChild(bidElement);
            console.log('Bid element added to simpleBidsList');
        }
        
        // Clear form
        simpleBidAmount.value = '';
        simpleMaxPrice.value = '';
        
        // Disable button
        const simpleSubmitButton = document.getElementById('simpleSubmitButton');
        if (simpleSubmitButton) {
            simpleSubmitButton.disabled = true;
            simpleSubmitButton.textContent = 'Auto Bid Placed';
            
            // Re-enable after 3 seconds
            setTimeout(() => {
                simpleSubmitButton.disabled = false;
                simpleSubmitButton.textContent = 'Place auto bid';
            }, 3000);
        }
        
        console.log('Auto bid placed successfully:', bid);
    } catch (error) {
        console.error('Error placing auto bid:', error);
        alert('There was an error placing your bid. Please try again.');
    }
    
    return false; // Prevent form submission
}; 