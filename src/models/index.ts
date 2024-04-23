import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import config from '../config/config';

let sequelize: Sequelize | undefined;

if(config.development) {
    sequelize = new Sequelize(
        process.env.DB_URL_DEV as string,
        {
            dialect: 'postgres',
        }
    );
} else if(config.test) {
    sequelize = new Sequelize(
        process.env.DB_URL_TEST as string,
        {
            dialect: 'postgres',   
        }
    );
} else if(config.production) {
    sequelize = new Sequelize(
        process.env.DB_URL_PROD as string,
        {
            dialect: 'postgres',
        }
    );
}

export default sequelize;
