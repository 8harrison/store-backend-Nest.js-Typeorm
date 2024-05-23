export class CreatePurchaseDto {
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  pictureLink?: string;
  hasDeal: boolean;
}
