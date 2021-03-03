// requiero el file system
const fs = require('fs');

// creo la ruta de donde se va a crear mi archivo
const archivo = './db/data.json';



const guardarDB = ( data ) => {

    // JSON.stringify(()) me convierte mi objeto a su version JSON valida como un string
    fs.writeFileSync( archivo, JSON.stringify(data) );

}

const leerDB = () => {

    // verifico si el archivo existe
    if( !fs.existsSync(archivo) ){
        // en caso de que no exista
        return null;
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf8' } );
    // parseo la data
    const data = JSON.parse( info );
    // console.log(data);

    // tengo un arreglo de tareas para retornar
    return data;



}





module.exports = {
    guardarDB, 
    leerDB
}