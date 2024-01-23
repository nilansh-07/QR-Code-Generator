const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  developerLink = document.getElementById("developerLink");
let preValue;

// Create download button
const downloadBtn = document.createElement("button");
downloadBtn.innerText = "Download QR Code";
downloadBtn.classList.add("download-btn");
wrapper.querySelector(".form").appendChild(downloadBtn);

// Initially hide the download button and link
downloadBtn.style.display = "none";
developerLink.style.display = "none";

function generateQRCode() {
  let qrValue = qrInput.value.trim();
  
  // Check if input is empty, generate QR code for GitHub URL
  if (!qrValue) {
    qrValue = "https://github.com/nilansh-07";
  }

  if (preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
    downloadBtn.style.display = "block"; // Show the download button after QR code generation
    developerLink.style.display = "block"; // Show the link after QR code generation
  });
}

function downloadQRCode() {
  const link = document.createElement("a");
  link.href = qrImg.src;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

generateBtn.addEventListener("click", generateQRCode);
downloadBtn.addEventListener("click", downloadQRCode);

qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    downloadBtn.style.display = "none"; // Hide the download button if there's no QR code
    developerLink.style.display = "none"; // Hide the link if there's no QR code
  } else {
    // Delay QR code generation for a better user experience
    setTimeout(generateQRCode, 500);
  }
});

// Set the link href with your actual GitHub URL
developerLink.href = "https://github.com/nilansh-07";
