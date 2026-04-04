/* ============================================
   The Monkey Lady's Gift — Gallery Lightbox
   ============================================ */

(function () {
    'use strict';

    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var items = document.querySelectorAll('.gallery__item');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var prevBtn = lightbox.querySelector('.lightbox__prev');
    var nextBtn = lightbox.querySelector('.lightbox__next');
    var imageEl = lightbox.querySelector('.lightbox__image');
    var captionEl = lightbox.querySelector('.lightbox__caption');

    var currentIndex = 0;
    var galleryData = [];

    // Build gallery data from items
    items.forEach(function (item, index) {
        var caption = item.getAttribute('data-caption') || '';
        var img = item.querySelector('img');
        var placeholder = item.querySelector('.placeholder');
        var src = img ? img.src : '';
        var label = placeholder ? placeholder.querySelector('span') : null;
        var placeholderText = label ? label.textContent : caption;

        galleryData.push({
            src: src,
            caption: caption,
            placeholderText: placeholderText,
            hasImage: !!img
        });

        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.hidden = false;
        lightbox.setAttribute('data-active', '');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightbox.removeAttribute('data-active');
        document.body.style.overflow = '';
        // Return focus to the gallery item
        if (items[currentIndex]) {
            items[currentIndex].focus();
        }
    }

    function updateLightbox() {
        var data = galleryData[currentIndex];
        if (!data) return;

        if (data.hasImage && data.src) {
            // Show real image
            imageEl.src = data.src;
            imageEl.alt = data.caption;
            imageEl.hidden = false;
            // Remove any placeholder
            var existing = lightbox.querySelector('.lightbox__placeholder');
            if (existing) existing.remove();
        } else {
            // Show placeholder in lightbox
            imageEl.hidden = true;
            var existing = lightbox.querySelector('.lightbox__placeholder');
            if (existing) existing.remove();

            var ph = document.createElement('div');
            ph.className = 'lightbox__placeholder';
            ph.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">' +
                '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>' +
                '<circle cx="12" cy="13" r="3"/></svg>' +
                '<span>' + (data.placeholderText || 'Photo') + '</span>';

            var content = lightbox.querySelector('.lightbox__content');
            content.insertBefore(ph, captionEl);
        }

        captionEl.textContent = data.caption;
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
        updateLightbox();
    }

    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () { navigate(-1); });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () { navigate(1); });
    }

    // Close on overlay click
    var overlay = lightbox.querySelector('.lightbox__overlay');
    if (overlay) {
        overlay.addEventListener('click', closeLightbox);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                navigate(1); // swipe left = next
            } else {
                navigate(-1); // swipe right = prev
            }
        }
    }, { passive: true });
})();
