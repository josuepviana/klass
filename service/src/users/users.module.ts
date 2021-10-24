import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UsersService } from './users.service';

@Module({
  imports: [DomainModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
