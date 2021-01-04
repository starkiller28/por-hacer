const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'

};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca si la tarea está completada o está pendiente'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina una tarea', {
        descripcion
    })
    .command('listar', 'Muestra la lista de tareas por hacer', {
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
}