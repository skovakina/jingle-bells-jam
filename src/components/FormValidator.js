export default class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // _toggleButtonState() {
  //   if (this._hasInvalidInput(this._inputList)) {
  //     this.disableSubmitButton();
  //   } else {
  //     this._buttonElement.classList.remove(this._options.inactiveButtonClass);
  //     this._buttonElement.disabled = false;
  //   }
  // }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.classList.add(this._options.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, this._options);
      console.log("error");
    } else {
      this._hideInputError(inputElement, this._options);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._options.inputSelector)
    );
    // this._buttonElement = this._form.querySelector(
    //   this._options.submitButtonSelector
    // );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // this._toggleButtonState();
      });
    });
  }

  // disableSubmitButton() {
  //   this._buttonElement.classList.add(this._options.inactiveButtonClass);
  //   this._buttonElement.disabled = true;
  // }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form, this._options);
  }
}
