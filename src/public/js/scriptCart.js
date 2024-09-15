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
                    window.location.href = '/home';
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
    const continueButtons = document.querySelectorAll('.continuar-compra');
    continueButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
            setTimeout(() => {
                window.location.href = '/home';
            }, 300);
        });
    });
});
