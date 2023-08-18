// 検索機能
export const searchTodo = (todoList, keyword) =>
  todoList.filter((todo) => {
    // 修正箇所
    const regexp = new RegExp("^" + keyword, "i")
    return todo.title.match(regexp)
  })