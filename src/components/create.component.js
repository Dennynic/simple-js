import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";

export class CreateComponent extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    this.$element.addEventListener("submit", submitFormHandler.bind(this));
    this.form = new Form(this.$element, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)],
    });
  }
}

function submitFormHandler(event) {
  event.preventDefault();
  if (this.form.isValid()) {
    const formData = {
      type: this.$element.type.value,
      ...this.form.value(),
    };
    this.form.clear();
    console.log("formData", formData);
  }
}
