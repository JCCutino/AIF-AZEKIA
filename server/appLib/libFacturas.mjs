import { dbConexion } from "./dbConexion.mjs";

class LibFacturas {

    
    async  agregarFactura(factura, bloqueada) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'INSERT INTO Factura (empresaCod, serieCod, facturaVentaNum, clienteCod, fechaEmision, bloqueada) VALUES (@empresaCod, @serieCod, @facturaVentaNum, @clienteCod, @fechaEmision, @bloqueada)';
            request.input('empresaCod', factura.empresaCod);
            request.input('serieCod', factura.serieCod);
            request.input('facturaVentaNum', factura.facturaVentaNum);
            request.input('clienteCod', factura.clienteCod);
            request.input('fechaEmision', factura.fechaEmision);
            request.input('bloqueada', bloqueada);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; // Número de filas afectadas por la inserción
        } catch (error) {
            console.error('Error al agregar proyecto:', error);
            throw 'Error al agregar proyecto';
        }
    }
    
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
    
    async eliminarFactura(empresaCod, serieCod, facturaventaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'DELETE FROM facturaventa WHERE empresaCod = @empresaCod AND serieCod = @serieCod AND facturaventaNum =  @facturaventaNum';
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            request.input('facturaventaNum', facturaventaNum);
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0]; 
        } catch (error) {
            console.error('Error al eliminar factura:', error);
            throw 'Error al eliminar factura';
        }
    }
    
    async verificarFacturaVentaReferenciada(facturaVentaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request(); 
            const query = `
                SELECT 
                    COUNT(*) AS count 
                FROM 
                    FacturaVentaLinea 
                WHERE 
                    facturaVentaNum = @facturaVentaNum;
            `;
            request.input('facturaVentaNum', facturaVentaNum);
            const resultado = await request.query(query);
            await pool.close(); 
    
            return resultado.recordset[0].count > 0;
        } catch (error) {
            console.error('Error al comprobar referencia de facturaVentaNum:', error);
            throw 'Error al comprobar referencia de facturaVentaNum';
        }
    }
    

}

export const libFacturas = new LibFacturas();