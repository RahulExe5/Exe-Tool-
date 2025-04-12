const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const dashboardBtn = document.querySelector(".dashboard-btn");
const toolButtons = document.querySelectorAll(".tool-btn");
const mainContent = document.querySelector(".main-content");
const themeToggle = document.getElementById("themeToggle");
const pageTitle = document.getElementById("pageTitle");

// Custom tool names and URLs
const toolPages = [
  { name: "GUEST.dat to .json", url: "tools/guestcombiner/index.html" },
  { name: "BAN Checker", url: "tools/banchecker/index.html" },
  ];

function loadDashboard() {
  mainContent.innerHTML = `
    <h1>Welcome to Tool Hub</h1>
    <p class="description">
      Tool Hub is your one-stop dashboard to access all your tools in one place. Click the menu icon to get started!
    </p>
    <p class="credit">
      Developed by <a href="https://instagram.com/rahulexez" target="_blank">@rahulexez</a>
    </p>
  `;
  pageTitle.innerText = "Tool Hub"; // Reset title
}

// Load dashboard by default
loadDashboard();
document.body.classList.remove("light");
themeToggle.innerText = "🌑 Dark";

// Sidebar toggle
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Dashboard click
dashboardBtn.addEventListener("click", () => {
  loadDashboard();
  sidebar.classList.add("hidden");
});

// Tool button clicks
toolButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const tool = toolPages[index];
    if (tool) {
      mainContent.innerHTML = `
        <div class="loader-wrapper">
          <div class="loader"></div>
          <p>Loading ${tool.name}...</p>
        </div>
        <iframe id="toolFrame" src="${tool.url}" frameborder="0" style="width:100%; height:100vh; display:none;"></iframe>
      `;

      pageTitle.innerText = tool.name; // Update title

      const iframe = document.getElementById("toolFrame");
      iframe.onload = () => {
        document.querySelector(".loader-wrapper").style.display = "none";
        iframe.style.display = "block";
      };
    } else {
      mainContent.innerHTML = `<p>Tool not found.</p>`;
    }
    sidebar.classList.add("hidden");
  });
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.innerText = "🌕 Light";
  } else {
    themeToggle.innerText = "🌑 Dark";
  }
});