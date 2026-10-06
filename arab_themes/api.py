# Copyright (c) 2025, Arab Themes and contributors
# License: MIT. See LICENSE

import frappe

@frappe.whitelist()
def get_user_desk_theme():
    """Get the desk theme for the current user."""
    user = frappe.session.user
    desk_theme = frappe.db.get_value("User", user, "desk_theme")
    if desk_theme:
        return frappe.get_doc("Arab Desk Theme", desk_theme)
    return None

@frappe.whitelist()
def set_user_desk_theme(theme_name):
    """Set the desk theme for the current user."""
    user = frappe.session.user
    frappe.db.set_value("User", user, "desk_theme", theme_name)
    frappe.clear_cache(user=user)
    return theme_name

@frappe.whitelist()
def switch_website_theme(theme):
    """Set the active website theme for the current session.

    Updates Website Settings so the change persists across sessions.
    """
    if not frappe.db.exists("Website Theme", theme):
        frappe.throw(frappe._("Theme not found: {0}").format(theme))

    website_settings = frappe.get_doc("Website Settings", "Website Settings")
    website_settings.website_theme = theme
    website_settings.ignore_validate = True
    website_settings.save()

    # Clear the cached theme so the next request picks up the change.
    frappe.cache().delete_value("website_theme")
    frappe.clear_cache()

    return theme


@frappe.whitelist()
def get_arab_themes():
    """Return the list of Arab Themes available for switching."""
    return frappe.get_all(
        "Website Theme",
        filters={"module": "Arab Themes"},
        fields=["name", "theme_url", "theme"],
        order_by="modified desc",
    )

@frappe.whitelist()
def set_desk_palette(palette=None):
    """Save the Desk palette chosen by the current user. Empty means site default."""
    from arab_themes.palettes import PALETTES

    if palette and palette not in PALETTES:
        frappe.throw(frappe._("Unknown palette: {0}").format(palette))

    frappe.defaults.set_user_default("arab_desk_palette", palette or "")
    frappe.clear_cache(user=frappe.session.user)
    return palette
