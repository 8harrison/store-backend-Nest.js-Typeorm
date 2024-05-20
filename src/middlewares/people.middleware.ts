import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validatePerson } from './validations/validationSchemas';

@Injectable()
export class PeopleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const person = req.body;
    console.log(person);
    const error = validatePerson(person);
    if (error.type) return res.status(400).json({ error });
    next();
  }
}
