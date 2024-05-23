import { Request, Response, NextFunction } from 'express';
import {
  validatePerson,
  validateAddress,
} from './validations/validationSchemas';

export function peopleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const person = req.body;
  const error = validatePerson(person);
  if (error.type) return res.status(400).json({ error });
  next();
}

export function addressMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const address = req.body;
  const error = validateAddress(address);
  if (error.type) return res.status(400).json({ error });
  next();
}

export function craftsmanMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const craftsman = req.body;
  const error = validateAddress(craftsman);
  if (error.type) return res.status(400).json({ error });
  next();
}
