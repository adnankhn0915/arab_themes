(function () {
  const palettes = frappe.boot.arab_desk_palettes;
  if (!palettes) return;
  const current = (frappe.boot.arab_desk_theme || {}).palette || "";
  const esc = frappe.utils.escape_html;
  const DOT_KEYS = ["primary_color", "accent_color", "body_bg", "sidebar_bg", "dark_color", "soft_color"];

  const style = document.createElement("style");
  style.id = "arab-switcher-style";
  style.textContent = `
    .arab-pal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .arab-pal { border: 1px solid var(--border-color, #d1d8dd); border-radius: 10px;
      padding: 14px 10px; text-align: center; cursor: pointer; background: #fff; }
    .arab-pal:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.12); }
    .arab-pal.active { border: 2px solid #111827; }
    .arab-pal-name { font-weight: 600; margin-bottom: 10px; color: #111827; }
    .arab-dot { display: inline-block; width: 14px; height: 14px; border-radius: 50%;
      margin: 0 2px; border: 1px solid rgba(0,0,0,0.15); }
    .arab-pal-reset { margin-top: 14px; text-align: center; }
    @media (max-width: 576px) { .arab-pal-grid { grid-template-columns: repeat(2, 1fr); } }
  `;
  document.head.appendChild(style);

  function apply(name) {
    frappe.call({
      method: "arab_themes.api.set_desk_palette",
      args: { palette: name },
      freeze: true,
      callback: function () { window.location.reload(); },
    });
  }

  function open_dialog() {
    const d = new frappe.ui.Dialog({
      title: __("Choose Theme"),
      size: "large",
      fields: [{ fieldtype: "HTML", fieldname: "cards" }],
    });

    const cards = Object.entries(palettes).map(function (entry) {
      const name = entry[0], p = entry[1];
      const dots = DOT_KEYS
        .map(function (k) { return '<span class="arab-dot" style="background:' + (p[k] || "#ffffff") + '"></span>'; })
        .join("");
      return '<div class="arab-pal ' + (name === current ? "active" : "") + '" data-name="' +
        esc(name) + '"><div class="arab-pal-name">' + esc(name) +
        '</div><div>' + dots + '</div></div>';
    }).join("");

    d.fields_dict.cards.$wrapper.html(
      '<div class="arab-pal-grid">' + cards + '</div>' +
      '<div class="arab-pal-reset"><a href="#" class="arab-pal-default">' +
      __("Use site default") + '</a></div>'
    );

    d.$wrapper.on("click", ".arab-pal", function () { apply($(this).attr("data-name")); });
    d.$wrapper.on("click", ".arab-pal-default", function (e) { e.preventDefault(); apply(""); });
    d.show();
  }

  function add_menu_item() {
    const $menu = $("#toolbar-user");
    if (!$menu.length) return false;
    if ($("#arab-theme-switcher-item").length) return true;

    const $item = $('<a class="dropdown-item" id="arab-theme-switcher-item" href="#"></a>')
      .text(__("Theme Switcher"))
      .on("click", function (e) { e.preventDefault(); open_dialog(); });

    const $toggle = $menu.find("a, button")
      .filter(function () { return $(this).text().trim() === "Toggle Theme"; })
      .first();
    if ($toggle.length) { $item.insertBefore($toggle); } else { $menu.append($item); }
    return true;
  }

  let tries = 0;
  const timer = setInterval(function () {
    if (add_menu_item() || ++tries > 40) clearInterval(timer);
  }, 500);
})();
