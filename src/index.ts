import crypto, { BinaryLike } from 'crypto';
import express, { json } from "express";

function buildHash(text: string) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

const app = express()

app.use(json())

app.post('/hash/generate', (req, res) => {

  const params: any = req.body;

  const hash = buildHash(JSON.stringify(params));

  console.log('Hash gerado com sucesso 😃:\n', hash);

  return res.json({ hash })
})

app.listen(3000, async () => {
  console.log('server is running 🚀 on port 3000');
})


