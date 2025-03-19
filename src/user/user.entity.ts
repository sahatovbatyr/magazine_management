import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from '../common/BaseModel';
import { Role } from '../role/role.entity';


@Entity({ name: 'users' })
export class User extends BaseModel {

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username!: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_active!: boolean;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email!: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_and_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles!: Role[];


}