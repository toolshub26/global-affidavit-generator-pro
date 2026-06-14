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
,

Bangladesh: {
  flag: "🇧🇩",
  code: "BD",
  currency: "BDT",
  emblem: "National Emblem"
},

SaudiArabia: {
  flag: "🇸🇦",
  code: "SA",
  currency: "SAR",
  emblem: "Palm Tree & Swords"
},

Canada: {
  flag: "🇨🇦",
  code: "CA",
  currency: "CAD",
  emblem: "Canadian Arms"
},

Australia: {
  flag: "🇦🇺",
  code: "AU",
  currency: "AUD",
  emblem: "Commonwealth Star"
}
};
const PLAN_COUNTRIES = {

FREE: [
"India",
"Pakistan",
"UAE",
"USA",
"UK"
],

PRO: [
"India",
"Pakistan",
"UAE",
"USA",
"UK",
"Bangladesh",
"SaudiArabia",
"Canada"
],

PREMIUM: [
"India",
"Pakistan",
"UAE",
"USA",
"UK",
"Bangladesh",
"SaudiArabia",
"Canada",
"Australia"
]

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
},

Bengali: {
  dir: "ltr",
  title: "হলফনামা"
},

French: {
  dir: "ltr",
  title: "AFFIDAVIT"
},

German: {
  dir: "ltr",
  title: "EIDESSTATTLICHE ERKLÄRUNG"
},

Spanish: {
  dir: "ltr",
  title: "DECLARACIÓN JURADA"
},

