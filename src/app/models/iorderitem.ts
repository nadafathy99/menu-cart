import { IProduct } from "./iproduct";

export interface IOrderItem extends IProduct {
    totalPrice: number;
    quantity:number
}
