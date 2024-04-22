import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibSeries {
    async obtenerSeries() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Serie';
                connection.query(query, (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener series:', err);
                        connection.end();
                        reject('Error al obtener series');
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

    async obtenerSeriePorCodigo(serieCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Serie WHERE serieCod = ?';
                connection.query(query, [serieCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al obtener serie por código:', err);
                        reject('Error al obtener serie por código');
                    } else {
                        resolve(resultado[0] || null);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async agregarSerie(serie) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'INSERT INTO Serie (serieCod, descripcion, ultimoNumUsado) VALUES (?, ?, ?)';
                connection.query(query, [serie.serieCod, serie.descripcion, serie.ultimoNumUsado], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al agregar serie:', err);
                        reject('Error al agregar serie');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async actualizarSerie(serie) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'UPDATE Serie SET descripcion = ?, ultimoNumUsado = ? WHERE serieCod = ?';
                connection.query(query, [serie.descripcion, serie.ultimoNumUsado, serie.serieCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al actualizar serie:', err);
                        reject('Error al actualizar serie');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async eliminarSerie(serieCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM Serie WHERE serieCod = ?';
                connection.query(query, [serieCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar serie:', err);
                        reject('Error al eliminar serie');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
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
