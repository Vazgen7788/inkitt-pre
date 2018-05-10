export default class Component {
  constructor(el) {
    const componentName = this.constructor.name;
    el.innerHTML = require(`../components/${componentName}/index.html`);
    this.$el = el;

    if (typeof this.init === 'function') {
      this.init();
    }
  }
}
