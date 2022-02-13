import { getConnection, getConnectionOptions } from 'typeorm';

export * from './lib/api-utils-db-access.module';


export const getDbConnectionOptions = async (connectionName: string = 'default') => {
    console.log("node env", process.env.NODE_ENV)
    const options = await getConnectionOptions(process.env.NODE_ENV || 'development',);
    return {
        ...options,
        name: connectionName,
    };
};

export const getDbConnection = async (connectionName: string = 'default') => {
    return await getConnection(connectionName);
}