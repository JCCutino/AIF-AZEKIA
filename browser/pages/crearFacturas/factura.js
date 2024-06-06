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


async function obtenerTiposIVA(id, valorSeleccionado = false) {
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
                cargarTiposIVASelect(data.IVA, id, valorSeleccionado);
                console.log(data.IVA);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}


function cargarTiposIVASelect(tiposIVA, id, valorSeleccionado = false) {
    const selectsIVA = document.getElementById(id);

        tiposIVA.forEach((tipo) => {
            let option = document.createElement("option");
            option.text = tipo.impuestoCod;
            option.value = tipo.impuestoCod;
            selectsIVA.add(option);
        });

        if (valorSeleccionado) {
            selectsIVA.value = valorSeleccionado;
        }
}

async function obtenerTiposIRPF(id, valorSeleccionado = false) {
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
                cargarTiposIRPFSelect(data.IRPF, id, valorSeleccionado);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}

function cargarTiposIRPFSelect(tiposIRPF, id, valorSeleccionado = false) {
    const selectsIRPF = document.getElementById(id);

    selectsIRPF.innerHTML = "";

        tiposIRPF.forEach((tipo) => {
            let option = document.createElement("option");
            option.text = tipo.impuestoCod;
            option.value = tipo.impuestoCod;
            selectsIRPF.add(option);
        });

        if (valorSeleccionado) {
            selectsIRPF.value = valorSeleccionado;
        }
}

