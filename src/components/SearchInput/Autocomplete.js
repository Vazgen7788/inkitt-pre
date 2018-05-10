export default class Autocomplete {
  constructor({ search }) {
    const ul = document.createElement('ul');
    ul.classList.add('autocomplete-container');
    ul.classList.add('list-group');

    const li = document.createElement('li');
    li.classList.add('list-group-item-action');
    li.classList.add('list-group-item');

    this.$el = ul;
    this.autocompleteItem = li;
    this.search = search;
    this.$el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    if (e.target.tagName === 'LI') {
      this.search(e.target.innerHTML);
    }
  }

  update(items) {
    items.forEach((item, index) => {
      const li = this.$el.childNodes[index];

      if (li) {
        li.innerHTML = item.text;
      } else {
        const autocompleteItem = this.autocompleteItem.cloneNode();
        autocompleteItem.innerHTML = item.text;
        this.$el.appendChild(autocompleteItem);
      }
    });

    while (this.$el.childNodes.length > items.length) {
      this.$el.removeChild(this.$el.childNodes[this.$el.childNodes.length - 1]);
    }
  }

  mark(next = true) {
    const activeEl = this.$el.querySelector('.active');
    const nodesArray = [].slice.call(this.$el.childNodes);
    let nextIndex = next ? 0 : nodesArray.length - 1;

    if (activeEl) {
      nextIndex = nodesArray.indexOf(activeEl) + (next ? 1 : -1);
      activeEl.classList.remove('active');
    }
    const nextEl = this.$el.childNodes[nextIndex]

    if (nextEl) {
      nextEl.classList.add('active');
    }
  }

  markNext() {
    this.mark(true);
  }

  markPrev() {
    this.mark(false);
  }

  getActive() {
    const activeEl = this.$el.querySelector('.active');
    return activeEl && activeEl.innerHTML;
  }
}
