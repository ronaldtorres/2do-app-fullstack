import { FC, useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import { ReactSortable, Sortable } from "react-sortablejs";
import { TodoType } from "../Todo/Todo.types";
import { Todo } from "../Todo/Todo";
import { useTodos } from "@/hooks/useTodos";

export const TodoContainer: FC = () => {
  const { todos, setTodos, createTodo, batchUpdate } = useTodos();

  const onEndSort = (event: Sortable.SortableEvent) => {
    const ni = event.newIndex || 0,
      oi = event.oldIndex || 0;

    if (ni === oi) return;

    batchUpdate([oi, ni], oi > ni);
  };

  const create = () => {
    createTodo({
      description: "",
      sort: todos[todos.length - 1].sort + 1,
      completed: false,
    });
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h2>Pending</h2>
        <ReactSortable
          list={todos}
          setList={setTodos}
          animation={150}
          handle=".todo-handler"
          onEnd={onEndSort}
        >
          {todos
            .filter((t) => !t.completed)
            .map((td: TodoType) => (
              <Todo key={td.id} data={td} />
            ))}
        </ReactSortable>
        <Button variant="outlined" fullWidth onClick={create}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
        </Button>

        <h2>Completed</h2>
        <ReactSortable sort={false} list={todos} setList={setTodos}>
          {todos
            .filter((t) => t.completed)
            .map((td: TodoType) => (
              <Todo key={td.id} data={td} />
            ))}
        </ReactSortable>
      </Container>
    </div>
  );
};
