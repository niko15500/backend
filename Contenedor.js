/* class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
 
    
    getFullName() { 
        return `${this.nombre} ${this.apellido}`; 
    }

    
    addMascota(nombre) { 
        this.mascotas.push(nombre); 
    }

    
    countMascotas() { 
        return this.mascotas.length; 
    }

    
    addBook(nombre, autor) { 
        this.libros.push({nombre, autor}); 
    }

    
    getBookNames() { 
        return this.libros.map(libro => libro.nombre); 
    }

}


let usuario = new Usuario("Nicolas", "Luciuk", [], []);

 
usuario.addMascota("Perro"); 
usuario.addMascota("gato"); 


usuario.addBook("informatica", "turing"); 
usuario.addBook("Fundacion", "Isaac Asimov"); 


console.log("El usuario es: ",usuario); 
console.log("Cantidad de mascotas: ", usuario.countMascotas());
console.log("Nombre de libros: ", usuario.getBookNames()); */


const {promises : fs} = require('fs');

class Contenedor {
    constructor (ruta){
        this.ruta = ruta
    }


    async save(obj){
        const objs = await this.getAll();
        let newId;

        if (objs.length == 0){
            newId = 1;
        }else {
            newId = objs[objs.length - 1].id + 1;
        }

        const newObj ={...obj , id: newId}
        objs.push (newObj);
        try {
           await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
            return newId
        } catch (error) {
            throw new Error (`Erros al guardar:${error}`);
        }
    }



    async getById(id) {
        const objs = await this.getAll();
        const obj = objs.find(x => x.id == id);
        return obj;
    }

    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta,'utf-8');
            return JSON.parse(objs);
            
        } catch (error) {
            return []
        }
    } 
    
    async deleteById(id){
        let collection = []
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( contenido => {
            let col = JSON.parse(contenido)
            for (const ob of col) {
                if(ob.id != id) {
                    collection.push(ob)
                }
            }
        })
        .catch( err => console.log(err));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Objeto eliminado!');
        console.log('******************');
    }
    
    async deleteAll(){
        await fs.writeFile(`./${this.ruta}`, '');
        console.log('Todos los objetos fueron eliminados');
    }

}

module.exports = Contenedor

