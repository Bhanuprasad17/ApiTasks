let container = document.getElementsByClassName('container')[0]
let loader = document.getElementsByClassName('loader')[0]
console.log(container)



async function getData() {
    const url = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=10&offset=0&title_filter=%22Data%20Engineer%22&location_filter=%22United%20States%22%20OR%20%22United%20Kingdom%22';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a05c0aef66msh335f62c079bbb29p109e63jsn7365b3ee1135',
            'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
    
        if(!response.ok){
            throw new Error("failed to fech data ")
        }
        const result = await response.json();
    
        console.log(result);

        loader.remove()

        displayData(result)

    } catch (error) {
        console.error(error);
    }


}

getData()


function displayData(data) {

    data.forEach(obj => {

        let item = document.createElement('div')
        item.className = 'item'

        item.innerHTML = `
          <h1>${obj.title}</h1>
          <p>${obj.organization}</p>
          <p>${obj.locations_derived[0]}</p>
          `
        container.appendChild(item)
    })
}








// obj.title
// obj.organization
// obj.locations_derived[0]