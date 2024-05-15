import { libFacturaLinea} from "../appLib/libFacturaLinea.mjs";
import { libGenerales } from "../appLib/libGenerales.mjs";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpFacturaLinea {

    async  postObtenerFacturaLineas(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;

            const facturaLineas = await libFacturaLinea.obtenerFacturaLineas(empresaCod, serieCod, facturaVentaNum);
            if (facturaLineas && facturaLineas.length > 0) { 
                res.status(200).send({err: false, facturaLineas});
            } else {
                res.status(200).send({ err: true, errmsg: 'No hay lineas de factura añadidas en este momento' });
            }
        } catch (err) {
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }
    

}

export default new HttpFacturaLinea();
