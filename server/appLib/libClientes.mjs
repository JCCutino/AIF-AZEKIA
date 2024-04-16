import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibClientes {

    obtenerClientes() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Cliente';
                connection.query(query, (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener clientes:', err);
                        connection.end();
                        reject('Error al obtener clientes');
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

    async obtenerClientePorCodigo(clienteCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Cliente WHERE clienteCod = ?';
                connection.query(query, [clienteCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al obtener cliente por código de cliente:', err);
                        reject('Error al obtener cliente por código de cliente');
                    } else {
                        resolve(resultado[0] || null);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    

    agregarCliente(cliente) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'INSERT INTO Cliente (clienteCod, CIF, razonSocial, direccion, CP, municipio) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(query, [cliente.clienteCod, cliente.CIF, cliente.razonSocial, cliente.direccion, cliente.CP, cliente.municipio], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al agregar cliente:', err);
                        reject('Error al agregar cliente');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    actualizarCliente(cliente) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB(); 
                const query = 'UPDATE Cliente SET CIF = ?, razonSocial = ?, direccion = ?, CP = ?, municipio = ? WHERE clienteCod = ?';
                connection.query(query, [cliente.CIF, cliente.razonSocial, cliente.direccion, cliente.CP, cliente.municipio, cliente.clienteCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al actualizar cliente:', err);
                        reject('Error al actualizar cliente');
                    } else {
                        resolve(resultado); 
                    }
                });
            } catch (error) {
                reject(error); 
            }
        });
    } 

    comprobarExistenciaClientePorCodigo(clienteCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT COUNT(*) AS count FROM Cliente WHERE clienteCod = ?';
                connection.query(query, [clienteCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al comprobar cliente existente por código:', err);
                        reject('Error al comprobar cliente existente por código');
                    } else {
                        resolve(resultado[0].count > 0);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    comprobarExistenciaClientePorCIF(CIF) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT COUNT(*) AS count FROM Cliente WHERE CIF = ?';
                connection.query(query, [CIF], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al comprobar cliente existente por CIF:', err);
                        reject('Error al comprobar cliente existente por CIF');
                    } else {
                        resolve(resultado[0].count > 0);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    eliminarCliente(clienteCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM Cliente WHERE clienteCod = ?';
                connection.query(query, [clienteCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar cliente:', err);
                        reject('Error al eliminar cliente');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

   async verificarCliente(cliente) {
        if (!libGenerales.verificarCamposVacios(cliente)) {
            return false;
        }

        if (!libGenerales.verificarLongitud(cliente.clienteCod, 20) ||
            !libGenerales.verificarLongitud(cliente.CIF, 20) ||
            !libGenerales.verificarLongitud(cliente.razonSocial, 100) ||
            !libGenerales.verificarLongitud(cliente.direccion, 150) ||
            !libGenerales.verificarLongitud(cliente.CP, 10) ||
            !libGenerales.verificarLongitud(cliente.municipio, 50)) {
            return false;
        }

      
        return true;
    }
}

export const libClientes = new LibClientes();
