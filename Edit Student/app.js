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

const Students = JSON.parse(localStorage.getItem('students'));
const AllCourses = JSON.parse(localStorage.getItem("courses"));
const No_of_students = Students.length;
const No_Of_Courses = AllCourses.length;
let No_Of_Active = 0;

for (const stu of Students) {
    if(stu.Active )
    {
        No_Of_Active++;
    }
}

document.getElementById("All-Students").innerText = Number(No_of_students);
document.getElementById("Active-Students").innerText = Number(No_Of_Active);
document.getElementById("courses-Count").innerText = Number(No_Of_Courses);


