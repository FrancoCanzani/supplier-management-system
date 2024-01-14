interface Supplier {
  _id: string;
  name: string;
  account: number;
  address: string;
  phone: string;
  email: string;
  country: string;
  port: string;
  notes: string;
  active: boolean;
  __v: number;
}

export type { Supplier };
