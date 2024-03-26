
// import firebase requirements
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b5cc0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, 'shoppingList') 

const addBtnEl = document.getElementById('add-btn')
const inputFieldEl = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

addBtnEl.addEventListener('click', () => {
    let inputFieldValue = inputFieldEl.value

    push(shoppingListinDB, inputFieldValue)
    
    clearInputFieldEl()
})

// onValue is a listener that listens to changes in the database
onValue(shoppingListinDB, (snapshot) => { 
    
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()
        
        for (let i = 0; i < shoppingListArray.length; i++) { 
            let currentItem = shoppingListArray[i]
            
            addShoppingListEl(currentItem)
        }
    } else { 
        shoppingListEl.innerHTML = "No items in the shopping list."    
    }
    
})


function clearInputFieldEl() { 
    inputFieldEl.value = ''
    
}

function clearShoppingListEl() { 
    shoppingListEl.innerHTML = ''
    
}

function addShoppingListEl(item) { 
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    newEl.addEventListener('dblclick', () => { 
        let exactItemLocation = ref(database, `shoppingList/${itemId}`)
        remove(exactItemLocation)
    })

    shoppingListEl.appendChild(newEl)
}