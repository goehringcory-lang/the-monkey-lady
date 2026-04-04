/* ============================================
   Easter Eggs

   1. Type "monkey" anywhere on the page:
      A monkey swings down from the top of the screen

   2. Type "lava" anywhere on the page:
      A volcano erupts with lava flowing down the screen
   ============================================ */

(function () {
    'use strict';

    var keyBuffer = '';
    var bufferTimeout;

    document.addEventListener('keydown', function (e) {
        // Don't trigger in form fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        keyBuffer += e.key.toLowerCase();

        clearTimeout(bufferTimeout);
        bufferTimeout = setTimeout(function () { keyBuffer = ''; }, 2000);

        if (keyBuffer.includes('monkey')) {
            keyBuffer = '';
            monkeyDrop();
        }

        if (keyBuffer.includes('lava')) {
            keyBuffer = '';
            volcanoErupt();
        }
    });

    // ----- Easter Egg 1: Monkey Drop -----
    function monkeyDrop() {
        // Prevent stacking
        if (document.querySelector('.ee-monkey')) return;

        var monkey = document.createElement('div');
        monkey.className = 'ee-monkey';
        monkey.setAttribute('aria-hidden', 'true');
        monkey.innerHTML =
            '<div class="ee-monkey__vine"></div>' +
            '<div class="ee-monkey__body">' +
                '<div class="ee-monkey__face">' +
                    '<div class="ee-monkey__eyes"><span></span><span></span></div>' +
                    '<div class="ee-monkey__mouth"></div>' +
                '</div>' +
                '<div class="ee-monkey__arm ee-monkey__arm--left"></div>' +
                '<div class="ee-monkey__arm ee-monkey__arm--right"></div>' +
                '<div class="ee-monkey__tail"></div>' +
            '</div>';

        document.body.appendChild(monkey);

        // Swing animation then remove
        setTimeout(function () {
            monkey.classList.add('ee-monkey--swing');
        }, 50);

        setTimeout(function () {
            monkey.classList.add('ee-monkey--exit');
        }, 4000);

        setTimeout(function () {
            if (monkey.parentNode) monkey.parentNode.removeChild(monkey);
        }, 5500);
    }

    // ----- Easter Egg 2: Volcano Eruption -----
    function volcanoErupt() {
        if (document.querySelector('.ee-volcano')) return;

        var container = document.createElement('div');
        container.className = 'ee-volcano';
        container.setAttribute('aria-hidden', 'true');

        // Build volcano shape
        container.innerHTML =
            '<div class="ee-volcano__mountain"></div>' +
            '<div class="ee-volcano__crater"></div>' +
            '<div class="ee-volcano__smoke-cloud"></div>' +
            '<div class="ee-volcano__lava-pool"></div>';

        // Create lava blobs
        for (var i = 0; i < 30; i++) {
            var blob = document.createElement('div');
            blob.className = 'ee-volcano__blob';
            var xSpread = (Math.random() - 0.5) * 80;
            var speed = 1.5 + Math.random() * 2.5;
            var size = 6 + Math.random() * 18;
            var delay = Math.random() * 2;
            blob.style.cssText =
                'left: calc(50% + ' + xSpread + 'vw);' +
                'width: ' + size + 'px;' +
                'height: ' + size + 'px;' +
                'animation-duration: ' + speed + 's;' +
                'animation-delay: ' + delay + 's;';
            container.appendChild(blob);
        }

        // Create lava streams
        for (var j = 0; j < 5; j++) {
            var stream = document.createElement('div');
            stream.className = 'ee-volcano__stream';
            var streamX = 35 + (j * 7.5);
            var streamDelay = j * 0.3;
            stream.style.cssText =
                'left: ' + streamX + '%;' +
                'animation-delay: ' + streamDelay + 's;';
            container.appendChild(stream);
        }

        document.body.appendChild(container);

        setTimeout(function () {
            container.classList.add('ee-volcano--active');
        }, 50);

        // Screen shake
        document.body.classList.add('ee-shake');
        setTimeout(function () {
            document.body.classList.remove('ee-shake');
        }, 3000);

        setTimeout(function () {
            container.classList.add('ee-volcano--fade');
        }, 5500);

        setTimeout(function () {
            if (container.parentNode) container.parentNode.removeChild(container);
        }, 7000);
    }

})();
