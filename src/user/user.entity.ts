import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";
export enum UserGender {
  male = "male",
  female = "female",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  @Exclude()
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

  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];
}

export enum ThirdAuthType {
  wechat = "wechat",
}

@Entity()
export class ThirdAuth {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: ThirdAuthType,
  })
  type!: string;

  @Column()
  uid!: string;
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions!: Permission[];
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;
}
