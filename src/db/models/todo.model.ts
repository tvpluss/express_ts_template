import { DataTypes, Model, Sequelize } from "sequelize";

interface TodoAttributes {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoInstance extends Model<TodoAttributes> {}

export const initTodoInstance = (sequelizeConnection: Sequelize) => {
  TodoInstance.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize: sequelizeConnection,
      tableName: "todos",
    }
  );
};
