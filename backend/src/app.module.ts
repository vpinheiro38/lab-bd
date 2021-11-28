import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesTasksModule } from './categories-tasks/categories-tasks.module';
import { RoutinesModule } from './routines/routines.module';
import { CategoriesRoutinesModule } from './categories-routines/categories-routines.module';
import { DisponibilitiesModule } from './disponibilities/disponibilities.module';

@Module({
  imports: [UsersModule, PrioritiesModule, TasksModule, CategoriesModule, CategoriesTasksModule, RoutinesModule, CategoriesRoutinesModule, DisponibilitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
