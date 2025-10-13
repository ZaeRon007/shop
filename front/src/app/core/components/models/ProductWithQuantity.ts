import { productEntity } from "./productEntity";

export interface ProductWithQuantity extends productEntity {
  quantityInBasket: number;
}
