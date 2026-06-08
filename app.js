// ==================== TEST VERSION WITH ALERTS ====================
let purposes = [];
let currentPlan = "FREE";
let deferredPrompt = null;
let signatureDrawn = false;
let currentAffidavitNo = "";
let currentPhotoURL = null;
let signaturePadInitialized = false;

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, m => {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    return '&#39;';
  });
}

function generateAffidavitNumber() {
  let uniquePart;
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      uniquePart = crypto.randomUUID().slice(0, 8);
    } else {
      uniquePart = Math.random().toString(36).substring(2, 10).toUpperCase();
    }
  } catch (e) {
    uniquePart = Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  return `AGI-${Date.now()}-${uniquePart}`;
}

const DEFAULT_PURPOSES = [
  "Employment Verification", "Education Loan", "Property Transfer",
  "Name Change", "Birth Certificate Correction", "Loss of Documents",
  "Income Proof", "Marriage Certificate", "Passport Application", "Court Affidavit"
];

async function loadPurposes() {
  try {
    const response = await fetch("purposes.json");
    const data = await response.json();
    purposes = Array.isArray(data) ? data : Object.values(data).flat();
    if (!purposes.length) throw new Error();
  } catch (error) {
    console.warn("Using default purposes");
    purposes = [...DEFAULT_PURPOSES];
  } finally {
    populateDropdown(purposes);
  }
}

function populateDropdown(list) {
  const dropdown = document.getElementById("purposeDropdown");
  if (!dropdown) return;
  dropdown.innerHTML = "<option value=''>-- Select Purpose --</option>";
  list.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    dropdown.appendChild(option);
  });
}

const purposeSearch = document.getElementById("purposeSearch");
if (purposeSearch) {
  purposeSearch.addEventListener("input", function () {
    const search = this.value.toLowerCase();
    const filtered = purposes.filter(item => item.toLowerCase().includes(search));
    populateDropdown(filtered);
  });
}

const freePlan = document.getElementById("freePlan");
const proPlan = document.getElementById("proPlan");
const premiumPlan = document.getElementById("premiumPlan");
if (freePlan) freePlan.onclick = () => { currentPlan = "FREE"; alert("Free Plan Activated"); };
if (proPlan) proPlan.onclick = () => { currentPlan = "PRO"; alert("Pro Plan Activated"); };
if (premiumPlan) premiumPlan.onclick = () => { currentPlan = "PREMIUM"; alert("Premium Plan Activated"); };

function validateRequiredFields() {
  const required = ["country", "language", "fullName", "fatherName", "age", "state", "district", "address"];
  for (let id of required) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      alert(`Please fill in "${el?.previousElementSibling?.innerText || id}"`);
      return false;
    }
  }
  const purposeSelect = document.getElementById("purposeDropdown");
  if (!purposeSelect || purposeSelect.value === "") {
    alert("Please select a purpose");
    return false;
  }
  return true;
}

// ========== GENERATE BUTTON – WITH ALERTS ==========
document.getElementById("generateBtn")?.addEventListener("click", function () {
  alert("1️⃣ Generate button clicked");
  console.log("1️⃣ Generate clicked");

  if (!validateRequiredFields()) {
    alert("❌ Validation failed");
    return;
  }
  alert("2️⃣ Validation passed");

  const photoInput = document.getElementById("photoUpload");
  if (photoInput && photoInput.files.length && photoInput.files[0].size > 5 * 1024 * 1024) {
    alert("3️⃣ Photo too large (>5MB)");
    return;
  }
  alert("3️⃣ Photo OK");

  currentAffidavitNo = generateAffidavitNumber();
  alert("4️⃣ Affidavit number created: " + currentAffidavitNo);

  const affidavitColor = document.getElementById("affidavitColor")?.value || "gold";
  const country = document.getElementById("country").value;
  const language = document.getElementById("language").value;
  const fullName = escapeHtml(document.getElementById("fullName").value);
  const fatherName = escapeHtml(document.getElementById("fatherName").value);
  const age = escapeHtml(document.getElementById("age").value);
  const state = escapeHtml(document.getElementById("state").value);
  const district = escapeHtml(document.getElementById("district").value);
  const address = escapeHtml(document.getElementById("address").value);
  const purposeSelect = document.getElementById("purposeDropdown");
  const purpose = escapeHtml(purposeSelect.value);
  const statement = escapeHtml(document.getElementById("swornStatement").value) || "I solemnly affirm...";
  const today = new Date().toLocaleDateString();
  alert("5️⃣ Data collected");

  let photoHTML = "";
  if (photoInput && photoInput.files.length) {
    if (currentPhotoURL) URL.revokeObjectURL(currentPhotoURL);
    currentPhotoURL = URL.createObjectURL(photoInput.files[0]);
    photoHTML = `<img src="${currentPhotoURL}" class="preview-photo" style="max-width:150px; border-radius:10px;">`;
    alert("6️⃣ Photo loaded");
  } else {
    photoHTML = `<div class="no-photo">📷 No photo uploaded</div>`;
    alert("6️⃣ No photo");
  }

  let signatureHTML = "";
  const canvas = document.getElementById("signaturePad");
  if (canvas && signatureDrawn) {
    signatureHTML = `<img src="${canvas.toDataURL()}" class="preview-signature" style="max-width:200px; border:1px solid #ccc;">`;
    alert("7️⃣ Signature included");
  } else {
    signatureHTML = `<div class="no-signature">✍️ Signature not provided</div>`;
    alert("7️⃣ No signature");
  }

  const previewDiv = document.getElementById("preview");
  if (!previewDiv) {
    alert("❌ Preview div not found in HTML");
    return;
  }
  alert("8️⃣ Preview div found");

  alert("9️⃣ Building HTML...");
  try {
    previewDiv.innerHTML = `
      <div style="text-align:center;">${photoHTML}</div>
      <h2>AFFIDAVIT</h2>
      <p><b>Plan:</b> ${currentPlan}<br>
      <b>Affidavit No:</b> ${currentAffidavitNo}<br>
      <b>Country:</b> ${escapeHtml(country)}<br>
      <b>Language:</b> ${escapeHtml(language)}<br>
      <b>Date:</b> ${today}</p>
      <hr>
      <p>I, <b>${fullName}</b>, S/o <b>${fatherName}</b>, aged <b>${age}</b> years, resident of <b>${address}</b>, <b>${district}</b>, <b>${state}</b>, hereby declare this affidavit for <b>${purpose}</b>.</p>
      <p>${statement}</p>
      <div class="signature-box" style="margin-top:30px; text-align:right;">
        ${signatureHTML}<br>
        _____________________<br>
        Deponent Signature
      </div>
    `;
    alert("🔟 HTML assigned successfully");
  } catch (err) {
    alert("❌ Error in innerHTML: " + err.message);
    return;
  }

  previewDiv.classList.remove("gold-theme", "blue-theme", "green-theme", "red-theme", "black-theme");
  previewDiv.classList.add(affidavitColor + "-theme");
  previewDiv.style.display = "block";
  alert("✅ Affidavit generated successfully! Scroll down to see preview.");

  const toggleBtn = document.getElementById("togglePreviewBtn");
  if (toggleBtn) toggleBtn.textContent = "📄 Hide Preview";
});

// ========== KEEP OTHER FUNCTIONS SAME AS BEFORE (print, pdf, png, share, etc.) ==========
// ... (baaki functions previous final app.js jaisa hi rakh sakte hain, but main only generate button test ke liye upar wala code kaafi hai)
