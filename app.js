import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router.js'

const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// catch error
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        err.status = err.statusCode || err.status || 500;
        ctx.body = {
            msg: err.message
        };
        // throw err on terminal
        // ctx.app.emit('error', err, ctx);
    }
});


// add router middleware:
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000)
console.log('app started at port 3000')