import { IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  username: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, 20)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }, 
    {
      message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo'
    }
  )
  password: string;

  @IsString({ message: 'O email deve ser uma string' })
  email: string;
}
