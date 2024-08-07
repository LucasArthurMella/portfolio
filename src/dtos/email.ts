import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class EmailDto  {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
  
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 300)
  email: string;

  @Length(3, 100)
  @IsNotEmpty()
  @IsString()
  subject: string;


  @Length(3, 1000)
  @IsNotEmpty()
  @IsString()
  message: string;
}
