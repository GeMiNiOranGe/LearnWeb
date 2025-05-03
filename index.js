import { handleNavigation } from "./scripts/navigation.js";

window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);
