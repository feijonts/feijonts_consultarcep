var submitBottun = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitBottun.addEventListener('click',run)

function run(event) {
    event.preventDefault()
    var zipCode = zipCodeField.value
    zipCode = zipCode.replace(' ','')
    zipCode = zipCode.replace('.','')
    zipCode = zipCode.trim()

    console.log(zipCode)

    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response) {
            content.innerHTML = ''
            if (response.data.erro) {
                throw new Error('CEP inválido!')
            } else {
                createLine(response.data.logradouro)
                createLine(response.data.bairro)
                createLine(response.data.localidade + ' / ' + response.data.uf)
            }
        })
        .catch(function (error) {
            content.innerHTML = ''
            console.log(error)
            createLine('Ops, algo deu errado!')
        })
}

function createLine(newText) {
    var line = document.createElement('p')
    var text = document.createTextNode(newText)

    line.appendChild(text)
    content.appendChild(line)
}