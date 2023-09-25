// Function to insert a new student
const InsertStudents = document.getElementById('insert-students');
const students = [];

function Conditions() {
    // Get input values
    const NumberStudent = parseInt(document.getElementById('Number').value);
    const Name = document.getElementById('Name').value.trim();
    const Age = parseInt(document.getElementById('Age').value);
    const MathMark = parseInt(document.getElementById('MathMark').value);
    const HistoryMark = parseInt(document.getElementById('HistoryMark').value);
    const ScienceMark = parseInt(document.getElementById('ScienceMark').value);
    if (
        isNaN(NumberStudent) ||
        isNaN(Age) ||
        isNaN(MathMark) ||
        isNaN(HistoryMark) ||
        isNaN(ScienceMark) ||
        Name === ''
    ) {
        alert('Please fill in all fields.');
        return false;
    } else if (NumberStudent <= 0) {
        alert('Number must be greater than 0');
        return false;
    } else if (
        MathMark < 0 || MathMark > 100 ||
        HistoryMark < 0 || HistoryMark > 100 ||
        ScienceMark < 0 || ScienceMark > 100
    ) {
        alert('Marks must be between 0 and 100');
        return false;
    } else if (Age < 18 || Age > 60) {
        alert('Age must be between 18 and 60');
        return false;
    }
}

InsertStudents.addEventListener('click', () => {
    // Get input values
    const NumberStudent = parseInt(document.getElementById('Number').value);
    const Name = document.getElementById('Name').value.trim();
    const Age = parseInt(document.getElementById('Age').value);
    const MathMark = parseInt(document.getElementById('MathMark').value);
    const HistoryMark = parseInt(document.getElementById('HistoryMark').value);
    const ScienceMark = parseInt(document.getElementById('ScienceMark').value);


    // Check if student with the same NumberStudent already exists
    const existingStudent = students.find((student) => student.NumberStudent === NumberStudent);
    // Input restrictions
    if (existingStudent) {
        alert('The student already exists');
        return false;
    } else if (Conditions() == false) {
        return 0
    }

    // Create a new student object
    const newStudent = {
        NumberStudent,
        Name,
        Age,
        MathMark,
        HistoryMark,
        ScienceMark,
    };

    // Add the new student to the array
    students.push(newStudent);

    // Clear input fields
    clear();

    // Update the table
    addToTable();
});

// Clear input value
function clear() {
    document.getElementById('Number').value = '';
    document.getElementById('Name').value = '';
    document.getElementById('Age').value = '';
    document.getElementById('MathMark').value = '';
    document.getElementById('HistoryMark').value = '';
    document.getElementById('ScienceMark').value = '';
}

// Add students to the table
function addToTable() {
    const table = document.getElementById('student-table');

    // Clear existing rows in the table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Sort students by Name
    students.sort((a, b) => (a.Name > b.Name ? 1 : -1));

    // Add students to the table
    students.forEach((student, i) => {
        const row = table.insertRow();
        row.innerHTML = `
        <tr>
            <td>${student.NumberStudent}</td>
            <td>${student.Name}</td>
            <td>${student.Age}</td>
            <td>${student.MathMark}</td>
            <td>${student.HistoryMark}</td>
            <td>${student.ScienceMark}</td>
            <td><button class="btn btn-danger py-0" onclick="deleteRow(${i + 1})">delete</button></td>
            <td>
            <button class="btn btn-info py-0" onclick="editRow(${i + 1 })">Edit</button>
            </td>
            <td>${studentStatus(student)}</td>
        <tr>
        `;
    });
}

// Delete Row
function deleteRow(index) {
    const table = document.getElementById('student-table');
    if (index > 0 && index < table.rows.length) {
        students.splice(index - 1, 1);
        table.deleteRow(index);
        addToTable();
    }
}
// const table = document.getElementById('student-table');
// let row = table.rows[1]
function editRow(index) {
    let NumberStudent = document.getElementById('Number')
    let Name = document.getElementById('Name')
    let Age = document.getElementById('Age')
    let MathMark = document.getElementById('MathMark')
    let HistoryMark = document.getElementById('HistoryMark')
    let ScienceMark = document.getElementById('ScienceMark')
    let studentToEdit = students[index - 1];
    let table = document.getElementById('student-table')
    NumberStudent.value = studentToEdit.NumberStudent;
    Name.value = studentToEdit.Name;
    Age.value = studentToEdit.Age;
    MathMark.value = studentToEdit.MathMark;
    HistoryMark.value = studentToEdit.HistoryMark;
    ScienceMark.value = studentToEdit.ScienceMark;
    // Add a "Save" button to confirm the modification
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "btn btn-success py-0";
    saveButton.onclick = function() {
        let updatedNumberStudent = parseInt(NumberStudent.value);
        let updatedName = Name.value.trim();
        let updatedAge = parseInt(Age.value);
        let updatedMathMark = parseInt(MathMark.value);
        let updatedHistoryMark = parseInt(HistoryMark.value);
        let updatedScienceMark = parseInt(ScienceMark.value);

        // Check if the updated NumberStudent already exists
        const existingStudent = students.find((student, idx) => idx !== index - 1 && student.NumberStudent === updatedNumberStudent);

        // Input restrictions for updates
        if (existingStudent) {
            alert("The student already exists");
            return;
        } else if (Conditions() === false) {
            return;
        }

        // Update the student's data
        studentToEdit.NumberStudent = updatedNumberStudent;
        studentToEdit.Name = updatedName;
        studentToEdit.Age = updatedAge;
        studentToEdit.MathMark = updatedMathMark;
        studentToEdit.HistoryMark = updatedHistoryMark;
        studentToEdit.ScienceMark = updatedScienceMark;

        // Update the table row
        updateTableRow(index);

        // Clear the input fields and remove the save button
        clear();
        editCell.removeChild(saveButton);
    };

    // Add the save button to the cell
    let editCell = document.getElementById("student-table").rows[index].cells[7];
    editCell.appendChild(saveButton);
}

