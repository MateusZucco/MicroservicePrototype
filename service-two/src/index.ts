import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceTwo from './model/serviceTwo.model';
import GrpcClient from './client';

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

server.addService(userProto.Users.service, {
  GetUsers: async (call: any, callback: any) => {
    try {
      const usersTwo = await serviceTwo.getAll();

      const users: any = [];
      const callUsers = GrpcClient.GetUsers();

      callUsers.on('data', (response: any) => {
        console.log(response);

        if (response.user) {
          users.push(response.user);
        }
      });

      callUsers.on('error', (e: any) => {
        console.error('Erro no stream:', e.details);
      });

      for (const user of usersTwo) {
        call.write({ user: user });
      }

      for (const user of users) {
        call.write({ user: user });
      }

      call.end();
    } catch (error) {
      callback(error, null);
    }
  }
});

const PORT = process.env.PORT || 3002;

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
    console.log(`Service Two rodando na porta localhost:${port}`);
    //   server.start();
  }
);
