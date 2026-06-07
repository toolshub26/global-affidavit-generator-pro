function shareAffidavit(text) {
    if (navigator.share) {
        navigator.share({
            title: "Global Affidavit Generator Pro",
            text: text
        });
    } else {
        alert("Sharing is not supported on this device.");
    }
}
