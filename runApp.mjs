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

app.get('/clientes', httpUsuarios.mostrarClientes);

app.get('/proyectos', httpUsuarios.mostrarProyectos);

app.get('/series', httpUsuarios.mostrarSeries);

app.get('/facturas', httpUsuarios.mostrarFacturas);

app.get('/impuestos', httpUsuarios.mostrarImpuestos);

// Funciones de empresas 

app.post('/obtenerEmpresas', httpEmpresas.postObtenerEmpresas);

app.post('/agregarEmpresa', httpEmpresas.postAgregarEmpresa);

app.post('/actualizarEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postActualizarEmpresa(req, res);
  res.json({ resultado: resultado });
}); 

app.post('/eliminarEmpresa', async (req, res) => {
  const resultado = await httpEmpresas.postEliminarEmpresa(req, res);
  res.json({ resultado: resultado });
});

app.post('/obtenerFacturas', async (req, res) => {
  const facturas = await httpFacturas.postObtenerFacturas(req, res);
  res.json({ datosFactura: facturas });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});