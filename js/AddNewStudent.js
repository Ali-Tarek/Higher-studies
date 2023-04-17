const fname = document.getElementById("fname");
const fname_validity = document.getElementById("fnameValid")
fname.addEventListener("input", () => {
    if (containsNumbers(fname.value) || fname.value.length < 3) {
        fname_validity.style.display = "block";
    }
    else {
        fname_validity.style.display = "none";
    }
})

const lname = document.getElementById("lname");
const lname_validity = document.getElementById("lnameValid")
lname.addEventListener("input", () => {
    if (containsNumbers(lname.value) || lname.value.length < 3) {
        lname_validity.style.display = "block";
    }
    else {
        lname_validity.style.display = "none";
    }
})


const ID = document.getElementById("ID");
const ID_validity = document.getElementById("IDValid")
ID.addEventListener("input", () => {
    if (ID.value.length != 8 || ID.value[0] != 2 || ID.value[1] != 0) {
        ID_validity.style.display = "block";
    }
    else {
        ID_validity.style.display = "none";
    }
})




const sub = document.getElementsByClassName("SignUp");

sub[0].addEventListener("submit", (e) => { validateForm(e) })




function validateForm(e) {
    e.preventDefault();

    if (document.getElementById("fnameValid").style.display == 'block') {
        alert("First Name is invalid ! Valid name must contains no symbols or digits");
        return;
    }
    if (document.getElementById("lnameValid").style.display == 'block') {

        alert("Last name is invalid ! Valid name must contains no symbols or digits");
        return;
    }
    if (document.getElementById("IDValid").style.display == 'block') {
        alert("ID is Invalid ! Valid ID must starts with 20 and contains 8 digits");
        return;
    }

    const course_1 = document.getElementById("course-1").value
    const course_2 = document.getElementById("course-2").value
    const course_3 = document.getElementById("course-3").value

    if (course_1 == course_2 || course_2 == course_3 || course_1 == course_3 || course_1 == "" || course_2 == "" || course_3 == "") {
        alert("Please choose differnect courses");
        return;
    }

    const gender = document.querySelector('input[name="gender"]:checked')
    const status = document.querySelector('input[name="Status"]:checked')
    let student = {}
    student.fname = e.currentTarget.fname.value
    student.lname = e.currentTarget.lname.value;
    student.ID = e.currentTarget.ID.value
    student.Date = e.currentTarget.Date_Birth.value
    student.Uni = e.currentTarget.Uni.value
    student.Gender = gender.value;
    student.Active = (status.value === 'Active');
    student.Dept = document.getElementById('Dept').value;
    student.Course_1 = course_1;
    student.course_2 = course_2;
    student.course_3 = course_3;


    var students = JSON.parse(localStorage.getItem("students")) || [];
    for (const stu of students) {
        if (stu.ID == e.currentTarget.ID.value) {
            alert("The provided ID aleady Existed!");
            return;
        }
    }



    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    console.log(JSON.parse(localStorage.getItem("student")));

    alert("Done");
    const sub = document.getElementsByClassName("SignUp");
    sub[0].reset();
}



function containsNumbers(str) {
    return (!/^[A-Za-z]+$/.test(str));
}




// Nav Bar 
const navslide = () => {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector('.left');
    const nav2 = document.querySelector('.right');
    menu.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
        nav2.classList.toggle('nav-active')
        menu.classList.toggle('toggle')

    })
}
navslide();


// Courses Rendering



const courses = JSON.parse(localStorage.getItem('courses'));
const course_1 = document.getElementById("course-1")
const course_2 = document.getElementById("course-2")
const course_3 = document.getElementById("course-3")
courses.forEach(course => {
    const option = document.createElement("option")
    option.text = course.name;
    option.value = course.name;
    course_1.appendChild(option.cloneNode(true));
    course_2.appendChild(option.cloneNode(true));
    course_3.appendChild(option.cloneNode(true));
});
