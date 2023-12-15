import "./index.css";
import data from "../scripts/data.json";
import FormValidator from "../components/FormValidator.js";

console.log(data);

const map = L.map("map").setView([51.505, -0.09], 2);
const path = [];

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

data.countries.forEach((item) => {
  L.marker([item.latitude, item.longitude])
    .addTo(map)
    .bindPopup(item.name)
    .openPopup();
  path.push([item.latitude, item.longitude, item.optimized_position]);
});

const optimalPath = path.sort((a, b) => a[2] - b[2]);
const polyline = L.polyline(optimalPath, { color: "red" }).addTo(map);

const form = document.forms.form;

const options = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "popup__btn-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// const formValidator = new FormValidator(options, form);
// formValidator.enableValidation();
