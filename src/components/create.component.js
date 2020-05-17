import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/api.service";

export class CreateComponent extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    this.$element.addEventListener("submit", submitFormHandler.bind(this));
    this.form = new Form(this.$element, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(5)],
    });
  }
}

async function submitFormHandler(event) {
  event.preventDefault();
  if (this.form.isValid()) {
    const formData = {
      type: this.$element.type.value,
      date: new Date().toLocaleDateString(),
      ...this.form.value(),
    };
    await apiService.createPost(formData);
    this.form.clear();
    alert("Post Created in DB");
  }
}
