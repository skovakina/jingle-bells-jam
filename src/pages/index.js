import "./index.css";
import santa from "../images/santa.png";
import data from "../scripts/data.json";
import FormValidator from "../components/FormValidator.js";
import Form from "../components/Form.js";
import Popup from "../components/PopupConfirm.js";

const map = L.map("map").setView([51.505, -0.09], 2);
const path = [];

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const santaIcon = L.icon({
  iconUrl: santa,
  iconSize: [35, 48],
  iconAnchor: [10, 20],
  popupAnchor: [5, -20],
});

data.countries.forEach((item) => {
  L.marker([item.latitude, item.longitude], { icon: santaIcon })
    .addTo(map)
    .bindPopup(item.name)
    .openPopup();
  path.push([item.latitude, item.longitude, item.optimized_position]);
});

const optimalPath = path.sort((a, b) => a[2] - b[2]);
const polyline = L.polyline(optimalPath).addTo(map);

document.querySelector(
  ".map__distance_type_before"
).textContent = `${Math.round(data.total_distance_random)} mi`;
document.querySelector(".map__distance_type_after").textContent = `${Math.round(
  data.total_distance_opt
)} mi`;
const form = document.forms.form;
const popup = document.querySelector(".popup-confirm");
const dataLetters = [];

const options = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formValidator = new FormValidator(options, form);
formValidator.enableValidation();

const popupConfirm = new Popup(popup);

const formLetter = new Form(form, () => {
  popupConfirm.open();
  dataLetters.push(formLetter._getInputValues());
  formLetter.reset();
});

formLetter.setEventListeners();
