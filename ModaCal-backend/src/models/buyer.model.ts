import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

interface BuyerAttributes {
    id?: number;
    name: string;
    companyName: string;
}

interface BuyerModel extends Model<BuyerAttributes>, BuyerAttributes {}

const Buyer = sequelize.define<BuyerModel>('Buyer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { Buyer };
