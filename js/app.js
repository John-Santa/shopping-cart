//* Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


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
    //TODO: Agregar al carrito de compras
    //insertarCarrito(infoCurso);
};

cargarEventListeners();