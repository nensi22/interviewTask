import connection from "../config/database.js";

const db = {};

db.sequelize = connection;

export default db;