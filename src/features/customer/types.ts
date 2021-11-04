// TODO - move to GraphQL
export enum OfferType {
  XYDeal = "XYDeal",
  NewPrice = "NewPrice",
}

export interface CustomerResponse {
  customers: Customer[];
}

export interface Customer {
  id: string;
  name: string;
  offers?: {
    [productId: string]: Offer[];
  };
}

export interface Offer {
  type: OfferType;
  values: number[];
}

export interface CustomerSelection {
  [cusID: string]: {
    [prodID: string]: {
      qty?: number;
      customerPrice?: number;
    };
  };
}
