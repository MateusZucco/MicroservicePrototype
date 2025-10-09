import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceTwo from './model/serviceThree.model';

import { createClient } from 'redis';

const PROTO_PATH = __dirname + '/usersThree.proto';

const proto = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto = grpc.loadPackageDefinition(proto).users as any;
const server = new grpc.Server();

const cacheClient = createClient({ url: 'redis://10.223.129.83:6379' });
const startup = async () => {
  await cacheClient.connect();
  await cacheClient.FLUSHALL();
  await cacheClient.FLUSHDB();
};

startup();

server.addService(userProto.Users.service, {
  GetUsers: async (call: any, callback: any) => {
    try {
      const allUsersFromCache = (await cacheClient.get(
        'allUsersThree'
      )) as string;
      if (allUsersFromCache) {
        callback(null, { user: JSON.parse(allUsersFromCache) });
      } else {
        const users = await serviceTwo.getAll();
        cacheClient.set('allUsersThree', JSON.stringify(users), {
          expiration: { type: 'EX', value: 30 }
        });
        callback(null, { user: users });
      }
    } catch (error) {
      callback(error, null);
    }
  }
});

const PORT = process.env.PORT || 3003;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error: any, port: number) => {
    // 1. Verifique se ocorreu um erro ao vincular a porta
    if (error) {
      console.error('Falha ao iniciar o servidor:', error);
      return;
    }

    // 2. Se não houve erro, inicie o servidor
    console.log(`Service Three rodando na porta localhost:${port}`);
    //   server.start();
  }
);
