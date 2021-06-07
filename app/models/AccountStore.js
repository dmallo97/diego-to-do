import { types, destroy } from 'mobx-state-tree';

const TodoModel = types
  .model({
    id: types.optional(types.number, 0),
    title: types.string,
    description: types.string,
    isDone: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    changeTitle(newTitle) {
      self.title = newTitle;
    },
    changeDescription(newDescription) {
      self.description = newDescription;
    },
    markAsDone() {
      self.isDone = !self.isDone;
    },
  }));

const AccountModel = types
  .model({
    id: types.optional(types.number, 0),
    name: types.string,
    email: types.string,
    todoList: types.optional(types.array(TodoModel), []),
  })
  .actions((self) => ({
    changeName(newName) {
      self.name = newName;
    },
    changeEmail(newEmail) {
      self.email = newEmail;
    },
    addTodo(todoItem) {
      self.todoList.push(todoItem);
    },
    removeTodo(todoItem) {
      destroy(todoItem);
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
      return account;
    },
    logIn(account) {
      self.userLoggedIn = account;
    },
    logOut() {
      self.userLoggedIn = undefined;
    },
  }));

export default AccountStore;
