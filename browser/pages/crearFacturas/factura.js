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
                mostrarError('Error al obtener clientesCod:'+ data.errmsg)

            } else {
                agregarclientesCodSelect(data.datosCliente);
            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}

function agregarclientesCodSelect(datoscliente) {
    const selectAgregarclienteCod = document.getElementById("CodigoCliente");

    selectAgregarclienteCod.innerHTML = "";

    datoscliente.forEach( (cliente) => {
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
                mostrarError('Error al obtener EmpresaCod:'+ data.errmsg)

            } else {
                agregarEmpresasCodSelect(data.datosEmpresa);
            }
        } else {
            mostrarError('Error al llamar a la API:'+ response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}


function agregarEmpresasCodSelect(datosEmpresa) {
    const selectAgregarEmpresaCod = document.getElementById("CodigoEmpresa");

    selectAgregarEmpresaCod.innerHTML = "";

    datosEmpresa.forEach( (Empresa) => {
        let optionAgregar = document.createElement("option");
        optionAgregar.text = Empresa.razonSocial;
        optionAgregar.value = Empresa.empresaCod;
        selectAgregarEmpresaCod.add(optionAgregar);
    });
}

async function obtenerSeries() {
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
                cargarSeriesSelect(data.series);
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}

function cargarSeriesSelect(series) {
    const selectSeries = document.getElementById("serieCod");
    selectSeries.innerHTML = "";
    series.forEach((serie) => {
        let option = document.createElement("option");
        option.text = serie.serieCod;
        option.value = serie.serieCod;
        selectSeries.add(option);
    });
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
            }
        } else {
            mostrarError('Error al llamar a la API: ' + response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API: ' + error.message);
    }
}


function cargarTiposIVASelect(tiposIVA) {
    const selectIVA = document.getElementById("tipoIVA");

    selectIVA.innerHTML = "";

    tiposIVA.forEach((tipo) => {
        let option = document.createElement("option");
        option.text = tipo.porcentaje;
        option.value = tipo.tipoImpuesto;
        selectIVA.add(option);
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
    const selectIRPF = document.getElementById("tipoIRPF");

    selectIRPF.innerHTML = "";

    tiposIRPF.forEach((tipo) => {
        let option = document.createElement("option");
        option.text = tipo.porcentaje;
        option.value = tipo.tipoImpuesto;
        selectIRPF.add(option);
    });
}

document.addEventListener("DOMContentLoaded", function() {
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

    

    // Función para añadir una nueva fila a la tabla
    async function agregarFilaEditable() {
        if (!filaGuardada) {
            alert("Debe guardar la fila actual antes de añadir una nueva.");
            return;
        }

        filaGuardada = false; // Estado de fila no guardada
        const fila = `
        <tr>
            <td><select id="serieCod"></select></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><select id="tipoIVA"></select></td>
            <td><select id="tipoIRPF"></select></td>
            <td class="text-right">
                <button type="button" class="btn btn-success btnGuardarLinea">Guardar</button>
            </td>
        </tr>
        `;
        document.getElementById("DetalleFactura").insertAdjacentHTML("beforeend", fila);
        await obtenerSeries();
        await obtenerTiposIRPF();
        await obtenerTiposIVA();
    }


    // Función para guardar los datos de una fila en la base de datos
    async function guardarFila() {
        const fila = this.parentNode.parentNode;
        const inputs = fila.querySelectorAll("td[contenteditable='true']");
        const detalle = {
            codigoProyecto: inputs[0].textContent.trim(),
            descripcion: inputs[1].textContent.trim(),
            cantidad: inputs[2].textContent.trim(),
            precio: inputs[3].textContent.trim(),
            importeBruto: inputs[4].textContent.trim(),
            descuento: inputs[5].textContent.trim(),
            iva: fila.querySelector("#tipoIVA").value,
            irpf: fila.querySelector("#tipoIRPF").value
        };

        try {
            const response = await fetch('/guardarLineaFactura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detalle)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.err) {
                    mostrarError('Error al guardar la línea de factura: ' + data.errmsg);
                    filaGuardada = false;
                } else {
                    filaGuardada = true; // Marcar la fila como guardada
                    alert('Línea guardada exitosamente');
                }
            } else {
                mostrarError('Error al llamar a la API: ' + response.statusText);
                filaGuardada = false;
            }
        } catch (error) {
            mostrarError('Error al llamar a la API: ' + error.message);
            filaGuardada = false;
        }
    }

    // Agregar evento al botón "Guardar Datos de Facturación"
    document.getElementById("btnGuardarFacturacion").addEventListener("click", function() {
        // Aquí puedes agregar la lógica para guardar los datos de facturación en la base de datos
        mostrarTabla(); // Mostrar la tabla y el botón de añadir línea después de guardar los datos
    });

    // Agregar evento al botón "Añadir Fila"
    document.getElementById("btnAñadirFila").addEventListener("click", function() {
        if (filaGuardada) {
            mostrarCuerpoTabla();
            agregarFilaEditable();
        } else {
            alert("Debe guardar la fila actual antes de añadir una nueva.");
        }
    });

    
    // Agregar evento delegado al elemento <tbody> para manejar clics en el botón "Guardar" de cada fila
    document.getElementById("DetalleFactura").addEventListener("click", function(event) {
        if (event.target.classList.contains("btnGuardarLinea")) {
            guardarFila.call(event.target); // Llamar a la función guardarFila con el contexto correcto
        }
    });
    
    obtenerTiposIVA();
    obtenerTiposIRPF();
    obtenerSeries();
    obtenerclientesCod();
    obtenerEmpresasCod();
});
