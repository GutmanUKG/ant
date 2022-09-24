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

    const defaultAnimate = new Animation({
        trigger:'mouseenter',
        elements: '.default_animate'
    })
    defaultAnimate.animate()

    const optimizeAnimateMenu = throttle(animateMenu, 100)
    const mainMenu = document.querySelector('.main_menu')
    const listMenuItem = mainMenu.querySelectorAll('li')
    let isAnimate = true
    function animateMenu(item) {
        if(isAnimate){
            // for(let i = 0; i < listMenuItem.length; i++){
            //     listMenuItem[i].classList.remove('show_sub_menu')
            // }
            if(item.querySelector('.nav-sub')){
                item.classList.add('show_sub_menu')
                mainMenu.classList.add('open_sub_menu')
            }else {
                return false
            }
        }else{
            item.classList.remove('show_sub_menu')
            mainMenu.classList.remove('open_sub_menu')
        }

    }

    listMenuItem.forEach(item=>{
        item.addEventListener('mouseover', (e)=>{
            optimizeAnimateMenu(item)
            isAnimate = true
        })
        item.addEventListener('mouseout', ()=>{
            isAnimate = false
            optimizeAnimateMenu(item)
        })
    })
});