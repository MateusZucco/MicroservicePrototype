import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const protoObject = protoLoader.loadSync(__dirname + '/usersFour.proto')
const userProto = grpc.loadPackageDefinition(protoObject).users as any;

const client = new userProto.Users(process.env.SERVICE_FOUR_URL?.toString() || 'localhost:3004', grpc.credentials.createInsecure())

export default client