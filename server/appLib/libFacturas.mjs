import { dbConexion } from "./dbConexion.mjs";

class LibFacturas {

    obtenerFacturas() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM facturaventa';
                connection.query(query, (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener facturas:', err);
                        connection.end(); 
                        reject('Error al obtener empresas');
                    } else {
                        connection.end();
                        resolve(resultados || []);
                    }
                });
            } catch (error) {
                reject(error); 
            }
        });
    }

    eliminarFactura(empresaCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM facturaventa WHERE empresaCod = ?';
                connection.query(query, [empresaCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar factura:', err);
                        reject('Error al eliminar factura');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
 
}

export const libFacturas = new LibFacturas();