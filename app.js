// Supabase CDN must be loaded in HTML before this file

const SUPABASE_URL = "https://bpcpihkspivsxyifpbsi.supabase.co";
const SUPABASE_KEY = "sb_secret_YkGQJ7vC9xHWqr-91Q99BA_GSLB7Gkq";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// 🔐 check auth on protected pages
async function checkAuth() {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user) {
    window.location.href = "index.html";
  }
}

// 🔑 login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "add.html";
  }
}

// 💾 save memory
async function saveMemory(e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const year = document.getElementById("year").value;
  const conversation = document.getElementById("conversation").value;
  const image_url = document.getElementById("image").value;

  const { error } = await supabaseClient
    .from("entries")
    .insert([
      {
        date,
        time,
        year,
        conversation,
        image_url
      }
    ]);

  if (error) {
    alert(error.message);
  } else {
    alert("Memory saved 💙");
  }
}

// 🕒 load timeline
async function loadTimeline() {
  const { data, error } = await supabaseClient
    .from("entries")
    .select("*")
    .order("date", { ascending: false });

  if (error) return;

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  data.forEach(item => {
    timeline.innerHTML += `
      <div>
        <h4>${item.date} ${item.time}</h4>
        <p>${item.conversation}</p>
      </div>
    `;
  });
}
