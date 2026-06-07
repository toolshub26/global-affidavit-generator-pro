// Global Affidavit Generator Pro
// Drafts Module

function loadDrafts() {
    const draftList = document.getElementById("draftList");

    if (!draftList) return;

    draftList.innerHTML = `
        <div class="history-card">
            <h3>No Drafts Available</h3>
            <p>Your saved drafts will appear here in future versions.</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadDrafts);
