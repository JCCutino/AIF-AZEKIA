async function mostrarDatosEnTabla(data) {
    // Obtener la tabla HTML
    const tabla = document.getElementById('tablaFacturas');

    // Verificar si hay datos de empresas
    if (data.datosFactura && data.datosFactura.facturas && Array.isArray(data.datosFactura.facturas)) {

        // Crear filas para cada empresa en los datos
        data.datosFactura.facturas.forEach(factura => {
            const fila = document.createElement('tr');

            // Crear celdas para cada propiedad de la empresa
            Object.values(factura).forEach(valor => {
                const celda = document.createElement('td');
                celda.textContent = valor;
                fila.appendChild(celda);
            });

            // Agregar el botón a la última celda de la fila
            const celdaBoton = document.createElement('td');
            const boton = document.createElement('button');
            boton.textContent = 'Ver'; 
            celdaBoton.appendChild(boton);
            fila.appendChild(celdaBoton);
        
            // Agregar la fila a la tabla
            tabla.appendChild(fila);
        });
    } else {
        console.error('No se encontraron datos de empresas válidos en la respuesta.');
    }
}

async function obtenerFacturassAPI(pagina = 1, resultadosTotales = 10) {
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
            console.error('Error al llamar a la API:', response.statusText);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error.message);
    }
}

async function main() {
    try {
       await obtenerFacturasAPI();
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}
main(); 