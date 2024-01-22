import { IsOptional } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  category: string;
  @IsOptional()
  minPrice: number;
  @IsOptional()
  maxPrice: number;
  @IsOptional()
  search: string;
  @IsOptional()
  limit: number;
  @IsOptional()
  offset: number;
  @IsOptional()
  minRating: number;
  @IsOptional()
  maxRating: number;
}
