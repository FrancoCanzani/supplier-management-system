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

interface TaskProps {
  supplier: String;
  title: FormDataEntryValue;
  label: FormDataEntryValue;
  date: FormDataEntryValue;
  priority: FormDataEntryValue;
  comments?: FormDataEntryValue;
  status?: FormDataEntryValue;
}

type Task = {
  _id: string;
  supplier: string;
  title: string;
  label: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  comments: string;
  status: string;
  __v: number;
};

export type { Supplier, TaskProps, Task };
