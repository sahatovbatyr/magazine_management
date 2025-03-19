import { Column, Entity } from 'typeorm';
import { BaseModel } from '../common/BaseModel';

@Entity({ name: 'roles' })
export class Role extends BaseModel {

  constructor(title: string) {
    super();
    this.title = title;

  }


  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  title!: string;

}