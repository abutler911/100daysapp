document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".days-container");

  for (let i = 1; i <= 100; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `day${i}`;
    checkbox.className = "day-checkbox";

    const label = document.createElement("label");
    label.htmlFor = `day${i}`;
    label.textContent = `Day ${i}`;

    dayDiv.appendChild(checkbox);
    dayDiv.appendChild(label);

    container.appendChild(dayDiv);
  }
});
