function savePDF(elementId, filename) {
  const element = document.getElementById(elementId);

  html2pdf()
    .from(element)
    .save(filename + ".pdf");
}
