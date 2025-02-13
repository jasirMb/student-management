import { Request, Response, NextFunction } from 'express';
import { ZodObject, AnyZodObject } from 'zod';


const validate = (schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schema.body) req.body = schema.body.parse(req.body);
        if (schema.query) req.query = schema.query.parse(req.query);
        if (schema.params) req.params = schema.params.parse(req.params);
  
        next(); 
      } catch (error : unknown) {
        if
        return res.status(400).json({ errors: error.flatten ? error.flatten() : error.message });
      }
    };
  };
  
  export default validate;