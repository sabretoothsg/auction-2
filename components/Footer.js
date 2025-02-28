class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Exchequer Finance</h3>
                        <p>Decentralized Fixed Income Protocol</p>
                        <div class="social-links">
                            <a href="https://twitter.com/exchequerfi" target="_blank">Twitter</a>
                            <a href="https://discord.gg/exchequer" target="_blank">Discord</a>
                            <a href="https://github.com/exchequer-fi" target="_blank">GitHub</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Resources</h4>
                        <a href="/docs.html">Documentation</a>
                        <a href="/faq.html">FAQ</a>
                        <a href="/security.html">Security</a>
                    </div>
                    <div class="footer-section">
                        <h4>Protocol</h4>
                        <a href="/auction.html">Auction</a>
                        <a href="/portfolio.html">Portfolio</a>
                        <a href="/explore.html">Explore</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Exchequer Finance. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', Footer); 