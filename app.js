// ========================================
// GLOBAL AFFIDAVIT GENERATOR PRO V7
// WORLD EDITION
// ========================================

// ====================== GLOBALS ======================
let purposes = [];
let currentPlan = "FREE";
let currentPhotoURL = null;
let currentAffidavitNo = "";
let signatureDrawn = false;
let deferredPrompt = null;

// ====================== COUNTRIES ======================
const COUNTRIES = {

  India: {
    flag: "🇮🇳",
    code: "IN",
    currency: "INR",
    emblem: "Ashoka Emblem"
  },

  Pakistan: {
    flag: "🇵🇰",
    code: "PK",
    currency: "PKR",
    emblem: "State Emblem"
  },

  UAE: {
    flag: "🇦🇪",
    code: "AE",
    currency: "AED",
    emblem: "UAE Eagle"
  },

  USA: {
    flag: "🇺🇸",
    code: "US",
    currency: "USD",
    emblem: "Great Seal"
  },

  UK: {
    flag: "🇬🇧",
    code: "GB",
    currency: "GBP",
    emblem: "Royal Coat of Arms"
  }

};

// ====================== LANGUAGES ======================
const LANGUAGES = {

  English: {
    dir: "ltr",
    title: "AFFIDAVIT"
  },

  Urdu: {
    dir: "rtl",
    title: "حلف نامہ"
  },

  Hindi: {
    dir: "ltr",
    title: "शपथ पत्र"
  },

  Arabic: {
    dir: "rtl",
    title: "إقرار خطي"
  }

};

// ====================== PLAN PURPOSES ======================
const PLAN_PURPOSES = {

  FREE: [

    "Employment Verification",
    "Income Proof",
    "Name Change",
    "Marriage Certificate",
    "Loss of Documents",
    "Passport Application",
    "Court Affidavit"

  ],

  PRO: [

    "Employment Verification",
    "Income Proof",
    "Name Change",
    "Marriage Certificate",
    "Loss of Documents",
    "Passport Application",
    "Court Affidavit",

    "Property Transfer",
    "Rental Agreement",
    "Tenant Verification",
    "Gap Certificate",
    "Character Certificate",
    "Bonafide Certificate",
    "Loan Declaration",
    "Legal Heir"

  ],

  PREMIUM: [

    "Employment Verification",
    "Income Proof",
    "Name Change",
    "Marriage Certificate",
    "Loss of Documents",
    "Passport Application",
    "Court Affidavit",
    "Property Transfer",
    "Rental Agreement",
    "Tenant Verification",
    "Gap Certificate",
    "Character Certificate",
    "Bonafide Certificate",
    "Loan Declaration",
    "Legal Heir",
    "Witness Statement",
    "Affidavit of Truth",
    "Single Status",
    "Divorce Declaration",
    "Property Mutation"

  ]

};

// ====================== THEMES ======================
const THEMES = [
  "gold",
  "blue",
  "green",
  "red",
  "black"
];

// ====================== WATERMARKS ======================
const WATERMARKS = [
  "none",
  "confidential",
  "draft",
  "notary",
  "original"
];

// ====================== DEFAULT PURPOSES ======================
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

      uniquePart =
      crypto.randomUUID()
      .slice(0,8)
      .toUpperCase();

    }

    else {

      uniquePart =
      Math.random()
      .toString(36)
      .substring(2,10)
      .toUpperCase();

    }

  }

  catch {

    uniquePart =
    Math.random()
    .toString(36)
    .substring(2,10)
    .toUpperCase();

  }

  return `AGI-${Date.now()}-${uniquePart}`;

}

// ====================== COUNTRY ENGINE ======================

function getCountryData() {

  const country =
  document.getElementById("country")?.value;

  return COUNTRIES[country] || COUNTRIES.India;

}

// ====================== LANGUAGE ENGINE ======================

function getLanguageData() {

  const language =
  document.getElementById("language")?.value;

  return LANGUAGES[language] || LANGUAGES.English;

}

// ====================== THEME ENGINE ======================

function applyTheme(themeName) {

  const preview =
  document.getElementById("preview");

  if (!preview) return;

  preview.classList.remove(
    "gold-theme",
    "blue-theme",
    "green-theme",
    "red-theme",
    "black-theme"
  );

  preview.classList.add(
    themeName + "-theme"
  );

}

// ====================== PLAN ENGINE ======================

function setupPlans() {

  document
  .getElementById("freePlan")
  ?.addEventListener("click", () => {

    currentPlan = "FREE";

    populateDropdown(
      PLAN_PURPOSES.FREE
    );

    alert(
      "FREE Plan Activated"
    );

  });

  document
  .getElementById("proPlan")
  ?.addEventListener("click", () => {

    currentPlan = "PRO";

    populateDropdown(
      PLAN_PURPOSES.PRO
    );

    alert(
      "PRO Plan Activated"
    );

  });

  document
  .getElementById("premiumPlan")
  ?.addEventListener("click", () => {

    currentPlan = "PREMIUM";

    populateDropdown(
      PLAN_PURPOSES.PREMIUM
    );

    alert(
      "PREMIUM Plan Activated"
    );

  });

}

