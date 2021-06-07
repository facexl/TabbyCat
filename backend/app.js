const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const auth = require('./middlewares/auth')
const logger = require('koa-logger')
const whitelist = require('./routes/whitelist')
const router = require('./routes')
const catchError = require('./middlewares/catchError')


const app = new Koa()

// app.use(session({
//   key: 'koa:sess', /** (string) cookie key (default is koa.sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
// //   maxAge: 86400000,
//   maxAge: 1000,
//   autoCommit: true, /** (boolean) automatically commit headers (default true) */
//   overwrite: true, /** (boolean) can overwrite or not (default true) */
//   httpOnly: true, /** (boolean) httpOnly or not (default true) */
//   signed: false, /** (boolean) signed or not (default true) */
//   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
//   secure: false, /** (boolean) secure cookie*/
//   sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
// },app))

app.use(bodyParser())

app.use(logger());

app.use(catchError)

app.use(auth({whitelist}))

app.use(router.routes(), router.allowedMethods());

app.onerror = (err)=>{
    console.log(err,'意外错误')
}

app.listen(8000)
