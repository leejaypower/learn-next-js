import { IsNonEmptyString } from '../../validate-decorators';

export class UpdateReviewDto {
  @IsNonEmptyString()
  content: string;
}
