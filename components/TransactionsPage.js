export class TransactionsPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        (async () => {
            const response1 = await fetch("/css/utils.css");
            const response2 = await fetch("/css/main.css");

            const css1 = await response1.text();
            const css2 = await response2.text();

            const styles = document.createElement("style");
            this.root.appendChild(styles);
            styles.textContent = css1 + css2;

            const template = document.createElement("template");
            const content = `
                <div class="navbar" style="margin: 0;">
                    <nav class="navbar-nav">
                        <div class="navbar-nav-left" style="inline-size: 100%;display: flex;justify-content: center;align-items: center;">
                            <span>Transactions</span>
                        </div>
                    </nav>
                </div>

                <div class="main">
                    <div class="transaction-container">
                        <div class="transaction-categories">
                            <div class="transaction-categories-header">
                                <span class="categories-header-label categories-header-left" data-target="payments-section">Sales</span>
                                <span class="categories-header-label categories-header-right" data-target="recharges-section">Purchases</span>
                                <<span class="categories-header-label categories-header-right" data-target="recharges-section">Credits</span>
                            </div>
                            <div class="transaction-categories-content">
                                <div class="transaction-section d-block" id="payments-section">
                                    <ul class="transaction-list">
                                        <li class="transaction-item">
                                            <span class="transaction-description">Sold 5 bags of rice</span><br>
                                            <span class="transaction-amount">UGX 550,000</span><br>
                                            <div class="transaction-footer">
                                                <span class="transaction-date">45min ago</span>
                                            </div>
                                        </li>
                                        <li class="transaction-item">
                                            <span class="transaction-description">Sold 10kg of groundnuts</span><br>
                                            <span class="transaction-amount">UGX 50,000</span><br>
                                            <div class="transaction-footer">
                                                <span class="transaction-date">Jul 02, 2024</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="transaction-section" id="recharges-section">
                                    <ul class="transaction-list">
                                        <li class="transaction-item">
                                            <span class="transaction-description">Bought 2kg of sugar</span><br>
                                            <span class="transaction-amount">UGX 6,000</span><br>
                                            <div class="transaction-footer">
                                                <span class="transaction-date">Jul 02, 2024</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>



                <div class="bottom-nav" id="bottom-nav">
                    <div class="wrapper flex">
                        <div class="items flex">
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/home.png" /></span>
                                <span class="title">Home</span>
                            </div>
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/more.svg" /></span>
                                <span class="title" style="color: #003087;">Transactions</span>
                            </div>
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/settings.png" /></span>
                                <span class="title">Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            template.innerHTML = content;
            this.root.appendChild(template.content.cloneNode(true));

            const mainElement = this.root.querySelector(".main");
            mainElement.classList.add("section-template");
            mainElement.classList.add("remove-animation");
            // setTimeout(() => {
            //     mainElement.classList.add("add-animation");
            // }, 100);



            // Get all bottom navs
            const bottomNavCtas = this.root.querySelectorAll(".bottom-nav .nav-cta");
            bottomNavCtas.forEach(bottomNavCta => {
                bottomNavCta.addEventListener("click", event => {
                    // Trigger navigation
                    if(event.target.classList.contains("cta-icon")){
                        UX.handleBottomNavClick(event);
                    }
                });
            });


            // Section togglers
            const categoryHeaders = this.root.querySelectorAll(".categories-header-label");
            categoryHeaders.forEach(header => {
            header.addEventListener("click", (event) => {
                const targetSectionId = event.target.dataset.target;
                const targetSection = this.root.getElementById(targetSectionId);

                categoryHeaders.forEach(header => {
                    header.style.borderBlockEnd = "2px solid #d6d6d6";
                });

                const visibleSections = this.root.querySelectorAll(".transaction-section.d-block");
                visibleSections.forEach(section => {
                    section.classList.remove("d-block");
                });

                targetSection.classList.toggle("d-block");
                event.target.style.borderBlockEnd = "2px solid #848484";
            });
            });

            

        })();
        
    }


    // Do some cleanup
    disconnectedCallback(){
    }
}

customElements.define("transactions-page", TransactionsPage);