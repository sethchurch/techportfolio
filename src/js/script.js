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


    // board class for portfolio loading
    class Board {
        constructor(cards, container) {
            this.cards = cards;
            this.container = container;
        }

        template(card) {
            return `<a class="card card--loading" href="${card.link}" data-skills="${card.skills}">
            <div class="card__screen"></div>
            <img class="card__img" src="${card.img}" alt="">
            <div class="card__content">
               <p class="card__text">${card.name}</p>
               <div class="card__skills">
                ${
                    (function(){
                        const skills = card.skills;
                        let skillsString = '';
                        skills.forEach(skill => {
                            skillsString += `<span class="card__pill">${skill}</span>`
                        })
                        return skillsString;
                    })()
                }
               </div>
            </div>
         </a>`;
        }

        render(cards) {
            cards = cards || this.cards;
            const createNode = html => new DOMParser().parseFromString(html, 'text/html').body.firstChild;
            this.container.innerHTML = '';
            cards.forEach(card => {
                this.container.appendChild(createNode(this.template(card)));
            });
            this.loadAnim();
        }

        filter(type) {
            if(!type) {
                this.render()
                return;
            }

            const types = {
                development: ['Vue.JS', 'Javascript', 'HTML', 'CSS', 'Node.JS'],
                design: ['Photoshop', 'Zbrush']
            };
    
            let filter = this.cards;
            cards.forEach(card => {
                filter = filter.filter(card => card.skills.some(r=> types[type].indexOf(r) >= 0));
            });
    
            this.render(filter);
        }

        loadAnim() {
            const portfolioCards = document.querySelectorAll('.card--loading');
            Array.from(portfolioCards).forEach((el, ind)=> {
                setTimeout(() => {
                    el.classList.toggle('card--loading');
                }, (125 * ind));
            });
        }
    }
    
    const cards = [
        {img:"./images/portfolio/bbstats.png", name: "BB Stats Page", link:'./portfolio/bbstats.html', skills:['Vue.JS', 'Javascript', 'HTML', 'CSS', 'Node.JS']},
        {img:"./images/portfolio/arkmirpixel.png", name: "Arkmir Pixel", link:'./portfolio/arkmirpixel.html', skills:['Photoshop']},
        {img:"./images/portfolio/aelen.png", name: "Aelen of Feylune", link:'./portfolio/aelenpixel.html', skills:['Photoshop']},
        {img:"./images/portfolio/uidemo.png", name: "Ui Demo", link:'./portfolio/uidemo.html', skills:['Javascript', 'HTML', 'CSS']},
        {img:"./images/portfolio/bbbans.png", name: "BB Bans Page", link:'./portfolio/example.html', skills:['Javascript', 'HTML', 'CSS']},
        {img:"./images/portfolio/portfoliopage.png", name: "Portfolio Page", link:'./portfolio/example.html', skills:['Javascript', 'HTML', 'CSS']},
        {img:"./images/portfolio/diceroller.png", name: "Dice Roller", link:'./portfolio/example.html', skills:['Javascript', 'HTML', 'CSS']},
        {img:"./images/portfolio/arkmirpainting.png", name: "Arkmir Painting", link:'./portfolio/example.html', skills:['Photoshop']},
        {img:"./images/portfolio/mindflayer.jpg", name: "Mindflayer Sculpt", link:'./portfolio/example.html', skills:['ZBrush']},
        {img:"./images/portfolio/elaristwins.png", name: "Elaris Twins", link:'./portfolio/example.html', skills:['Photoshop']},
        {img:"./images/portfolio/malastorte.jpg", name: "Mala Sorte", link:'./portfolio/example.html', skills:['Photoshop']},
        {img:"./images/portfolio/simongame.png", name: "Simon Game", link:'./portfolio/example.html', skills:['Javascript', 'HTML', 'CSS']},
    ];
    

    const portfolio = new Board(cards, document.querySelector('.portfolio-item-container'));
    portfolio.filter('development');

    const designBtn = document.querySelector('#designBtn');
    const bothBtn = document.querySelector('#bothBtn');
    const devBtn = document.querySelector('#devBtn');

    designBtn.addEventListener('click', e => {
        portfolio.filter('design');
    });

    bothBtn.addEventListener('click', e => {
        portfolio.render();
    });

    devBtn.addEventListener('click', e => {
        portfolio.filter('development');
    });

})();