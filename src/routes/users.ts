import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
var router = express.Router()

/* GET users listing. */
export default function users(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
}
