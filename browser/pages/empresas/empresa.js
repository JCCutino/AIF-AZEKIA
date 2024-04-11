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
            const respuesta = await response.json();
            console.log('Empresa añadida correctamente:', respuesta);
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


        await obtenerEmpresasAPI();
        await agregarEmpresa(empresa);
        //await eliminarEmpresa(empresaCod);
        await obtenerEmpresasAPI();
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}

main(); 
