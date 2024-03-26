import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-431a3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDb = ref(database, 'endorsements')

const endBtnEl = document.getElementById('end-btn-el')
const endTextAreaEl = document.getElementById('end-textArea-el')
const endFromEl = document.getElementById('end-from-el')
const endToEl = document.getElementById('end-to-el')
const endContainer = document.getElementById('end-container')

// onValue event
onValue(endorsementsInDb, (snapshot) => {
    
    if (snapshot.exists()){ 
        let postsArray = Object.entries(snapshot.val())
        clearEndorsementContainerEl()
        for (let i = 0; i < postsArray.length; i++) { 
            let post = postsArray[i][1]
            renderEndorsements(post)
        }
    }else{ 
        endContainer.innerHTML = `<p>--No endorsements yet--</p>`
    }

    
})

// Btn click event
endBtnEl.addEventListener('click', () => { 
    let curentTime = getDate()
    
    let newEndorsement = {
        text: endTextAreaEl.value,
        from: endFromEl.value,
        to: endToEl.value,
        time: curentTime
    }

    push(endorsementsInDb, newEndorsement)
    clearInputs()
})

function renderEndorsements(newPost) { 
    let to = newPost.to
    let from = newPost.from
    let content = newPost.text
    let postTime = newPost.time
    endContainer.innerHTML += `
        <div class="message-container">
            <h3 id="title-to-el" class="message-title">To ${to}</h3>
            <p id="content-el" class="message-content">${content}</p>
            <div class="signature-wrapper">
                <h3 id="signature-from" class="message-signature">From ${from}</h3>
                <time class="message-time">${postTime}</time>
            </div>
        </div>`
}

function clearEndorsementContainerEl() { 
    endContainer.innerHTML = ''
}

function clearInputs() {
    endTextAreaEl.value = ''
    endFromEl.value = ''
    endToEl.value = ''
}

function getDate() { 
    let currentTime = new Date()

    // Extracting components
    let year = currentTime.getFullYear()
    let month = currentTime.toLocaleString('default', { month: 'short' })
    let day = currentTime.getDate()
    let hours = currentTime.getHours().toString().padStart(2, '0')
    let minutes = currentTime.getMinutes().toString().padStart(2, '0')
    let seconds = currentTime.getSeconds().toString().padStart(2, '0')

    // Formatting the date and time part
    let formattedDateTime = `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`

    // Getting the time zone part
    let timeZone = currentTime.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]

    // Combining both parts
    let result = `${formattedDateTime} (${timeZone})`

    return result
}