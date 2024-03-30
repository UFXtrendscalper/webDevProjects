import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menuEl = document.getElementById('menu-el')
const orderEl = document.getElementById('order')
const checkoutEl = document.getElementById('checkout')
const popupEl = document.getElementById('popup-el')
const payForm = document.getElementById('pay-form')

// loads the menu items
function getMenuHtml(menuArray) {
    return menuArray.map((item) => { 
        const { name, ingredients, id, price, emoji } = item  
        return `
            <div class="menu_items" id="menu-item-${id}">
                <span class="img" role="img" aria-label="${name}">${emoji}</span>
                <div>
                    <h2>${name}</h2>   
                    <p class="ingredients">${ingredients.join(', ')}</p>
                    <p class="price">$${price}</p>
                </div>
                <div class="add-btn" data-id="${id}" role="button" aria-label="Add ${name} to cart">
                    <span>+</span>
                </div>
            </div>
        ` 
    }).join('')
}

menuEl.innerHTML = getMenuHtml(menuArray)

// listen for form submit
payForm.addEventListener('submit', (e) => { 
    e.preventDefault()

    const formData = new FormData(payForm)
    const name = formData.get('customer-name')
    //  todo close the popup
    popupEl.classList.add('hidden')
    // todo render a thank you message
    orderEl.innerHTML = `
        <div class="thank-you">
            <h2>Thanks, ${name}! Your order is on it's way</h2>
        </div>
    `        




})

// listens for clicks document
document.addEventListener('click', (e) => { 
    const addButton = e.target.closest('.add-btn')
    if (addButton) {
        const itemId = addButton.dataset.id
        addItem(itemId)
        // show order section
        orderEl.classList.remove('hidden')
    } else if (e.target.classList.contains('order-btn')) {
        const itemUniqueId = e.target.dataset.id;
        removeItem(itemUniqueId);
    } else if (e.target.id === 'pay-btn') {
        popupEl.classList.remove('hidden')
    }
    
})

let order = []
function addItem(itemId) {
    const item = menuArray.find((item) => {
        return item.id === Number(itemId)
     })
    if (item) { 
        const orderItem = {...item, _uniqueId: uuidv4()}
        order.push(orderItem)
        renderOrder()
    }
}

function removeItem(uniqueId) { 
    order = order.filter(item => item._uniqueId !== uniqueId)
    renderOrder()
}

function renderOrder() { 
    let html = `` 
    order.forEach((item) => { 
        html += `
            <div class="flex order-item">
                <h2>${item.name}</h2>
                <button class="order-btn" data-id="${item._uniqueId}">remove</button>
                <p class="item-price">$${item.price}</p>
            </div>
            
        `
    })
    // add the total html
    html += `
        <hr>
        <div class="flex">
            <h2>Total price:</h2> 
            <p id="total-price" class="item-price">$${getTotalPrice()}</p> 
        </div>
    `
    checkoutEl.innerHTML = html    
}

function getTotalPrice() {
    return order.reduce((total, item) => {
        return total + item.price
    }, 0)
}
