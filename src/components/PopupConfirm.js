export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._button = this._popup.querySelector(".popup__btn");
  }

  open() {
    this._popup.classList.add("popup_opened");

    this.setEventListeners();
  }

  close = () => {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  };

  setEventListeners() {
    this._button.addEventListener("click", this.close);
    document.addEventListener("mousedown", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleEscKeydown);
  }

  removeEventListeners() {
    this._closeButton.removeEventListener("click", this.close);
    document.removeEventListener("mousedown", this._handleOverlayClick);
    document.removeEventListener("keydown", this._handleEscKeydown);
  }

  _handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };

  _handleEscKeydown = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
