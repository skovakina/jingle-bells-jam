export default class Form {
  constructor(form, handleSubmit) {
    this._form = form;
    this._handleSubmit = handleSubmit;
    this._formInputs = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const data = {};
    this._formInputs.forEach((item) => {
      data[item.name] = item.value;
    });

    return data;
  }

  setInputValues(data) {
    this._formInputs.forEach((item) => {
      item.value = data[item.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  _handleSubmitForm = (evt) => {
    this._handleSubmit(this._getInputValues());
    evt.preventDefault();
  };

  reset() {
    this._form.reset();
  }
}
