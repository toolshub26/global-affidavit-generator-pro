let purposes = [];
let currentPlan = "FREE";

/* =========================
   LOAD PURPOSES
========================= */

async function loadPurposes() {

  try {

    const response =
      await fetch("purposes.json");

    const data =
      await response.json();

    purposes =
      Object.values(data).flat();

    populateDropdown(purposes);

  } catch (error) {

    console.log(error);

  }

}

function populateDropdown(list) {

  const dropdown =
    document.getElementById("purposeDropdown");

  dropdown.innerHTML =
    "<option>Select Purpose</option>";

  list.forEach(item => {

    const option =
      document.createElement("option");

    option.value = item;
    option.textContent = item;

    dropdown.appendChild(option);

  });

}

/* =========================
   SEARCH PURPOSE
========================= */

document
.getElementById("purposeSearch")
.addEventListener("input", function () {

  const search =
    this.value.toLowerCase();

  const filtered =
    purposes.filter(item =>
      item.toLowerCase().includes(search)
    );

  populateDropdown(filtered);

});

/* =========================
   PLAN BUTTONS
========================= */

const freePlan =
document.getElementById("freePlan");

const proPlan =
document.getElementById("proPlan");

const premiumPlan =
document.getElementById("premiumPlan");

if(freePlan){

freePlan.onclick=()=>{
currentPlan="FREE";
alert("Free Plan Activated");
};

proPlan.onclick=()=>{
currentPlan="PRO";
alert("Pro Plan Activated");
};

premiumPlan.onclick=()=>{
currentPlan="PREMIUM";
alert("Premium Plan Activated");
};

}

/* =========================
   GENERATE AFFIDAVIT
========================= */

document
.getElementById("generateBtn")
.addEventListener("click", function () {

const country =
document.getElementById("country").value;

const language =
document.getElementById("language").value;

const fullName =
document.getElementById("fullName").value;

const fatherName =
document.getElementById("fatherName").value;

const age =
document.getElementById("age").value;

const state =
document.getElementById("state").value;

const district =
document.getElementById("district").value;

const address =
document.getElementById("address").value;

const purpose =
document.getElementById("purposeDropdown").value;

const statement =
document.getElementById("swornStatement").value;

const affidavitNo =
"AFF-" + Date.now();

const today =
new Date().toLocaleDateString();

let photoHTML = "";

const photoInput =
document.getElementById("photoUpload");

if (
photoInput &&
photoInput.files.length > 0
){

photoHTML = `
<img
src="${URL.createObjectURL(photoInput.files[0])}"
class="preview-photo">
`;

}

let signatureHTML = "";

const canvas =
document.getElementById("signaturePad");

if(canvas){

signatureHTML = `
<img
src="${canvas.toDataURL()}"
class="preview-signature">
`;

}

document.getElementById("preview").innerHTML = `

${photoHTML}

<h2>AFFIDAVIT</h2>

<p>
<b>Plan:</b> ${currentPlan}<br>
<b>Affidavit No:</b> ${affidavitNo}<br>
<b>Country:</b> ${country}<br>
<b>Language:</b> ${language}<br>
<b>Date:</b> ${today}
</p>

<hr>

<p>
I,
<b>${fullName}</b>,
S/o
<b>${fatherName}</b>,

aged
<b>${age}</b>
years,

resident of

<b>${address}</b>,
<b>${district}</b>,
<b>${state}</b>,

hereby declare this affidavit
for
<b>${purpose}</b>.
</p>

<p>${statement}</p>

<div class="signature-box">

${signatureHTML}

<br>

_____________________

<br>

Deponent Signature

</div>

`;

});

/* =========================
   PRINT
========================= */

document
.getElementById("printBtn")
.addEventListener("click", () => {

window.print();

});

/* =========================
   PDF
========================= */

document
.getElementById("pdfBtn")
.addEventListener("click", () => {

window.print();

});

/* =========================
   SHARE
========================= */

document
.getElementById("shareBtn")
.addEventListener("click", async () => {

const text =
document.getElementById("preview").innerText;

if(navigator.share){

await navigator.share({

title:
"Global Affidavit Generator Pro",

text:text

});

}else{

alert("Sharing not supported");

}

});

/* =========================
   PNG DOWNLOAD
========================= */

const pngBtn =
document.getElementById("pngBtn");

if(pngBtn){

pngBtn.addEventListener("click",()=>{

html2canvas(
document.getElementById("preview")
).then(canvas=>{

const link =
document.createElement("a");

link.download =
"Affidavit.png";

link.href =
canvas.toDataURL();

link.click();

});

});

}

/* =========================
   THEME CHANGER
========================= */

const themeBtn =
document.getElementById("themeBtn");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle(
"light-theme"
);

};

}

/* =========================
   FREE VERSION
========================= */

const freeBtn =
document.getElementById("freeBtn");

if(freeBtn){

freeBtn.onclick=()=>{

alert(
"You are using Free Version"
);

};

}

/* =========================
   DIGITAL SIGNATURE
========================= */

const canvas =
document.getElementById("signaturePad");

if(canvas){

const ctx =
canvas.getContext("2d");

let drawing = false;

function start(e){

drawing = true;

ctx.beginPath();

ctx.moveTo(
e.offsetX,
e.offsetY
);

}

function draw(e){

if(!drawing) return;

ctx.lineTo(
e.offsetX,
e.offsetY
);

ctx.stroke();

}

function stop(){

drawing = false;

}

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

const clearBtn =
document.getElementById(
"clearSignature"
);

if(clearBtn){

clearBtn.onclick=()=>{

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

};

}

}

loadPurposes();
