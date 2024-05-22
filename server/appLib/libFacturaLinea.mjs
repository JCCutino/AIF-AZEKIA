import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibFacturaLinea {

    async  eliminarLineasPorFactura(facturaVentaNum, empresaCod, serieCod) {
        try {
            const pool = await dbConexion.conectarDB(); 
            const request = pool.request(); 
            const query = `
                DELETE FROM 
                    FacturaVentaLinea 
                WHERE 
                    facturaVentaNum = @facturaVentaNum AND empresaCod = @empresaCod AND serieCod = @serieCod;
            `;
            request.input('facturaVentaNum', facturaVentaNum);
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
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

    async  agregarFacturaVentaLinea(facturaLinea) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = `
                INSERT INTO FacturaVentaLinea 
                (empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum, proyectoCod, texto, cantidad, precio, importeBruto, descuento, importeDescuento, importeNeto, tipoIVACod, tipoIRPFCod)
                VALUES 
                (@empresaCod, @serieCod, @facturaVentaNum, @facturaVentaLineaNum, @proyectoCod, @texto, @cantidad, @precio, @importeBruto, @descuento, @importeDescuento, @importeNeto, @tipoIVACod, @tipoIRPFCod)
            `;
            request.input('empresaCod', facturaLinea.empresaCod);
            request.input('serieCod', facturaLinea.serieCod);
            request.input('facturaVentaNum', facturaLinea.facturaVentaNum);
            request.input('facturaVentaLineaNum', facturaLinea.facturaVentaLineaNum);
            request.input('proyectoCod', facturaLinea.proyectoCod);
            request.input('texto', facturaLinea.texto);
            request.input('cantidad', facturaLinea.cantidad);
            request.input('precio', facturaLinea.precio);
            request.input('importeBruto', facturaLinea.importeBruto);
            request.input('descuento', facturaLinea.descuento);
            request.input('importeDescuento', facturaLinea.importeDescuento);
            request.input('importeNeto', facturaLinea.importeNeto);
            request.input('tipoIVACod', facturaLinea.tipoIVACod);
            request.input('tipoIRPFCod', facturaLinea.tipoIRPFCod);
            
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0];
        } catch (error) {
            console.error('Error al agregar línea de factura:', error);
            throw 'Error al agregar línea de factura';
        }
    }
    
}

export const libFacturaLinea = new LibFacturaLinea();