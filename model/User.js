import Sequelize from 'sequelize'
import sequelize from './db.js'

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id : {
        type: Sequelize.STRING(),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(),
        unique: true,
    },
    phone: {
        type: Sequelize.STRING(),
        unique: true
    },
    gender: {
        type: Sequelize.BOOLEAN
    },

});

export default User