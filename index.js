const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "frian", password: "student123", role: "student" },
  { username: "gabriel", password: "student123", role: "student" },
  { username: "eloisa", password: "student123", role: "student" },
  { username: "jeremiah", password: "student123", role: "student" },
  { username: "kyle", password: "student123", role: "student" }
];

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

document.addEventListener("DOMContentLoaded", () => {
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-info").textContent = `Logged in as: ${currentUser.username.toUpperCase()} (${currentUser.role.toUpperCase()})`;

  const formPanel = document.getElementById("form-panel");
  const scheduleForm = document.getElementById("schedule-form");
  const scheduleTable = document.getElementById("schedule-table").querySelector("tbody");
  const logoutButton = document.getElementById("logout-button");

  if (currentUser.role === "admin") {
    formPanel.style.display = "none";
  }

  function renderSchedules() {
    scheduleTable.innerHTML = "";

    schedules.forEach((sched, index) => {
      // student lang makakakita ng mga sched na ginawa nila!
      if (currentUser.role === "admin" || sched.owner === currentUser.username) {
        const row = scheduleTable.insertRow();

        row.insertCell().textContent = sched.faculty;
        row.insertCell().textContent = sched.course;
        row.insertCell().textContent = sched.room;
        row.insertCell().textContent = `${sched.startTime} - ${sched.endTime}`;
        row.insertCell().textContent = sched.employment;
        row.insertCell().textContent = sched.units;
        row.insertCell().textContent = sched.cluster;
        row.insertCell().textContent = sched.owner;

        const actionsCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          schedules.splice(index, 1);
          localStorage.setItem("schedules", JSON.stringify(schedules));
          renderSchedules();
        };
        actionsCell.appendChild(deleteBtn);
      }
    });
  }

  renderSchedules();

  if (scheduleForm) {
    scheduleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newSchedule = {
        room: document.getElementById("room-type").value,
        course: document.getElementById("student").value,
        faculty: document.getElementById("faculty").value,
        employment: document.getElementById("employment").value,
        startTime: document.getElementById("start-time").value,
        endTime: document.getElementById("end-time").value,
        cluster: document.getElementById("cluster").value,
        units: document.getElementById("units").value,
        owner: currentUser.username
      };

      schedules.push(newSchedule);
      localStorage.setItem("schedules", JSON.stringify(schedules));
      scheduleForm.reset();
      renderSchedules();
    });
  }

  // Logout button!
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
});
