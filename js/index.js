//se buscan y parsean los datos en el data.json 
fetch("../data/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    insertarProductos(data);
    // Guardar los datos en una variable global para la búsqueda
    window.productosData = data;
  })
  .catch((error) => {
    console.error("Hubo un problema con la solicitud:", error);
  });

  //esta funcion es para generar contenedores para cada producto 
function insertarProductos(productos) {
  const contenedorProductos = document.getElementById("cont_products");
  contenedorProductos.innerHTML = ""; // Limpiar el contenido existente

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
        <div class="contenedor-imagen">
          <img src=${producto.url} alt="${producto.name}" />
        </div>
        <button>${producto.name.toUpperCase()}</button>
        <p>Precio: $${producto.price}</p>
        <p>${producto.description}</p>
      `;

    contenedorProductos.appendChild(tarjeta);
  });
}

// Función de búsqueda
function buscarProductos(event) {
  console.log(event)
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const query = document
    .querySelector('input[type="text"]')
    .value.toLowerCase(); // Obtener el valor de búsqueda

  if (query === "") {
    alert("Por favor, ingrese un término de búsqueda.");
    return;
  }

  if (query.length < 2) {
    alert("Por favor, ingrese al menos 2 caracteres para la búsqueda.");
    return;
  }

  // Filtrar los productos que coincidan con la búsqueda
  const productosFiltrados = window.productosData.filter(
    (producto) =>
      producto.name.toLowerCase().includes(query) || // Coincidir con el nombre del producto
      producto.description.toLowerCase().includes(query) // Coincidir con la descripción del producto
  );

  if (productosFiltrados.length === 0) {
    alert("No se encontraron productos que coincidan con su búsqueda.");
  }

  // Insertar los productos filtrados en el contenedor
  insertarProductos(productosFiltrados);
  
}
// Añadir el evento al formulario


//funcion para validacion de formulario
function validacionFormulario(event){

  console.log(event)
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const name = document
    .querySelector('#nombre')
    .value.toLowerCase(); // Obtener el valor de nombre 

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  
    const email = document
    .querySelector('#email')
    .value.toLowerCase(); // Obtener el valor de email
//valida que el nombre no tenga numeros
  if (!nameRegex.test(name)) {
    alert("Por favor, el nombre solamente puede contener letras.");
    
    return;
  }
//valida que el email cumpla los requisitos
  if(!/\S+@\S+.\S+/.test(email)){
    alert("El email introducido no es valido")
    return;
  }
}
//se crean los dos formularios y se comprueban que existen

document.addEventListener("DOMContentLoaded", function () {
  const formBusqueda = document.getElementById("formularioBusqueda");
  const formContacto = document.getElementById("formularioContacto");

  if (formBusqueda) {
    formBusqueda.addEventListener("submit", buscarProductos);
  }

  if (formContacto) {
    formContacto.addEventListener("submit", validacionFormulario);
  }
});