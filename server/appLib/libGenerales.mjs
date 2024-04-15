class LibGenerales {
    
verificarLongitud(variable, numero) {
if (typeof variable === 'number') {
    variable = variable.toString();
    }
    return variable.length <= numero;
}

    
}

export const libGenerales = new LibGenerales();