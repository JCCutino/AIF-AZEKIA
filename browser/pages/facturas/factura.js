function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); 
    const anio = fechaObj.getFullYear().toString().slice(-2); 

    return `${dia}/${mes}/${anio}`;
}

async function mostrarDatosEnTabla(data) {

    const tabla = document.getElementById('tablaFacturas');

    const filasDatos = Array.from(tabla.querySelectorAll('tr:not(:first-child)'));

    filasDatos.forEach(fila => fila.remove());

            if (data.facturas && Array.isArray(data.facturas)) {

                data.facturas.forEach(factura => {
                    const fila = document.createElement('tr');
        
                    Object.entries(factura).forEach(([clave, valor]) => {
                        const celda = document.createElement('td');
                        if (clave === 'fechaEmision') {
                            celda.textContent = formatearFecha(valor);
                        } else {
                            celda.textContent = valor;
                        }
                        fila.appendChild(celda);
                    });

            const celdaBoton = document.createElement('td');
            const boton = document.createElement('button');
            boton.textContent = 'Ver';
            celdaBoton.appendChild(boton);
            fila.appendChild(celdaBoton);
            boton.addEventListener('click', function() {
                const empresaId = factura.empresaCod;
                abrirModalborrar(empresaId);
            });
            
            const confirmarBtn = document.getElementById("confirmarBtn");
            const cancelarBtn = document.getElementById("cancelarBtn");
            
            boton.addEventListener('click', function(event) {
                event.stopPropagation(); 
                confirmarBtn.addEventListener('click', async function() {
                    const empresaCod = factura.empresaCod;
                    try {
                        await eliminarFactura(empresaCod);
                    } catch (error) {
                        mostrarError('Error al eliminar la factura:', error.message);
                    }
                    modalborrar.style.display = "none";
                });

                cancelarBtn.addEventListener('click', function() {
                    console.log('Se canceló la eliminación de la factura');
                    modalborrar.style.display = "none";
                });
            });
            
            cancelarBtn.addEventListener('click', function() {
                console.log('Se canceló la eliminación de la factura');
                modalborrar.style.display = "none";
            });

            tabla.appendChild(fila);
        });
    } else {
        mostrarError('No se encontraron datos de facturas válidos en la respuesta.');
    }
}


async function obtenerFacturasAPI(pagina = 1, resultadosTotales = 10) {
    try {
        const response = await fetch('/obtenerFacturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pagina, resultadosTotales })
        });

        if (response.ok) {
            const data = await response.json();
            mostrarDatosEnTabla(data);
            console.log('Resultado de obtenerFacturasAPI:', data);
        } else {
            mostrarError('Error al llamar a la API:', response.statusText);
        }
    } catch (error) {
        mostrarError('Error al llamar a la API:', error.message);
    }
}

async function eliminarFactura(empresaCod) {
    try {
        const response = await fetch('/eliminarFactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empresaCod})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Factura eliminada correctamente:', data);
            await obtenerFacturasAPI();
        } else {
            mostrarError('Error al eliminar factura:', response.statusText);
        }
    } catch (error) {
        mostrarError('Error al eliminar factura:', error.message);
    }
}

async function abrirModalborrar(empresaId) {
    const modalborrarFactura = document.getElementById('modalborrar');
    modalborrarFactura.style.display = 'block';
}

async function main() {
    try {
       await obtenerFacturasAPI();
    } catch (error) {
        mostrarError('Error en la ejecución principal:', error);
    }
}
main(); 