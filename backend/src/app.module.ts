import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, PrioritiesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
