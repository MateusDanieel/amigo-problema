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

(() => {
    'use strict';

    let players = [];

    const inputPlayers = document.querySelector('.sec-add-players__content__form__input');
    const btSubmit = document.querySelector('.sec-add-players__content__form__bt');
    const tablePlayers = document.querySelector('.sec-add-players__content__table tbody');

    function renderPlayers() {
        tablePlayers.innerHTML = '';

        players.forEach((playerName, index) => {
            tablePlayers.innerHTML += `
                <tr data-id="${index}">
                    <td>${playerName}</td>
                    <td>
                        <button type="button" class="sec-add-players__content__table__bt-remove" data-id="${index}">
                            <i class="fa-solid fa-user-xmark"></i> Remover Jogador
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    btSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if (inputPlayers.value.trim() !== '') {
            const newPlayers = inputPlayers.value.split(',').map(name => name.trim()).filter(name => name !== '');
            players.push(...newPlayers);

            renderPlayers();
            inputPlayers.value = '';
        }
    });

    // Delegação de evento no <tbody>
    tablePlayers.addEventListener('click', (e) => {
        if (e.target.closest('.sec-add-players__content__table__bt-remove')) {
            const button = e.target.closest('.sec-add-players__content__table__bt-remove');
            const row = button.closest('tr');
            const id = parseInt(row.dataset.id);

            if (players.length <= 1) {
                players = [];
            } else {
                players.splice(id, 1);
            }

            renderPlayers(); // re-renderiza a tabela atualizada
        }
    });
})();