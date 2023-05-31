function WriteTable() {
    var render = "<table class = \"courses\">";
    render += "<thead><tr><th>Course Name</th><th>Course ID</th><th>Number of hours</th><th>Department</th><th>Lecture Day</th><th>Hall Number</th></thead>";
    render+="<tbody>";
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            for (i = 0; i < data.length; i++) {
                render += "<tr><td>" + data[i].name + "</td><td>" + data[i].id + " </td>";
                render += "<td>" + data[i].numberOfHours + "</td>";
                render += "<td>" + data[i].department + "</td>";
                render += "<td>" + data[i].lectureDay + "</td>";
                render += "<td>" + data[i].hallNumber + "</td>";
            }
            render+="</tbody></table>";
            var dynamictable = document.getElementById("dynamictable");
            dynamictable.innerHTML = render;
        }
    };
    //var data = JSON.parse(localStorage.getItem('courses'));

    myRequest.open('GET', 'http://127.0.0.1:8000/courses/',true);
    myRequest.send();
}

function search(){
    var cName = document.getElementById("search1");
    var filter = cName.nodeValue.toUpperCase();
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const data = rows[i].getElementsByTagName("td");

        if (filter == data[0].textContent.toUpperCase()){
            rows[i].style.display = "";
        }
        else{
            rows[i].style.display = "none";
        }
    }
}

WriteTable();