'use server';

import { Supplier } from './database/schemas/supplierSchema';
import { supplierValidation, taskValidation } from './validationSchemas';
import dbConnect from './database/dbConnect';
import { revalidatePath } from 'next/cache';
import { Task } from './database/schemas/taskSchema';
import { z } from 'zod';
import { NewTask } from './types';

type Supplier = z.infer<typeof supplierValidation>;
type TaskProps = z.infer<typeof taskValidation>;

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
    incoterm: formData.get('incoterm'),
    payment: formData.get('payment'),
    billing: formData.get('billing'),
    notes: formData.get('notes'),
  };

  const validation = supplierValidation.safeParse(supplierData);
  if (!validation.success) {
    return {
      error: 'Validation failed',
      issues: validation.error.issues,
    };
  }

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

    return {
      success: true,
      data: savedSupplier,
    };
    revalidatePath(`/dashboard/suppliers`);
  } catch (error) {
    return {
      error: 'Error adding supplier. Please try again!',
    };
  }
}

export async function updateSupplier(supplierData: Supplier, userId: string) {
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

async function updateTask(taskData: TaskProps, userId: string) {
  const db = await dbConnect();

  const { _id, title, label, date, priority, comments } = taskData;

  const existingTask = await Task.findById(_id);

  if (!existingTask) {
    return {
      error: 'Task not found for update.',
    };
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          label,
          date,
          priority,
          comments,
        },
      },
      { new: true, upsert: true }
    );

    revalidatePath('/dashboard');

    return {
      success: true,
      data: updatedTask,
    };
  } catch (error) {
    console.log(error);

    return {
      error: 'Error updating task.',
    };
  }
}

async function deleteSupplier(supplierId: string) {
  const db = await dbConnect();

  try {
    await Supplier.deleteOne({ _id: supplierId });
    revalidatePath('/dashboard/suppliers');
    return { message: `Deleted supplier successfully` };
  } catch (e) {
    return { message: 'Failed to delete supplier' };
  }
}

async function deleteTask(taskId: string) {
  const db = await dbConnect();

  try {
    await Task.deleteOne({ _id: taskId });
    revalidatePath('/dashboard');
    return { message: `Deleted task ${taskId}` };
  } catch (e) {
    return { message: 'Failed to delete task' };
  }
}

async function updateTaskStatus(taskId: string, newStatus: string) {
  const db = await dbConnect();

  try {
    const taskToUpdate = await Task.findOne({ _id: taskId });

    if (!taskToUpdate) {
      return { message: 'Task not found.' };
    }

    taskToUpdate.status = newStatus;
    await taskToUpdate.save();

    revalidatePath('/dashboard');
    return {
      message: `Updated task ${taskId} status to ${taskToUpdate.status}`,
    };
  } catch (e) {
    return { message: 'Failed to update task status.' };
  }
}

async function updateSupplierStatus(supplierId: string, newStatus: string) {
  const db = await dbConnect();

  try {
    const supplierToUpdate = await Supplier.findOne({ _id: supplierId });

    if (!supplierToUpdate) {
      return { message: 'Supplier not found.' };
    }

    supplierToUpdate.status = newStatus;
    await supplierToUpdate.save();

    revalidatePath('/dashboard/suppliers');
    return {
      message: `Updated supplier ${supplierId} status to ${supplierToUpdate.status}`,
    };
  } catch (e) {
    return { message: 'Failed to update supplier status.' };
  }
}

async function updateTaskPriority(taskId: string, newPriority: string) {
  const db = await dbConnect();

  try {
    const taskToUpdate = await Task.findOne({ _id: taskId });

    if (!taskToUpdate) {
      return { message: 'Task not found.' };
    }

    taskToUpdate.priority = newPriority;
    await taskToUpdate.save();

    revalidatePath('/dashboard');
    return {
      message: `Updated task ${taskId} status to ${taskToUpdate.priority}`,
    };
  } catch (e) {
    return { message: 'Failed to update task priority.' };
  }
}

async function addTask(taskData: NewTask, userId: string) {
  const db = await dbConnect();

  const validation = taskValidation.safeParse(taskData);
  if (!validation.success) {
    return {
      error: 'Validation failed',
      issues: validation.error.issues,
    };
  }

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

export {
  addSupplier,
  deleteSupplier,
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority,
  updateSupplierStatus,
  updateTask,
};
