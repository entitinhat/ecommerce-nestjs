import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'title can not be blank.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description can not be empty.' })
  @IsString()
  description: string;

  // @IsNumber(
  //   { maxDecimalPlaces: 2 },
  //   { message: 'price should be number & max decimal precission 2' },
  // )
  @IsNotEmpty({ message: 'price should not be empty.' })
  @IsNumber({}, { message: 'price should be number' })
  @Min(0, { message: 'price can not be negative.' })
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty.' })
  @IsNumber({}, { message: 'stock should be number' })
  @Min(0, { message: 'stock can not be negative.' })
  stock: number;

  @IsNotEmpty({ message: 'images should not be empty.' })
  @IsArray({ message: 'images should be in array format.' })
  images: string[];

  @IsNotEmpty({ message: 'category should not be empty.' })
  @IsNumber({}, { message: 'category id should be a number' })
  categoryId: number;
}
