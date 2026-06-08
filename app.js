// Simple test version – sirf Generate button kaam karega
document.addEventListener("DOMContentLoaded", function() {
  console.log("Page loaded");

  const generateBtn = document.getElementById("generateBtn");
  if (!generateBtn) {
    alert("Generate button not found in HTML");
    return;
  }

  generateBtn.addEventListener("click", function() {
    alert("Generate button clicked");

    // Get values
    const fullName = document.getElementById("fullName")?.value || "No Name";
    const fatherName = document.getElementById("fatherName")?.value || "";
    const country = document.getElementById("country")?.value || "";
    
    // Preview div
    const previewDiv = document.getElementById("preview");
    if (!previewDiv) {
      alert("Preview div not found");
      return;
    }

    // Simple HTML
    previewDiv.innerHTML = `
      <h2>TEST AFFIDAVIT</h2>
      <p>Name: ${fullName}</p>
      <p>Father: ${fatherName}</p>
      <p>Country: ${country}</p>
      <p>This is a test. If you see this, Generate button is working.</p>
    `;
    previewDiv.style.display = "block";
    alert("Preview updated! Scroll down to see.");
  });
});
