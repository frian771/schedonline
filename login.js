document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "frian", password: "student123", role: "student" },
    { username: "gabriel", password: "student123", role: "student" },
    { username: "eloisa", password: "student123", role: "student" },
    { username: "jeremiah", password: "student123", role: "student" },
    { username: "kyle", password: "student123", role: "student" }
  ];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
});
