import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../types/TodosContext';
import { getTodos } from '../api/todos';
import { USER_ID } from '../variables';

export const TodosContext = createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  title: '',
  setTitle: () => { },
  filterField: 'All',
  setFilterField: () => { },
  error: '',
  setError: () => { },
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const [filterField, setFilterField] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  const preparedValue = useMemo(() => ({
    todos,
    setTodos,
    title,
    setTitle,
    filterField,
    setFilterField,
    error,
    setError,
  }), [todos, title, filterField, setTodos, error]);

  return (
    <TodosContext.Provider value={preparedValue}>
      {children}
    </TodosContext.Provider>
  );
};