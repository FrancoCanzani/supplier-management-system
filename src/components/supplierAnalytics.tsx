'use client';

import { Task } from '@/lib/types';
import { BarList, Bold, Card, Flex, Text, Title, Tracker } from '@tremor/react';

export default function SupplierAnalytics({ tasks }: { tasks: Task[] }) {
  const groupedTasks: { [key: string]: { value: number; name: string } } =
    tasks.reduce((result, task) => {
      const { label } = task;

      if (!result[label]) {
        result[label] = { value: 1, name: label };
      } else {
        result[label].value += 1;
      }

      return result;
    }, {} as { [key: string]: { value: number; name: string } });

  const groupedTasksArray = Object.values(groupedTasks);

  interface Task {
    status: string;
  }

  interface Tracker {
    color: string;
    tooltip: string;
  }

  type ColorMapping = {
    open: string;
    ongoing: string;
    canceled: string;
    closed: string;
  };

  const colorMapping: ColorMapping = {
    open: 'gray',
    ongoing: 'yellow',
    canceled: 'red',
    closed: 'green',
  };

  const transformTasksForTracker = (tasks: Task[]): Tracker[] => {
    const uniqueStatuses = Array.from(
      tasks.map((task) => task.status.toLowerCase().replace('_', '').trim())
    );

    const transformedData: Tracker[] = uniqueStatuses.map((status) => {
      const lowerCaseStatus = status.toLowerCase().replace(' ', '_').trim();

      const color =
        colorMapping[lowerCaseStatus as keyof ColorMapping] ||
        colorMapping[status as keyof ColorMapping] ||
        'gray';

      return {
        color,
        tooltip:
          status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1),
      };
    });

    return transformedData;
  };

  const trackerData: Tracker[] = transformTasksForTracker(tasks);

  const calculateClosedPercentage = (tasks: Task[]): number => {
    const totalTasks = tasks.length;

    const closedTasks = tasks.filter(
      (task) => task.status.toLowerCase().replace('_', '').trim() === 'closed'
    ).length;

    const closedPercentage = (closedTasks / totalTasks) * 100;

    return closedPercentage;
  };

  const closedPercentage = calculateClosedPercentage(tasks);

  return (
    <div className='flex flex-col sm:flex-row items-start gap-4 justify-start'>
      <Card className='max-w-md shadow-none p-3'>
        <Title className='text-base'>Tasks by label</Title>
        <Flex className='mt-4'>
          <Text>
            <Bold className='text-xs font-semibold'>Label</Bold>
          </Text>
          <Text>
            <Bold className='text-xs font-semibold'>Tasks</Bold>
          </Text>
        </Flex>
        <BarList data={groupedTasksArray} className='mt-2' />
      </Card>

      <Card className='max-w-md p-3 shadow-none'>
        <Title className='text-base'>Status</Title>
        <Text className='text-xs'>
          {tasks[0].supplier}&apos;s closed statuses
        </Text>
        <Flex justifyContent='end' className='mt-2'>
          <Text className='text-xs font-semibold'>
            Closed {closedPercentage.toFixed()}%
          </Text>
        </Flex>
        <Tracker data={trackerData} className='mt-2 h-8' />
      </Card>
    </div>
  );
}
