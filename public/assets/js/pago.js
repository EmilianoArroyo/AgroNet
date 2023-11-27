document.addEventListener('DOMContentLoaded', function () {
    var pagarBoton = document.getElementById('pagar');

    pagarBoton.addEventListener('click', function () {
        showLoader();
        setTimeout(function () {
            Swal.fire({
                title: '¡Pago Exitoso!',
                text: 'Gracias por tu pago.',
                icon: 'success',
                confirmButtonText: 'Regresar al Inicio'
            }).then(function () {
                // Redirige al inicio
                window.location.href = 'http://127.0.0.1:3000/views/index/index.html';
            });
        }, 5000); 
    });

    function showLoader() {
        pagarBoton.innerHTML = 'Procesando...';
        pagarBoton.disabled = true;
    }
});
