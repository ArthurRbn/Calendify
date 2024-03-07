import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

interface VendorAttributes {
    id?: number;
    username: string;
    password: string;
}

interface VendorModel extends Model<VendorAttributes>, VendorAttributes {}

const Vendor = sequelize.define<VendorModel>('Vendor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { Vendor };