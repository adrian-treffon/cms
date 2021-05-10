export interface Delivery {
    id: number;
    deliveryType: string;
    insured: boolean;
    createdAt: Date;
    insuranceAmount: number;
    cod: boolean;
    consignmentNoteNumber: string;
    price: number;
}