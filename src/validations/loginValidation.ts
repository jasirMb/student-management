import { z } from 'zod';

const loginValidation = {
    body: z.object({
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
    }),
  };
export default loginValidation;