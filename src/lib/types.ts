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
  active: boolean;
  __v: number;
}

interface TaskProps {
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
  status: string;
  __v: number;
};

export type { Supplier, TaskProps, Task };
