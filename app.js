const { data } = await supabase.auth.getUser();
if (!data.user) window.location.href = "index.html";


const SUPABASE_URL = "https://bpcpihkspivsxyifpbsi.supabase.co";
const SUPABASE_KEY = "sb_secret_YkGQJ7vC9xHWqr-91Q99BA_GSLB7Gkq";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "add.html";
  }
}



async function saveMemory() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const conversation = document.getElementById("conversation").value;
  const image = document.getElementById("image").files[0];

  let image_url = null;

  if (image) {
    const fileName = Date.now() + "_" + image.name;
    await supabase.storage.from("images").upload(fileName, image);
    image_url = fileName;
  }

  await supabase.from("entries").insert([
    { date, time, conversation, image_url }
  ]);

  alert("Memory saved 💙");
}



async function loadTimeline() {
  const { data } = await supabase
    .from("entries")
    .select("*")
    .order("date", { ascending: false });

  const div = document.getElementById("timeline");

  data.forEach(e => {
    div.innerHTML += `
      <div>
        <h4>${e.date} ${e.time}</h4>
        <p>${e.conversation}</p>
      </div>
    `;
  });
}
