
function mostrarModalAgregarEmpresa() {
    document.getElementById("modalAgregarEmpresa").style.display = "block";
  }
  
  // Función para cerrar el modal de agregar empresas
  function cerrarModalAgregarEmpresa() {
    document.getElementById("modalAgregarEmpresa").style.display = "none";
  }

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


async function actualizarEmpresa(empresa) {
    try {
        const response = await fetch('/actualizarEmpresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({empresa: empresa })
        });
        if (response.ok) {

            const data = await response.json();
            console.log('Empresa actualizada correctamente:', data);
        } else {
            console.error('Error al actualizar empresa:', response.statusText);
        }
    } catch (error) {
        console.error('Error al actualizar empresa:', error.message);
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
            console.log('Resultado de obtenerEmpresasAPI:', data);

            if (data.err) {
                // Si hay un error, muestra un mensaje de error
                console.error('Error al obtener empresas:', data.errmsg);
            } else {
                // Si no hay error, procesa los datos y muestra la tabla
                mostrarDatosEnTabla(data);
            }
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
            const tabla = document.getElementById('tablaEmpresas');

            if (data.empresas && Array.isArray(data.empresas)) {

                data.empresas.forEach(empresa => {
                    const fila = document.createElement('tr');
        
                    Object.values(empresa).forEach(valor => {
                        const celda = document.createElement('td');
                        celda.textContent = valor;
                        fila.appendChild(celda);
                    });

                    const celdaBoton = document.createElement('td');
                    const boton = document.createElement('button');
                    boton.textContent = 'Ver'; 
                    celdaBoton.appendChild(boton);
                    fila.appendChild(celdaBoton);
                
                    tabla.appendChild(fila);
                });
            } else {
                console.error('No se encontraron datos de empresas válidos en la respuesta.');
            }
}

async function guardarEmpresa() {
    // Obtener los datos del formulario
    const codEmpresa = document.getElementById("codEmpresa").value;
    const cif = document.getElementById("cif").value;
    const razonSocial = document.getElementById("razonSocial").value;
    const direccion = document.getElementById("direccion").value;
    const cp = document.getElementById("cp").value;
    const municipio = document.getElementById("municipio").value;
  
    // Crear un objeto empresa con los datos del formulario
    const empresa = {
      empresaCod: codEmpresa,
      CIF: cif,
      razonSocial: razonSocial,
      direccion: direccion,
      CP: cp,
      municipio: municipio
};

    try {
        // Llamar a la función agregarEmpresa con el objeto empresa como argumento
        console.log(empresa);
        await agregarEmpresa(empresa);
        // Cerrar el modal después de agregar la empresa con éxito
        cerrarModalAgregarEmpresa();
        // Aquí podrías actualizar la tabla de empresas si lo deseas
      } catch (error) {
        console.error('Error al agregar empresa:', error.message);
      }
}  

async function main() {
    try {
        await obtenerEmpresasAPI();
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}


main(); 