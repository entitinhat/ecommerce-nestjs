import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'db/data-source';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.productId,
    );

    review = this.reviewRepository.create(createReviewDto);
    review.user = currentUser;
    review.product = product;
    review.comment = createReviewDto.comment;
    review.ratings = createReviewDto.ratings;

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    const queryBuilder = dataSource
      .getRepository(ReviewEntity)
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.product', 'product');
    // .leftJoinAndSelect('product.category', 'category')
    // .leftJoin('product.reviews', 'review')
    // .addSelect([
    //   'COUNT(review.id) AS reviewCount',
    //   'AVG(review.ratings)::numeric(10,2) AS avgRating',
    // ])
    // .groupBy('product.id,category.id');

    const totalReviews = await queryBuilder.getCount();
    const reviews = await queryBuilder.getRawMany();

    return { reviews, totalReviews };
  }

  async findAllByProduct(id: number) {
    const product = await this.productService.findOne(id);
    const reviews = await this.reviewRepository.find({
      where: { product: { id } },
      relations: {
        user: true,
        // product: {
        //   category: true,
        // },
      },
    });
    const totalReviewsByProduct = await this.reviewRepository.count({
      where: { product: { id } },
    });
    // const avgRating = await this.reviewRepository.createQueryBuilder('review').

    const avgRatingResult = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.ratings)', 'avgRating')
      .where('review.product = :productId', { productId: id })
      .getRawOne();

    return {
      reviews,
      product,
      avgRating: parseFloat(avgRatingResult.avgRating),
      totalReviews: totalReviewsByProduct,
    };
  }
  async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
    if (!review) throw new NotFoundException('Review not found.');
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);

    return this.reviewRepository.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }
}
function leftJoinAndSelect(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}
function addSelect(arg0: string[]) {
  throw new Error('Function not implemented.');
}
