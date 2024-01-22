import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product should not be empty.' })
  @IsNumber({}, { message: 'Product Id should be number' })
  productId: number;
  // @IsInt({ message: 'Please provide a valid integer.' })
  @IsNotEmpty({ message: 'ratings could not be empty' })
  @Min(1, { message: 'ratings should range from 1 to 5.' })
  @Max(5, { message: 'ratings should range from 1 to 5.' })
  @IsNumber()
  ratings: number;
  @IsNotEmpty({ message: 'comment should not be empty' })
  @IsString()
  comment: string;
}
