export type TodoType = {
  id: string;
  description: string;
  completed: boolean;
  sort: number;
  createdAt?: string;
};

export type TodoProps = {
  data: TodoType;
};
