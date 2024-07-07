export class SettingsPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});
    }

    // Do some setup
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
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                <div class="main">
                                    
                    <div class="profile-settings-container">

                        <div class="profile-settings-wrapper">
                            <h5 class="profile-settings-title">Profile Info</h5>
                            <div class="profile-settings-content">
                                <img class="profile-avatar" src="img/profile-default.png" />
                                <div class="profile-text-content">
                                    <div class="text-content-wrapper">
                                        <h5 class="label">Full Name</h5>
                                        <h6 class="label user">Charlotte Atieno</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="profile-settings-wrapper">
                            <h5 class="profile-settings-title">Contact Info</h5>
                            <div class="profile-settings-content" style="margin-block-end: 0;border-block-end: 0;border-end-end-radius: 0;border-end-start-radius: 0;">
                                <div class="icon icon-contact">
                                    <img src="img/svg/mail.svg" alt="Mail">
                                </div>
                                <div class="profile-text-content content-cta">
                                    <div class="text-content-wrapper">
                                        <h5 class="label">Email Address</h5>
                                        <h6 class="label email">charlotte@gmail.com</h6>
                                    </div>
                                    <img src="img/edit-settings.png" alt="Edit" class="profile-text-content-edit-cta">
                                </div>
                            </div>
                            <div class="profile-settings-content" style="margin-block-start: 0;border-start-end-radius: 0;border-start-start-radius: 0;">
                                <div class="icon icon-phone">
                                    <img src="img/svg/phone.svg" alt="Phone">
                                </div>
                                <div class="profile-text-content content-cta">
                                    <div class="text-content-wrapper">
                                        <h5 class="label">Mobile Number</h5>
                                        <h6 class="label phone">+255 700 345 657</h6>
                                    </div>
                                    <img src="img/edit-settings.png" alt="Edit" class="profile-text-content-edit-cta">
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
                                <span class="cta"><img class="cta-icon icon" src="img/more.png" /></span>
                                <span class="title">Transactions</span>
                            </div>
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/settings.svg" /></span>
                                <span class="title" style="color: #003087;">Settings</span>
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



            const bottomNavCtas = this.root.querySelectorAll(".bottom-nav .nav-cta");
            bottomNavCtas.forEach(bottomNavCta => {
                bottomNavCta.addEventListener("click", event => {
                    if(event.target.classList.contains("cta-icon")){
                        UX.handleBottomNavClick(event);
                    }
                });
            });          

        })();
        
    }


    disconnectedCallback(){
    }
}

customElements.define("settings-page", SettingsPage);