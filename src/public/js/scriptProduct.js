//-----------Filtro de Producto-------------------

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.querySelector('.product-grid');

    if (productGrid) {
        searchInput.addEventListener('keyup', function () {
            const filter = this.value.toUpperCase();
            const products = productGrid.getElementsByClassName('product-item');

            for (let i = 0; i < products.length; i++) {
                const productFields = products[i].getElementsByTagName('p');
                let matchFound = false;

                for (let j = 0; j < productFields.length; j++) {
                    const fieldContent = productFields[j].textContent.toUpperCase();
                    if (fieldContent.includes(filter)) {
                        matchFound = true;
                        break;
                    }
                }
                products[i].style.display = matchFound ? '' : 'none';
            }
        });
    }
});

//------------Modal de detalle----------

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

var images = document.getElementsByClassName("product-image");

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function () {
        var productId = this.getAttribute("data-id");
        var iframe =  document.getElementById("modalIframe");  
        iframe.src = `/detailProduct/${productId}`;
        modal.style.display = "block";    

        // Crear el carrito
              
      
    }
}

// for (var i = 0; i < images.length; i++) {
//     images[i].onclick = function () {
//         var productId = this.getAttribute("data-id");
//         var iframe = document.getElementById("modalIframe");
//         iframe.src = 'api/cart/create';
//         iframe.src = `/detailProduct/${productId}`;        
//         modal.style.display = "block";
//     }
// }

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function incrementar(precio, stock) {
    const cantidadInput = document.getElementById('quantity');
    const subtotalInput = document.getElementById('subtotal');
    const newValue = parseInt(cantidadInput.value) + 1;

    if (newValue <= stock) {
        cantidadInput.value = newValue;
        subtotalInput.value = precio * newValue;
    }
}

function decrementar(precio, stock) {
    const cantidadInput = document.getElementById('quantity');
    const subtotalInput = document.getElementById('subtotal');
    const newValue = parseInt(cantidadInput.value) - 1;

    if (newValue >= 0) {
        cantidadInput.value = newValue;
        subtotalInput.value = precio * newValue;
    }
}


