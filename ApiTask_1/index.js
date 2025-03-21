let container = document.getElementsByClassName('container')[0]
let loader = document.getElementsByClassName('loader')[0]

// console.log(container)

async function getData() {

	try {
		let response = await fetch('https://dog.ceo/api/breeds/image/random')	
		if(!response.ok){
			throw new Error("Failed to fetch data")
		}

		let obj = await response.json()

		// console.log(obj.message)


		loader.remove()
		display(obj.message)

	} catch (err) {
		console.error(err)
	}

	
}

getData()


setInterval(()=>{
	getData()
},2000)



function display(url){
	console.log(url)

	let item = document.createElement('div')

	item.className = 'item'

	item.innerHTML = ` 
	   <img src = '${url}'/>
	`
	container.appendChild(item)
}