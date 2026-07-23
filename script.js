document.querySelectorAll('.popcorn-smile').forEach((popcorn) => {
  function scatterPopcorn() {
    const origin = popcorn.getBoundingClientRect();
    const centreX = origin.left + origin.width / 2;
    const centreY = origin.top + origin.height / 2;

    Array.from({ length: 52 }).forEach((_, index) => {
      const piece = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 52 + (Math.random() - .5) * .26;
      const distance = 90 + Math.random() * 390;
      piece.className = 'popcorn-pop';
      piece.style.left = `${centreX}px`;
      piece.style.top = `${centreY}px`;
      piece.style.setProperty('--pop-size', `${12 + Math.random() * 28}px`);
      piece.style.setProperty('--pop-x', `${Math.cos(angle) * distance}px`);
      piece.style.setProperty('--pop-y', `${Math.sin(angle) * distance}px`);
      piece.style.setProperty('--pop-rotate', `${(Math.random() - .5) * 760}deg`);
      piece.style.animationDelay = `${Math.random() * .12}s`;
      document.body.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    });
  }

  popcorn.addEventListener('pointerdown', scatterPopcorn);
  popcorn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scatterPopcorn();
    }
  });
});
