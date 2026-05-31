/* Честный электрик — интерактив: галерея, лайтбокс, модалка заявки, форма */
(function () {
  "use strict";

  // ---- Фото работ — список из site-config (window.__PHOTOS, прокинут
  // шаблоном до app.js); фолбэк — собранные ассеты. ----
  var PHOTOS = (window.__PHOTOS && window.__PHOTOS.length) ? window.__PHOTOS : [
    "photos/work-1.webp",
    "photos/work-2.webp",
    "photos/work-3.webp",
    "photos/work-4.webp",
    "photos/work-5.webp",
    "photos/work-6.webp",
    "photos/work-7.webp",
    "photos/work-8.webp",
    "photos/work-9.webp"
  ];
  var PHONE = window.__PHONE || "+7 911 000-00-00";

  // ---- Render gallery ----
  var gallery = document.getElementById("gallery");
  if (gallery) {
    PHOTOS.forEach(function (src, i) {
      var fig = document.createElement("figure");
      fig.dataset.idx = i;
      var img = document.createElement("img");
      img.src = src;
      img.alt = "Фото выполненной работы " + (i + 1);
      img.loading = "lazy";
      img.onerror = function () {
        fig.innerHTML = '<div class="ph">фото<br>работы ' + (i + 1) + "</div>";
        fig.style.cursor = "default";
        fig.removeAttribute("data-idx");
      };
      fig.appendChild(img);
      gallery.appendChild(fig);
    });
  }

  // ---- Lightbox ----
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbIdx = 0;
  function livePhotos() {
    return Array.prototype.slice
      .call(document.querySelectorAll("#gallery figure[data-idx] img"))
      .map(function (im) { return im.src; });
  }
  function openLb(idx) {
    var arr = livePhotos();
    if (!arr.length) return;
    lbIdx = idx % arr.length;
    lbImg.src = arr[lbIdx];
    lb.classList.add("open");
  }
  function moveLb(d) {
    var arr = livePhotos();
    if (!arr.length) return;
    lbIdx = (lbIdx + d + arr.length) % arr.length;
    lbImg.src = arr[lbIdx];
  }
  if (gallery) {
    gallery.addEventListener("click", function (e) {
      var fig = e.target.closest("figure[data-idx]");
      if (!fig) return;
      // map DOM index among live figures
      var live = Array.prototype.slice.call(document.querySelectorAll("#gallery figure[data-idx]"));
      openLb(live.indexOf(fig));
    });
  }
  document.getElementById("lbClose").addEventListener("click", function () { lb.classList.remove("open"); });
  document.getElementById("lbPrev").addEventListener("click", function () { moveLb(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { moveLb(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.classList.remove("open"); });

  // ---- Modal (форма заявки) ----
  var modal = document.getElementById("modal");
  var lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var n = document.getElementById("f-name");
    if (n) setTimeout(function () { n.focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-open-form]")) { e.preventDefault(); closeMobileNav(); openModal(); }
    if (e.target.closest("[data-close-form]")) { closeModal(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lb.classList.contains("open")) lb.classList.remove("open");
      else if (modal.classList.contains("open")) closeModal();
    }
    if (lb.classList.contains("open")) {
      if (e.key === "ArrowLeft") moveLb(-1);
      if (e.key === "ArrowRight") moveLb(1);
    }
  });

  // ---- File upload + previews ----
  var fileInput = document.getElementById("f-photos");
  var dropzone = document.getElementById("dropzone");
  var previews = document.getElementById("dzPreviews");
  var files = [];

  function renderPreviews() {
    previews.innerHTML = "";
    files.forEach(function (file, i) {
      var url = URL.createObjectURL(file);
      var t = document.createElement("div");
      t.className = "dz-thumb";
      t.innerHTML = '<img src="' + url + '" alt=""><button type="button" aria-label="Удалить">✕</button>';
      t.querySelector("button").addEventListener("click", function (ev) {
        ev.preventDefault();
        files.splice(i, 1);
        renderPreviews();
      });
      previews.appendChild(t);
    });
  }
  function addFiles(list) {
    Array.prototype.forEach.call(list, function (f) {
      if (f.type.indexOf("image") === 0 && files.length < 5) files.push(f);
    });
    renderPreviews();
  }
  if (fileInput) {
    fileInput.addEventListener("change", function () { addFiles(this.files); });
    ["dragover", "dragenter"].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) { e.preventDefault(); dropzone.classList.add("drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) { e.preventDefault(); dropzone.classList.remove("drag"); });
    });
    dropzone.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });
  }

  // ---- Form submit ----
  var form = document.getElementById("orderForm");
  if (form) {
    var nameEl = document.getElementById("f-name");
    var phoneEl = document.getElementById("f-phone");
    var consentEl = document.getElementById("f-consent");
    var submitBtn = document.getElementById("submitBtn");

    function fieldOf(input) { return input.closest(".field"); }
    function setError(input, on) {
      var f = fieldOf(input);
      if (!f) return;
      f.classList.toggle("error", on);
      f.classList.toggle("valid", !on && !!input.value.trim());
    }
    function validName() { return nameEl.value.trim().length >= 2; }
    function validPhone() {
      var digits = phoneEl.value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }

    // Сброс ошибки сразу при вводе
    nameEl.addEventListener("input", function () { if (fieldOf(nameEl).classList.contains("error") && validName()) setError(nameEl, false); });
    phoneEl.addEventListener("input", function () { if (fieldOf(phoneEl).classList.contains("error") && validPhone()) setError(phoneEl, false); });
    consentEl.addEventListener("change", function () { if (consentEl.checked) consentEl.closest(".consent").classList.remove("error"); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      if (!validName()) { setError(nameEl, true); ok = false; } else setError(nameEl, false);
      if (!validPhone()) { setError(phoneEl, true); ok = false; } else setError(phoneEl, false);
      var consentWrap = consentEl.closest(".consent");
      if (!consentEl.checked) { consentWrap.classList.add("error"); ok = false; } else consentWrap.classList.remove("error");

      clearNetError();
      if (!ok) {
        var firstErr = form.querySelector(".field.error input, .field.error select");
        if (firstErr) firstErr.focus();
        return;
      }

      var nm = nameEl.value.trim();
      setSending(true);
      submitLead().then(function (r) {
        if (r.ok) { showSuccess(nm); return; }
        setSending(false);
        if (r.fields && r.fields.length) {
          r.fields.forEach(function (name) {
            var el = form.querySelector('[name="' + name + '"]');
            if (el) setError(el, true);
          });
          var fe = form.querySelector(".field.error input, .field.error select");
          if (fe) fe.focus();
        }
        showNetError(r.msg || "Не удалось отправить заявку. Попробуйте ещё раз или позвоните: " + PHONE);
      });
    });

    // ---- submit helpers (состояния 3–5) ----
    function setSending(on) {
      if (on) {
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.innerHTML =
          '<svg class="btn-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.6" stroke-dasharray="42 18" stroke-linecap="round"/></svg>' +
          '<span class="btn-label">Отправляем…</span>';
      } else {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none"><path d="M13.5 2 4 13.5h6L9 22l9.5-12H12l1.5-8Z" fill="currentColor"/></svg>' +
          '<span class="btn-label">Отправить заявку</span>';
      }
    }
    function clearNetError() {
      var e = document.getElementById("formNetError");
      if (e) e.remove();
    }
    function showNetError(msg) {
      clearNetError();
      var d = document.createElement("div");
      d.id = "formNetError";
      d.className = "field-error form-net-error";
      d.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg><span></span>';
      d.querySelector("span").textContent = msg;
      submitBtn.parentNode.insertBefore(d, submitBtn.nextSibling);
    }
    function showSuccess(nm) {
      var phoneTel = PHONE.replace(/[^\d+]/g, "");
      document.getElementById("modalBody").innerHTML =
        '<div class="form-success">' +
          '<div class="fs-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12l4 4 10-10" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          "<h2>Заявка отправлена!</h2>" +
          "<p>" + (nm ? nm + ", спасибо" : "Спасибо") + " за заявку. Перезвоним в течение ~30 минут " +
          "и бесплатно сориентируем по стоимости.</p>" +
          '<a class="fs-phone" href="tel:' + phoneTel + '">' + PHONE + "</a>" +
          '<p style="font-size:14px;color:var(--ink-faint);margin-top:6px">ежедневно · 08:00–22:00</p>' +
          '<button class="btn btn-ghost" data-close-form style="margin-top:22px">Закрыть</button>' +
        "</div>";
    }
    async function submitLead() {
      var fd = new FormData();
      fd.set("site_id", window.__SITE_ID || "");
      fd.set("name", nameEl.value.trim());
      fd.set("phone", phoneEl.value.trim());
      var objEl = form.querySelector('input[name="object"]:checked');
      fd.set("object_type", objEl ? objEl.value : "Квартира");
      fd.set("service", (form.querySelector('[name="service"]') || {}).value || "");
      fd.set("address", (form.querySelector('[name="address"]') || {}).value || "");
      fd.set("call_time", (form.querySelector('[name="calltime"]') || {}).value || "");
      fd.set("comment", (form.querySelector('[name="comment"]') || {}).value || "");
      fd.set("consent_v", "v1");
      fd.set("hp_company", (form.querySelector('[name="company"]') || {}).value || "");
      try { fd.set("captcha_token", (window.smartCaptcha && window.smartCaptcha.execute) ? (await window.smartCaptcha.execute()) || "" : ""); }
      catch (_) { fd.set("captcha_token", ""); }
      files.forEach(function (f) { fd.append("photos", f, f.name); });
      try {
        var res = await fetch("/api/leads/elektrik", { method: "POST", body: fd });
        if (res.status === 201 || res.status === 202) return { ok: true };
        if (res.status === 429) return { ok: false, msg: "Слишком много заявок. Попробуйте через несколько минут или позвоните: " + PHONE };
        if (res.status === 400) {
          var j = {}; try { j = await res.json(); } catch (_) {}
          return { ok: false, fields: (j && j.fields) || [], msg: (j && j.message) || null };
        }
        return { ok: false };
      } catch (_) {
        return { ok: false };
      }
    }
  }

  // ---- Mobile nav ----
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  function closeMobileNav() { if (mnav) mnav.classList.remove("open"); }
  if (burger) {
    burger.addEventListener("click", function () { mnav.classList.toggle("open"); });
    mnav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMobileNav();
    });
  }

  // ---- Типографика: не оставляем короткие предлоги/союзы висеть в конце строки ----
  var SHORT_WORDS = [
    "и","в","во","с","со","к","ко","у","о","об","обо","а","но","же","ли","бы",
    "на","по","до","от","за","из","для","без","под","над","при","про","что",
    "как","или","то","не","это","я","мы","вы","их","да","уж","ну","со","изо"
  ];
  var WIDOW_RE = new RegExp(
    "(^|[\\s(«„\"\\u00AB\\u2014\\u2013-])(" + SHORT_WORDS.join("|") + ")\\s+",
    "gi"
  );
  function fixWidows(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentElement;
      if (!p || /SCRIPT|STYLE|TEXTAREA/.test(p.tagName)) return;
      if (!/\s/.test(node.nodeValue)) return;
      var v = node.nodeValue, prev;
      do {
        prev = v;
        v = v.replace(WIDOW_RE, function (m, b, w) { return b + w + "\u00A0"; });
      } while (v !== prev);
      // Числа не отрываем от единиц («15+ лет», «5 лет», «30 мин», «40 000 ₽»)
      v = v.replace(/([\d+%₽])\u0020(?=[А-Яа-яЁё])/g, "$1\u00A0");
      v = v.replace(/(\d)\u0020(?=\d{3}(\D|$))/g, "$1\u00A0");
      v = v.replace(/\u0020(?=₽)/g, "\u00A0");
      if (v !== node.nodeValue) node.nodeValue = v;
    });
  }
  fixWidows(document.body);
})();
