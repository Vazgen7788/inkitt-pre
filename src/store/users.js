export default (() => {
  const usersStore = {
    users: [],
    recentSearches: []
  };

  const allListeners = [];

  return {
    setUsers(users) {
      usersStore.users = users;
      this.trigger('set-users', users);
    },

    getUsers() {
      return usersStore.users;
    },

    addRecentSearch(query) {
      recentSearches.push(query);
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
