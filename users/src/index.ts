import express, {Request} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';
import morgan from 'morgan';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

morgan.token('id', (req:Request) => {
  return req.user || '';
})
app.use(
  morgan('[:date[iso] #:id] Started :method :url for :remote-addr', {
    immediate: true
  })
);
// Rotas
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Users service rodando na porta ${PORT}`);
});
