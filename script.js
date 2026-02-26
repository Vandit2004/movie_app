let searchBtn = document.querySelector(".search")
let inputMovie = document.querySelector(".input-movie")
let movieContainer = document.querySelector(".movie-container")
searchBtn.addEventListener("click",function(e){
    e.preventDefault()
    if(inputMovie.value!==""){
        getMovieInfo(inputMovie.value)
    }
    else{
        showError("Please enter a movie name")
    }
})
async function getMovieInfo(movie){
    let apiKey = "5f53ed32"
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    let response = await fetch(url)
    let data = await response.json()
      if(data.Response === "False"){
        showError("Movie not found! Please try again.")
    } else {
        showMovieData(data)
    }
}
function showError(message){
    movieContainer.innerHTML = `
        <div class="error-box">
            <h2>⚠ ${message}</h2>
        </div>
    `
}
function showMovieData(data){
    movieContainer.innerHTML = ""
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data
    const createElement = document.createElement("div")
    createElement.classList.add("movie-info")
    createElement.innerHTML = `
    <h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`
    const createGenreElement = document.createElement("div")
    createGenreElement.classList.add("movie-genre")
    Genre.split(",").forEach(element=>{
        const p = document.createElement("p")
        p.innerHTML = element
        createGenreElement.appendChild(p)        
    })
    createElement.appendChild(createGenreElement)
    createElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
    <p><strong>Runtime:</strong>${Runtime}</p>
    <p><strong>Cast:</strong>${Actors}</p> 
    <p><strong>Plot:</strong>${Plot}</p>
    `
    const moviePosterElement = document.createElement("div")
    moviePosterElement.classList.add("movie-poster")
    moviePosterElement.innerHTML = `<img src="${Poster}">`

    movieContainer.append(moviePosterElement,createElement)
}
