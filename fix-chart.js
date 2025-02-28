// Fix script to restore chart functionality
console.log('Chart fix script loaded');

// Wait for the window to fully load
window.addEventListener('load', function() {
    console.log('Window loaded, applying chart fix...');
    
    // Make sure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Make sure the annotation plugin is registered
    try {
        const ChartAnnotation = window['chartjs-plugin-annotation'];
        if (ChartAnnotation && typeof Chart.register === 'function') {
            Chart.register(ChartAnnotation);
            console.log('Chart annotation plugin registered');
        }
    } catch (e) {
        console.error('Error registering annotation plugin:', e);
    }
    
    // Check if the chart canvas exists
    const chartCanvas = document.getElementById('unifiedChart');
    if (!chartCanvas) {
        console.error('Chart canvas not found');
        return;
    }
    
    console.log('Chart canvas found');
    
    // Check if the initializeUnifiedChart function exists
    if (typeof initializeUnifiedChart !== 'function') {
        console.error('initializeUnifiedChart function not found');
        return;
    }
    
    // Try to initialize the chart
    try {
        console.log('Calling initializeUnifiedChart...');
        initializeUnifiedChart();
        console.log('Chart initialized successfully');
    } catch (e) {
        console.error('Error initializing chart:', e);
        
        // Fallback to creating a simple chart
        createSimpleChart();
    }
});

// Fallback function to create a simple chart
function createSimpleChart() {
    console.log('Creating simple chart as fallback...');
    
    const canvas = document.getElementById('unifiedChart');
    if (!canvas) return;
    
    // Try to destroy any existing chart
    if (window.unifiedChart) {
        try {
            window.unifiedChart.destroy();
        } catch (e) {
            console.error('Error destroying existing chart:', e);
        }
    }
    
    // Create a simple chart
    try {
        window.unifiedChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [0, 50000, 80000, 100000, 120000, 133000, 150000, 200000],
                datasets: [{
                    label: 'Round 3',
                    data: [0, 1.0, 1.5, 1.8, 2.0, 2.25, 2.5, 3.0],
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
        
        console.log('Simple chart created successfully');
    } catch (error) {
        console.error('Error creating simple chart:', error);
    }
} 