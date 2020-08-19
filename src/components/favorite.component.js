import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { renderPost } from '../templates/post.template';

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id);
    this.loader = options.loader;
  }

  init() {
    this.$element.addEventListener('click', linkClickHandler.bind(this));
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = renderList(favorites);
    this.$element.insertAdjacentHTML('afterbegin', html);
  }

  onHide() {
    this.$element.innerHTML = '';
  }
}

async function linkClickHandler(event) {
  event.preventDefault();
  const link = event.target.dataset.type;

  if (link === 'js-link') {
    this.$element.innerHTML = '';
    this.loader.show();
    const postId = event.target.dataset.id;
    const post = await apiService.fetchPostById(postId);
    this.loader.hide();
    this.$element.insertAdjacentHTML(
      'afterbegin',
      renderPost(post, { withButtons: false }),
    );
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `<ul>
        ${list
          .map(i => `<li><a href="#" data-id="${i.id}" data-type="js-link">${i.title}</a></li>`)
          .join('')}
</ul>`;
  }
  return '<p class="center">Nothing to show</p>';
}
