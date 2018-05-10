import { fetchUsers, searchUsers } from '../api/users';
import Promise from 'promise';

export default (() => {
  const usersStore = {
    users: [],
    recentSearches: []
  };

  const allListeners = [];
  const MAX_RECENT_SEARCHES_COUNT = 5;

  return {
    setUsers(users) {
      usersStore.users = users;
      this.trigger('set-users', users);
    },

    getUsers() {
      return usersStore.users;
    },

    addRecentSearch(query) {
      const { recentSearches } = usersStore;
      if (!query.length) return recentSearches;

      const alreadySearched = recentSearches.indexOf(query) !== -1;

      if (!alreadySearched) {
        if (recentSearches.length === MAX_RECENT_SEARCHES_COUNT) {
          recentSearches.pop();
        }

        recentSearches.splice(0, 0, query);
      } else {
        const oldIndex = recentSearches.indexOf(query);
        recentSearches.splice(oldIndex, 1);
        recentSearches.splice(0, 0, query);
      }

      return recentSearches;
    },

    getRecentSearches() {
      return usersStore.recentSearches;
    },

    fetchUsers() {
      this.trigger('users-loading');
      return new Promise(resolve => {
        fetchUsers().then(users => {
          this.setUsers(users);
          resolve(users);
        });
      });
    },

    searchUsers(query) {
      return new Promise(resolve => {
        searchUsers(query).then(users => {
          resolve(users);
        });
      })
    },

    trigger(event, ...args) {
      const listeners = allListeners.filter((item) => {
        return item.event === event;
      });

      listeners.forEach((item) => {
        item.fn(...args)
      });
    },

    on(event, fn) {
      allListeners.push({
        event,
        fn
      });
    },

    off(event) {
      const listeners = allListeners.filter((item) => {
        return item.event === event;
      });

      listeners.forEach((item) => {
        const index = allListeners.indexOf(item);
        allListeners.splice(index, 1);
      });
    }
  };
})();
