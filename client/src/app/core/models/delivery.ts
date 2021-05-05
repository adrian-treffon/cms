export interface Delivery {
    id: number;
    deliveryType: string;
    insured: boolean;
    createdAt: Date;
    insuranceAmount: number;
    COD: boolean;
    consignmentNoteNumber: string;
    price: number;
}