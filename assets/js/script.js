document.addEventListener('DOMContentLoaded', ()=>{
    // Функция throttle будет принимать 2 аргумента:
    // - callee, функция, которую надо вызывать;
    // - timeout, интервал в мс, с которым следует пропускать вызовы.
    function throttle(callee, timeout) {
        // Таймер будет определять,
        // надо ли нам пропускать текущий вызов.
        let timer = null;

        // Как результат возвращаем другую функцию.
        // Это нужно, чтобы мы могли не менять другие части кода,
        // чуть позже мы увидим, как это помогает.
        return function perform(...args) {
            // Если таймер есть, то функция уже была вызвана,
            // и значит новый вызов следует пропустить.
            if (timer) return;

            // Если таймера нет, значит мы можем вызвать функцию:
            console.log(timer)
            timer = setTimeout(() => {
                // Аргументы передаём неизменными в функцию-аргумент:
                callee(...args);

                // По окончании очищаем таймер:
                clearTimeout(timer);
                timer = null;
            }, timeout);
        };
    }

    //Анимация (не используеться )
    class Animation{
        constructor({trigger = null, elements = null,animationName = 'default'}) {
            this.trigger  = trigger;
            this.elements = document.querySelectorAll(elements);
            this.animationName = animationName;
        }

        animate(){
            this.elements.forEach(item=>{
                item.addEventListener(this.trigger, ()=>{
                    item.classList.add('animate_start')
                    setTimeout(()=>{
                        item.classList.remove('animate_start')
                    }, 500)
                })
            })
        }
    }
    //--------------------


    //Класс для создания слайдеров
    class OwlSlider{
        constructor({element = null, options = {},
                    btnNext = null, btnPrev = null}){
            this.element = element
            this.options = options
            this.btnNext = document.querySelector(btnNext)
            this.btnPrev = document.querySelector(btnPrev)
        }
        init(){
            console.log(this.element)
            document.querySelectorAll(this.element).forEach(item=>{
                item.classList.add('owl-carousel', 'owl-theme')
            })

            $(this.element).owlCarousel({
                ...this.options
            })

            if(this.btnPrev && this.btnNext != null){
                var owl = $('.owl-carousel');
                owl.owlCarousel();
                $(this.btnNext).click((e)=>{
                    e.preventDefault();
                    owl.trigger('next.owl.carousel')

                })
                $(this.btnPrev).click((e)=> {
                    e.preventDefault();
                    owl.trigger('prev.owl.carousel', [300]);
                })
            }
        }
    }
    //--------------------

    //Стандартная анимация
    const defaultAnimate = new Animation({
        trigger:'mouseenter',
        elements: '.default_animate'
    })
    defaultAnimate.animate()
    //--------------------

    //Создание элементов с картинкой при наведенни на точки карты
    const dotsInMap = document.querySelectorAll('.dot')

    dotsInMap.forEach(item=>{
        let hoverItem = item.querySelector('.hover_img')
        let image = document.createElement('img')
        image.src = hoverItem.dataset.img
        hoverItem.appendChild(image)
    })
    //--------------------

    //Вызов слайдера на главной странице
    const caseSlider = new OwlSlider({
        element: '.case_slider',
        btnNext: '.next_btn',
        btnPrev: '.prev_btn',
        options: {
            loop:true,
            margin:20,
            nav:false,
            items: 5.5,
            stagePadding: 30,
            dots: false,
            responsive:{
                0:{
                  items: 2
                },
                1339:{
                  items:2.3
                },
                1800:{
                    items:4.5
                },
                1826:{
                  items:5.5
                },


            }
        }
    })
    caseSlider.init()
    //--------------------


    //Вызов слайдера для внутрней страницы
    try{
        const caseSliderInner = new OwlSlider({
            element: '.case_slider_inner',
            btnNext: '.next_btn_inner',
            btnPrev: '.prev_btn_inner',
            options: {
                loop:true,
                margin:20,
                nav:false,
                items: 5.5,
                stagePadding: 30,
                dots: false
            }
        })
        caseSliderInner.init()
    }catch (e){

    }
    //--------------------


    //Создание копий слайдера для внутрнеей страницы
    try {
        const innerProgectsSlider = document.querySelectorAll('.item_slider_progect_list')
        innerProgectsSlider.forEach(item=>{
            item.classList.add('owl-carousel', 'owl-theme')
            $(item).owlCarousel({
                loop:false,
                margin:0,
                items: 1,
                nav:false,
                dots:false,
            })
            let btnNext = item.parentNode.querySelector('.next_btn')
            let btnPrev = item.parentNode.querySelector('.prev_btn')
            btnPrev.style.opacity = .5
            let owl = $(item);
            $(btnNext).click((e)=>{
                e.preventDefault();
                owl.trigger('next.owl.carousel')
                btnPrev.style.opacity = 1

            })
            $(btnPrev).click((e)=> {
                e.preventDefault();
                owl.trigger('prev.owl.carousel', [300]);

            })
        })
    }catch(e){

    }
    //--------------------


    //перенос и копирование элементов для адаптива
    const headerLangs = document.querySelector('.langs'),
        headerMenuList = document.querySelector('.menu_list'),
        footer = document.querySelector('footer'),
        footerInfo = footer.querySelector('.info'),
        socialList = footer.querySelector('.social_list'),
        burgerMenuBtn = document.querySelector('.burger_menu_btn'),
        burgerMenu = document.querySelector('.burger_menu'),
        closeBtn = burgerMenu.querySelector('.close_btn'),
        body = document.body,
        overflow = document.querySelector('.overflow');
    //Вызов анимации открытия и закрытия бургера
    burgerMenuBtn.addEventListener('click', (e)=>{
       burgerMenu.classList.add('active')
        body.style.overflow="hidden"
        overflow.style.display = 'block'
    });
    closeBtn.addEventListener('click', (e)=>{
        burgerMenu.classList.remove('active')
        body.style.overflow=""
        overflow.style.display = ''
    })
    overflow.addEventListener('click', ()=>{
        burgerMenu.classList.remove('active')
        body.style.overflow=""
        overflow.style.display = ''
    })
    //--------------------
    //пренос и копирование элементов для создания бургер меню
    function generateBurgerMenu (){
        let topBurgerMenu = burgerMenu.querySelector('.top')
        let bottomBurgerMenu = burgerMenu.querySelector('.bottom_menu')
        topBurgerMenu.appendChild(headerLangs)
        burgerMenu.appendChild(headerMenuList)
        bottomBurgerMenu.appendChild(footerInfo.cloneNode(true))
        bottomBurgerMenu.appendChild(socialList.cloneNode(true))
    }



    //Удаление всех анимаций при наведении на элементы
    function removeAnimation(){
        let elements = document.querySelectorAll('.animation')
        elements.forEach(item=>{
            item.classList.remove('animation')
        })
    }

    //--------------------
    //--------------------


    if(body.clientWidth < 1024){
        generateBurgerMenu()
        removeAnimation()
    }

    //--------------------


});
