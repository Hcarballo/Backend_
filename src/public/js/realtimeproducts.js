const socket = io();

const btn_addproduct = document.getElementById("btn_addproduct");
const btn_deleteproduct = document.getElementById("btn_deleteproduct");

btn_addproduct.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;

    const product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
    };

    socket.emit("addProducts", product);

    title.value = "";
    description.value = "";
    price.value = "";
    thumbnail.value = "";
    code.value = "";
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