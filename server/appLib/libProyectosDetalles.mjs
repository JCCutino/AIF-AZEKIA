import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibProyectosDetalles {
   
    async  obtenerProyectosProducidos() {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM ProyectoProducido';
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener proyectos producidos:', error);
            throw error;
        }
    }
   
    async  obtenerProyectosCertificados() {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM ProyectoCertificado';
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener proyectos certificados:', error);
            throw error;
        }
    }
   
    

}

export const libProyectosDetalles = new LibProyectosDetalles();
