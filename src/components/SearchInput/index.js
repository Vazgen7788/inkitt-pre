import Component from '../../abstract/Component';
import * as keyboardCodes from '../../constants/KeyboardNavKeyCodes';

export default class SearchInput extends Component {
  init() {
    this.inputRef = this.$el.querySelector('input');
    this.inputRef.addEventListener('focus', this.open.bind(this));
    this.inputRef.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.inputRef.addEventListener('input', this.handleChange.bind(this));
  }

  open() {
    // console.log('open', this);
  }

  handleKeyUp({ keyCode }) {
    const { UP, DOWN, ENTER } = keyboardCodes;

    switch (keyCode) {
      case UP:
        console.log('mark prev');
        break;
      case DOWN:
        console.log('mark next');
        break;
      case ENTER:
        console.log('run search');
        break;
      default:
    }
  }

  handleChange() {
    // console.log('handle change');
  }
}
