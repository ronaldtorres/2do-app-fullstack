import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './db/database.provider';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [databaseProvider, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
