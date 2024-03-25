const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
    "/"];


let btn = document.getElementById("button");
let password1El = document.getElementById("password1-El");
let password2El = document.getElementById("password2-El");

btn.addEventListener("click", function () {
    let pwd1 = "";
    let pwd2 = "";

    for (let i = 0; i <= 15; i++) {
        pwd1 += characters[generateRandomNum()]; 
        pwd2 += characters[generateRandomNum()]; 
    }

    password1El.textContent = pwd1;
    password2El.textContent = pwd2;
});


function generateRandomNum() { 
    return Math.floor(Math.random() * characters.length);
}

function copyToClipboard(event) {
    let text = event.target.textContent; // Get the text content of the clicked element
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
    }).catch(function(error) {
        console.error('Error in copying text: ', error);
    });    
}

password1El.addEventListener('click', copyToClipboard);
password2El.addEventListener('click', copyToClipboard);
