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