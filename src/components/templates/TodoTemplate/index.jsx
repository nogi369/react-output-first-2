import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data"
import { useState } from "react"
import { InputForm } from "../../atoms/InputForm"
import { searchTodo } from "../../../utils/todoLogic"

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

  // 表示用TodoList更新処理(setShowTodoListの強化版)
  const updateShowTodoList = (newTodoList, keyword) => {
    setShowTodoList(
      keyword !== "" ? searchTodo(newTodoList, keyword) : newTodoList
    )
  }

  // 入力値の変更処理
  const onChangeAddInputValue = (e) => setAddInputValue(e.target.value);

  // 新規登録処理
  const handleAddTodo = (e) => {
    // EnterKeyを押された かつ 入力値が空文字でない こと
    if (e.key === "Enter" && addInputValue !== "") {
      // 新規作成するTodoの一意なid
      const nextUniqueId = uniqueId + 1;
    
      // 新規作成するTodoを含めた更新後のTodoList
      const newTodoList = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: addInputValue,
        }
      ]
      
      setOriginTodoList(newTodoList)
      updateShowTodoList(newTodoList, searchKeyword);

      setUniqueId(nextUniqueId);
      setAddInputValue("");
    }
  }

  const handleDeleteTodo = (targetId, targetTitle) => {
    // https://fuuno.net/nani/nani02/nani02.html
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {

      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId) 

      setOriginTodoList(newTodoList)

      updateShowTodoList(newTodoList, searchKeyword);
    }
  }

  // 検索処理
  const handleSearchTodo = (e) => {
    const keyword = e.target.value;

    setSearchKeyword(keyword);

    // デフォルトのTodoリストと生のkeywordを引数に渡す => 検索処理はnewTodoやsearchKeywordといった更新された値を持つ処理ではないから
    updateShowTodoList(originTodoList, keyword);
  }

  // onChangeAddInputValue ＝ onChangeTodoだけ属性名に変更がある => onChangeAddInputValue は値ではなく処理だから
  // https://web-engineer-wiki.com/javascript/react/react-error02/
  return (
    <div>
      <section>
      <AddTodo
      addInputValue={addInputValue}
      onChangeTodo={onChangeAddInputValue}
      handleAddTodo={handleAddTodo}
      />
      </section>
      <section>
      <InputForm
      inputValue={searchKeyword}
      handleChangeValue={handleSearchTodo}
      placeholder={"Search Keyword"}
      />
      </section>
      <section>
      <TodoList
      todoList={showTodoList}
      handleDeleteTodo={handleDeleteTodo}
      />
      </section>
    </div>
  )
}
