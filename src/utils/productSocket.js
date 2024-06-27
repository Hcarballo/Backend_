import productController from '../src/Controllers/products.controller.js';

export const productsSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("nuevo cliente conectado");

        socket.on("addProducts", (product) => {
            const codigo = product.codigo;
            const nombre = product.nombre;
            const imagen = product.imagen;
            const uva = product.uva;
            const bodega = product.bodega;
            const precio = product.precio;
            const categoria = product.categoria;
            const stock = product.stock;

            uploads.single(product.thumbnail)

            try {
                const productmanager = new productController();
                const result = productmanager.addProducts(
                    codigo,
                    nombre,
                    imagen,
                    uva,
                    bodega,
                    precio,
                    categoria,
                    stock,

                );
                let msj = 'Producto Agregado';
                io.emit("updateProduct", msj);

            } catch (error) {
                console.log(error);
            }
        });

        socket.on("deleteProduct", (id) => {
            try {
                const productmanager = new productController();
                const result = productmanager.deleteProduct(id);
                let msj = "";
                if (result) {
                    msj = "Producto eliminado";
                } else {
                    msj = "Producto no encontrado";
                }
                io.emit("updateProduct", msj);
            } catch (error) {
                console.log(error);
            }
        });

    });

}
