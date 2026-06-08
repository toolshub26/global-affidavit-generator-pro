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
    const filtered = purposes.filter(item =>
      item.toLowerCase().includes(search)
    );
    populateDropdown(filtered);
  });
}

const purposeDropdown = document.getElementById("purposeDropdown");
const purposeInput = document.getElementById("purpose");
if (purposeDropdown && purposeInput) {
  purposeDropdown.addEventListener("change", () => {
    if (purposeDropdown.value) purposeInput.value = purposeDropdown.value;
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
  const purposeCustom = document.getElementById("purpose");
  if ((!purposeSelect || purposeSelect.value === "") && (!purposeCustom || !purposeCustom.value.trim())) {
    alert("Please select or type a valid purpose");
    return false;
  }
  return true;
}

document.getElementById("generateBtn")?.addEventListener("click", function () {
  if (!validateRequiredFields()) return;

  const photoInput = document.getElementById("photoUpload");
  if (photoInput && photoInput.files.length && photoInput.files[0].size > 5 * 1024 * 1024) {
    alert("Photo must be less than 5MB");
    return;
  }

  currentAffidavitNo = generateAffidavitNumber();
  const affidavitNo = currentAffidavitNo;

  const affidavitColor = document.getElementById("affidavitColor")?.value || "gold";
  const country = document.getElementById("country").value;
  const language = document.getElementById("language").value;
  const fullName = escapeHtml(document.getElementById("fullName").value);
  const fatherName = escapeHtml(document.getElementById("fatherName").value);
  const age = escapeHtml(document.getElementById("age").value);
  const state = escapeHtml(document.getElementById("state").value);
  const district = escapeHtml(document.getElementById("district").value);
  const address = escapeHtml(document.getElementById("address").value);
  const purposeSelectVal = document.getElementById("purposeDropdown").value;
  const purposeCustomVal = document.getElementById("purpose").value;
  const purpose = escapeHtml(purposeSelectVal || purposeCustomVal || "General Affidavit");
  const statement = escapeHtml(document.getElementById("swornStatement").value) || "I solemnly affirm that the above information is true and correct.";
  const today = new Date().toLocaleDateString();

  let photoHTML = "";
  if (photoInput && photoInput.files.length) {
    if (currentPhotoURL) URL.revokeObjectURL(currentPhotoURL);
    currentPhotoURL = URL.createObjectURL(photoInput.files[0]);
    photoHTML = `<img src="${currentPhotoURL}" class="preview-photo" style="max-width:150px; border-radius:10px;">`;
  } else {
    photoHTML = `<div class="no-photo">📷 No photo uploaded</div>`;
  }

  let signatureHTML = "";
  const canvas = document.getElementById("signaturePad");
  if (canvas && signatureDrawn) {
    signatureHTML = `<img src="${canvas.toDataURL()}" class="preview-signature" style="max-width:200px; border:1px solid #ccc;">`;
  } else {
    signatureHTML = `<div class="no-signature">✍️ Signature not provided</div>`;
  }

  const previewDiv = document.getElementById("preview");
  if (!previewDiv) return;

  previewDiv.innerHTML = `
    <div style="text-align:center;">${photoHTML}</div>
    <h2>AFFIDAVIT</h2>
    <p><b>Plan:</b> ${currentPlan}<br>
    <b>Affidavit No:</b> ${affidavitNo}<br>
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

  previewDiv.classList.remove("gold-theme", "blue-theme", "green-theme", "red-theme", "black-theme");
  previewDiv.classList.add(affidavitColor + "-theme");
  previewDiv.style.display = "block";

  const toggleBtn = document.getElementById("togglePreviewBtn");
  if (toggleBtn) toggleBtn.textContent = "📄 Hide Preview";
});

document.getElementById("printBtn")?.addEventListener("click", () => window.print());

document.getElementById("pdfBtn")?.addEventListener("click", async () => {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv || previewDiv.innerHTML.trim() === "") {
    alert("Please generate an affidavit first.");
    return;
  }
  if (!currentAffidavitNo) {
    alert("Please click Generate button first.");
    return;
  }
  if (typeof window.jspdf === "undefined") {
    alert("PDF library not loaded.");
    return;
  }

  const originalText = document.getElementById("pdfBtn").innerText;
  document.getElementById("pdfBtn").innerText = "Generating PDF...";

  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const canvas = await html2canvas(previewDiv, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true
    });
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`Affidavit_${currentAffidavitNo}.pdf`);
  } catch (err) {
    console.error(err);
    alert("PDF generation failed.");
  } finally {
    document.getElementById("pdfBtn").innerText = originalText;
  }
});

document.getElementById("pngBtn")?.addEventListener("click", async () => {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv || previewDiv.innerHTML.trim() === "") {
    alert("Please generate an affidavit first.");
    return;
  }
  if (!currentAffidavitNo) {
    alert("Please click Generate button first.");
    return;
  }
  await new Promise(resolve => setTimeout(resolve, 300));
  const canvas = await html2canvas(previewDiv, { scale: 3, backgroundColor: "#ffffff" });
  const link = document.createElement("a");
  link.download = `Affidavit_${currentAffidavitNo}.png`;
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById("shareBtn")?.addEventListener("click", async () => {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv || previewDiv.innerHTML.trim() === "") {
    alert("Please generate an affidavit first.");
    return;
  }
  const text = previewDiv.innerText;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Global Affidavit Generator Pro",
        text: text
      });
    } catch (err) {
      console.log("Share cancelled or failed:", err);
    }
  } else {
    alert("Sharing not supported on this browser");
  }
});

const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.onclick = () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  };
}

function initSignaturePad() {
  if (signaturePadInitialized) return;
  signaturePadInitialized = true;

  const canvas = document.getElementById("signaturePad");
  if (!canvas) return;

  let drawing = false;
  let ctx = canvas.getContext("2d");

  function resizeAndRestore() {
    const oldData = signatureDrawn ? canvas.toDataURL() : null;
    const newWidth = canvas.offsetWidth || 400;
    const newHeight = canvas.offsetHeight || 200;
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
    if (oldData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = oldData;
    }
  }

  window.addEventListener("resize", () => resizeAndRestore());
  resizeAndRestore();

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let cx, cy;
    if (e.touches) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else {
      cx = e.clientX;
      cy = e.clientY;
    }
    let x = (cx - rect.left) * scaleX;
    let y = (cy - rect.top) * scaleY;
    return { x: Math.min(Math.max(0, x), canvas.width), y: Math.min(Math.max(0, y), canvas.height) };
  }

  function start(e) {
    drawing = true;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    signatureDrawn = true;
    e.preventDefault();
  }
  function draw(e) {
    if (!drawing) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
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
  canvas.addEventListener("touchcancel", stop);

  const clearBtn = document.getElementById("clearSignature");
  if (clearBtn) {
    clearBtn.onclick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      signatureDrawn = false;
    };
  }
}

function setupHiddenPreview() {
  const previewDiv = document.getElementById("preview");
  if (!previewDiv) return;
  let toggleBtn = document.getElementById("togglePreviewBtn");
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "togglePreviewBtn";
    toggleBtn.style.margin = "10px";
    document.querySelector(".container")?.appendChild(toggleBtn);
  }
  const isVisible = previewDiv.style.display !== "none";
  toggleBtn.textContent = isVisible ? "📄 Hide Preview" : "👁️ Show Preview";

  toggleBtn.addEventListener("click", () => {
    const visible = previewDiv.style.display !== "none";
    if (visible) {
      previewDiv.style.display = "none";
      toggleBtn.textContent = "👁️ Show Preview";
    } else {
      previewDiv.style.display = "block";
      toggleBtn.textContent = "📄 Hide Preview";
    }
  });
}

window.addEventListener("beforeunload", () => {
  if (currentPhotoURL) URL.revokeObjectURL(currentPhotoURL);
});

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("installBtn");
  if (installBtn) installBtn.style.display = "block";
});

window.addEventListener("appinstalled", () => {
  const installBtn = document.getElementById("installBtn");
  if (installBtn) installBtn.style.display = "none";
});

document.getElementById("installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) {
    alert("Installation not available.");
    return;
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (outcome === "accepted") document.getElementById("installBtn").style.display = "none";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => console.log("SW reg failed:", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light-theme");
  loadPurposes();
  initSignaturePad();
  setupHiddenPreview();
});
