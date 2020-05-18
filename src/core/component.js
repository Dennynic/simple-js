import css from "./style.css";

export class Component {
  constructor(id) {
    this.$element = document.getElementById(id);
    this.init();
  }

  init() {}

  onShow() {}

  onHide() {}

  hide() {
    this.$element.classList.add("hide");
    this.onHide();
  }

  show() {
    this.$element.classList.remove("hide");
    this.onShow();
  }
}
