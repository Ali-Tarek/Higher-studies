function WriteTable() {
    var render = "<table class = \"courses\">";
    render += "<thead><tr><th>Course Name</th><th>Course ID</th><th>Number of hours</th><th>Department</th><th>Lecture Day</th><th>Hall Number</th></thead>";
    render+="<tbody>";
    var data = JSON.parse(localStorage.getItem('courses'));
    for (i = 0; i < data.length; i++) {
        render += "<tr><td>" + data[i].name + "</td><td>" + data[i].id + " </td>";
        render += "<td>" + data[i].numberOfHours + "</td>";
        render += "<td>" + data[i].department + "</td>";
        render += "<td>" + data[i].lectureDay + "</td>";
        render += "<td>" + data[i].hallNumber + "</td>";
    }
    render+="</tbody></table>";
    dynamictable.innerHTML = render; 
}

WriteTable();