import { libProyectosDetalles } from "../appLib/libProyectosDetalles.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpProyectosProducidos {
    
    async getObtenerProyectosProducidos(req, res) {
        try {
            const proyectos = await libProyectosDetalles.obtenerProyectosProducidos();
            if (proyectos && proyectos.length > 0) {
                res.status(200).send({ err: false, proyectos });
            } else {
                res.status(200).send({ err: true, errmsg: 'No hay proyectos añadidos en este momento' });
            }
        } catch (err) {
            console.error('Error al obtener proyectos:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }

    async getObtenerProyectosCertificados(req, res) {
        try {
            const proyectos = await libProyectosDetalles.obtenerProyectosCertificados();
            if (proyectos && proyectos.length > 0) {
                res.status(200).send({ err: false, proyectos });
            } else {
                res.status(200).send({ err: true, errmsg: 'No hay proyectos añadidos en este momento' });
            }
        } catch (err) {
            console.error('Error al obtener proyectos:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }


}
export default new HttpProyectosProducidos();
