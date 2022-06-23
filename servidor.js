const Contenedor = require("./Contenedor")
const ProductsConteiner = new Contenedor("./productos.txt")

const express = require("express")
const app = express()


const fs = require ("fs");
const productsGet = async (req , res ) => {  
/*    fs.readFile('./productos.txt','utf-8', (error, data) => {
       if (error) throw error;
       const products  = JSON.parse(data);
       res.json({
           products
       });
   }); */
   const products = await ProductsConteiner.getAll();
   res.json(products);
}

const random = async (req , res ) => {
/*     fs.readFile('./productos.txt','utf-8', (error, data) => {
        if (error) throw error;
        const products  = JSON.parse(data);
    }); */
    const products = await ProductsConteiner.getAll();
    const productRandom = Math.floor(Math.random()*products.length)
    res.json({
        product: products[productRandom]
    });
}

app.get("/productos", productsGet) 

app.get ("/productoRandom", random)
/* http://localhost:8080 */


const PORT = 8080


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productosRoutePath = '/api/productos';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: false}));

        // Directorio Publico
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.productosRoutePath, require('../routes/productos') );

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;