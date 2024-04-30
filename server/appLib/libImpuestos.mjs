import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibImpuestos {
    async  obtenerImpuestos() {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM Impuesto';
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener impuestos:', error);
            throw 'Error al obtener impuestos';
        }
    }
    
    async  obtenerImpuestoPorCodigo(impuestoCod) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM Impuesto WHERE impuestoCod = @impuestoCod';
            request.input('impuestoCod', impuestoCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.recordset[0] || null;
        } catch (error) {
            console.error('Error al obtener impuesto por código:', error);
            throw 'Error al obtener impuesto por código';
        }
    }
    
    async  agregarImpuesto(impuesto) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'INSERT INTO Impuesto (impuestoCod, tipoImpuesto, porcentaje) VALUES (@impuestoCod, @tipoImpuesto, @porcentaje)';
            request.input('impuestoCod', impuesto.impuestoCod);
            request.input('tipoImpuesto', impuesto.tipoImpuesto);
            request.input('porcentaje', impuesto.porcentaje);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la inserción
        } catch (error) {
            console.error('Error al agregar impuesto:', error);
            throw 'Error al agregar impuesto';
        }
    }
    
    async  actualizarImpuesto(impuesto) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'UPDATE Impuesto SET tipoImpuesto = @tipoImpuesto, porcentaje = @porcentaje WHERE impuestoCod = @impuestoCod';
            request.input('tipoImpuesto', impuesto.tipoImpuesto);
            request.input('porcentaje', impuesto.porcentaje);
            request.input('impuestoCod', impuesto.impuestoCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la actualización
        } catch (error) {
            console.error('Error al actualizar impuesto:', error);
            throw 'Error al actualizar impuesto';
        }
    }
    
    async  eliminarImpuesto(impuestoCod) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'DELETE FROM Impuesto WHERE impuestoCod = @impuestoCod';
            request.input('impuestoCod', impuestoCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la eliminación
        } catch (error) {
            console.error('Error al eliminar impuesto:', error);
            throw 'Error al eliminar impuesto';
        }
    }
    

    async verificarImpuesto(impuesto, actualizar = false) {
        if (!libGenerales.verificarCamposVacios(impuesto)) {
            console.log("1");
            return false;
        }
        
        if (!libGenerales.verificarLongitud(impuesto.impuestoCod, 10)) {
            console.log("2");
            return false;
        }
    
        if (!libGenerales.verificarLongitud(impuesto.tipoImpuesto, 50)) {
            console.log("3");
            return false;
        }
    
        if (isNaN(impuesto.porcentaje) || impuesto.porcentaje < 0 || impuesto.porcentaje > 100) {
            return false;
        }
    
        if (actualizar === true) {
            return true;
        }
    
        const impuestoExistente = await this.obtenerImpuestoPorCodigo(impuesto.impuestoCod);
    
        return !impuestoExistente;
    }
    
}

export const libImpuestos = new LibImpuestos();
