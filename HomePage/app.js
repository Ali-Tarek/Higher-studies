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



const footer = document.querySelector('footer');

function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.body.offsetHeight;
  const footerPosition = footer.offsetTop + footer.offsetHeight;

  if (scrollPosition >= 975) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
}

window.addEventListener('scroll' , handleScroll);
console.log(window.innerHeight);

navslide();