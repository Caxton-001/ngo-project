import { HomePage } from "../components/HomePage.js";
import { TransactionsPage } from "../components/TransactionsPage.js";
import { SettingsPage } from "../components/SettingsPage.js";

window.app = {};

app.router = Router;
app.ui = UX;

window.addEventListener("DOMContentLoaded", async () => {
    app.router.init();
    app.ui.init();
});

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});