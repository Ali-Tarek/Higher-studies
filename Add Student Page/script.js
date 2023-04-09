const fname = document.getElementById("fname");
const fname_validity = document.getElementById("fnameValid")
fname.addEventListener("input" , ()=>{
    console.log(fname.value);
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




const Uni = document.getElementById("Uni");
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


