import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data"
import { useState } from "react"
import { InputForm } from "../../atoms/InputForm"

export const TodoTemplate = () => {
  // デフォルトTodoList
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);
  // 採番ID
  const [ uniqueId, setUniqueId ] = useState(INIT_UNIQUE_ID);
  // 入力値
  const [ addInputValue, setAddInputValue ] = useState("");
  // 検索キーワード
  const [ searchKeyword, setSearchKeyword ] = useState("");
  // 表示用TodoList
  const [ showTodoList, setShowTodoList ] = useState(INIT_TODO_LIST);

  const handleDeleteTodo = (targetId, targetTitle) => {
    // https://fuuno.net/nani/nani02/nani02.html
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {

      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId) 

      setShowTodoList(newTodoList);
    }
  }

  // 入力値の変更処理
  const onChangeAddInputValue = (e) => setAddInputValue(e.target.value);

  // 新規登録処理
  const handleAddTodo = (e) => {
    // EnterKeyを押された かつ 入力値が空文字でない こと
    if (e.key === "Enter" && addInputValue !== "") {
      // 新規作成するTodoの一意なid
      const nextUniqueId = uniqueId + 1;
      console.log(nextUniqueId);
    
      // 新規作成するTodoを含めた更新後のTodoList
      const newTodoList = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: addInputValue,
        }
      ]
      
      // 各種更新処理
      setShowTodoList(newTodoList);
      setUniqueId(nextUniqueId);
      setAddInputValue("");
    }
  }

  const handleChangeSearchKeyword = (e) => setSearchKeyword(e.target.value);

  // onChangeAddInputValue ＝ onChangeTodoだけ属性名に変更がある => onChangeAddInputValue は値ではなく処理だから
  return (
    <>
      <AddTodo
      addInputValue={addInputValue}
      onChangeTodo={onChangeAddInputValue}
      handleAddTodo={handleAddTodo}
      />
      <InputForm
      inputValue={searchKeyword}
      handleChangeSearchKeyword={handleChangeSearchKeyword}
      placeholder={"Search Keyword"}
      />
      <TodoList
      todoList={showTodoList}
      handleDeleteTodo={handleDeleteTodo}
      />
    </>
  )
}


