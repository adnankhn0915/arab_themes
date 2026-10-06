import frappe
from frappe.model.document import Document


class DeskThemeSettings(Document):
    def on_update(self):
        frappe.clear_cache()