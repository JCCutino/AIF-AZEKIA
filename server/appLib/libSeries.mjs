import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibSeries {
    async  obtenerSeries() {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM Serie';
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener series:', error);
            throw 'Error al obtener series';
        }
    }
    
    async  obtenerSeriePorCodigo(serieCod) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM Serie WHERE serieCod = @serieCod';
            request.input('serieCod', serieCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.recordset[0] || null;
        } catch (error) {
            console.error('Error al obtener serie por código:', error);
            throw 'Error al obtener serie por código';
        }
    }
    
    async  agregarSerie(serie) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'INSERT INTO Serie (serieCod, descripcion, ultimoNumUsado) VALUES (@serieCod, @descripcion, @ultimoNumUsado)';
            request.input('serieCod', serie.serieCod);
            request.input('descripcion', serie.descripcion);
            request.input('ultimoNumUsado', serie.ultimoNumUsado);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la inserción
        } catch (error) {
            console.error('Error al agregar serie:', error);
            throw 'Error al agregar serie';
        }
    }
    
    async  actualizarSerie(serie) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'UPDATE Serie SET descripcion = @descripcion, ultimoNumUsado = @ultimoNumUsado WHERE serieCod = @serieCod';
            request.input('descripcion', serie.descripcion);
            request.input('ultimoNumUsado', serie.ultimoNumUsado);
            request.input('serieCod', serie.serieCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la actualización
        } catch (error) {
            console.error('Error al actualizar serie:', error);
            throw 'Error al actualizar serie';
        }
    }
    
    async  eliminarSerie(serieCod) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'DELETE FROM Serie WHERE serieCod = @serieCod';
            request.input('serieCod', serieCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la eliminación
        } catch (error) {
            console.error('Error al eliminar serie:', error);
            throw 'Error al eliminar serie';
        }
    }
    
    async verificarSerie(serie, actualizar = false) {
        if (!libGenerales.verificarCamposVacios(serie)) {
            return false;
        }
        
        if (!libGenerales.verificarLongitud(serie.serieCod, 10)) {
            return false;
        }
    
        if (!libGenerales.verificarLongitud(serie.descripcion, 100)) {
            return false;
        }
    
        if (isNaN(serie.ultimoNumUsado) || !Number.isInteger(serie.ultimoNumUsado)) {
            return false;
        }
    
        if (actualizar === true) {
            return true;
        }
    
        const serieExistente = await this.obtenerSeriePorCodigo(serie.serieCod);
    
        return !serieExistente;
    }
    
}

export const libSeries = new LibSeries();
