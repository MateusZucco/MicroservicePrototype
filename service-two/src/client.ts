import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const protoObject = protoLoader.loadSync(__dirname + '/usersThree.proto');
const userProto = grpc.loadPackageDefinition(protoObject).users as any;

const client = new userProto.Users(
  process.env.SERVICE_THREE_URL?.toString() || 'localhost:3003',
  grpc.credentials.createSsl(),
  {
    'grpc.keepalive_time_ms': 60000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
    'grpc.use_local_subchannel_pool': 0,
    'grpc.default_compression_algorithm': 2,
    'grpc.default_compression_level': 2
  }
);

export default client;
