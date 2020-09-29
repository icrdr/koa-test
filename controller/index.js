import {
    authUser,
    createUser
} from '../service/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import users from './user.js'


dotenv.config()

const index = {
    'POST /login': async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        console.log(`signin with id: ${username}, password: ${password}`);
        const user = await authUser(username, password)
        console.log(user.username)
        if (user) {
            const token = jwt.sign({
                username: user.username,
                id: user.id
            }, process.env.JWT_SECRET, { expiresIn: '2h' });
            ctx.type = 'json'
            ctx.body = {
                token: token
            }
        } else {
            ctx.throw('401', 'Unauthorized')
        }
    },
    'POST /signup': async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        console.log(`signup with id: ${username}, password: ${password}`);
        const user = await createUser(username, password)
        ctx.type = 'json'
        ctx.body = JSON.stringify(user)
    }
}

export default {
    '': index,
    '/users' : users
}
