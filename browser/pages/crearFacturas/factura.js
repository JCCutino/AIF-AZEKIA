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
    const selectProyecto = document.getElementById("proyectoCod");

    selectProyecto.innerHTML = "";

    ProyectosCod.forEach((proyecto) => {
        let option = document.createElement("option");
        option.text = proyecto.nombre;
        option.value = proyecto.proyectoCod;
        selectProyecto.add(option);
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

        let empresaCod =  document.getElementById('CodigoEmpresa').value;
        let serieCod = document.getElementById('serieCod').value;
        let facturaVentaNum = document.getElementById('CodigoFactura').value.trim();

        const datos = { empresaCod, serieCod, facturaVentaNum };
        
        try {
            const response = await fetch('/agregarFacturaLinea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
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
        const fila = `
        <tr>
            <td><select id="proyectoCod"></select></td>
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
        await obtenerProyectosCod();
        await obtenerTiposIRPF();
        await obtenerTiposIVA();


    }


    // Función para guardar los datos de una fila en la base de datos
    async function guardarFila() {
        const fila = this.parentNode.parentNode;
        const inputs = fila.querySelectorAll("td[contenteditable='true']");
        const detalle = {
            proyectoCod: fila.querySelector("#proyectoCod").value,
            descripcion: inputs[1].textContent.trim(),
            cantidad: inputs[2].textContent.trim(),
            precio: inputs[3].textContent.trim(),
            importeBruto: inputs[4].textContent.trim(),
            descuento: inputs[5].textContent.trim(),
            iva: fila.querySelector("#tipoIVA").value,
            irpf: fila.querySelector("#tipoIRPF").value
        };

        try {
            const response = await fetch('/agregarFactura', {
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

    document.querySelectorAll('btnGuardarLinea').forEach(button => {
        button.addEventListener('click', guardarFila);
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

    async function verificarCamposFormulario() {
        // Obtener los campos del formulario
        const codigoFactura = document.getElementById('CodigoFactura').value.trim();
        const codigoEmpresa = document.getElementById('CodigoEmpresa').value;
        const fecha = document.getElementById('Fecha').value;
        const codigoCliente = document.getElementById('CodigoCliente').value;
        const serieCod = document.getElementById('serieCod').value;
        
        // Validar que los campos no sean nulos o estén vacíos
        if (!codigoFactura) {
            alert('Por favor, ingrese el número de factura.');
            return false;
        }
        
        if (codigoEmpresa === '0') {
            alert('Por favor, seleccione una empresa.');
            return false;
        }
        
        if (!fecha) {
            alert('Por favor, ingrese la fecha de emisión.');
            return false;
        }
        
        if (codigoCliente === '0') {
            alert('Por favor, seleccione un cliente.');
            return false;
        }
        
        if (serieCod === '0') {
            alert('Por favor, seleccione una serie de facturación.');
            return false;
        }
        
        // Si todos los campos son válidos, retorna true
        return true;

    }
    
    document.getElementById('btnGuardarFacturacion').addEventListener('click', async function() {
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
                    alert(`Error: ${result.errmsg}`);
                } else {
                    alert('Factura guardada exitosamente.');
                    mostrarTabla();
                }
            } catch (error) {
                console.error('Error al agregar factura:', error);
                alert('Hubo un error al guardar la factura. Inténtelo de nuevo.');
            }
            
        }
    });
    
    obtenerTiposIVA();
    obtenerTiposIRPF();
    obtenerSeries();
    obtenerclientesCod();
    obtenerEmpresasCod();
    obtenerProyectosCod();
});
