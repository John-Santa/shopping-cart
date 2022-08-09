//* Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let cursosCarrito = [];


const cargarEventListeners = () => {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('cursos') === null) {
            return;
        } else {
            cursosCarrito = JSON.parse(localStorage.getItem('cursos'));
            insertarCarrito();
        }
    });
};

const agregarCurso = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const boton = event.target;
        leerDatosCurso(boton);

    };
};

const eliminarCurso = (event) => {
    if (event.target.classList.contains('borrar-curso')) {
        const cursoId = event.target.getAttribute('data-id');
        cursosCarrito = cursosCarrito.filter( curso => curso.id !== cursoId);
        insertarCarrito();
    }
};

const vaciarCarrito = () => {
    cursosCarrito = [];
    insertarCarrito();
};

const leerDatosCurso = (boton) => {
    const curso = boton.parentElement.parentElement;
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    const existeCurso = cursosCarrito.some(curso => curso.id === infoCurso.id);
    if (existeCurso) {
        const cursos = cursosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad += 1;
                return curso;
            } else {
                return curso;
            }
        });
        cursosCarrito = [...cursos];
    } else {
        cursosCarrito = [...cursosCarrito, infoCurso];
    };
    insertarCarrito();
};

const insertarCarrito = () => {
    //* Limpiar HTML
    limpiarCarrito();

    cursosCarrito.forEach( ({ imagen, titulo, precio, cantidad, id }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    sincronizeLocalStorage();
};

const sincronizeLocalStorage = () => {
    localStorage.setItem('cursos', JSON.stringify(cursosCarrito));
}

const limpiarCarrito = () => {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};




cargarEventListeners();