const searchInput = document.getElementById("input-id");
const searchBtn = document.getElementById("search-btn");
const registerBtn = document.getElementById("register-btn");
const studentName = document.getElementById("student-name");
const course1 = document.getElementById("course1");
const course2 = document.getElementById("course2");
const course3 = document.getElementById("course3");

let students = [];
let courses = [];

function retrieveCourses() {
    fetch("http://127.0.0.1:8000/courses/")
        .then(response => response.json())
        .then(data => {
            courses = data;
            populateCourseOptions();
        })
        .catch(error => {
            console.log("Error retrieving courses:", error);
        });
}

function retrieveStudents() {
    fetch("http://127.0.0.1:8000/students/")
        .then(response => response.json())
        .then(data => {
            students = data;
        })
        .catch(error => {
            console.log("Error retrieving students:", error);
        });
}

function populateCourseOptions() {
    let coursed = "";
    coursed+='<option  hidden id="c1" >Choose your course</option>';
    if (courses.length) {
        for (let course of courses) {
            coursed += `<option value="${course.name}">${course.name}</option>`;
        }
        course1.innerHTML = coursed;
        course2.innerHTML = coursed;
        course3.innerHTML = coursed;
    }
}

if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = searchInput.value;
        for (var i = 0; i < students.length; i++) {

            if (students[i].id == id) {
                studentName.innerHTML = students[i].firstName + " " + students[i].lastName;

                for (var j = 0; j < courses.length; j++) {
                    if (students[i].course1 == courses[j].id) {
                        course1.value = courses[j].name;
                        break;
                    }
                }

                for (var j = 0; j < courses.length; j++) {
                    if (students[i].course2 == courses[j].id) {
                        course2.value = courses[j].name;
                        break;
                    }
                }

                for (var j = 0; j < courses.length; j++) {
                    if (students[i].course3 == courses[j].id) {
                        course3.value = courses[j].name;
                        break;
                    }
                }

                break;
            }
        }
    });
}




registerBtn.addEventListener("click", (e) => {

    var student;
    e.preventDefault();
    let spanError = document.getElementsByClassName("error");
    if (
        course1.value === course2.value ||
        course2.value === course3.value ||
        course1.value === course3.value
    ) {
        for (var i = 0; i < spanError.length; i++) {
            spanError[i].textContent = "Duplicate Course";
        }
    } else {
        var id = searchInput.value;
        for (var i = 0; i < spanError.length; i++) {
            spanError[i].textContent = "";
        }


        for (var i = 0; i < students.length; i++) {

            if (students[i].id == id) {

                console.log(course1.value);
                console.log(course2.value);
                console.log(course3.value);

                students[i].course1 = course1.value;
                students[i].course2 = course2.value;
                students[i].course3 = course3.value;

                for (var j = 0; j < courses.length; j++) {

                    if (students[i].course1 == courses[j].name) {
                        students[i].course1 = courses[j].id;
                    }
                    if (students[i].course2 == courses[j].name) {
                        students[i].course2 = courses[j].id;
                    }
                    if (students[i].course3 == courses[j].name) {
                        students[i].course3 = courses[j].id;
                    }
                }

                student = students[i];

                break;
            }


        }


    }

    console.log(student)
    // Set the URL of the Django REST Framework endpoint, including the primary key
    var url = "http://127.0.0.1:8000/api/update-student/" + student.id + "/";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    })
        .then(function (response) {
            if (response.ok) {
                alert("Student updated successfully!");
            } else {
                throw new Error("Error updating student: " + response.status);
            }
        })
        .catch(function (error) {
            console.error(error);
        });

    console.log(student)

});

retrieveCourses();
retrieveStudents();