function updateTableRow(index) {
    let studentToEdit = students[index - 1];
    let row = document.getElementById("student-table").rows[index];
    row.cells[0].innerHTML = studentToEdit.NumberStudent;
    row.cells[1].innerHTML = studentToEdit.Name;
    row.cells[2].innerHTML = studentToEdit.Age;
    row.cells[3].innerHTML = studentToEdit.MathMark;
    row.cells[4].innerHTML = studentToEdit.HistoryMark;
    row.cells[5].innerHTML = studentToEdit.ScienceMark;
    row.cells[8].innerHTML = studentStatus(studentToEdit)
}



// Check student status
function studentStatus(student) {
    const avgMark = (student.MathMark + student.HistoryMark + student.ScienceMark) / 3;
    if (student.MathMark < 50 || student.HistoryMark < 50 || student.ScienceMark < 50 || avgMark < 60) {
        return '<span style="color: #ffc107;">Fail</span>';
    } else {
        return '<span style="color: green;">Success</span>';
    }
}



// Button Avg && Find 
const selectMaterial = document.getElementById('select-material')
    // CalcAvg Function 
const calcAvg = document.getElementById('calc-avg')
calcAvg.addEventListener('click', () => {
        const selectedSubject = document.getElementById('avg-select').value;
        if (students.length == 0) {
            alert(`No students added yet`)
            return false
        } else if (students.length == 1) {
            alert(`There is only one student`)
            return false
        } else if (selectMaterial.selected) {
            alert(`Please select a Material`)
        } else {
            let totalMarks = 0;
            students.forEach(student => {
                totalMarks += student[selectedSubject];
            });
            const avg = totalMarks / students.length;
            document.getElementById("avg-result").textContent = `The Average of the ${selectedSubject}: ${avg.toFixed(2)}`;
        }
    })
    // find Highest Mark
const highestMark = document.getElementById('highestMark')
highestMark.addEventListener('click', () => {
    const selectedSubject = document.getElementById("avg-select").value;
    const studentsWithHighestMark = students.filter(student => student[selectedSubject] === Math.max(...students.map(s => s[selectedSubject])));
    if (studentsWithHighestMark.length > 0) {
        const highestMark = studentsWithHighestMark[0][selectedSubject];
        let message;
        if (studentsWithHighestMark.length === 1) {
            message = `${studentsWithHighestMark[0].Name} received the highest mark in ${selectedSubject} with a value of ${highestMark}`;
        } else {
            const studentNames = studentsWithHighestMark.map(student => student.Name).join('\n');
            message = `${studentNames}\n They got the highest mark in ${selectedSubject} with a value of ${highestMark}`;
        }
        alert(message);
    } else if (selectMaterial.selected) {
        alert(`Please select a Material`)
    } else {
        alert(`No students added yet`);
    }
})

// CheckBox
// Show && hide the calcAvg button
const avgCheckbox = document.getElementById('avg-checkbox')
avgCheckbox.addEventListener('change', () => {
        const calcAvg = document.getElementById("calc-avg");
        if (avgCheckbox.checked) {
            calcAvg.style.display = "inline";
        } else {
            calcAvg.style.display = "none";
            document.getElementById("avg-result").textContent = "";
        }
    })
    //Show & Hiding failing students'
const hiddenFailingStudents = document.getElementById('hidden-failing-students');
hiddenFailingStudents.addEventListener('change', () => {
    const hiddenFailing = hiddenFailingStudents.checked;
    const table = document.getElementById('student-table');
    const rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const student = students[i - 1];
        const row = rows[i];
        if (hiddenFailing) {
            const avgMark = (student.MathMark + student.HistoryMark + student.ScienceMark) / 3;
            if (student.MathMark < 50 || student.HistoryMark < 50 || student.ScienceMark < 50 || avgMark < 60) {
                row.style.display = 'none';
            } else {
                row.style.display = 'table-row';
            }
        } else {
            row.style.display = 'table-row';
        }
    }
    hiddenFailing ? failingStudentsLabel.textContent = 'Show failing students' : failingStudentsLabel.textContent = 'Hiding failing students';
});

//  Record name entries and make the first letter of each word Capitalize
Name.addEventListener('input', () => {
    let words = Name.value.split(' ');
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== '') {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    }
    Name.value = words.join(' ');
    let regex = /^[A-Za-z\s]+$/;
    if (!regex.test(Name.value)) {
        Name.value = Name.value.replace(/[^A-Za-z\s]/g, '');
    }
})