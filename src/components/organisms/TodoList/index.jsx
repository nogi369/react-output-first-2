export const TodoList = ({todoList, handleDeleteTodo}) => {
  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => {handleDeleteTodo(todo.id, todo.title)}}>完了</button>
        </li>
      ))}
    </ul>
  );
}

