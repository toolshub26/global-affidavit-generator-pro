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

