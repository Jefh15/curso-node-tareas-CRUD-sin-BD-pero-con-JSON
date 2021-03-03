// requiero mi paquete de node
require('colors');


const { 
    guardarDB,
    leerDB 
} = require('./helpers/guardarArchivo');
// importacion de mi archivo
const { 
    inquiererMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

// importo mi clase
const Tareas = require('./models/tareas');







// hago mi funcion main
const main = async() => {

    // hago mi opcion para validar
    let opt = '';
    // hago una instancia de tareas
    const tareas = new Tareas();

    const tareasDB = leerDB();
    // pregunto si tareasDB existe
    if (tareasDB){ //cargar tareas
        tareas.cargarTareasFromArray( tareasDB );        
    }

    
    // hago un do while porque se ejecuta 
    // 1 vez y evalua su condicion 
    // mientras opt sea diferente de 0 ejecute el menu
    do {
        
        // muestro mi menu y uso await porque es una promesa
        opt = await inquiererMenu();
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2':
                // Listado de las tareas
                console.log(tareas.listadoArr);
            break;
            case '3':
                // Listar completadas
                console.log(tareas.listarPendientesCompletadas(true) );
            break;
            case '4':
                // Listar las pendientes
                console.log(tareas.listarPendientesCompletadas(false) );
            break;
            case '5':
                // Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                // console.log(ids);
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                // preguntamos si el id es exactamente igual a 0
                if ( id !== '0' ){

                    const ok = await confirmar('¿Está seguro?');
                    // TODO: preguntar si esta seguro
                    // console.log({ ok }); // me muestra el valor de ok
                    if ( ok ){
                        // si es verdadero lo borramos
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        // llamo el metodo que me crea el archivo
        guardarDB( tareas.listadoArr ); 
        
        // para que me arroje el mensaje de presione enter para continuar
        await pausa();

    }while( opt !== '0')

}

// llamo mi metodo main para que se ejecute
main();