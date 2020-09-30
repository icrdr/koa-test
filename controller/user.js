import {
    getUsers,
    getUserById,
    createUser
} from '../service/user.js'

export default {
    'GET / user.browse': async (ctx) => {
        const users = await getUsers()
        ctx.body = users
    },
    'GET /:id user.browse/id': async (ctx) => {
        const id = ctx.params.id
        const user = await getUserById(id)
        ctx.body = user
    },
    'POST / create': async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const user = await createUser(username, password)
        ctx.body = user
    }
}