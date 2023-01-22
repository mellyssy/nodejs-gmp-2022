import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,

  db: {
    url: process.env.POSTRGRES_URL,
    user: process.env.POSTRGRES_USER,
    password: process.env.POSTRGRES_PASSWORD,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
