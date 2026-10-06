// Copyright (c) 2025, Arab Themes and contributors
// License: MIT. See LICENSE
//
// Theme switcher widget injected into every website page via hooks.py.
// Lets users switch between the installed Arab Themes without leaving the page.

frappe.provide("arab_themes");

arab_themes.ThemeSwitcher = class ThemeSwitcher {
    constructor() {
        this.current = this._currentTheme();
        this.themes = [];
        this.$trigger = null;
        this.$menu = null;
        this._setup();
    }

    _currentTheme() {
        return document.documentElement.getAttribute("data-arab-theme")
            || document.documentElement.getAttribute("data-theme-mode")
            || "standard";
    }

    _setup() {
        // Inject the trigger button into the navbar if one isn't already present.
        if (document.querySelector(".arab-themes-switcher")) return;

        const navbar = document.querySelector(".navbar")
            || document.querySelector(".navbar-inner")
            || document.querySelector(".main-wrapper > .navbar");

        if (!navbar) return;

        const wrap = document.createElement("div");
        wrap.className = "arab-themes-switcher";
        wrap.innerHTML = `
            <button class="arab-themes-switcher__btn" type="button"
                aria-haspopup="true" aria-expanded="false"
                title="${frappe.__("Switch Theme")}">
                <span class="arab-themes-switcher__icon">🎨</span>
                <span class="arab-themes-switcher__label">${frappe.__("Theme")}</span>
            </button>
            <div class="arab-themes-switcher__menu" role="menu"></div>
        `;

        navbar.appendChild(wrap);

        this.$trigger = wrap.querySelector(".arab-themes-switcher__btn");
        this.$menu = wrap.querySelector(".arab-themes-switcher__menu");

        this.$trigger.addEventListener("click", () => this.toggle());
        document.addEventListener("click", (e) => {
            if (!wrap.contains(e.target)) this.close();
        });

        this._fetch();
    }

    async _fetch() {
        try {
            this.themes = await frappe.call("arab_themes.api.get_arab_themes");
            this._render();
        } catch (e) {
            console.warn("Arab Themes: could not load themes", e);
        }
    }

    _render() {
        this.$menu.innerHTML = "";
        if (!this.themes.length) {
            this.$menu.innerHTML = `<div class="arab-themes-switcher__empty">${frappe.__("No themes available")}</div>`;
            return;
        }

        this.themes.forEach((theme) => {
            const item = document.createElement("button");
            item.className = "arab-themes-switcher__item";
            if (this.current === theme.name) item.classList.add("is-active");
            item.type = "button";
            item.innerHTML = `
                <span class="arab-themes-switcher__swatch"
                      style="background:${this._swatch(theme)}"></span>
                <span class="arab-themes-switcher__name">${theme.name}</span>
            `;
            item.addEventListener("click", () => this._select(theme.name));
            this.$menu.appendChild(item);
        });
    }

    _swatch(theme) {
        // Fallback colour if the compiled theme CSS isn't loaded yet.
        const map = {
            "Arabic Classic": "#8B4513",
            "Arabic Modern": "#000080",
            "Arabic Midnight": "#D4AF37",
        };
        return map[theme.name] || "#888";
    }

    toggle() {
        const open = this.$menu.classList.toggle("is-open");
        this.$trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    close() {
        this.$menu.classList.remove("is-open");
        this.$trigger.setAttribute("aria-expanded", "false");
    }

    async _select(theme) {
        if (theme === this.current) return;
        this.close();
        try {
            await frappe.call("arab_themes.api.switch_website_theme", { theme });
            this.current = theme;
            document.documentElement.setAttribute("data-arab-theme", theme);
            frappe.show_alert(frappe.__("Theme changed to {0}", [theme]), 2);
            // Reload so the compiled theme CSS is re-injected by the server.
            setTimeout(() => location.reload(), 350);
        } catch (e) {
            frappe.show_alert(frappe.__("Could not switch theme"), 3);
        }
    }
};

// Initialise once the DOM is ready.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new arab_themes.ThemeSwitcher());
} else {
    new arab_themes.ThemeSwitcher();
}