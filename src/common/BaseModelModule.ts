import { Module } from '@nestjs/common';
import { AbsBaseModelService } from './AbsBaseModelService';
import { BaseModel } from './BaseModel';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaseModel]),
  ],
  providers: [],
  exports: [AbsBaseModelService],
})
export class BaseModelModule {

}