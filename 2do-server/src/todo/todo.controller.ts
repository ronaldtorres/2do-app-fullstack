import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Param,
  HttpException,
} from '@nestjs/common';
import { TodoResponseDto } from './dto/todoResponse.dto';
import { TodoDto, TodoBatchUpdateDto } from './dto/todo.dto';
import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  async findAll(): Promise<TodoResponseDto[]> {
    try {
      const models = await this.todoService.findAll();
      return models.map<TodoResponseDto>((td: TodoModel) =>
        TodoResponseDto.fromModel(td),
      );
    } catch (e) {
      console.error(e);
      throw new HttpException('Internal server error', 500);
    }
  }

  @Post()
  async create(@Body() todo: TodoDto) {
    try {
      const model = await this.todoService.create(todo);
      return TodoResponseDto.fromModel(model);
    } catch (e) {
      console.error(e);
      throw new HttpException('Cannot create todo', 400);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      const model = await this.todoService.delete(id);
      return model;
    } catch (e) {
      console.error(e);
      throw new HttpException('Cannot delete todo', 400);
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: TodoDto) {
    try {
      const model = await this.todoService.update(id, data);
      return model;
    } catch (e) {
      console.error(e);
      throw new HttpException('Cannot update todo', 400);
    }
  }

  @Patch('/batch')
  async batchUpdate(@Body() data: TodoBatchUpdateDto[]) {
    try {
      const transaction = await this.todoService.batchUpdate(data);
      return {
        done: transaction.some((v) => !v) === false,
      };
    } catch (e) {
      console.error(e);
      throw new HttpException('Cannot update todos', 400);
    }
  }
}
