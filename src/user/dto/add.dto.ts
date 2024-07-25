import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UsersAddDTO {
  @IsNotEmpty()
  @IsString()
  readonly first_name: String;

  @IsNotEmpty()
  @IsString()
  readonly middle_name: String;

  @IsNotEmpty()
  @IsString()
  readonly last_name: String;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: String;

  @IsNotEmpty()
  readonly phone: String;

  @IsNotEmpty()
  @IsString()
  readonly address: String;

  @IsNotEmpty()
  @IsString()
  readonly country: String;

  @IsNotEmpty()
  @IsString()
  readonly state: String;

  @IsOptional()
  readonly city: String;

  @IsNotEmpty()
  readonly zip_code: String;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: String;
}
