(() => {
    const galleries = document.querySelectorAll('.inline-gallery');
    if (!galleries.length) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'inline-gallery-zoom';
    dialog.setAttribute('aria-label', 'Enlarged image');

    const close = document.createElement('button');
    close.type = 'button';
    close.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M6 18L18 6"/></svg>';
    close.setAttribute('aria-label', 'Close enlarged image');

    const enlarged = document.createElement('img');
    dialog.append(close, enlarged);
    document.body.append(dialog);

    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });

    galleries.forEach((gallery) => {
        gallery.querySelectorAll('img').forEach((image) => {
            let link = image.closest('a');
            if (!link) {
                link = document.createElement('a');
                link.href = image.dataset.fullSize || image.src;
                image.replaceWith(link);
                link.append(image);
            }
            link.setAttribute('aria-label', `Enlarge: ${image.alt || 'Gallery image'}`);
            link.addEventListener('click', (event) => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                if (typeof dialog.showModal !== 'function') return;
                event.preventDefault();
                enlarged.src = link.href;
                enlarged.alt = image.alt;
                dialog.showModal();
            });
        });
    });
})();
