import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibFacturaLinea {

    async  eliminarLineasPorNumeroFactura(facturaVentaNum) {
        try {
            const pool = await dbConexion.conectarDB(); 
            const request = pool.request(); 
            const query = `
                DELETE FROM 
                    FacturaVentaLinea 
                WHERE 
                    facturaVentaNum = @facturaVentaNum;
            `;
            request.input('facturaVentaNum', facturaVentaNum);
            const resultado = await request.query(query);
            await pool.close(); 

            return resultado.rowsAffected[0];
       } catch (error) {
            console.error('Error al eliminar FacturaVentaLineas:', error);
            throw 'Error al eliminar FacturaVentaLineas';
        }
    }
    
    async obtenerFacturaLineas(empresaCod, serieCod, facturaVentaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM facturaventalinea WHERE empresaCod = @empresaCod AND serieCod = @serieCod AND facturaVentaNum = @facturaVentaNum';
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            request.input('facturaVentaNum', facturaVentaNum);
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener lineas factura:', error);
            throw 'Error al obtener facturas';
        }
    }

}

export const libFacturaLinea = new LibFacturaLinea();