// ====================== PURPOSE DROPDOWN ======================

function populateDropdown(list) {

  const dropdown =
  document.getElementById(
    "purposeDropdown"
  );

  if (!dropdown) return;

  dropdown.innerHTML =
  `<option value="">
  Select Purpose
  </option>`;

  list.forEach(item => {

    const option =
    document.createElement(
      "option"
    );

    option.value = item;

    option.textContent = item;

    dropdown.appendChild(option);

  });

}

// ====================== PURPOSE SEARCH ======================

function setupPurposeSearch() {

  const searchBox =
  document.getElementById(
    "purposeSearch"
  );

  if (!searchBox) return;

  searchBox.addEventListener(
    "input",

    function () {

      const search =
      this.value
      .toLowerCase();

      const filtered =
      PLAN_PURPOSES[currentPlan]
      .filter(item =>

        item
        .toLowerCase()
        .includes(search)

      );

      populateDropdown(
        filtered
      );

    }

  );

}

// ====================== LOAD PURPOSES ======================

async function loadPurposes() {

  try {

    const response =
    await fetch("purposes.json");

    const data =
    await response.json();

    purposes =
    Array.isArray(data)
      ? data
      : Object.values(data).flat();

    if (!purposes.length) {

      throw new Error();

    }

  }

  catch {

    console.log(
      "Using default purposes"
    );

    purposes =
    [...DEFAULT_PURPOSES];

  }

  populateDropdown(
    PLAN_PURPOSES[currentPlan]
  );

}

// ====================== VALIDATION ENGINE ======================

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

    const el =
    document.getElementById(id);

    if (
      !el ||
      !el.value.trim()
    ) {

      alert(
        "Please fill " + id
      );

      return false;

    }

  }

  if (
    document
    .getElementById(
      "purposeDropdown"
    )
    .value === ""
  ) {

    alert(
      "Select purpose"
    );

    return false;

  }

  return true;

}

// ====================== SIGNATURE ENGINE ======================

function initSignaturePad() {

  const canvas =
  document.getElementById(
    "signaturePad"
  );

  if (!canvas) return;

  const ctx =
  canvas.getContext("2d");

  let drawing = false;

  ctx.lineWidth = 2;

  ctx.lineCap = "round";

  ctx.lineJoin = "round";

  ctx.strokeStyle = "#000";

  function getPos(e) {

    const rect =
    canvas.getBoundingClientRect();

    let x;
    let y;

    if (e.touches) {

      x =
      e.touches[0].clientX -
      rect.left;

      y =
      e.touches[0].clientY -
      rect.top;

    }

    else {

      x =
      e.clientX -
      rect.left;

      y =
      e.clientY -
      rect.top;

    }

    return { x, y };

  }

  function start(e) {

    drawing = true;

    signatureDrawn = true;

    const pos =
    getPos(e);

    ctx.beginPath();

    ctx.moveTo(
      pos.x,
      pos.y
    );

    e.preventDefault();

  }

  function draw(e) {

    if (!drawing) return;

    const pos =
    getPos(e);

    ctx.lineTo(
      pos.x,
      pos.y
    );

    ctx.stroke();

    e.preventDefault();

  }

  function stop() {

    drawing = false;

    ctx.beginPath();

  }

  // Mouse

  canvas.addEventListener(
    "mousedown",
    start
  );

  canvas.addEventListener(
    "mousemove",
    draw
  );

  canvas.addEventListener(
    "mouseup",
    stop
  );

  canvas.addEventListener(
    "mouseleave",
    stop
  );

  // Touch

  canvas.addEventListener(
    "touchstart",
    start
  );

  canvas.addEventListener(
    "touchmove",
    draw
  );

  canvas.addEventListener(
    "touchend",
    stop
  );

  canvas.addEventListener(
    "touchcancel",
    stop
  );

  // Clear Signature

  document
  .getElementById(
    "clearSignature"
  )
  ?.addEventListener(
    "click",

    () => {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      signatureDrawn = false;

    }

  );

}

// ====================== GENERATE ENGINE ======================

