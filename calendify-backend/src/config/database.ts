import { Sequelize } from 'sequelize';

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_PORT) {
    throw new Error("Please set all the required environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)");
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: false,
            }
        }
    }
);

const testDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force: true});
        console.log('Models synchronized successfully..');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, testDB };
