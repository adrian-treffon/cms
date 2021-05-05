import { Customer } from "./customer";
import { Delivery } from "./delivery";
import { OrderProduct } from "./orderProduct";
import { OrderStatus } from "./orderStatus";

export interface Order {
  id: number;
  createdAt: Date;
  customer: Customer;
  shippingAddressSameAsCustomer: boolean;
  status: OrderStatus;
  products : OrderProduct[];
  delivery : Delivery;
}