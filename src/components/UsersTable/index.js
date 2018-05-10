import Component from '../../abstract/Component';
import { fetchUsers } from '../../api/users';
import usersStore from '../../store/users';

export default class UsersTable extends Component {
  constructor() {
    super(...arguments);
    this.$tableContent = this.$el.querySelector('.content');

    fetchUsers().then(users => {
      usersStore.setUsers(users);
    });

    usersStore.on('set-users', users => {
      this.render(users)
    });
  }

  render(users) {
    const content = this.getContent(users);
    this.$tableContent.innerHTML = content;
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
}
