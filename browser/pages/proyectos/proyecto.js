function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear().toString().slice(-2);

    return `${dia}/${mes}/${anio}`;
}
function ajustarFechaParaInput(dateString) {
    const date = new Date(dateString);

    const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

    const formattedDate = adjustedDate.toISOString().split('T')[0];

    return formattedDate;
}
function mostrarModalAgregarProyecto() {
    document.getElementById("modalAgregarProyecto").style.display = "block";
}

// Función para cerrar el modal de agregar proyecto
function cerrarModal() {
    document.getElementById("modalAgregarProyecto").style.display = "none";
    document.getElementById("modalEditarProyecto").style.display = "none";
}

async function agregarProyecto(proyecto) {
    try {
        const response = await fetch('/agregarProyecto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ proyecto: proyecto })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.err) {
                mostrarError(data.errmsg);
            }
        } else {
            mostrarError('Error al añadir proyecto:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al añadir proyecto:'+ error.message);
    }
}

async function actualizarProyecto(proyecto) {
    try {
        const response = await fetch('/actualizarProyecto'+ {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ proyecto: proyecto })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.err) {
                mostrarError(data.errmsg);
            }
        } else {
            mostrarError('Error al actualizar proyecto:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al actualizar proyecto:'+ error.message);
    }
}

