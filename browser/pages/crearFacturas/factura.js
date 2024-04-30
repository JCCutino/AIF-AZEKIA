document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
  });
  
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
  });
  
  document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Aquí puedes agregar la lógica para generar la factura con los datos del formulario
    
    // Después de generar la factura, puedes cerrar el modal
    document.getElementById('modal').style.display = 'none';
  });
  