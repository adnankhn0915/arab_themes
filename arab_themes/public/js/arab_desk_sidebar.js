(function () {
  const t = frappe.boot.arab_desk_theme;
  if (!t) return;

  const esc = frappe.utils.escape_html;
  const all = frappe.boot.allowed_workspaces || [];
  const top = all.filter((w) => !w.parent_page);
  const kids = (w) =>
    all.filter((c) => c.parent_page && (c.parent_page === w.name || c.parent_page === w.title));
  const slug = (n) => frappe.router.slug(n);

  const css = `
    body { padding-left: 84px !important; }
    .layout-side-section:has(.desk-sidebar) { display: none !important; }
    .row:has(.desk-sidebar) .layout-main-section-wrapper { flex: 0 0 100% !important; max-width: 100% !important; }

    .arab-rail { position: fixed; top: 10px; bottom: 10px; left: 10px; width: 62px;
      background: ${t.primary_color}; border-radius: 18px; z-index: 1030;
      display: flex; flex-direction: column; align-items: center;
      padding: 10px 0; box-shadow: 0 6px 18px rgba(0,0,0,0.18);
      transition: width 0.2s ease; overflow: hidden; }
    .arab-rail.expanded { width: 250px; align-items: stretch; padding: 10px; }

    .arab-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
      cursor: pointer; flex-shrink: 0; }
    .arab-rail-logo { width: 40px; height: 40px; border-radius: 50%; background: #fff;
      color: ${t.primary_color}; font-weight: 700; display: flex;
      align-items: center; justify-content: center; flex-shrink: 0; }
    .arab-company { color: #fff; font-weight: 600; font-size: 13px; line-height: 1.2; display: none; }
    .arab-rail.expanded .arab-company { display: block; }

    .arab-rail-list { flex: 1; width: 100%; overflow-y: auto; scrollbar-width: none; }
    .arab-rail-list::-webkit-scrollbar { display: none; }
    .arab-row { display: flex; align-items: center; justify-content: center; }
    .arab-rail.expanded .arab-row { justify-content: flex-start; }

    .arab-item { display: flex; align-items: center; justify-content: center;
      width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
      color: #fff !important; text-decoration: none; margin: 2px 0; }
    .arab-rail.expanded .arab-item { flex: 1; width: auto; justify-content: flex-start;
      gap: 12px; padding: 0 12px; }
    .arab-item:hover, .arab-item.active { background: rgba(255,255,255,0.22); }
    .arab-label { display: none; font-size: 14px; white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis; }
    .arab-rail.expanded .arab-label { display: block; }

    .arab-chev { display: none; background: transparent; border: 0; padding: 6px;
      cursor: pointer; transition: transform 0.15s ease; }
    .arab-rail.expanded .arab-chev { display: block; }
    .arab-group.open > .arab-row .arab-chev { transform: rotate(180deg); }

    .arab-children { display: none; padding-left: 22px; }
    .arab-rail.expanded .arab-group.open > .arab-children { display: block; }
    .arab-children .arab-item { height: 36px; }

    .arab-rail svg, .arab-rail svg use, .arab-rail svg path {
      stroke: #ffffff !important; --icon-stroke: #ffffff !important; }

    .arab-rail, .arab-rail * { direction: ltr !important; text-align: left !important; }
    .arab-rail.expanded .arab-row { justify-content: flex-start !important; }
    .arab-rail.expanded .arab-item { justify-content: flex-start !important; text-align: left !important; }
    .arab-rail .arab-item svg { width: 20px; height: 20px; flex: 0 0 20px; }
    .arab-rail svg *, .arab-rail svg use * { stroke: #ffffff !important; }
    .arab-rail svg circle[fill], .arab-rail svg path[fill] { fill: none; }
    .arab-rail .arab-item svg, .arab-rail .arab-item .arab-label { margin: 0 !important; }
    .arab-rail .arab-item { margin-left: 0 !important; margin-right: 0 !important; }
    .arab-rail.expanded .arab-item { justify-content: flex-start !important; }
    .arab-rail .arab-item svg { filter: brightness(0) invert(1) !important; opacity: 1 !important; }
    @media (max-width: 768px) {
      .arab-rail { display: none; }
      body { padding-left: 0 !important; }
    }
  `;
  const style = document.createElement("style");
  style.id = "arab-desk-sidebar-style";
  style.textContent = css;
  document.head.appendChild(style);

  function itemHtml(w) {
    const s = slug(w.name);
    const title = esc(w.title || w.name);
    return `<a class="arab-item" href="/app/${s}" data-slug="${s}" title="${title}">
      ${frappe.utils.icon(w.icon || "folder-normal", "md")}
      <span class="arab-label">${title}</span></a>`;
  }

  function build() {
    if (document.getElementById("arab-rail")) return;

    let abbr = "F";
    try { abbr = frappe.user.abbr(frappe.session.user) || "F"; } catch (e) {}
    let company = "";
    try {
      company = frappe.defaults.get_default("company") || frappe.boot.sysdefaults.company || "";
    } catch (e) {}

    const rail = document.createElement("div");
    rail.id = "arab-rail";
    rail.className = "arab-rail";

    let html = `<div class="arab-head" title="Expand or collapse">
      <div class="arab-rail-logo">${esc(abbr)}</div>
      <div class="arab-company">${esc(company)}</div></div>
      <div class="arab-rail-list">`;

    html += `<div class="arab-group"><div class="arab-row">
      <a class="arab-item" href="/app" data-slug="" title="Home">
      <svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg><span class="arab-label">Home</span></a></div></div>`;

    top.forEach((w) => {
      const children = kids(w);
      html += `<div class="arab-group"><div class="arab-row">${itemHtml(w)}`;
      if (children.length) {
        html += `<button class="arab-chev" type="button">${frappe.utils.icon("select", "sm")}</button>`;
      }
      html += `</div>`;
      if (children.length) {
        html += `<div class="arab-children">${children.map(itemHtml).join("")}</div>`;
      }
      html += `</div>`;
    });
    html += `</div>`;

    rail.innerHTML = html;
    document.body.appendChild(rail);

    rail.querySelector(".arab-head").addEventListener("click", (e) => {
      e.stopPropagation();
      rail.classList.toggle("expanded");
    });

    rail.addEventListener("click", (e) => {
      const chev = e.target.closest(".arab-chev");
      if (chev) {
        e.preventDefault();
        e.stopPropagation();
        chev.closest(".arab-group").classList.toggle("open");
        return;
      }
      if (e.target.closest("a.arab-item")) rail.classList.remove("expanded");
    });

    document.addEventListener("click", (e) => {
      if (!rail.contains(e.target)) rail.classList.remove("expanded");
    });

    function mark() {
      const path = window.location.pathname;
      rail.querySelectorAll("a.arab-item").forEach((a) => {
        const on = path === "/app/" + a.dataset.slug || (a.dataset.slug === "" && path === "/app");
        a.classList.toggle("active", on);
        if (on) {
          const group = a.closest(".arab-children") && a.closest(".arab-group");
          if (group) group.classList.add("open");
        }
      });
    }
    mark();
    $(document).on("page-change", mark);
  }

  $(function () { build(); });
})();
