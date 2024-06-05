function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); 
    const anio = fechaObj.getFullYear().toString().slice(-2); 

    return `${dia}/${mes}/${anio}`;
}
async function mostrarDatosEnTabla(data) {
    // Obtener la tabla HTML
    const tabla = document.getElementById('tablaFacturas');

    // Obtener todas las filas de la tabla, excepto la primera (la cabecera)
    const filasDatos = Array.from(tabla.querySelectorAll('tr:not(:first-child)'));

    // Eliminar todas las filas de datos existentes
    filasDatos.forEach(fila => fila.remove());

    if (data.facturas && Array.isArray(data.facturas)) {
        data.facturas.forEach(factura => {
            const fila = document.createElement('tr');
            // Orden de las propiedades de la factura para mostrar en la tabla
            const propiedades = [
                'razonSocialEmpresa',
                'serieCod',
                'facturaVentaNum',
                'razonSocialCliente',
                'fechaEmision',
                'bloqueada'
            ];

            propiedades.forEach(clave => {
                const celda = document.createElement('td');
                const valor = factura[clave];
                // Verificar si la clave es una fecha para formatearla
                if (clave === 'fechaEmision') {
                    celda.textContent = formatearFecha(valor);
                } else {
                    celda.textContent = valor;
                }
                fila.appendChild(celda);
            });

            // Añadir el botón de "Ver"
            const celdaBoton = document.createElement('td');
            const boton = document.createElement('button');
            boton.textContent = 'Ver';
            celdaBoton.appendChild(boton);
            fila.appendChild(celdaBoton);
            tabla.appendChild(fila);

            // Configurar el evento click del botón
            boton.addEventListener('click', function () {
                redirigirCrearFactura(factura.empresaCod, factura.serieCod, factura.facturaVentaNum);
            });
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


function redirigirCrearFactura(empresaCod, serieCod, facturaVentaNum) {
    let url = `/crearFactura?empresaCod=${empresaCod}&serieCod=${serieCod}&facturaVentaNum=${facturaVentaNum}`;
    window.location.href = url;
  }

async function main() {
    try {
       await obtenerFacturasAPI();
    } catch (error) {
        mostrarError('Error en la ejecución principal:', error);
    }
}
main(); 