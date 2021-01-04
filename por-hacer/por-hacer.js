const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //convierte la lista para que se pueda usar en el archivo json
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return "Actualizado correctamente";
    } else {
        return "La descripcion mandada no concuerda con ninguna de la base de datos";
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const filtrarTareas = (completo) => {
    cargarDB();
    let listaFiltrada;
    if (completo === 'false') {
        listaFiltrada = listadoPorHacer.filter(tarea => {
            return tarea.completado === false || tarea.completado === "false";
        })
    } else {
        listaFiltrada = listadoPorHacer.filter(tarea => {
            return tarea.completado === true || tarea.completado === "true";
        })
    }

    return listaFiltrada;
}

module.exports = {
    crear,
    filtrarTareas,
    actualizar,
    borrar
}