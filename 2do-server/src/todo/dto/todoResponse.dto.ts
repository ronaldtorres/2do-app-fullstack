import { TodoModel } from '../todo.model';

export class TodoResponseDto {
  id: string;
  description: string;
  sort: number;
  completed: boolean;
  createdAt: Date;

  constructor() {
    this.description = '';
  }

  static fromModel(entity: TodoModel): TodoResponseDto {
    const response = new TodoResponseDto();
    response.id = entity.uuid;
    response.description = entity.description;
    response.completed = entity.completed;
    response.sort = entity.sort;
    response.createdAt = entity.createdAt;

    return response;
  }
}
