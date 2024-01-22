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

export { statuses, priorities };
