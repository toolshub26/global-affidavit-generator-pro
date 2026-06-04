
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

  const fullName =
    document.getElementById("fullName").value;
const fatherName =
document.getElementById("fatherName").value;

const age =
document.getElementById("age").value;
  const purpose =
    document.getElementById("purposeDropdown").value;

  const statement =
    document.getElementById("swornStatement").value;

  document.getElementById("preview").innerHTML = `
    <h2>AFFIDAVIT</h2>

    <p>
I, <b>${fullName}</b>,
S/o <b>${fatherName}</b>,
aged <b>${age}</b> years,
hereby declare this affidavit
for <b>${purpose}</b>.
</p>

    <p>${statement}</p>
  `;
});

loadPurposes();
