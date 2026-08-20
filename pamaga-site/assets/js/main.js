(function () {
  "use strict";

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Dropdown "Productos" táctil (además del :hover de escritorio) ---- */
  document.querySelectorAll(".has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 940px)").matches) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  /* ---- Lightbox de galería ---- */
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery button[data-full]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-alt"));
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---- Formulario de contacto (sitio estático: arma un mailto) ---- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#f-name").value.trim();
      var email = form.querySelector("#f-email").value.trim();
      var phone = form.querySelector("#f-phone").value.trim();
      var message = form.querySelector("#f-message").value.trim();
      var subject = "Consulta desde pamaga.com.ar — " + name;
      var body =
        "Nombre: " + name +
        "\nEmail: " + email +
        "\nTeléfono: " + phone +
        "\n\nMensaje:\n" + message;
      var mailto =
        "mailto:pamaga.ventas@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      var note = document.querySelector("#contact-note");
      if (note) {
        note.textContent = "Se abrió tu cliente de correo con la consulta lista para enviar. Si no se abrió, escribinos directo a pamaga.ventas@gmail.com.";
        note.style.display = "block";
      }
      window.location.href = mailto;
    });
  }

  /* ---- Cerrar menú móvil al navegar ---- */
  document.querySelectorAll(".nav-links a:not(.has-dropdown > a)").forEach(function (a) {
    a.addEventListener("click", function () {
      if (navLinks) navLinks.classList.remove("open");
    });
  });
})();
