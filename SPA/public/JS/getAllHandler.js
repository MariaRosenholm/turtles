"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    try {
      const data = await fetch("/getAll");
      const turtles = await data.json();
      const resultArea = document.getElementById("results");
      for (let turtle of turtles) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(turtle.number));
        tr.appendChild(createCell(turtle.name));
        tr.appendChild(createCell(turtle.age));
        tr.appendChild(createCell(turtle.speed));
        tr.appendChild(createCell(turtle.weightKg));
        resultArea.appendChild(tr);
      }
    } catch (err) {
      document.getElementById(
        "errorMessage"
      ).innerHTML = `<p class="error">${err.message}</p>`;
    }
  }
  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
