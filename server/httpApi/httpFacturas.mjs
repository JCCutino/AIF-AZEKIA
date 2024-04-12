import { libFacturas } from "../appLib/libFacturas.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpFacturas {

    async  postObtenerFacturas(req, res) {
        try {
            const pagina = req.body.pagina;
            const resultadosTotales = req.body.resultadosTotales
            const facturas = await libFacturas.obtenerFacturas(pagina, resultadosTotales);
            return {facturas};
        } catch (err) {
            console.error('Error al obtener las facturas:', err);
            throw err; 
        }
    }
}

export default new HttpFacturas();
