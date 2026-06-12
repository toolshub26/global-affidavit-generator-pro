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
