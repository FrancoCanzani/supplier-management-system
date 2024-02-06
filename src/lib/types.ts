interface Supplier {
  _id: string;
  name: string;
  id: string;
  account: number;
  address: string;
  phone: string;
  email: string;
  country: string;
  port: string;
  notes: string;
  payment: string;
  billing: string;
  active: boolean;
  __v: number;
}

interface NewTask {
  supplier: String;
  title: FormDataEntryValue;
  label: FormDataEntryValue;
  date: FormDataEntryValue | string;
  priority: FormDataEntryValue;
  comments?: FormDataEntryValue;
  status?: FormDataEntryValue;
}

type Task = {
  _id: string;
  supplier: string;
  supplierId: string;
  title: string;
  label: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  comments: string;
  status: 'open' | 'in progress' | 'closed' | 'cancelled';
  __v: number;
};

type OrderData = {
  supplier: string;
  supplierId?: string;
  id: string;
  label?: string;
  crd?: string;
  priority?: string;
  comments?: string;
  incoterm: string;
  currency: string;
  file: {
    name: string;
    size: number;
    key: string;
    serverData: {
      uploadedBy: string;
    };
    url: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};
export type { Supplier, NewTask, Task, OrderData };
