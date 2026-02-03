const placeInput = document.getElementById("placeInput");
const suggestions = document.getElementById("suggestions");
const confirmBtn = document.getElementById("confirmBtn");
const surprise = document.getElementById("surprise");

const places = [
  "Cafe",
  "Restaurant",
  "Beach",
  "Movie Theater",
  "Park",
  "Anywhere with you 💖"
];

// Fake search (Google-like feel)
placeInput.addEventListener("input", () => {
  suggestions.innerHTML = "";
  const value = placeInput.value.toLowerCase();
  if (!value) return;

  places
    .filter(p => p.toLowerCase().includes(value))
    .forEach(place => {
      const li = document.createElement("li");
      li.textContent = place;
      li.onclick = () => {
        placeInput.value = place;
        suggestions.innerHTML = "";
      };
      suggestions.appendChild(li);
    });
});

// Option selection
document.querySelectorAll(".options").forEach(group => {
  group.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      [...group.children].forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
    }
  });
});

// Confirm → Surprise
confirmBtn.addEventListener("click", () => {
  surprise.style.display = "flex";
});

function goGallery() {
  window.location.href = "gallery.html";
}
