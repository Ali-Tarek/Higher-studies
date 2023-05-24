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
$.ajax({
    url:"http://127.0.0.1:8000/courses/",
    type:"GET",
    success: function(response) {
        document.getElementById("courses-Count").innerText =response.length;
    },
    error: function(error) {
    // Handle any errors
    console.error(error);
    },
});
$.ajax({
    url:"http://127.0.0.1:8000/students/",
    type:"GET",
    success: function(response) {
        let noOfActive = 0;
       response.forEach(student => {
        if(student.status == 'A')
        {
            noOfActive++;
        }
       });
       document.getElementById("All-Students").innerText = Number(response.length);
       document.getElementById("Active-Students").innerText = Number(noOfActive);

   
    },
    error: function(error) {
    console.error(error);
    },
});


