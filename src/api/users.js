import faker from 'faker';
import Promise from 'promise';
import FuzzySearch from 'fuzzy-search';

const FETCH_TIMEOUT = 0;
const SEARCH_TIMEOUT = 100;
const COUNT_OF_USERS = 3000;
const COUNT_TO_DISPLAY = 100;
const users = [];

for (let i = 1; i <= COUNT_OF_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = `@${faker.internet.userName()}`;

  users.push({
    id: i,
    firstName,
    lastName,
    username,
    fullInfo: `${firstName} ${lastName} ${username}`
  });
}

const searcher = new FuzzySearch(users, ['fullInfo'], {
  caseSensitive: false,
  sort: true
});

export const fetchUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(users.slice(0, COUNT_TO_DISPLAY)), FETCH_TIMEOUT);
  });
};

export const searchUsers = query => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query.length) {
        return resolve(users.slice(0, 100));
      }
      let result = searcher.search(query);

      if (result.length > 100) {
        result = result.splice(0, 100);
      }
      resolve(result);
    }, SEARCH_TIMEOUT);
  });
};
