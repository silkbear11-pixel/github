const thumbs = document.querySelectorAll('.thumb');
const overlay = document.querySelector('.overlay');
const overlayImg = document.querySelector('.overlay-img');
const closeBtn = document.querySelector('.close');

let lastFocusedButton = null;

function openOverlay(imgSrc, imgAlt, buttonEl) {
  lastFocusedButton = buttonEl;

  overlayImg.src = imgSrc;
  overlayImg.alt = imgAlt;

  overlay.classList.remove('hidden');
  closeBtn.focus();
}

function closeOverlay() {
  overlay.classList.add('hidden');

  overlayImg.src = '';
  overlayImg.alt = '';

  if (lastFocusedButton) {
    lastFocusedButton.focus();
  }
}

thumbs.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const full = btn.getAttribute('data-full');
    const alt = btn.getAttribute('data-alt');
    openOverlay(full, alt, btn);
  });
});

closeBtn.addEventListener('click', closeOverlay);

overlay.addEventListener('click', function (event) {
  if (event.target === overlay) {
    closeOverlay();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeOverlay();
  }
});
