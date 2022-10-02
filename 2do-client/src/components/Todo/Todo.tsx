import { FC, useState } from "react";
import "./Todo.css";
import { Checkbox, InputBase, Box, IconButton, debounce } from "@mui/material";
import DotsIcon from "@/assets/dotsIcon.svg";
import CloseIcon from "@/assets/closeIcon.svg";
import { TodoProps, TodoType } from "./Todo.types";
import { useTodos } from "@/hooks/useTodos";

export const Todo: FC<TodoProps> = ({ data }) => {
  const [todoState, setTodoState] = useState(data);
  const { deleteTodo, updateTodo } = useTodos();

  const onChange = (prop: keyof TodoType, value: any) => {
    debounce(
      () => updateTodo({ id: todoState.id, [prop]: value }),
      prop === "completed" ? 0 : 500
    )();

    setTodoState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  return (
    <Box className="todo-container">
      <TodoHandler />
      <Checkbox
        checked={todoState.completed}
        onChange={(_, checked) => onChange("completed", checked)}
      />
      <InputBase
        value={todoState.description}
        multiline
        onChange={(e) => onChange("description", e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <IconButton
        className="todo-close"
        onClick={() => deleteTodo(todoState.id)}
      >
        <img width={20} src={CloseIcon} alt="Delete Todo" />
      </IconButton>
    </Box>
  );
};

const TodoHandler = () => {
  return (
    <div className="todo-handler">
      <img width={20} src={DotsIcon} alt="Todo drag handler" />
    </div>
  );
};
