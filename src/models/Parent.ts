import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'

import Children from './Children'

@Entity('parents')
class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  pedigree: boolean;

  @Column()
  age: number;

  @OneToMany(() => Children, children => children.parent)
  childrens: Children[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Parent
