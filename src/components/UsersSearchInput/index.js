import SearchInput from '../SearchInput';
import { searchUsers } from '../../api/users';
import usersStore from '../../store/users';
import Promise from 'promise';

export default class UsersSearchInput extends SearchInput {
  getAutocomplete(query) {
    return new Promise(resolve => {
      searchUsers(query).then((users) => {
        let autocompleteItmes = users.length > 5 ? users.slice(0, 5) : users;
        usersStore.addRecentSearch(query);

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
    searchUsers(query).then((users) => {
      usersStore.setUsers(users);
      usersStore.addRecentSearch(query);
    });
  }
}
