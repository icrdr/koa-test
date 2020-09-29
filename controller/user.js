import {
    getUsers,
    authUser,
    createUser
} from '../service/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default {
    'GET /': async (ctx) => {
        const query = ctx.query
        const path = ctx.path
        console.log(path)
        const users = await getUsers()
        ctx.type = 'json'
        ctx.body = JSON.stringify(users)
    }
}