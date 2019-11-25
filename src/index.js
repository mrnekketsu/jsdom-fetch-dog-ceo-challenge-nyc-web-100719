console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function fetchDogImages() {
    fetch(imgUrl)
        .then(function(resp) {
            return resp.json()
        })
        .then(function(json) {
            renderDogImages(json)
        })
}

function fetchBreeds(){
    fetch(breedUrl)
        .then(function(resp){
            return resp.json()
        })
        .then(function(json){
            addBreedsToUl(json)

            let breedUl = document.querySelector("ul#dog-breeds")
            
            breedUl.addEventListener('click', function(e){
                if (e.target.dataset.type === "breed-li"){
                    e.target.style.color = "red"
                }
            })
            
            let breedLis = breedUl.getElementsByTagName('li')
            
            let breedArr = Array.from(breedLis)
            
            let dropDown = document.getElementById("breed-dropdown");
            
            dropDown.addEventListener('change', function(e){
                displayDogs(e, breedArr)
            })
        })
}
    
function displayDogs(e, breedArr){
    breedArr.forEach(function(breed){
        if (breed.innerText[0] === e.target.value){
            breed.style.display = "block";
        }
        else{
            breed.style.display = "none";
        }
    })
}
function renderDogImages(json){
    let imageContainer = document.querySelector("div#dog-image-container")
    let imageArr = json.message
    imageArr.forEach(function(imageLink){
        let img = document.createElement("img");
        img.src = imageLink
        imageContainer.append(img)
    });
}

function addBreedsToUl(json){
    let breedUl = document.querySelector("ul#dog-breeds")
    let breedArr = Object.keys(json.message)
    breedArr.forEach(function(breed){
        let li = document.createElement("li");
        li.innerText = breed
        li.dataset.type = "breed-li"
        li.dataset.breed = breed
        breedUl.append(li)
    });   
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("Doc has been loaded")
    
    fetchDogImages()
    fetchBreeds()
    
})
