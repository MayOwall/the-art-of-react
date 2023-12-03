import { useState, useRef, useCallback } from 'react';
import { TodoTemplate, TodoInsert, TodoList } from './components';

const initTodos = [
  {
    id: 1,
    text: '리액트 공부하기',
    checked: true,
  },
  {
    id: 2,
    text: '알고리즘 공부하기',
    checked: false,
  },
  {
    id: 3,
    text: '클라이밍 하러 가기',
    checked: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initTodos);
  const nextId = useRef(todos.length + 1);

  const onInsert = useCallback((text) => {
    const getNextTodos = (todos, text) => [
      ...todos,
      { id: nextId.current, text, checked: false },
    ];

    setTodos((prevTodos) => getNextTodos(prevTodos, text));
    nextId.current += 1;
  }, []);

  const onToggle = useCallback((targetId) => {
    const getNextTodos = (todos, targetId) =>
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, checked: !todo.checked } : todo,
      );

    setTodos((prevTodos) => getNextTodos(prevTodos, targetId));
  }, []);

  const onRemove = useCallback((targetId) => {
    const getNextTodos = (todos, targetId) =>
      todos.filter(({ id }) => id !== targetId);

    setTodos((prevTodos) => getNextTodos(prevTodos, targetId));
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </TodoTemplate>
  );
};

export default App;
