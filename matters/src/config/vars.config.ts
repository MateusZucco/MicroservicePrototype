export const DATA_SOURCES = {
    mySqlDataSource: {
        DB_SOCKET_PATH: process.env.MYSQL_SOCKET_PATH,
        DB_HOST: process.env.MYSQL_HOST || 'localhost',
        DB_USER: process.env.MYSQL_USER || 'root',
        DB_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
        DB_PORT: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
        DB_DATABASE: process.env.MYSQL_DATABASE || 'academyDb',
    },
};
