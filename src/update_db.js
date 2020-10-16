import sequelize from './model/db.js'
import * as user from './model/user.js'


await sequelize.sync({ alter: true });
console.log("All models were synchronized successfully.");
process.exit(0);