function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    return localStorage.getItem("theme") || "default";
}

function saveCountry(country) {
    localStorage.setItem("country", country);
}

function loadCountry() {
    return localStorage.getItem("country") || "india";
}
