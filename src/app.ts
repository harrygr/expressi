import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

import index from './routes/index'
import users from './routes/users'

interface HttpError {
  message: string
  status: number
}

var app = express()

// view engine setup
app.set('views', path.join(`${__dirname}/..`, 'views'))
app.set('view engine', 'hbs')

const publicDir = path.join(`${__dirname}/..`, 'public')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(publicDir, 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(publicDir)))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const err: HttpError = { message: 'Not Found', status: 404 }
  next(err)
})

// error handler
app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
