import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import serviceOneModel from './model/serviceOne.model';

const PROTO_PATH = __dirname + '/users.proto';

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
      const users = await serviceOneModel.getAll(); 
      console.log(typeof users);
      callback(null, { user: users });
    } catch (error) {
      callback(error, null);
    }
  }
});

const PORT = process.env.PORT || 3001;

server.bindAsync(
  `localhost:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    // 1. Verifique se ocorreu um erro ao vincular a porta
    if (error) {
      console.error('Falha ao iniciar o servidor:', error);
      return;
    }

    // 2. Se não houve erro, inicie o servidor
    console.log(`Service One rodando na porta localhost:${port}`);
    //   server.start();
  }
);
