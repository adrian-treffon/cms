import { Category } from "./category";
import { Producer } from "./producer";
import { ProductType } from "./productType";

export interface Product
{
    id : string,
    sku : string,
    name: string,
    ean : string,
    description: string,
    grossPrice : number,
    vat : number,
    promotionalPrice: number,
    availability : number,
    availabilityUnit : string,
    leadTime : string,
    notAvailableMessage : string,
    availabilityMessage : string,
    createdAt : Date,
    modifiedAt : Date,
    isActive : boolean,
    category : Category,
    producer: Producer,
    type : ProductType,
}