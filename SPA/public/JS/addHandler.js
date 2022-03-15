"use strict";

(function () {
  let numberField;
  let nameField;
  let ageField;
  let speedField;
  let weightField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    ageField = document.getElementById("age");
    speedField = document.getElementById("speed");
    weightField = document.getElementById("weight");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    const turtle = {
      number: numberField.value,
      name: nameField.value,
      age: ageField.value,
      speed: speedField.value,
      weightKg: weightField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(turtle),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/add", options);
      const resultJson = await data.json();
      if (resultJson.message) {
        updateMessageArea(resultJson.message, resultJson.type);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
