let courses=JSON.parse(window.localStorage.getItem("courses"));
let std=[];

//window.localStorage.setItem('20210087', JSON.stringify(student2));
let coursed;
coursed+=`<option  hidden id="c1" >Choose your course</option>`;
if(courses.length){
    for(let course of courses){
        coursed += `<option value="${course.name}">${course.name}</option>`;
    }
    document.getElementById("course-1").innerHTML=coursed;

}
let coursed1;
coursed1+=`<option  hidden id="c2" >Choose your course</option>`;
if(courses.length){
    for(let course of courses){
        coursed1 += `<option value="${course.name}">${course.name}</option>`;
    }
    document.getElementById("course-2").innerHTML=coursed1;
}
let coursed2;
coursed2+=`<option  hidden id="c3" >Choose your course</option>`;
if(courses.length){
    for(let course of courses){
        coursed2 += `<option value="${course.name}">${course.name}</option>`;
    }
    document.getElementById("course-3").innerHTML=coursed2;
}

function searchbyid(){ 
    let value=document.getElementById("ID").value;
    let std=JSON.parse(localStorage.getItem("students"));
    for (let i = 0; i < std.length; i++){
        if(std[i].ID==value){
            document.getElementById("fname").value=std[i].fname;
            document.getElementById("lname").value=std[i].lname;
            document.getElementById("dob").value=std[i].Date;
            document.getElementById("course-1").value=std[i].Course_1;
            document.getElementById("course-2").value=std[i].course_2 ;
            document.getElementById("c3").value=std[i].course_3;
            document.getElementById("c3").innerText=std[i].course_3;
            document.getElementById("dep").value=std[i].Dept;
            document.getElementById("dep").innerText=std[i].Dept ;
            document.getElementById("uni").value=std[i].Uni;
            console.log(document.getElementById("un").value);
            document.getElementById("un").innerText=std[i].uni;
            let gender=std[i].Gender ;
            if(gender=="Male"){
                document.getElementById("male").checked=true;
            }
            else if(gender=="Female"){
                document.getElementById("female").checked=true;
            }
            let status=std[i].Active;
            if(status=="Active"){
                document.getElementById("active").checked=true;
            }
            else if(status=="InActive"){
                document.getElementById("inactive").checked=true;
            }
        }
    }

}

function SetData() {
    let c1=document.getElementById("course-1").value;
    let c2=document.getElementById("course-2").value;
    let c3=document.getElementById("course-3").value;
    if(c1==c2 || c1==c3 || c2==c3){
        alert("Duplicated Course");
        return;
    }
    let flag=confirm("Are you Sure?");
    if(flag){
        let value = document.getElementById("ID").value;
        let students = JSON.parse(localStorage.getItem("students"));
        for (let i = 0; i < students.length; i++) {
            if (students[i].ID == value) {
                students[i].fname = document.getElementById("fname").value;
                students[i].lname = document.getElementById("lname").value;
                students[i].Date = document.getElementById("dob").value;
                students[i].Course_1 = document.getElementById("course-1").value;
                students[i].course_2  = document.getElementById("course-2").value;
                students[i].course_3  = document.getElementById("course-3").value;
                students[i].Dept = document.getElementById("dp").value;
                students[i].Uni  = document.getElementById("uni").value;
                
                if (document.getElementById("male").checked == true) {
                    students[i].Gender  = "Male";
                } else {
                    students[i].Gender  = "Female";
                }
                if (document.getElementById("active").checked == true) {
                    students[i].Active = "Active";
                } else {
                    students[i].Active = "InActive";
                }
                window.localStorage.setItem("students", JSON.stringify(students));
                break;
            }
        }
    }
}

function DeleteItem(){
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

const lname = document.getElementById("lname");
const lname_validity = document.getElementById("lnameValid")
lname.addEventListener("input" , ()=>{
    if(containsNumbers(lname.value) ||  lname.value.length <3)
    {
        lname_validity.style.display="block";
    }
    else
    {
        lname_validity.style.display="none";
    }
})


const ID = document.getElementById("ID");
const ID_validity = document.getElementById("IDValid")
ID.addEventListener("input" , ()=>{
    if(  ID.value.length !=8 || ID.value[0] !=2 || ID.value[1] !=0)
    {
        ID_validity.style.display="block";
    }
    else
    {
        ID_validity.style.display="none";
    }
})




const Uni = document.getElementById("uni");
const Uni_validity = document.getElementById("UniValid")
Uni.addEventListener("input" , ()=>{
    if( containsNumbers(Uni.value) || Uni.value.length < 5)
    {
        Uni_validity.style.display="block";
    }
    else
    {
        Uni_validity.style.display="none";
    }
})


