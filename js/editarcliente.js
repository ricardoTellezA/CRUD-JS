(function () {
    let DB;
    let idCliente;
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded', () => {
        

        conectarDB()


        //ACTUALIZA REGISTROS

        formulario.addEventListener('submit',actualizarCliente);
        //VERIFICAR EL ID DE LA URL
        const parametrosURL = new URLSearchParams(window.location.search);

        idCliente = parametrosURL.get('id');
        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 3000);

        }
    });

    function actualizarCliente(e){
        e.preventDefault();
        if(nombreInput.value === '' || emailInput === '' || telefonoInput === '' || empresaInput === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }


        //ACTUALIZAR CLIENTE

        const clienteActualizado = {
            nombre:nombreInput.value,
            email:emailInput.value,
            telefono:telefonoInput.value,
            empresa:empresaInput.value,
            id:Number (idCliente)
        }

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete =  function (){
          imprimirAlerta('Editado correctamente','correcto');
        }
        transaction.onerror = function(){
            importScripts('Hubo un error','error');
        }
    }

    function obtenerCliente(id) {

        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {

                if (cursor.value.id === Number(id)) {

                    llenarFormulario(cursor.value);

                }

                cursor.continue();
            }
        }

    }


    function llenarFormulario(datosCliente) {
        const { nombre,email,telefono,empresa } = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;

    }

    function conectarDB() {
        const abrirConexcion = window.indexedDB.open('crm', 1);

        abrirConexcion.onerror = function () {
            console.log('Hubo un error')
        }

        abrirConexcion.onsuccess = function () {
            DB = abrirConexcion.result;
        }
    }
})();