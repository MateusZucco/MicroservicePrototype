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

const PORT = process.env.PORT || 3003;

const startup = async () => {
  await cacheClient.connect();
  server.addService(userProto.Users.service, {
    GetUsers: async (call: any, callback: any) => {
      try {
        const users = await serviceTwo.getAll();
        callback(null, { user: users });
      } catch (error) {
        callback(error, null);
      }
    }
  });
};

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error: any, port: number) => {
    if (error) {
      console.error('Falha ao iniciar o servidor:', error);
      return;
    }
    console.log(`Service Three port ${port}`);
  }
);

startup();

export default cacheClient;
