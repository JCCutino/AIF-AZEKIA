
function mostrarModalAgregarEmpresa() {
    document.getElementById("modalAgregarEmpresa").style.display = "block";
  }
  
  // Función para cerrar el modal de agregar empresas
  function cerrarModal() {
    document.getElementById("modalAgregarEmpresa").style.display = "none";
    document.getElementById("modalEditarEmpresa").style.display = "none";
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

async function abrirModalEditable(empresaId) {
    try {
        // Obtener todas las empresas
        const response = await fetch('/obtenerEmpresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Buscar la empresa con el ID proporcionado
            const empresa = data.datosEmpresa.empresas.find(emp => emp.empresaCod === empresaId);
            
            if (empresa) {
                // Llenar los campos del formulario del modal con los detalles de la empresa
                document.getElementById("codEmpresa").value = empresa.empresaCod;
                document.getElementById("cif").value = empresa.CIF;
                document.getElementById("razonSocial").value = empresa.razonSocial;
                document.getElementById("direccion").value = empresa.direccion;
                document.getElementById("cp").value = empresa.CP;
                document.getElementById("municipio").value = empresa.municipio;

                // Mostrar el modal de edición
                const modalEditarEmpresa = document.getElementById('modalEditarEmpresa');
                modalEditarEmpresa.style.display = 'block';
            } else {
                console.error('No se encontró la empresa con el ID proporcionado:', empresaId);
            }
        } else {
            console.error('Error al llamar a la API:', response.statusText);
        }
    } catch (error) {
        console.error('Error al abrir el modal editable:', error.message);
    }
}

// Luego, definir la función mostrarDatosEnTabla
async function mostrarDatosEnTabla(data) {
    // Obtener la tabla HTML
    const tabla = document.getElementById('tablaEmpresas');

    // Obtener todas las filas de la tabla, excepto la primera (la cabecera)
    const filasDatos = Array.from(tabla.querySelectorAll('tr:not(:first-child)'));

    // Eliminar todas las filas de datos existentes
    filasDatos.forEach(fila => fila.remove());

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

            // Agregar el evento click al botón "Ver"
            boton.addEventListener('click', function() {
                // Obtén el identificador único de la empresa correspondiente a esta fila
                const empresaId = empresa.empresaCod;

                // Abre el modal editable y carga los valores de la fila seleccionada para su edición
                abrirModalEditable(empresaId);
            });
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
        await obtenerEmpresasAPI();
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