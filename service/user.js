import User from '../model/User.js'

const create_user = async (user_id, password) => {
    const new_user = await User.create({
        user_id: user_id,
        name: user_id,
        password: password
    });

    return new_user
}

const list_users = async () => {
    const users = await User.findAll();
    return users
}

const auth_user = async (user_id, password) => {
    const user = await User.findOne({
        where: {
            user_id: user_id,
            password: password,
        }
    })
    return user
}

export default {
    create_user,
    list_users,
    auth_user
}