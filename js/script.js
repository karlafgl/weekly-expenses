//Global Variables
const userBudget = prompt('What is your weekly budget?')
let amountBudget;
const form = document.getElementById('agregar-gasto')

//Classes
class Budget{
    constructor(budget, finalBalance){
        this.budget = budget
        this.finalBalance = budget
    }
    remainingBudget(amount = 0){
        return this.finalBalance -= Number(amount)
    }
}

class UI {
    insertBudget(budget){
        const budgetUI = document.querySelector('span#total')
        const finalBalanceUI = document.querySelector('span#restante')

         budgetUI.innerHTML = budget
         finalBalanceUI.innerHTML = budget
    }
    showMessage(message, type){
        const div = document.createElement('div')
        div.classList.add('text-center', 'alert')

        type === 'error' ? div.classList.add('alert-danger') : div.classList.add('alert-success')
        
        div.innerHTML = message
        document.querySelector('.primario').insertBefore(div, form)

        setTimeout(()=>{
            document.querySelector('.alert').remove()
            form.reset()
        }, 3000)
    }
    insertExpenseToList(expense, amount){
        const ulList = document.querySelector('ul.list-group')

        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        li.innerHTML = `
            ${expense}  
            <span class='badge badge-primary badge-pill'> $ ${amount} </span>
        `
        ulList.appendChild(li)
    }
    remainingAmount(amount){
        const remaining = document.querySelector('span#restante')

        const remainingAmountUser = amountBudget.remainingBudget(amount)

        remaining.innerHTML = `${remainingAmountUser}`
        this.checkBudget()
    }
    checkBudget(){
        const budgetTotal = amountBudget.budget

        const remainingBudget = amountBudget.finalBalance

        //comprobar el 25%
        if((budgetTotal / 4) > remainingBudget){
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success', 'alert-warning')
            restante.classList.add('alert-danger')

        } else if((budgetTotal / 2) > remainingBudget) {
            const restante = document.querySelector('.restante')
            restante.classList.remove('alert-success')
            restante.classList.add('alert-warning')
        }
    }
}

//Event Listeners 
const loadEventListeners = () => {
    document.addEventListener('DOMContentLoaded', (e)=>{
        userBudget === '' || userBudget === null ?window.location.reload() : amountBudget = new Budget(userBudget)
        amountBudget = new Budget(userBudget)
        const ui = new UI()
        ui.insertBudget(amountBudget.budget)
        }
    )
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const userExpenses = document.querySelector('#gasto').value 
        const userAmount = document.querySelector('#cantidad').value
        const ui = new UI()
        userExpenses === '' || userAmount === ''  ? ui.showMessage('Error!', 'error') : 
            ui.showMessage('Successful', 'correcto')
            ui.insertExpenseToList(userExpenses, userAmount)
            ui.remainingAmount(userAmount)
            ui.checkBudget()
    })
}
loadEventListeners()


