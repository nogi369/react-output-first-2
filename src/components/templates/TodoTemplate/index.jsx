import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data"
import { useState, useMemo } from "react"
import { InputForm } from "../../atoms/InputForm"
import styles from "./styles.module.css"

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
  const showTodoList = useMemo(() => {
    return originTodoList.filter((todo) => {
      // 修正箇所
      const regexp = new RegExp("^" + searchKeyword, "i")
      return todo.title.match(regexp)
    })
  },[originTodoList, searchKeyword])

  // 入力値の変更処理
  const onChangeAddInputValue = (e) => setAddInputValue(e.target.value);

  // 新規登録処理
  const handleAddTodo = (e) => {
    // EnterKeyを押された かつ 入力値が空文字でないこと
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
      setUniqueId(nextUniqueId);
      setAddInputValue("");
    }
  }

  const handleDeleteTodo = (targetId, targetTitle) => {
    // https://fuuno.net/nani/nani02/nani02.html
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {

      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId) 

      setOriginTodoList(newTodoList)
    }
  }

  // 検索処理
  const handleChangeSearchKeyword = (e) => setSearchKeyword(e.target.value);
  
  // onChangeAddInputValue ＝ onChangeTodoだけ属性名に変更がある => onChangeAddInputValue は値ではなく処理だから
  // https://web-engineer-wiki.com/javascript/react/react-error02/
  // titleは、TodoPageに書くのではなく、こちらに書く
  return (
    <div className={styles.container} >
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
      <AddTodo
      addInputValue={addInputValue}
      onChangeTodo={onChangeAddInputValue}
      handleAddTodo={handleAddTodo}
      />
      </section >
      <section  className={styles.common}>
      <InputForm
      inputValue={searchKeyword}
      handleChangeValue={handleChangeSearchKeyword}
      placeholder={"Search Keyword"}
      />
      </section>
      <section  className={styles.common}>
      <TodoList
      todoList={showTodoList}
      handleDeleteTodo={handleDeleteTodo}
      />
      </section>
    </div>
  )
}
