import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';
import morgan from 'morgan';

import { createClient } from 'redis';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('query', (req: Request) => JSON.stringify(req.query));

// Use o Morgan SEM a opção "immediate: true"
app.use(
  morgan(
    ':date[iso] | :method :url | Status: :status | Tempo: :response-time ms | Tamanho: :res[content-length] B'
  )
);
// Rotas
app.use(router);
const PORT = process.env.PORT || 3001;

const cacheClient = createClient({ url: 'redis://10.223.129.83:6379' });
const startup = async () => {
  await cacheClient.connect();
  // await cacheClient.FLUSHALL();
  // await cacheClient.FLUSHDB();
  app.listen(PORT, () => {
    console.log(`Service One rodando na porta ${PORT}`);
  });
};

startup();

export { cacheClient };
