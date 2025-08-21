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



app.use(
  morgan('[:date[iso] #:id] Started :method :url for :remote-addr', {
    immediate: true
  })
);
// Rotas
app.use(router);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Matter service rodando na porta ${PORT}`);
});