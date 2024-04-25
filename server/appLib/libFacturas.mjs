import { dbConexion } from "./dbConexion.mjs";

class LibFacturas {

    async obtenerFacturas() {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM facturaventa';
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener facturas:', error);
            throw 'Error al obtener facturas';
        }
    }
    
    async eliminarFactura(empresaCod) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'DELETE FROM facturaventa WHERE empresaCod = @empresaCod';
            request.input('empresaCod', empresaCod);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la eliminación
        } catch (error) {
            console.error('Error al eliminar factura:', error);
            throw 'Error al eliminar factura';
        }
    }
    
}

export const libFacturas = new LibFacturas();