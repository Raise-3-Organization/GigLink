import { z } from 'zod';

export const createBountySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.array(z.string()).min(1, 'Add at least one tag').max(5, 'Maximum 5 tags allowed'),
  description: z.string().min(50, 'Description must be at least 50 characters for better clarity'),
  rewardAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Reward amount must be a positive number',
  }),
  rewardToken: z.string().min(1, 'Select a token'),
  deadline: z.date({
    required_error: 'Please select a deadline',
  }).refine((date) => date > new Date(), {
    message: 'Deadline must be in the future',
  }),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Expert'], {
    required_error: 'Please select a difficulty level',
  }),
});

export type CreateBountyInput = z.infer<typeof createBountySchema>;
