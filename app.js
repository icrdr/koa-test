import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router.js'
import dotenv from 'dotenv'
// import koajwt from 'koa-jwt'
import permissionCheck from './middleware/permission.js'

dotenv.config()
const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// catch error (from offical doc)
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            msg: err.message
        };
        // throw err on terminal
        ctx.app.emit('error', err, ctx);
    }
});

// app.use(koajwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/users/login', '/users/signup'] }));

app.use(permissionCheck);

// add router middleware:
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000)
console.log('app started at port 3000')