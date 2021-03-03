/**
*   REQUIERO MI ARCHIVO tarea de mi propio path 
*/
const Tarea = require('./tarea');

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tareas {

    /**
     * MI LISTA 
     */
    _listado = {
        'abc': 123
    };

    /**
     * GETTER DE MI  ARREGLO 
     */
    get listadoArr() {

        // creo mi lista en un array
        const listado = [];
        // recorro las llaves que se encuentren en un objeto
        Object.keys(this._listado).forEach( key => {
            // le seteo la lista de llaves a mi tarea
            const tarea = this._listado[key];
            // agrego a mi array la tarea
            listado.push( tarea );
        });

        // retorno mi arreglo
        return listado;
    }

    /**
     * CONSTRUCTOR 
     */
    constructor() {
        this._listado = {};
    }



    /**
     * METODOS 
     */
    borrarTarea( id = '' ) {

        // si el id existe en la lista
        if ( this._listado[id] ) {
            // borre el id del listado
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {
        
        // recorro las tareas 
        tareas.forEach( tarea => {
            // tomo la llave de la tarea y lleno mi tarea
            this._listado[tarea.id] = tarea;
        });
    }


    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        
        console.log();
        // recorro el arreglo de tareas
        this.listadoArr.forEach( (tarea, i) => {

            // le asigno el i como un numero y le sumo 1 para que con cada vuelta se vaya aumentando
            const idx = `${i + 1}`.green;
            // desestructuro las tareas para mostrar esas opciones
            const { desc, completadoEn } = tarea;
            // hago una variable para mostrar, 
            // si esta completado se pone en verde, 
            // pendiente en rojo 
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            // muestro el id. desc :: estado
            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });         
    }


    listarPendientesCompletadas( completadas = true ) {

        console.log('');
        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                // mostrar completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });     

    }

    // este metodo es para tocar y ver los cambios
    toggleCompletadas( ids = [] ) {

        // recorro los ids de mi arreglo
        ids.forEach( id => {

            // guardo en tarea el id de mi lista
            const tarea = this._listado[id];
            // si la tarea esta en null osea no esta completa
            if ( !tarea.completadoEn ) {
                // pero si esta en null
                // le asigno la fecha a la tarea de ese id
                tarea.completadoEn = new Date().toISOString()
            }

        });

        // Ahora par el caso de mi tarea que esta seleccionada y quiero desmarcarla
        // recorra mis llaves de mi tarea
        this.listadoArr.forEach( tarea => {

            // si el id de la tarea no esta en id
            if ( !ids.includes(tarea.id) ) {
                // en ese arreglo en el id tal completada ahora sera null osea no completada
                this._listado[tarea.id].completadoEn = null;
            }

        });
    }



    

}


/**
* EXPORTO MI MODULO DE  
*/
module.exports = Tareas;
