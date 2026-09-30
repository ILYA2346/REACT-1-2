import { useState } from 'react';
import styles from './App.module.css';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  function addTodo() {
    const value = text.trim();
    if (!value) return;
    setTodos([...todos, { id: Date.now(), text: value, done: false }]);
    setText('');
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function startEdit(todo: Todo) {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit() {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Чеклист</h1>

      <div className={styles.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Новое дело"
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.item}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />

            {editId === todo.id ? (
              <>
                <input
                  className={styles.text}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Сохранить</button>
              </>
            ) : (
              <>
                <span
                  className={`${styles.text} ${todo.done ? styles.done : ''}`}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo)}>Изменить</button>
              </>
            )}

            <button onClick={() => removeTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}