'use client';

import { Task } from '@/lib/types';
import { BarList, Bold, Card, Flex, Text, Title } from '@tremor/react';

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

  return (
    <div>
      <Card className='max-w-lg shadow-none'>
        <Title>Tasks by label</Title>
        <Flex className='mt-4'>
          <Text>
            <Bold>Label</Bold>
          </Text>
          <Text>
            <Bold>Tasks</Bold>
          </Text>
        </Flex>
        <BarList data={groupedTasksArray} className='mt-2' />
      </Card>
    </div>
  );
}
