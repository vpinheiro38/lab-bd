import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrioritiesModule } from './priorities/priorities.module';

@Module({
  imports: [UsersModule, PrioritiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
