(function() {
    // mobile navigation controls
    const menuToggles = document.querySelectorAll('#navToggle');
    const mobileNav = document.querySelector('.mobile-nav');
    menuToggles.forEach(el => {
        el.addEventListener('click', e => {
            mobileNav.classList.toggle('mobile-nav--active');
        })
    });

    // force scroll to top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0,0);

    // cards animation 
    const portfolioCards = document.querySelectorAll('.card--loading');
    if(portfolioCards) {
        loadCards();
    }
    function loadCards() {
        Array.from(portfolioCards).forEach((el, ind)=> {
            setTimeout(() => {
                el.classList.toggle('card--loading');
            }, (125 * ind));
        });
    }
})();