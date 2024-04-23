function mostrarModalAgregarSerie() {
    document.getElementById("modalAgregarSerie").style.display = "block";
}

// Función para cerrar el modal de agregar series
function cerrarModal() {
    document.getElementById("modalAgregarSerie").style.display = "none";
    document.getElementById("modalEditarSerie").style.display = "none";
}

async function agregarSerie(serie) {
    try {
        const response = await fetch('/agregarSerie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serie: serie })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.err) {
                mostrarError('Error al añadir la serie: ' + data.errmsg);
            }        } else {
            mostrarError('Error al añadir serie:' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al añadir serie:' + error.message);
    }
}

async function actualizarSerie(serie) {
    try {
        const response = await fetch('/actualizarSerie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serie: serie })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.err) {
                mostrarError('Error al actualizar la serie:' + data.errmsg);
            }        } else {
            mostrarError('Error al actualizar serie:' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al actualizar serie:'+  error.message);
    }
}

async function obtenerSeriesAPI() {
    try {
        const response = await fetch('/obtenerSeries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                // Si hay un error, muestra un mensaje de error
                mostrarError('Error al obtener series:'+ data.errmsg);
                mostrarDatosEnTabla(data);

            } else {
                // Si no hay error, procesa los datos y muestra la tabla
                mostrarDatosEnTabla(data);
            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}

async function eliminarSerie(serieCod) {
    try {
        const response = await fetch('/eliminarSerie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serieCod })
        });

        if (response.ok) {
            const data = await response.json();
            await obtenerSeriesAPI();
        } else {
            mostrarError('Error al eliminar serie:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al eliminar serie:'+ error.message);
    }
}

async function abrirModalEditableSerie(serieCod) {
    try {
        // Obtener todas las series
        const response = await fetch('/obtenerSeries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Buscar la serie con el código proporcionado
            const serie = data.series.find(ser => ser.serieCod === serieCod);
            
            if (serie) {
                // Llenar los campos del formulario del modal con los detalles de la serie
                document.getElementById("serieCodEditar").value = serie.serieCod;
                document.getElementById("serieCodEditar").readOnly = true;
                document.getElementById("descripcionEditar").value = serie.descripcion;
                document.getElementById("ultimoNumUsadoEditar").value = serie.ultimoNumUsado;

                // Mostrar el modal de edición
                const modalEditarSerie = document.getElementById('modalEditarSerie');
                modalEditarSerie.style.display = 'block';
            } else {
                mostrarError('No se encontró la serie con el código proporcionado:'+ serieCod);
            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al abrir el modal editable de la serie:'+ error.message);
    }
}

// Luego, definir la función mostrarDatosEnTabla
async function mostrarDatosEnTabla(data) {
    // Obtener la tabla HTML
    const tabla = document.getElementById('tablaSeries');

    // Obtener todas las filas de la tabla, excepto la primera (la cabecera)
    const filasDatos = Array.from(tabla.querySelectorAll('tr:not(:first-child)'));

    // Eliminar todas las filas de datos existentes
    filasDatos.forEach(fila => fila.remove());

    if (data.series && Array.isArray(data.series)) {
        data.series.forEach(serie => {
            const fila = document.createElement('tr');
    
            Object.values(serie).forEach(valor => {
                const celda = document.createElement('td');
                celda.textContent = valor;
                fila.appendChild(celda);
            });

            // Agregar el botón "Ver" a la última celda de la fila
            const celdaBoton = document.createElement('td');
            const boton = document.createElement('button');
            boton.textContent = 'Ver';
            celdaBoton.appendChild(boton);
            fila.appendChild(celdaBoton);

            // Agregar la fila a la tabla
            tabla.appendChild(fila);

            // Agregar el evento click al botón "Ver"
            boton.addEventListener('click', function() {
                // Obtener el identificador único de la serie correspondiente a esta fila
                const serieCod = serie.serieCod;
                abrirModalEditableSerie(serieCod);
            });
        });
    } else {
        mostrarError('No se encontraron datos de series válidos en la respuesta.');
    }
}

async function guardarSerie() {
    // Obtener los datos del formulario
    const serieCod = document.getElementById("serieCod").value;
    const descripcion = document.getElementById("descripcion").value;
    const ultimoNumUsadoString = document.getElementById("ultimoNumUsado").value;
   
    const ultimoNumUsado = parseInt(ultimoNumUsadoString);


    const serie = {
      serieCod: serieCod,
      descripcion: descripcion,
      ultimoNumUsado: ultimoNumUsado
    };

    try {
        // Llamar a la función agregarSerie con el objeto serie como argumento
        await agregarSerie(serie);
        // Cerrar el modal después de agregar la serie con éxito
        cerrarModal();
        // Actualizar la tabla de series
        await obtenerSeriesAPI();
    } catch (error) {
        mostrarError('Error al agregar serie:'+ error.message);
    }
}  

async function actualizadaSerie() {
       // Obtener los datos del formulario
       const serieCod = document.getElementById("serieCodEditar").value;
       const descripcion = document.getElementById("descripcionEditar").value;
       const ultimoNumUsadoString = document.getElementById("ultimoNumUsadoEditar").value;
      
       const ultimoNumUsado = parseInt(ultimoNumUsadoString);
   
   
       const serie = {
         serieCod: serieCod,
         descripcion: descripcion,
         ultimoNumUsado: ultimoNumUsado
       };

    try {
        await actualizarSerie(serie);
        // Cerrar el modal después de actualizar la serie con éxito
        cerrarModal();
        // Actualizar la tabla de series
        await obtenerSeriesAPI();
    } catch (error) {
        mostrarError('Error al actualizar serie:'+ error.message);
    }
}

function ClicEliminarSerie() {
    const serieCod = document.getElementById("serieCodEditar").value;
    eliminarSerie(serieCod); 
    cerrarModal();
}
async function main() {
    try {
        // Al cargar la página, obtener y mostrar los datos de las series
        await obtenerSeriesAPI();
    } catch (error) {
        mostrarError('Error en la ejecución principal:'+ error);
    }
}

// Llamar a la función principal
main();
