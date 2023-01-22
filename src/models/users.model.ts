import {
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "sequelize";
import config from "../config";

const sequelize = new Sequelize(config.db.url, {
  pool: config.db.pool,
});

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare isdeleted: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,
  }
);

export { User, sequelize };
