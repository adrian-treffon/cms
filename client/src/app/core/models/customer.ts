import { Address } from "./address";

export interface Customer {
   id: number;
   address: Address;
   phone: string;
   mail: string;
   nip: string;
   shipAddress: Address;
}