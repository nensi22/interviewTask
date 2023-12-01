import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.js";

class Task extends Model{}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
            },
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: true
        },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  },
);

Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});


export default Task