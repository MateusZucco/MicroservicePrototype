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

      for (const user of usersTwo) {
        call.write({ user: user });
      }

      const callUsers = GrpcClient.GetUsers();

      callUsers.on('data', (response: any) => {
        if (response.user) {
          call.write({ user: response.user });
        }
      });

      callUsers.on('error', (e: any) => {
        console.error('Erro no stream:', e.details);
      });

      callUsers.on('end', () => {
        call.end();
      });
    } catch (error) {
      console.error(error);
      
      callback(error, null);
    }
  }
});

startup();

export default cacheClient;
