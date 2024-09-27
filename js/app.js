const monedas = [
    { nombre: 'dolar', simbolo: 'USD' },
    { nombre: 'euro', simbolo: 'EUR' },
    { nombre: 'libra', simbolo: 'GBP' }
];

function crearTarjetas() {
    const container = document.getElementById('cards-container');
    
    monedas.forEach(moneda => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>Compra ${moneda.simbolo}</h3>
            <input type="number" placeholder="Ingrese una cantidad" id="${moneda.nombre}-input">
            <button onclick="agregarAlCarrito('${moneda.nombre}', document.getElementById('${moneda.nombre}-input').value)">Comprar ${moneda.simbolo}</button>
        `;
        container.appendChild(card);
    });
}

crearTarjetas();
