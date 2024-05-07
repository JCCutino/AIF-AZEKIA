document.addEventListener("DOMContentLoaded", function() {
    const detalleFactura = document.getElementById("DetalleFactura");

    // Función para agregar una nueva fila a la tabla
    function agregarFila() {
        const fila = `
            <tr>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true" class="text-right"></td>
                <td contenteditable="true" class="text-right"></td>
                <td contenteditable="true" class="text-right"></td>
                <td class="text-right">
                    <button type="button" class="btn btn-success btnAgregar">Añadir</button>
                </td>
            </tr>
        `;
        detalleFactura.insertAdjacentHTML("beforeend", fila);
    }
    // Función para guardar los detalles de la factura
    function guardarFactura() {
        const filas = detalleFactura.querySelectorAll("tr");
        const detalles = [];

        filas.forEach(fila => {
            const inputs = fila.querySelectorAll("td[contenteditable='true']");
            const detalle = {
                codigoArticulo: inputs[0].innerText.trim(),
                descripcion: inputs[1].innerText.trim(),
                cantidad: inputs[2].innerText.trim(),
                precioUnitario: inputs[3].innerText.trim(),
                total: inputs[4].innerText.trim()
            };
            detalles.push(detalle);
        });

        console.log(detalles);
        // Aquí puedes enviar los detalles de la factura al servidor para guardarlos
    }

    // Agregar evento al botón Terminar Factura
    document.getElementById("btnTerminarFactura").addEventListener("click", guardarFactura);

    // Agregar evento a los botones Añadir
    detalleFactura.addEventListener("click", function(event) {
        if (event.target.classList.contains("btnAgregar")) {
            agregarFila();
        }
    });
});