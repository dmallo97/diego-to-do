import { destroy, types } from 'mobx-state-tree';

export const TodoModel = types
  .model({
    title: types.string,
    description: types.string,
    done: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    changeTitle(newTitle) {
      self.title = newTitle;
    },
    changeDescription(newDescription) {
      self.description = newDescription;
    },
    markAsDone() {
      self.done = true;
    },
  }));

export const TodoListModel = types
  .model({
    items: types.optional(types.array(TodoModel), []),
  })
  .actions((self) => ({
    add(item) {
      self.items.push(item);
    },
    remove(item) {
      destroy(item);
    },
  }));

export const TodoListStore = types.model({
  lists: types.optional(types.array(TodoListModel), []),
});

export default { TodoModel, TodoListModel, TodoListStore };
