import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Buyer } from "./buyer.model";
import { Vendor } from "./vendor.model";

export enum AppointmentType {
    VIRTUAL = 'virtual',
    PHYSICAL = 'physical'
}

interface AppointmentAttributes {
    id?: number;
    title: string;
    type: AppointmentType;
    location?: string;
    startTime: Date;
    endTime: Date;
    vendorId: number;
    buyerId: number;
}

interface AppointmentModel extends Model<AppointmentAttributes>, AppointmentAttributes {}

const Appointment = sequelize.define<AppointmentModel>('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: Object.values(AppointmentType),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Vendor.hasMany(Appointment, { foreignKey: 'vendorId' });
Appointment.belongsTo(Vendor, { foreignKey: 'vendorId' });

Vendor.hasMany(Buyer, { foreignKey: 'vendorId' });
Buyer.belongsTo(Vendor, { foreignKey: 'vendorId' });

export { Appointment };
