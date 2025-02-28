class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <nav class="main-nav">
                    <div class="nav-left">
                        <a href="/" class="logo">
                            <img src="/images/logo.svg" alt="Exchequer Finance" />
                        </a>
                        <div class="nav-links">
                            <a href="/pages/explore.html" class="nav-link">Explore</a>
                            <a href="/pages/auction.html" class="nav-link">Auction</a>
                            <a href="/pages/portfolio.html" class="nav-link">Portfolio</a>
                            <a href="/pages/governance.html" class="nav-link">Governance</a>
                            <a href="/pages/docs.html" class="nav-link">Docs</a>
                        </div>
                    </div>
                    <div class="nav-right">
                        <button class="connect-wallet">Connect Wallet</button>
                    </div>
                </nav>
            </header>
        `;
    }
}

customElements.define('site-header', Header); 