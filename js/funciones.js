function conectarDB() {
    const abrirConexcion = window.indexedDB.open('crm', 1);

    abrirConexcion.onerror = function () {
        console.log('Hubo un error')
    }

    abrirConexcion.onsuccess = function () {
        DB = abrirConexcion.result;
    }
}


function imprimirAlerta(mensaje, tipo) {
    //alerta

    const alert = document.querySelector('.alerta');
    if (!alert) {

        const divAlerta = document.createElement('div');
        divAlerta.classList.add('px-4', 'py-3', 'rounder', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');

        if (tipo === 'error') {
            divAlerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700');
        } else {
            divAlerta.classList.add('bg-green-200', 'border-green-400', 'text-green-700');
        }

        divAlerta.textContent = mensaje;

        formulario.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove();
            window.location.href = 'index.html';
        }, 3000);

    }


}