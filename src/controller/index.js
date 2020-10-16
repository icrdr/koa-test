import {
    authUser,
    createUser
} from '../service/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import users from './user.js'


dotenv.config()

const index = {
    'POST /auth': async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        const user = await authUser(username, password)

        if (user) {
            const payload = {
                id: user.id,
                permissions: [
                    'user.browse/isOwner'
                ]
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,
                { expiresIn: '24h' });
            ctx.body = {
                token: token
            }
        } else {
            ctx.throw(401, 'Unauthorized')
        }
    }
}

export default {
    '': index,
    '/users': users
}