function generateAffidavit() {

  if (!validateRequiredFields()) return;

  currentAffidavitNo =
  generateAffidavitNumber();

  const preview =
  document.getElementById(
    "preview"
  );

  const country =
  document.getElementById(
    "country"
  ).value;

  const language =
  document.getElementById(
    "language"
  ).value;

  const countryData =
  getCountryData();

  const languageData =
  getLanguageData();

  const fullName =
  escapeHTML(
    document.getElementById(
      "fullName"
    ).value
  );

  const fatherName =
  escapeHTML(
    document.getElementById(
      "fatherName"
    ).value
  );

  const age =
  escapeHTML(
    document.getElementById(
      "age"
    ).value
  );

  const address =
  escapeHTML(
    document.getElementById(
      "address"
    ).value
  );

  const purpose =
  escapeHTML(
    document.getElementById(
      "purposeDropdown"
    ).value
  );

  const sworn =
  escapeHTML(
    document.getElementById(
      "swornStatement"
    ).value
  );

  const watermarkType =
  document.getElementById(
    "watermarkType"
  ).value;

  const affidavitColor =
  document.getElementById(
    "affidavitColor"
  ).value;

  applyTheme(
    affidavitColor
  );

  // ================= PHOTO =================

  let photoHTML = `
  <div class="no-photo">
  No Photo
  </div>
  `;

  const photoInput =
  document.getElementById(
    "photoUpload"
  );

  if (
    photoInput &&
    photoInput.files.length > 0
  ) {

    if (
      currentPhotoURL
    ) {

      URL.revokeObjectURL(
        currentPhotoURL
      );

    }

    currentPhotoURL =
    URL.createObjectURL(
      photoInput.files[0]
    );

    photoHTML = `
    <img
    src="${currentPhotoURL}"
    class="preview-photo">
    `;

  }

  // ================= SIGNATURE =================

  let signatureHTML = `
  <div class="no-signature">
  No Signature
  </div>
  `;

  if (
    signatureDrawn
  ) {

    const canvas =
    document.getElementById(
      "signaturePad"
    );

    signatureHTML = `
    <img
    src="${canvas.toDataURL()}"
    class="preview-signature">
    `;

  }

  // ================= LANGUAGE TEMPLATE =================

  let bodyText = "";

  switch (language) {

    case "Urdu":

      bodyText = `
      میں
      <b>${fullName}</b>
      ولد
      <b>${fatherName}</b>
      عمر
      <b>${age}</b>
      سال،
      رہائشی
      <b>${address}</b>
      یہ حلفیہ بیان
      <b>${purpose}</b>
      کے لیے دیتا ہوں۔
      `;

      break;

    case "Hindi":

      bodyText = `
      मैं
      <b>${fullName}</b>
      पिता
      <b>${fatherName}</b>,
      आयु
      <b>${age}</b>
      वर्ष,
      निवासी
      <b>${address}</b>
      यह शपथ पत्र
      <b>${purpose}</b>
      हेतु प्रस्तुत करता हूँ।
      `;

      break;

    case "Arabic":

      bodyText = `
      أنا
      <b>${fullName}</b>
      ابن
      <b>${fatherName}</b>
      عمري
      <b>${age}</b>
      سنة،
      المقيم في
      <b>${address}</b>
      أقر هذا البيان من أجل
      <b>${purpose}</b>.
      `;

      break;

    default:

      bodyText = `
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
      `;

  }

  // ================= PREVIEW =================

  preview.className =
  affidavitColor +
  "-theme";

  preview.dir =
  languageData.dir;

  preview.innerHTML = `

  <div class="watermark-overlay">

  ${
    watermarkType === "none"
      ? ""
      : watermarkType.toUpperCase()
  }

  </div>

  ${photoHTML}

  <h2>

  ${countryData.flag}

  ${languageData.title}

  </h2>

  <p>

  <b>Country:</b>

  ${country}

  </p>

  <p>

  <b>Affidavit No:</b>

  ${currentAffidavitNo}

  </p>

  <hr>

  <p>

  ${bodyText}

  </p>

  <hr>

  <p>

  ${sworn}

  </p>

  <br><br>

  ${signatureHTML}

  <br>

  __________________

  <br>

  Deponent Signature

  `;

  preview.style.display =
  "block";

}

// ====================== PRINT ENGINE ======================

document
.getElementById("printBtn")
?.addEventListener(

"click",

() => {

  window.print();

}

);

// ====================== PDF ENGINE ======================

document
.getElementById("pdfBtn")
?.addEventListener(

"click",

async () => {

  if (!currentAffidavitNo) {

    alert(
      "Generate affidavit first."
    );

    return;

  }

  try {

    const preview =
    document.getElementById(
      "preview"
    );

    const canvas =
    await html2canvas(
      preview,
      {
        scale:2,
        backgroundColor:"#ffffff"
      }
    );

    const imgData =
    canvas.toDataURL(
      "image/png"
    );

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth =
    210;

    const pdfHeight =
    canvas.height *
    pdfWidth /
    canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(

      `Affidavit_${currentAffidavitNo}.pdf`

    );

  }

  catch (e) {

    console.error(e);

    alert(
      "PDF generation failed"
    );

  }

}

);

