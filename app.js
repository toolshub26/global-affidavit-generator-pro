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

