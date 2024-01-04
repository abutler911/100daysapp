document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("current-date");
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("en-US", options);
  currentDateElement.textContent = today;
  const daysContainer = document.querySelector(".days-container");
  let savedDays = JSON.parse(localStorage.getItem("completedDays")) || [];
  // Function to calculate and update the total amount
  const updateTotal = () => {
    const totalAmount = savedDays.reduce(
      (total, dayIndex) => total + (dayIndex + 1),
      0
    );
    document.getElementById(
      "total-amount"
    ).textContent = `Total Saved: $${totalAmount}`;
  };
  // Function to toggle day state
  const toggleDay = (day) => {
    const dayIndex = parseInt(day.textContent.substring(1)) - 1;
    if (savedDays.includes(dayIndex)) {
      // Remove day from saved days if it's already there
      savedDays = savedDays.filter((d) => d !== dayIndex);
      day.classList.remove("completed");
    } else {
      // Add day to saved days if it's not there
      savedDays.push(dayIndex);
      day.classList.add("completed");
    }
    localStorage.setItem("completedDays", JSON.stringify(savedDays));
    updateTotal();
  };

  // Initial render of days
  for (let i = 1; i <= 100; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = `$${i}`;
    day.addEventListener("click", () => toggleDay(day));
    daysContainer.appendChild(day);

    // Set completed state if saved
    if (savedDays.includes(i - 1)) {
      day.classList.add("completed");
    }
  }
  updateTotal();
});
