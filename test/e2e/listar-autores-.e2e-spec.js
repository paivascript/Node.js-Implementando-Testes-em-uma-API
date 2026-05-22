import { describe, test, after, beforeEach } from 'node:test';
import request from 'supertest';
import app from '#src/app.js';
import conexao from '#db/singleton-connection.js';

after(async () => {
  await conexao.destroy();
});

describe('Listar autores', () => {
  
  beforeEach(async () => {
    await conexao('autores').delete(); // Limpa a tabela de autores antes de cada teste para garantir um ambiente limpo
  });

  test('- Retorna uma lista contendo os dados dos autores quando existe ao menos um autor cadastrado (200).', async () => {
    const hplovecraft = await request(app)
    .post('/autores')
    .send({
        nome: 'H.P. Lovecraft',
        nacionalidade: 'Americana',
    })
    .expect(201)
     .then((response) => response.body.content);

     const isaacAsimov = await request(app)
    .post('/autores')
    .send({
        nome: 'Isaac Asimov',
        nacionalidade: 'Americana',
    })
    .expect(201)
    .then((response) => response.body.content);

    await request(app)
    .get('/autores')
    .expect(200)
    .expect([hplovecraft, isaacAsimov]);


  });

    test(' Retorna uma lista vazia quando não existem autores cadastrados (200).', async () => {
        await request(app).get('/autores').expect(200).expect([]);

  });

  test.todo('(hipotético) Retorna um erro quando o usuário não está autenticado (403).', async () => {
  });

});