import { Request, Response, NextFunction } from 'express'
import * as express from 'express'
var router = express.Router()

/* GET home page. */
export default function index(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
}
