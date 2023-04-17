// Nav Bar 
const navslide = ()=>{
    const menu = document.querySelector(".menu");
    const nav = document.querySelector('.left');
    const nav2 = document.querySelector('.right');
    menu.addEventListener('click' , ()=>{
        nav.classList.toggle('nav-active')
        nav2.classList.toggle('nav-active')
        menu.classList.toggle('toggle')

    })
}
navslide();