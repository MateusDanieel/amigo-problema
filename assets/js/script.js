// verifica se o dispositivo é mobile ou desktop
(() => {
    function isMobile() {
        const userAgentMatch = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
        return userAgentMatch || touchSupport;
    }
    
    if (isMobile()) {
        setInterval(() => {
            document.querySelector('.sec-modal-landscape').setAttribute('hidden', true);
        }, 5000);   
    }
})();

// adiciona jogadores
(() => {
    'use strict';

    const players = [];
    
    const inputPlayers = document.querySelector('.sec-add-players__content__form__input');
    const btSubmit = document.querySelector('.sec-add-players__content__form__bt');

    btSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (inputPlayers.value !== '') {
            const getPlayers = inputPlayers.value.split(',');

            getPlayers.forEach((el) => {
                players.push(el);
            });
        }

    });

})();