import {menuArray} from './data.js'

let myOrder = []
const paymentModal = document.getElementById('payment-modal')
render()

document.addEventListener('click', e => {
    if(e.target.dataset.add) {
        addFoodItemToArr(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-order') {
        paymentModal.style.display = 'flex'
    }
    else if (paymentModal.style.display === 'flex' && !e.target.closest('#payment-modal')) {
        paymentModal.style.display = 'none'
    }
    
})

function render() {
    document.getElementById('food-menu').innerHTML = getFoodMenu(menuArray)
}

function getFoodMenu(arr) {
    return arr.map(food => {
        return `
        <div class="food-item">
            <h3 class="food-icon">${food.emoji}</h3>
            <div class="food-info-cntr">
                <h4>${food.name}</h4>
                <p class="food-description">${food.ingredients.join(', ')}</p>
                <p class="food-price">$${food.price}</p>
            </div>
            <div class="add-button" role="button" aria-label="Add food to list" data-add="${food.id}">
                <p id="add-food-btn" class="add-plus" data-add="${food.id}">&#43</p>
            </div>
        </div>`
    }).join('')
}

function addFoodItemToArr(foodId) {
    const targetObject = menuArray.filter(food => {
        return Number(foodId) === food.id 
    })[0]

    myOrder.push({name: targetObject.name,
        price: targetObject.price,
        id: myOrder.length})

    renderTotalPrice(myOrder)

    document.getElementById('my-order-container').innerHTML = renderOrder(myOrder)
    document.getElementById('order-info').style.display = "block"
}

function renderOrder(arr) {

    return arr.map(food => {
        return `
                <div class="ordered-item">
                    <h3 class="order-item-name">${food.name}</h3>
                    <p class="order-item-remove" role="button" aria-label="Remove food item" data-remove="${food.id}">remove</p>
                    <p class="order-item-price">${food.price}</p>
                </div>`
    }).join('')
}

function renderTotalPrice(arr) {
    const totalPrice = arr.reduce((total, currentPrice) => {
        return total + currentPrice.price
    },0)

    document.getElementById('total-order-price').textContent = `$${totalPrice}`
}

function removeFromOrder(foodId){
    myOrder = myOrder.filter(food => {
        return food.id !== Number(foodId)
    })
    renderTotalPrice(myOrder)
    document.getElementById('my-order-container').innerHTML = renderOrder(myOrder)

    if (myOrder.length < 1) {
        document.getElementById('order-info').style.display = "none"
    }
}