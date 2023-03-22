import crypto, { BinaryLike } from 'crypto';
import express, { json } from "express";

function buildHash(text: string) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

const app = express()

app.use(json())

app.post('/hash/generate', (req, res) => {

  const { body } = req;

  const contaDestino = {
    nomeTitular: body.contaDestino.nomeTitular,
    cpfCnpj: body.contaDestino.cpfCnpj,
    conta: body.contaDestino.conta,
    digito: body.contaDestino.digito,
    agencia: body.contaDestino.agencia,
    codigoBanco: body.contaDestino.codigoBanco,
    tipoConta: body.contaDestino.tipoConta,
    tipoPessoa: body.contaDestino.tipoPessoa,
  }

  const contaOrigem = {
    nomeTitular: body.contaOrigem.nomeTitular,
    cpfCnpj: body.contaOrigem.cpfCnpj,
    conta: body.contaOrigem.conta,
    digito: body.contaOrigem.digito,
    agencia: body.contaOrigem.agencia,
    codigoBanco: body.contaOrigem.codigoBanco,
    tipoConta: body.contaOrigem.tipoConta,
    tipoPessoa: body.contaOrigem.tipoPessoa,
  }

  const paramsJson = JSON.stringify({
    bloquearOrigemSemSaldo: body.bloquearOrigemSemSaldo,
    contaDestino: contaDestino,
    contaOrigem: contaOrigem,
    dataAgendada: body.dataAgendada,
    seedHash: body.seedHash,
    valor: body.valor,
    tipoTransferenciaBancaria: body.tipoTransferenciaBancaria
  }).trim()

  const hash = buildHash(paramsJson);

  console.log('Hash gerado com sucesso 😃:\n', hash);

  return res.json({ hash })
})

app.listen(3000, async () => {
  console.log('server is running 🚀 on port 3000');
})


