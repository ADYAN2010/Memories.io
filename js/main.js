/* ================= DOM REFERENCES ================= */
const noBtn      = document.getElementById("noBtn");
const yesBtn     = document.getElementById("yesBtn");
const text       = document.getElementById("responseText");
const overlay    = document.getElementById("messageOverlay");
const music      = document.getElementById("bgMusic");
const transition = document.getElementById("pageTransition");
const card       = document.querySelector(".card");

/* Background layers */
const heartsContainer = document.querySelector(".floating-hearts");
const canvas = document.getElementById("romanceCanvas");
const ctx = canvas.getContext("2d");

/* ================= STATE ================= */
let noCount = 0;
let overlayClosed = false;

/* ================= COPY ================= */
const noMessages = [
  "Hey… that kinda hurt 😢",
  "Are you sure? I made this just for you 🥺",
  "Okay now you're just being cute 😏",
  "At this point you’re lying ❤️"
];

/* ================= MESSAGE INTRO OVERLAY ================= */

// Auto-dismiss after 4s
setTimeout(closeOverlay, 4000);

// Dismiss on any tap/click
overlay.addEventListener("click", closeOverlay, { once: true });

function closeOverlay() {
  if (overlayClosed) return;
  overlayClosed = true;

  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";

  // Start music safely after first interaction
  document.body.addEventListener(
    "click",
    () => {
      if (music && music.paused) {
        music.play().catch(() => {});
      }
    },
    { once: true }
  );
}

/* ================= NO BUTTON LOGIC ================= */
noBtn.addEventListener("click", () => {
  noCount++;

  text.textContent =
    noMessages[Math.min(noCount - 1, noMessages.length - 1)];

  // Controlled scaling
  const noScale  = Math.max(0.45, 1 - noCount * 0.15);
  const yesScale = Math.min(2.2, 1 + noCount * 0.18);

  noBtn.style.transform  = `scale(${noScale})`;
  yesBtn.style.transform = `scale(${yesScale})`;

  if (noCount >= 4) {
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
  }
});

/* ================= YES BUTTON ================= */
yesBtn.addEventListener("click", () => {
  card.classList.add("exit");
  transition.classList.add("active");

  setTimeout(() => {
    window.location.href = "plan.html";
  }, 650);
});

/* ================= FLOATING HEARTS ================= */
function spawnHeart() {
  const heart = document.createElement("span");

  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = 7 + Math.random() * 6 + "s";
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  heart.style.transform =
    `scale(${Math.random() * 0.8 + 0.4}) rotate(45deg)`;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

setInterval(spawnHeart, 700);

/* ================= CANVAS PARTICLES ================= */
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3
}));

function animateParticles() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
