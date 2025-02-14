document.getElementById("inicio").addEventListener("click", function() {
    mostrarMenu();
});

const usuarios = [];
const productos = [];
let id = 0;

function mostrarMenu(){
    let opcion;
    do{
        opcion = parseInt(prompt("Elija una opcion: \n 1. Ingresar \n 2. Registrarse \n 3. Salir"));
        switch(opcion){
            case 1:
                ingreso();
                break;
            case 2:
                registro();
                break;
            case 3:
                alert("Gracias por visitarnos");
                break;
            default:
                alert("Opcion invalida");
                break;
        }
    }while(opcion != 3);
}

function registro(){
    let nombre = prompt("Ingrese su nombre");
    let user = prompt("Ingrese su nombre de usuario");
    let password = prompt("Ingrese su contraseña");
    let usuario;
    if(nombre == "" || user == "" || password == ""){
        alert("Debe llenar todos los campos");
        mostrarMenu();
    }else{
        usuario = {
            nombre: nombre,
            user: user,
            password: password
        }
    }
    usuarios.push(usuario);
    alert("Usuario registrado correctamente");
}

function ingreso(){
    let user = prompt("Ingrese su nombre de usuario");
    let password = prompt("Ingrese su contraseña");
    let success = false;
    for(let i of usuarios){
        if(i.user == user && i.password == password){
            alert("Bienvenido " + i.nombre);
            success = true;
            break;
        }
    }
    if(!success){
        alert("Usuario o contraseña incorrecta");
        mostrarMenu();
    }else{
        mostrarOpciones();
    }
}

function mostrarOpciones(){
    let opcion, confirmacion;
    do{
        opcion = parseInt(prompt("Elija una opcion: \n 1. Agregar productos \n 2. Ver productos \n 3. Eliminar producto \n 4. Cerrar sesion"));
        switch(opcion){
            case 1:
                confirmacion = confirm("¿Desea agregar un producto?");
                while (confirmacion){
                    agregarProducto();
                    confirmacion = confirm("¿Desea agregar otro producto?");
                }
                break;
            case 2:
                verProductos();
                break;
            case 3:
                eliminarProducto();
                break;
            case 4:
                alert("Sesion cerrada");
                break;
            default:
                alert("Opcion invalida");
                break;
        }
    }while(opcion != 4);
}

function agregarProducto(){
    let nombre, precio, cantidad;
    id = id + 1;
    nombre = prompt("Ingrese el nombre del producto");
    precio = parseFloat(prompt("Ingrese el precio del producto"));	
    cantidad = parseInt(prompt("Ingrese la cantidad del producto"));
    let producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    }
    productos.push(producto);
    alert("Producto agregado correctamente");
}

function verProductos(){
    if(productos.length == 0){
        alert("No hay productos registrados");
    }else{
        for(let i of productos){
            alert("Codigo: " + i.id + "\nNombre: " + i.nombre + "\nPrecio: " + i.precio + "\nCantidad: " + i.cantidad + "\n");
            console.log("Codigo: " + i.id + "\nNombre: " + i.nombre + "\nPrecio: " + i.precio + "\nCantidad: " + i.cantidad + "\n");
        }
    }
}

function eliminarProducto(){
    let id = parseInt(prompt("Ingrese el codigo del producto"));
    let index = productos.findIndex(x => x.id == id);
    if(index != -1){
        productos.splice(index, 1);
        alert("Producto eliminado correctamente");
    }else{
        alert("Producto no encontrado");
    }
}