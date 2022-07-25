//* Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let cursosCarrito = [];


const cargarEventListeners = () => {
    listaCursos.addEventListener('click', agregarCurso);
};

const agregarCurso = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const boton = event.target; 
        leerDatosCurso(boton);

    };
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
    cursosCarrito = [...cursosCarrito, infoCurso];
    insertarCarrito();
};

const insertarCarrito = () => {
    //* Limpiar HTML
    limpiarCarrito();

    cursosCarrito.forEach( (curso) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
};

const limpiarCarrito = () => {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};


cargarEventListeners();