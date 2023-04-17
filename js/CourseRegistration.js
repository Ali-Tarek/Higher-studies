const searchInput = document.getElementById("input-id");
const searchBtn = document.getElementById("search-btn");
const registerBtn = document.getElementById("register-btn");
const studentName = document.getElementById("student-name");
const course1 = document.getElementById("course1");
const course2 = document.getElementById("course2");
const course3 = document.getElementById("course3");

const students = JSON.parse(localStorage.getItem("students"));

let courses = JSON.parse(window.localStorage.getItem("courses"));
let coursed;
if (courses.length) {
    for (let course of courses) {
        coursed += `<option value="${course.name}">${course.name}</option>`;
    }
    course1.innerHTML = coursed;
    course2.innerHTML = coursed;
    course3.innerHTML = coursed;
}



if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();

        var id = searchInput.value;

        for (var i = 0; i < students.length; i++) {


            if (students[i].ID === id) {

                studentName.innerHTML = students[i].fname + ' ' + students[i].lname;

                course1.querySelector(`option[value="${students[i].Course_1}"]`).selected = true;
                course2.querySelector(`option[value="${students[i].course_2}"]`).selected = true;
                course3.querySelector(`option[value="${students[i].course_3}"]`).selected = true;

                break;
            }
        }
    });
}


registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let spanError = document.getElementsByClassName("error");
    if (course1.value === course2.value || course2.value === course3.value || course1.value === course3.value) {


        for (var i = 0; i < spanError.length; i++) {
            spanError[i].textContent = "Duplicate Course";
        }

    }
    else {

        var id = searchInput.value;
        for (var i = 0; i < spanError.length; i++) {
            spanError[i].textContent = "";
        }

        for (var i = 0; i < students.length; i++) {
            if (students[i].ID === id) {
                students[i].Course_1 = course1.value;
                students[i].course_2 = course2.value;
                students[i].course_3 = course3.value;
                break;
            }
        }

        localStorage.setItem("students", JSON.stringify(students));

        alert("Updated");
    }

});



