import { User, ThirdAuth } from '../model/user.js'
import { hash } from '../../utils.js'
import jwt from 'jsonwebtoken'

const getUserById = async (id) => {
    const user = await User.findByPk(id)
    return user
}

const getUserFromCtx = async (ctx) => {
    const token = ctx.header.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getUserById(decodedToken.id)
    return user
}

const createUser = async (username, password) => {
    const newUser = await User.create({
        username: username,
        fullName: username,
        password: password
    });
    return newUser
}

const getUsers = async () => {
    const users = await User.findAll();
    return users
}

const authUser = async (username, password) => {
    const user = await User.findOne({
        where: {
            username: username,
        }
    })

    if (user.password === hash(username + password)) {
        return user
    } else {
        return null
    }
}

export {
    getUserFromCtx,
    getUserById,
    getUsers,
    authUser,
    createUser
}