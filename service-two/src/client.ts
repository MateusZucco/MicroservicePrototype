import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const protoObject = protoLoader.loadSync(__dirname + '/usersThree.proto');
const userProto = grpc.loadPackageDefinition(protoObject).users as any;

const client = new userProto.Users(
  process.env.SERVICE_THREE_URL?.toString() || 'localhost:3003',
  grpc.credentials.createSsl()
);

export default client;
