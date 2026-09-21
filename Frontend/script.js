// Authentication Guard
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const API_URL = "http://localhost:5230/api/Student";

async function getStudents() {
  try {
    const response = await fetch("http://localhost:5230/api/Student");

    if (!response.ok) {
      throw new Error("Failed to get students");
    }

    const students = await response.json();

    displayStudents(students);
  } catch (error) {
    console.error(error);

    alert("Backend se connection nahi ho raha.");
  }
}

function displayStudents(students) {
  const tableBody = document.getElementById("studentTableBody");

  tableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>

            <td>

                <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>
        `;

    tableBody.appendChild(row);
  });
}

async function addStudent() {
  const student = {
    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    age: Number(document.getElementById("age").value),

    course: document.getElementById("course").value,
  };

  if (!student.name || !student.email || !student.age || !student.course) {
    alert("Please fill all fields");

    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Failed to add student");
    }

    alert("Student added successfully");

    clearForm();

    getStudents();
  } catch (error) {
    console.error(error);

    alert("Student add nahi hua.");
  }
}

async function updateStudent() {
  const id = document.getElementById("studentId").value;

  const student = {
    id: Number(id),

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    age: Number(document.getElementById("age").value),

    course: document.getElementById("course").value,
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    alert("Student updated successfully");

    clearForm();

    getStudents();
  } catch (error) {
    console.error(error);

    alert("Student update nahi hua.");
  }
}

function saveStudent() {
  const id = document.getElementById("studentId").value;

  if (id) {
    updateStudent();
  } else {
    addStudent();
  }
}

async function editStudent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Student not found");
    }

    const student = await response.json();

    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("email").value = student.email;

    document.getElementById("age").value = student.age;

    document.getElementById("course").value = student.course;

    document.getElementById("formTitle").innerText = "Update Student";

    document.getElementById("saveButton").innerText = "Update Student";
  } catch (error) {
    console.error(error);

    alert("Student nahi mila.");
  }
}

async function deleteStudent(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?",
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    alert("Student deleted successfully");

    getStudents();
  } catch (error) {
    console.error(error);

    alert("Student delete nahi hua.");
  }
}

async function searchStudent() {
  const id = document.getElementById("searchId").value;

  if (!id) {
    alert("Please enter Student ID");

    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      alert("Student not found");

      return;
    }

    const student = await response.json();

    displayStudents([student]);
  } catch (error) {
    console.error(error);

    alert("Search failed.");
  }
}

function clearForm() {
  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("email").value = "";

  document.getElementById("age").value = "";

  document.getElementById("course").value = "";

  document.getElementById("formTitle").innerText = "Add Student";

  document.getElementById("saveButton").innerText = "Add Student";
}

window.onload = function () {
  getStudents();
};

// Logout Function
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  // Optional: Also remove the token if using JWT
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
