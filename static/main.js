/* Security Solutions Dubai — static preview interactions (vanilla JS) */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---- mobile drawer ------------------------------------------------------ */
  var drawer = $("#mobile-drawer");
  var toggle = $("#nav-toggle");

  function openDrawer() {
    if (!drawer) return;
    drawer.removeAttribute("hidden");
    drawer.removeAttribute("inert");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("drawer-open");
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("hidden", "");
    drawer.setAttribute("inert", "");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("drawer-open");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (drawer.hasAttribute("hidden")) openDrawer(); else closeDrawer();
    });
  }
  $$("[data-drawer-close]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });
  $$("#mobile-drawer a").forEach(function (a) {
    a.addEventListener("click", function () { closeDrawer(); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); closeMenus(); }
  });

  /* ---- desktop mega / dropdown menus -------------------------------------- */
  function closeMenus() {
    $$("#site-header .nav-item.is-open").forEach(function (li) {
      li.classList.remove("is-open");
      var t = $(".nav-trigger", li);
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }
  $$("#site-header .nav-item").forEach(function (li) {
    var trigger = $(".nav-trigger", li);
    if (!trigger) return;
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = li.classList.contains("is-open");
      closeMenus();
      if (!open) {
        li.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
    li.addEventListener("mouseenter", function () {
      if (window.matchMedia("(hover: hover)").matches) {
        li.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
    li.addEventListener("mouseleave", function () {
      if (window.matchMedia("(hover: hover)").matches) {
        li.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#site-header .nav-item")) closeMenus();
  });
  $$("#site-header .mega-panel a, #site-header .dropdown-panel a").forEach(function (a) {
    a.addEventListener("click", function () { closeMenus(); });
  });

  /* ---- sticky header ----------------------------------------------------- */
  var header = $("#site-header");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- FAQ accordion ------------------------------------------------------ */
  $$(".faq-item").forEach(function (item) {
    var q = $(".faq-q", item);
    var panel = $(".faq-panel", item);
    if (!q || !panel) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      $$(".faq-item").forEach(function (other) {
        other.classList.remove("is-open");
        var oq = $(".faq-q", other);
        var op = $(".faq-panel", other);
        if (oq) oq.setAttribute("aria-expanded", "false");
        if (op) op.setAttribute("hidden", "");
      });
      if (!open) {
        item.classList.add("is-open");
        q.setAttribute("aria-expanded", "true");
        panel.removeAttribute("hidden");
      }
    });
  });

  /* ---- proof carousel ---------------------------------------------------- */
  var carousel = $("[data-carousel]");
  if (carousel) {
    var slides = $$("[data-slide]", carousel);
    var dots = $$(".testi-dot", carousel);
    var counter = $("[data-carousel-counter]", carousel);
    var active = 0;
    var show = function (i) {
      active = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.hidden = idx !== active; });
      dots.forEach(function (d, idx) {
        d.classList.toggle("is-active", idx === active);
        d.setAttribute("aria-current", idx === active ? "true" : "false");
      });
      if (counter) counter.textContent = String(active + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    };
    var prev = $("[data-carousel-prev]", carousel);
    var next = $("[data-carousel-next]", carousel);
    if (prev) prev.addEventListener("click", function () { show(active - 1); });
    if (next) next.addEventListener("click", function () { show(active + 1); });
    dots.forEach(function (d) {
      d.addEventListener("click", function () { show(parseInt(d.getAttribute("data-slide-to") || "0", 10)); });
    });
  }

  /* ---- quote / contact forms: validate + prepare email handoff ------------ */
  function buildMailto(form, note) {
    var val = function (n) { var el = form.elements[n]; return el && el.value ? String(el.value).trim() : ""; };
    var name = val("name");
    var email = val("email");
    var phone = val("phone");
    var intent = form.getAttribute("data-intent") || val("service") || "General enquiry";
    var subject = "New enquiry: " + intent + " — " + (name || "New client");
    var lines = [
      "Name: " + (name || "—"),
      "Email: " + (email || "—"),
      "Phone: " + (phone || "—"),
      "Location: " + (val("location") || "—"),
      "Service interest: " + (val("service") || "—"),
      "Message: " + (val("message") || "—"),
    ];
    if (note) lines.push(""); lines.push(note);
    return { to: form.getAttribute("data-mailto") || "info@hutaibinfotech.com", subject: subject, body: lines.join("\n") };
  }
  function validateQuote(form) {
    var errors = [];
    var name = form.elements["name"];
    var email = form.elements["email"];
    var phone = form.elements["phone"];
    var consent = form.elements["consent"];
    if (!name.value.trim()) errors.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.push("email");
    if (phone.value.replace(/[^\d+]/g, "").length < 7) errors.push("phone");
    if (!consent.checked) errors.push("consent");
    return errors;
  }
  $$("[data-quote-form]").forEach(function (form) {
    var status = $("[data-quote-status]", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = validateQuote(form);
      if (errors.length) {
        ["name", "email", "phone"].forEach(function (n) {
          var el = form.elements[n];
          if (el) el.classList.toggle("field-error", errors.indexOf(n) >= 0);
        });
        if (errors.indexOf("consent") >= 0 && status) {
          status.textContent = "Please tick the consent box to continue.";
          status.className = "quote-status quote-status-error";
        } else if (status) {
          status.textContent = "Please complete name, a valid email and phone.";
          status.className = "quote-status quote-status-error";
        }
        return;
      }
      var mail = buildMailto(form, "This enquiry was prepared by the static approval preview form. Delivery is connected during the production build.");
      window.location.href = "mailto:" + mail.to + "?subject=" + encodeURIComponent(mail.subject) + "&body=" + encodeURIComponent(mail.body);
      if (status) {
        status.textContent = "Your email app should now open with the enquiry prepared for the Dubai team. If nothing opened, email info@hutaibinfotech.com directly.";
        status.className = "quote-status quote-status-ok";
      }
    });
  });

  /* ---- newsletter form ---------------------------------------------------- */
  $$("[data-news-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.elements["email"];
      if (!input || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        var note = $("[data-news-note]", form);
        if (note) note.textContent = "Please enter a valid work email.";
        return;
      }
      var mail = buildMailto(form, "Newsletter subscription request — work email: " + input.value.trim());
      window.location.href = "mailto:" + mail.to + "?subject=" + encodeURIComponent(mail.subject) + "&body=" + encodeURIComponent(mail.body);
      var note2 = $("[data-news-note]", form);
      if (note2) note2.textContent = "Opening a prepared email to the team — thanks for your interest.";
    });
  });

  /* ---- intent chips ------------------------------------------------------- */
  $$(".quote-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      $$(".quote-chip").forEach(function (c) { c.classList.remove("is-selected"); });
      chip.classList.add("is-selected");
      var form = chip.closest("form");
      if (form) form.setAttribute("data-intent", chip.getAttribute("data-intent"));
    });
  });

  /* ---- mobile drawer submenus -------------------------------------------- */
  $$(".drawer-item.has-kids > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var item = a.closest(".drawer-item");
      var sub = $(".drawer-sub", item);
      if (sub) {
        e.preventDefault();
        sub.hidden = !sub.hidden;
        var caret = $(".drawer-caret", a);
        if (caret) caret.style.transform = sub.hidden ? "rotate(0deg)" : "rotate(180deg)";
      }
    });
  });

  /* ---- preview badge ------------------------------------------------------ */
  var badge = $("#preview-badge");
  if (badge && window.__PREVIEW_BADGE__) {
    try {
      if (!localStorage.getItem("hutaib-preview-badge-dismissed")) {
        badge.removeAttribute("hidden");
        var closeBtn = $("#preview-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", function () {
            badge.setAttribute("hidden", "");
            localStorage.setItem("hutaib-preview-badge-dismissed", "1");
          });
        }
      }
    } catch (err) { badge.removeAttribute("hidden"); }
  }

  /* ---- quote intent from hash / query ----------------------------------- */
  var intent = null;
  try {
    var h = location.hash.replace("#", "");
    if (h && h !== "quote") intent = decodeURIComponent(h);
    var q = new URLSearchParams(location.search).get("service");
    if (q) intent = decodeURIComponent(q);
  } catch (err) { intent = null; }
  if (intent) {
    var form = $("[data-quote-form]");
    if (form) {
      form.setAttribute("data-intent", intent);
      var sel = form.elements["service"];
      if (sel) {
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value.toLowerCase() === intent.toLowerCase()) { sel.selectedIndex = i; break; }
        }
      }
    }
  }
  var quoteAnchor = location.hash === "#quote" ? $("[data-quote-form]") : null;
  if (quoteAnchor) {
    setTimeout(function () { var f = $("input,select,textarea", quoteAnchor); if (f) f.focus({ preventScroll: false }); }, 60);
  }
})();
