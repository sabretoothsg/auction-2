// Direct fix for Round 3 graph
console.log('Direct fix script loaded');

// Function to create the Round 3 chart
function createRound3Chart() {
    console.log('Creating Round 3 chart...');
    
    // Get the canvas element
    const canvas = document.getElementById('unifiedChart');
    if (!canvas) {
        console.error('Chart canvas not found');
        return;
    }
    
    console.log('Canvas found:', canvas);
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    console.log('Chart.js is loaded');
    
    // Try to destroy any existing chart
    try {
        if (window.unifiedChart) {
            window.unifiedChart.destroy();
            console.log('Destroyed existing chart');
        }
    } catch (e) {
        console.error('Error destroying existing chart:', e);
    }
    
    // Create the chart
    try {
        window.unifiedChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [0, 50000, 80000, 120000, 133000, 150000, 200000],
                datasets: [{
                    label: 'Round 3',
                    data: [0, 1.0, 1.5, 2.0, 2.25, 2.5, 3.0],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tokens'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price ($)'
                        },
                        min: 0,
                        max: 4
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Round 3 Auction',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
        console.log('Round 3 chart created successfully');
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}

// Try to create the chart when the document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(createRound3Chart, 1000);
    });
} else {
    setTimeout(createRound3Chart, 1000);
}

// Also try when the window is fully loaded
window.addEventListener('load', function() {
    setTimeout(createRound3Chart, 1000);
});

// And try one more time after a longer delay
setTimeout(createRound3Chart, 3000); 