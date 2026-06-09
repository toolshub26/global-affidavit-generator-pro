// ====================== GLOBALS ======================
let purposes = [];
let currentPlan = "FREE";
let currentPhotoURL = null;
let currentAffidavitNo = "";
let signatureDrawn = false;
let deferredPrompt = null;

const DEFAULT_PURPOSES = [
  "Employment Verification",
  "Education Loan",
  "Property Transfer",
  "Name Change",
  "Birth Certificate Correction",
  "Loss of Documents",
  "Income Proof",
  "Marriage Certificate",
  "Passport Application",
  "Court Affidavit"
];

// ====================== HELPERS ======================
function escapeHTML(str) {
  str = String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateAffidavitNumber() {
  let uniquePart;

  try {
    if (crypto.randomUUID) {
      uniquePart = crypto.randomUUID().slice(0, 8).toUpperCase();
    } else {
      uniquePart = Math.random().toString(36).substring(2, 10).toUpperCase();
    }
  } catch {
    uniquePart = Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  return `AGI-${Date.now()}-${uniquePart}`;
}

// ====================== PURPOSE DROPDOWN ======================
function populateDropdown(list) {

  const dropdown = document.getElementById("purposeDropdown");

  if (!dropdown) return;

  dropdown.innerHTML = `<option value="">Select Purpose</option>`;

  list.forEach(item => {

    const option = document.createElement("option");

    option.value = item;
    option.textContent = item;

    dropdown.appendChild(option);

  });
}

async function loadPurposes() {

  try {

    const response = await fetch("purposes.json");

    const data = await response.json();

    purposes = Array.isArray(data)
      ? data
      : Object.values(data).flat();

    if (!purposes.length) throw new Error();

  }

  catch {

    console.log("Using default purposes");

    purposes = [...DEFAULT_PURPOSES];
  }

  populateDropdown(purposes);

}

// ====================== PURPOSE SEARCH ======================
function setupPurposeSearch() {

  const searchBox = document.getElementById("purposeSearch");

  if (!searchBox) return;

  searchBox.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filtered = purposes.filter(item =>
      item.toLowerCase().includes(search)
    );

    populateDropdown(filtered);

  });

}

// ====================== PLAN BUTTONS ======================
function setupPlans() {

  document.getElementById("freePlan")?.addEventListener("click", () => {

    currentPlan = "FREE";

    alert("Free Plan Activated");

  });

  document.getElementById("proPlan")?.addEventListener("click", () => {

    currentPlan = "PRO";

    alert("Pro Plan Activated");

  });

  document.getElementById("premiumPlan")?.addEventListener("click", () => {

    currentPlan = "PREMIUM";

    alert("Premium Plan Activated");

  });

}

// ====================== VALIDATION ======================
function validateRequiredFields() {

  const required = [
    "country",
    "language",
    "fullName",
    "fatherName",
    "age",
    "state",
    "district",
    "address"
  ];

  for (const id of required) {

    const el = document.getElementById(id);

    if (!el || !el.value.trim()) {

      alert("Please fill " + id);

      return false;
    }

  }

  if (document.getElementById("purposeDropdown").value === "") {

    alert("Select purpose");

    return false;
  }

  return true;

}
// ====================== SIGNATURE PAD ======================
function initSignaturePad() {

  const canvas = document.getElementById("signaturePad");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let drawing = false;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";

  function getPos(e) {

    const rect = canvas.getBoundingClientRect();

    let x, y;

    if (e.touches) {

      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;

    } else {

      x = e.clientX - rect.left;
      y = e.clientY - rect.top;

    }

    return { x, y };

  }

  function start(e) {

    drawing = true;

    signatureDrawn = true;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    e.preventDefault();

  }

  function draw(e) {

    if (!drawing) return;

    const pos = getPos(e);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    e.preventDefault();

  }

  function stop() {

    drawing = false;
    ctx.beginPath();

  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);

  canvas.addEventListener("touchstart", start);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stop);

  document.getElementById("clearSignature")?.addEventListener("click", () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    signatureDrawn = false;

  });

}

