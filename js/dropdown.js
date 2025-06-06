
  const dropdownButton = document.getElementById("menu-button");
  const dropdownPanel = document.getElementById("dropdownMenuPanel");
  const dropdownArrow = document.getElementById("dropdownArrow");

  // Abrir/cerrar menú al hacer clic en el botón
  dropdownButton.addEventListener("click", () => {
    const isOpen = dropdownPanel.classList.contains("hidden");
    closeAllDropdowns();
    if (isOpen) {
      dropdownPanel.classList.remove("hidden");
      dropdownArrow.style.transform = "rotateX(180deg)";
    } else {
      dropdownPanel.classList.add("hidden");
      dropdownArrow.style.transform = "rotateX(0deg)";
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    const dropdownContainer = document.getElementById("dropdownMenu");
    if (!dropdownContainer.contains(e.target)) {
      dropdownPanel.classList.add("hidden");
      dropdownArrow.style.transform = "rotateX(0deg)";
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownPanel.classList.add("hidden");
      dropdownArrow.style.transform = "rotateX(0deg)";
    }
  });

  // Cerrar otros menús abiertos
  function closeAllDropdowns() {
    document.querySelectorAll("[data-dropdown]").forEach(panel => {
      panel.classList.add("hidden");
    });
  }
