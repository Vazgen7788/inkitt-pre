import _ from 'lodash';
import Component from '../../abstract/Component';
import * as keyboardCodes from '../../constants/KeyboardNavKeyCodes';
import Autocomplete from './Autocomplete';
import template from './index.html';

export default class SearchInput extends Component {
  get template() {
    return template;
  }

  constructor() {
    super(...arguments);
    this.opened = false;
    this.autocomplete = new Autocomplete({
      search: this.search.bind(this)
    });
    this.inputRef = this.$el.querySelector('input');
    this.inputWrapperRef = this.$el.querySelector('.search-input-container');
    this.inputRef.addEventListener('focus', this.open.bind(this));
    this.inputRef.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.inputRef.addEventListener('input', _.debounce(this.handleChange.bind(this), 500));
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  open(e) {
    if (this.opened) return false;
    event.target.select();
    this.opened = true;
    this.inputWrapperRef.appendChild(this.autocomplete.$el);
  }

  close() {
    if (!this.opened) return false;
    this.opened = false;
    this.inputWrapperRef.removeChild(this.autocomplete.$el);
  }

  handleKeyUp({ keyCode }) {
    const { UP, DOWN, ENTER } = keyboardCodes;

    switch (keyCode) {
      case UP:
        this.autocomplete.markPrev();
        break;
      case DOWN:
        this.autocomplete.markNext();
        break;
      case ENTER:
        this.search(this.inputRef.value);
        break;
      default:
    }
  }

  handleChange(e) {
    if (!this.getAutocomplete) return;

    this.getAutocomplete(e.target.value).then(autocompleteItmes => {
      this.autocomplete.update(autocompleteItmes);
    });
  }

  handleClickOutside(e) {
    if (!this.inputWrapperRef.contains(event.target)) {
      this.close();
    }
  }

  search(query) {
    if (!this.runSearch) return;
    let active = this.autocomplete.getActive();

    this.close();
    this.inputRef.value = active || query;
    this.runSearch(this.inputRef.value);
    this.autocomplete.removeActive();
    document.activeElement.blur();
  }
}
