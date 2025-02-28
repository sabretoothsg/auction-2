document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    updateLeaderboard();
    updateAuctionPreview();
    updateRiskIndicator();
    
    // Update components periodically
    setInterval(updateLeaderboard, 10000);
    setInterval(updateAuctionPreview, 5000);
    setInterval(updateRiskIndicator, 15000);
});

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    const leaders = [
        { name: 'CryptoWhale', profit: '+$124.5K', rank: '🥇' },
        { name: 'AGI_Trader', profit: '+$98.2K', rank: '🥈' },
        { name: 'FutureSpeculator', profit: '+$76.8K', rank: '🥉' },
        { name: 'RiskMaster', profit: '+$65.3K', rank: '4' },
        { name: 'AlphaHunter', profit: '+$52.1K', rank: '5' }
    ];

    leaderboard.innerHTML = `
        <div class="leaderboard-list">
            ${leaders.map(leader => `
                <div class="leaderboard-item">
                    <span class="rank">${leader.rank}</span>
                    <span class="name">${leader.name}</span>
                    <span class="profit">${leader.profit}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateAuctionPreview() {
    const auctionPreview = document.getElementById('auctionPreview');
    const auctions = [
        { name: 'AGI Fund A', time: '5m', participants: 45, value: '$2.1M' },
        { name: 'Tech Futures', time: '12m', participants: 32, value: '$1.8M' },
        { name: 'Innovation Pool', time: '25m', participants: 28, value: '$950K' }
    ];

    auctionPreview.innerHTML = `
        <div class="auction-list">
            ${auctions.map(auction => `
                <div class="auction-item">
                    <div class="auction-header">
                        <span class="name">${auction.name}</span>
                        <span class="time">⏱️ ${auction.time}</span>
                    </div>
                    <div class="auction-details">
                        <span class="participants">👥 ${auction.participants}</span>
                        <span class="value">💰 ${auction.value}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function updateRiskIndicator() {
    const riskIndicator = document.getElementById('riskIndicator');
    const riskLevels = ['Low', 'Moderate', 'High'];
    const currentRisk = riskLevels[Math.floor(Math.random() * 3)];
    const riskColors = {
        'Low': '#00ff88',
        'Moderate': '#ffaa00',
        'High': '#ff4444'
    };

    riskIndicator.innerHTML = `
        <div class="risk-meter" style="color: ${riskColors[currentRisk]}">
            <div class="risk-level">
                <span class="label">Current Risk Level</span>
                <span class="value">${currentRisk}</span>
            </div>
            <div class="risk-bar" style="background: linear-gradient(90deg, 
                ${riskColors[currentRisk]} 0%, 
                rgba(255,255,255,0.1) 100%)">
            </div>
        </div>
    `;
} 