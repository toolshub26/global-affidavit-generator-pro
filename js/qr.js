function generateQRCode(text) {
  return new QRCode(document.getElementById("qrCode"), {
    text: text,
    width: 120,
    height: 120
  });
}
