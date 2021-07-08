const jasonMateriales = [
    {
        "id": 1,
        "nombre": "Mamposteria",
        "precio": 100,
        "unidad": "hs",
        "peso": 8
    },
    { 
        "id": 2,
        "nombre": "Contrapiso",
        "precio": 180,
        "unidad": "hs",
        "peso": 4
    },
    { 
        "id": 3,
        "nombre": "Cielo Raso",
        "precio": 200,
        "unidad": "hs",
        "peso": 3
    },
    { 
        "id": 4,
        "nombre": "Pintura",
        "precio": 300,
        "unidad": "hs",
        "peso": 2
    }
];

/*
    leo materiales del localstorage si es vacio escribo array sino uso el array
*/

let listado = leerLocalStorage("listado").length != 0 ? leerLocalStorage("listado") : jasonMateriales && escribirLocalStorage("listado", jasonMateriales)

console.log(listado)