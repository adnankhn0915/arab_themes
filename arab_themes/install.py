# Copyright (c) 2025, Arab Themes and contributors
# License: MIT. See LICENSE

import frappe
from frappe import _

# --- Colors ---
COLORS = {
    "Saddle Brown": "#8B4513",
    "Off White": "#FAF9F6",
    "Wheat": "#F5DEB3",
    "Dark Goldenrod": "#B8860B",
    "Papaya Whip": "#FFEFD5",
    "Navy": "#000080",
    "White": "#FFFFFF",
    "Alice Blue": "#F0F8FF",
    "Midnight Blue": "#191970",
    "Gold": "#FFD700",
    "Light Gray": "#D3D3D3",
    "Dim Gray": "#696969",
    "Black": "#000000",
}

# --- Themes ---
THEMES = [
    {
        "name": "Arabic Classic",
        "module": "Arab Themes",
        "primary_color": "Saddle Brown",
        "text_color": "Off White",
        "light_color": "Wheat",
        "dark_color": "Dark Goldenrod",
        "background_color": "Papaya Whip",
        "google_font": "Amiri",
        "font_properties": "wght@400;700",
        "button_rounded_corners": 1,
        "button_shadows": 0,
        "button_gradients": 0,
        "custom_scss": """
// Arabic Classic — warm sand, traditional feel
:root {
    --primary: #8B4513;
    --primary-color: #8B4513;
    --text-color: #F5F5DC;
    --bg-color: #FFEFD5;
}
body {
    font-family: "Amiri", serif;
    direction: rtl;
    text-align: right;
}
""",
    },
    {
        "name": "Arabic Modern",
        "module": "Arab Themes",
        "primary_color": "Navy",
        "text_color": "White",
        "light_color": "Alice Blue",
        "dark_color": "Midnight Blue",
        "background_color": "Alice Blue",
        "google_font": "Tajawal",
        "font_properties": "wght@300;400;500;700",
        "button_rounded_corners": 1,
        "button_shadows": 1,
        "button_gradients": 1,
        "custom_scss": """
// Arabic Modern — deep navy, contemporary
:root {
    --primary: #000080;
    --primary-color: #000080;
    --text-color: #FFFFFF;
    --bg-color: #F0F8FF;
}
body {
    font-family: "Tajawal", sans-serif;
    direction: rtl;
    text-align: right;
}
""",
    },
    {
        "name": "Arabic Midnight",
        "module": "Arab Themes",
        "primary_color": "Gold",
        "text_color": "Light Gray",
        "light_color": "Dim Gray",
        "dark_color": "Black",
        "background_color": "Black",
        "google_font": "Cairo",
        "font_properties": "wght@300;400;500;600;700",
        "button_rounded_corners": 1,
        "button_shadows": 1,
        "button_gradients": 1,
        "custom_scss": """
// Arabic Midnight — dark, low-glare theme
:root {
    --primary: #D4AF37;
    --primary-color: #D4AF37;
    --text-color: #D3D3D3;
    --bg-color: #000000;
}
body {
    font-family: "Cairo", sans-serif;
    direction: rtl;
    text-align: right;
    background-color: #000000;
    color: #D3D3D3;
}
""",
    },
]


def _ensure_colors():
    """Create the Color records the themes link to."""
    for name, hex_code in COLORS.items():
        if not frappe.db.exists("Color", name):
            frappe.get_doc({
                "doctype": "Color",
                "__newname": name,
                "color": hex_code
            }).insert(ignore_permissions=True)


def _create_theme(values):
    """Create a Website Theme document from the given values."""
    if frappe.db.exists("Website Theme", values["name"]):
        return frappe.get_doc("Website Theme", values["name"])

    doc = frappe.new_doc("Website Theme")
    doc.update(values)
    doc.custom = 1
    doc.insert(ignore_permissions=True)
    return doc


def after_install():
    """Hook called by Frappe after the app is installed."""
    _ensure_colors()
    for values in THEMES:
        _create_theme(values)
    frappe.db.commit()
    frappe.msgprint(_("Arab Themes installed successfully."))


def before_uninstall():
    """Hook called by Frappe before the app is uninstalled.

    If any of the themes is currently set as the active Website Theme,
    we first clear the Website Settings reference so the delete succeeds.
    """
    website_settings = frappe.get_single("Website Settings")
    current_theme = website_settings.get("website_theme")

    # If the active theme belongs to this app, clear it first.
    if current_theme and frappe.db.get_value("Website Theme", current_theme, "module") == "Arab Themes":
        website_settings.website_theme = ""
        website_settings.ignore_validate = True
        website_settings.save(ignore_permissions=True)

    for values in THEMES:
        if frappe.db.exists("Website Theme", values["name"]):
            frappe.delete_doc("Website Theme", values["name"], ignore_permissions=True)

    frappe.db.commit()
    frappe.msgprint(_("Arab Themes removed."))