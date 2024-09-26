// Select the icon and modal elements
const icon = document.getElementById("icon-click");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");
const invokeUrlButton = document.getElementById("invoke-url");
const urlInput = document.getElementById("url-input");

let clickCount = 0;

// Detect 3 clicks on the icon
icon.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 3) {
    // Reset click count after modal is opened
    clickCount = 0;
    openModal();
  }
});

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModalFunc() {
  modal.style.display = "none";
}

// Event listener to close the modal when "x" is clicked
closeModal.addEventListener("click", closeModalFunc);

// Event listener to navigate to the URL
invokeUrlButton.addEventListener("click", () => {
  const url = urlInput.value;

  // Function to validate URL
  function isValidUrl(string) {
    try {
      // Using the URL constructor to validate
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  // Check if the URL is valid
  if (url && isValidUrl(url)) {
    // window.location.href = url; // Navigate to the URL
    window.open(url, "_blank"); // Opens the URL in a new tab
  } else {
    alert("Invalid URL. Please enter a proper URL.");
  }
});

// Event listener to close modal when clicked outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalFunc();
  }
});
