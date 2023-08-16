import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data"
import { useState } from "react"

export const TodoTemplate = () => {
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);
  const [ uniqueId, setUniqueId ] = useState(INIT_UNIQUE_ID);

  const handleDeleteTodo = (targetId, targetTitle) => {
    // https://fuuno.net/nani/nani02/nani02.html
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {

      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId) 

      setOriginTodoList(newTodoList);
    }
  }

  return (
    <>
      <AddTodo />
      <TodoList todoList={originTodoList} handleDeleteTodo={handleDeleteTodo} />
    </>
  )
}