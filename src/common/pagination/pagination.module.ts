import { Module } from '@nestjs/common';
import { PaginationProvider } from './provides/pagination.provider';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
