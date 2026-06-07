function saveDraft(data) {
    localStorage.setItem("affidavitDraft", JSON.stringify(data));
}

function loadDraft() {
    return JSON.parse(localStorage.getItem("affidavitDraft"));
}

function clearDraft() {
    localStorage.removeItem("affidavitDraft");
}
