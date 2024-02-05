import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

const statuses = [
  {
    value: 'open',
    icon: CircleIcon,
  },
  {
    value: 'ongoing',
    icon: StopwatchIcon,
  },
  {
    value: 'closed',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    icon: CrossCircledIcon,
  },
];

const priorities = [
  {
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    value: 'high',
    icon: ArrowUpIcon,
  },
];

const mainPorts = {
  china: [
    'Shanghai',
    'Shenzhen',
    'Ningbo',
    'Tianjin',
    'Qingdao',
    'Xiamen',
    'Fuzhou',
  ],
  indonesia: ['Jakarta', 'Surabaya', 'Belawan', 'Makassar', 'Semarang'],
  vietnam: ['Ho Chi Minh City', 'Hai Phong', 'Da Nang', 'Qui Nhon', 'Vung Tau'],
  malaysia: ['Port Klang', 'Penang', 'Johor', 'Kuantan', 'Bintulu'],
  india: ['Mumbai', 'Nhava Sheva', 'Kolkata', 'Visakhapatnam', 'Kochi'],
};

const incoterms = [
  'Ex Works (EXW)',
  'Free Carrier (FCA)',
  'Free Alongside Ship (FAS)',
  'Free On Board (FOB)',
  'Cost and Freight (CFR)',
  'Cost, Insurance and Freight (CIF)',
  'Carriage Paid To (CPT)',
  'Carriage and Insurance Paid To (CIP)',
  'Delivered at Terminal (DAT)',
  'Delivered at Place (DAP)',
  'Delivered Duty Paid (DDP)',
];

const currencies = [
  'United States Dollar (USD)',
  'Euro (EUR)',
  'Japanese Yen (JPY)',
  'British Pound Sterling (GBP)',
  'Australian Dollar (AUD)',
  'Canadian Dollar (CAD)',
  'Swiss Franc (CHF)',
  'Chinese Yuan Renminbi (CNY)',
  'Swedish Krona (SEK)',
  'New Zealand Dollar (NZD)',
  'Mexican Peso (MXN)',
  'Singapore Dollar (SGD)',
  'Hong Kong Dollar (HKD)',
  'Norwegian Krone (NOK)',
  'South Korean Won (KRW)',
];

export { statuses, priorities, mainPorts, incoterms, currencies };
