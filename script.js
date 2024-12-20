//Cotação da moeda
const USD = 6.09
const EUR = 6.35
const GBP = 7.65

const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")

//Manipulando o input amount para receber somente número
amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Capturando o evento de submit do formulário
form.onsubmit = (event) =>{
    event.preventDefault()

    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

//Função para converter a moeda
function convertCurrency (amount, price, symbol) {
    try{
        //Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula o valor total
        let total = amount * price

        //Verifica se o resultado é um número
        if(isNaN(total)){
            return alert("Por favor digite o valor correto para realizar a conversão")
        }
        
        //Formata o valor total
        total = formatCurrencyBRL(total).replace("R$", "")
        
        //Resultado da conversão
        result.textContent = `${total} Reais`

        //Aplica a classe que exibe o footer com o resultado
        footer.classList.add("show-result")
    } catch(error){
        //Remove a classe do footer removendo ele
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter.")
    }
}

//Formatação da moeda em real
function formatCurrencyBRL(value){
    //Converte para número para utilizar o toLocaleString para formatar no padrão BRL
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}