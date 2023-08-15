export const TodoList = ({todoList}) => {
  return (
    <div>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button>完了</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

