class LibGenerales {
    
verificarLongitud(variable, numero) {
if (typeof variable === 'number') {
    variable = variable.toString();
    }
    return variable.length <= numero;
}

 verificarCamposVacios(empresa) {
    for (const key in empresa) {
        if (!empresa[key].length) {
            return false; 
        }
    }
    return true; 
}
    

}

export const libGenerales = new LibGenerales();