// Global Affidavit Generator Pro
// Verification Module

function verifyAffidavit() {

    const input = document.getElementById("verifyId");
    const result = document.getElementById("verifyResult");

    if (!input || !result) return;

    const affidavitId = input.value.trim();

    if (affidavitId === "") {
        alert("Please enter an Affidavit ID.");
        return;
    }

    result.innerHTML = `
        <div class="history-card">
            <h3>Verification System Coming Soon</h3>
            <p>
            QR Verification, Cloud Verification and Digital Authenticity Check
            will be available in future versions.
            </p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    const verifyBtn = document.getElementById("verifyBtn");

    if (verifyBtn) {
        verifyBtn.addEventListener("click", verifyAffidavit);
    }

});
