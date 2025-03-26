// name1 = "virat"

// localStorage.setItem("Name",name1)

// console.log(localStorage.getItem("Name"))

// localStorage.setItem('Address','Hyderabad')


// console.log(localStorage.getItem('Address'))


// localStorage.clear()



// let arr = [1,2,3,4,5]


// localStorage.setItem('values',JSON.stringify(arr))  // 

// let res = localStorage.getItem('values')

// console.log(res)
// console.log(JSON.parse(res))

// console.log(localStorage.getItem('values'))

// console.log(arr.toString())
// console.log(JSON.stringify(arr))
// console.log(JSON.parse(JSON.stringify(arr)))


// let form = document.querySelector('form')
// let input = document.querySelector('#name')
// let container = document.querySelector('.container')

// form.addEventListener('submit',function(event){
//     if( input.value == ''){
//         event.preventDefault();
//     }else{
//         let data = JSON.parse(localStorage.getItem('names')) || []
//         data.push(input.value)
//         localStorage.setItem('names',JSON.stringify(data))
//         displayData()
//     }
// })


// function displayData(){
//     container.innerHTML = ``
//     data = JSON.parse(localStorage.getItem('names'))
//     if(data == undefined){
//         container.innerHTML = 'No Data is Available'
//     }
//     else{
//         data.forEach(obj => {
//             let item = document.createElement('p')
//             item.innerHTML = `${obj}`
//             container.append(item)
//         })
//     }
// }


// window.addEventListener('DOMContentLoaded',function(){
//     displayData()
// })

let container = document.querySelector('.container')
let selectElements = document.querySelector("#names")
let loader = document.querySelector('.loader')

async function getData() {

    // let res = await fetch("https://dummyjson.com/products")
    // let res = await fetch("https://fakestoreapi.com/products")

    // let res = await fetch("http://localhost:3000/products")
    let res = await fetch("https://honey-whip-rutabaga.glitch.me/products")
    
    let data = await res.json()


    localStorage.setItem('products',JSON.stringify(data))
    data = JSON.parse(localStorage.getItem('products')) 
    loader.remove()
    displayData(data)
    populateFilterOptions()
}

getData()


function displayData(data){
    container.innerHTML = ``
    
    // console.log(data)
    // obj.images[0]
    // obj.title
    // obj.price

    data.forEach(obj =>{
        let item = document.createElement('div')
        item.className = 'item'
        item.innerHTML = `
          <img src = '${obj.image}'/>
          <h4>${obj.title}</h4>
          <p>${obj.price}</p>
          <p>${obj.category}</p>
          <button onclick='deleteData(${obj.id})'>Delete</button>
        `
        container.appendChild(item)
    })

    console.log(data)


}


async function deleteData(id){
    
    console.log(id)

    let data = JSON.parse(localStorage.getItem('products')) 

    console.log(data)

    let updatedData = data.filter(item => item.id != id);

    console.log(updatedData)

    localStorage.setItem('products', JSON.stringify(updatedData));

    
    displayData(updatedData)
    filterData()

}


async function populateFilterOptions(){

    let data = JSON.parse(localStorage.getItem('products'))

    let uniqueCategories = ["All Categories",...new Set(data.map(obj => obj.category))]
    console.log(uniqueCategories)

    selectElements.innerHTML = uniqueCategories.map(obj =>{
        return `<option value = "${obj}">${obj}</option>`
    })

}

function filterData() {
    let selectedCategory = selectElements.value;
    let data = JSON.parse(localStorage.getItem('products')) || [];

    console.log(selectedCategory)

    let filteredData = selectedCategory == "All Categories" ? data 
    : data.filter(product => product.category == selectedCategory);

    console.log(filteredData)

    displayData(filteredData);
}