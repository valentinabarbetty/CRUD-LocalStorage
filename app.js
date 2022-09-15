//VARIABLES

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];


//FUNCIONES

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);

    return item;
}

const guardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    PintarDB();
}

const PintarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {

            if (element.estado) {
                listaActividadesUI.innerHTML += `
            <div class="alert alert-success" role="alert"><span class="material-symbols-outlined float-left mr-2">fitness_center</span>
            <b>${element.actividad}</b> - ${element.estado}
            <span class="float-right"><span class="material-symbols-outlined float-right">check_circle</span>
            <span class="material-symbols-outlined float-right">delete</span>
            </span>
        </div>
            `
            } else {
                listaActividadesUI.innerHTML += `
                <div class="alert alert-danger" role="alert"><span class="material-symbols-outlined float-left mr-2">fitness_center</span>
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right"><span class="material-symbols-outlined float-right">check_circle</span>
                <span class="material-symbols-outlined float-right">delete</span>
                </span>
            </div>
                `
            }

        });
    }
}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad === actividad) {
            indexArray = index;
        }

    });
    //DELETE
    arrayActividades.splice(indexArray, 1);
    guardarDB();
}

const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento) =>
        elemento.actividad === actividad
    )

    arrayActividades[indexArray].estado = true;
    guardarDB();
}

//LISTENERS

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    CrearItem(actividadUI);
    formularioUI.reset();
    guardarDB(actividadUI);
});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
     //console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'check_circle' || e.target.innerHTML === 'delete') {
        let text = e.path[2].childNodes[2].innerHTML;
        if (e.target.innerHTML === 'delete') {
            //delete
            EliminarDB(text);
        }
        if (e.target.innerHTML === 'check_circle') {
            EditarDB(text);
        }
    }

});

