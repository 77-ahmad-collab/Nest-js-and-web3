import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
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
}
