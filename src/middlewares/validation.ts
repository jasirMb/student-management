import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';


const validate = (schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }) => {  
  return (req: Request, res: Response, next: NextFunction): void => { 
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      if (schema.params) req.params = schema.params.parse(req.params);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors }); 
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
};

  
  export default validate;