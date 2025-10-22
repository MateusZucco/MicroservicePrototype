import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceFour from './model/serviceFour.model';

import { createClient } from 'redis';

const PROTO_PATH = __dirname + '/usersFour.proto';

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
  // await cacheClient.FLUSHALL();
  // await cacheClient.FLUSHDB();
};

server.addService(userProto.Users.service, {
  GetUsers: async (call: any, callback: any) => {
    try {
      const response: any = await serviceFour.getAll();

      for (const user of response.user) {
        call.write({ user: user });
      }

      for (const historic of response.accessHistoric) {
        call.write({ accessHistoric: historic });
      }

      call.end();
    } catch (error) {
      callback(error, null);
    }
  }
});

const PORT = process.env.PORT || 3004;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error: any, port: number) => {
    if (error) {
      console.error('Falha ao iniciar o servidor:', error);
      return;
    }
    console.log(`Service Four port ${port}`);
  }
);

startup();
export default cacheClient;
