document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".day-checkbox");
  let savedData = JSON.parse(localStorage.getItem("100DaysChallenge")) || [];

  // Load saved progress
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedData[index] || false;
    checkbox.addEventListener("change", () => saveProgress());
  });

  function saveProgress() {
    savedData = Array.from(checkboxes).map((checkbox) => checkbox.checked);
    localStorage.setItem("100DaysChallenge", JSON.stringify(savedData));
  }
});
