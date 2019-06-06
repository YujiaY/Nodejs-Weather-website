console.log('Client side javascript file is loaded.')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const url = 'http://127.1.0.0:3000/weather?address='

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Javascript.'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''
    const location = search.value

    let urlFull = url + location

    fetch(urlFull).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location

            }
        })
    })
})