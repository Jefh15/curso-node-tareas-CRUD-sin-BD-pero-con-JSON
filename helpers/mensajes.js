const { resolve } = require('path');

// uso el paquete de colores
require('colors');




// hago mi metodo y lo tranformo en una promesa
const mostrarMenu = () => {
    
    // creo mi promesa, las promesas se disparan con resolve, y reject
    return new Promise( resolve =>{

        // TODO EL CUERPO DE MI PROMESA

        // limpio mi pantalla
        console.clear();

        // mis mensajes
        console.log('=============================='.green);
        console.log('   Seleccione una opción   '.green);
        console.log('==============================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listas tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);


        
        // recibir una informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // creo esto para mostrar la informacion al usuario
        readline.question('Seleccione una opción: '.green, (opt) => {
            
            // muestra la opcion seleccionada
            // console.log( opt );
            
            // cerramos la pregunta
            readline.close();

            // aqui es donde resuelvo la opcion seleccionada
            resolve(opt);
        })


    });

    

}

// Hago la pausa de mi aplicacion
const pausa = () => {
    
    // CUERPO DE LA PROMESA

    // creo mi promesa, las promesas se disparan con resolve, y reject
    return new Promise( resolve =>{
        
        // recibir una informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // creo esto para mostrar la informacion al usuario
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar...\n`, (opt) => {
            // cerramos la pregunta
            readline.close();
            // aqui hago el llamado a mi resolve
            resolve();
        })
    
    })
}






// exporto mi menu y pausa para usarlo en otras partes
module.exports = {
    mostrarMenu,
    pausa
}