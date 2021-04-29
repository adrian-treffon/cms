import { Customer } from "./customer";
import { OrderStatus } from "./orderStatus";

export interface Order {
  id: number;
  createdAt: Date;
  customer: Customer;
  shippingAddressSameAsCustomer: boolean;
  status: OrderStatus;
}