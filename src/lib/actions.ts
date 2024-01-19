'use server';

import { Supplier } from './database/schemas/supplierSchema';
import dbConnect from './database/dbConnect';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Task } from './database/schemas/taskSchema';
import { TaskProps } from './types';
import { Supplier as SupplierProps } from './types';

async function addSupplier(formData: FormData, userId: string) {
  const db = await dbConnect();

  const supplierData = {
    userId,
    name: formData.get('name'),
    account: Number(formData.get('account')),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    country: formData.get('country'),
    port: formData.get('port'),
    payment: formData.get('payment'),
    billing: formData.get('billing'),
    notes: formData.get('notes'),
  };

  const { name, account } = supplierData;

  // Check if the supplier account exists
  if (account) {
    const existingSupplier = await Supplier.findOne({ userId, name, account });
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
      error: 'Error adding supplier.',
    };
  }
}

export async function updateSupplier(
  supplierData: SupplierProps,
  userId: string
) {
  const db = await dbConnect();

  const { name, _id, id } = supplierData;

  // Check if the document with the given _id exists
  const existingSupplier = await Supplier.findById(_id);

  if (!existingSupplier) {
    return {
      error: 'Supplier not found for update.',
    };
  }

  try {
    // Use findByIdAndUpdate to update the existing document
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      _id,
      { $set: supplierData },
      { new: true, upsert: true }
    );

    revalidatePath(`/dashboard/suppliers/${id}`);

    return {
      success: true,
      data: updatedSupplier,
    };
  } catch (error) {
    console.log(error);

    return {
      error: 'Error updating supplier.',
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
      taskToUpdate.status = 'in progress';
    } else if (taskToUpdate.status === 'in progress') {
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

async function addTask(taskData: TaskProps, userId: string) {
  const db = await dbConnect();

  try {
    const newTask = new Task({ ...taskData, userId });
    const savedTask = await newTask.save();
    revalidatePath('/dashboard');

    return {
      success: true,
      data: savedTask,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Error adding task.',
    };
  }
}

export { addSupplier, deleteSupplier, addTask, deleteTask, updateTaskStatus };
