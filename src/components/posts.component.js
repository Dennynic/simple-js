import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$element.addEventListener("click", buttonClickHandler);
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map((post) => renderPost(post));
    this.loader.hide();
    this.$element.insertAdjacentHTML("afterbegin", html.join(" "));
  }

  onHide() {
    this.$element.innerHTML = "";
  }
}

function renderPost(post) {
  const tag =
    post.type === "news"
      ? ` <li class="tag tag-blue tag-rounded">Новость</li>`
      : ` <li class="tag tag-rounded">Заметка</li>`;

  const isFavorites = (
    JSON.parse(localStorage.getItem("favorites")) || []
  ).includes(post.id);

  const button = isFavorites
    ? `<button data-id="${post.id}" class = "button-round button-small button-danger">Удалить</button>`
    : `<button data-id="${post.id}" class = "button-round button-small button-primary">Сохранить</button>`;

  return `<div class="panel">
            <div class="panel-head">
              <p class="panel-title">${post.title}</p>
              <ul class="tags">
               ${tag}
              </ul>
            </div>
            <div class="panel-body">
              <p class="multi-line">${post.fulltext}</p>
            </div>
            <div class="panel-footer w-panel-footer">
              <small>${post.date}</small>
              ${button}
            </div>
        </div>`;
}

const buttonClickHandler = (event) => {
  const $el = event.target;
  const id = $el.dataset.id;

  if (id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
      $el.textContent = "Сохранить";
      $el.classList.add("button-primary");
      $el.classList.remove("button-danger");
      favorites = favorites.filter(fId => fId !== id);
    } else {
      $el.classList.add("button-danger");
      $el.classList.remove("button-primary");
      $el.textContent = "Удалить";
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
