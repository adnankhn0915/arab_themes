# -----------------------------------------------
# App hooks for "arab_themes"
# -----------------------------------------------

# The app name appears in the Frappe Apps page.  The hooks below tell Frappe
# what callable should run on install / uninstall.
#
# Frappe expects **string dotted paths** rather than function objects.
# The functions are defined in this package's install.py.

app_name = "arab_themes"
app_title = "Arab Themes"
app_publisher = "Arab Themes"
app_description = "Arabic‑styled website themes with a switcher widget"
app_email = "themes@example.com"
app_license = "mit"
app_version = "1.0.0"

# After the app is installed, seed the pre‑built themes.
# (See arab_themes/install.py for the implementation.)
after_install = "arab_themes.install.after_install"
# Before the app is uninstalled, remove its themes.
before_uninstall = "arab_themes.install.before_uninstall"

# Include the switcher JS & CSS on every website page
web_include_js = "/assets/arab_themes/js/arab_themes_switcher.js"
web_include_css = "/assets/arab_themes/css/arab_themes_switcher.css"

# SCSS that will be injected into every generated theme CSS file.
# This is the hook used by the Website Theme module.
website_theme_scss = "arab_themes/public/scss/website"

# Include custom JS for desk theme handling
# Note: This JS loads in the desk UI and applies individual user style overrides.
user_include_js = "arab_themes/public/js/arab_desk_theme.js"

# The following three imports are only needed if you are going to use them
# inside other hooks in this file.  They are kept here for clarity.
# (They can be removed to avoid unused‑import lint warnings.)
# import frappe
# from arab_themes import install

# End of file


app_include_js = ["/assets/arab_themes/js/arab_desk_theme.js?v=8", "/assets/arab_themes/js/arab_desk_sidebar.js?v=8", "/assets/arab_themes/js/arab_desk_switcher.js?v=8"]
boot_session = "arab_themes.boot.boot_session"
