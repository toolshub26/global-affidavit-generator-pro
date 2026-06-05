let purposes = [];
let currentPlan = "FREE";
let deferredPrompt = null; // for PWA install

/* =========================
   DEFAULT PURPOSES (FALLBACK)
========================= */
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

/* =========================
   LOAD PURPOSES (with fallback)
========================= */
async function loadPurposes() {
  try {
    const response = await fetch("purposes.json");
    const data = await response.json();
    if (Array.isArray(data)) {
      purposes = data;
    } else {
      purposes = Object.values(data).flat();
    }
    if (!purposes.length) throw new Error("Empty purposes data");
  } catch (error) {
    console.warn("Using default purposes due to:", error);
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

/* =========================
   PURPOSE SEARCH (live filter)
========================= */
const purposeSearch = document.getElementById("purposeSearch");
if (purposeSearch) {
  purposeSearch.addEventListener("input", function () {
    const search = this.value.toLowerCase();
    const filtered = purposes.filter(item =>
      item.toLowerCase().includes(search)
    );
    populateDropdown(filtered);
  });
}

/* =========================
   PLAN BUTTONS
========================= */
const freePlan = document.getElementById("freePlan");
const proPlan = document.getElementById("proPlan");
const premiumPlan = document.getElementById("premiumPlan");
if (freePlan) freePlan.onclick = () => { currentPlan = "FREE"; alert("Free Plan Activated"); };
if (proPlan) proPlan.onclick = () => { currentPlan = "PRO"; alert("Pro Plan Activated"); };
if (premiumPlan) premiumPlan.onclick = () => { currentPlan = "PREMIUM"; alert("Premium Plan Activated"); };

/* =========================
   HELPER: VALIDATION
========================= */
function validateRequiredFields() {
  const required = [
    "country", "language", "fullName", "fatherName",
    "age", "state", "district", "address", "purposeDropdown"
  ];
  for (let id of required) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      alert(`Please fill in "${el?.previousElementSibling?.innerText || id}"`);
      return false;
    }
  }
  const purposeSelect = document.getElementById("purposeDropdown");
  if (purposeSelect && purposeSelect.value === "") {
    alert("Please select a valid purpose");
    return false;
  }
  return true;
}

/* =========================
   GENERATE AFFIDAVIT (with photo & signature)
   + Memory leak fix: revoke previous photo URL
========================= */
let currentPhotoURL = null;

