
function mostrarModalAgregarEmpresa() {
    document.getElementById("modalAgregarEmpresa").style.display = "block";
  }
  
  // Función para cerrar el modal de agregar empresas
  function cerrarModalAgregarEmpresa() {
    document.getElementById("modalAgregarEmpresa").style.display = "none";
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

// async function guardarEmpresa() {
//     // Obtener los datos del formulario
//     const codEmpresa = document.getElementById("codEmpresa").value;
//     const cif = document.getElementById("cif").value;
//     const razonSocial = document.getElementById("razonSocial").value;
//     const direccion = document.getElementById("direccion").value;
//     const cp = document.getElementById("cp").value;
//     const municipio = document.getElementById("municipio").value;
  
//     // Crear un objeto empresa con los datos del formulario
//     const empresa = {
//       codEmpresa: codEmpresa,
//       cif: cif,
//       razonSocial: razonSocial,
//       direccion: direccion,
//       cp: cp,
//       municipio: municipio
//     };

//     try {
//         // Llamar a la función agregarEmpresa con el objeto empresa como argumento
//         await agregarEmpresa(empresa);
//         // Cerrar el modal después de agregar la empresa con éxito
//         cerrarModalAgregarEmpresa();
//         // Aquí podrías actualizar la tabla de empresas si lo deseas
//       } catch (error) {
//         console.error('Error al agregar empresa:', error.message);
//       }
//     }  

async function main() {
    try {
        const empresa = {
            empresaCod: 'E005',
            CIF: '64672383T',
            razonSocial: 'Rusvel',
            direccion: 'Avenida SEVILLA 456',
            CP: '41720',
            municipio: 'Los palacios'
        };
        const empresaCod = "E005";


       // await anadirEmpresa(empresa);
       await obtenerEmpresasAPI();
       await eliminarEmpresa(empresaCod);
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}


main(); 