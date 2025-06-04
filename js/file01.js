'use strict';

/**
 * Añade la clase md:block a el elemento de #toast-interactive.
 * 
 * @function
 */
const showToast = () => {
    let popup = document.getElementById('toast-interactive');
    if (popup) {
        popup.classList.add("md:block");
    }
};

/**
 * Añade un EventListener al botón #demo que abre un video de youtube.
 * 
 * @function
 * @listens click
 * @fires window.open
 */
const showVideo = () => {
    let video = document.getElementById('demo');
    video.addEventListener('click', () => {
        window.open('https://www.youtube.com/watch?v=14jlIxVrcvo', '_blank');
    });
};

(() => {
    showToast();
    showVideo();
})();
