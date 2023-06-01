function WriteTable() {
    var render = "<table class = \"courses\">";
    render += "<thead><tr><th>Course Name</th><th>Course ID</th><th>Number of hours</th><th>Department</th><th>Lecture Day</th><th>Hall Number</th></thead>";
    render += "<tbody>";
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            for (i = 0; i < data.length; i++) {
                render += "<tr><td>" + data[i].name + "</td><td>" + data[i].id + " </td>";
                render += "<td>" + data[i].hours + "</td>";
                render += "<td>" + data[i].department + "</td>";
                render += "<td>" + data[i].day + "</td>";
                render += "<td>" + data[i].hallnumber + "</td>";
            }
            render += "</tbody></table>";
            var dynamictable = document.getElementById("dynamictable");
            dynamictable.innerHTML = render;

        }
    };
    //var data = JSON.parse(localStorage.getItem('courses'));

    myRequest.open('GET', 'http://127.0.0.1:8000/courses/', true);
    myRequest.send();
}

function search() {
    var cName = document.getElementById("search1");
    var filter = cName.value.toUpperCase();
    var table = document.getElementsByClassName("courses")[0];
    var rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const data = rows[i].getElementsByTagName("td");

        if (data) {
            if (filter === '') {
                // Display the row using the original display value
                rows[i].style.display = rows[i].getAttribute('data-original-display');
            } else if (filter === data[0].textContent.toUpperCase()) {
                // Save the original display value if it's not already saved
                if (!rows[i].hasAttribute('data-original-display')) {
                    rows[i].setAttribute('data-original-display', rows[i].style.display);
                }
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}


WriteTable();