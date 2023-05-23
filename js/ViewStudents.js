const xhr = new XMLHttpRequest();
const studentsData = [];
var tableBody = document.getElementsByTagName('tbody')[0];

xhr.open('GET', 'http://127.0.0.1:8000/students/');
xhr.responseType = 'json';

xhr.onload = function () {
    if (xhr.status === 200) {
        const students = xhr.response;

        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const studentData = [student.firstName, student.lastName, student.id, student.department, student.status];

            studentsData.push(studentData);
        }

        renderTableRows(studentsData);

    } else {
        console.error('Error retrieving student data');
    }
};

xhr.send();

function renderTableRows(studentsData) {
    for (let i = 0; i < studentsData.length; i++) {
        const studentData = studentsData[i];
        var row = tableBody.insertRow();
        var nameCell = row.insertCell(0);
        var idCell = row.insertCell(1);
        var departmentCell = row.insertCell(2);
        var statusCell = row.insertCell(3);
        var actionsCell = row.insertCell(4);

        nameCell.innerHTML = `${studentData[0]} ${studentData[1]}`;
        idCell.innerHTML = studentData[2];

        if (studentData[3] === 'AI') {
            departmentCell.innerHTML = 'Artificial Intelligence';

        } else if (studentData[3] === 'CS') {
            departmentCell.innerHTML = 'Computer Science';

        } else if (studentData[3] === 'DS') {
            departmentCell.innerHTML = 'Decision Support';

        } else if (studentData[3] === 'IS') {
            departmentCell.innerHTML = 'Information Systems';

        } else if (studentData[3] === 'IT') {
            departmentCell.innerHTML = 'Information Technology';
        }

        if (studentData[4] === 'A') {
            statusCell.setAttribute('id', 'status-column');
            statusCell.innerHTML = '<i class="fa-solid fa-circle fa-2xs" style="color: #198754;"></i>Active';

        } else if (studentData[4] === 'I') {
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
        var deleteButton = document.getElementsByClassName('delete-student')[i];
        deleteButton.addEventListener('click', function () {
            showDeleteModal(studentsData[i]);
        })
    }
}

function resetTableRows() {
    tableBody.innerHTML = '';
}

var searchInput = document.getElementById('search-field');
searchInput.addEventListener('input', function (event) {
    var searchedData = [];

    for (let i = 0; i < studentsData.length; i++) {
        const student = studentsData[i];

        if (student.join(',').toLowerCase().includes(event.target.value.toLowerCase())) {
            searchedData.push(student);
        }
    }

    resetTableRows();
    renderTableRows(searchedData);
});

function filterByDepartment() {
    var selectedValue = document.getElementById("filter-department").value;

    if (selectedValue === ' ') {
        resetTableRows();
        renderTableRows(studentsData);

    } else {
        var filteredStudents = [];

        for (let i = 0; i < studentsData.length; i++) {
            const student = studentsData[i];

            if (student[3] === selectedValue) {
                filteredStudents.push(student);
            }
        }

        resetTableRows();
        renderTableRows(filteredStudents);
    }
}

function filterByStatus() {
    var selectedValue = document.getElementById("filter-status").value;

    if (selectedValue === ' ') {
        resetTableRows();
        renderTableRows(studentsData);

    } else {
        var filteredStudents = [];

        for (let i = 0; i < studentsData.length; i++) {
            const student = studentsData[i];

            if (student[4] === selectedValue) {
                filteredStudents.push(student);
            }
        }

        resetTableRows();
        renderTableRows(filteredStudents);
    }
}

function showDeleteModal(student) {
    var modal = document.getElementById('delete-modal');
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.setAttribute('student-id', student[2]);
}

function closeDeleteModal() {
    var modal = document.getElementById('delete-modal');
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.removeAttribute('student-id');
}

function showSuccessModal() {
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
    const modal = document.getElementById('delete-modal');
    const id = modal.getAttribute('student-id');

    axios.delete('http://127.0.0.1:8000/delete-with-pk/' + id + '/')
        .then(response => {
            closeDeleteModal();
            showSuccessModal();

            axios.get('http://127.0.0.1:8000/students/')
                .then(response => {
                    const updatedStudentsData = [];

                    for (let i = 0; i < response.data.length; i++) {
                        const updatedStudent = response.data[i];
                        const updatedStudentData = [updatedStudent.firstName, updatedStudent.lastName, updatedStudent.id, updatedStudent.department, updatedStudent.status];

                        updatedStudentsData.push(updatedStudentData);
                    }

                    resetTableRows();
                    renderTableRows(updatedStudentsData);
                })
                .catch(error => {
                    console.error('Error fetching the updated list of students.');
                });
        })
        .catch(error => {
            console.error('Error deleting the student.');
        });
}