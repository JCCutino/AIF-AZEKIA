import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; 
import path from 'path';
import { fileURLToPath } from 'url'; 
import dotenv from 'dotenv';

import httpEmpresas from './server/httpApi/httpEmpresas.mjs';
import httpUsuarios from './server/httpApi/httpUsuarios.mjs';

dotenv.config();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.static(path.join(__dirname, '/browser')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/empresas', httpUsuarios.mostrarEmpresas);


  app.post('/obtenerEmpresas', async (req, res) => {
    const empresas = await httpEmpresas.postObtenerEmpresas(req, res);
    res.json({ datosEmpresa: empresas });
});

app.post('/anadirEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postAnadirEmpresa(req, res);
  res.json({ resultado: resultado });
});


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});