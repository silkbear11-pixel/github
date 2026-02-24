(function () {
  'use strict';
  console.log('reading js');

  const thumbs = document.querySelectorAll('.thumb');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close');

  const viewer = document.querySelector('#viewer');
  const bigimg = document.querySelector('#bigimg');
  const cap = document.querySelector('#cap');
  const tip = document.querySelector('#tip');

  const photos = [
    'images/desk1.jpg',
    'images/desk2.jpg',
    'images/desk3.jpg',
    'images/desk4.jpg',
    'images/desk5.jpg'
  ];

  const captions = [
    'Full system view.',
    'Tools you touch most.',
    'Work mode.',
    'Detail mode.',
    'Night mode.'
  ];

  let startIndex = 0;
  let prevIndex = 0;
  let tipTimer;

  function setView(idx) {
    bigimg.src = photos[idx];
    bigimg.alt = 'Desk photo ' + (idx + 1);
    cap.textContent = captions[idx];
  }

  function openOverlay(idx) {
    startIndex = idx;
    prevIndex = idx;

    setView(idx);
    overlay.classList.remove('hide');

    tip.style.display = 'none';
    clearTimeout(tipTimer);

    tipTimer = setTimeout(function () {
      tip.style.display = 'block';
    }, 900);
  }

  function closeOverlay() {
    overlay.classList.add('hide');
    bigimg.src = '';
    bigimg.alt = '';
    cap.textContent = 'write captions here';

    tip.style.display = 'none';
    clearTimeout(tipTimer);
  }

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      openOverlay(idx);
    });
  });

  closeBtn.addEventListener('click', closeOverlay);

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !overlay.classList.contains('hide')) {
      closeOverlay();
    }
  });

  viewer.addEventListener('mousemove', function (event) {
    if (overlay.classList.contains('hide')) { return; }

    const box = viewer.getBoundingClientRect();
    const x = event.clientX - box.left;
    const percent = x / box.width;

    let idx = Math.floor(percent * photos.length);

    if (idx < 0) { idx = 0; }
    if (idx > photos.length - 1) { idx = photos.length - 1; }

    if (idx !== prevIndex) {
      setView(idx);
      prevIndex = idx;
    }
  });

  viewer.addEventListener('mouseleave', function () {
    if (overlay.classList.contains('hide')) { return; }
    setView(startIndex);
    prevIndex = startIndex;
  });

})();