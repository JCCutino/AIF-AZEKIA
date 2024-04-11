async function anadirEmpresa(empresa) {
    try {
        const response = await fetch('/anadirEmpresa', {
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

async function obtenerEmpresasAPI(pagina = 1, resultadosTotales = 10) {
    try {
        const response = await fetch('/obtenerEmpresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pagina, resultadosTotales })
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

const empresa = {
    empresaCod: 'E004',
    CIF: '54635264R',
    razonSocial: 'AZEKIA',
    direccion: 'Avenida SEVILLA 123',
    CP: '41720',
    municipio: 'Los palacios'
};

async function main() {
    try {
        const empresa = {
            empresaCod: 'E004',
            CIF: '54635264R',
            razonSocial: 'AZEKIA',
            direccion: 'Avenida SEVILLA 123',
            CP: '41720',
            municipio: 'Los palacios'
        };

        await anadirEmpresa(empresa);
        await obtenerEmpresasAPI();
    } catch (error) {
        console.error('Error en la ejecución principal:', error);
    }
}

main(); 
