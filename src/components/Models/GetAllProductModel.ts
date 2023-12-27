import { ProductModel } from "./ProductModel";

export interface GetAllProductModel {
	products: ProductModel[];
	total: number;
	skip: number;
	limit: number;
}