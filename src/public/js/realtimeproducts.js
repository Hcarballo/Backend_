const socket = io();

const btn_addproduct = document.getElementById("btn_addproduct");
const btn_deleteproduct = document.getElementById("btn_deleteproduct");

btn_addproduct.addEventListener("click", () => {
    const codigo= document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const uva = document.getElementById("uva").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;
    const bodega = document.getElementById("bodega").value;
    const stock = document.getElementById("stock").value;

    const product = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        uva: uva,
        categoria: categoria,
        bodega: bodega,
        stock: stock,
    };

    socket.emit("addProducts", product);

    nombre.value = "";
    codigo.value = "";
    precio.value = "";
    imagen.value = "";
    bodega.value = "";
    uva.value = "";
    categoria.value = "";
    stock.value = "";   
   
});

btn_deleteproduct.addEventListener("click", () => {
    const id = document.getElementById("id").value;
    socket.emit("deleteProduct", id);
    id.value = "";
});

socket.on("updateProduct", (data) => {  
    alert(data); 
    window.location.reload();    
})