// ====================== PNG ENGINE ======================

document
.getElementById("pngBtn")
?.addEventListener(

"click",

async () => {

  if (!currentAffidavitNo) {

    alert(
      "Generate affidavit first."
    );

    return;

  }

  try {

    const preview =
    document.getElementById(
      "preview"
    );

    const canvas =
    await html2canvas(
      preview,
      {
        scale:2,
        backgroundColor:"#ffffff"
      }
    );

    const link =
    document.createElement(
      "a"
    );

    link.download =

    `Affidavit_${currentAffidavitNo}.png`;

    link.href =
    canvas.toDataURL();

    link.click();

  }

  catch {

    alert(
      "PNG export failed"
    );

  }

}

);

// ====================== SHARE ENGINE ======================

document
.getElementById("shareBtn")
?.addEventListener(

"click",

async () => {

  if (!navigator.share) {

    alert(
      "Sharing not supported."
    );

    return;

  }

  try {

    await navigator.share({

      title:
      "Global Affidavit Generator Pro",

      text:

      document
      .getElementById(
        "preview"
      )
      ?.innerText ||

      ""

    });

  }

  catch (e) {

    console.log(e);

  }

}

);

// ====================== THEME BUTTON ======================

document
.getElementById("themeBtn")
?.addEventListener(

"click",

() => {

  document.body
  .classList
  .toggle(
    "light-theme"
  );

  localStorage.setItem(

    "theme",

    document.body
    .classList
    .contains(
      "light-theme"
    )

    ?

    "light"

    :

    "dark"

  );

}

);

// ====================== PREVIEW TOGGLE ======================

function setupPreviewToggle() {

  const preview =

  document.getElementById(
    "preview"
  );

  if (!preview) return;

  let toggleBtn =

  document.getElementById(
    "togglePreviewBtn"
  );

  if (!toggleBtn) {

    toggleBtn =
    document.createElement(
      "button"
    );

    toggleBtn.id =
    "togglePreviewBtn";

    toggleBtn.textContent =

    "👁 Show Preview";

    document
    .querySelector(
      ".container"
    )
    ?.appendChild(
      toggleBtn
    );

  }

  toggleBtn
  .addEventListener(

  "click",

  () => {

    if (

      preview.style.display ===
      "none"

    ) {

      preview.style.display =
      "block";

      toggleBtn.textContent =

      "📄 Hide Preview";

    }

    else {

      preview.style.display =
      "none";

      toggleBtn.textContent =

      "👁 Show Preview";

    }

  }

  );

}


// ====================== PWA INSTALL ENGINE ======================

window.addEventListener(

"beforeinstallprompt",

(e) => {

  e.preventDefault();

  deferredPrompt = e;

  const installBtn =
  document.getElementById(
    "installBtn"
  );

  if (installBtn) {

    installBtn.style.display =
    "block";

  }

}

);

// ====================== INSTALL BUTTON ======================

document
.getElementById("installBtn")
?.addEventListener(

"click",

async () => {

  if (!deferredPrompt) {

    alert(
      "Installation not available."
    );

    return;

  }

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  deferredPrompt = null;

}

);

// ====================== APP INSTALLED ======================

window.addEventListener(

"appinstalled",

() => {

  const installBtn =
  document.getElementById(
    "installBtn"
  );

  if (installBtn) {

    installBtn.style.display =
    "none";

  }

}

);

// ====================== SERVICE WORKER ======================

if ("serviceWorker" in navigator) {

  window.addEventListener(

  "load",

  () => {

    navigator.serviceWorker

    .register("./sw.js")

    .then(() => {

      console.log(
      "Service Worker Registered"
      );

    })

    .catch(err => {

      console.log(
      "SW Error:",
      err
      );

    });

  }

  );

}

// ====================== CLEANUP ENGINE ======================

window.addEventListener(

"beforeunload",

() => {

  if (currentPhotoURL) {

    URL.revokeObjectURL(
      currentPhotoURL
    );

  }

}

);

// ====================== DOM READY ENGINE ======================

document.addEventListener(

"DOMContentLoaded",

() => {

  // Restore Theme

  if (

    localStorage.getItem(
      "theme"
    )

    ===

    "light"

  ) {

    document.body.classList.add(
      "light-theme"
    );

  }

  // Load Purposes

  loadPurposes();

  // Search Engine

  setupPurposeSearch();

  // Plans

  setupPlans();

  // Signature Engine

  initSignaturePad();

  // Preview Engine

  setupPreviewToggle();

  // Generate Button

  document
  .getElementById(
    "generateBtn"
  )
  ?.addEventListener(

  "click",

  generateAffidavit

  );

}

// ====================== END OF APP.JS ======================
);
