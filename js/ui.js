const UX = {
  URLROOT: window.location.origin,

  init: () => {

    const bottomNavCtas = document.querySelectorAll(".bottom-nav .nav-cta");
    bottomNavCtas.forEach(bottomNavCta => {
      bottomNavCta.addEventListener("click", event => {
        if(event.target.classList.contains("cta-icon")){
          UX.handleBottomNavClick(event);
        }
      });
    });
  },

  handleBottomNavClick: (event) => {
    const targetPage = event.target.parentElement.nextElementSibling.innerText;
    switch (targetPage) {
      case "Home":
        Router.go("/");
        app.ui.init();
        break;

      case "Transactions":
        Router.go("/transactions");
        app.ui.init();
        break;

      case "Settings":
        Router.go("/settings");
        app.ui.init();
        break;

      default:
        // TODO: Other URLs
    }
  },

}