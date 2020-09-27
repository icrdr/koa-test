import User from '../model/User.js'

const create_user = async (name, password) => {
    const new_user = await User.create({
        user_id: name,
        name: name,
        password: password
    });
    return JSON.stringify(new_user)
}

const list_users = async () => {
    const users = await User.findAll();
    return JSON.stringify(users)
}

const check_user = async (name, password) => {
    const user = await User.findAll({
        where: {
            user_id: name
        }
    });

    if (user[0].password === password) {
        return JSON.stringify(user[0])
    } else {
        return false
    }
}

export default {
    create_user,
    list_users,
    check_user
}