// ====================== GENERATE ======================
function generateAffidavit() {

  if (!validateRequiredFields()) return;

  currentAffidavitNo = generateAffidavitNumber();

  const preview = document.getElementById("preview");

  const fullName = escapeHTML(document.getElementById("fullName").value);
  const fatherName = escapeHTML(document.getElementById("fatherName").value);
  const age = escapeHTML(document.getElementById("age").value);
  const address = escapeHTML(document.getElementById("address").value);
  const purpose = escapeHTML(document.getElementById("purposeDropdown").value);

  let photoHTML = "";

  const photoInput = document.getElementById("photoUpload");

  if (photoInput && photoInput.files.length > 0) {

    if (currentPhotoURL) {

      URL.revokeObjectURL(currentPhotoURL);

    }

    currentPhotoURL = URL.createObjectURL(photoInput.files[0]);

    photoHTML = `
      <img src="${currentPhotoURL}"
      class="preview-photo">
    `;

  }

  let signatureHTML = "";

  if (signatureDrawn) {

    const canvas = document.getElementById("signaturePad");

    signatureHTML = `
      <img src="${canvas.toDataURL()}"
      class="preview-signature">
    `;

  }

  preview.innerHTML = `

  ${photoHTML}

  <h2>AFFIDAVIT</h2>

  <p>
  <b>Affidavit No:</b>
  ${currentAffidavitNo}
  </p>

  <hr>

  <p>

  I,

  <b>${fullName}</b>,

  S/o

  <b>${fatherName}</b>,

  aged

  <b>${age}</b>

  years,

  resident of

  <b>${address}</b>,

  hereby declare this affidavit for

  <b>${purpose}</b>.

  </p>

  <br><br>

  ${signatureHTML}

  <br>

  __________________

  <br>

  Deponent Signature

  `;

  preview.style.display = "block";

}
// ====================== PRINT ======================
document.getElementById("printBtn")?.addEventListener("click", () => {
  window.print();
});

// ====================== PDF ======================
document.getElementById("pdfBtn")?.addEventListener("click", async () => {

  if (!currentAffidavitNo) {
    alert("Generate affidavit first.");
    return;
  }

  const preview = document.getElementById("preview");

  if (!preview) return;

  try {

    const canvas = await html2canvas(preview, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 210;

    const height = canvas.height * width / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);

    pdf.save(`Affidavit_${currentAffidavitNo}.pdf`);

  } catch (e) {

    alert("PDF generation failed");

    console.error(e);

  }

});

// ====================== PNG ======================
document.getElementById("pngBtn")?.addEventListener("click", async () => {

  if (!currentAffidavitNo) {
    alert("Generate affidavit first.");
    return;
  }

  const preview = document.getElementById("preview");

  if (!preview) return;

  try {

    const canvas = await html2canvas(preview, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const link = document.createElement("a");

    link.download = `Affidavit_${currentAffidavitNo}.png`;

    link.href = canvas.toDataURL();

    link.click();

  } catch (e) {

    alert("PNG export failed");

  }

});

// ====================== SHARE ======================
document.getElementById("shareBtn")?.addEventListener("click", async () => {

  if (!navigator.share) {

    alert("Sharing not supported.");

    return;

  }

  try {

    await navigator.share({

      title: "Global Affidavit Generator Pro",

      text: document.getElementById("preview")?.innerText || ""

    });

  } catch (e) {

    console.log(e);

  }

});

// ====================== THEME ======================
document.getElementById("themeBtn")?.addEventListener("click", () => {

  document.body.classList.toggle("light-theme");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-theme")
      ? "light"
      : "dark"
  );

});

// ====================== PREVIEW TOGGLE ======================
function setupPreviewToggle() {

  const preview = document.getElementById("preview");

  if (!preview) return;

  let toggleBtn = document.getElementById("togglePreviewBtn");

  if (!toggleBtn) {

    toggleBtn = document.createElement("button");

    toggleBtn.id = "togglePreviewBtn";

    toggleBtn.textContent = "👁 Show Preview";

    document.querySelector(".container")?.appendChild(toggleBtn);

  }

  toggleBtn.addEventListener("click", () => {

    if (preview.style.display === "none") {

      preview.style.display = "block";

      toggleBtn.textContent = "📄 Hide Preview";

    }

    else {

      preview.style.display = "none";

      toggleBtn.textContent = "👁 Show Preview";

    }

  });

}
// ====================== PWA INSTALL ======================
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {

  e.preventDefault();

  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");

  if (installBtn) {
    installBtn.style.display = "block";
  }

});

window.addEventListener("appinstalled", () => {

  const installBtn = document.getElementById("installBtn");

  if (installBtn) {
    installBtn.style.display = "none";
  }

});

document.getElementById("installBtn")?.addEventListener("click", async () => {

  if (!deferredPrompt) {

    alert("Installation not available.");

    return;

  }

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  deferredPrompt = null;

});

// ====================== SERVICE WORKER ======================
if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW Error:", err));

  });

}

// ====================== CLEANUP ======================
window.addEventListener("beforeunload", () => {

  if (currentPhotoURL) {

    URL.revokeObjectURL(currentPhotoURL);

  }

});

// ====================== DOM READY ======================
document.addEventListener("DOMContentLoaded", () => {

  // Restore theme

  if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-theme");

  }

  // Load purposes

  loadPurposes();

  // Initialize signature pad

  initSignaturePad();

  // Preview toggle

  setupPreviewToggle();

});
