
import user from '../service/user.js'
import jwt from 'jsonwebtoken'

export default {
    'GET /': async (ctx, next) => {
        const result = await user.list_users()
        ctx.type = 'json'
        ctx.body = JSON.stringify(result)
    },
    'POST /signin': async (ctx, next) => {
        const user_id = ctx.request.body.user_id;
        const password = ctx.request.body.password;;

        console.log(`signin with id: ${user_id}, password: ${password}`);
        const result = await user.auth_user(user_id, password)
        if (result !== null) {
            const token = jwt.sign({
                user_id: result.user_id,
                id: result.id
            }, 'my_token', { expiresIn: '2h' });
            ctx.type = 'json'
            ctx.body = {
                token: token
            }
        } else {
            ctx.throw('401', 'Unauthorized')
        }
    },
    'POST /signup': async (ctx, next) => {
        const user_id = ctx.request.body.user_id;
        const password = ctx.request.body.password;

        console.log(`signup with id: ${user_id}, password: ${password}`);
        const result = await user.create_user(user_id, password)

        ctx.type = 'json'
        ctx.body = JSON.stringify(result)
    }
}