const productos = [
    {
        id: 1,
        nombre: 'Mouse Gamer',
        descripcion: 'Mouse ergonómico con iluminación RGB y alta precisión.',
        img: 'https://s3-sa-east-1.amazonaws.com/saasargentina/oaPmQNJPQeMZynN9AOk5/imagen',
        precio: 25000
    },
    {
        id: 2,
        nombre: 'Teclado Mecánico',
        descripcion: 'Teclado mecánico con switches azules y retroiluminación RGB.',
        img: 'https://xtrike-me.com.ar/media/2022/07/GK-979_1.png',
        precio: 45000
    },
    {
        id: 3,
        nombre: 'Auriculares Inalámbricos',
        descripcion: 'Auriculares con cancelación de ruido y batería de larga duración.',
        img: 'https://static.bidcom.com.ar/publicacionesML/productos/ABLUE161/1000x1000-ABLUE161.jpg',
        precio: 60000
    },
    {
        id: 4,
        nombre: 'Consola de Videojuegos',
        descripcion: 'Consola de última generación con gráficos 4K y HDR.',
        img: 'https://m.media-amazon.com/images/I/61nq7mC0tHL.jpg',
        precio: 300000
    },
    {
        id: 5,
        nombre: 'Smartphone',
        descripcion: 'Smartphone con pantalla AMOLED y cámara de alta resolución.',
        img: 'https://macstore.com.pa/cdn/shop/files/IMG-14858961_a9aaa022-7161-4725-b040-50b02cc3cc84.jpg?v=1731598135&width=823',
        precio: 150000
    },
    {
        id: 6,
        nombre: 'Monitor Curvo',
        descripcion: 'Monitor curvo de 27 pulgadas con resolución Full HD y tasa de refresco de 144Hz.',
        img: 'https://http2.mlstatic.com/D_NQ_NP_682090-MLA79556119294_102024-O.webp',
        precio: 500000
    }
];

const carrito = [];

const containerCards = document.getElementById('containerCards');

function agregarProducto() {
    productos.forEach(producto => {
        const card = document.createElement("article");
        card.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>
                </div>
                <div class="card-footer">
                    <button onclick="agregarCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>
        `;
        containerCards.appendChild(card);
    });
}

function agregarCarrito(id) {
    const prod = productos.find(producto => producto.id === id);
    const prodCarrito = carrito.find(producto => producto.id === id);
    if (prodCarrito) {
        prodCarrito.cantidad++;
    } else {
        const newProd = { ...prod, cantidad: 1 };
        carrito.push(newProd);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}

const cartItems = document.getElementById('cartItems');
const subtotal = document.getElementById('subtotal');
const envio = document.getElementById('envio');
const total = document.getElementById('total');

function mostrarCarrito() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log(cart);
    if(cart){
        cart.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th>${producto.nombre}</th>
                <td>${producto.precio}</td>
                <td>
                    <button onclick="cambiarCantidad(${producto.id}, -1)" class="btn btn-secondary">-</button>
                    ${producto.cantidad}
                    <button onclick="cambiarCantidad(${producto.id}, 1)" class="btn btn-secondary">+</button>
                </td>
                <td>${producto.cantidad * producto.precio}</td>
                <td><button onclick="eliminarProducto(${producto.id})" class="btn btn-danger">Eliminar</button></td>
            `;
            cartItems.appendChild(row);
        });
        const sub = cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        subtotal.textContent = "$"+sub;
        if(sub >= 60000){
            envio.textContent = "Gratis";
            total.textContent = "$"+sub;
        }else if(sub == 0){
            envio.textContent = "$"+0;
            total.textContent = "$"+0;
        }else{
            envio.textContent = "$"+5000;
            total.textContent = "$"+(sub+5000);
        }
    }
}

function cambiarCantidad(id, cantidad) {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const prodCarrito = cart.find(producto => producto.id === id);
    if (prodCarrito) {
        prodCarrito.cantidad += cantidad;
        if (prodCarrito.cantidad <= 0) {
            eliminarProducto(id);
        } else {
            localStorage.setItem('carrito', JSON.stringify(cart));
            location.reload();
        }
    }
}

function eliminarProducto(id) {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = cart.findIndex(producto => producto.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(cart));
        location.reload(); 
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const path = window.location.pathname;
    if (path.includes('products.html')) {
        agregarProducto();
    } else if (path.includes('cart.html')) {
        mostrarCarrito();
    }
});