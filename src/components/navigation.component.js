import { Component } from '../core/component';

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);
    this.tabs = [];
  }

  init() {
    this.$element.addEventListener('click', tabClickHandler.bind(this));
  }

  registerTabs(tabs) {
    this.tabs = tabs;
  }
}

function tabClickHandler(event) {
  event.preventDefault();
  const elementClassList = event.target.classList;
  const isElementHasClass = elementClassList.contains('tab');

  if (isElementHasClass) {
    const tabs = this.$element.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    elementClassList.add('active');
    const activeTab = this.tabs.find(
      tab => tab.name === event.target.dataset.name,
    );
    this.tabs.forEach(tab => tab.component.hide());
    activeTab.component.show();
  }
}
