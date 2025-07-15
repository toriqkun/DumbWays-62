function formatDate(dateStr) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-GB", options);
}

const data = JSON.parse(localStorage.getItem("previewProject"));

if (!data) {
  document.body.innerHTML = "<h2>No project data found.</h2>";
} else {
  document.getElementById("title").textContent = data.name;
  document.getElementById("preview-img").src = data.img;
  document.getElementById("description").textContent = data.desc;
  document.getElementById("duration").innerHTML = `${data.duration} month${data.duration > 1 ? "s" : ""}`;

  // Format tanggal dari data
  document.getElementById("date-range").innerHTML = `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

  const techContainer = document.getElementById("techs");
  techContainer.innerHTML = "";

  // if (data.techs.react) techContainer.innerHTML += `<div class="tech-item"><img src="img/react.png" /><span>React JS</span></div>`;
  // if (data.techs.node) techContainer.innerHTML += `<div class="tech-item"><img src="img/node.png" /><span>Node JS</span></div>`;
  // if (data.techs.next) techContainer.innerHTML += `<div class="tech-item"><img src="img/next.png" /><span>Next JS</span></div>`;
  // if (data.techs.typescript) techContainer.innerHTML += `<div class="tech-item"><img src="img/typescript.png" /><span>TypeScript</span></div>`;
  techContainer.innerHTML = Object.entries(data.techs)
    .filter(([_, value]) => value)
    .map(
      ([key]) => `
    <div class="tech-item">
      <img src="img/${key}.png" />
      <span>${capitalize(key)} JS</span>
    </div>
  `
    )
    .join("");

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
