import frappe

from arab_themes.palettes import PALETTES

FIELDS = [
    "primary_color", "navbar_bg", "navbar_text", "sidebar_bg",
    "body_bg", "font_family", "border_radius",
]


def boot_session(bootinfo):
    if frappe.session.user == "Guest":
        return
    if not frappe.db.exists("DocType", "Desk Theme Settings"):
        return
    settings = frappe.get_cached_doc("Desk Theme Settings")
    if not settings.enabled:
        return

    theme = {f: settings.get(f) for f in FIELDS}
    chosen = frappe.defaults.get_user_default("arab_desk_palette")
    if chosen in PALETTES:
        theme.update(PALETTES[chosen])
        theme["palette"] = chosen

    bootinfo.arab_desk_theme = theme
    bootinfo.arab_desk_palettes = PALETTES
