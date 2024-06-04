let filaGuardada = true;


async function obtenerclientesCod() {
    try {
        const response = await fetch('/obtenerClientesDatosBasicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener clientesCod:' + data.errmsg)

            } else {
                agregarclientesCodSelect(data.datosCliente);
            }
        } else {
            mostrarError('Error al llamar a la API:' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:' + error.message);
    }
}

function agregarclientesCodSelect(datoscliente) {
    const selectAgregarclienteCod = document.getElementById("CodigoCliente");

    selectAgregarclienteCod.innerHTML = "";

    datoscliente.forEach((cliente) => {
        let optionAgregar = document.createElement("option");
        optionAgregar.text = cliente.razonSocial;
        optionAgregar.value = cliente.clienteCod;
        selectAgregarclienteCod.add(optionAgregar);
    });
}


async function obtenerEmpresasCod() {
    try {
        const response = await fetch('/obtenerEmpresasDatosBasicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener EmpresaCod:' + data.errmsg)

            } else {
                agregarEmpresasCodSelect(data.datosEmpresa);
            }
        } else {
            mostrarError('Error al llamar a la API:' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:' + error.message);
    }
}


function agregarEmpresasCodSelect(datosEmpresa) {
    const selectAgregarEmpresaCod = document.getElementById("CodigoEmpresa");

    selectAgregarEmpresaCod.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.text = "Seleccionar Empresa";
    defaultOption.value = "";
    selectAgregarEmpresaCod.add(defaultOption);

    datosEmpresa.forEach((Empresa) => {
        let optionAgregar = document.createElement("option");
        optionAgregar.text = Empresa.razonSocial;
        optionAgregar.value = Empresa.empresaCod;
        selectAgregarEmpresaCod.add(optionAgregar);
    });

    // Añadir el evento change al select
    selectAgregarEmpresaCod.addEventListener("change", function () {
        const selectedEmpresaCodValor = selectAgregarEmpresaCod.value;
        // Llama a la función cargarSeriesSelect con el código de empresa seleccionado
        obtenerSeries(selectedEmpresaCodValor);
    });
}
async function obtenerSeries(empresaCod) {
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
                mostrarError('Error al obtener series: ' + data.errmsg);
            } else {
                cargarSeriesSelect(data.series, empresaCod);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}

