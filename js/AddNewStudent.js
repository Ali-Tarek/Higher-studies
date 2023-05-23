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
    student.Active = status.value;
    student.Dept = document.getElementById('Dept').value;
    student.course_1 = course_1;
    student.course_2 = course_2;
    student.course_3 = course_3;







    $.ajax({
        url: 'http://127.0.0.1:8000/Students/addNewStudent/',
        type: 'POST',
        data: JSON.stringify(student),
        contentType: 'application/json',
        success: function(response) {
          // Handle the successful response from the backend
          console.log(response);
          alert('New Student Added');
          const sub = document.getElementsByClassName('SignUp');
          sub[0].reset();
        },
        error: function(error) {
          // Handle any errors
          console.error(error.responseJSON); // or error.responseText
          alert('Error: ' + error.responseJSON.error);
        },
      });


    
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



 // ajax function to render the courses
 $.ajax({
    url:"http://127.0.0.1:8000/courses/",
    type:"GET",
    success: function(response) {
        const course_1 = document.getElementById("course-1")
        const course_2 = document.getElementById("course-2")
        const course_3 = document.getElementById("course-3")
        response.forEach(course => {
        const option = document.createElement("option")
        option.text = course.id;
        option.value = course.id;
        course_1.appendChild(option.cloneNode(true));
        course_2.appendChild(option.cloneNode(true));
        course_3.appendChild(option.cloneNode(true));
    });

    console.log(response);
    const sub = document.getElementsByClassName('SignUp');
    sub[0].reset();
    },
    error: function(error) {
    // Handle any errors
    console.error(error);
    alert('Error: Failed to add student');
    },
});

