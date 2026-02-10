import { IsDecimal, IsObject, IsString, IsUrl, Length, Validate } from "class-validator";
import { ProductSpecs } from "../custom-validators/ProductSpecs";

export class CreateProductDto {

  @IsString({
    message: 'O nome deve ser uma string.', 
  })
  @Length(5, 25, {
    message: 'O nome deve ter entre 5 e 25 caracteres.',
  })
  name: string;

  @IsString({
    message: 'A descrição deve ser uma string.',
  })
  @Length(5, 50, {
    message: 'A descrição deve ter entre 5 e 50 caracteres.',
  })
  description: string;

  @IsDecimal(
    {
      decimal_digits: '2',
    },
    {
      message: 'O preço deve ser um número decimal com até 2 casas decimais.',  
    }
  )
  price: number;

  @IsObject({
    message: 'specs deve ser um objeto.',
  })
  @Validate(ProductSpecs)
  specs: Record<string, any>;

  @IsString({
    message: 'A imagem deve ser uma string.',
  })
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message: 'A imagem deve ser uma URL válida.',
    }
  )
  image: string;
}
