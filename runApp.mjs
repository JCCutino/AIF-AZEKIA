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

// Funciones de empresas 

app.get('/empresas', httpUsuarios.mostrarEmpresas);

app.post('/obtenerEmpresas', async (req, res) => {
    const empresas = await httpEmpresas.postObtenerEmpresas(req, res);
    res.json({ datosEmpresa: empresas });
});

app.post('/agregarEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postAgregarEmpresa(req, res);
  res.json({ resultado: resultado });
});

app.post('/actualizarEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postActualizarEmpresa(req, res);
  res.json({ resultado: resultado });
}); 

app.post('/eliminarEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postEliminarEmpresa(req, res);
  res.json({ resultado: resultado });
});


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});