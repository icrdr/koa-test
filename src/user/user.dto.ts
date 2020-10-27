import { IsNumber, IsString } from "class-validator";

export class UserCreate {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class GetUsersQuery {
  @IsNumber()
  perpage!:number

  @IsNumber()
  page!:number
}