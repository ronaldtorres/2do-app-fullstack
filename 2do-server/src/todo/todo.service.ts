import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoDto, TodoBatchUpdateDto } from './dto/todo.dto';
import { TodoModel } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(TodoModel) private todos: typeof TodoModel) {}

  async findAll(): Promise<TodoModel[]> {
    return await this.todos.findAll({ order: [['sort', 'ASC']] });
  }

  async create(todo: TodoDto): Promise<TodoModel> {
    return await this.todos.create({ ...todo });
  }

  async delete(id: string): Promise<number> {
    return await this.todos.destroy({ where: { uuid: id } });
  }

  async update(id: string, data: TodoDto): Promise<number[]> {
    return await this.todos.update(data, { where: { uuid: id } });
  }

  async batchUpdate(todos: TodoBatchUpdateDto[]): Promise<number[]> {
    const transaction = await this.todos.sequelize.transaction(async () => {
      const ts = todos.map((td) =>
        this.todos.update({ sort: td.sort }, { where: { uuid: td.id } }),
      );

      return Promise.all(ts);
    });

    return transaction.flat();
  }
}
