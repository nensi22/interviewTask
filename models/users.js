import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model{}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
  },
)

export default User