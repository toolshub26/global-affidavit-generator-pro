// ====================== GLOBALS ======================
let purposes = [];
let currentPlan = "FREE";
let currentPhotoURL = null;
let currentAffidavitNo = "";
let signatureDrawn = false;

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
  return "AGI-" + Date.now();
}

// ====================== PURPOSES ======================
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

  } catch (e) {
    console.log("Using default purposes");
    purposes = [...DEFAULT_PURPOSES];
  }

  populateDropdown(purposes);
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
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stop);

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

  let photoHTML = "";

  const photoInput = document.getElementById("photoUpload");

  if (photoInput.files.length > 0) {

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
  <b>${escapeHTML(document.getElementById("fullName").value)}</b>,
  S/o
  <b>${escapeHTML(document.getElementById("fatherName").value)}</b>,
  aged
  <b>${escapeHTML(document.getElementById("age").value)}</b>
  years,
  resident of
  <b>${escapeHTML(document.getElementById("address").value)}</b>,
  hereby declare this affidavit for
  <b>${escapeHTML(document.getElementById("purposeDropdown").value)}</b>.
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

// ====================== DOM READY ======================
document.addEventListener("DOMContentLoaded", () => {

  loadPurposes();

  initSignaturePad();

  document
    .getElementById("generateBtn")
    ?.addEventListener("click", generateAffidavit);

});
