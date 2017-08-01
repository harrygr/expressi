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

const uiDir = path.join(`${__dirname}/..`, 'react-ui/build')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(publicDir, 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  res.cookie('expressi_time', `time is ${Date.now()}`, { maxAge: 90000 })
  next()
})

app.use(express.static(path.join(publicDir)))

const staticApp = express.static(uiDir)

// use this to blindly statically serve the react app from the staticApp dir
app.use('/agent', staticApp)
app.use('/agent/*', staticApp)

// use this access the request first. E.g. can check for token before serving, although same can be acheived through middleware,
// but allows conditional static serving
// app.get('/agent/*', function (req, res) {
//   const path = req.params[0] ? req.params[0] : 'index.html';
//   res.sendfile(path, { root: uiDir });
// });

app.get('/', index)
app.get('/users', users)

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
