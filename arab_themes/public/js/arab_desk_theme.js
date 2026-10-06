(function () {
  const t = frappe.boot.arab_desk_theme;
  if (!t) return;

  const primary = t.primary_color;
  const accent = t.accent_color || primary;
  const dark = t.dark_color || primary;
  const soft = t.soft_color || "#EEF1F5";
  const r = Number(t.border_radius) || 8;

  const css = `
    :root { --primary: ${primary}; --icon-stroke: ${t.navbar_text}; }

    body { background-color: ${t.body_bg} !important;
           font-family: ${t.font_family} !important; }

    /* 1. Primary: floating navbar */
    .sticky-top { background: transparent !important; padding: 10px 18px 0 !important; }
    .navbar { background-color: ${t.navbar_bg} !important;
              border-radius: 18px !important; border: none !important;
              box-shadow: 0 6px 18px rgba(0,0,0,0.15) !important; }
    .navbar .nav-link, .navbar .navbar-brand, .navbar .dropdown-toggle {
      color: ${t.navbar_text} !important; }
    #navbar-breadcrumbs, #navbar-breadcrumbs *, .navbar-breadcrumbs, .navbar-breadcrumbs *,
    .navbar .breadcrumb-container, .navbar .breadcrumb-container * {
      color: ${t.navbar_text} !important; opacity: 1 !important; }
    .navbar .dropdown-notifications svg, .navbar .dropdown-notifications svg use,
    .navbar .dropdown-notifications svg path {
      stroke: ${t.navbar_text} !important; --icon-stroke: ${t.navbar_text} !important; }

    /* Search dropdown stays readable */
    .navbar .awesomplete ul li, .navbar .awesomplete ul li a,
    .navbar .awesomplete ul li div, .navbar .awesomplete ul li span { color: #333333 !important; }
    .navbar .awesomplete mark { background: transparent !important;
      color: ${accent} !important; font-weight: 600; }

    /* 4. Surface: sidebar and panels */
    .layout-side-section, .desk-sidebar {
      background-color: ${t.sidebar_bg} !important;
      border-radius: ${r + 6}px !important; padding: 14px !important; }

    /* 1 and 5. Buttons: primary, darker on hover */
    .btn-primary { background-color: ${primary} !important;
                   border-color: ${primary} !important; color: #fff !important;
                   border-radius: 999px !important; }
    .btn-primary:hover, .btn-primary:focus { background-color: ${dark} !important;
                   border-color: ${dark} !important; }
    .btn-default, .btn-secondary { border-radius: 999px !important; }

    /* 6. Soft: card borders */
    .frappe-card, .widget, .form-layout .form-page, .layout-main-section,
    .page-form, .form-dashboard-section {
      border-radius: ${r + 6}px !important;
      border: 1px solid ${soft} !important;
      box-shadow: 0 2px 10px rgba(20, 40, 90, 0.06) !important; }

    /* 2. Accent: input focus */
    .form-control { border-radius: ${r}px !important; }
    .form-control:focus { border-color: ${accent} !important;
      box-shadow: 0 0 0 3px ${accent}33 !important; }

    /* 5. Dark: list header */
    .list-row-head { background-color: ${dark} !important;
                     border-radius: ${r + 2}px !important; }
    .list-row-head, .list-row-head .list-row-col, .list-row-head .level-item,
    .list-row-head span, .list-row-head a { color: #ffffff !important; }

    /* 6. Soft: row and dropdown hover */
    .list-row:hover, .list-row-container:hover { background-color: ${soft} !important; }
    .dropdown-item:hover, .dropdown-menu .dropdown-item:focus {
      background-color: ${soft} !important; }

    /* 5. Dark: page titles */
    .page-title .title-text, .page-head h3, .page-head .title-text { color: ${dark} !important; }

    /* 2. Accent: filter boxes, tabs, links */
    .standard-filter-section .form-control, .filter-section .form-control {
      border: 1px dashed ${accent} !important; background: #ffffff !important; }
    .form-tabs .nav-link.active { color: ${accent} !important;
      border-bottom-color: ${accent} !important; }
    a { color: ${accent}; }
  `;

  const style = document.createElement("style");
  style.id = "arab-desk-theme";
  style.textContent = css;
  document.head.appendChild(style);
})();
