import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data"
import { useState } from "react"

export const TodoTemplate = () => {
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);
  const [ uniqueId, setUniqueId ] = useState(INIT_UNIQUE_ID);

  return (
    <>
      <AddTodo />
      <TodoList todoList={originTodoList} />
    </>
  )
}