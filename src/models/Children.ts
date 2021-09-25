import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import Parent from './Parent'

@Entity('childrens')
class Children {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parent_id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  vaccinated: boolean;

  @ManyToOne(() => Parent, parent => parent.childrens)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Children
