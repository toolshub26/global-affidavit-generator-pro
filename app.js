let purposes = [];

async function loadPurposes() {
  try {
    const response = await fetch("purposes.json");
    const data = await response.json();

    purposes = Object.values(data).flat();
    populateDropdown(purposes);

  } catch (error) {
    console.log("Purpose loading failed", error);
  }
}

function populateDropdown(list) {

  const dropdown =
    document.getElementById("purposeDropdown");

  dropdown.innerHTML =
    '<option>Select Purpose</option>';

  list.forEach(item => {

    const option =
      document.createElement("option");

    option.value = item;
    option.textContent = item;

    dropdown.appendChild(option);

  });
}

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

  document.getElementById("preview").innerHTML = `

    <h2>AFFIDAVIT</h2>

    <p>
    <b>Affidavit No:</b> ${affidavitNo}<br>
    <b>Country:</b> ${country}<br>
    <b>Language:</b> ${language}<br>
    <b>Date:</b> ${today}
    </p>

    <hr>

    <p>
    I, <b>${fullName}</b>,
    S/o <b>${fatherName}</b>,
    aged <b>${age}</b> years,

    resident of
    <b>${address}</b>,
    <b>${district}</b>,
    <b>${state}</b>,

    hereby declare this affidavit
    for <b>${purpose}</b>.
    </p>

    <p>${statement}</p>

    <br><br>

    <p>
    _______________________<br>
    Deponent Signature
    </p>
  `;
});

document
.getElementById("printBtn")
.addEventListener("click", function () {
  window.print();
});

document
.getElementById("shareBtn")
.addEventListener("click", async function () {

  const text =
    document.getElementById("preview").innerText;

  if (navigator.share) {

    await navigator.share({
      title: "Global Affidavit Generator Pro",
      text: text
    });

  } else {

    alert("Sharing not supported on this device.");

  }
});

document
.getElementById("pdfBtn")
.addEventListener("click", function () {

  const text =
    document.getElementById("preview").innerText;

  const blob =
    new Blob([text], { type: "text/plain" });

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "Affidavit.txt";

  link.click();
});

document
.getElementById("freeBtn")
.addEventListener("click", function () {

  alert(
    "You are using Global Affidavit Generator Pro - Free Version"
  );

});

loadPurposes();
