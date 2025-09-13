'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function AddTask() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    const user = await supabase.auth.getUser();
    const { error } = await supabase.from('tasks').insert({
      title: data.title,
      description: data.description,
      user_id: user.data.user?.id
    });
    if (error) {
      console.error(error.message);
    } else {
      alert('Task added!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Title" />
      <p>{errors.title?.message}</p>

      <textarea {...register('description')} placeholder="Description" />
      <button type="submit">Add Task</button>
    </form>
  );
}
