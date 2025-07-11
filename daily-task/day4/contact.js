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

// FORM CONTACT CONSOLE LOG
function getData(e) {
  e.preventDefault();

  const fullName = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!fullName || !email || !number || !subject || !message) {
    alert("Please fill all fields");
    return;
  }

  console.log("\n======= New Contact Submission =======");
  console.log(`Nama         : ${fullName}`);
  console.log(`Email        : ${email}`);
  console.log(`Phone Number : ${number}`);
  console.log(`Subject      : ${subject}`);
  console.log(`Message      : ${message}`);
  console.log("=======================================\n");
}
