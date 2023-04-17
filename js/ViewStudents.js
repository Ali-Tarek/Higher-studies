var students = JSON.parse(localStorage.getItem("students"));
var displayedStudents = [...students];

function renderTableRows(students) {
    students.forEach(function (student, index) {
        var table = document.getElementsByTagName('tbody')[0];
        var row = table.insertRow();

        var nameCell = row.insertCell(0);
        var idCell = row.insertCell(1);
        var departmentCell = row.insertCell(2);
        var statusCell = row.insertCell(3);
        var actionsCell = row.insertCell(4);

        nameCell.innerHTML = `${student.fname} ${student.lname}`;
        idCell.innerHTML = student.ID;

        if (student.Dept === 'AI') {
            departmentCell.innerHTML = 'Artificial Intelligence';

        } else if (student.Dept === 'CS') {
            departmentCell.innerHTML = 'Computer Science';

        } else if (student.Dept === 'DS') {
            departmentCell.innerHTML = 'Decision Support';

        } else if (student.Dept === 'IS') {
            departmentCell.innerHTML = 'Information Systems';

        } else if (student.Dept === 'IT') {
            departmentCell.innerHTML = 'Information Technology';
        }

        if (student.Active === true) {
            statusCell.setAttribute('id', 'status-column');
            statusCell.innerHTML = '<i class="fa-solid fa-circle fa-2xs" style="color: #198754;"></i>Active';

        } else if (student.Active === false) {
            statusCell.setAttribute('id', 'status-column');
            statusCell.innerHTML = '<i class="fa-solid fa-circle fa-2xs" style="color: #dc3545;"></i>Inactive';
        }

        actionsCell.setAttribute('id', 'actions-column');
        actionsCell.innerHTML = `
        <td id="actions-column">
        <a href="../pages/EditStudent.html" class="edit-student"><i class="fa-solid fa-user-pen"
                style="color: #24527A;"></i></a>
        <a class="delete-student"><i class="fa-solid fa-trash" style="color: #dc3545;"></i></a>
        </td>
        `;
        var deleteButton = document.getElementsByClassName('delete-student')[index];
        deleteButton.addEventListener('click', function () {
            showDeleteModal(student);
        })
    })
}

function resetTableRows() {
    var table = document.getElementsByTagName('tbody')[0];
    table.innerHTML = '';
}

var searchInput = document.getElementById('search-field');
searchInput.addEventListener('input', function (event) {
    var filteredStudents = students.filter(function (student) {
        return JSON.stringify(student).toLowerCase().includes(event.target.value.toLowerCase());
    });

    displayedStudents = filteredStudents;
    resetTableRows();
    renderTableRows(filteredStudents);
});

function filterByDepartment() {
    var selectedValue = document.getElementById("filter-department").value;

    if (selectedValue === ' ') {
        displayedStudents = students;
        resetTableRows();
        renderTableRows(students);

    } else {
        var filteredStudents = students.filter(function (student) {
            return student.Dept === selectedValue;
        });

        displayedStudents = filteredStudents;
        resetTableRows();
        renderTableRows(filteredStudents);
    }
}

function filterByStatus() {
    var selectedValue = document.getElementById("filter-status").value;

    if (selectedValue === ' ') {
        displayedStudents = students;
        resetTableRows();
        renderTableRows(students);

    } else {
        var filteredStudents = students.filter(function (student) {
            return student.Active == selectedValue;
        });

        displayedStudents = filteredStudents;
        resetTableRows();
        renderTableRows(filteredStudents);
    }
}

function showDeleteModal(student) {
    var modal = document.getElementById('delete-modal');
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.setAttribute('student-id', student.ID);
}

function closeDeleteModal() {
    var modal = document.getElementById('delete-modal');
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.removeAttribute('student-id');
}

function showSuccessModal(student) {
    var modal = document.getElementById('success-modal');
    modal.classList.add('show');
    modal.classList.remove('hide');
}

function closeSuccessModal() {
    var modal = document.getElementById('success-modal');
    modal.classList.remove('show');
    modal.classList.add('hide');
}

function deleteStudent() {
    var modal = document.getElementById('delete-modal');
    var id = modal.getAttribute('student-id');

    students = students.filter(function (student) {
        return student.ID !== id;
    });

    displayedStudents = displayedStudents.filter(function (student) {
        return student.ID !== id;
    });

    localStorage.setItem("students", JSON.stringify(students));
    resetTableRows();
    renderTableRows(displayedStudents);
    closeDeleteModal();
}

renderTableRows(displayedStudents);
