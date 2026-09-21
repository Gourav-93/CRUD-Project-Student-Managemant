const AUTH_API = "http://localhost:5230/api/auth";

async function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`${"http://localhost:5230/api/auth"}/reg`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();

      alert(errorText || "Registration failed");

      return;
    }

    alert("Registration successful!");

    window.location.href = "login.html";
  } catch (error) {
    console.error(error);

    alert("Backend se connection nahi ho raha.");
  }
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password");

    return;
  }

  const user = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();

      alert(errorText || "Invalid email or password");

      return;
    }

    const data = await response.json();

    // JWT token save
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    alert("Login successful!");

    // Student Management page
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);

    alert("Backend se connection nahi ho raha.");
  }
}
