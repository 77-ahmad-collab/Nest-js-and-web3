import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('this user is inserted with the id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('user is updated', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('user is removed', this.id);
  }
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
