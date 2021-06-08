import { types, destroy } from 'mobx-state-tree';

import { createAccount } from '../services/AccountService';
import { createTodo, getTodos } from '../services/TodoService';

const TodoModel = types
  .model({
    id: types.optional(types.string, undefined),
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
    id: types.optional(types.string, undefined),
    email: types.string,
    todoList: types.optional(types.array(TodoModel), []),
  })
  .actions((self) => ({
    addTodo({ title, description, authorId }) {
      const newTodo = createTodo(title, description, authorId);
      self.todoList.push({
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.content,
      });
    },
    removeTodo(todoItem) {
      destroy(todoItem);
    },
    fetchTodos() {
      const todos = getTodos(self.id);
      self.todoList = todos;
    },
  }));

const AccountStore = types
  .model({
    accounts: types.optional(types.array(AccountModel), []),
    userLoggedIn: types.maybeNull(AccountModel),
  })
  .actions((self) => ({
    addAccount(email) {
      const newAccount = createAccount(email);
      self.accounts.push(newAccount);
      return newAccount;
    },
    logIn(account) {
      self.userLoggedIn = account;
    },
    logOut() {
      self.userLoggedIn = undefined;
    },
  }));

export default AccountStore;
