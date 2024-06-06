class LibGenerales {
    
    validarLongitud(variable, numero) {

    if (typeof variable === 'number') {
        variable = variable.toString();
        }
        return variable.length <= numero;
    }

    validarCamposNoVacios(objeto) {
        for (const key in objeto) {
            if (objeto[key] === null || objeto[key] === undefined || objeto[key] === '') {
                console.log(objeto[key]);
                return false; 
            }
        }
        return true; 
    }

    redondeoEuros(n) {
        return (Math.round(Math.abs(n) * 100) / 100)*Math.sign(n);
    }
    
}


export const libGenerales = new LibGenerales();