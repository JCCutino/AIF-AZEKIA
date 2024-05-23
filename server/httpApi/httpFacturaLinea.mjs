import { libFacturaLinea } from "../appLib/libFacturaLinea.mjs";
import { libGenerales } from "../appLib/libGenerales.mjs";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpFacturaLinea {

    async postObtenerFacturaLineas(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;

            const facturaLineas = await libFacturaLinea.obtenerFacturaLineas(empresaCod, serieCod, facturaVentaNum);
            if (facturaLineas && facturaLineas.length > 0) {
                res.status(200).send({ err: false, facturaLineas });
            } else {
                res.status(200).send({ err: true, errmsg: 'No hay lineas de factura añadidas en este momento' });
            }
        } catch (err) {
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }

    async postAgregarFacturaLinea(req, res) {
        try {
            const { empresaCod, serieCod, facturaVentaNum } = req.body;
    
            if (!empresaCod || !serieCod || !facturaVentaNum) {
                return res.status(400).send({ err: true, errmsg: "Faltan parámetros requeridos." });
            }
    
            const ultimaLineaNum = await libFacturaLinea.obtenerUltimaIDFacturaVentaLinea(empresaCod, serieCod, facturaVentaNum);
    
            if (ultimaLineaNum === null || ultimaLineaNum === undefined) {
                return res.status(500).send({ err: true, errmsg: "Error al obtener el último número de línea de factura." });
            }
    
            const facturaVentaLineaNum = ultimaLineaNum + 1;
    
            const resultadoVerificacion = await libFacturaLinea.verficiarFacturaVentaLinea(empresaCod, serieCod, facturaVentaLineaNum);
    
            if (resultadoVerificacion.isValid) {
                await libFacturaLinea.agregarFacturaVentaLinea(empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum);
                res.status(200).send({ err: false });
            } else {
                res.status(200).send({ err: true, errmsg: resultadoVerificacion.errorMessage });
            }
        } catch (err) {
            console.error('Error en postAgregarFacturaLinea:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor.' });
        }
    }
    
    async postEliminarFacturaLinea(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;
            const facturaVentaLineaNum = req.body.facturaVentaLineaNum;

            const linea = await libFacturaLinea.eliminarLinea(facturaVentaNum, empresaCod, serieCod, facturaVentaLineaNum);

            res.send(200, { err: false });


        } catch (err) {
            res.send(500);
        }
    }

}

export default new HttpFacturaLinea();
