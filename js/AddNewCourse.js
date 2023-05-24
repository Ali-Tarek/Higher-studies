/* Add New Course Section */
const addBtn = document.getElementById('addCourse');

function createErrorMsg(msg, wrapper){
    let errorMsg = document.createElement('span');
    errorMsg.classList.add('error');
    errorMsg.textContent = msg;
    if(wrapper.children.length == 1){
        wrapper.appendChild(errorMsg);
    }
}

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    fetch('http://127.0.0.1:8000/courses/')
    .then((response)=>{
        return response.json();
    })
    .then((courses) =>{
        // console.log(courses)
        createCourse(courses);
    })
    .catch((error) =>{
        consolel.log(error);
    })
   
})

function createCourse(courses){
    const fields = document.forms[0].elements;
    let isValid = true;
    
    document.querySelectorAll('.error').forEach((error)=>{
        error.remove();
    })

    
    for(let field of fields){
        if(field.value == ""){
            createErrorMsg("Please Fill This Field", field.parentNode);
            isValid = false;
        }
    }

    if(courses.length != 0){
        for(let course of courses){
            if(course.id === fields['id'].value){
                createErrorMsg("Duplicate ID", fields['id'].parentNode);
                isValid = false;
                break;
            }
        }
    }

    if(fields['name'].value.length < 3){
        createErrorMsg("Name should be at least 3 character", fields['name'].parentNode);
        isValid = false;
    }

    if(Number(fields['numberOfHours'].value) <= 0 || Number(fields['numberOfHours'].value) > 4){
        createErrorMsg("Invalid Number of Hours {1, 4}", fields['numberOfHours'].parentNode);
        isValid = false;
    }
    
    if(Number(fields['hallNumber'].value) < 0 ){
        createErrorMsg("Invalid Hall Number", fields['hallNumber'].parentNode);
        isValid = false;
    }

    if(!isValid){
        return;
    }

    let formData = new FormData(document.forms[0]);
    let newCourse = {};
    formData.forEach((value, key)=>{
        newCourse[key] = value;
    });
    


    fetch('http://127.0.0.1:8000/courses/create', {
        method: 'POST',
        body: JSON.stringify(newCourse),
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then((response) =>{
        return response.json();
    })
    .then((message) =>{
        // console.log(message);
        document.forms[0].reset();
        alert("New Course Added");
    })
    .catch((error) =>{
        console.log(error);
    });




}
/* Add New Course Section */

