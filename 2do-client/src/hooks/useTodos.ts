import { useContext } from "react";
import { TodosContext } from "@/contexts/TodosContext";

export const useTodos = () => {
  const todos = useContext(TodosContext);

  if (todos === undefined) {
    throw new Error("useTodos needs TodoProvider to work");
  }

  return todos;
};
