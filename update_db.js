import sequelize from './model/db.js'
import User from './model/User.js'


await sequelize.sync({ alter: true });
console.log("All models were synchronized successfully.");
process.exit(0);