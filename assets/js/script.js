// get mobile
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

// modal rules
(() => {
    const modal = document.querySelector('.sec-modal-rules');
    const openBtn = document.querySelector('.sec-navbar__content__lst__item__rules');
    const closeBtn = modal.querySelector('.sec-modal-rules__content__header__bt-fechar');

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            alert("Seu navegador não suporta <dialog>.");
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (event) => {
        const rect = modal.querySelector('.sec-modal-rules__content').getBoundingClientRect();
        const isInDialog = (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        );
        if (!isInDialog) {
            modal.close();
        }
    });
})();

(() => {
    'use strict';

    // sec-add-players
    let players = [];

    const inputPlayers = document.querySelector('.sec-add-players__content__form__input');
    const tablePlayers = document.querySelector('.sec-add-players__content__table tbody');
    const btSubmit = document.querySelector('.sec-add-players__content__form__bt');
    const btPlay = document.querySelector('.sec-add-players__content__bt-start-game');

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

            renderPlayers(); 
        }
    });

    btPlay.addEventListener('click', () => {
        
        if (players.length < 3) {
            window.alert('ADICIONE NO MÍNIMO 3 JOGADORES!');
        } else {
            const secPlayers = document.querySelector('.sec-add-players');
            const secGame = document.querySelector('.sec-game');
            const tablePlayersList = document.querySelector('.sec-game__content__table tbody');
            
            secPlayers.setAttribute('hidden', 'true');
            secGame.removeAttribute('hidden');

            tablePlayersList.innerHTML = '';

            players.forEach((playerName, playerId) => {
                tablePlayersList.innerHTML += 
                `
                    <tr>
                        <td>
                            ${playerName}
                        </td>

                        <td>
                            <i class="fa-solid fa-poop"></i>
                        </td>
                        
                        <td>
                            <button type="button" class="sec-game__content__table__bt" data-player="${playerId}">
                                <i class="fa-solid fa-check-to-slot"></i> Votar
                            </button>
                        </td>
                    </tr>
                `;
            });

        }
    });

    


})();