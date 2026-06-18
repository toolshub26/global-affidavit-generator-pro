// =====================================
// AGI ULTRA PRO
// AFFIDAVIT TEMPLATES ENGINE
// =====================================

export const AFFIDAVIT_TEMPLATES = {

passport_loss: {

id: "passport_loss",

category: "Identity",

title: "AFFIDAVIT FOR LOSS OF PASSPORT",

keywords: [
"passport loss affidavit",
"lost passport declaration",
"passport missing affidavit"
],

fields: [
"fullName",
"fatherName",
"age",
"address",
"passportNumber",
"dateOfLoss",
"placeOfLoss"
],

clauses: [
"identity",
"ownership",
"loss",
"search",
"undertaking",
"verification"
]

},

name_change: {

id: "name_change",

category: "Identity",

title: "AFFIDAVIT FOR NAME CHANGE",

keywords: [
"name change affidavit",
"change of name declaration"
],

fields: [
"fullName",
"fatherName",
"age",
"address",
"oldName",
"newName"
],

clauses: [
"identity",
"nameChange",
"verification"
]

},

marriage_affidavit: {

id: "marriage_affidavit",

category: "Family",

title: "MARRIAGE AFFIDAVIT",

keywords: [
"marriage affidavit",
"marital declaration"
],

fields: [
"fullName",
"spouseName",
"marriageDate",
"address"
],

clauses: [
"identity",
"marriage",
"verification"
]

},

income_proof: {

id: "income_proof",

category: "Financial",

title: "INCOME PROOF AFFIDAVIT",

keywords: [
"income affidavit",
"salary declaration"
],

fields: [
"fullName",
"occupation",
"incomeAmount",
"address"
],

clauses: [
"identity",
"income",
"verification"
]

},

employment_verification: {

id: "employment_verification",

category: "Employment",

title: "EMPLOYMENT VERIFICATION AFFIDAVIT",

keywords: [
"employment affidavit",
"job verification"
],

fields: [
"fullName",
"companyName",
"designation",
"address"
],

clauses: [
"identity",
"employment",
"verification"
]

},

tenant_verification: {

id: "tenant_verification",

category: "Property",

title: "TENANT VERIFICATION AFFIDAVIT",

keywords: [
"tenant affidavit",
"rental declaration"
],

fields: [
"fullName",
"address",
"landlordName"
],

clauses: [
"identity",
"tenancy",
"verification"
]

}

};
