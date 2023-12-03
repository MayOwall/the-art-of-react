import { useRef, useCallback, useReducer } from 'react';
import { TodoTemplate, TodoInsert, TodoList } from './components';

const createBulkTodos = () => {
  const array = [];
  for (let i = 0; i < 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }

  return array;
};

const todoReducer = (todos, action) => {
  const { actionType, nextTodo, targetId } = action;
  switch (actionType) {
    case 'INSERT': {
      const nextTodos = todos.concat(nextTodo);
      return nextTodos;
    }
    case 'TOGGLE': {
      const nextTodos = todos.map((todo) =>
        todo.id === targetId ? { ...todo, checked: !todo.checked } : todo,
      );
      return nextTodos;
    }
    case 'REMOVE': {
      const nextTodos = todos.filter(({ id }) => id !== targetId);
      return nextTodos;
    }
    default:
      return todos;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const nextId = useRef(todos.length + 1);

  const onInsert = useCallback((text) => {
    const nextTodo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ actionType: 'INSERT', nextTodo });
    nextId.current += 1;
  }, []);

  const onToggle = useCallback((targetId) => {
    dispatch({ actionType: 'TOGGLE', targetId });
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ actionType: 'REMOVE', targetId });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </TodoTemplate>
  );
};

export default App;
