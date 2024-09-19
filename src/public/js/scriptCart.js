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

document.addEventListener('DOMContentLoaded', () => {
    const contCompraButtons = document.querySelectorAll('.cont-compra');

    contCompraButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const modal = document.querySelector('.modal'); // Selecciona el modal

            try {
                await fetch(`/home`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Cierra el modal
                modal.style.display = 'none';

            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const continueButtons = document.querySelectorAll('.continuar-compra');
    continueButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
            
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const facturaButtons = document.querySelectorAll('.fin-compra');

    facturaButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
         
            try {
                await fetch(`/factura`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
