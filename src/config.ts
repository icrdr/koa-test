import dotenv from "dotenv";
dotenv.config();

export default {
  dbDatabase: process.env.DB_DATABASE,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
};
