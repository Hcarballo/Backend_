document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.del-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const pid = event.target.getAttribute('data-pid');

            try {
                const response = await fetch(`/api/cart/product/${pid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    event.target.closest('tr').remove();                    
                } else {
                    console.error('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.cont-compra').addEventListener('click', function() {
        // Selecciona todos los elementos con la clase 'modal' y los cierra
        var modals = document.querySelectorAll('.modal');
        if (modals.length > 0) {
            modals.forEach(function(modal) {
                modal.style.display = 'none';
            });
        } else {
            console.error('No se encontraron modales abiertos');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const finalizarCompraBtn = document.querySelector('.fin-compra');

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', function() {
            window.location.href = '/factura';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const enviarCorreoBtn = document.querySelector('.env-correo');

    if (enviarCorreoBtn) {
        enviarCorreoBtn.addEventListener('click', () => {
            window.location.href = '/api/cart/cart/enviarfactura';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const enviarCorreoBtn = document.querySelector('.volver');

    if (enviarCorreoBtn) {
        enviarCorreoBtn.addEventListener('click', () => {
            window.location.href = '/home';
        });
    }
});