async function obtenerProyectosAPI() {
    try {
        const response = await fetch('/obtenerProyectos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                // Si hay un error, muestra un mensaje de error
                mostrarError('Error al obtener proyectos:'+ data.errmsg);
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


async function obtenerEmpresasCod() {
    try {
        const response = await fetch('/obtenerEmpresasCod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener empresasCod:'+ data.errmsg)

            } else {
                agregarEmpresasCodSelect(data.empresasCod)
            }
        } else {
            
            mostrarError('Error al llamar a la API:'+ response.statusText);

        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}


async function obtenerClientesCod() {
    try {
        const response = await fetch('/obtenerClientesCod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener clientesCod:'+ data.errmsg);
            } else {
                agregarClientesCodSelect(data.clientesCod);

            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}
async function eliminarProyecto(proyectoCod) {
    try {
        const response = await fetch('/eliminarProyecto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ proyectoCod })
        });

        if (response.ok) {
            const data = await response.json();
            await obtenerProyectosAPI();
        } else {
            mostrarError('Error al eliminar proyecto:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al eliminar proyecto:'+ error.message);
    }
}

async function abrirModalEditableProyecto(proyectoCod) {
    try {
        // Obtener todos los proyectos
        const response = await fetch('/obtenerProyectos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Buscar el proyecto con el código proporcionado
            const proyecto = data.proyectos.find(proy => proy.proyectoCod === proyectoCod);

            if (proyecto) {
                // Mostrar el modal de edición
                const modalEditarProyecto = document.getElementById('modalEditarProyecto');
                modalEditarProyecto.style.display = 'block';

                document.getElementById("proyectoCodEditar").value = proyecto.proyectoCod;
                document.getElementById("proyectoCodEditar").readOnly = true;
                document.getElementById("nombreEditar").value = proyecto.nombre;
                document.getElementById("fechaInicioEditar").value = ajustarFechaParaInput(proyecto.fechaInicio);
                document.getElementById("fechaFinPrevistoEditar").value = ajustarFechaParaInput(proyecto.fechaFinPrevisto);
                document.getElementById("empresaCodEditar").value = proyecto.empresaCod;
                document.getElementById("clienteCodEditar").value = proyecto.clienteCod;
                document.getElementById("importeTotalPrevistoEditar").value = proyecto.importeTotalPrevisto;
                document.getElementById("importeExtraPrevistoEditar").value = proyecto.importeExtraPrevisto;

            } else {
                mostrarError('No se encontró el proyecto con el código proporcionado:'+ proyectoCod);
            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al abrir el modal editable del proyecto:'+ error.message);
    }
}


// Luego, definir la función mostrarDatosEnTabla
async function mostrarDatosEnTabla(data) {
    // Obtener la tabla HTML
    const tabla = document.getElementById('tablaProyectos');

    // Obtener todas las filas de la tabla, excepto la primera (la cabecera)
    const filasDatos = Array.from(tabla.querySelectorAll('tr:not(:first-child)'));

    // Eliminar todas las filas de datos existentes
    filasDatos.forEach(fila => fila.remove());

    if (data.proyectos && Array.isArray(data.proyectos)) {
        data.proyectos.forEach(proyecto => {
            const fila = document.createElement('tr');

            Object.entries(proyecto).forEach(([clave, valor]) => {
                const celda = document.createElement('td');
                if (clave === 'fechaInicio' || clave === 'fechaFinPrevisto') {
                    celda.textContent = formatearFecha(valor);
                } else {
                    celda.textContent = valor;
                }
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
            boton.addEventListener('click', function () {
                // Obtener el identificador único del proyecto correspondiente a esta fila
                const proyectoCod = proyecto.proyectoCod;
                abrirModalEditableProyecto(proyectoCod);
            });
        });
    } else {
        mostrarError('No se encontraron datos de proyectos válidos en la respuesta.');
    }
}

async function guardarProyecto() {
    // Obtener los datos del formulario
    const proyectoCod = document.getElementById("proyectoCod").value;
    const nombre = document.getElementById("nombre").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFinPrevisto = document.getElementById("fechaFinPrevisto").value;
    const empresaCod = document.getElementById("empresaCod").value;
    const clienteCod = document.getElementById("clienteCod").value;
    const importeTotalPrevisto = document.getElementById("importeTotalPrevisto").value;
    const importeExtraPrevisto = document.getElementById("importeExtraPrevisto").value;

    const proyecto = {
        proyectoCod: proyectoCod,
        nombre: nombre,
        fechaInicio: fechaInicio,
        fechaFinPrevisto: fechaFinPrevisto,
        empresaCod: empresaCod,
        clienteCod: clienteCod,
        importeTotalPrevisto: importeTotalPrevisto,
        importeExtraPrevisto: importeExtraPrevisto
    };

    try {
        // Llamar a la función agregarProyecto con el objeto proyecto como argumento
        await agregarProyecto(proyecto);
        // Cerrar el modal después de agregar el proyecto con éxito
        cerrarModal();
        // Actualizar la tabla de proyectos
        await obtenerProyectosAPI();
    } catch (error) {
        mostrarError('Error al agregar proyecto:'+ error.message);
    }
}

async function actualizadaProyecto() {
    // Obtener los datos del formulario
    const proyectoCod = document.getElementById("proyectoCodEditar").value;
    const nombre = document.getElementById("nombreEditar").value;
    const fechaInicio = document.getElementById("fechaInicioEditar").value;
    const fechaFinPrevisto = document.getElementById("fechaFinPrevistoEditar").value;
    const empresaCod = document.getElementById("empresaCodEditar").value;
    const clienteCod = document.getElementById("clienteCodEditar").value;
    const importeTotalPrevisto = document.getElementById("importeTotalPrevistoEditar").value;
    const importeExtraPrevisto = document.getElementById("importeExtraPrevistoEditar").value;

    const proyecto = {
        proyectoCod: proyectoCod,
        nombre: nombre,
        fechaInicio: fechaInicio,
        fechaFinPrevisto: fechaFinPrevisto,
        empresaCod: empresaCod,
        clienteCod: clienteCod,
        importeTotalPrevisto: importeTotalPrevisto,
        importeExtraPrevisto: importeExtraPrevisto
    };

    try {
        await actualizarProyecto(proyecto);
        // Cerrar el modal después de actualizar el proyecto con éxito
        cerrarModal();
        // Actualizar la tabla de proyectos
        await obtenerProyectosAPI();
    } catch (error) {
        mostrarError('Error al actualizar proyecto:'+ error.message);
    }
}

function ClicEliminarProyecto() {
    const proyectoCod = document.getElementById("proyectoCodEditar").value;
    eliminarProyecto(proyectoCod);
    cerrarModal();
}

function agregarClientesCodSelect(clientesCod) {
    var selectAgregarClienteCod = document.getElementById("clienteCod");
    var selectEditarClienteCod = document.getElementById("clienteCodEditar");

    selectAgregarClienteCod.innerHTML = "";
    selectEditarClienteCod.innerHTML = "";

    clientesCod.forEach(function (cliente) {
        var optionAgregar = document.createElement("option");
        optionAgregar.text = cliente.clienteCod;
        optionAgregar.value = cliente.clienteCod;
        selectAgregarClienteCod.add(optionAgregar);

        var optionEditar = document.createElement("option");
        optionEditar.text = cliente.clienteCod;
        optionEditar.value = cliente.clienteCod;
        selectEditarClienteCod.add(optionEditar);
    });
}

function agregarEmpresasCodSelect(empresasCod) {
    var selectAgregarEmpresaCod = document.getElementById("empresaCod");
    var selectEditarEmpresaCod = document.getElementById("empresaCodEditar");

    selectAgregarEmpresaCod.innerHTML = "";
    selectEditarEmpresaCod.innerHTML = "";

    empresasCod.forEach(function (empresa) {
        var optionAgregar = document.createElement("option");
        optionAgregar.text = empresa.empresaCod;
        optionAgregar.value = empresa.empresaCod;
        selectAgregarEmpresaCod.add(optionAgregar);

        var optionEditar = document.createElement("option");
        optionEditar.text = empresa.empresaCod;
        optionEditar.value = empresa.empresaCod;
        selectEditarEmpresaCod.add(optionEditar);
    });
}


async function main() {
    try {
        // Al cargar la página, obtener y mostrar los datos de los proyectos
        await obtenerProyectosAPI();
        await obtenerClientesCod();
        await obtenerEmpresasCod()

    } catch (error) {
        mostrarError('Error en la ejecución principal:'+ error);
    }
}

// Llamar a la función principal
main();