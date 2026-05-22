import { describe, test, after } from 'node:test';
import request from 'supertest';
import app from '#src/app.js';
import conexao from '#db/singleton-connection.js';
import assert from 'node:assert';

after(async () => {
  await conexao.destroy();
});

describe('Cadastrar autor', () => {
  test('- Retorna os dados do autor cadastrado quando os dados são válidos (201)', async () => {
    let dadosResposta;

    // enviar um request para (post) /autores
    await request(app)
       .post('/autores')
      .send({
        nome: 'H.P. Lovecraft',
        nacionalidade: 'Ingles',
      })
      .expect(201)
      .expect((response) => {
        dadosResposta = response.body.content;
      });

    assert.strictEqual(typeof(dadosResposta.id), 'number');
    assert.strictEqual(dadosResposta.nome, 'H.P. Lovecraft');
    assert.strictEqual(dadosResposta.nacionalidade, 'Ingles');
  });

  test('Retorna os dados do autor cadastrado quando os dados são válidos (201).', async () => {
  await request(app)
    .post('/autores')
    .send({
      nome: 'H.P. Lovecraft',
      nacionalidade: 'Ingles',
    })
    .expect(201)
    .expect((response) => {
      const codigoErro = response.body.content;
      assert.strictEqual(codigoErro, 'INVALID_DATA');
      //resistência a rafatoração
    });
});
});