document.getElementById("generateBtn")?.addEventListener("click", function () {
  if (!validateRequiredFields()) return;

  const country = document.getElementById("country").value;
  const language = document.getElementById("language").value;
  const fullName = document.getElementById("fullName").value;
  const fatherName = document.getElementById("fatherName").value;
  const age = document.getElementById("age").value;
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const address = document.getElementById("address").value;
  const purpose = document.getElementById("purposeDropdown").value;
  const statement = document.getElementById("swornStatement").value || "I solemnly affirm that the above information is true and correct.";

  const affidavitNo = "AFF-" + Date.now();
  const today = new Date().toLocaleDateString();

  // Photo handling with revoke
  let photoHTML = "";
  const photoInput = document.getElementById("photoUpload");
  if (photoInput && photoInput.files.length > 0) {
    if (currentPhotoURL) URL.revokeObjectURL(currentPhotoURL);
    currentPhotoURL = URL.createObjectURL(photoInput.files[0]);
    photoHTML = `<img src="${currentPhotoURL}" class="preview-photo" style="max-width:150px; border-radius:10px;">`;
  } else {
    photoHTML = `<div class="no-photo">📷 No photo uploaded</div>`;
  }

  // Signature preview
  let signatureHTML = "";
  const canvas = document.getElementById("signaturePad");
  if (canvas) {
    const dataURL = canvas.toDataURL();
    const isEmpty = !canvas.hasAttribute("data-drawn");
    if (!isEmpty && dataURL !== "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==") {
      signatureHTML = `<img src="${dataURL}" class="preview-signature" style="max-width:200px; border:1px solid #ccc;">`;
    } else {
      signatureHTML = `<div class="no-signature">✍️ Signature not provided</div>`;
    }
  } else {
    signatureHTML = `<div class="no-signature">Signature pad missing</div>`;
  }

  const previewDiv = document.getElementById("preview");
  if (!previewDiv) return;

  previewDiv.innerHTML = `
    <div style="text-align:center;">${photoHTML}</div>
    <h2>AFFIDAVIT</h2>
    <p><b>Plan:</b> ${currentPlan}<br>
    <b>Affidavit No:</b> ${affidavitNo}<br>
    <b>Country:</b> ${country}<br>
    <b>Language:</b> ${language}<br>
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

  // Show preview and sync toggle button
  previewDiv.style.display = "block";
  const toggleBtn = document.getElementById("togglePreviewBtn");
  if (toggleBtn) {
    toggleBtn.textContent = "📄 Hide Preview";
    window.previewVisible = true; // shared state
  }
});

/* =========================
   PRINT
========================= */
document.getElementById("printBtn")?.addEventListener("click", () => window.print());

/* =========================
   REAL PDF EXPORT (fixed multi-page formula)
========================= */
document.getElementById("pdfBtn")?.addEventListener("click", async () => {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv) {
    alert("Preview section not found.");
    return;
  }
  if (previewDiv.innerHTML.trim() === "") {
    alert("Please generate an affidavit first.");
    return;
  }
  if (typeof window.jspdf === "undefined") {
    alert("PDF library not loaded. Please include jsPDF script.");
    return;
  }

  const originalBtnText = document.getElementById("pdfBtn").innerText;
  document.getElementById("pdfBtn").innerText = "Generating PDF...";

  try {
    const canvas = await html2canvas(previewDiv, {
      scale: 2,
      backgroundColor: "#ffffff"
    });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // ✅ Fixed: safer position calculation
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Affidavit.pdf");
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Failed to generate PDF.");
  } finally {
    document.getElementById("pdfBtn").innerText = originalBtnText;
  }
});

/* =========================
   SHARE with safety
========================= */
document.getElementById("shareBtn")?.addEventListener("click", async () => {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv) return;
  const text = previewDiv.innerText;
  if (!text.trim()) {
    alert("Please generate an affidavit first.");
    return;
  }
  if (navigator.share) {
    await navigator.share({ title: "Global Affidavit Generator Pro", text: text });
  } else {
    alert("Sharing not supported on this browser");
  }
});

/* =========================
   PNG DOWNLOAD
========================= */
const pngBtn = document.getElementById("pngBtn");
if (pngBtn) {
  pngBtn.addEventListener("click", () => {
    const previewDiv = document.getElementById("preview");
    if (!previewDiv) return;
    if (previewDiv.innerHTML.trim() === "") {
      alert("Please generate an affidavit first.");
      return;
    }
    if (typeof html2canvas === "undefined") {
      alert("html2canvas library missing.");
      return;
    }
    html2canvas(previewDiv).then(canvas => {
      const link = document.createElement("a");
      link.download = "Affidavit.png";
      link.href = canvas.toDataURL();
      link.click();
    }).catch(err => alert("PNG failed: " + err));
  });
}

/* =========================
   THEME SWITCH
========================= */
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.onclick = () => document.body.classList.toggle("light-theme");
}

/* =========================
   DIGITAL SIGNATURE (with touch-action fix)
========================= */
function initSignaturePad() {
  const canvas = document.getElementById("signaturePad");
  if (!canvas) return;

  // ✅ Prevent touch scrolling while signing
  canvas.style.touchAction = "none";

  canvas.width = canvas.offsetWidth || 400;
  canvas.height = canvas.offsetHeight || 200;
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";

  let drawing = false;

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    let x = (clientX - rect.left) * scaleX;
    let y = (clientY - rect.top) * scaleY;
    x = Math.min(Math.max(0, x), canvas.width);
    y = Math.min(Math.max(0, y), canvas.height);
    return { x, y };
  }

  function startDrawing(e) {
    drawing = true;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    canvas.setAttribute("data-drawn", "true");
    e.preventDefault();
  }

  function draw(e) {
    if (!drawing) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault();
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath();
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDrawing);
  canvas.addEventListener("touchcancel", stopDrawing);

  const clearBtn = document.getElementById("clearSignature");
  if (clearBtn) {
    clearBtn.onclick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.removeAttribute("data-drawn");
    };
  }
}

/* =========================
   HIDDEN PREVIEW TOGGLE (fully synced)
========================= */
function setupHiddenPreview() {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv) return;

  let toggleBtn = document.getElementById("togglePreviewBtn");
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "togglePreviewBtn";
    toggleBtn.style.margin = "10px";
    const container = document.querySelector(".container");
    if (container) container.appendChild(toggleBtn);
    else document.body.appendChild(toggleBtn);
  }

  // Shared state variable
  window.previewVisible = false;  // preview starts hidden (display:none in HTML)
  toggleBtn.textContent = "👁️ Show Preview";

  toggleBtn.addEventListener("click", () => {
    if (window.previewVisible) {
      previewDiv.style.display = "none";
      toggleBtn.textContent = "👁️ Show Preview";
    } else {
      previewDiv.style.display = "block";
      toggleBtn.textContent = "📄 Hide Preview";
    }
    window.previewVisible = !window.previewVisible;
  });
}

/* =========================
   PWA INSTALL BUTTON
========================= */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("installBtn");
  if (installBtn) {
    installBtn.style.display = "block"; // or "inline-block", whatever your CSS
    installBtn.disabled = false;
  }
});

const installBtn = document.getElementById("installBtn");
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
      alert("Installation not available right now.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = "none";
  });
}

/* =========================
   INITIALIZE ALL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadPurposes();
  initSignaturePad();
  setupHiddenPreview();
});
