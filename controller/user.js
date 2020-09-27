
import user from '../service/user.js'
export default {
    'GET /': async (ctx, next) => {
        ctx.body = await user.list_users()
    },
    'GET /signup': async (ctx, next) => {
        ctx.body = `<h1>Index</h1>
            <form action="/users/signup" method="post">
                <p>Name: <input name="name" value="koa"></p>
                <p>Password: <input name="password" type="password"></p>
                <p><input type="submit" value="Submit"></p>
            </form>`;
    },
    'POST /signin': async (ctx, next) => {
        const name = ctx.request.body.name;
        const password = ctx.request.body.password;;

        console.log(`signin with name: ${name}, password: ${password}`);
        const check_user = await user.check_user(name, password)
        if (check_user) {
            ctx.body = check_user
        } else {
            ctx.throw('401', 'Unauthorized')
        }
    },
    'POST /signup': async (ctx, next) => {
        const name = ctx.request.body.name;
        const password = ctx.request.body.password;
        
        console.log(`signup with name: ${name}, password: ${password}`);
        ctx.body = await user.create_user(name, password)
    }
}