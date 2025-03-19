import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseModel } from './BaseModel';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export abstract class AbsBaseModelService<T extends BaseModel> {

  constructor(
    protected readonly repository: Repository<T>,
  ) {
  }

  protected abstract getRelations(): string[];

  protected async create(entity: DeepPartial<T>): Promise<T> {
    const candidate = this.repository.create(entity);
    return this.repository.save(candidate);
  }

  public async findById(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id },
      relations: this.getRelations(),
    } as any);
  }


  public async findById_orThrow(id: number): Promise<T | null> {
    const res = this.findById(id);

    if (!res) {
      throw new NotFoundException(`Entity not found by id: ${id}`);
    }

    return res;
  }

  public async findOneByProp(propName: keyof T, propValue: any): Promise<T | null> {
    return this.repository.findOne({ where: { [propName]: propValue } } as any);
  }

  public async findOneByProp_orThrow(propName: keyof T, propValue: any): Promise<T> {
    const res = await this.findOneByProp(propName, propValue);

    if (!res) {
      throw new NotFoundException(`Entity not found ( ${String(propName)}: ${propValue})`);
    }

    return res;
  }

  // protected async updateOne(entity: DeepPartial<T>): Promise<T> {
  //   return this.repository.update();
  //
  // }


}