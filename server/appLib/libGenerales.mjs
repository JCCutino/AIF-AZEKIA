class LibGenerales {
    
verificarLongitud(variable, numero) {

if (typeof variable === 'number') {
    variable = variable.toString();
    }
    return variable.length <= numero;
}

 verificarCamposVacios(objeto) {
    for (const key in objeto) {
        if (objeto[key] === null || objeto[key] === undefined || objeto[key] === '') {
            console.log(objeto[key]);
            return false; 
        }
    }
    return true; 
}

    

}

export const libGenerales = new LibGenerales();