export default class Component {
  constructor(el) {
    const componentName = this.constructor.name;
    el.innerHTML = this.template || require(`../components/${componentName}/index.html`);
    this.$el = el;
  }
}
