import { Sequelize } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    logging: false
});

export default sequelize;