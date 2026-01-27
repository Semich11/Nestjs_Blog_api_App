import {DataSource} from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5436,
    username: 'postgres',
    password: 'postgres',
    database: 'nest-prod',
    entities: ['**/*.entity.js'],
    migrations: ['migrations/*.js']
})