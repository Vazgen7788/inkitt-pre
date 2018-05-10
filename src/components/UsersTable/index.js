import Component from '../../abstract/Component';
import { fetchUsers } from '../../api/users';

export default class UsersTable extends Component {
  init() {
    this.$tableContent = this.$el.querySelector('.content');
    fetchUsers().then(users => {
      this.users = users;
      this.render();
    });
  }

  render() {
    const content = this.getContent();
    this.$tableContent.innerHTML = content;
  }

  getContent(users) {
    let html = '';
    this.users.forEach(({ id, firstName, lastName, username }) => {
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
