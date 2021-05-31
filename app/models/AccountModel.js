import { types } from 'mobx-state-tree';

import { TodoListModel } from './TodoModel';

const AccountModel = types
  .model({
    id: types.identifier,
    name: types.string,
    email: types.string,
    todoList: types.maybeNull(TodoListModel),
  })
  .actions((self) => ({
    getTodoList() {
      return self.todoList;
    },
    changeName(newName) {
      self.name = newName;
    },
    changeEmail(newEmail) {
      self.email = newEmail;
    },
  }));

const AccountStore = types
  .model({
    accounts: types.optional(types.array(AccountModel), []),
    userLoggedIn: types.maybeNull(AccountModel),
  })
  .actions((self) => ({
    addAccount(account) {
      self.accounts.push(account);
    },
    logIn(account) {
      self.userLoggedIn = account;
    },
    logOut() {
      self.userLoggedIn = undefined;
    },
  }));

export default AccountStore;