function cargarSeriesSelect(series, empresaCod) {
    const selectAgregarEmpresaCod = document.getElementById("CodigoEmpresa");
    const selectSeries = document.getElementById("serieCod");
    selectSeries.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.text = "Seleccionar Serie";
    defaultOption.value = "";
    selectSeries.add(defaultOption);
    series.forEach((serie) => {
        if (serie.empresaCod === empresaCod) {
            let option = document.createElement("option");
            option.text = serie.serieCod;
            option.value = serie.serieCod;
            selectSeries.add(option);
        }
    });

    selectSeries.addEventListener("change", function () {
        const selectedEmpresaCodValor = selectAgregarEmpresaCod.value;
        const selectedSerieCodValor = selectSeries.value;

        obtenerRecomendacionNumFactura(selectedEmpresaCodValor, selectedSerieCodValor);
    });
}
async function obtenerRecomendacionNumFactura(empresaCod, serieCod) {
    try {
        const response = await fetch('/obtenerRecomendacionNumeroFactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresaCod, serieCod })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.err) {
                console.log('Error al obtener la recomendacion del número de la factura: ' + data.errmsg);
            } else {
                await recomendarNumeroFactura(data.recomendacionNumeroFactura);
            }
        } else {
            console.log('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        console.log('Error al llamar a la API: ' + error.message);
    }
}

async function recomendarNumeroFactura(numeroFactura) {
    const campoNumFactura = document.getElementById("CodigoFactura");

    campoNumFactura.value = numeroFactura;

}


async function obtenerTiposIVA() {
    try {
        const response = await fetch('/obtenerIVA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener tipos de IVA: ' + data.errmsg);
            } else {
                cargarTiposIVASelect(data.IVA);
                console.log(data.IVA);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}


function cargarTiposIVASelect(tiposIVA) {
    const selectsIVA = document.querySelectorAll("#tipoIVA");

    selectsIVA.forEach(select => {
        select.innerHTML = "";

        tiposIVA.forEach((tipo) => {
            let option = document.createElement("option");
            option.text = tipo.impuestoCod;
            option.value = tipo.impuestoCod;
            select.add(option);
        });
    });
}

async function obtenerTiposIRPF() {
    try {
        const response = await fetch('/obtenerIRPF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener tipos de IRPF: ' + data.errmsg);
            } else {
                cargarTiposIRPFSelect(data.IRPF);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}

function cargarTiposIRPFSelect(tiposIRPF) {
    const selectsIRPF = document.querySelectorAll("#tipoIRPF");

    selectsIRPF.forEach(select => {
        select.innerHTML = "";

        tiposIRPF.forEach((tipo) => {
            console.log(tipo.impuestoCod)
            let option = document.createElement("option");
            option.text = tipo.impuestoCod;
            option.value = tipo.impuestoCod;
            select.add(option);
        });
    });
}

async function obtenerProyectosCod() {
    try {
        const response = await fetch('/obtenerProyectosDatosBasicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            // console.log(data.datosProyecto)

            if (data.err) {
                mostrarError('Error al obtener los proyectos: ' + data.errmsg);
            } else {
                cargarProyectosCodSelect(data.datosProyecto);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}


function cargarProyectosCodSelect(ProyectosCod) {
    const selectsProyecto = document.querySelectorAll("#proyectoCod");

    selectsProyecto.forEach(select => {
        select.innerHTML = "";

        ProyectosCod.forEach((proyecto) => {
            let option = document.createElement("option");
            option.text = proyecto.nombre;
            option.value = proyecto.proyectoCod;
            select.add(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Ocultar la tabla al cargar la página
    document.querySelector(".table").style.display = "none";
    document.getElementById("btnTerminarFactura").style.display = "none";
    document.getElementById("btnAñadirFila").style.display = "none";

    // Función para mostrar la tabla y el botón de añadir línea después de guardar los datos de facturación
    function mostrarTabla() {
        document.querySelector(".table").style.display = "table";
        document.getElementById("DetalleFactura").style.display = "none";
        document.getElementById("btnAñadirFila").style.display = "block";
        document.getElementById("btnTerminarFactura").style.display = "block";
    }

    // Función para mostrar el cuerpo de la tabla y la fila editable al presionar el botón "Añadir Fila"
    function mostrarCuerpoTabla() {
        // Mostrar la tabla y la fila editable
        document.getElementById("DetalleFactura").style.display = "table-row-group";
    }





    async function agregarFilaEditable() {
        if (!filaGuardada) {
            mostrarError("Debe guardar la fila actual antes de añadir una nueva.");
            return;
        }

        let empresaCod = document.getElementById('CodigoEmpresa').value;
        let serieCod = document.getElementById('serieCod').value;
        let facturaVentaNum = document.getElementById('CodigoFactura').value.trim();


        try {
            const response = await fetch('/agregarFacturaLinea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.err) {
                    console.log('Error al agregar la línea de factura: ' + data.errmsg);
                }
            } else {
                console.log('Error al llamar a la API: ' + response.statusText);
            }
        } catch (error) {
            console.log('Error al llamar a la API: ' + error.message);
        }

        filaGuardada = false; // Estado de fila no guardada
        let idFila = await obtenerUltimoNumFila();
        const idBotonGuardar = `btnGuardarLinea-${idFila}`;
        const idBotonBorrar = `btnBorrarLinea-${idFila}`;

        const fila = `
        <tr id="fila-${idFila}" class="factura-linea">
            <td><select id="proyectoCod"></select></td>
            <td contenteditable="true" id="campo1-${idFila}"></td>
            <td contenteditable="true" id="campo2-${idFila}" oninput="this.innerText = this.innerText.replace(/[^0-9]/g, '');"></td>
            <td contenteditable="true" id="campo3-${idFila}" oninput="this.innerText = this.innerText.replace(/[^0-9]/g, '');"></td>
            <td contenteditable="false"></td>
            <td><input type="number" id="campo4-${idFila}" step="0.01" min="0"></td>
            <td><select id="tipoIVA"></select></td>
            <td><select id="tipoIRPF"></select></td>
            <td class="text-right">
                <button type="button" id="${idBotonGuardar}" class="btn btn-success btnGuardarLinea">Guardar</button>
                <button type="button" id="${idBotonBorrar}" class=" mt-3 btn btn-danger btnBorrarLinea">Borrar</button>
            </td>
        </tr>
        `;
        document.getElementById("DetalleFactura").insertAdjacentHTML("beforeend", fila);

        await obtenerProyectosCod();
        await obtenerTiposIRPF();
        await obtenerTiposIVA();

        document.querySelectorAll('.btnGuardarLinea').forEach(button => {
            button.addEventListener('click', guardarLineaFactura);
        });

        document.querySelectorAll('.btnBorrarLinea').forEach(button => {
            button.addEventListener('click', borrarLineaFactura);
        });
        document.querySelectorAll(`#fila-${idFila} [contenteditable=true]`).forEach((element) => {
            element.addEventListener('input', () => {
                const camposEditables = [`campo1-${idFila}`, `campo2-${idFila}`, `campo3-${idFila}`, `campo4-${idFila}`];
                let algunCampoCambio = true;
        
                camposEditables.forEach((idCampo) => {
                    const campo = document.getElementById(idCampo);
                    if (campo && campo.innerText.trim() !== '') {
                        algunCampoCambio = true;
                    }
                });
        
                const botonGuardar = document.getElementById(idBotonGuardar);
                if (botonGuardar) { // Verifica si el botón existe
                    if (algunCampoCambio && botonGuardar.disabled) {
                        botonGuardar.disabled = false;
                    } else if (!algunCampoCambio && !botonGuardar.disabled) {
                        botonGuardar.disabled = true;
                    }
                }
            });
        });
        
    }

    // Agregar evento al botón "Añadir Fila"
    document.getElementById("btnAñadirFila").addEventListener("click", function () {
        if (filaGuardada) {
            mostrarCuerpoTabla();
            agregarFilaEditable();
        } else {
            mostrarError("Debe guardar la fila actual antes de añadir una nueva.");
        }
    });

    async function verificarCamposFormulario() {
        // Obtener los campos del formulario
        const codigoFactura = document.getElementById('CodigoFactura').value.trim();
        const codigoEmpresa = document.getElementById('CodigoEmpresa').value;
        const fecha = document.getElementById('Fecha').value;
        const codigoCliente = document.getElementById('CodigoCliente').value;
        const serieCod = document.getElementById('serieCod').value;

        // Validar que los campos no sean nulos o estén vacíos
        if (!codigoFactura) {
            mostrarError('Por favor, ingrese el número de factura.');
            return false;
        }

        if (codigoEmpresa === '0') {
            mostrarError('Por favor, seleccione una empresa.');
            return false;
        }

        if (!fecha) {
            mostrarError('Por favor, ingrese la fecha de emisión.');
            return false;
        }

        if (codigoCliente === '0') {
            mostrarError('Por favor, seleccione un cliente.');
            return false;
        }

        if (serieCod === '0') {
            mostrarError('Por favor, seleccione una serie de facturación.');
            return false;
        }

        // Si todos los campos son válidos, retorna true
        return true;

    }

    document.getElementById('btnGuardarFacturacion').addEventListener('click', async function () {
        if (await verificarCamposFormulario()) {
            // Si los campos son válidos, preparar los datos y llamar a la API para agregar la factura
            const datos = {
                empresaCod: document.getElementById('CodigoEmpresa').value,
                serieCod: document.getElementById('serieCod').value,
                facturaVentaNum: document.getElementById('CodigoFactura').value.trim(),
                clienteCod: document.getElementById('CodigoCliente').value,
                fechaEmision: document.getElementById('Fecha').value
            };

            console.log(datos);

            try {
                const response = await fetch('/agregarFactura', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ factura: datos })
                });

                const result = await response.json();

                if (result.err) {
                    mostrarError(`Error: ${result.errmsg}`);
                } else {
                    mostrarTabla();
                    document.getElementById('btnGuardarFacturacion').style.display = 'none';

                    // Hacer que los campos sean no editables
                    document.getElementById('CodigoEmpresa').disabled = true;
                    document.getElementById('serieCod').disabled = true;
                    document.getElementById('CodigoFactura').disabled = true;
                    document.getElementById('CodigoCliente').disabled = true;
                    document.getElementById('Fecha').disabled = true;
                }
            } catch (error) {
                console.error('Error al agregar factura:', error);
                mostrarError('Hubo un error al guardar la factura. Inténtelo de nuevo.');
            }

        }
    });

    obtenerTiposIVA();
    obtenerTiposIRPF();
    obtenerclientesCod();
    obtenerEmpresasCod();
    obtenerProyectosCod();
});



async function guardarLineaFactura(event) {
    const button = event.target;
    const linea = button.closest('.factura-linea');

    const empresaCod = document.getElementById('CodigoEmpresa').value;
    const serieCod = document.getElementById('serieCod').value;
    const facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

    let facturaVentaLineaNum = Array.from(document.querySelectorAll('.factura-linea')).indexOf(linea) + 1;
    facturaVentaLineaNum = facturaVentaLineaNum.toString();

    // Declarar importeBruto antes de usarlo
    let importeBruto = null;

    // Calcular importeBruto
    const precio = parseFloat(linea.querySelectorAll('td')[3].innerText.trim()) || null;
    const cantidad = parseFloat(linea.querySelectorAll('td')[2].innerText.trim()) || null;
    importeBruto = (precio !== null && cantidad !== null) ? precio * cantidad : null;

    const lineaFactura = {
        empresaCod,
        serieCod,
        facturaVentaNum,
        facturaVentaLineaNum,
        proyectoCod: linea.querySelector('#proyectoCod').value || null,
        texto: linea.querySelectorAll('td')[1].innerText.trim() || null,
        cantidad: parseFloat(linea.querySelectorAll('td')[2].innerText.trim()) || null,
        precio: parseFloat(linea.querySelectorAll('td')[3].innerText.trim()) || null,
        importeBruto: importeBruto, // Aquí ya se ha calculado
        descuento: parseFloat(linea.querySelectorAll('td')[5].innerText.trim()),
        tipoIVACod: linea.querySelector('#tipoIVA').value || null,
        tipoIRPFCod: linea.querySelector('#tipoIRPF').value || null
    };

    linea.querySelectorAll('td')[4].innerText = importeBruto !== null ? importeBruto.toFixed(2) : '';
    console.log(lineaFactura);

    try {
        const response = await fetch('/rellenarFacturaLinea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lineaFactura: lineaFactura })
        });

        const result = await response.json();

        if (result.err) {
            mostrarError(`Error: ${result.errmsg}`);
        } else {
            mostrarError('Línea de factura guardada exitosamente.');
            filaGuardada = true;
            button.disabled = true;
        }
    } catch (error) {
        console.error('Error al guardar línea de factura:', error);
        mostrarError('Hubo un error al guardar la línea de factura. Inténtelo de nuevo.');
    }
}

async function borrarLineaFactura(event) {
    const button = event.target;
    const linea = button.closest('.factura-linea');

    const empresaCod = document.getElementById('CodigoEmpresa').value;
    const serieCod = document.getElementById('serieCod').value;
    const facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

    let facturaVentaLineaNum = Array.from(document.querySelectorAll('.factura-linea')).indexOf(linea) + 1;
    facturaVentaLineaNum = facturaVentaLineaNum.toString();


    try {
        const response = await fetch('/eliminarFacturaLinea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresaCod: empresaCod, serieCod: serieCod, facturaVentaNum: facturaVentaNum, facturaVentaLineaNum: facturaVentaLineaNum})
        });

        const result = await response.json();

        if (result.err) {
            mostrarError(`Error: ${result.errmsg}`);
        } else {
            mostrarError('Línea de factura guardada exitosamente.');
            filaGuardada = true;
            button.disabled = true;
            linea.style.display = 'none';
        }
    } catch (error) {
        console.error('Error al guardar línea de factura:', error);
        mostrarError('Hubo un error al guardar la línea de factura. Inténtelo de nuevo.');
    }
}

async function obtenerUltimoNumFila() {

    try {

        const empresaCod = document.getElementById('CodigoEmpresa').value;
        const serieCod = document.getElementById('serieCod').value;
        const facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

        const response = await fetch('/obtenerUltimoNumFila', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum})

        });

        const result = await response.json();

        if (result.err) {
            mostrarError(`Error: ${result.errmsg}`);
        } else {
            console.log(result.ultimoNum);
            return result.ultimoNum
        }
    } catch (error) {
        console.error('Error al guardar línea de factura:', error);
        mostrarError('Hubo un error al guardar la línea de factura. Inténtelo de nuevo.');
    }
}

document.getElementById('btnTerminarFactura').addEventListener('click', function () {
    // Mostrar el modal ModalFinFactura
    $('#ModalFinFactura').modal('show');
});

document.getElementById('btnConfirmarDescartarFactura').addEventListener('click', function () {
    // Mostrar el modal ModalConfirmarBorrar
    $('#ModalConfirmarBorrar').modal('show');
});