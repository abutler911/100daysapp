document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("current-date");
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("en-US", options);
  currentDateElement.textContent = today;

  const challengeStartDate = new Date("2024-01-01");
  const dayDifference =
    Math.floor((new Date() - challengeStartDate) / (1000 * 60 * 60 * 24)) + 1;
  const currentChallengeDay = Math.min(dayDifference, 100);
  document.getElementById(
    "current-challenge-day"
  ).textContent = `Current Challenge Day: ${currentChallengeDay}`;

  const daysContainer = document.querySelector(".days-container");
  let savedDays = JSON.parse(localStorage.getItem("completedDays")) || [];

  const updateTotal = () => {
    const totalAmount = savedDays.reduce(
      (total, dayIndex) => total + (dayIndex + 1),
      0
    );
    document.getElementById(
      "total-amount"
    ).textContent = `Total Saved: $${totalAmount} out of $5050`;

    const progressPercent = (savedDays.length / 100) * 100;
    document.getElementById("progress-bar").style.width = progressPercent + "%";

    const progressPercentageSpan = document.getElementById(
      "progress-percentage"
    );
    progressPercentageSpan.textContent = progressPercent.toFixed(0) + "%";

    if (savedDays.length < currentChallengeDay) {
      document.getElementById("reminder-message").textContent =
        "You're behind schedule. Let's catch up!";
    } else {
      document.getElementById("reminder-message").textContent = "";
    }
  };

  const toggleDay = (day) => {
    const dayIndex = parseInt(day.textContent.substring(1)) - 1;
    if (savedDays.includes(dayIndex)) {
      savedDays = savedDays.filter((d) => d !== dayIndex);
      day.classList.remove("completed");
    } else {
      savedDays.push(dayIndex);
      day.classList.add("completed");
    }
    localStorage.setItem("completedDays", JSON.stringify(savedDays));
    updateTotal();
  };

  for (let i = 1; i <= 100; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = `$${i}`;
    day.addEventListener("click", () => toggleDay(day));
    daysContainer.appendChild(day);

    if (savedDays.includes(i - 1)) {
      day.classList.add("completed");
    }
  }
  updateTotal();
});

var category = "inspirational";

$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
  headers: { "X-Api-Key": "BdOaubTPAZ3OWYfGl+qh5Q==d4D3ZAfZchLj38QH" },
  contentType: "application/json",
  success: function (result) {
    console.log(result);
    if (result && result.length > 0) {
      var randomIndex = Math.floor(Math.random() * result.length);
      var randomQuote = result[randomIndex].quote;
      var author = result[0].author;

      $("#financial-quote").text(randomQuote);
      $("#author").text(`- ${author}` || "Unknown");
    } else {
      console.error("No quotes found for the specified category.");
    }
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});
