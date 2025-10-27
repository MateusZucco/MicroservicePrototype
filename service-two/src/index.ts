import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceTwo from './model/serviceTwo.model';
import GrpcClient from './client';

import { createClient } from 'redis';

const PROTO_PATH = __dirname + '/usersTwo.proto';

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

const PORT = process.env.PORT || 3002;

const startup = async () => {
  await cacheClient.connect();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error: any, port: number) => {
      if (error) {
        console.error('Falha ao iniciar o servidor:', error);
        return;
      }
      console.log(`Service Two port ${port}`);
    }
  );
};

server.addService(userProto.Users.service, {
  GetUsers: async (call: any, callback: any) => {
    try {
      const usersTwo = await serviceTwo.getAll();

      GrpcClient.GetUsers({}, (err: any, response: any) => {
        if (err) {
          console.error(err);
          throw err;
        }

        const { user: usersThree } = response;

        callback(null, { user: [...usersTwo, ...usersThree] });
      });
    } catch (error) {
      console.error(error);

      callback(error, null);
    }
  }
});

startup();

export default cacheClient;
