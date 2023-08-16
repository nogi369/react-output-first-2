import { InputForm } from "../../atoms/InputForm";

export const AddTodo = (props) => {
  const { addInputValue, onChangeTodo, handleAddTodo } = props;

  return (
    <>
      <h2>ADD TODO</h2>
      <InputForm
      inputValue={addInputValue}
      handleChangeValue={onChangeTodo}
      handleKeyDown={handleAddTodo}
      placeholder={"New Todo"}
      />
    </>
  )
}