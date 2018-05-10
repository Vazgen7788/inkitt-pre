import SearchInput from '../SearchInput';
import { searchUsers } from '../../api/users';
import usersStore from '../../store/users';
import Promise from 'promise';

export default class UsersSearchInput extends SearchInput {
  getAutocomplete(query) {
    return new Promise(resolve => {
      searchUsers(query).then((users) => {
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

  runSearch(query) {
    searchUsers(query).then((users) => {
      usersStore.setUsers(users)
    });
  }
}
