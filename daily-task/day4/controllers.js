// Hamburger Menu
const menu = document.getElementById("mobile-menu");
const closeBtn = document.querySelector(".close-menu");

// Toggle menu saat klik hamburger
function toggleMenu() {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Tutup menu saat klik tombol close (ikon X)
closeBtn.addEventListener("click", () => {
  menu.style.display = "none";
});

// Tutup menu saat klik di luar area menu
document.addEventListener("click", function (e) {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickHamburger = e.target.closest(".hamburger");

  if (!isClickInsideMenu && !isClickHamburger && menu.style.display === "block") {
    menu.style.display = "none";
  }
});

// Tutup menu otomatis saat resize ke layar besar
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    menu.style.display = "none";
  }
});


// INPUT TYPE FILE FORM PROJECT
const input = document.getElementById("project-image");
const fileNameSpan = document.querySelector(".file-name");

input.addEventListener("change", function () {
  fileNameSpan.textContent = this.files[0] ? this.files[0].name : "No file chosen";
});
// Project Card
const projects = [];
function getData(e) {
  e.preventDefault();

  const name = document.getElementById("project-name").value;
  const start = Date.parse(document.getElementById("start-date").value);
  const end = Date.parse(document.getElementById("end-date").value);
  const desc = document.getElementById("desc").value;
  const node = document.getElementById("nodejs").checked;
  const react = document.getElementById("reactjs").checked;
  const next = document.getElementById("nextjs").checked;
  const typescript = document.getElementById("typescript").checked;
  const imageFile = document.getElementById("project-image").files[0];

  if (!name || !desc || !imageFile) {
    alert("Please fill all fields");
    return;
  }

  const duration = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));

  const reader = new FileReader();
  reader.onload = function (event) {
    const newProject = {
      name,
      duration,
      desc,
      techs: { node, react, next, typescript },
      img: event.target.result,
    };
    projects.push(newProject);
    renderCards();
  };

  reader.readAsDataURL(imageFile);
}

// Membatasi description di Card Project
function truncate(text, max) {
  return text.length > max ? text.substring(0, max) + "..." : text;
}

// RenderCard
function renderCards() {
  const container = document.getElementById("cardContainer");
  if (projects.length) {
    document.getElementById("project-section").style.display = "";
  }
  let html = "";

  projects.forEach((p) => {
    html += `
      <div class="col">
        <div class="card" id="konten">
          <img src="${p.img}" class="fixed-img" alt="${p.name}" />
          <div class="card-body">
            <h5 class="card-title">${p.name} - ${new Date().getFullYear()}</h5>
            <p class="card-time">durasi: ${p.duration} bulan</p>
            <p class="card-text">${truncate(p.desc, 100)}</p>
          </div>
          <div class="card-icon">
            ${p.techs.node ? '<img class="tech-icon" src="img/node.png" />' : ""}
            ${p.techs.react ? '<img class="tech-icon" src="img/react.png" />' : ""}
            ${p.techs.next ? '<img class="tech-icon" src="img/next.png" />' : ""}
            ${p.techs.typescript ? '<img class="tech-icon" src="img/typescript.png" />' : ""}
          </div>
          <div class="card-button">
            <button class="btn edit">edit</button>
            <button class="btn delete" onclick="getRemoveData(event)">delete</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function getRemoveData(event) {
  event.preventDefault();
  document.getElementById("konten").remove();
}
