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
   
    async agregarProyectoProducido(proyecto) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'INSERT INTO ProyectoProducido (proyectoCod, fecha, importe) VALUES (@proyectoCod, @fecha, @importe)';
            request.input('proyectoCod', proyecto.proyectoCod);
            request.input('fecha', proyecto.fecha);
            request.input('importe', proyecto.importe);
           
        
            const resultado = await request.query(query);
            pool.close();
            return(resultado);
        } catch (error) {
            console.error('Error al agregar proyecto producido:', error);
            return (error);
        }
}
    

}

export const libProyectosDetalles = new LibProyectosDetalles();
