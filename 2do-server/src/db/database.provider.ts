import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModel } from 'src/todo/todo.model';

export const databaseProvider = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'todoapp',
  models: [TodoModel],
});
