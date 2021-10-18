
/* QuirkyShop - JavaScript Code */

const api = "https://mock-data-api.firebaseio.com/webb21/products.json"

//controls div where products are being appended
const productContainer = document.getElementById("root")

//controls filter functions
const filterInput = document.getElementById("filterInput")
const filterExecute = document.getElementById("filterExecute")
filterExecute.addEventListener("click", function() {
    productContainer.innerHTML = "" //used to reset root after filter
    getDataFromApi()
})

// functions that collects product information from api
function getDataFromApi() {
    fetch(api)
    .then(res => res.json())
    .then(data => {
        filterData(data)
    })
}

// functions for filtering the data
function filterData(data) {
    let filteredData = data.filter(condition)
    renderData(filteredData)
}
function condition(item) {
    return item.rating >= filterInput.value
}

// functions for rendering data in root
function renderData(filteredData) {
    filteredData.forEach(item => {
        renderDataItems(item)
    })
}

/* Another solution without filter function
    requires a default value on filterInput */

// function renderData(data) {
//     data.forEach(item => {
//         if(item.rating >= filterInput.value) {
//             renderDataItems(item)
//         }
//     })
// }

function renderDataItems(item) {
    const dataWrapper = document.createElement("div")

    const titleElement = document.createElement("h2")
    titleElement.innerHTML = item.name

    const descriptionElement = document.createElement("p")
    descriptionElement.innerHTML = item.description

    const imageElement = document.createElement("img")
    imageElement.src = item.images[0].src.small
    imageElement.alt = item.images[0].alt
    imageElement.addEventListener("click", function() {
        addingToCartButton(item)
    })

    const priceElement = document.createElement("p")
    priceElement.innerHTML = `Price: ${item.price}`

    const ratingElement = document.createElement("p")
    ratingElement.innerHTML = `Rating: ${item.rating}`

    const stockElement = document.createElement("p")
    stockElement.innerHTML = `Stock: ${item.stock}`

    const buyButton = document.createElement("button")
    buyButton.addEventListener("click", function() {
        addingToCartButton(item)
    })
    buyButton.innerHTML = `Add to cart`

    dataWrapper.appendChild(titleElement)
    dataWrapper.appendChild(imageElement)
    dataWrapper.appendChild(descriptionElement)
    dataWrapper.appendChild(priceElement)
    dataWrapper.appendChild(ratingElement)
    dataWrapper.appendChild(stockElement)
    dataWrapper.appendChild(buyButton)

    productContainer.appendChild(dataWrapper)
}
getDataFromApi()

//customer purchase information
class Customer {
    constructor() {
        this.cart = []
    }
    addProduct(product) {
        const productChoice = {
            name: product.name,
            price: product.price
        }
        this.cart.unshift(productChoice)
    }
    getTotalPrice() {
        let sum = 0
        this.cart.forEach(product => {
            sum += product.price
        })
        return sum
    }
}
const customer = new Customer()

//functions for printing on page
function printTotalPrice() {
    const price = document.getElementById("price")
    price.innerHTML = `Total: ${customer.getTotalPrice()}`
}

function printCartTitle() {
    const cart = document.getElementById("cart")
    cart.innerHTML = `Added products:`
}

function printProducts() {
    const productList = document.getElementById("products")
    const products = document.createElement("li")
    products.innerHTML = `${customer.cart[0].name} - ${customer.cart[0].price}`
    productList.appendChild(products)
}

//adds product to customer cart by pressing button
function addingToCartButton(item) {
    customer.addProduct(item)
    printTotalPrice()
    printCartTitle()
    printProducts()
}

//used for presentation purposes
console.log(customer.cart)