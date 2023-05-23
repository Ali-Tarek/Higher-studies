fetch(`http://127.0.0.1:8000/Courses/`)
  .then(response => response.json())
  .then(data => {

    let coursed;
    coursed += `<option  hidden id="c1" >Choose your course</option>`;
    for (let i = 0; i < data.length; i++) {
      coursed += `<option value="${data[i]}">${data[i]}</option>`;
    }
    document.getElementById("course-1").innerHTML = coursed;
    document.getElementById("course-2").innerHTML = coursed
    document.getElementById("course-3").innerHTML = coursed

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
var stdCourses;
fetch('http://127.0.0.1:8000/CoursesOnly/')
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    stdCourses = data;

    // Perform further processing with the courses data
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });


function DeleteItem() {
  let flag = confirm('Are you sure you want to delete this student?');
  if (flag) {
    let id = document.getElementById('ID').value;

    $.ajax({
      url: 'http://127.0.0.1:8000/delete-student/',
      type: 'POST',
      data: {
        student_id: id // Replace with the actual student ID you want to delete
      },
      success: function (response) {
        alert(response.message); // Success message
      },
      error: function (xhr, status, error) {
        console.error(error); // Error message
      }
    });
  }
}





function searchbyid() {

  var objectId = document.getElementById('ID').value;
  fetch(`http://127.0.0.1:8000/Students/${objectId}/`)
    .then(response => response.json())
    .then(data => {

      // Handle the response data
      const course = data.courses;
      stdCourses = course;
      console.log(data);
      if (data.detail != 'Student not found' && data.error != "Student not found") {

        document.getElementById("fname").value = data.firstName;
        document.getElementById("lname").value = data.lastName;
        document.getElementById("dob").value = data.dob;
        document.getElementById("course-1").value = course[0].name;
        document.getElementById("course-2").value = course[1].name;
        document.getElementById("course-3").value = course[2].name;
        document.getElementById("dep").value = data.department;
        document.getElementById("dep").innerText = data.department;
        document.getElementById("uni").value = data.university;
        document.getElementById("un").innerText = data.university;
        let gender = data.gender;
        if (gender == "M") {
          document.getElementById("male").checked = true;
        }
        else if (gender == "F") {
          document.getElementById("female").checked = true;
        }
        let status = data.status;
        if (status == "A") {
          document.getElementById("active").checked = true;
        }
        else if (status == "I") {
          document.getElementById("inactive").checked = true;
        }
      }
      else {
        alert("Student not found");
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);

    });




}
function isempty() {
  if (!document.getElementById("ID").value) {
    return true;
  }
  return false;

}

function SetData() {
  console.log(stdCourses);
  const studentId = document.getElementById("ID").value;



  if (isempty()) {
    return;
  }
  let c1 = document.getElementById("course-1").value;
  let c2 = document.getElementById("course-2").value;
  let c3 = document.getElementById("course-3").value;
  if (c1 == c2 || c1 == c3 || c2 == c3) {
    alert("Duplicated Course");
    return;
  }
  let flag = confirm("Are you Sure?");

  if (flag) {
    let c1 = document.getElementById("course-1").value;
    let c2 = document.getElementById("course-2").value;
    let c3 = document.getElementById("course-3").value;
    for (let i = 0; i < stdCourses.length; i++) {
      if (c1 == stdCourses[i].name) {
        c1 = stdCourses[i].id;
      }
      if (c2 == stdCourses[i].name) {
        c2 = stdCourses[i].id;
      }
      if (c3 == stdCourses[i].name) {
        c3 = stdCourses[i].id;
      }
    }
    console.log(c1);
    console.log(c2);
    console.log(c3);

    var studentData = {
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      dob: document.getElementById("dob").value,
      course1: c1, // Send the course ID directly
      course2: c2, // Send the course ID directly
      course3: c3,
      department: document.getElementById("dp").value,
      university: document.getElementById("uni").value,
    };
    if (document.getElementById("male").checked == true) {
      studentData.gender = "M";
    } else {
      studentData.gender = "F";
    }
    if (document.getElementById("active").checked == true) {
      studentData.status = "A";
    } else {
      studentData.status = "I";
    }


    // Set the URL of the Django REST Framework endpoint, including the primary key
    var url = "http://127.0.0.1:8000/api/update-student/" + studentId + "/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
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
  }



}

/*function DeleteItem(){
    if(isempty()){
        return;
    }
    let flag=confirm("Are you Sure?");
    if(flag){
        let value=document.getElementById("ID").value;
        let students=JSON.parse(window.localStorage.getItem("students"));
        students=students.filter((student)=>student.ID!=value);
        window.localStorage.setItem("students", JSON.stringify(students));
    }
}

const fname = document.getElementById("fname");
const fname_validity = document.getElementById("fnameValid")
fname.addEventListener("input" , ()=>{
    if(containsNumbers(fname.value) ||  fname.value.length <3)
    {
        fname_validity.style.display="block";
    }
    else
    {
        fname_validity.style.display="none";
    }
})
*/
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




const Uni = document.getElementById("uni");
const Uni_validity = document.getElementById("UniValid")
Uni.addEventListener("input", () => {
  if (containsNumbers(Uni.value) || Uni.value.length < 5) {
    Uni_validity.style.display = "block";
  }
  else {
    Uni_validity.style.display = "none";
  }
})


