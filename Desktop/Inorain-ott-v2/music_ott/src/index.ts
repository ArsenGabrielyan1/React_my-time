import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById("music-local");

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export {};
