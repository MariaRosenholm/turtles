"use strict";

(function () {
  let inputField;
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

    inputField = document.getElementById("searchNumber");
    document.getElementById("submit").addEventListener("click", send);
    document.getElementById("update").addEventListener("click", update);
  }

  async function send() {
    clearMessageArea();
    const number = inputField.value;

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ number }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/getOne", options);
      const resultJson = await data.json();
      updatePage(resultJson);
    } catch (err) {
      updateMessageArea(err.message);
    }
  }

  function updatePage(result) {
    if (result) {
      if (result.message) {
        updateMessageArea(result.message, result.type);
      } else {
        updateTurtle(result);
      }
    } else {
      updateMessageArea("Not found");
    }
  }

  function updateTurtle(turtle) {
    numberField.value = turtle.number;
    nameField.value = turtle.name;
    ageField.value = turtle.age;
    speedField.value = turtle.speed;
    weightField.value = turtle.weightKg;
  }

  async function update() {
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
      const data = await fetch("/update", options);
      const resultJson = await data.json();
      if (resultJson.message) {
        updateMessageArea(resultJson.message, resultJson.type);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
