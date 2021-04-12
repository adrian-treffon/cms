import { Product } from './product';

export interface ProductEnvelope {
  products: Product[];
  productCount: number;
}