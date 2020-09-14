//Declaro el Objeto Recordatorio con diferentes caracteristicas: un nombre, una fehca de inicio y una fecha de fin

class Recordatorio {
    constructor(name, fechaInicio, fechaFin) {
        this.name = name;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}

//Nuevo Objeto para User Interface que almacenar los metodos que se le asignaran al recordatorio para que el usuario intereactue

class UI {

    //primer metodo agregar recordatorio
    addProduct(recordatorio) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');

        element.innerHTML = `
        <div class = "card text-center mb-4 animate__animated animate__fadeInRight" >
              <div class = "card-body " >
              Recordatorio: <strong>${recordatorio.name}</strong> 
              Del: <strong> ${recordatorio.fechaInicio}</strong> 
              Para el: <strong>${recordatorio.fechaFin}</strong> 
                <a href="#" class="btn btn-danger" name="eliminar">Eliminar</a>
                <a href="#" class="btn btn-success" name="hecho">Hecho</a>
             </div>
        </div>
        `;

        productList.appendChild(element);
        this.resetForm();
    }

    //segundo metodo resetear formulario a blanco
    resetForm() {
            document.getElementById('product-form').reset();
        }
        //tercero eliminar un recordatorio a partir de un boton
    deleteProduct(element) {
            if (element.name === 'eliminar') {
                element.parentElement.parentElement.parentElement.remove();
                this.showMessage('Recordatorio Eliminado', 'danger');
            }
        }
        //cuarto completado para completar un recordatorio ya hecho
    completado(element) {
            if (element.name === 'hecho') {
                element.parentElement.parentElement.parentElement.remove();
                this.showMessage('Recordatorio Completado', 'info');
            }
        }
        //quinto mostra mensaje segun el evento realizado
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `
        alert alert-${cssClass} mt-4
        `;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        container.insertBefore(div, app);

        setTimeout(function() {
            document.querySelector('.alert').remove();

        }, 3000);
    }
}

//selecciono el elemento submit del form y le agrego la accion que es obtener los valores del form y agregarlos como nuevo Objeto Recordatorio

document.getElementById('product-form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const fechaInicio = document.getElementById('price').value;
    const fechaFin = document.getElementById('year').value;

    localStorage.setItem("Nombre", name);
    localStorage.setItem("Fecha Inicio", fechaInicio);
    localStorage.setItem("Fecha Fin", fechaFin);

    let nameLocal = localStorage.getItem("Nombre", name);
    let fechaInLocal = localStorage.getItem("Fecha Inicio", fechaInicio);
    let fechaFinLocal = localStorage.getItem("Fecha Fin", fechaFin);


    const recordatorio = new Recordatorio(nameLocal, fechaInLocal, fechaFinLocal);


    const ui = new UI();
    ui.addProduct(recordatorio);



    ui.showMessage("Recordatorio Agregado", 'success')

    /*
    
    */

    e.preventDefault();
});

//selecciono los botones del product list y cada uno realizara un evento segun cual cliquee el usuario
document.getElementById('product-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteProduct(e.target);

    ui.completado(e.target);
});

//bloque de codigo que al presionar un boton muestra los datos recuperados del localstorage
let btnVer = document.querySelector('.ver');
let nuevaSeccion = document.querySelector('.nueva-seccion');
btnVer.addEventListener('click', function(e) {
    e.preventDefault;

    let nameLocal = localStorage.getItem("Nombre");
    let fechaInLocal = localStorage.getItem("Fecha Inicio");
    let fechaFinLocal = localStorage.getItem("Fecha Fin");

    console.log(nameLocal, fechaInLocal, fechaFinLocal);

    let element = document.createElement('div');

    element.innerHTML = `
        <div class = "card text-center mb-4 animate__animated animate__fadeInRight" >
              <div class = "card-body " >
              Recordatorio: <strong>${nameLocal}</strong> 
              Del: <strong> ${fechaInLocal}</strong> 
              Para el: <strong>${fechaFinLocal}</strong> 
                <a href="#" class="btn btn-outline-warning" id="okey"><strong>OK</strong></a> 
             </div>
        </div>
        `;
    nuevaSeccion.appendChild(element);

    let btnOk = document.querySelector('#okey');


    btnOk.addEventListener('click', function() {
        nuevaSeccion.removeChild(element);
    });

});