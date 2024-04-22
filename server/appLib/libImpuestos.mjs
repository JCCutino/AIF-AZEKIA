import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibImpuestos {
    async obtenerImpuestos() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Impuestos';
                connection.query(query, (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener impuestos:', err);
                        connection.end();
                        reject('Error al obtener impuestos');
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

    async obtenerImpuestoPorCodigo(impuestoCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Impuestos WHERE impuestoCod = ?';
                connection.query(query, [impuestoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al obtener impuesto por código:', err);
                        reject('Error al obtener impuesto por código');
                    } else {
                        resolve(resultado[0] || null);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async agregarImpuesto(impuesto) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'INSERT INTO Impuestos (impuestoCod, tipoImpuesto, porcentaje) VALUES (?, ?, ?)';
                connection.query(query, [impuesto.impuestoCod, impuesto.tipoImpuesto, impuesto.porcentaje], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al agregar impuesto:', err);
                        reject('Error al agregar impuesto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async actualizarImpuesto(impuesto) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'UPDATE Impuestos SET tipoImpuesto = ?, porcentaje = ? WHERE impuestoCod = ?';
                connection.query(query, [impuesto.tipoImpuesto, impuesto.porcentaje, impuesto.impuestoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al actualizar impuesto:', err);
                        reject('Error al actualizar impuesto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async eliminarImpuesto(impuestoCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM Impuestos WHERE impuestoCod = ?';
                connection.query(query, [impuestoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar impuesto:', err);
                        reject('Error al eliminar impuesto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
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
