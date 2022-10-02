import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { todoApi } from "@/services/api";
import { TodoType } from "@/components/Todo";
import { arrayMoveMutable } from "array-move";

type TodosContextType =
  | {
      todos: TodoType[];
      createTodo: (props: Partial<TodoType>) => void;
      updateTodo: (props: Partial<TodoType>) => void;
      deleteTodo: (id: string) => void;
      batchUpdate: (indexes: [number, number], asc: boolean) => void;
      setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    }
  | undefined;

export const TodosContext = createContext<TodosContextType>(undefined);

export const TodosProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    todoApi.getAll().then((response) => {
      setTodos(response);
    });
  }, []);

  const createTodo = (todo: Partial<TodoType>) => {
    todoApi.create(todo).then((response) => {
      if (response) {
        setTodos((todos) => [...todos, response]);
      }
    });
  };

  const updateTodo = (todo: Partial<TodoType>) => {
    todoApi
      .update(todo)
      .then((response) => {
        if (response.status) {
          const td = todos.map((t) => {
            return t.id !== todo.id ? t : { ...t, ...todo };
          });

          setTodos(td);
        }
      })
      .catch();
  };

  const batchUpdate = ([initial, end]: [number, number], asc: boolean) => {
    const range = initial > end ? [end, initial] : [initial, end];
    const todosCopy = [...todos];
    arrayMoveMutable(todosCopy, initial, end);

    const itemsToUpdate = todosCopy.slice(range[0], range[1] + 1);
    const reqData: Partial<TodoType>[] = [];
    itemsToUpdate.forEach((t, index) => {
      t.sort = range[0] + index + 1;
      reqData.push({ id: t.id, sort: t.sort });
    });

    todosCopy.splice(range[0], itemsToUpdate.length, ...itemsToUpdate);

    todoApi.batchUpdate(reqData).then((response) => {
      if (response.status) {
        setTodos(todosCopy);
      }
    });
  };

  const deleteTodo = (id: string) => {
    todoApi.delete(id).then((response) => {
      if (response.status) {
        setTodos((todos) => todos.filter((t) => t.id !== id));
      }
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        batchUpdate,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
