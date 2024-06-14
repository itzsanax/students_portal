// ensuring that the code only runs after the html is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // getting necessary elements from the dom
    const studentForm = document.getElementById("studentForm"); // he form where students will register
    const studentTableBody = document.querySelector("#studentTable tbody"); // the body of the table where registered students will be displayed
  //getting the list of students from the local storage and setting it to an epmty array if no data is found
    let students = JSON.parse(localStorage.getItem("students") || "[]");


    // function to render the list of students in the table
    const renderStudents = () => {
        studentTableBody.innerHTML = ""; // clearing the table body before rendering new data
        students.forEach((student, index) => {
            // creating a row for each student and populating it with student data
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.studentClass}</td>
                <td>${student.rollNo}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>`;
            studentTableBody.appendChild(row); // Adding the row to the table body
        });
    };

    // function to save students data to local storage
    const saveStudents = () => {
        localStorage.setItem("students", JSON.stringify(students));
    };

    // event listener for form submission
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // preventing the default form submission behavior

         // extracting form input values
        const name = studentForm.studentName.value.trim();
        const id = studentForm.studentID.value.trim();
        const studentClass = studentForm.studentClass.value.trim();
        const rollNo = studentForm.rollNo.value.trim();
        const email = studentForm.email.value.trim();
        const contact = studentForm.contactNo.value.trim();


        // validating form inputs
        if (name === "" || id === "" || studentClass === "" || rollNo === "" || email === "" || contact === "") {
            alert("All fields are required!");   // alerting the user if any field is empty
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert("Student's name must contain only letters and spaces."); // alerting the user if the name contains invalid characters
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert("Student ID must contain only numbers."); // alerting the user if the student ID contains non-numeric characters
            return;
        }

        if (!/^\d+$/.test(rollNo)) {
            alert("Roll number must contain only letters and numbers."); // alerting the user if the roll-no contains non-numeric characters
            return;
        }

        if (!/^\d+$/.test(contact)) {
            alert("Contact number must contain only numbers."); // alerting the user if the contact number contains non-numeric characters
            return;
        }

        // creating a new student object and adding it to the students array
        students.push({ name, id, studentClass, rollNo, email, contact });
        saveStudents();  // saving the updated list of students to local storage
        renderStudents();  // rendering the updated student list

        studentForm.reset();  // resetting the form fields
    });


    // function to editing a student's details
    window.editStudent = (index) => {
        const student = students[index]; // getting the selected student's data
        // updating form fields with the selected student's data for editing
        studentForm.studentName.value = student.name;
        studentForm.studentID.value = student.id;
        studentForm.studentClass.value = student.studentClass;
        studentForm.rollNo.value = student.rollNo;
        studentForm.email.value = student.email;
        studentForm.contactNo.value = student.contact;

        students.splice(index, 1);  // removing the selected student from the list
        saveStudents();  //saving the updated list of students to local storage
        renderStudents();  //rendering the updated student list
    };

    // Function to delete a student
    window.deleteStudent = (index) => {
        students.splice(index, 1);  // removing the selected student from the list
        saveStudents();  //saving the updated list of students to local storage
        renderStudents();  //rendering the updated student list
    };


   // calling the function to render the student list when the page loads
    renderStudents();
});
