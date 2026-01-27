import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.POSTGRES_HOST || 'postgres',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,

    synchronize: process.env.POSTGRES_SYNC === 'true' ? true : false,

    autoLoadEntities: process.env.POSTGRES_AUTOLOAD === 'true' ? true : false,

}))