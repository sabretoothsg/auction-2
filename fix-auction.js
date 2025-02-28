// Simple fix for Round 3 graph and countdown timers
window.addEventListener('load', function() {
    console.log('Window loaded, applying fixes...');
    
    // Fix countdown timers
    function fixCountdowns() {
        const round3Element = document.getElementById('countdown');
        const overviewElement = document.getElementById('overview-countdown');
        
        if (round3Element || overviewElement) {
            console.log('Found countdown elements, initializing timers');
            
            // Set fixed durations
            const now = new Date().getTime();
            const round3End = now + (12 * 60 * 60 * 1000); // 12 hours
            const overviewEnd = now + (48 * 60 * 60 * 1000); // 48 hours
            
            // Update function
            function updateTimers() {
                const current = new Date().getTime();
                
                if (round3Element) {
                    const remaining = Math.max(0, round3End - current);
                    if (remaining > 0) {
                        const hours = Math.floor(remaining / (1000 * 60 * 60));
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                        round3Element.textContent = 
                            hours.toString().padStart(2, '0') + ':' + 
                            minutes.toString().padStart(2, '0') + ':' + 
                            seconds.toString().padStart(2, '0');
                    } else {
                        round3Element.textContent = 'ENDED';
                    }
                }
                
                if (overviewElement) {
                    const remaining = Math.max(0, overviewEnd - current);
                    if (remaining > 0) {
                        const hours = Math.floor(remaining / (1000 * 60 * 60));
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                        overviewElement.textContent = 
                            hours.toString().padStart(2, '0') + ':' + 
                            minutes.toString().padStart(2, '0') + ':' + 
                            seconds.toString().padStart(2, '0');
                    } else {
                        overviewElement.textContent = 'ENDED';
                    }
                }
            }
            
            // Update immediately and then every second
            updateTimers();
            setInterval(updateTimers, 1000);
        }
    }
    
    // Fix Round 3 graph
    function fixRound3Graph() {
        const chartCanvas = document.getElementById('unifiedChart');
        if (!chartCanvas) {
            console.error('Chart canvas not found');
            return;
        }
        
        console.log('Found chart canvas, creating Round 3 graph');
        
        // Simple Round 3 data
        const data = {
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
        };
        
        // Create a basic chart
        try {
            new Chart(chartCanvas, {
                type: 'line',
                data: data,
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
            console.log('Round 3 graph created successfully');
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    }
    
    // Apply fixes
    fixCountdowns();
    
    // Wait a moment before creating the chart to ensure Chart.js is loaded
    setTimeout(fixRound3Graph, 500);
}); 