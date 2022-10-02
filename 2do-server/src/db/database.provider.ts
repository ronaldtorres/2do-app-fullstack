import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModel } from 'src/todo/todo.model';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const databaseProvider = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  models: [TodoModel],
});
