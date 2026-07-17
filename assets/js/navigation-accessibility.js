(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  var menuButton = nav.querySelector(":scope > button");
  var hiddenLinks = nav.querySelector(".hidden-links");
  var themeToggle = document.querySelector("#theme-toggle [role='button']");

  function syncMenuState() {
    if (!menuButton || !hiddenLinks) return;
    var isOpen = !hiddenLinks.classList.contains("hidden");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  }

  if (menuButton && hiddenLinks) {
    menuButton.addEventListener("click", function () {
      window.requestAnimationFrame(syncMenuState);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !hiddenLinks.classList.contains("hidden")) {
        hiddenLinks.classList.add("hidden");
        menuButton.classList.remove("close");
        syncMenuState();
        menuButton.focus();
      }
    });

    syncMenuState();
  }

  if (themeToggle) {
    themeToggle.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        themeToggle.click();
      }
    });
  }
})();
