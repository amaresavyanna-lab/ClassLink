// =============================================================
// 🕒 REAL-TIME CLOCK
// =============================================================
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;

  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  clockElement.textContent = now.toLocaleDateString('en-US', options);
}

// Start clock if clock element exists
setInterval(updateClock, 1000);
updateClock();


// =============================================================
// 👁️ TOGGLE PASSWORD VISIBILITY
// =============================================================
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");
  if (!passwordInput || !toggleIcon) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "👁️";
  }
}


// =============================================================
// 👥 DEMO USERS (TEMPORARY LOGIN DATA)
// =============================================================
const users = [
  { username: "student1", password: "1234", role: "student" },
  { username: "faculty1", password: "abcd", role: "faculty" }
];


// =============================================================
// 🔑 LOGIN FUNCTION
// =============================================================
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Hide login page
    const loginPage = document.getElementById("loginPage");
    if (loginPage) loginPage.style.display = "none";

    // Show dashboard based on role
    if (user.role === "student") {
      const studentDashboard = document.getElementById("studentDashboard");
      if (studentDashboard) studentDashboard.style.display = "flex";
    } else if (user.role === "faculty") {
      const facultyDashboard = document.getElementById("facultyDashboard");
      if (facultyDashboard) facultyDashboard.style.display = "flex";
    }

    // Clear any previous error message
    if (errorMsg) errorMsg.textContent = "";

    // Start clock on login
    updateClock();
    setInterval(updateClock, 1000);

  } else {
    if (errorMsg) errorMsg.textContent = "Invalid username or password.";
  }
}


// =============================================================
// 🚪 LOGOUT FUNCTION
// =============================================================
function logout() {
  // Hide both dashboards
  const studentDashboard = document.getElementById("studentDashboard");
  const facultyDashboard = document.getElementById("facultyDashboard");
  const loginPage = document.getElementById("loginPage");

  if (studentDashboard) studentDashboard.style.display = "none";
  if (facultyDashboard) facultyDashboard.style.display = "none";

  // Show login page again
  if (loginPage) loginPage.style.display = "flex";
}


// =============================================================
// 📂 SIDEBAR TOGGLE FUNCTION
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll('#menu-button');

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.toggle('active');
    });
  });

  // Attach login event only if form exists on the page
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }

  // Start clock automatically if a dashboard is open
  if (document.getElementById('facultyDashboard') || document.getElementById('studentDashboard')) {
    updateClock();
    setInterval(updateClock, 1000);
  }
});
