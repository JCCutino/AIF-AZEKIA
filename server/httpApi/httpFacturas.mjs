import { libFacturas } from "../appLib/libFacturas.mjs";
import { libFacturaLinea } from "../appLib/libFacturaLinea.mjs";


import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpFacturas {

    async postObtenerFacturas(req, res) {
        try {
            const facturas = await libFacturas.obtenerFacturas();
            if (facturas && facturas.length > 0) {
                res.status(200).send({ err: false, facturas });
            } else {
                res.status(200).send({ err: true, errmsg: 'No hay facturas añadidas en este momento' });
            }
        } catch (err) {
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }

    async postEliminarFactura(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;

            const facturaReferenciada = await libFacturas.verificarFacturaVentaReferenciada(facturaVentaNum);

            if (facturaReferenciada) {
                await libFacturaLinea.eliminarLineasPorNumeroFactura(facturaVentaNum);
            }

            const facturaEliminada = await libFacturas.eliminarFactura(empresaCod, serieCod, facturaVentaNum);

            res.send(200, { err: false });
        } catch (err) {
            console.error('Error al eliminar factura:', err);
            res.send(500);
        }
    }


}

export default new HttpFacturas();