import SearchInput from '../SearchInput';
import nprogress from 'nprogress';
import { searchUsers } from '../../api/users';
import usersStore from '../../store/users';
import Promise from 'promise';

nprogress.configure({ easing: 'ease', speed: 500 });

export default class UsersSearchInput extends SearchInput {
  constructor() {
    super(...arguments);

    usersStore.on('users-loading', () => {
      this.inputRef.disabled = true;
    });

    usersStore.on('set-users', () => {
      this.inputRef.disabled = false;
    });
  }

  getAutocomplete(query) {
    return new Promise(resolve => {
      usersStore.searchUsers(query).then((users) => {
        let autocompleteItmes = users.length > 5 ? users.slice(0, 5) : users;

        autocompleteItmes = autocompleteItmes.map(({ fullInfo }) => {
          return {
            active: false,
            text: fullInfo
          }
        });

        resolve(autocompleteItmes);
      });
    });
  }

  getRecent() {
    return usersStore.getRecentSearches().map((text) => {
      return {
        active: false,
        text
      }
    });
  }

  runSearch(query) {
    nprogress.start();
    usersStore.searchUsers(query).then((users) => {
      nprogress.done();
      usersStore.setUsers(users);
      usersStore.addRecentSearch(query);
    });
  }
}
