export default class Autocomplete {
  constructor({ search }) {
    const ul = document.createElement('ul');
    ul.classList.add('autocomplete-container');
    ul.classList.add('list-group');

    const li = document.createElement('li');
    li.classList.add('list-group-item-action');
    li.classList.add('list-group-item');

    const recentNote = document.createElement('li');
    recentNote.classList.add('recent-searches-note');
    recentNote.classList.add('list-group-item');
    recentNote.textContent = "Recent Searches";
    this.showRecent = false;

    this.$el = ul;
    this.autocompleteItem = li;
    this.recentNote = recentNote;
    this.search = search;
    this.removeActive = this.removeActive.bind(this);
    this.$el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    if (e.target.tagName === 'LI') {
      this.search(e.target.textContent);
    }
  }

  update(items) {
    items.forEach((item, index) => {
      const currentIndex = this.showRecent ? index + 1 : index;
      const li = this.$el.childNodes[currentIndex];

      if (li) {
        li.textContent = item.text;
      } else {
        const autocompleteItem = this.autocompleteItem.cloneNode();
        autocompleteItem.textContent = item.text;
        this.$el.appendChild(autocompleteItem);
      }
    });

    const childNodesMaxCount = this.showRecent ? items.length + 1 : items.length;
    while (this.$el.childNodes.length > childNodesMaxCount) {
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

    if (this.showRecent && nextIndex === 0) {
      nextIndex = next ? nextIndex + 1 : nextIndex -1;
    }

    const nextEl = this.$el.childNodes[nextIndex];

    if (nextEl) {
      nextEl.classList.add('active');
    }
  }

  toggleRecent(show = false) {
    if (show) {
      this.showRecent = true;
      this.$el.prepend(this.recentNote);
    } else if (this.$el.contains(this.recentNote)) {
      this.showRecent = false;
      this.$el.removeChild(this.recentNote);
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
    return activeEl && activeEl.textContent;
  }

  removeActive() {
    this.$el.childNodes.forEach((node) => {
      if (node.classList.contains('active')) {
        node.classList.remove('active');
      }
    });
  }
}
