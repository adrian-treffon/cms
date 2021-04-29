import { Address } from "./address";

export interface Customer {
   Id: number;
   Address: Address;
   Phone: string;
   Mail: string;
   NIP: string;
   ShipAddress: Address;
}