import Component from '../../abstract/Component';
import usersStore from '../../store/users';

export default class UsersTable extends Component {
  constructor() {
    super(...arguments);
    this.$tableContent = this.$el.querySelector('.content');

    usersStore.on('users-loading', () => this.render());
    usersStore.on('set-users', users => this.render(users, true));

    usersStore.fetchUsers();
    this.render();
  }

  render(users = [], force = false) {
    this.$tableContent.innerHTML = users.length || force  ? this.getContent(users) : this.getLoaderContent();
  }

  getContent(users) {
    let html = '';
    users.forEach(({ id, firstName, lastName, username }) => {
      html += `
        <tr>
          <td>${id}</td>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${username}</td>
        </tr>
      `;
    });
    return html;
  }

  getLoaderContent(rowsCount = 20) {
    let html = '';

    while (rowsCount--) {
      html += `
        <tr>
          <td class="animated-background"></td>
          <td class="animated-background"></td>
          <td class="animated-background"></td>
          <td class="animated-background"></td>
        </tr>
      `;
    }

    return html;
  }
}
