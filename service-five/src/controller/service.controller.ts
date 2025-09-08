import { Request, Response } from 'express';

async function simulateRamStress() {
  const data = [];
  while (data.length < 1000) {
    // Aloca memória continuamente
    data.push(new Array(1000).fill('a'.repeat(10))); // Adiciona uma grande estrutura de dados
  }
}

async function simulateCPUStress() {
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.random();
  }
}

export function simulateStress(_req: Request, res: Response) {
  try {
    console.log('inicio');

    Promise.all([simulateRamStress(), simulateCPUStress()]).then(() => {
      console.log('fim');

      res.status(200).json({ data: 'OK' });
    });
  } catch (error) {
    res.status(400).json(error || 'Undefined error');
  }
}
