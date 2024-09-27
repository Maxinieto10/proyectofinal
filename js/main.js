const rates = {
    dolar: 1000,
    euro: 1110,
    libra: 1300
};

let carrito = [];

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

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';  

    if (carrito.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.cantidad} ${item.moneda.toUpperCase()} - $${item.total}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            cartContainer.appendChild(div);
        });

        const total = carrito.reduce((sum, item) => sum + item.total, 0);
        document.getElementById('total').textContent = `Total a pagar: $${total}`;
    }

    if (!document.getElementById('finalizar-compra')) {
        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.id = 'finalizar-compra';
        finalizarCompraBtn.textContent = 'Finalizar Compra';
        finalizarCompraBtn.onclick = mostrarConfirmacion;
        cartContainer.appendChild(finalizarCompraBtn);
    }
}

function mostrarPopup(mensaje) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    popup.querySelector('p').textContent = mensaje;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function cerrarPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

function mostrarConfirmacion() {
    const confirmPopup = document.getElementById('confirm-popup');
    const overlay = document.getElementById('overlay');
    
    confirmPopup.style.display = 'block';
    overlay.style.display = 'block';
}

function cerrarConfirmacion() {
    const confirmPopup = document.getElementById('confirm-popup');
    const overlay = document.getElementById('overlay');
    
    confirmPopup.style.display = 'none';
    overlay.style.display = 'none';
}

function confirmarCompra() {
    const successPopup = document.getElementById('success-popup');
    const overlay = document.getElementById('overlay');

    successPopup.style.display = 'block';
    overlay.style.display = 'block';

    carrito = [];  
    actualizarCarrito();
    cerrarConfirmacion(); 
}


