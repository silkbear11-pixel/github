(function () {
  'use strict';
  console.log('reading js');

  const thumbs = document.querySelectorAll('.thumb');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close');

  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');

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

  let currentIndex = 0;
  let tipTimer;
  let zoomOn = false;

  function resetZoom() {
    bigimg.classList.remove('zoomed');
    bigimg.style.transformOrigin = '50% 50%';
    zoomOn = false;
  }

  function setView(idx) {
    currentIndex = idx;

    bigimg.src = photos[currentIndex];
    bigimg.alt = 'Desk photo ' + (currentIndex + 1);

    cap.textContent = captions[currentIndex];

    resetZoom();
  }

  function openOverlay(idx) {
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

    resetZoom();

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

  prevBtn.addEventListener('click', function (event) {
    event.stopPropagation();

    let idx = currentIndex - 1;
    if (idx < 0) { idx = photos.length - 1; }
    setView(idx);
  });

  nextBtn.addEventListener('click', function (event) {
    event.stopPropagation();

    let idx = currentIndex + 1;
    if (idx > photos.length - 1) { idx = 0; }
    setView(idx);
  });

//needs some more improvement. I want to have it zoom in like a magnifying glass.
  viewer.addEventListener('click', function (event) {
    if (overlay.classList.contains('hide')) { return; }

    const box = viewer.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const xPercent = (x / box.width) * 100;
    const yPercent = (y / box.height) * 100;

    if (!zoomOn) {
      bigimg.style.transformOrigin = xPercent + '% ' + yPercent + '%';
      bigimg.classList.add('zoomed');
      zoomOn = true;
    } else {
      resetZoom();
    }
  });

})();