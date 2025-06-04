"use strict";

// Función flecha para mostrar la notificación
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.remove("hidden");
        toast.classList.add("md:block");
    }
};

// Función flecha para agregar evento al botón demo
const showVideo = () => {
    const demoBtn = document.getElementById("demo");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

// Autoejecución que muestra la notificación y agrega el evento al botón demo
(() => {
    showToast();
    showVideo();
})();