Turkish: {
  dir: "ltr",
  title: "YEMİNLİ BEYAN"
}

};
const PLAN_LANGUAGES = {

FREE: [
"English",
"Urdu",
"Hindi"
],

PRO: [
"English",
"Urdu",
"Hindi",
"Arabic",
"French"
],

PREMIUM: [
"English",
"Urdu",
"Hindi",
"Arabic",
"Bengali",
"French",
"German",
"Spanish",
"Turkish"
]

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
"Court Affidavit",
"Education Loan",
"Property Transfer",
"Birth Certificate Correction",
"Character Certificate",
"Gap Certificate",
"Bonafide Certificate",
"Single Status",
"Tenant Verification",
"Rental Agreement",
"Legal Heir",
"Affidavit of Truth",
"Witness Statement",
"Loan Declaration"
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
const PLAN_FEATURES = {

FREE: [
"20 purposes",
"5 countries",
"4 languages",
"Watermark compulsory",
"Ads"
],

PRO: [
"50 countries",
"20 languages",
"50+ purposes",
"No ads",
"QR verification",
"PDF & PNG"
],

PREMIUM: [
"200+ countries",
"1000+ purposes",
"50 languages",
"AI generator",
"Notary section",
"Witness section",
"Barcode",
"Digital seal",
"Cloud backup",
"Priority support"
]

};

const PLAN_PRICES = {

India: {
PRO_MONTH: "₹199",
PRO_YEAR: "₹1499",
PREMIUM_MONTH: "₹499",
PREMIUM_YEAR: "₹3999"
},

Pakistan: {
PRO_MONTH: "Rs 799",
PRO_YEAR: "Rs 5999",
PREMIUM_MONTH: "Rs 1999",
PREMIUM_YEAR: "Rs 14999"
},

UAE: {
PRO_MONTH: "AED 15",
PRO_YEAR: "AED 120",
PREMIUM_MONTH: "AED 39",
PREMIUM_YEAR: "AED 299"
},

USA: {
PRO_MONTH: "$4.99",
PRO_YEAR: "$39.99",
PREMIUM_MONTH: "$9.99",
PREMIUM_YEAR: "$79.99"
},

UK: {
PRO_MONTH: "£3.99",
PRO_YEAR: "£34.99",
PREMIUM_MONTH: "£8.99",
PREMIUM_YEAR: "£69.99"
}

};
// ====================== DEFAULT PURPOSES ======================
const DEFAULT_PURPOSES = [
  
"Employment Verification",
"Income Proof",
"Name Change",
"Marriage Certificate",
"Loss of Documents",
"Passport Application",
"Court Affidavit",
"Education Loan",
"Property Transfer",
"Birth Certificate Correction",
"Character Certificate",
"Gap Certificate",
"Bonafide Certificate",
"Single Status",
"Tenant Verification",
"Rental Agreement",
"Legal Heir",
"Affidavit of Truth",
"Witness Statement",
"Loan Declaration"
];
  
// ====================== HELPERS ======================

function escapeHTML(str) {
  str = String(str ?? "");

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
// ================= PLAN ENGINE =================

function isPro() {
return currentPlan === "PRO";
}

function isPremium() {
return currentPlan === "PREMIUM";
}

function hasFeature(feature) {

if (currentPlan === "PREMIUM") {
return PLAN_FEATURES.PREMIUM.includes(feature);
}

if (currentPlan === "PRO") {
return PLAN_FEATURES.PRO.includes(feature);
}

return PLAN_FEATURES.FREE.includes(feature);

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

populateCountries();

populateLanguages();

populateDropdown(
PLAN_PURPOSES.FREE
);

alert("FREE Plan Activated");

  });

  document
  .getElementById("proPlan")
  ?.addEventListener("click", () => {

    currentPlan = "PRO";

populateCountries();

populateLanguages();

populateDropdown(
PLAN_PURPOSES.PRO
);

alert("PRO Plan Activated");

  });

  document
  .getElementById("premiumPlan")
  ?.addEventListener("click", () => {

    currentPlan = "PREMIUM";

populateCountries();

populateLanguages();

populateDropdown(
PLAN_PURPOSES.PREMIUM
);

alert("PREMIUM Plan Activated");

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
function populateCountries() {

  const countrySelect =
  document.getElementById("country");

  if (!countrySelect) return;

  countrySelect.innerHTML = "";

  PLAN_COUNTRIES[currentPlan]
  .forEach(country => {

    countrySelect.innerHTML +=
    `<option value="${country}">
      ${country}
     </option>`;

  });

}


function populateLanguages() {

  const languageSelect =
  document.getElementById("language");

  if (!languageSelect) return;

  languageSelect.innerHTML = "";

  PLAN_LANGUAGES[currentPlan]
  .forEach(language => {

    languageSelect.innerHTML +=
    `<option value="${language}">
      ${language}
     </option>`;

  });

}
// ====================== PURPOSE SEARCH ======================



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
const currentDate =
new Date().toLocaleDateString();

const currentTime =
new Date().toLocaleTimeString();

const countryCode =
countryData.code;

const currency =
countryData.currency;

const emblem =
countryData.emblem;
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
case "Bengali":

bodyText = `
আমি
<b>${fullName}</b>
পিতা
<b>${fatherName}</b>
বয়স
<b>${age}</b>
বছর,
বাসিন্দা
<b>${address}</b>
এই হলফনামা
<b>${purpose}</b>
জন্য প্রদান করছি।
`;

break;

case "French":

bodyText = `
Je,
<b>${fullName}</b>,
fils de
<b>${fatherName}</b>,
âgé de
<b>${age}</b>
ans,
résidant à
<b>${address}</b>,
déclare cet affidavit pour
<b>${purpose}</b>.
`;

break;

case "German":

bodyText = `
Ich,
<b>${fullName}</b>,
Sohn von
<b>${fatherName}</b>,
<b>${age}</b>
Jahre alt,
wohnhaft in
<b>${address}</b>,
gebe diese Erklärung für
<b>${purpose}</b> ab.
`;

break;

case "Spanish":

bodyText = `
Yo,
<b>${fullName}</b>,
hijo de
<b>${fatherName}</b>,
de
<b>${age}</b>
años,
residente en
<b>${address}</b>,
declaro esta declaración jurada para
<b>${purpose}</b>.
`;

break;

case "Turkish":

bodyText = `
Ben,
<b>${fullName}</b>,
babası
<b>${fatherName}</b>,
<b>${age}</b>
yaşında,
<b>${address}</b>
adresinde ikamet eden,
bu beyanı
<b>${purpose}</b>
için veriyorum.
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
    (currentPlan === "FREE")
? "FREE VERSION"
: (
watermarkType === "none"
? ""
: watermarkType.toUpperCase()
)
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
<p>
<b>Date:</b>
${currentDate}
</p>

<p>
<b>Time:</b>
${currentTime}
</p>

<p>
<b>Country Code:</b>
${countryCode}
</p>

<p>
<b>Currency:</b>
${currency}
</p>

<p>
<b>National Emblem:</b>
${emblem}
</p>
  <hr>
${isPro() || isPremium()
? `<hr>
<p><b>QR Verification:</b> VERIFIED-${currentAffidavitNo}</p>`
: ""}
${isPremium()
? `<p><b>Barcode:</b> BAR-${currentAffidavitNo}</p>`
: ""}

${isPremium()
? `<p><b>Digital Seal:</b> AUTHENTIC DOCUMENT</p>`
: ""}
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
<br><br>
${isPremium()
? `
<br><br>
_________________
<br>
Witness Signature
`
: ""}
<b>Date:</b>
${currentDate}

<br>

<b>Time:</b>
${currentTime}

<br>

<b>Country Code:</b>
${countryCode}

<br>

<b>Currency:</b>
${currency}

<br>

<b>National Emblem:</b>
${emblem}
${isPremium()
? `
<br><br>
_________________
<br>
Notary Public
`
: ""}
  `;
  
  preview.style.display =
  "block";

}

// ====================== PRINT ENGINE ======================

document.getElementById("printBtn")?.addEventListener(
  "click",
  () => {

    if (!currentAffidavitNo) {
      alert("Generate affidavit first.");
      return;
    }

    window.print();

  }
);

// ====================== PDF ENGINE ======================

document
.getElementById("pdfBtn")
?.addEventListener(

"click",

async () => {
if (currentPlan === "FREE") {
  alert("PDF export available in PRO plan.");
  return;
}
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

    if (currentPlan === "FREE") {
        alert("PNG export available in PRO plan.");
        return;
    }

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
if (currentPlan === "FREE") {
    alert("Sharing available in PRO plan.");
    return;
}
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

  populateCountries();

populateLanguages();

populateDropdown(
PLAN_PURPOSES[currentPlan]
);
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
  
});

window.generateAffidavit = generateAffidavit;

