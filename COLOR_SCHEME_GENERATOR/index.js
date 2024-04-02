



const colorForm = document.getElementById('color-form')
const baseURL = 'https://www.thecolorapi.com/'


colorForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get the form data using FormData
    const formData = new FormData(colorForm)

    const color = formData.get('color').replace('#', '')
    const colorScheme = formData.get('color-scheme').toLowerCase()

    fetch(`${baseURL}scheme?hex=${color}&mode=${colorScheme}&named=true`)
        .then(res => res.json())
        .then(data => { 
            const colorList = data.colors.map(color => {
                return `
                    <li style="background-color: ${color.hex.value}">${color.hex.value}</li>
                `    
            }).join('')
            document.getElementById('show-img').innerHTML = colorList
        })
    
    
    
})

