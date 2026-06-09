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
