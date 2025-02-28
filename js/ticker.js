document.addEventListener('DOMContentLoaded', function() {
    const tickerContent = document.querySelector('.ticker-content');
    const tickerData = [
        '🚀 BTC/USD +5.2%',
        '💎 ETH/USD +3.8%',
        '🔥 Latest auction closing in 5m',
        '👑 New market leader: CryptoWhale',
        '📈 Total volume: $45.8M',
        '🎮 Active players: 1.2K',
        '🎯 Risk index: Moderate',
        '💫 Next auction starts in 10m'
    ];

    function updateTicker() {
        tickerContent.innerHTML = tickerData.map(item => 
            `<span class="ticker-item">${item}</span>`
        ).join(' &nbsp;&nbsp;|&nbsp;&nbsp; ');
    }

    updateTicker();
    setInterval(function() {
        // Randomly update some values to create dynamic feel
        tickerData[0] = `🚀 BTC/USD ${(Math.random() > 0.5 ? '+' : '-')}${(Math.random() * 5).toFixed(1)}%`;
        tickerData[1] = `💎 ETH/USD ${(Math.random() > 0.5 ? '+' : '-')}${(Math.random() * 4).toFixed(1)}%`;
        updateTicker();
    }, 5000);
}); 