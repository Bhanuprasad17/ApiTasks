let container = document.getElementsByClassName('container')[0]
let loader = document.getElementsByClassName('loader')[0]

console.log(container)



async function getData() {
    const url = 'https://imdb-top-1000-movies-series.p.rapidapi.com/list/1';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e29c5002b4msh25ee3b00068caa4p1feafdjsn45da793b4cfe',
            'x-rapidapi-host': 'imdb-top-1000-movies-series.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("failed to fetch tha data")
        }
        const data = await response.json();
        // console.log(data)

        const movieData = data.result
        // console.log(movieData)


        loader.remove()
        displayData(movieData)

        // obj.Series_Title
        // obj.rank
        // obj.Director
        // obj.IMDB_Rating


    } catch (error) {
        console.error(error);
    }
}

getData()




function displayData(data){

    data.forEach(obj =>{
        // console.log(obj)
        let item = document.createElement('div')
        item.className = 'item'

        item.innerHTML = `

            <h1>${obj.Series_Title}</h1>
            <p>${obj.Director}</p>
            <p>${obj.IMDB_Rating}</p>
        `

        container.appendChild(item)

    })
}