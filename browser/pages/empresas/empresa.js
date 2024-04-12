async function agregarEmpresa(empresa) {
    try {
        const response = await fetch('/agregarEmpresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empresa: empresa })
        });
        if (response.ok) {

            const data = await response.json();
            console.log('Empresa añadida correctamente:', data);
        } else {
            console.error('Error al añadir empresa:', response.statusText);
        }
    } catch (error) {
        console.error('Error al añadir empresa:', error.message);
    }
}

async function obtenerEmpresasAPI() {
    try {
        const response = await fetch('/obtenerEmpresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            mostrarDatosEnTabla(data);
            console.log('Resultado de obtenerEmpresasAPI:', data);
        } else {
            console.error('Error al llamar a la API:', response.statusText);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error.message);
    }
}

async function eliminarEmpresa(empresaCod) {
    try {
        const response = await fetch('/eliminarEmpresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empresaCod})
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Empresa eliminada correctamente:', data);
        } else {
            console.error('Error al eliminar empresa:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar empresa:', error.message);
    }
}



async function mostrarDatosEnTabla(data) {
            // Obtener la tabla HTML
            const tabla = document.getElementById('tablaEmpresas');
        
         

            // Verificar si hay datos de empresas
            if (data.datosEmpresa && data.datosEmpresa.empresas && Array.isArray(data.datosEmpresa.empresas)) {

                // Crear filas para cada empresa en los datos
                data.datosEmpresa.empresas.forEach(empresa => {
                    const fila = document.createElement('tr');
        
                    // Crear celdas para cada propiedad de la empresa
                    Object.values(empresa).forEach(valor => {
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

async function main() {
    try {
        const empresa = {
            empresaCod: 'E503',
            CIF: '64672383S	',
            razonSocial: 'Rusvel',
            direccion: 'Avenida SEVILLA 456',
            CP: '41720',
            municipio: 'Los palacios'
        };
        const empresaCod = "E005";


       await agregarEmpresa(empresa);
       await obtenerEmpresasAPI();
       // await eliminarEmpresa(empresaCod);
       // await obtenerEmpresasAPI();
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}


main(); 