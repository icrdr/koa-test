import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export enum UserGender {
  Male = "male",
  Female = "female",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  fullName!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({
    type: "enum",
    enum: UserGender,
    nullable: true,
  })
  gender!: UserGender;

  @Column({ nullable: true })
  idNumber!: string;
}
