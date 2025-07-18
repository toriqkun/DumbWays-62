// INPUT TYPE FILE FORM PROJECT
const input = document.getElementById("project-image");
const fileNameSpan = document.querySelector(".file-name");

input.addEventListener("change", function () {
  fileNameSpan.textContent = this.files[0] ? this.files[0].name : "No file chosen";
});

// Project Script
// Inisialisasi projects dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Render project yang sudah ada saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  if (projects.length > 0) renderCards();
});

// Event submit form
let editIndex = null;
function getData(e) {
  e.preventDefault();

  // Ambil nilai form
  const name = document.getElementById("project-name").value;
  const start = Date.parse(document.getElementById("start-date").value);
  const end = Date.parse(document.getElementById("end-date").value);
  const desc = document.getElementById("desc").value;
  const node = document.getElementById("nodejs").checked;
  const react = document.getElementById("reactjs").checked;
  const next = document.getElementById("nextjs").checked;
  const typescript = document.getElementById("typescript").checked;
  const imageFile = document.getElementById("project-image").files[0];

  // Validasi form
  if (!name || !desc || !imageFile || isNaN(start) || isNaN(end)) {
    alert("Please fill all fields correctly.");
    return;
  }

  // Hitung durasi
  const duration = isNaN(start) || isNaN(end) ? projects[editIndex]?.duration : Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));

  const handleUpdateProject = (base64Img) => {
    const updatedProject = {
      name,
      startDate: start,
      endDate: end,
      duration,
      desc,
      techs: { node, react, next, typescript },
      img: base64Img,
    };

    if (editIndex !== null) {
      projects[editIndex] = updatedProject;
      alert("Project update successfully ✅");
      editIndex = null;
    } else {
      projects.push(updatedProject);
      alert("Project added successfully ✅");
    }

    saveToLocalStorage();
    renderCards();
    resetForm();
  };

  if (imageFile) {
    document.getElementById("image-preview").src = URL.createObjectURL(imageFile);
    document.getElementById("image-preview").style.display = "block";
    const reader = new FileReader();
    reader.onload = function (event) {
      handleUpdateProject(event.target.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    handleUpdateProject(projects[editIndex].img);
  }
}

// Simpan array project ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Potong deskripsi jika terlalu panjang
function truncate(text, max) {
  return text.length > max ? text.substring(0, max) + "..." : text;
}

// Tampilkan semua card project
function renderCards() {
  const container = document.getElementById("cardContainer");
  const section = document.getElementById("project-section");
  container.innerHTML = "";

  if (projects.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  projects.forEach((p, index) => {
    const techIcons = `
        ${p.techs.node ? '<img class="tech-icon" src="img/node.png" />' : ""}
        ${p.techs.react ? '<img class="tech-icon" src="img/react.png" />' : ""}
        ${p.techs.next ? '<img class="tech-icon" src="img/next.png" />' : ""}
        ${p.techs.typescript ? '<img class="tech-icon" src="img/typescript.png" />' : ""}
      `;

    container.innerHTML += `
        <div class="coll">
          <div class="card">
            <img src="${p.img}" class="fixed-img" alt="${p.name}"  onclick="previewProject(${index})" style="cursor: pointer;" />
            <div class="card-body">
              <h5 class="card-title">${p.name} - ${new Date().getFullYear()}</h5>
              <p class="card-time">Durasi: ${p.duration} bulan</p>
              <p class="card-text">${truncate(p.desc, 100)}</p>
            </div>
            <div class="card-icon">${techIcons}</div>
            <div class="card-button">
              <button class="btn edit" onclick="startEditProject(${index})">edit</button>
              <button class="btn delete" onclick="getRemoveData(${index})">delete</button>
            </div>
          </div>
        </div>
      `;
  });
}

// Edit project berdasarkan index
function startEditProject(index) {
  const project = projects[index];
  editIndex = index;

  document.getElementById("project-name").value = project.name;
  document.getElementById("start-date").value = project.startDate;
  document.getElementById("end-date").value = project.endDate;
  document.getElementById("desc").value = project.desc;
  document.getElementById("nodejs").checked = project.techs.node;
  document.getElementById("reactjs").checked = project.techs.react;
  document.getElementById("nextjs").checked = project.techs.next;
  document.getElementById("typescript").checked = project.techs.typescript;

  document.querySelector(".submit button").textContent = "Update";

  // Tampilkan preview gambar lama
  const preview = document.getElementById("image-preview");
  preview.src = project.img;
  preview.style.display = "block";

  // Ubah tombol
  const btn = document.querySelector(".submit button");
  btn.textContent = "Update";

  document.querySelector(".submit button[type='button']").style.display = "inline-block";
}

// Cancel Edit Project
function cancelEdit() {
  editIndex = null;
  resetForm();
}

// Hapus project berdasarkan index
function getRemoveData(index) {
  const confirmDelete = confirm("Apakah kamu yakin ingin menghapus project ini?");
  if (!confirmDelete) return;

  projects.splice(index, 1);
  saveToLocalStorage();
  renderCards();
  alert("Project berhasil dihapus ✅");
}

// Reset Form Project
function resetForm() {
  document.querySelector("form").reset();
  document.querySelector(".submit button").textContent = "Submit";
  document.querySelector(".submit button[type='button']").style.display = "none";

  const preview = document.getElementById("image-preview");
  preview.src = "";
  preview.style.display = "none";
}

// Preview Detail Project
function previewProject(index) {
  localStorage.setItem("previewProject", JSON.stringify(projects[index]));
  window.location.href = "project-detail.html";
}
