const Router = {
    init: () => {
        document.querySelectorAll("a.nav-link").forEach(a => a.addEventListener("click", event => {
            event.preventDefault();
            const url = event.target.getAttribute("href");
            Router.go(url);
        }));

        window.addEventListener("popstate", event => {
            const route = event.state ? event.state.route : location.pathname;
            Router.go(route, false);
            app.ui.init();
        });

        Router.go(location.pathname);

    },

    go: (route, addToHistory = true) => {
        const requiresAuth = ['/account/settings'].includes(route);

        if (requiresAuth && !Router.isAuthenticated()) {
            Router.go('/auth/signin');
            return;
        }

        if (addToHistory) {
            if (route !== location.pathname) history.pushState({ route }, "", route);
        }

        let pageElement = null;
        switch (route) {

            case "/":
                pageElement = document.createElement('div');
                const IndexPageComponent = document.createElement('home-page');
                pageElement.appendChild(IndexPageComponent);
                break;

            case "/transactions":
                pageElement = document.createElement('div');
                const TransactionsPageComponent = document.createElement('transactions-page');
                pageElement.appendChild(TransactionsPageComponent);
                break;

            case "/settings":
                pageElement = document.createElement('div');
                const SettingsPageComponent = document.createElement('settings-page');
                pageElement.appendChild(SettingsPageComponent);
                break;

            default:
                if (route.startsWith("/services/")) {
                    const paramId = route.substring(route.lastIndexOf("/") + 1);
                    pageElement = document.createElement('div');
                    pageElement.dataset.id = paramId;
                }

        }

        const root = document.querySelector("#root");
        root.innerHTML = "";
        root.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        return true;
    },

    goBack: () => {
        window.history.back();
    }
}