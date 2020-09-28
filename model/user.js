import Sequelize from 'sequelize'
import sequelize from './db.js'
import { hash } from '../utils.js'

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(),
        allowNull: false,
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', hash(this.username + value));
        }
    },
    fullName: {
        type: Sequelize.STRING(),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(),
        unique: true,
    },
    mobile: {
        type: Sequelize.STRING(),
        unique: true
    },
    gender: {
        type: Sequelize.BOOLEAN
    },
    idNumber: {
        type: Sequelize.STRING(),
        unique: true
    }
}, {
    freezeTableName: true,
    underscored: true // for snake_case
});

const ThirdAuth = sequelize.define('third_auth', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    uid: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    accessToken: {
        type: Sequelize.STRING(),
    }
}, {
    freezeTableName: true,
    underscored: true // for snake_case
});

const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(),
    },
}, {
    freezeTableName: true,
    underscored: true // for snake_case
});

const Permission = sequelize.define('permission', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(),
    },
}, {
    freezeTableName: true,
    underscored: true // for snake_case
});

User.belongsToMany(Role, { through: 'user_role' });
Role.belongsToMany(User, { through: 'user_role' });

User.hasMany(ThirdAuth);
ThirdAuth.belongsTo(User);

export {
    User,
    Role,
    Permission,
    ThirdAuth
}