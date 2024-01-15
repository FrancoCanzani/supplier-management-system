'use server';

import { Supplier } from './database/schemas/supplierSchema';
import dbConnect from './database/dbConnect';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Task } from './database/schemas/taskSchema';
import { TaskProps } from './types';

async function addSupplier(formData: FormData) {
  const db = await dbConnect();

  const supplierData = {
    name: formData.get('name'),
    account: Number(formData.get('account')),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    country: formData.get('country'),
    port: formData.get('port'),
    notes: formData.get('notes'),
  };

  const { name, account } = supplierData;

  // Check if the supplier account exists
  if (account) {
    const existingSupplier = await Supplier.findOne({ name, account });
    if (existingSupplier) {
      return {
        error: 'Supplier with the same account already exists',
      };
    }
  }

  try {
    const newSupplier = new Supplier(supplierData);
    const savedSupplier = await newSupplier.save();
    revalidatePath('/dashboard/suppliers');

    return {
      success: true,
      data: savedSupplier,
    };
  } catch (error) {
    return {
      error: 'Error adding supplier to the database',
    };
  }
}

async function deleteSupplier(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const db = await dbConnect();

  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
    name: formData.get('todo'),
  });

  try {
    await Supplier.deleteOne({ _id: data.id });
    revalidatePath('/dashboard/suppliers');
    return { message: `Deleted supplier ${data.name}` };
  } catch (e) {
    return { message: 'Failed to delete supplier' };
  }
}

async function deleteTask(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const db = await dbConnect();

  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
    name: formData.get('todo'),
  });

  try {
    await Task.deleteOne({ _id: data.id });
    revalidatePath('/dashboard');
    return { message: `Deleted task ${data.name}` };
  } catch (e) {
    return { message: 'Failed to delete task' };
  }
}

async function updateTaskStatus(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const db = await dbConnect();

  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
    name: formData.get('todo'),
  });

  try {
    const taskToUpdate = await Task.findOne({ _id: data.id });

    if (!taskToUpdate) {
      return { message: 'Task not found.' };
    }

    if (taskToUpdate.status === 'open') {
      taskToUpdate.status = 'paused';
    } else if (taskToUpdate.status === 'paused') {
      taskToUpdate.status = 'closed';
    } else if (taskToUpdate.status === 'closed') {
      taskToUpdate.status = 'open';
    }

    await taskToUpdate.save();

    revalidatePath('/dashboard');
    return {
      message: `Updated task ${data.id} status to ${taskToUpdate.status}`,
    };
  } catch (e) {
    return { message: 'Failed to update task status.' };
  }
}

async function addTask(taskData: TaskProps) {
  const db = await dbConnect();

  try {
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    revalidatePath('/dashboard');

    return {
      success: true,
      data: savedTask,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Error adding supplier to the database',
    };
  }
}

export { addSupplier, deleteSupplier, addTask, deleteTask, updateTaskStatus };
