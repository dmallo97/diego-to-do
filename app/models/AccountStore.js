import { types, destroy, flow } from 'mobx-state-tree';

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
    addTodo: flow(function* addTodo({ title, description, authorId }) {
      try {
        const newTodo = yield createTodo(title, description, authorId);
        self.todoList.push({
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.content,
        });
      } catch (error) {
        console.log('Server couldnt create the task: ', error);
      }
    }),
    removeTodo(todoItem) {
      destroy(todoItem);
    },
    fetchTodos: flow(function* fetchTodos() {
      try {
        const todos = yield getTodos(self.id);
        self.todoList = todos;
      } catch (error) {
        console.log('Server couldnt fetch accounts todos: ', error);
      }
    }),
  }));

const AccountStore = types
  .model({
    accounts: types.optional(types.array(AccountModel), []),
    userLoggedIn: types.maybeNull(AccountModel),
  })
  .actions((self) => ({
    addAccount: flow(function* addAccount(email) {
      let newAccount;
      try {
        newAccount = yield createAccount(email);
        self.accounts.push(newAccount);
        return newAccount;
      } catch (error) {
        console.log('Server couldnt create the account: ', error);
      }
      return newAccount;
    }),
    logIn(account) {
      self.userLoggedIn = account;
    },
    logOut() {
      self.userLoggedIn = undefined;
    },
  }));

export default AccountStore;
