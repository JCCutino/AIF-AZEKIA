// document.getElementById('openModalBtn').addEventListener('click', function() {
//     document.getElementById('modal').style.display = 'block';
//   });
  
//   document.querySelector('.close').addEventListener('click', function() {
//     document.getElementById('modal').style.display = 'none';
//   });
 
//   document.getElementById('invoiceForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     // Aquí puedes agregar la lógica para generar la factura con los datos del formulario
    
//     // Después de generar la factura, puedes cerrar el modal
//     document.getElementById('modal').style.display = 'none';
//   });
  
  async function obtenerclientesCod() {
    try {
        const response = await fetch('/obtenerClientesDatosBasicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.err) {
                mostrarError('Error al obtener clientesCod:'+ data.errmsg)

            } else {
                agregarclientesCodSelect(data.datosCliente)
            }
        } else {
            
            mostrarError('Error al llamar a la API:'+ response.statusText);

        }
    } catch (error) {
        mostrarError('Error al llamar a la API:'+ error.message);
    }
}

function agregarclientesCodSelect(datoscliente) {
  const selectAgregarclienteCod = document.getElementById("CodigoCliente");

  selectAgregarclienteCod.innerHTML = "";

  datoscliente.forEach(  (cliente) => {
      let optionAgregar = document.createElement("option");
      optionAgregar.text = cliente.razonSocial;
      optionAgregar.value = cliente.clienteCod;
      selectAgregarclienteCod.add(optionAgregar);

  });
}

obtenerclientesCod();