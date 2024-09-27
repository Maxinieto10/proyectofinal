// Simulación de conversión de monedas
const rates = {
    dolar: 1000,
    euro: 1110,
    libra: 1300
};

// Array para almacenar el carrito de compras
let carrito = [];

// Función para hacer la conversión
function convertirMoneda(moneda, cantidad) {
    try {
        if (cantidad <= 0 || isNaN(cantidad)) {
            throw new Error("Por favor ingrese una cantidad válida.");
        }
        return cantidad * rates[moneda];
    } catch (error) {
        mostrarPopup(error.message);
        return null;
    }
}

// Función para agregar elementos al carrito
function agregarAlCarrito(moneda, cantidad) {
    const conversion = convertirMoneda(moneda, cantidad);
    if (conversion) {
        const item = {
            moneda: moneda,
            cantidad: cantidad,
            total: conversion
        };
        carrito.push(item);
        actualizarCarrito();
    }
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar el carrito y mostrar el total
function actualizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';  // Limpiar el carrito

    // Si no hay productos en el carrito, mostramos un mensaje
    if (carrito.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        // Si hay productos, los mostramos
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.cantidad} ${item.moneda.toUpperCase()} - $${item.total}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            cartContainer.appendChild(div);
        });

        // Mostrar el total acumulado
        const total = carrito.reduce((sum, item) => sum + item.total, 0);
        document.getElementById('total').textContent = `Total a pagar: $${total}`;
    }

    // Verificamos si el botón de finalizar compra ya está, si no, lo creamos
    if (!document.getElementById('finalizar-compra')) {
        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.id = 'finalizar-compra';
        finalizarCompraBtn.textContent = 'Finalizar Compra';
        finalizarCompraBtn.onclick = mostrarConfirmacion;
        cartContainer.appendChild(finalizarCompraBtn);
    }
}

// Función para mostrar el popup de error
function mostrarPopup(mensaje) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    popup.querySelector('p').textContent = mensaje;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// Función para cerrar el popup
function cerrarPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// Función para mostrar la ventana de confirmación de compra
function mostrarConfirmacion() {
    const confirmPopup = document.getElementById('confirm-popup');
    const overlay = document.getElementById('overlay');
    
    confirmPopup.style.display = 'block';
    overlay.style.display = 'block';
}

// Función para cerrar la ventana de confirmación de compra
function cerrarConfirmacion() {
    const confirmPopup = document.getElementById('confirm-popup');
    const overlay = document.getElementById('overlay');
    
    confirmPopup.style.display = 'none';
    overlay.style.display = 'none';
}

// Función para confirmar la compra
function confirmarCompra() {
    const successPopup = document.getElementById('success-popup');
    const overlay = document.getElementById('overlay');

    successPopup.style.display = 'block';
    overlay.style.display = 'block';

    carrito = [];  // Vaciar el carrito después de la compra
    actualizarCarrito();
    cerrarConfirmacion();  // Cerrar la ventana de confirmación
}


