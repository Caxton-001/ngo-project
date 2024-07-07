export class HomePage extends HTMLElement {
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
                        <div class="navbar-nav-left">
                            <img src="img/menu-toggler.svg" alt="" class="navbar-toggler" id="navbar-toggler">
                            <span>Home</span>
                        </div>
                        <div class="navbar-nav-right">
                            <img src="img/bell-ring.svg" alt="" class="navbar-notification" id="navbar-notification">
                        </div>
                    </nav>
                </div>
                            
                <div class="sidebar" id="sidebar">
                    <div class="sidebar-profile">
                        <div class="image">
                            <div class="border-fill"></div>
                            <img src="img/profile-default.png" alt="Profile picture" class="avatar" />
                        </div>
                        <h3 class="name" id="full-name">Charlotte Atieno</h3>
                        <h6 class="user-email" id="email-primary">Username: charlotte</h6>
                    </div>
                    <div class="sidebar-menus">
                        <ul class="sidebar-menu">
                            <li class="menu-item">
                                <a href="/settings">
                                    <span class="flex">
                                        <span class="flex"><img src="img/settings.png" alt="" class="icon"><span class="">Settings</span></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <ul class="sidebar-menu">
                            <li class="menu-item signout">
                                <a href="/">
                                    <span class="flex">
                                        <span class="flex"><img src="img/logout.png" alt="" class="icon"><span class="">Signout</span></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> 

                            
                <div class="main" style="border:none;">

                    <div class="intro-container">

                        <div class="intro-content">
                            <div class="intro-content-wrapper">
                                <p>Welcome to Rec Book App</p>
                                <h2>Hi, Charlotte!</h2>
                            </div>
                        </div>

                    </div>

                    <div class="content-banner" style="padding-block-end: 6.8rem;">
                        <div class="banner-content">
                            <h3>How Our App Works</h3>
                            <p>Discover the simplicity and convenience of using our app.</p>
                            <div class="banner-content-ctas">
                                <button class="btn submit-btn contact-us-btn">Contact us</button>
                                <button class="btn submit-btn watch-video-btn">Watch video</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom-nav" id="bottom-nav">
                    <div class="wrapper flex">
                        <div class="items flex">
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/home.svg" /></span>
                                <span class="title" style="color: #003087;">Home</span>
                            </div>
                            <div class="item flex nav-cta">
                                <span class="cta"><img class="cta-icon icon" src="img/more.png" /></span>
                                <span class="title">Transactions</span>
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


            const navbarToggler = this.root.querySelector('#navbar-toggler');
            const sideNav = this.root.querySelector('#sidebar');
            const overlay = document.createElement('div');

            overlay.classList.add('overlay');

            const toggleSideNav = () => {
                sideNav.classList.toggle('active');
                sideNav.style.transform = '';
                sideNav.style.webkitTransform = '';
                sideNav.style.mozTransform = '';
                if (sideNav.classList.contains('active')) {
                    document.body.appendChild(overlay);
                } else {
                    overlay.remove();
                }
            };

            if (navbarToggler) {
                navbarToggler.addEventListener('click', (event) => {
                    event.stopPropagation();
                    toggleSideNav();
                });
            }

            overlay.addEventListener('click', () => {
                toggleSideNav();
            });

            sideNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    sideNav.classList.remove('active');
                    overlay.remove();
                });
            });


            const handleSidebarCtas = () => {
                const sidebarItems = Array.from(this.root.querySelectorAll(".sidebar-menu .menu-item"));
                sidebarItems.forEach((sidebarItem) => {
                    const target = sidebarItem.querySelector("a");
                    const path = new URL(target.href).pathname;

                    target.addEventListener("click", (event) => {
                        event.preventDefault();
                        Router.go(path);
                    });
                });
            }

            handleSidebarCtas();


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

customElements.define("home-page", HomePage);