//variables
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?')
let cantidadPresupuesto;



//Clases

//Clase de presupuesto
class Presupuesto {
    constructor(presupuesto, restante){
        this.presupuesto = Number(presupuesto) 
        this.restante = Number(presupuesto)
    }
    //Metodo para ir restando al presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad)
    }

}

//Clase de interfaz
class Interfaz {
    insertarPresupuesto(cantidad){
        //grab selectores
        const presupuestoSpan = document.querySelector('span#total')
        const restanteSpan = document.querySelector('span#restante')
        
        //Insertar al HTML
        presupuestoSpan.innerHTML = cantidad
        restanteSpan.innerHTML = cantidad
    }
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div')
        div.classList.add('alert', 'text-center')

        if(tipo === 'error') {
            div.classList.add('alert-danger')
        } else {
            div.classList.add('alert-success')
        }

        div.innerHTML = mensaje

        document.querySelector('.primario').insertBefore(div, formulario)

        setTimeout(()=>{
            document.querySelector('.alert').remove()
            formulario.reset()
        }, 3000)
    }
    agregarGastoListado(gasto, cantidad){
        const gastosListado = document.querySelector('#gastos ul')
        
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        li.innerHTML = `
            ${gasto}  
            <span class='badge badge-primary badge-pill'> $ ${cantidad} </span>
        `
        gastosListado.appendChild(li)
    }
    //comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante')

        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad)

        restante.innerHTML = `${presupuestoRestanteUsuario}`
        this.comprobarPresupuesto()
    }
    //Cambia el color al presupuesto restante 
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto

        const presupuestoRestante = cantidadPresupuesto.restante

        //comprobar el 25%
        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success', 'alert-warning')
            restante.classList.add('alert-danger')

        } else if((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success')
            restante.classList.add('alert-warning')
        }

    }
}


//EventListeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload()
    }
    else {
        //Instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario)

        //Instanciar la clase de interfaz
        const ui = new Interfaz()
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
})

const formulario = document.getElementById('agregar-gasto')
formulario.addEventListener('submit', function(e) {
    e.preventDefault()

    const gasto = document.getElementById('gasto').value
    const cantidad = document.getElementById('cantidad').value

    //Instaciar la interfaz
      const ui = new Interfaz()

    //Validation 
    if(gasto === '' || cantidad === ''){
        ui.mostrarMensaje('Hubo un error', 'error')
    } else {
        ui.mostrarMensaje('Correcto!', 'correcto')
        ui.agregarGastoListado(gasto, cantidad)
        ui.presupuestoRestante(cantidad)
    }
    
})



