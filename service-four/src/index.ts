import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceFour from './model/serviceFour.model';

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

server.addService(userProto.Users.service, {
  GetUsers: async (call: any, callback: any) => {
    try {
      const response: any = await serviceFour.getAll();

      for (const user of response[0][0]) {
        call.write({ user: user });
      }

      for (const historic of response[1][0]) {
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
    // 1. Verifique se ocorreu um erro ao vincular a porta
    if (error) {
      console.error('Falha ao iniciar o servidor:', error);
      return;
    }

    // 2. Se não houve erro, inicie o servidor
    console.log(`Service Four rodando na porta localhost:${port}`);
    //   server.start();
  }
);
