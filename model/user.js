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
            // Hashing the password with an appropriate cryptographic hash function.
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
    underscored: true
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
    underscored: true
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
    underscored: true
});

const Permission = sequelize.define('permission', {
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
    url: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true
    },
    method: {
        type: Sequelize.STRING(),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    underscored: true
});

User.belongsToMany(Role, { through: 'user_role' });
Role.belongsToMany(User, { through: 'user_role' });

Role.belongsToMany(Permission, { through: 'role_permission' });
Permission.belongsToMany(Role, { through: 'role_permission' });

User.hasMany(ThirdAuth);
ThirdAuth.belongsTo(User);

export {
    User,
    Role,
    Permission,
    ThirdAuth
}