async function obtenerProyectosCod(id, valorSeleccionado = false) {
    try {
        const response = await fetch('/obtenerProyectosDatosBasicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.datosProyecto)

            if (data.err) {
                mostrarError('Error al obtener los proyectos: ' + data.errmsg);
            } else {
                cargarProyectosCodSelect(data.datosProyecto, id, valorSeleccionado);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}


function cargarProyectosCodSelect(ProyectosCod, id, valorSeleccionado = false) {
    console.log(id);
    const selectProyecto = document.getElementById(id);
        selectProyecto.innerHTML = "";

        ProyectosCod.forEach((proyecto) => {
            let option = document.createElement("option");
            option.text = proyecto.nombre;
            option.value = proyecto.proyectoCod;
            selectProyecto.add(option);
        });

        if (valorSeleccionado) {
            selectProyecto.value = valorSeleccionado;
        }
}

async function guardarLineaFactura(event) {
    const button = event.target;
    const linea = button.closest('.factura-linea');
    // const linea = zdl.row(button, "FacturaVentaLinea")
    // const cabecera = zdl.row(button, "FacturaVenta")
    const empresaCod = document.getElementById('CodigoEmpresa').value;
    // const empresaCod = zdl.value(cabecera, "empresaCod")
    const serieCod = document.getElementById('serieCod').value;
    const facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

    let facturaVentaLineaNum = linea.getAttribute('data-id-linea');
    // Declarar importeBruto antes de usarlo
    let importeBruto = null;

    // Calcular importeBruto
    const precio = parseFloat(linea.querySelectorAll('td')[3].innerText.trim()) || null;
    // const precio = zdl.value( linea, "precio", zdl.NUMERO, [10,2])
    const cantidad = parseFloat(linea.querySelectorAll('td')[2].innerText.trim()) || null;
    // const cantidad = zdl.value( linea, "cantidad" , { type: zdl.NUMBER, required: true,  prec: 10, scale:2, min:0, max:100} )
    importeBruto = (precio !== null && cantidad !== null) ? precio * cantidad : null;
    // const descripcion = zdl.value4
    const lineaFactura = {
        empresaCod,
        serieCod,
        facturaVentaNum,
        facturaVentaLineaNum,
        proyectoCod: linea.querySelector(`#proyectoCod-${facturaVentaLineaNum}`).value || null,
        texto: linea.querySelectorAll('td')[1].innerText.trim() || null,
        cantidad: parseFloat(linea.querySelectorAll('td')[2].innerText.trim()) || null,
        precio: parseFloat(linea.querySelectorAll('td')[3].innerText.trim()) || null,
        importeBruto: importeBruto, // Aquí ya se ha calculado
        descuento: parseFloat(linea.querySelectorAll('td')[5].innerText.trim()),
        tipoIVACod: linea.querySelector(`#tipoIVA-${facturaVentaLineaNum}`).value || null,
        tipoIRPFCod: linea.querySelector(`#tipoIRPF-${facturaVentaLineaNum}`).value || null
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

    let facturaVentaLineaNum = linea.getAttribute('data-id-linea');
    facturaVentaLineaNum = facturaVentaLineaNum.toString();


    try {
        const response = await fetch('/eliminarFacturaLinea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresaCod: empresaCod, serieCod: serieCod, facturaVentaNum: facturaVentaNum, facturaVentaLineaNum: facturaVentaLineaNum })
        });

        const result = await response.json();

        if (result.err) {
            mostrarError(`Error: ${result.errmsg}`);
        } else {
            mostrarError('Línea de factura guardada exitosamente.');
            filaGuardada = true;
            button.disabled = true;
            linea.remove();
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
            body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum })

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



document.addEventListener("DOMContentLoaded", function () {
    // Ocultar la tabla al cargar la página
    document.querySelector(".table").style.display = "none";
    document.getElementById("btnTerminarFactura").style.display = "none";
    document.getElementById("btnEliminarFactura").style.display = "none";
    document.getElementById("btnAñadirFila").style.display = "none";

    // Función para mostrar la tabla y el botón de añadir línea después de guardar los datos de facturación
    async function mostrarTabla() {
        document.querySelector(".table").style.display = "table";
        document.getElementById("DetalleFactura").style.display = "none";
        document.getElementById("btnAñadirFila").style.display = "block";
        document.getElementById("btnTerminarFactura").style.display = "block";
        document.getElementById("btnEliminarFactura").style.display = "block";

        document.getElementById("btnEliminarFactura").addEventListener("click", function() {
            // Llamar a la función específica cuando se hace clic en el botón
            abrirModalBorrar();
        });

        document.getElementById("btnTerminarFactura").addEventListener("click", function() {
            // Llamar a la función específica cuando se hace clic en el botón
            let facturaCompletada = verificarCamposTabla();
            console.log(facturaCompletada);
        });
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
        <tr id="fila-${idFila}" class="factura-linea" data-id-linea="${idFila}">
            <td><select id="proyectoCod-${idFila}"></select></td>
            <td contenteditable="true" id="campo1-${idFila}"></td>
            <td contenteditable="true" id="campo2-${idFila}" oninput="this.innerText = this.innerText.replace(/[^0-9]/g, '');"></td>
            <td contenteditable="true" id="campo3-${idFila}" oninput="this.innerText = this.innerText.replace(/[^0-9]/g, '');"></td>
            <td contenteditable="false"></td>
            <td contenteditable="true" id="campo4-${idFila}"></td>
            <td><select id="tipoIVA-${idFila}"></select></td>
            <td><select id="tipoIRPF-${idFila}"></select></td>
            <td class="text-center">
                <button type="button" id="${idBotonGuardar}" class="btn btn-success btnGuardarLinea">Guardar</button>
                <button type="button" id="${idBotonBorrar}" class="btn btn-danger btnBorrarLinea">Borrar</button>
            </td>
        </tr>
        `;
        document.getElementById("DetalleFactura").insertAdjacentHTML("beforeend", fila);

        await obtenerProyectosCod(`proyectoCod-${idFila}`);
        await obtenerTiposIRPF(`tipoIRPF-${idFila}`);
        await obtenerTiposIVA(`tipoIVA-${idFila}`);

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
        document.querySelectorAll(`#fila-${idFila} select`).forEach((select) => {
            select.addEventListener('change', () => {
                const botonGuardar = document.getElementById(idBotonGuardar);
                if (botonGuardar) { // Verifica si el botón existe
                    botonGuardar.disabled = false; // Habilita el botón al cambiar un selector
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
    async function agregarFilaExistente(filaDatos) {
        // Obtener el ID de la última fila para generar los IDs únicos de los elementos de la nueva fila
        const idFila = filaDatos.facturaVentaLineaNum;
        const idBotonGuardar = `btnGuardarLinea-${idFila}`;
        const idBotonBorrar = `btnBorrarLinea-${idFila}`;

        // Crear la fila con los datos proporcionados
        const fila = `
    <tr id="fila-${idFila}" class="factura-linea" data-id-linea="${idFila}">
        <td><select id="proyectoCod-${idFila}"></select></td>
        <td contenteditable="true" id="campo1-${idFila}">${filaDatos.texto !== null ? filaDatos.texto : ''}</td>
        <td contenteditable="true" id="campo2-${idFila}"  onkeypress="return event.charCode >= 48 && event.charCode <= 57">${filaDatos.cantidad !== null ? filaDatos.cantidad : ''}</td>
        <td contenteditable="true" id="campo3-${idFila}" onkeypress="return /^[0-9.]*$/.test(event.key)">${filaDatos.precio !== null ? filaDatos.precio : ''}</td>
        <td contenteditable="false">${filaDatos.importeBruto !== null ? filaDatos.importeBruto : ''}</td>
        <td contenteditable="true" id="campo4-${idFila}" onkeypress="return /^[0-9.]*$/.test(event.key)">${filaDatos.descuento !== null ? filaDatos.descuento : ''}</td>
        <td><select id="tipoIVA-${idFila}"></select></td>
        <td><select id="tipoIRPF-${idFila}"></select></td>
        <td class="text-right">
            <button type="button" id="${idBotonGuardar}" class="btn btn-success btnGuardarLinea">Guardar</button>
            <button type="button" id="${idBotonBorrar}" class="btn btn-danger btnBorrarLinea">Borrar</button>
        </td>
    </tr>
    `;
        // Insertar la nueva fila en la tabla
        document.getElementById("DetalleFactura").insertAdjacentHTML("beforeend", fila);

        await obtenerProyectosCod(`proyectoCod-${idFila}`,filaDatos.proyectoCod);
        await obtenerTiposIRPF(`tipoIRPF-${idFila}`, filaDatos.tipoIRPF); 
        await obtenerTiposIVA(`tipoIVA-${idFila}`, filaDatos.tipoIVA);

        // Agregar event listeners a los botones
        document.querySelectorAll('.btnGuardarLinea').forEach(button => {
            button.addEventListener('click', guardarLineaFactura);
            button.disabled = true;

        });

        document.querySelectorAll('.btnBorrarLinea').forEach(button => {
            button.addEventListener('click', borrarLineaFactura);
        });

        

        // Agregar event listener a los campos editables para habilitar/deshabilitar el botón Guardar
        document.querySelectorAll(`#fila-${idFila} [contenteditable=true]`).forEach((element) => {
            element.addEventListener('input', () => {
                const camposEditables = [`campo1-${idFila}`, `campo2-${idFila}`, `campo3-${idFila}`, `campo4-${idFila}`];
                let algunCampoCambio = false;

                camposEditables.forEach((idCampo) => {
                    const campo = document.getElementById(idCampo);
                    if (campo && campo.innerText.trim() !== '') {
                        algunCampoCambio = true;
                    }
                });

                const botonGuardar = document.getElementById(idBotonGuardar);
                if (botonGuardar) { // Verifica si el botón existe
                    botonGuardar.disabled = !algunCampoCambio;
                }
            });
        });

        document.querySelectorAll(`#fila-${idFila} select`).forEach((select) => {
            select.addEventListener('change', () => {
                const botonGuardar = document.getElementById(idBotonGuardar);
                if (botonGuardar) { // Verifica si el botón existe
                    botonGuardar.disabled = false; // Habilita el botón al cambiar un selector
                }
            });
        });
    }

    async function rellenarYBloquearCamposFactura(factura) {
        // Rellenar los campos del formulario con los datos de facturación
        const selectEmpresa = document.getElementById('CodigoEmpresa');
        selectEmpresa.innerHTML = ''; // Limpiar opciones existentes

        const optionEmpresa = document.createElement('option');
        optionEmpresa.value = factura.empresaCod;
        optionEmpresa.text = factura.empresaCod;
        selectEmpresa.appendChild(optionEmpresa);

        const selectCliente = document.getElementById('CodigoCliente');
        selectCliente.innerHTML = ''; // Limpiar opciones existentes

        const optionCliente = document.createElement('option');
        optionCliente.value = factura.clienteCod;
        optionCliente.text = factura.clienteCod;
        selectCliente.appendChild(optionCliente);

        const selectSerie = document.getElementById('serieCod');
        selectSerie.innerHTML = ''; // Limpiar opciones existentes

        const optionSerie = document.createElement('option');
        optionSerie.value = factura.serieCod;
        optionSerie.text = factura.serieCod;
        selectSerie.appendChild(optionSerie);

        // Formatear la fecha para que sea "yyyy-MM-dd"
        const fechaEmision = new Date(factura.fechaEmision).toISOString().split('T')[0];

        document.getElementById('CodigoFactura').value = factura.facturaVentaNum;
        document.getElementById('Fecha').value = fechaEmision;

        // Bloquear los campos para que no sean editables
        selectEmpresa.disabled = true;
        selectCliente.disabled = true;
        selectSerie.disabled = true;
        document.getElementById('CodigoFactura').disabled = true;
        document.getElementById('Fecha').disabled = true;

        document.getElementById('btnGuardarFacturacion').style.display = 'none';
    }


    async function rellenarTablaConDatosExistentesFactura(empresaCod, serieCod, facturaVentaNum) {
        try {
            const response = await fetch('/obtenerFacturaLineas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum })

            });

            const result = await response.json();

            if (result.facturaLineas && Array.isArray(result.facturaLineas)) {
                result.facturaLineas.forEach((linea) => {
                    agregarFilaExistente(linea);
                    console.log("Linea", linea);
                });
              
            } else {
                console.log('No se encontraron datos de factura válidos en la respuesta.');
            }
        } catch (error) {

        }
    }

    async function obtenerDatosFactura(empresaCod, serieCod, facturaVentaNum) {
        try {
            const response = await fetch('/obtenerDatosFactura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum })

            });

            const result = await response.json();
            if (!result.err) {
                await rellenarYBloquearCamposFactura(result.factura);
                await mostrarTabla();
                await rellenarTablaConDatosExistentesFactura(empresaCod, serieCod, facturaVentaNum);
                mostrarCuerpoTabla()

            } else {
                await obtenerclientesCod();
                await obtenerEmpresasCod();
            }
        } catch (error) {

        }


    }

    async function eliminarFactura(empresaCod, serieCod, facturaVentaNum) {
        try {
            const response = await fetch('/eliminarFactura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ empresaCod, serieCod, facturaVentaNum })
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = "/facturas";
            } else {
                mostrarError('Error al eliminar factura:', response.statusText);
            }
        } catch (error) {
            mostrarError('Error al eliminar factura:', error.message);
        }
    }



    function abrirModalBorrar() {
       
       let empresaCod = document.getElementById('CodigoEmpresa').value;
       let serieCod = document.getElementById('serieCod').value;
       let facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

        // Mostrar el modal de confirmación
        const modalborrar = document.getElementById('modalborrar');
        modalborrar.style.display = "block";

        const confirmarBtn = document.getElementById("confirmarBtn");
        const cancelarBtn = document.getElementById("cancelarBtn");

        // Eliminar cualquier evento previo para evitar múltiples eventos registrados
        confirmarBtn.replaceWith(confirmarBtn.cloneNode(true));
        cancelarBtn.replaceWith(cancelarBtn.cloneNode(true));

        // Obtener los nuevos botones clonados
        const confirmarBtnNuevo = document.getElementById("confirmarBtn");
        const cancelarBtnNuevo = document.getElementById("cancelarBtn");

        // Configurar el evento click del botón de confirmar
        confirmarBtnNuevo.addEventListener('click', async function () {
            try {
                await eliminarFactura(empresaCod, serieCod, facturaVentaNum);
            } catch (error) {
                mostrarError('Error al eliminar la factura:', error.message);
            }
            modalborrar.style.display = "none";
        });

        // Configurar el evento click del botón de cancelar
        cancelarBtnNuevo.addEventListener('click', function () {
            modalborrar.style.display = "none";
        });
    }

    function verificarCamposTabla() {
        let camposVacios = false;
        let botonesHabilitados = false;
    
        // Obtener todas las celdas editables de la tabla
        const camposEditables = document.querySelectorAll('#DetalleFactura [contenteditable=true]');
        const selects = document.querySelectorAll('#DetalleFactura select');
        const botonesGuardar = document.querySelectorAll('.btnGuardarLinea');
    
        // Verificar si alguna celda editable está vacía
        camposEditables.forEach(campo => {
            if (campo.innerText.trim() === '') {
                camposVacios = true;
            }
        });
    
        // Verificar si algún select no tiene opción seleccionada
        selects.forEach(select => {
            if (select.selectedIndex === -1 || !select.options[select.selectedIndex].value) {
                camposVacios = true;
            }
        });
    
        // Verificar si todos los botones de guardar están deshabilitados
        botonesGuardar.forEach(boton => {
            if (!boton.disabled) {
                botonesHabilitados = true;
            }
        });
    
        return !camposVacios && !botonesHabilitados; // Devolver true si no hay campos vacíos ni botones habilitados, de lo contrario, false
    }
    
    async function verificarYMostrarParametrosDesdeURL() {
        // Obtener los parámetros de la URL
        const params = new URLSearchParams(window.location.search);

        // Obtener los valores de los parámetros
        const empresaCod = params.get('empresaCod');
        const serieCod = params.get('serieCod');
        const facturaVentaNum = params.get('facturaVentaNum');

        // Comprobar si los parámetros existen
        if (empresaCod && serieCod && facturaVentaNum) {
            await obtenerDatosFactura(empresaCod, serieCod, facturaVentaNum);
        } else {
            await obtenerclientesCod();
            await obtenerEmpresasCod();
        }
    }


    verificarYMostrarParametrosDesdeURL();
});

